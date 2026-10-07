import type { Metadata } from "next";
import DicasListing from "@/components/DicasListing";
import { DICAS_PATH } from "@/lib/dicas";
import { SITE_URL } from "@/lib/reparo";

export const metadata: Metadata = {
  title: "Dicas e Artigos sobre Notebooks | Notebook Expert",
  description: "Dicas especializadas sobre manutenção, upgrade e cuidados com notebooks. Aprenda com quem tem 20 anos de experiência em Curitiba.",
  keywords: "dicas notebook, upgrade SSD, manutenção notebook, cuidados notebook, artigos técnicos",
  alternates: { canonical: `${SITE_URL}${DICAS_PATH}` },
  openGraph: {
    title: "Dicas e Artigos sobre Notebooks | Notebook Expert",
    description: "Dicas especializadas sobre manutenção, upgrade e cuidados com notebooks.",
    url: `${SITE_URL}${DICAS_PATH}`,
    type: "website",
    images: [{ url: "/hero-tech.jpg", width: 1200, height: 630, alt: "Dicas sobre Notebooks - Notebook Expert" }],
  },
};

export default function DicasPage() {
  return <DicasListing page={1} />;
}
