import type { Metadata } from "next";
import DicasListing, { dicasPageHref } from "@/components/DicasListing";
import { getPostsPage } from "@/lib/wordpress";

// Inclui a página 1 de propósito: com output: 'export' o Next recusa um
// generateStaticParams vazio, que é o que aconteceria com até 25 posts.
// Ela existe só por isso — o canonical manda para /dicas.
export async function generateStaticParams() {
  const { totalPages } = await getPostsPage(1);
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  const n = Number(page);
  const url = `https://notebookexpert.com.br${dicasPageHref(n)}`;

  return {
    title: `Dicas e Artigos sobre Notebooks - Página ${n} | Notebook Expert`,
    description: "Dicas especializadas sobre manutenção, upgrade e cuidados com notebooks. Aprenda com quem tem 16 anos de experiência em Curitiba.",
    alternates: { canonical: url },
    openGraph: {
      title: `Dicas e Artigos sobre Notebooks - Página ${n} | Notebook Expert`,
      url,
      type: "website",
    },
  };
}

export default async function DicasPaginaPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  return <DicasListing page={Number(page)} />;
}
