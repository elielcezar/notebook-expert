import PostListing from "@/components/PostListing";
import { getDicasPage, extractPostData } from "@/lib/wordpress";
import { DICAS_TITULO, dicaHref, dicasListagemHref } from "@/lib/dicas";

export default async function DicasListing({ page }: { page: number }) {
  const { posts, totalPages } = await getDicasPage(page);

  return (
    <PostListing
      posts={posts.map(extractPostData)}
      page={page}
      totalPages={totalPages}
      pageHref={dicasListagemHref}
      postHref={dicaHref}
      title={DICAS_TITULO}
      emptyText="Em breve, novas dicas e artigos sobre notebooks."
    />
  );
}
