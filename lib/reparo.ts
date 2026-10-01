// Rotas e textos da seção "Reparo de Notebooks" (antiga /dicas).
// As URLs antigas redirecionam para cá via 301 em public/.htaccess.

export const SECAO_PATH = "/reparo-de-notebooks";
export const SECAO_TITULO = "Reparo de Notebooks";
export const SITE_URL = "https://notebookexpert.com.br";

// Posts e categorias dividem o mesmo segmento: /reparo-de-notebooks/<slug>
export const postHref = (slug: string) => `${SECAO_PATH}/${slug}`;
export const categoriaHref = (slug: string) => `${SECAO_PATH}/${slug}`;

// Página 1 vive na raiz da listagem; as demais em .../pagina/N
export function listagemHref(page: number, categoriaSlug?: string) {
  const base = categoriaSlug ? categoriaHref(categoriaSlug) : SECAO_PATH;
  return page <= 1 ? base : `${base}/pagina/${page}`;
}

// "Dell" → "Reparo de Notebooks Dell"; "MacBook" → "Reparo de MacBook";
// "Notebook Gamer" → "Reparo de Notebook Gamer"
export function tituloCategoria(nome: string) {
  return /^(notebook|macbook)/i.test(nome) ? `Reparo de ${nome}` : `${SECAO_TITULO} ${nome}`;
}
