=== GitHub Deploy Trigger ===
Contributors: notebookexpert
Tags: github, deploy, actions, webhook, headless
Requires at least: 5.0
Tested up to: 6.4
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later

Dispara rebuild automático do site Next.js via GitHub Actions quando posts são publicados.

== Description ==

Este plugin permite integrar seu WordPress com GitHub Actions para fazer deploy automático do frontend sempre que um post é publicado.

**Funcionalidades:**

* Disparo automático ao publicar posts
* Disparo automático ao publicar páginas (opcional)
* Página de configurações no admin
* Botão de teste manual
* Log de atividades
* Segurança via Personal Access Token

== Installation ==

1. Faça upload da pasta `github-deploy-trigger` para `/wp-content/plugins/`
2. Ative o plugin através do menu 'Plugins' no WordPress
3. Vá em Configurações > GitHub Deploy
4. Configure seu Personal Access Token e repositório

**Para gerar o Personal Access Token:**

1. Acesse https://github.com/settings/tokens
2. Clique em "Generate new token (classic)"
3. Dê um nome ao token (ex: "WordPress Deploy")
4. Selecione o scope "repo"
5. Clique em "Generate token"
6. Copie o token e cole nas configurações do plugin

== Changelog ==

= 1.0.0 =
* Versão inicial

