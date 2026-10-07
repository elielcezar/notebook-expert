import type { Metadata } from "next";
import { getPostBySlug, getAllPostSlugs, getMenuCategories, extractPostData } from "@/lib/wordpress";
import { SECAO_PATH, SECAO_TITULO, SITE_URL, categoriaHref, postHref, tituloCategoria } from "@/lib/reparo";
import ReparoListing from "@/components/ReparoListing";
import PostView from "@/components/PostView";
import { notFound } from "next/navigation";

// Este segmento atende dois tipos de página:
//   /reparo-de-notebooks/<marca>  → listagem da categoria (página 1)
//   /reparo-de-notebooks/<post>   → post individual
async function getCategoriaBySlug(slug: string) {
  const categorias = await getMenuCategories();
  return categorias.find((c) => c.slug === slug) || null;
}

export async function generateStaticParams() {
  const [slugs, categorias] = await Promise.all([getAllPostSlugs(), getMenuCategories()]);

  // Mesmo segmento para os dois: um post com o slug de uma marca ficaria
  // inacessível. Melhor quebrar o build e renomear um dos dois no WP.
  const conflitos = categorias.filter((c) => slugs.includes(c.slug)).map((c) => c.slug);
  if (conflitos.length) {
    throw new Error(`[reparo-de-notebooks] Slug usado por post e por categoria ao mesmo tempo: ${conflitos.join(', ')}`);
  }

  return [...slugs, ...categorias.map((c) => c.slug)].map((slug) => ({ slug }));
}

// Força geração estática - posts novos só aparecem após rebuild
export const dynamicParams = false;

// Metadata dinâmica para cada post ou categoria
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const categoria = await getCategoriaBySlug(slug);
  if (categoria) {
    const titulo = tituloCategoria(categoria.name);
    const url = `${SITE_URL}${categoriaHref(slug)}`;
    return {
      title: `${titulo} em Curitiba | Notebook Expert`,
      description: `${titulo}: troca de tela, teclado, bateria, conector de carga, placa-mãe e outros serviços, com diagnóstico especializado em Curitiba.`,
      alternates: { canonical: url },
      openGraph: { title: `${titulo} | Notebook Expert`, url, type: "website" },
    };
  }

  const wpPost = await getPostBySlug(slug);

  if (!wpPost) {
    return {
      title: "Post não encontrado | Notebook Expert"
    };
  }

  const post = extractPostData(wpPost);

  return {
    title: `${post.title} | Notebook Expert`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}${postHref(slug)}`,
      type: "article",
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.featuredImageAlt,
        },
      ],
    },
  };
}

export default async function ReparoSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const categoria = await getCategoriaBySlug(slug);
  if (categoria) {
    return <ReparoListing page={1} categoria={categoria} />;
  }

  const wpPost = await getPostBySlug(slug);

  // Se o post não existir, mostrar 404
  if (!wpPost) {
    notFound();
  }

  const post = extractPostData(wpPost);
  // Só marcas com página própria viram link; "Sem categoria" não
  const categoriaPost = await getCategoriaBySlug(post.categorySlug);

  return (
    <PostView
      post={post}
      heroTitle={categoriaPost ? tituloCategoria(categoriaPost.name) : SECAO_TITULO}
      back={categoriaPost
        ? { href: categoriaHref(categoriaPost.slug), label: `Ver todos: ${categoriaPost.name}` }
        : { href: SECAO_PATH, label: SECAO_TITULO }}
    />
  );
}
