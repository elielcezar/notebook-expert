import PostListing from "@/components/PostListing";
import { getPostsPage, extractPostData, type WordPressCategory } from "@/lib/wordpress";
import { SECAO_PATH, SECAO_TITULO, listagemHref, postHref, tituloCategoria } from "@/lib/reparo";

// Listagem de posts da seção: geral (sem categoria) ou de uma marca
export default async function ReparoListing({ page, categoria }: { page: number; categoria?: WordPressCategory }) {
  const { posts, totalPages } = await getPostsPage(page, categoria?.id);

  return (
    <PostListing
      posts={posts.map(extractPostData)}
      page={page}
      totalPages={totalPages}
      pageHref={(n) => listagemHref(n, categoria?.slug)}
      postHref={postHref}
      title={categoria ? tituloCategoria(categoria.name) : SECAO_TITULO}
      emptyText="Em breve, novos conteúdos sobre reparo de notebooks."
      back={categoria ? { href: SECAO_PATH, label: SECAO_TITULO } : undefined}
    />
  );
}
