<?php
/**
 * Plugin Name: Importador de Posts (Notebook Expert)
 * Description: Importação única dos posts do blog a partir do posts.json gerado por scripts/gerar-posts-importacao.mjs. Pode ser removido depois de usado.
 * Version: 1.0.0
 * Author: Notebook Expert
 */

if (!defined('ABSPATH')) exit;

class NE_Importador_Posts {

    // Transient que o GitHub Deploy Trigger consulta antes de disparar
    // (maybe_trigger_deploy). Mantê-lo ativo durante a importação impede que
    // cada post publicado gere um deploy; no fim disparamos um só.
    const TRAVA_DEPLOY = 'github_deploy_pending';

    public function __construct() {
        add_action('admin_menu', function () {
            add_management_page('Importar Posts', 'Importar Posts', 'manage_options', 'ne-importar-posts', [$this, 'pagina']);
        });
    }

    private function carregar_posts() {
        $arquivo = plugin_dir_path(__FILE__) . 'posts.json';
        if (!file_exists($arquivo)) {
            return new WP_Error('sem_arquivo', 'posts.json não encontrado na pasta do plugin.');
        }
        $posts = json_decode(file_get_contents($arquivo), true);
        if (!is_array($posts)) {
            return new WP_Error('json_invalido', 'posts.json inválido: ' . json_last_error_msg());
        }
        return $posts;
    }

    // Busca por slug em qualquer status (menos lixeira, cujo slug ganha
    // o sufixo __trashed). É o que torna a importação repetível.
    private function post_existente($slug) {
        $q = new WP_Query([
            'post_type'      => 'post',
            'name'           => $slug,
            'post_status'    => 'any',
            'posts_per_page' => 1,
            'fields'         => 'ids',
            'no_found_rows'  => true,
        ]);
        return $q->posts ? (int) $q->posts[0] : 0;
    }

    private function campo_chamada() {
        return function_exists('acf_get_field') ? acf_get_field('chamada') : null;
    }

    private function categoria_id($nome, $simular) {
        $termo = term_exists($nome, 'category');
        if ($termo) return (int) $termo['term_id'];
        if ($simular) return 0;
        $novo = wp_insert_term($nome, 'category');
        return is_wp_error($novo) ? 0 : (int) $novo['term_id'];
    }

    private function importar($posts, $simular) {
        $relatorio = [];
        $campo = $this->campo_chamada();

        foreach ($posts as $p) {
            $id_existente = $this->post_existente($p['slug']);
            $acao = $id_existente ? 'atualizar' : 'criar';
            $cat_existe = (bool) term_exists($p['categoria'], 'category');

            if ($simular) {
                $relatorio[] = [$p['numero'], $p['titulo'], $p['slug'], $p['categoria'] . ($cat_existe ? '' : ' (nova)'), $p['data'], $acao, ''];
                continue;
            }

            $dados = [
                'post_type'     => 'post',
                'post_status'   => 'publish',
                'post_title'    => $p['titulo'],
                'post_name'     => $p['slug'],
                'post_content'  => $p['conteudo'],
                'post_excerpt'  => $p['resumo'],
                'post_date'     => $p['data'],
                'post_date_gmt' => get_gmt_from_date($p['data']),
                'post_category' => array_filter([$this->categoria_id($p['categoria'], false)]),
            ];
            if ($id_existente) $dados['ID'] = $id_existente;

            $id = wp_insert_post(wp_slash($dados), true);

            if (is_wp_error($id)) {
                $relatorio[] = [$p['numero'], $p['titulo'], $p['slug'], $p['categoria'], $p['data'], 'ERRO', $id->get_error_message()];
                continue;
            }

            update_field($campo['key'], $p['chamada'], $id);
            $relatorio[] = [$p['numero'], $p['titulo'], get_post_field('post_name', $id), $p['categoria'], $p['data'], $acao === 'criar' ? 'criado' : 'atualizado', '#' . $id];
        }

        return $relatorio;
    }

    public function pagina() {
        if (!current_user_can('manage_options')) return;

        $posts = $this->carregar_posts();
        $campo = $this->campo_chamada();
        $tem_deploy = class_exists('GitHub_Deploy_Trigger');
        $relatorio = null;
        $simulado = true;
        $msg_deploy = '';

        if (!is_wp_error($posts) && $campo && isset($_POST['ne_acao'])) {
            check_admin_referer('ne_importar_posts');
            $simulado = $_POST['ne_acao'] !== 'importar';

            if (!$simulado) {
                @set_time_limit(600);
                set_transient(self::TRAVA_DEPLOY, true, 15 * MINUTE_IN_SECONDS);
            }

            $relatorio = $this->importar($posts, $simulado);

            if (!$simulado) {
                delete_transient(self::TRAVA_DEPLOY);
                if ($tem_deploy) {
                    // Nova instância só para usar o método público de envio
                    $r = (new GitHub_Deploy_Trigger())->send_deploy_request('Importação de posts');
                    $msg_deploy = $r['message'];
                } else {
                    $msg_deploy = 'GitHub Deploy Trigger não está ativo — dispare o deploy manualmente pelo GitHub Actions.';
                }
            }
        }
        ?>
        <div class="wrap">
            <h1>Importar Posts</h1>

            <?php if (is_wp_error($posts)): ?>
                <div class="notice notice-error"><p><?php echo esc_html($posts->get_error_message()); ?></p></div>
                <?php return; endif; ?>

            <?php if (!$campo): ?>
                <div class="notice notice-error"><p>Campo ACF <code>chamada</code> não encontrado. O ACF precisa estar ativo e o campo cadastrado para posts.</p></div>
                <?php return; endif; ?>

            <p><strong><?php echo count($posts); ?></strong> posts no <code>posts.json</code>. Posts já existentes (mesmo slug) são <em>atualizados</em>, não duplicados, então a importação pode ser repetida.</p>
            <p>Durante a importação o disparo automático de deploy fica suspenso; ao final é enviado <strong>um</strong> deploy.
                <?php if (!$tem_deploy): ?><br><strong>Atenção:</strong> o plugin GitHub Deploy Trigger não está ativo; o deploy final terá de ser manual.<?php endif; ?></p>

            <form method="post" style="margin:1em 0">
                <?php wp_nonce_field('ne_importar_posts'); ?>
                <button class="button" name="ne_acao" value="simular">1. Simular (não grava nada)</button>
                <button class="button button-primary" name="ne_acao" value="importar"
                    onclick="return confirm('Importar e publicar <?php echo count($posts); ?> posts agora?')">2. Importar e publicar</button>
            </form>

            <?php if ($relatorio !== null): ?>
                <?php if (!$simulado): ?>
                    <div class="notice notice-info"><p><strong>Deploy:</strong> <?php echo esc_html($msg_deploy); ?></p></div>
                <?php endif; ?>
                <?php
                $contagem = array_count_values(array_column($relatorio, 5));
                $resumo = [];
                foreach ($contagem as $k => $v) $resumo[] = "$v $k";
                ?>
                <h2><?php echo $simulado ? 'Simulação' : 'Resultado'; ?>: <?php echo esc_html(implode(', ', $resumo)); ?></h2>
                <table class="widefat striped">
                    <thead><tr><th>#</th><th>Título</th><th>Slug</th><th>Categoria</th><th>Data</th><th>Ação</th><th></th></tr></thead>
                    <tbody>
                    <?php foreach ($relatorio as $linha): ?>
                        <tr<?php echo $linha[5] === 'ERRO' ? ' style="background:#fcebea"' : ''; ?>>
                            <?php foreach ($linha as $celula): ?><td><?php echo esc_html($celula); ?></td><?php endforeach; ?>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
        <?php
    }
}

new NE_Importador_Posts();
