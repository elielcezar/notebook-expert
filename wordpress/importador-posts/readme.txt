=== Importador de Posts (Notebook Expert) ===

Importação única dos posts do blog enviados pela cliente (DOCS/posts-site-expert.md).

== Gerar o posts.json ==

Na raiz do repositório:

    node scripts/gerar-posts-importacao.mjs

O script valida o arquivo (campos, marca, slugs repetidos) e grava
wordpress/importador-posts/posts.json. Rode de novo sempre que o .md mudar.

== Mapeamento ==

* Título ............ título do post
* Slug .............. título sem acentos (ex.: troca-de-dc-jack-notebook-dell)
* Corpo ............. conteúdo em blocos do Gutenberg
* Meta description .. resumo (excerpt) e campo ACF "chamada"
* Marca ............. categoria (criada se não existir)
* Enviado em ........ data de publicação, a partir das 09:00, 1 min por post
* Meta title ........ ignorado (o site gera o título da aba)

== Uso ==

1. Suba a pasta importador-posts (com o posts.json) para /wp-content/plugins/
2. Ative o plugin
3. Ferramentas > Importar Posts > "Simular" e confira a tabela
4. "Importar e publicar"
5. Confira o aviso de deploy no topo do resultado e acompanhe no GitHub Actions
6. Desative e remova o plugin

Durante a importação o GitHub Deploy Trigger fica suspenso (via o transient
github_deploy_pending); ao final é disparado um único deploy.

Rodar de novo é seguro: posts com o mesmo slug são atualizados, não
duplicados. Um post na lixeira não conta — seria criado de novo.
