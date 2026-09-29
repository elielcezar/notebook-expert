# Replicar a integração WordPress Headless em outro projeto

Passo a passo para montar o mesmo setup (Next.js estático + WordPress headless +
deploy automático por GitHub Actions/FTP) em um projeto novo, reaproveitando os
arquivos de [`wordpress/`](../wordpress/) e de [`lib/wordpress.ts`](../lib/wordpress.ts).

Premissa: a stack do projeto novo é idêntica — Next.js 16 App Router,
TypeScript, `output: 'export'`, hospedagem compartilhada com FTP
(Hostinger/LiteSpeed) e WordPress em subdomínio.

> **Ordem importa.** Faça o WordPress inteiro antes de tocar no Next.js: sem
> CPTs, ACF e CORS prontos, o build do Next falha e você perde tempo
> diagnosticando o lado errado.

---

## Visão geral do que precisa existir

```
WordPress (admin.SEUDOMINIO.com.br)          Repositório Next.js
├── Plugin expert-headless-mode              ├── lib/wordpress.ts
├── Plugin github-deploy-trigger ──webhook──►├── .github/workflows/deploy.yml
├── CPTs (show_in_rest: true)                ├── public/.htaccess
├── Campos ACF (Show in REST: sim)           ├── app/**/page.tsx
└── CORS liberado no .htaccess               └── next.config.js (output: export)
                                                      │
                                                      └──FTP──► public_html
```

---

## Parte 1 — WordPress

### 1.1 Instalar o WordPress em subdomínio

Use um subdomínio dedicado (`admin.seudominio.com.br`) apontando para uma pasta
separada do site público. O site público e o WordPress **convivem no mesmo
plano de hospedagem**, em pastas diferentes.

Em *Configurações → Links permanentes*, escolha qualquer estrutura "bonita" —
a REST API precisa dos permalinks ativos.

### 1.2 Copiar os dois plugins

Suba por FTP as pastas para `/wp-content/plugins/` e ative as duas:

| Plugin | O que faz | Precisa editar? |
|---|---|---|
| `expert-headless-mode/` | Fecha o frontend do WP, mantém só a REST API, limpa `wp_head`, desativa XML-RPC e comentários | Só o cabeçalho (nome/autor). O código é genérico |
| `github-deploy-trigger/` | Dispara o rebuild no GitHub ao alterar conteúdo | Sim — ver 1.3 |

### 1.3 Adaptar o `github-deploy-trigger`

Uma única edição obrigatória: a lista de tipos de conteúdo observados, no topo
de [`github-deploy-trigger.php`](../wordpress/github-deploy-trigger/github-deploy-trigger.php):

```php
private function get_watched_post_types() {
    return apply_filters('github_deploy_watched_post_types', [
        'post',
        'page',
        'seminovo',             // ← troque pelos CPTs do projeto novo
        'depoimento',
        'dica_do_especialista',
    ]);
}
```

Se preferir não tocar no plugin, dá para fazer o mesmo pelo filtro, num
mu-plugin do projeto novo:

```php
add_filter('github_deploy_watched_post_types', function ($types) {
    return ['post', 'page', 'produto', 'equipe'];
});
```

Regra embutida em `should_trigger_for()`: `post` e `page` respeitam as caixas de
seleção do admin; **CPT sempre dispara**, porque existe só para alimentar o
frontend. Se algum CPT do projeto novo não for consumido pelo site, não o
coloque na lista.

Atualize também o cabeçalho do plugin (`Plugin Name`, `Description`, `Author`,
`Plugin URI`) para não confundir dois WordPress diferentes.

### 1.4 Registrar os CPTs e os campos ACF

**Isso não está no repositório** — os CPTs e os grupos de campos foram criados
pela interface (ACF / CPT UI). No projeto novo, ao registrar cada CPT:

```php
register_post_type('produto', [
    'public'       => true,
    'show_in_rest' => true,      // ← sem isto o CPT não aparece na REST API
    'rest_base'    => 'produto', // ← é o que vira /wp-json/wp/v2/produto
    'supports'     => ['title', 'editor', 'thumbnail'],
]);
```

Nos grupos de campos do ACF, marque **"Show in REST API" = Sim** em cada grupo.
Sem isso a chave `acf` simplesmente não vem na resposta.

Teste cada endpoint no navegador antes de seguir:

```
https://admin.seudominio.com.br/wp-json/wp/v2/produto?acf_format=standard
https://admin.seudominio.com.br/wp-json/wp/v2/pages/42?acf_format=standard
```

> `acf_format=standard` faz o ACF devolver URLs/valores resolvidos em vez de
> IDs. Campos de imagem e galeria dependem disso.

### 1.5 Liberar CORS

No `.htaccess` do WordPress:

```apache
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "https://seudominio.com.br"
  Header set Access-Control-Allow-Methods "GET, OPTIONS"
</IfModule>
```

### 1.6 Anotar os IDs das páginas

As páginas de conteúdo são buscadas **por ID**, não por slug. Abra cada página no
admin e anote o `post=NNN` da URL — esses números vão para o código do Next.

Consequência a comunicar ao cliente: **renomear** a página é seguro, **excluir e
recriar** quebra o build.

---

## Parte 2 — Projeto Next.js

### 2.1 Copiar `lib/wordpress.ts`

Copie o arquivo inteiro. Depois ajuste:

1. **A URL padrão** na primeira linha (o fallback usado em dev):
   ```ts
   const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://admin.seudominio.com.br/wp-json/wp/v2';
   ```
2. **As interfaces e funções dos CPTs.** `WordPressSeminovo`, `getSeminovos`,
   `getSeminovoBySlug`, `getAllSeminovoSlugs`, `getLatestExpertTip`,
   `getTestimonials` são específicos deste projeto — troque pelos CPTs novos
   seguindo o mesmo formato:
   ```ts
   export async function getProdutos(perPage = 100): Promise<WordPressProduto[]> {
     const res = await wpFetch(`/produto?per_page=${perPage}&acf_format=standard&orderby=date&order=desc`);
     return res.json();
   }
   ```

**Não altere** `wpFetch()`, `decodeHtmlEntities()` nem `stripHtml()` — são a
parte genérica e já carregam as correções descritas na Parte 5.

Regra de retorno a manter: `null` significa "não existe"; falha de rede ou HTTP
vira **exceção** e derruba o build. Isso é intencional.

### 2.2 `next.config.js`

```js
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,              // não há servidor para otimizar imagens
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.seudominio.com.br',   // ← domínio do WP
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  compiler: { removeConsole: process.env.NODE_ENV === 'production' },
};
```

Se o site novo for servido a partir de uma **subpasta**, preencha
`NEXT_PUBLIC_BASE_PATH` e use o prefixo em todo `href`/`src` escrito à mão:

```tsx
<a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/servicos`}>
```

Se for na raiz do domínio, deixe vazio e economize esse trabalho todo.

### 2.3 `.env.local`

```env
NEXT_PUBLIC_WP_API_URL=https://admin.seudominio.com.br/wp-json/wp/v2
```

### 2.4 Páginas dinâmicas (o padrão a copiar)

Para cada tipo de conteúdo com página própria, siga exatamente este molde:

```tsx
// app/produtos/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = await getAllProdutoSlugs();
  return slugs.map((slug) => ({ slug }));
}

// só os slugs acima existem; conteúdo novo exige rebuild
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getProdutoBySlug(slug);
  if (!item) return { title: "Não encontrado" };
  return { title: item.title.rendered /* … */ };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getProdutoBySlug(slug);
  if (!item) notFound();
  // …
}
```

Três detalhes que quebram o build se ignorados:

- `params` é uma **Promise** no Next 16 — sempre `await params`.
- **Nenhuma opção de cache no `fetch`.** `cache: 'no-store'` e
  `next: { revalidate }` são incompatíveis com `output: 'export'`.
- Conteúdo do WP entra com `dangerouslySetInnerHTML` e classes `prose` do
  `@tailwindcss/typography`.

Na home, busque tudo em paralelo:

```tsx
const [pageA, pageB, itens] = await Promise.all([
  getPageById(42),
  getPageById(57),
  getProdutos(),
]);
```

### 2.5 `public/.htaccess`

**Copie o arquivo sem alterações.** É o que impede o 403 clássico do export
estático: o Next gera `produtos.html` ao lado da pasta `produtos/`, e sem as
regras de rewrite o Apache/LiteSpeed não sabe qual servir.

Tudo em `public/` vai para `out/` no build, então ele entra no deploy sozinho.

### 2.6 `sitemap.ts` e `robots.txt`

Copie [`app/sitemap.ts`](../app/sitemap.ts), troque `BASE_URL` e a lista de
rotas. Os dois `export` do topo são obrigatórios com export estático:

```ts
export const dynamic = "force-static";
export const revalidate = false;
```

Em `public/robots.txt`, aponte o `Sitemap:` para o domínio novo.

---

## Parte 3 — GitHub Actions

### 3.1 Copiar o workflow

Copie [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml). Só o
nome do grupo de concorrência precisa mudar, se houver outros workflows:

```yaml
concurrency:
  group: deploy-producao
  cancel-in-progress: false
```

**Não simplifique** estes quatro pontos — cada um corrige um incidente real:

| Item | Por quê |
|---|---|
| `concurrency` + `cancel-in-progress: false` | Dois deploys simultâneos se derrubam no FTP da Hostinger ("Timeout (control socket)"). Cancelar no meio deixaria o servidor em estado parcial |
| `timeout: 120000` no FTP | O export gera centenas de arquivos pequenos; o padrão de 30s estoura |
| `exclude:` com as pastas externas | O FTP-Deploy-Action **apaga** do servidor o que não existe em `out/`. Liste aqui toda pasta da raiz que não pertence ao Next (ex.: `admin/**`, `_OLD/**`) |
| Step de keepalive | O GitHub desativa workflows agendados após 60 dias sem commits. Aconteceu e congelou o site |

O keepalive exige `permissions: contents: write` no job.

### 3.2 Secrets do repositório

Settings → Secrets and variables → Actions:

| Secret | Valor |
|---|---|
| `WP_API_URL` | `https://admin.seudominio.com.br/wp-json/wp/v2` |
| `FTP_SERVER` | IP do servidor, sem `ftp://` |
| `FTP_USERNAME` | usuário FTP |
| `FTP_PASSWORD` | senha FTP |
| `FTP_SERVER_DIR` | `/` se o domínio aponta para a raiz do FTP |
| `BASE_PATH` | vazio, ou `/subpasta` |

### 3.3 Token do GitHub para o plugin

1. https://github.com/settings/tokens → *Generate new token (classic)*
2. Scope: **`repo`**
3. Cole em *Configurações → GitHub Deploy* no WordPress, junto com o
   repositório no formato `usuario/repositorio`
4. Clique em **Disparar Deploy de Teste** e confira o log do plugin e a aba
   Actions

> O GitHub responde **204 (sucesso)** ao `repository_dispatch` mesmo quando o
> workflow está desativado ou o `event_type` não bate. Plugin dizendo "deploy
> disparado" sem nada aparecer no Actions costuma ser isso.

---

## Parte 4 — Checklist de validação

Antes de entregar ao cliente, confirme na ordem:

- [ ] `curl https://admin.seudominio.com.br/wp-json/wp/v2/posts?per_page=1` responde JSON
- [ ] Cada CPT responde em `/wp-json/wp/v2/<rest_base>`
- [ ] A chave `acf` aparece nas respostas de páginas e CPTs
- [ ] `npm run build` local gera `out/` com os HTMLs esperados
- [ ] Um arquivo de post contém o conteúdo real (`grep` por um trecho do texto)
- [ ] `out/.htaccess` existe
- [ ] `out/sitemap.xml` lista todas as rotas
- [ ] Deploy manual pelo Actions conclui e o site abre
- [ ] Publicar um post de teste no WP dispara o workflow sozinho
- [ ] O post aparece no site em 3–5 min
- [ ] Mandar o post para a lixeira remove a página do site
- [ ] Cache do LiteSpeed limpo (hPanel → Avançado → Cache Manager) e testado em aba anônima
- [ ] Pastas externas (`admin/`, backups) continuam no servidor após o deploy

---

## Parte 5 — Armadilhas já pagas neste projeto

Ler antes de "melhorar" o código copiado.

**`cache: 'no-store'` gera páginas 404.** Com `output: 'export'` o Next entende
que a rota é dinâmica e não consegue pré-renderizar. Sem opções de cache, o
fetch roda uma vez no build — que é o comportamento desejado.

**O WAF da Hostinger barra o `User-Agent: node`.** O `fetch` do Node manda esse
UA por padrão e leva 403 de bot. O `wpFetch()` manda um UA identificando o
build.

**Rajadas de requisições levam bloqueio temporário.** Daí a retentativa com
espera crescente (2s → 5s → 15s → 30s). Não reduza a lista.

**Nunca devolva `[]` quando a API falhar.** Em site estático, um build que passa
com dados vazios publica páginas vazias e apaga o conteúdo do ar. Deixe estourar
a exceção: build quebrado é recuperável, deploy vazio não.

**Um salvamento no editor de blocos dispara vários hooks.** Salvar um post
publicado aciona `publish_{post_type}` **e** `post_updated`, e o editor salva
mais de uma vez. Sem o debounce global de 45s do plugin, uma edição virava 4
deploys concorrentes.

**`publish_post` só cobre o tipo `post`.** Para CPT é `publish_{post_type}`,
registrado no `init` com prioridade 20 (depois de os CPTs existirem) — é o que
`register_publish_hooks()` faz.

**Fallback de imagem entre listagem e detalhe.** Se a listagem usa a galeria ACF
e o detalhe cai na imagem destacada (ou vice-versa), o mesmo item aparece com
imagens diferentes nas duas telas. Escolha **uma** fonte de imagem por tipo de
conteúdo e mantenha.

**O WordPress devolve entidades HTML.** Títulos vêm com `&#8220;`, `&#8211;` e
afins. Use `stripHtml()` / `decodeHtmlEntities()` em todo texto que não for
renderizado como HTML.

**O cache do LiteSpeed engana.** Arquivo atualizado no FTP e site mostrando o
antigo quase sempre é cache — limpe pelo hPanel antes de investigar o build.

**O cron do GitHub morre sozinho.** 60 dias sem atividade no repositório e os
workflows agendados são desativados sem aviso. O step de keepalive existe por
isso.

---

## O que NÃO está neste repositório

Ao replicar, lembre que estes itens moram no WordPress e precisam ser
recriados à mão:

- Registro dos CPTs (`show_in_rest`, `rest_base`, `supports`)
- Grupos de campos ACF e a opção "Show in REST API"
- O `.htaccess` do WordPress (CORS)
- Conteúdo e IDs das páginas
