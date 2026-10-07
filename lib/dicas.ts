// Rotas e textos da seção "Dicas" (CPT dicas do WordPress)

export const DICAS_PATH = "/dicas";
export const DICAS_TITULO = "Dicas e Artigos";

export const dicaHref = (slug: string) => `${DICAS_PATH}/${slug}`;

// Página 1 vive em /dicas; as demais em /dicas/pagina/N
export const dicasListagemHref = (page: number) =>
  page <= 1 ? DICAS_PATH : `${DICAS_PATH}/pagina/${page}`;
