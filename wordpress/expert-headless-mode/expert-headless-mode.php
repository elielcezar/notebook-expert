<?php
/**
 * Plugin Name: Expert Headless Mode
 * Description: Redireciona o frontend para o painel, limpa o cabeçalho e mantém apenas a REST API ativa.
 * Version: 1.1
 * Author: Notebook Expert
 */

// Impede o acesso direto ao arquivo
if (!defined('ABSPATH')) exit;

/**
 * Este subdomínio existe só para administrar o conteúdo: qualquer acesso ao
 * frontend do WordPress vai para o painel. Quem não estiver logado cai na tela
 * de login, então nenhum conteúdo da instalação fica visível.
 *
 * Não redirecionamos para o site público preservando o path: o permalink do WP
 * é /AAAA/MM/DD/slug/ e no Next.js o post vive em /dicas/<slug>, então o
 * destino sempre daria 404.
 */
add_action('template_redirect', function() {
    // 1. Permite a REST API (é o que alimenta o site Next.js)
    if (defined('REST_REQUEST') && REST_REQUEST) return;

    // 2. Permite o Admin e a tela de Login
    if (is_admin()) return;
    if (isset($GLOBALS['pagenow']) && $GLOBALS['pagenow'] === 'wp-login.php') return;

    // 3. Manda para o painel. 302 (temporário) de propósito: um 301 fica
    // cacheado no navegador do visitante e é muito difícil de reverter depois.
    wp_safe_redirect(admin_url(), 302);
    exit;
});

/**
 * O redirect_canonical do WordPress roda ANTES do template_redirect, então um
 * acesso a /slug/ virava um 301 para /AAAA/MM/DD/slug/ e só depois seria
 * tratado. Desligando no frontend, o redirecionamento acima passa a ser o
 * primeiro e único salto.
 */
add_filter('redirect_canonical', function($redirect_url) {
    if (is_admin() || (defined('REST_REQUEST') && REST_REQUEST)) {
        return $redirect_url;
    }
    return false;
});

/**
 * 2. Limpeza do Header (Remover lixo visual)
 * Remove scripts e links que o Next.js não vai usar.
 */
add_action('init', function() {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'rest_output_link_wp_head');
    remove_action('wp_head', 'wp_shortlink_wp_head');
});

/**
 * 3. Desativar Comentários e XML-RPC (Segurança)
 */
add_filter('xmlrpc_enabled', '__return_false');
add_action('admin_init', function () {
    // Redireciona qualquer pessoa tentando acessar a página de comentários
    global $pagenow;
    if ($pagenow === 'edit-comments.php') {
        wp_redirect(admin_url());
        exit;
    }
});