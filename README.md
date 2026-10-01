# Notebook Expert

Site institucional da Notebook Expert (assistência técnica de notebooks em Curitiba), em Next.js com **export estático**, alimentado por um **WordPress headless** e publicado na Hostinger via FTP pelo GitHub Actions.

- **Produção:** https://notebookexpert.com.br
- **CMS (headless):** https://admin.notebookexpert.com.br

---

## 🚀 Stack

- **Next.js 16** (App Router) com `output: 'export'` — o site é 100% HTML estático
- **React 18** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (Radix UI) + `@tailwindcss/typography`
- **Lucide React** e **Font Awesome** (via CDN, para os ícones de WhatsApp/redes)
- **Embla Carousel** (galeria de seminovos, carrossel de marcas)
- **TanStack Query** (provider montado em [`app/providers.tsx`](app/providers.tsx))
- **WordPress REST API + ACF** como fonte de conteúdo

---

## 🏗️ Como o projeto funciona

O conteúdo **não** é buscado no navegador. Todas as chamadas ao WordPress
acontecem **uma única vez, durante o build**, e o resultado vira HTML estático
em `out/`. Não há servidor Node em produção — a Hostinger serve arquivos.

```
WordPress (admin.notebookexpert.com.br)
   │  publica/edita conteúdo
   ▼
Plugin GitHub Deploy Trigger  ──webhook──►  GitHub Actions
                                              │ npm run build (busca o WP)
                                              ▼
                                           FTP ──► Hostinger (out/ → public_html)
```

Consequência prática: **um post novo só aparece depois de um novo build**
(~3–5 min). O webhook cobre o fluxo normal; o cron 2×/dia é a rede de segurança.

---

## 📄 Rotas e origem do conteúdo

| Rota | Arquivo | Conteúdo vem de |
|---|---|---|
| `/` | [`app/page.tsx`](app/page.tsx) | 7 páginas do WP por ID + CPTs `dica_do_especialista` e `depoimento` |
| `/servicos` | [`app/servicos/page.tsx`](app/servicos/page.tsx) | página WP `57` |
| `/sobre` | [`app/sobre/page.tsx`](app/sobre/page.tsx) | página WP `137` |
| `/franquia` | [`app/franquia/page.tsx`](app/franquia/page.tsx) | página WP `129` |
| `/para-empresas` | [`app/para-empresas/page.tsx`](app/para-empresas/page.tsx) | página WP `69` |
| `/compra-venda` | [`app/compra-venda/page.tsx`](app/compra-venda/page.tsx) | CPT `seminovo` (listagem) |
| `/compra-venda/[slug]` | [`app/compra-venda/[slug]/page.tsx`](app/compra-venda/[slug]/page.tsx) | CPT `seminovo` (detalhe + galeria ACF) |
| `/reparo-de-notebooks` | [`app/reparo-de-notebooks/page.tsx`](app/reparo-de-notebooks/page.tsx) | todos os posts (25 por página) |
| `/reparo-de-notebooks/pagina/[page]` | [`app/reparo-de-notebooks/pagina/[page]/page.tsx`](app/reparo-de-notebooks/pagina/[page]/page.tsx) | demais páginas da listagem geral |
| `/reparo-de-notebooks/[slug]` | [`app/reparo-de-notebooks/[slug]/page.tsx`](app/reparo-de-notebooks/[slug]/page.tsx) | **marca** (categoria do WP) ou **post** — o mesmo segmento atende os dois |
| `/reparo-de-notebooks/[slug]/pagina/[page]` | [`app/reparo-de-notebooks/[slug]/pagina/[page]/page.tsx`](app/reparo-de-notebooks/[slug]/pagina/[page]/page.tsx) | demais páginas da listagem de uma marca |
| `/sitemap.xml` | [`app/sitemap.ts`](app/sitemap.ts) | rotas fixas + slugs de posts e seminovos |

A antiga seção `/dicas` virou `/reparo-de-notebooks`; o
[`public/.htaccess`](public/.htaccess) redireciona (301) qualquer URL `/dicas/...`
para o equivalente novo. As marcas do submenu "Reparo de Notebooks" vêm das
categorias do WordPress (exceto "Sem categoria") — criar uma categoria nova no WP
cria o item de menu e a página no próximo build. Um post com o mesmo slug de uma
categoria quebra o build de propósito, já que os dois disputariam a mesma URL.

As páginas do WordPress são buscadas **por ID**, não por slug. Os IDs estão
comentados em [`app/page.tsx`](app/page.tsx#L19-L29). Renomear uma página no WP
não quebra nada; **excluir e recriar quebra** — o ID muda e o build passa a
falhar.

---

## 🔌 Integração WordPress

Tudo passa por [`lib/wordpress.ts`](lib/wordpress.ts).

**Funções disponíveis:** `getPosts`, `getPostsPage`, `getPostBySlug`, `getAllPostSlugs`,
`getPostById`, `getCategories`, `getPageById`, `getLatestExpertTip`,
`getTestimonials`, `getSeminovos`, `getSeminovoBySlug`, `getAllSeminovoSlugs`,
além dos helpers `extractPostData`, `stripHtml` e `decodeHtmlEntities`.

Quatro decisões importantes já tomadas nesse arquivo:

1. **Sem opções de cache no `fetch`.** `cache: 'no-store'` e `revalidate` são
   incompatíveis com `output: 'export'` e faziam o build gerar páginas 404.
2. **Retentativa com espera crescente** (2s → 5s → 15s → 30s) e `User-Agent`
   próprio. O anti-DDoS da Hostinger barra o `User-Agent: node` padrão e
   derrubava builds.
3. **Falha do WordPress quebra o build de propósito.** Se uma chamada
   devolvesse `[]` silenciosamente, o deploy publicaria páginas vazias e
   *apagaria* o conteúdo que estava no ar. Build quebrado é recuperável;
   deploy vazio, não.
4. **Posts, categorias e seminovos são buscados uma vez só por build**,
   paginando de 100 em 100 (o limite da API). Listagens, slugs, metadata e
   páginas individuais leem dessa mesma busca. Isso só funciona porque o build
   roda com **um worker** (`experimental.cpus: 1` no `next.config.js`): o cache
   é por processo, e com vários workers cada um baixava a listagem pesada ao
   mesmo tempo e o WordPress respondia 500.

### Tipos de conteúdo no WordPress

| Tipo | Uso no site |
|---|---|
| `post` | Blog em `/dicas` (campo ACF `chamada` como resumo) |
| `page` | Blocos de conteúdo da home e das páginas internas (campos ACF repetidores) |
| `seminovo` (CPT) | Notebooks seminovos; imagens vêm **só** do campo ACF `imagens` |
| `depoimento` (CPT) | Depoimentos na home |
| `dica_do_especialista` (CPT) | Bloco "Dica do Especialista" na home |

Os CPTs e os campos ACF são registrados **no WordPress**, não neste repositório.

---

## 🛠️ Rodando localmente

```bash
npm install
```

Crie `.env.local` (não versionado):

```env
NEXT_PUBLIC_WP_API_URL=https://admin.notebookexpert.com.br/wp-json/wp/v2
```

```bash
npm run dev     # http://localhost:3000
npm run build   # gera o site estático em out/
npm run lint
```

Builds locais reaproveitam respostas do WordPress guardadas em
`.next/cache/fetch-cache`. Se o site gerado mostrar conteúdo desatualizado,
apague essa pasta (o CI sempre começa sem ela).

`npm start` não se aplica: com `output: 'export'` não existe servidor. Para
testar o build, sirva a pasta `out/` com qualquer servidor estático.

### Variáveis de ambiente

| Variável | Valor em produção | Para que serve |
|---|---|---|
| `NEXT_PUBLIC_WP_API_URL` | `https://admin.notebookexpert.com.br/wp-json/wp/v2` | Base da REST API do WP |
| `NEXT_PUBLIC_BASE_PATH` | *(vazio)* | Prefixo de URL. Só é usado se o site voltar a rodar em subpasta |

---

## 🚢 Deploy

Automático por [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

**Dispara em:** webhook do WordPress (`repository_dispatch: wordpress_publish`),
push na `main`, execução manual (`workflow_dispatch`) e cron às 6h e 18h UTC.

**Secrets necessários** (Settings → Secrets and variables → Actions):

| Secret | Descrição |
|---|---|
| `WP_API_URL` | URL da REST API do WordPress |
| `FTP_SERVER` | IP do servidor FTP (sem `ftp://`) |
| `FTP_USERNAME` | Usuário FTP |
| `FTP_PASSWORD` | Senha FTP |
| `FTP_SERVER_DIR` | `/` (raiz do FTP, que já é o `public_html`) |
| `BASE_PATH` | Vazio em produção |

Detalhes do workflow que **não podem ser removidos sem quebrar o deploy**:

- **`concurrency: deploy-producao`** — a Hostinger limita conexões FTP
  simultâneas e dois deploys ao mesmo tempo se derrubavam com
  "Timeout (control socket)". `cancel-in-progress: false` é intencional.
- **`timeout: 120000`** no FTP — o export gera centenas de arquivos pequenos e
  o padrão de 30s estourava no meio.
- **`exclude:`** com `_OLD/**` e `admin/**` — o FTP-Deploy-Action apaga do
  servidor o que não existe em `out/`. **Toda pasta nova na raiz do servidor que
  não pertença ao Next precisa entrar nessa lista.**
- **Step de keepalive** — o GitHub desativa workflows agendados após 60 dias sem
  atividade no repositório (aconteceu em 10/07/2026 e congelou o site). O step
  cria um commit vazio quando o último commit passa de 45 dias.

O [`public/.htaccess`](public/.htaccess) vai junto no build e é o que faz o
Apache/LiteSpeed resolver `/dicas` (arquivo `dicas.html`) convivendo com a pasta
`dicas/`. Sem ele, o servidor devolve 403.

---

## 🔧 Plugins WordPress

Versionados em [`wordpress/`](wordpress/) e instalados manualmente via FTP em
`/wp-content/plugins/`:

- **[`github-deploy-trigger/`](wordpress/github-deploy-trigger/)** — dispara o
  rebuild ao publicar, editar, mandar para a lixeira, excluir ou restaurar
  conteúdo. Tem tela em *Configurações → GitHub Deploy* (token, repositório,
  botão de teste e log). Observa `post`, `page` e os três CPTs; posts e páginas
  respeitam as caixas de seleção, os CPTs sempre disparam. Trava de 45s evita
  que uma única edição gere 4 deploys concorrentes.
- **[`importador-posts/`](wordpress/importador-posts/)** — importação única
  dos posts de [`DOCS/posts-site-expert.md`](DOCS/posts-site-expert.md). O JSON
  é gerado por [`scripts/gerar-posts-importacao.mjs`](scripts/gerar-posts-importacao.mjs).
  Instruções no `readme.txt` da pasta; pode ser removido do WP depois de usado.
- **[`expert-headless-mode/`](wordpress/expert-headless-mode/)** — fecha o
  frontend do WordPress (redireciona para o painel), mantém só a REST API,
  limpa o `wp_head` e desativa XML-RPC e comentários.

---

## 📁 Estrutura

```
.
├── app/                      # Rotas (App Router)
│   ├── compra-venda/[slug]/  # Seminovos
│   ├── dicas/[slug]/         # Blog
│   ├── layout.tsx            # Metadata global + JSON-LD (LocalBusiness)
│   ├── sitemap.ts            # Sitemap gerado no build
│   └── globals.css           # Tokens de cor e classes utilitárias
├── components/               # Seções da página (Hero, FAQ, Services…)
│   └── ui/                   # shadcn/ui
├── lib/wordpress.ts          # Toda a integração com o WP
├── public/                   # Assets + .htaccess + robots.txt
├── scripts/                  # Scripts avulsos (geração do JSON de importação)
├── wordpress/                # Plugins do CMS (não fazem parte do build)
├── .github/workflows/        # Build e deploy
└── DOCS/                     # Documentação detalhada
```

---

## 📚 Documentação

- [Integração WordPress Headless](DOCS/integracao-wordpress-headless.md) — arquitetura, configuração, problemas já resolvidos, SEO e Search Console
- [Detalhes Técnicos](DOCS/detalhes-tecnicos.md) — por que cada decisão foi tomada e troubleshooting
- [Replicar a integração em outro projeto](DOCS/replicar-integracao-wordpress.md) — passo a passo para reaproveitar esse setup

---

## ⚠️ Pontos de atenção conhecidos

- Cinco páginas ainda têm `openGraph.url` apontando para o domínio antigo
  (`https://eliel.dev/clients/notebookexpert/...`) em `compra-venda`, `franquia`,
  `para-empresas`, `servicos` e `sobre`.
- A pasta `dist/` é resquício de um build Vite antigo, ainda versionada e fora
  do `.gitignore`.
- `components/MapSection.tsx` e `components/About.tsx` não são usados; as
  dependências `mapbox-gl` e `react-map-gl` também não (o mapa atual é um
  iframe do Google em [`components/Map.tsx`](components/Map.tsx)).
- O bloco `verification.google` foi removido de `app/layout.tsx` na migração.
  Se a verificação do Search Console for feita por meta tag, precisa voltar.

---

## 📞 Contato

- WhatsApp: (41) 99887-0606
- Telefone: (41) 3029-8746
- E-mail: atendimento@notebookexpert.com.br
