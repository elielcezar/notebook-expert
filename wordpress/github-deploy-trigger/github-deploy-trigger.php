<?php
/**
 * Plugin Name: GitHub Deploy Trigger
 * Plugin URI: https://notebookexpert.com.br
 * Description: Dispara rebuild automático do site Next.js via GitHub Actions quando posts, páginas, seminovos, depoimentos ou dicas do especialista são alterados.
 * Version: 1.2.0
 * Author: NotebookExpert
 * Author URI: https://notebookexpert.com.br
 * License: GPL v2 or later
 * Text Domain: github-deploy-trigger
 */

// Impedir acesso direto
if (!defined('ABSPATH')) {
    exit;
}

class GitHub_Deploy_Trigger {
    
    private $option_name = 'github_deploy_options';

    /**
     * Tipos de conteúdo que o frontend Next.js consome via REST API.
     * Qualquer alteração neles precisa gerar um novo build estático.
     */
    private function get_watched_post_types() {
        return apply_filters('github_deploy_watched_post_types', [
            'post',
            'page',
            'seminovo',
            'depoimento',
            'dica_do_especialista',
        ]);
    }

    /**
     * Decide se um tipo de conteúdo deve disparar deploy.
     * Posts e páginas respeitam as opções do admin; os CPTs sempre disparam,
     * já que existem exclusivamente para alimentar o frontend.
     */
    private function should_trigger_for($post_type) {
        if (!in_array($post_type, $this->get_watched_post_types(), true)) {
            return false;
        }

        if ($post_type === 'post') {
            return (bool) $this->get_option('trigger_posts', 1);
        }

        if ($post_type === 'page') {
            return (bool) $this->get_option('trigger_pages', 0);
        }

        return true;
    }

    public function __construct() {
        // Admin
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('admin_init', [$this, 'register_settings']);
        add_action('admin_enqueue_scripts', [$this, 'admin_styles']);
        
        // Hooks para publicação (registrados no init, depois dos CPTs existirem)
        add_action('init', [$this, 'register_publish_hooks'], 20);

        // Hooks para edição (quando post já publicado é atualizado)
        add_action('post_updated', [$this, 'trigger_deploy_on_update'], 10, 3);

        // Hooks para exclusão/movimento para lixeira
        // before_delete_post captura status antes da exclusão permanente
        add_action('before_delete_post', [$this, 'trigger_deploy_on_delete'], 10, 1);
        // trashed_post captura quando move para lixeira (não exclusão permanente)
        add_action('trashed_post', [$this, 'trigger_deploy_on_trash'], 10, 1);
        // untrashed_post já cobre todos os post types
        add_action('untrashed_post', [$this, 'trigger_deploy_on_restore'], 10, 1);

        // AJAX para teste manual
        add_action('wp_ajax_github_deploy_test', [$this, 'ajax_test_deploy']);
        add_action('wp_ajax_github_deploy_clear_log', [$this, 'ajax_clear_log']);
    }
    
    /**
     * Dispara o deploy no máximo uma vez por janela curta.
     *
     * Um deploy reconstrói o site inteiro, então basta um por rajada de
     * alterações — chaves por post eram a granularidade errada. Salvar um post
     * já publicado aciona publish_{post_type} E post_updated, e o editor de
     * blocos ainda salva mais de uma vez: sem esta trava, uma única edição
     * gerava 4 deploys concorrentes que se derrubavam no FTP.
     *
     * A janela é curta de propósito. Perder uma alteração é pior que um build
     * a mais, então uma edição deliberada logo em seguida ainda passa — o
     * grupo de concorrência do workflow põe o segundo build na fila.
     */
    private function maybe_trigger_deploy($reason, $post_id = null) {
        if (get_transient('github_deploy_pending')) {
            return;
        }
        set_transient('github_deploy_pending', true, 45);

        $this->send_deploy_request($reason, $post_id);
    }

    /**
     * Registrar os hooks de publicação de cada tipo observado.
     * O hook do WordPress é publish_{post_type} — publish_post só cobre o tipo
     * "post", então sem isto publicar um seminovo/depoimento/dica do
     * especialista nunca republicava o site.
     */
    public function register_publish_hooks() {
        foreach ($this->get_watched_post_types() as $post_type) {
            add_action("publish_{$post_type}", [$this, 'trigger_deploy'], 10, 2);
        }
    }

    /**
     * Adicionar menu no admin
     */
    public function add_admin_menu() {
        add_options_page(
            'GitHub Deploy',
            'GitHub Deploy',
            'manage_options',
            'github-deploy',
            [$this, 'settings_page']
        );
    }
    
    /**
     * Registrar configurações
     */
    public function register_settings() {
        register_setting($this->option_name, $this->option_name, [$this, 'sanitize_options']);
        
        add_settings_section(
            'github_deploy_main',
            'Configurações do GitHub',
            [$this, 'section_description'],
            'github-deploy'
        );
        
        add_settings_field(
            'github_token',
            'Personal Access Token',
            [$this, 'field_token'],
            'github-deploy',
            'github_deploy_main'
        );
        
        add_settings_field(
            'github_repo',
            'Repositório',
            [$this, 'field_repo'],
            'github-deploy',
            'github_deploy_main'
        );
        
        add_settings_field(
            'trigger_posts',
            'Disparar para Posts',
            [$this, 'field_trigger_posts'],
            'github-deploy',
            'github_deploy_main'
        );
        
        add_settings_field(
            'trigger_pages',
            'Disparar para Páginas',
            [$this, 'field_trigger_pages'],
            'github-deploy',
            'github_deploy_main'
        );
        
        add_settings_field(
            'enable_logging',
            'Ativar Log',
            [$this, 'field_logging'],
            'github-deploy',
            'github_deploy_main'
        );
    }
    
    /**
     * Sanitizar opções
     */
    public function sanitize_options($input) {
        $sanitized = [];
        $sanitized['github_token'] = sanitize_text_field($input['github_token'] ?? '');
        $sanitized['github_repo'] = sanitize_text_field($input['github_repo'] ?? '');
        $sanitized['trigger_posts'] = isset($input['trigger_posts']) ? 1 : 0;
        $sanitized['trigger_pages'] = isset($input['trigger_pages']) ? 1 : 0;
        $sanitized['enable_logging'] = isset($input['enable_logging']) ? 1 : 0;
        return $sanitized;
    }
    
    /**
     * Obter opção
     */
    private function get_option($key, $default = '') {
        $options = get_option($this->option_name, []);
        return $options[$key] ?? $default;
    }
    
    /**
     * Descrição da seção
     */
    public function section_description() {
        echo '<p>Configure a integração com GitHub Actions para rebuild automático do site.</p>';
    }
    
    /**
     * Campo: Token
     */
    public function field_token() {
        $value = $this->get_option('github_token');
        $masked = $value ? str_repeat('•', 20) . substr($value, -4) : '';
        ?>
        <input type="password" 
               id="github_token"
               name="<?php echo $this->option_name; ?>[github_token]" 
               value="<?php echo esc_attr($value); ?>" 
               class="regular-text"
               autocomplete="new-password" />
        <button type="button" class="button" onclick="toggleTokenVisibility()">Mostrar/Ocultar</button>
        <p class="description">
            Gere em <a href="https://github.com/settings/tokens" target="_blank">github.com/settings/tokens</a> com scope <code>repo</code>
        </p>
        <script>
        function toggleTokenVisibility() {
            var field = document.getElementById('github_token');
            field.type = field.type === 'password' ? 'text' : 'password';
        }
        </script>
        <?php
    }
    
    /**
     * Campo: Repositório
     */
    public function field_repo() {
        $value = $this->get_option('github_repo', 'elielcezar/notebook-expert');
        ?>
        <input type="text" 
               name="<?php echo $this->option_name; ?>[github_repo]" 
               value="<?php echo esc_attr($value); ?>" 
               class="regular-text"
               placeholder="usuario/repositorio" />
        <p class="description">Formato: <code>usuario/repositorio</code></p>
        <?php
    }
    
    /**
     * Campo: Trigger Posts
     */
    public function field_trigger_posts() {
        $checked = $this->get_option('trigger_posts', 1);
        ?>
        <label>
            <input type="checkbox" 
                   name="<?php echo $this->option_name; ?>[trigger_posts]" 
                   value="1" 
                   <?php checked($checked, 1); ?> />
            Disparar deploy ao publicar posts do blog
        </label>
        <?php
    }
    
    /**
     * Campo: Trigger Pages
     */
    public function field_trigger_pages() {
        $checked = $this->get_option('trigger_pages', 0);
        ?>
        <label>
            <input type="checkbox" 
                   name="<?php echo $this->option_name; ?>[trigger_pages]" 
                   value="1" 
                   <?php checked($checked, 1); ?> />
            Disparar deploy ao publicar páginas
        </label>
        <?php
    }
    
    /**
     * Campo: Logging
     */
    public function field_logging() {
        $checked = $this->get_option('enable_logging', 1);
        ?>
        <label>
            <input type="checkbox" 
                   name="<?php echo $this->option_name; ?>[enable_logging]" 
                   value="1" 
                   <?php checked($checked, 1); ?> />
            Registrar atividades no log
        </label>
        <?php
    }
    
    /**
     * Estilos do admin
     */
    public function admin_styles($hook) {
        if ($hook !== 'settings_page_github-deploy') {
            return;
        }
        ?>
        <style>
            .github-deploy-card {
                background: #fff;
                border: 1px solid #ccd0d4;
                border-radius: 4px;
                padding: 20px;
                margin-top: 20px;
            }
            .github-deploy-card h3 {
                margin-top: 0;
            }
            .github-deploy-status {
                padding: 10px 15px;
                border-radius: 4px;
                margin: 10px 0;
            }
            .github-deploy-status.success {
                background: #d4edda;
                border: 1px solid #c3e6cb;
                color: #155724;
            }
            .github-deploy-status.error {
                background: #f8d7da;
                border: 1px solid #f5c6cb;
                color: #721c24;
            }
            .github-deploy-status.info {
                background: #cce5ff;
                border: 1px solid #b8daff;
                color: #004085;
            }
            .github-deploy-log {
                background: #1e1e1e;
                color: #d4d4d4;
                padding: 15px;
                border-radius: 4px;
                font-family: monospace;
                font-size: 12px;
                max-height: 300px;
                overflow-y: auto;
                white-space: pre-wrap;
                word-wrap: break-word;
            }
            .github-deploy-log .log-success { color: #4ec9b0; }
            .github-deploy-log .log-error { color: #f14c4c; }
            .github-deploy-log .log-info { color: #3794ff; }
            .github-deploy-log .log-time { color: #808080; }
        </style>
        <?php
    }
    
    /**
     * Página de configurações
     */
    public function settings_page() {
        ?>
        <div class="wrap">
            <h1>⚡ GitHub Deploy Trigger</h1>
            
            <form method="post" action="options.php">
                <?php
                settings_fields($this->option_name);
                do_settings_sections('github-deploy');
                submit_button('Salvar Configurações');
                ?>
            </form>
            
            <!-- Card de Teste -->
            <div class="github-deploy-card">
                <h3>🧪 Testar Conexão</h3>
                <p>Dispare um deploy de teste para verificar se a configuração está correta.</p>
                <button type="button" id="test-deploy-btn" class="button button-primary">
                    Disparar Deploy de Teste
                </button>
                <div id="test-result"></div>
            </div>
            
            <!-- Card de Log -->
            <div class="github-deploy-card">
                <h3>📋 Log de Atividades</h3>
                <button type="button" id="clear-log-btn" class="button" style="float: right;">
                    Limpar Log
                </button>
                <div class="github-deploy-log" id="deploy-log">
                    <?php echo $this->get_formatted_log(); ?>
                </div>
            </div>
            
            <!-- Card de Informações -->
            <div class="github-deploy-card">
                <h3>ℹ️ Como Funciona</h3>
                <ol>
                    <li>Quando você publica, edita ou exclui um conteúdo, este plugin envia uma requisição para o GitHub</li>
                    <li>O GitHub Actions recebe e inicia o workflow de build</li>
                    <li>O site é reconstruído com o novo conteúdo</li>
                    <li>Os arquivos são enviados automaticamente para o servidor</li>
                </ol>
                <p><strong>Tempo médio:</strong> 3-5 minutos após a publicação</p>
                <p>
                    <strong>Seminovos, Depoimentos e Dicas do Especialista</strong> disparam deploy
                    sempre — as opções acima valem apenas para posts do blog e páginas.
                </p>
                <p style="border-left:4px solid #dba617;padding-left:10px;">
                    <strong>Atenção:</strong> se o log abaixo mostrar sucesso mas o site não atualizar,
                    verifique se o workflow <em>Build and Deploy</em> não foi desativado no GitHub
                    (aba Actions). O GitHub retorna sucesso mesmo com o workflow desativado.
                </p>
            </div>
        </div>
        
        <script>
        jQuery(document).ready(function($) {
            // Teste de deploy
            $('#test-deploy-btn').on('click', function() {
                var btn = $(this);
                btn.prop('disabled', true).text('Enviando...');
                $('#test-result').html('<div class="github-deploy-status info">Enviando requisição para o GitHub...</div>');
                
                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'github_deploy_test',
                        nonce: '<?php echo wp_create_nonce('github_deploy_test'); ?>'
                    },
                    success: function(response) {
                        if (response.success) {
                            $('#test-result').html('<div class="github-deploy-status success">✅ ' + response.data.message + '</div>');
                        } else {
                            $('#test-result').html('<div class="github-deploy-status error">❌ ' + response.data.message + '</div>');
                        }
                        btn.prop('disabled', false).text('Disparar Deploy de Teste');
                        refreshLog();
                    },
                    error: function() {
                        $('#test-result').html('<div class="github-deploy-status error">❌ Erro de conexão</div>');
                        btn.prop('disabled', false).text('Disparar Deploy de Teste');
                    }
                });
            });
            
            // Limpar log
            $('#clear-log-btn').on('click', function() {
                if (confirm('Tem certeza que deseja limpar o log?')) {
                    $.ajax({
                        url: ajaxurl,
                        type: 'POST',
                        data: {
                            action: 'github_deploy_clear_log',
                            nonce: '<?php echo wp_create_nonce('github_deploy_clear_log'); ?>'
                        },
                        success: function() {
                            $('#deploy-log').html('<span class="log-info">Log limpo.</span>');
                        }
                    });
                }
            });
            
            function refreshLog() {
                // Recarrega a página para atualizar o log
                // Poderia ser AJAX, mas para simplificar...
                location.reload();
            }
        });
        </script>
        <?php
    }
    
    /**
     * Disparar deploy
     */
    public function trigger_deploy($post_id, $post) {
        // Evitar loops, revisões e autosaves
        if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
            return;
        }
        
        // Verificar tipo de post
        if (!$this->should_trigger_for(get_post_type($post_id))) {
            return;
        }

        $this->maybe_trigger_deploy($post->post_title, $post_id);
    }
    
    /**
     * Disparar deploy quando post publicado é editado
     */
    public function trigger_deploy_on_update($post_id, $post_after, $post_before) {
        // Ignorar tipos que o frontend não consome
        if (!$this->should_trigger_for($post_after->post_type)) {
            return;
        }

        // Ignorar revisões e autosaves
        if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
            return;
        }
        
        // Só disparar se o post estava publicado antes E continua publicado
        if ($post_before->post_status === 'publish' && $post_after->post_status === 'publish') {
            // Verificar se houve mudança real (não apenas metadata)
            if ($post_before->post_title !== $post_after->post_title || 
                $post_before->post_content !== $post_after->post_content) {

                $this->maybe_trigger_deploy("Edição: {$post_after->post_title}", $post_id);
            }
        }
    }
    
    /**
     * Disparar deploy quando post é excluído permanentemente
     * Hook: before_delete_post (antes da exclusão permanente)
     */
    public function trigger_deploy_on_delete($post_id) {
        $post = get_post($post_id);
        
        if (!$post) {
            return;
        }
        
        // Só disparar se era um post publicado (antes de ser deletado)
        if ($post->post_status !== 'publish' && $post->post_status !== 'trash') {
            return;
        }

        // Verificar tipo e configuração
        if (!$this->should_trigger_for(get_post_type($post_id))) {
            return;
        }

        $this->maybe_trigger_deploy("Exclusão permanente: {$post->post_title}", $post_id);
    }
    
    /**
     * Disparar deploy quando post é movido para lixeira (não deletado permanentemente)
     * Hook: trashed_post
     */
    public function trigger_deploy_on_trash($post_id) {
        $post = get_post($post_id);
        
        if (!$post) {
            return;
        }
        
        // Verificar tipo e configuração
        if (!$this->should_trigger_for(get_post_type($post_id))) {
            return;
        }

        $this->maybe_trigger_deploy("Movido para lixeira: {$post->post_title}", $post_id);
    }
    
    /**
     * Disparar deploy quando post é restaurado da lixeira
     */
    public function trigger_deploy_on_restore($post_id) {
        $post = get_post($post_id);
        
        if (!$post) {
            return;
        }
        
        // Verificar tipo e configuração
        if (!$this->should_trigger_for(get_post_type($post_id))) {
            return;
        }

        // Só disparar se foi restaurado como publicado
        if ($post->post_status === 'publish') {
            $this->maybe_trigger_deploy("Restauração: {$post->post_title}", $post_id);
        }
    }
    
    /**
     * Enviar requisição para GitHub
     */
    public function send_deploy_request($trigger_source = 'Manual', $post_id = null) {
        $token = $this->get_option('github_token');
        $repo = $this->get_option('github_repo');
        
        if (empty($token) || empty($repo)) {
            $this->log('Erro: Token ou repositório não configurado', 'error');
            return [
                'success' => false,
                'message' => 'Token ou repositório não configurado'
            ];
        }
        
        $url = "https://api.github.com/repos/{$repo}/dispatches";
        
        $body = json_encode([
            'event_type' => 'wordpress_publish',
            'client_payload' => [
                'trigger_source' => $trigger_source,
                'post_id' => $post_id,
                'triggered_at' => current_time('c'),
                'site_url' => get_site_url()
            ]
        ]);
        
        $this->log("Enviando deploy - Origem: {$trigger_source}" . ($post_id ? " (ID: {$post_id})" : ''), 'info');
        
        $response = wp_remote_post($url, [
            'timeout' => 30,
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/vnd.github.v3+json',
                'Content-Type' => 'application/json',
                'User-Agent' => 'WordPress-GitHub-Deploy-Trigger'
            ],
            'body' => $body
        ]);
        
        if (is_wp_error($response)) {
            $error_message = $response->get_error_message();
            $this->log("Erro de conexão: {$error_message}", 'error');
            return [
                'success' => false,
                'message' => 'Erro de conexão: ' . $error_message
            ];
        }
        
        $http_code = wp_remote_retrieve_response_code($response);
        
        // GitHub retorna 204 No Content em sucesso
        if ($http_code === 204) {
            $this->log("✓ Deploy disparado com sucesso!", 'success');
            return [
                'success' => true,
                'message' => 'Deploy disparado com sucesso! O site será atualizado em 3-5 minutos.'
            ];
        } else {
            $body = wp_remote_retrieve_body($response);
            $this->log("Erro HTTP {$http_code}: {$body}", 'error');
            return [
                'success' => false,
                'message' => "Erro HTTP {$http_code}. Verifique o token e repositório."
            ];
        }
    }
    
    /**
     * AJAX: Teste de deploy
     */
    public function ajax_test_deploy() {
        check_ajax_referer('github_deploy_test', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => 'Sem permissão']);
        }
        
        $result = $this->send_deploy_request('Teste Manual');
        
        if ($result['success']) {
            wp_send_json_success($result);
        } else {
            wp_send_json_error($result);
        }
    }
    
    /**
     * AJAX: Limpar log
     */
    public function ajax_clear_log() {
        check_ajax_referer('github_deploy_clear_log', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => 'Sem permissão']);
        }
        
        delete_option('github_deploy_log');
        wp_send_json_success();
    }
    
    /**
     * Adicionar entrada no log
     */
    private function log($message, $type = 'info') {
        if (!$this->get_option('enable_logging', 1)) {
            return;
        }
        
        $log = get_option('github_deploy_log', []);
        
        $log[] = [
            'time' => current_time('Y-m-d H:i:s'),
            'type' => $type,
            'message' => $message
        ];
        
        // Manter apenas últimas 50 entradas
        if (count($log) > 50) {
            $log = array_slice($log, -50);
        }
        
        update_option('github_deploy_log', $log);
    }
    
    /**
     * Obter log formatado para exibição
     */
    private function get_formatted_log() {
        $log = get_option('github_deploy_log', []);
        
        if (empty($log)) {
            return '<span class="log-info">Nenhuma atividade registrada.</span>';
        }
        
        $output = '';
        foreach (array_reverse($log) as $entry) {
            $class = 'log-' . $entry['type'];
            $output .= '<span class="log-time">[' . $entry['time'] . ']</span> ';
            $output .= '<span class="' . $class . '">' . esc_html($entry['message']) . '</span>' . "\n";
        }
        
        return $output;
    }
}

// Inicializar plugin
new GitHub_Deploy_Trigger();

