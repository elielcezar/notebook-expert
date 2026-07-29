=== GitHub Deploy Trigger ===
Contributors: notebookexpert
Tags: github, deploy, actions, webhook, headless
Requires at least: 5.0
Tested up to: 6.4
Requires PHP: 7.4
Stable tag: 1.1.0
License: GPLv2 or later

Dispara rebuild automático do site Next.js via GitHub Actions quando o conteúdo consumido pelo frontend é alterado.

== Description ==

Este plugin permite integrar seu WordPress com GitHub Actions para fazer deploy automático do frontend sempre que um conteúdo é publicado, editado ou excluído.

**Funcionalidades:**

* Disparo automático ao publicar, editar, enviar para lixeira, excluir ou restaurar
* Cobre posts, páginas e os CPTs Seminovo, Depoimento e Dica do Especialista
* Página de configurações no admin
* Botão de teste manual
* Log de atividades
* Segurança via Personal Access Token

**Tipos de conteúdo observados:**

Posts e páginas respeitam as caixas de seleção das configurações. Os CPTs
(`seminovo`, `depoimento`, `dica_do_especialista`) sempre disparam, já que
existem exclusivamente para alimentar o frontend. A lista pode ser ajustada
pelo filtro `github_deploy_watched_post_types`.

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

= 1.1.0 =
* Corrige: publicar ou editar Seminovo, Depoimento e Dica do Especialista não disparava deploy
  (o hook publish_{post_type} só estava registrado para post e page)
* Centraliza a verificação de tipo em should_trigger_for()
* Novo filtro github_deploy_watched_post_types
* Remove hook inexistente untrashed_page (untrashed_post já cobre todos os tipos)
* Aviso no admin: o GitHub responde sucesso mesmo com o workflow desativado

= 1.0.0 =
* Versão inicial

