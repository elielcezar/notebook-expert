import type { Metadata } from "next";
import ReparoListing from "@/components/ReparoListing";
import { SECAO_PATH, SITE_URL } from "@/lib/reparo";

export const metadata: Metadata = {
  title: "Reparo de Notebooks em Curitiba | Notebook Expert",
  description: "Reparo de notebooks Dell, Lenovo, Acer, ASUS, Samsung, MacBook, Avell e outras marcas. Troca de tela, teclado, bateria, conector de carga, placa-mãe e mais, com 20 anos de experiência em Curitiba.",
  keywords: "reparo de notebook, conserto notebook Curitiba, troca de tela notebook, troca de teclado notebook, reparo placa-mãe notebook",
  alternates: { canonical: `${SITE_URL}${SECAO_PATH}` },
  openGraph: {
    title: "Reparo de Notebooks em Curitiba | Notebook Expert",
    description: "Reparo de notebooks de todas as marcas, com 20 anos de experiência em Curitiba.",
    url: `${SITE_URL}${SECAO_PATH}`,
    type: "website",
    images: [
      {
        url: "/hero-tech.jpg",
        width: 1200,
        height: 630,
        alt: "Reparo de Notebooks - Notebook Expert",
      },
    ],
  },
};

export default function ReparoPage() {
  return <ReparoListing page={1} />;
}
