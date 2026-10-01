import type { Metadata } from "next";
import ReparoListing from "@/components/ReparoListing";
import { getMenuCategories, getPostsPage } from "@/lib/wordpress";
import { SITE_URL, listagemHref, tituloCategoria } from "@/lib/reparo";

// Páginas 2+ da listagem de uma marca. Inclui a página 1 de cada marca pelo
// mesmo motivo de /reparo-de-notebooks/pagina/[page]: hoje nenhuma marca passa
// de 25 posts, e o export estático recusa um generateStaticParams vazio.
export async function generateStaticParams() {
  const categorias = await getMenuCategories();
  const params = await Promise.all(
    categorias.map(async (c) => {
      const { totalPages } = await getPostsPage(1, c.id);
      return Array.from({ length: totalPages }, (_, i) => ({ slug: c.slug, page: String(i + 1) }));
    }),
  );
  return params.flat();
}

export const dynamicParams = false;

async function getCategoria(slug: string) {
  const categorias = await getMenuCategories();
  return categorias.find((c) => c.slug === slug)!;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; page: string }> }): Promise<Metadata> {
  const { slug, page } = await params;
  const categoria = await getCategoria(slug);
  const n = Number(page);
  const titulo = `${tituloCategoria(categoria.name)} em Curitiba - Página ${n} | Notebook Expert`;
  const url = `${SITE_URL}${listagemHref(n, slug)}`;

  return {
    title: titulo,
    alternates: { canonical: url },
    openGraph: { title: titulo, url, type: "website" },
  };
}

export default async function ReparoCategoriaPaginaPage({ params }: { params: Promise<{ slug: string; page: string }> }) {
  const { slug, page } = await params;
  return <ReparoListing page={Number(page)} categoria={await getCategoria(slug)} />;
}
