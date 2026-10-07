import type { Metadata } from "next";
import DicasListing from "@/components/DicasListing";
import { getDicasPage } from "@/lib/wordpress";
import { dicasListagemHref } from "@/lib/dicas";
import { SITE_URL } from "@/lib/reparo";

// Inclui a página 1 de propósito: com output: 'export' o Next recusa um
// generateStaticParams vazio. Ela só existe por isso — o canonical manda para /dicas.
export async function generateStaticParams() {
  const { totalPages } = await getDicasPage(1);
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  const n = Number(page);
  const titulo = `Dicas e Artigos sobre Notebooks - Página ${n} | Notebook Expert`;
  const url = `${SITE_URL}${dicasListagemHref(n)}`;
  return {
    title: titulo,
    description: "Dicas especializadas sobre manutenção, upgrade e cuidados com notebooks.",
    alternates: { canonical: url },
    openGraph: { title: titulo, url, type: "website" },
  };
}

export default async function DicasPaginaPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  return <DicasListing page={Number(page)} />;
}
