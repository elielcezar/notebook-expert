# Detalhes Técnicos - Integração WordPress Headless

## 🔍 Análise Técnica

### Por que `cache: 'no-store'` não funciona?

O Next.js 16 com `output: 'export'` gera um site **100% estático**. Durante o build:

1. Next.js executa todas as funções `async` que retornam dados
2. Gera HTML estático para cada página
3. Não há servidor Node.js rodando em produção

Quando você usa `cache: 'no-store'` ou `next: { revalidate: 0 }`, o Next.js interpreta isso como:
- "Este conteúdo é dinâmico"
- "Precisa ser renderizado no servidor"
- "Não pode ser pré-renderizado"

Mas com `output: 'export'`, **tudo precisa ser pré-renderizado**. Então o Next.js lança erro:

```
Route /dicas/[slug] with `dynamic = "error"` couldn't be rendered statically
```

**Solução:** Remover opções de cache. O fetch acontece **uma única vez** durante o build, e o resultado é usado para gerar HTML estático.

---

### Estrutura de Dados do WordPress

A API WordPress REST retorna posts no formato:

```json
{
  "id": 15,
  "slug": "teste-3",
  "title": { "rendered": "Título do Post" },
  "content": { "rendered": "<p>Conteúdo HTML</p>" },
  "excerpt": { "rendered": "<p>Resumo</p>" },
  "date": "2025-12-09T14:36:05",
  "_embedded": {
    "author": [{ "name": "admin" }],
    "wp:featuredmedia": [{ "source_url": "https://..." }],
    "wp:term": [[{ "name": "Categoria", "slug": "categoria" }]]
  }
}
```

A função `extractPostData()` normaliza isso para:

```typescript
{
  id: 15,
  slug: "teste-3",
  title: "Título do Post",
  content: "<p>Conteúdo HTML</p>",
  excerpt: "Resumo",
  date: "2025-12-09T14:36:05",
  author: "admin",
  featuredImage: "https://...",
  category: "Categoria"
}
```

---

### Como funciona `generateStaticParams()`

```typescript
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}
```

**Durante o build:**
1. Next.js chama `generateStaticParams()`
2. Busca todos os slugs do WordPress
3. Para cada slug, gera uma página estática
4. Chama `getPostBySlug(slug)` para obter conteúdo

**Resultado:** Arquivos em `out/dicas/teste-3.html`, `out/dicas/teste-2.html`, etc.

---

### Por que `dynamicParams = false`?

```typescript
export const dynamicParams = false;
```

Isso significa:
- **Apenas** os slugs retornados por `generateStaticParams()` serão gerados
- Se um novo post for publicado, sua página **não existirá** até o próximo build
- Acessar `/dicas/novo-post` retornará 404

**Alternativa:** `dynamicParams = true` permitiria gerar páginas dinâmicas, mas isso **não funciona** com `output: 'export'`.

---

### Configuração do Domínio Principal

**Estrutura no servidor (pós-migração):**
```
/home/u265754230/
  └── domains/
      └── notebookexpert.com.br/
          └── public_html/        ← Raiz do site em produção
              ├── _OLD/           ← Backup do site antigo (preservado)
              ├── admin/          ← WordPress headless (preservado)
              ├── dicas/
              ├── seminovos/
              ├── _next/
              ├── .htaccess
              └── index.html
```

**Configuração:**
- `notebookexpert.com.br` → `/public_html/`
- `novo.notebookexpert.com.br` → 301 permanente para o domínio principal (preserva path)

**Por isso:**
- `BASE_PATH` é vazio
- URLs geradas: `notebookexpert.com.br/dicas` (sem prefixo)
- O secret `FTP_SERVER_DIR` no GitHub Actions é `/` (raiz do FTP, que entra direto em `public_html`)

### Proteção de pastas externas no deploy

O FTP-Deploy-Action **deleta** arquivos do servidor que não estão em `out/` (mesmo com `dangerous-clean-slate: false`). Como `_OLD/` e `admin/` convivem na mesma raiz, o workflow usa `exclude` para preservá-las:

```yaml
exclude: |
  **/.git*
  **/.git*/**
  **/node_modules/**
  _OLD/**
  admin/**
  .ftp-deploy-sync-state.json
```

**Sempre que adicionar nova pasta na raiz que não pertença ao Next, lembrar de adicionar ao `exclude`.**

### .htaccess para roteamento

O Next.js com `output: 'export'` gera `dicas.html` lado a lado com a pasta `dicas/` (que contém os posts). Sem `.htaccess`, o Apache não sabe qual servir e devolve 403.

O arquivo [`public/.htaccess`](../public/.htaccess) contém regras que:
- Reescrevem `/foo` para `/foo.html` quando o arquivo existe
- Mapeiam 404 para `/404.html` (página customizada do Next)
- Aplicam gzip e cache de assets
- Mantêm HTML revalidando a cada hora (necessário por causa do cache agressivo do LiteSpeed)

Tudo em `public/` é copiado para `out/` no build, então o `.htaccess` entra automaticamente no fluxo de deploy.

---

### Plugin WordPress - Fluxo Interno

```php
// Hook disparado quando post é publicado
add_action('publish_post', [$this, 'trigger_deploy']);

function trigger_deploy($post_id, $post) {
    // Evita múltiplos disparos
    if (get_transient('github_deploy_triggered_' . $post_id)) {
        return;
    }
    set_transient('github_deploy_triggered_' . $post_id, true, 60);
    
    // Envia requisição para GitHub
    wp_remote_post('https://api.github.com/repos/USER/REPO/dispatches', [
        'headers' => [
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/vnd.github.v3+json'
        ],
        'body' => json_encode([
            'event_type' => 'wordpress_publish'
        ])
    ]);
}
```

**GitHub recebe:**
```yaml
on:
  repository_dispatch:
    types: [wordpress_publish]  # ← Dispara workflow
```

---

### GitHub Actions - Variáveis de Ambiente

```yaml
- name: Build Next.js
  run: npm run build
  env:
    NEXT_PUBLIC_WP_API_URL: ${{ secrets.WP_API_URL }}
```

**Importante:** Variáveis que começam com `NEXT_PUBLIC_` são expostas ao código cliente. Como estamos fazendo build estático, elas são **embutidas no código** durante o build.

**Verificação:**
```bash
# Verificar se variável está sendo usada
grep -r "NEXT_PUBLIC_WP_API_URL" out/
```

---

### FTP Deploy - Como Funciona

O action `SamKirkland/FTP-Deploy-Action`:

1. Compara arquivos locais (`out/`) com servidor
2. Calcula diferenças (hash dos arquivos)
3. Envia apenas arquivos modificados
4. Cria arquivo `.ftp-deploy-sync-state.json` para rastrear estado

**Vantagem:** Deploys subsequentes são mais rápidos (só envia mudanças).

**Problema comum:** Se `.ftp-deploy-sync-state.json` ficar desatualizado, pode não enviar arquivos novos.

**Solução:** Usar `dangerous-clean-slate: false` (padrão) para segurança.

---

### Cache do LiteSpeed

A Hostinger usa LiteSpeed Web Server com cache agressivo.

**Problema:** Arquivos atualizados podem não aparecer imediatamente.

**Soluções:**
1. Limpar cache via hPanel
2. Adicionar headers no `.htaccess`:
   ```apache
   <IfModule mod_headers.c>
       Header set Cache-Control "no-cache, no-store, must-revalidate"
   </IfModule>
   ```
3. Usar query string: `?v=123` para forçar reload

**Nota:** Para produção, cache é bom para performance. O problema é quando arquivos são atualizados.

---

## 🧪 Testes

### Teste Local do Build

```bash
# Limpar cache
rm -rf .next out

# Build
npm run build

# Verificar arquivos gerados
ls -la out/dicas/

# Verificar conteúdo
cat out/dicas/teste-3.html | head -20
```

### Teste da API WordPress

```bash
# Listar posts
curl "https://admin.notebookexpert.com.br/wp-json/wp/v2/posts?per_page=5"

# Buscar post específico
curl "https://admin.notebookexpert.com.br/wp-json/wp/v2/posts?slug=teste-3&_embed"
```

### Teste do Plugin WordPress

1. WordPress Admin > Configurações > GitHub Deploy
2. Clicar em "Disparar Deploy de Teste"
3. Verificar log de atividades
4. Verificar GitHub Actions (deve aparecer workflow executado)

---

## 📊 Performance

### Tempo de Deploy

| Etapa | Tempo Médio |
|-------|-------------|
| Build Next.js | 1-2 min |
| Deploy FTP | 1-2 min |
| **Total** | **3-5 min** |

### Otimizações Possíveis

1. **Cache de dependências no GitHub Actions**
   ```yaml
   - uses: actions/setup-node@v4
     with:
       cache: 'npm'  # ← Já configurado
   ```

2. **Build cache do Next.js**
   - Adicionar `cache: true` no workflow
   - Acelera builds subsequentes

3. **Deploy incremental**
   - FTP Deploy já faz isso automaticamente
   - Só envia arquivos modificados

---

## 🔐 Segurança

### Personal Access Token (PAT)

**Scopes necessários:**
- `repo` - Para disparar `repository_dispatch`

**Boas práticas:**
- Token com expiração (90 dias recomendado)
- Rotacionar periodicamente
- Não commitar token no código
- Usar secrets do GitHub

### CORS no WordPress

**Configuração no `.htaccess`:**
```apache
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, OPTIONS"
```

**Alternativa mais segura:**
```apache
Header set Access-Control-Allow-Origin "https://notebookexpert.com.br"
```

---

## 🐛 Troubleshooting Avançado

### Build falha silenciosamente

**Sintoma:** Build completa mas arquivos estão vazios ou com erro.

**Diagnóstico:**
```bash
# Verificar logs durante build
npm run build 2>&1 | grep -i "error\|wordpress"
```

**Solução:** Verificar se `WP_API_URL` está correto e acessível.

---

### Posts não aparecem na lista

**Sintoma:** Página `/dicas` mostra "Em breve..." mas posts existem.

**Diagnóstico:**
1. Verificar `out/dicas.html` - contém posts?
2. Se não, `getPosts()` está falhando
3. Verificar logs do build

**Solução:** Testar API diretamente e verificar CORS.

---

### Deploy FTP falha

**Sintoma:** Build funciona mas deploy dá erro.

**Diagnóstico:**
- Verificar credenciais FTP
- Verificar caminho `FTP_SERVER_DIR`
- Verificar permissões no servidor

**Solução:** Testar conexão FTP manualmente com FileZilla.

---

## 📝 Notas de Desenvolvimento

### Por que não usar ISR?

ISR (Incremental Static Regeneration) requer servidor Node.js. Com hospedagem compartilhada (Hostinger), não temos servidor Node.js disponível.

**Alternativa:** Build agendado 2x ao dia como "quase-ISR".

### Por que não usar Client-Side Rendering?

CSR prejudica SEO. Google pode não indexar conteúdo carregado via JavaScript.

**Solução atual:** SSG (Static Site Generation) - melhor para SEO.

### Futuras Melhorias

1. **Webhook com retry automático**
   - Se GitHub Actions falhar, plugin tenta novamente

2. **Notificações**
   - Email/Telegram quando deploy completar

3. **Preview de rascunhos**
   - Usar WordPress Preview API para preview antes de publicar

---

**Última atualização:** 06/05/2026

