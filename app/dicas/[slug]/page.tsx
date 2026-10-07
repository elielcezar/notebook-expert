import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostView from "@/components/PostView";
import { getDicas, getDicaBySlug, extractPostData } from "@/lib/wordpress";
import { DICAS_PATH, DICAS_TITULO, dicaHref } from "@/lib/dicas";
import { SITE_URL } from "@/lib/reparo";

// Sem nenhuma dica publicada o export estático quebraria (generateStaticParams
// vazio). O marcador gera só uma página 404 e mantém o build de pé.
const SEM_DICAS = "__sem-dicas";

export async function generateStaticParams() {
  const dicas = await getDicas();
  if (dicas.length === 0) return [{ slug: SEM_DICAS }];
  return dicas.map((d) => ({ slug: d.slug }));
}

// Dicas novas só aparecem após rebuild
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const wpDica = await getDicaBySlug(slug);
  if (!wpDica) return { title: "Dica não encontrada | Notebook Expert" };

  const dica = extractPostData(wpDica);
  return {
    title: `${dica.title} | Notebook Expert`,
    description: dica.excerpt,
    alternates: { canonical: `${SITE_URL}${dicaHref(slug)}` },
    openGraph: {
      title: dica.title,
      description: dica.excerpt,
      url: `${SITE_URL}${dicaHref(slug)}`,
      type: "article",
      images: [{ url: dica.featuredImage, width: 1200, height: 630, alt: dica.featuredImageAlt }],
    },
  };
}

export default async function DicaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const wpDica = await getDicaBySlug(slug);
  if (!wpDica) notFound();

  return (
    <PostView
      post={extractPostData(wpDica)}
      heroTitle={DICAS_TITULO}
      back={{ href: DICAS_PATH, label: DICAS_TITULO }}
    />
  );
}
