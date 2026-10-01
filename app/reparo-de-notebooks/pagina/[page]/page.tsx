import type { Metadata } from "next";
import ReparoListing from "@/components/ReparoListing";
import { getPostsPage } from "@/lib/wordpress";
import { SITE_URL, listagemHref } from "@/lib/reparo";

// Inclui a página 1 de propósito: com output: 'export' o Next recusa um
// generateStaticParams vazio, que é o que aconteceria com até 25 posts.
// Ela existe só por isso — o canonical manda para a raiz da seção.
export async function generateStaticParams() {
  const { totalPages } = await getPostsPage(1);
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  const n = Number(page);
  const titulo = `Reparo de Notebooks em Curitiba - Página ${n} | Notebook Expert`;
  const url = `${SITE_URL}${listagemHref(n)}`;

  return {
    title: titulo,
    description: "Reparo de notebooks de todas as marcas, com 20 anos de experiência em Curitiba.",
    alternates: { canonical: url },
    openGraph: { title: titulo, url, type: "website" },
  };
}

export default async function ReparoPaginaPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  return <ReparoListing page={Number(page)} />;
}
