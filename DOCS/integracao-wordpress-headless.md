# Integração WordPress Headless - Documentação Completa

## 📋 Visão Geral

Este documento descreve a integração completa do frontend Next.js com WordPress Headless para servir conteúdo do blog dinamicamente, com deploy automático via GitHub Actions.

---

## 🏗️ Arquitetura

```
WordPress (admin.notebookexpert.com.br)
    |
    | [Publica post]
    v
Plugin WordPress (GitHub Deploy Trigger)
    |
    | [Webhook]
    v
GitHub Actions (Build & Deploy)
    |
    | [FTP]
    v
Hostinger (notebookexpert.com.br)
```

---

## 🔧 Componentes Implementados

### 1. Frontend Next.js

#### Arquivos Modificados:

**`lib/wordpress.ts`**
- Funções para buscar posts da API WordPress
- `getPosts()` - Lista todos os posts
- `getPostBySlug()` - Busca post individual
- `getAllPostSlugs()` - Para `generateStaticParams`
- `extractPostData()` - Normaliza dados do WordPress

**`app/dicas/page.tsx`**
- Página de listagem de posts
- Consome `getPosts()` do WordPress
- Renderiza lista com cards de posts

**`app/dicas/[slug]/page.tsx`**
- Página individual de post
- Usa `generateStaticParams()` para gerar páginas estáticas
- Consome `getPostBySlug()` para conteúdo

**`next.config.js`**
- Configurado para `output: 'export'` (static export)
- `remotePatterns` para imagens do WordPress
- `basePath` removido (subdomínio já aponta para pasta)

---

### 2. Plugin WordPress

**Localização:** `wordpress/github-deploy-trigger/`

**Funcionalidades:**
- Dispara webhook para GitHub Actions em:
  - ✅ Publicação de posts/páginas
  - ✅ Edição de posts já publicados
  - ✅ Exclusão/movimento para lixeira
  - ✅ Restauração da lixeira
- Página de configurações no admin (`Configurações > GitHub Deploy`)
- Botão de teste manual
- Log de atividades
- Configuração de triggers (posts/páginas)

**Configuração Necessária:**
- Personal Access Token do GitHub (scope: `repo`)
- Repositório no formato `usuario/repositorio`

---

### 3. GitHub Actions Workflow

**Arquivo:** `.github/workflows/deploy.yml`

**Triggers:**
- `repository_dispatch` (webhook do WordPress)
- `push` na branch `main`
- `workflow_dispatch` (manual)
- `schedule` (2x ao dia como backup)

**Steps:**
1. Checkout do código
2. Setup Node.js 20
3. Install dependencies (`npm ci`)
4. Build Next.js com variáveis de ambiente
5. Deploy via FTP para Hostinger

---

## ⚙️ Configuração

### Secrets do GitHub

Configurar em `Settings > Secrets and variables > Actions`:

| Secret | Valor | Descrição |
|--------|-------|-----------|
| `WP_API_URL` | `https://admin.notebookexpert.com.br/wp-json/wp/v2` | URL da API WordPress |
| `FTP_SERVER` | `82.25.67.229` | IP do servidor FTP (sem `ftp://`) |
| `FTP_USERNAME` | `u265754230.eliel` | Usuário FTP |
| `FTP_PASSWORD` | `*******` | Senha FTP |
| `FTP_SERVER_DIR` | `/` | Diretório no servidor (raiz do FTP, equivalente ao `public_html`) |

**Nota:** `BASE_PATH` não é usado em produção — o domínio principal aponta direto para a raiz do FTP, então URLs são geradas sem prefixo (ex: `/dicas`, não `/novo/dicas`).

---

### Variáveis de Ambiente Local

**`.env.local`** (não commitado):
```
NEXT_PUBLIC_WP_API_URL=https://admin.notebookexpert.com.br/wp-json/wp/v2
```

---

## 🐛 Problemas Encontrados e Soluções

### Problema 1: Build gerava páginas 404

**Sintoma:** Arquivos HTML gerados eram páginas de erro 404.

**Causa:** Uso de `cache: 'no-store'` e `next: { revalidate: 0 }` incompatíveis com `output: 'export'`.

**Solução:** Remover todas as opções de cache do fetch. O Next.js faz fetch uma única vez durante o build estático.

**Código corrigido:**
```typescript
// ❌ ANTES (não funciona com static export)
const res = await fetch(url, {
  cache: 'no-store'
});

// ✅ DEPOIS (funciona)
const res = await fetch(url);
```

---

### Problema 2: BASE_PATH duplicado (histórico — pré-migração para domínio principal)

**Sintoma:** Quando o site rodava em subdomínio (`novo.notebookexpert.com.br`), em alguns deploys ele buscava arquivos em `/novo/novo/_next/...`

**Causa:** Subdomínio apontava para `/novo/` + `BASE_PATH` configurado como `/novo`.

**Solução:** `BASE_PATH` ficou desabilitado e nunca mais voltou. Após a migração para o domínio principal, esse cenário não se aplica mais.

---

### Problema 3: Arquivos não atualizavam no servidor

**Sintoma:** Deploy funcionava mas arquivos antigos permaneciam.

**Causa:** Cache do LiteSpeed na Hostinger.

**Solução:** Limpar cache via hPanel (`Avançado > Cache Manager`).

---

### Problema 4: Posts individuais retornavam 404

**Sintoma:** `/dicas/teste-3` dava 404 mesmo com arquivo existindo.

**Causa:** Conflito entre arquivo `.html` e pasta com mesmo nome.

**Solução:** Ajustar `.htaccess` para priorizar arquivos `.html` sobre pastas (já estava configurado, mas cache estava servindo versão antiga).

---

## 📝 Checklist de Deploy

### Primeira Configuração

- [ ] WordPress instalado e funcionando
- [ ] CORS configurado no `.htaccess` do WordPress
- [ ] Plugin GitHub Deploy Trigger instalado
- [ ] Personal Access Token gerado no GitHub
- [ ] Secrets configurados no GitHub
- [ ] Workflow testado manualmente
- [ ] Post de teste criado no WordPress

### Após Cada Mudança

- [ ] Build local testado (`npm run build`)
- [ ] Arquivos em `out/` verificados
- [ ] Deploy via GitHub Actions executado
- [ ] Cache do LiteSpeed limpo (se necessário)
- [ ] Site testado em aba anônima

---

## 🔍 Debug

### Verificar se API está acessível

```bash
curl "https://admin.notebookexpert.com.br/wp-json/wp/v2/posts?per_page=1"
```

### Verificar build local

```bash
npm run build
# Verificar arquivos em out/dicas/
```

### Verificar logs do GitHub Actions

1. Acesse `Actions` no GitHub
2. Clique no workflow executado
3. Expanda step "Build Next.js" para ver erros

### Verificar logs do plugin WordPress

1. WordPress Admin > Configurações > GitHub Deploy
2. Seção "Log de Atividades"

---

## 📚 Referências

- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [FTP Deploy Action](https://github.com/SamKirkland/FTP-Deploy-Action)

---

## 🚀 Fluxo Completo

### Cenário 1: Publicação de Novo Post

1. **Cliente publica post no WordPress**
   - Acessa `admin.notebookexpert.com.br`
   - Cria novo post
   - Clica em "Publicar"

2. **Plugin dispara webhook**
   - Hook `publish_post` detecta publicação
   - Envia requisição para GitHub API
   - Dispara `repository_dispatch` com tipo `wordpress_publish`

3. **GitHub Actions executa**
   - Recebe webhook
   - Faz checkout do código
   - Instala dependências
   - Executa `npm run build`
   - Durante build, Next.js busca posts da API WordPress
   - Gera arquivos estáticos em `out/`

4. **Deploy via FTP**
   - GitHub Actions conecta no FTP da Hostinger
   - Envia arquivos de `out/` para `/novo/`
   - Substitui arquivos antigos

5. **Site atualizado**
   - Em ~3-5 minutos, post aparece no site
   - Acessível em `notebookexpert.com.br/dicas/[slug]`

### Cenário 2: Edição de Post Publicado

1. **Cliente edita post existente**
   - Abre post já publicado
   - Faz alterações no título ou conteúdo
   - Salva alterações

2. **Plugin detecta mudanças**
   - Hook `post_updated` compara versões
   - Se houve mudança em título ou conteúdo, dispara webhook
   - Mesmo fluxo de deploy (passos 3-5 acima)

3. **Site atualizado**
   - Post atualizado aparece no site em ~3-5 minutos

### Cenário 3: Exclusão de Post

1. **Cliente exclui post**
   - Move post para lixeira OU exclui permanentemente
   - Plugin detecta via hooks `trashed_post` ou `before_delete_post`

2. **Deploy automático**
   - Webhook disparado
   - Build regenera site sem o post excluído
   - Arquivo HTML do post é removido do servidor

3. **Site atualizado**
   - Post removido do site em ~3-5 minutos
   - Acesso ao slug retorna 404

### Cenário 4: Restauração da Lixeira

1. **Cliente restaura post**
   - Restaura post da lixeira
   - Post volta ao status "Publicado"

2. **Deploy automático**
   - Hook `untrashed_post` detecta restauração
   - Webhook disparado
   - Post volta a aparecer no site

---

## ⚠️ Limitações

1. **Posts novos só aparecem após rebuild**
   - Com `output: 'export'`, não há ISR dinâmico
   - Necessário rebuild + deploy para novos posts

2. **Build agendado como backup**
   - Se webhook falhar, build agendado (2x/dia) atualiza o site
   - Garante que posts apareçam em até 12 horas

3. **Sem preview de rascunhos**
   - Apenas posts publicados aparecem no site
   - Rascunhos não são acessíveis

---

## 🔄 Manutenção

### Atualizar plugin WordPress

1. Editar arquivos em `wordpress/github-deploy-trigger/`
2. Fazer upload via FTP para `/wp-content/plugins/github-deploy-trigger/`
3. Ativar/desativar plugin no WordPress Admin

### Atualizar workflow GitHub Actions

1. Editar `.github/workflows/deploy.yml`
2. Commit e push
3. Workflow atualiza automaticamente

### Adicionar novos secrets

1. GitHub > Settings > Secrets > Actions
2. New repository secret
3. Adicionar nome e valor
4. Workflow usa automaticamente via `${{ secrets.NOME }}`

---

## 🔍 SEO em Produção

### Sitemap

O sitemap é gerado automaticamente em cada build a partir de [`app/sitemap.ts`](../app/sitemap.ts), incluindo:
- Páginas estáticas (`/`, `/sobre`, `/servicos`, `/franquia`, `/para-empresas`, `/compra-venda`, `/dicas`)
- Posts do blog (busca slugs em `getAllPostSlugs()`)
- Seminovos (busca slugs em `getAllSeminovoSlugs()`)

URL pública: `https://notebookexpert.com.br/sitemap.xml`

O [`public/robots.txt`](../public/robots.txt) já referencia o sitemap. Não é necessária ação manual além de aguardar o build.

### Google Search Console — passo a passo

1. **Acessar** [search.google.com/search-console](https://search.google.com/search-console)
2. **Adicionar propriedade** → escolher tipo "Prefixo do URL" → `https://notebookexpert.com.br`
3. **Verificar propriedade**. Opções:
   - **Recomendada — DNS TXT (cobre todos os subdomínios):** copiar o registro TXT que o Google fornecer, adicionar em hPanel → DNS Zone Editor → "Add new record" → tipo TXT, host `@`, valor o token. Aguardar propagação (~5min a 24h) e clicar "Verificar".
   - **Alternativa — meta tag HTML:** o Google fornece um código `<meta name="google-site-verification" content="..." />`. Para incluir, readicionar em [`app/layout.tsx`](../app/layout.tsx) o bloco de verification (que foi removido no commit de migração porque era placeholder):
     ```ts
     verification: {
       google: "COLE-AQUI-O-CODIGO-DO-SEARCH-CONSOLE",
     },
     ```
4. **Enviar sitemap:** Search Console → Sitemaps → adicionar `sitemap.xml` (caminho relativo, sem o domínio).
5. **Aguardar 1–7 dias** para o Google começar a indexar.
6. **Verificar cobertura** em "Indexação > Páginas" depois de alguns dias.

### Bing Webmaster Tools (opcional)

Procedimento análogo em [bing.com/webmasters](https://www.bing.com/webmasters). O Bing aceita importar a propriedade já verificada do Google (botão "Importar do Google Search Console") — mais rápido que verificar de novo.

---

## 📞 Suporte

Para problemas ou dúvidas:
- Verificar logs do GitHub Actions
- Verificar logs do plugin WordPress
- Testar API WordPress diretamente
- Verificar configuração de secrets

---

**Última atualização:** 06/05/2026
**Versão:** 2.0.0 (pós-migração para domínio principal)

