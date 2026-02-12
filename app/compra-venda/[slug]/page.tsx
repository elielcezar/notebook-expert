import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import Link from "next/link";
import SeminovoGallery from "@/components/SeminovoGallery";
import { getSeminovoBySlug, getAllSeminovoSlugs } from "@/lib/wordpress";
import { ArrowLeft } from "lucide-react";

// Gera todas as rotas estáticas no build
export async function generateStaticParams() {
  const slugs = await getAllSeminovoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function SeminovoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seminovo = await getSeminovoBySlug(slug);

  if (!seminovo) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="landscape:pt-16">
          <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Produto não encontrado</h1>
            <p className="text-muted-foreground mb-8">O notebook que você procura não está mais disponível.</p>
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/compra-venda`}
              className="inline-flex items-center gap-2 text-accent hover:text-[var(--blue)] font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Seminovos
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const title = seminovo.title.rendered;
  const featuredImage = seminovo._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const acfImages = seminovo.acf?.imagens || [];

  // Montar galeria: usa imagens do ACF se disponíveis, senão featured image
  const galleryImages: string[] = acfImages.length > 0
    ? acfImages.map(img => String(img))
    : featuredImage
      ? [featuredImage]
      : [];

  const whatsappMessage = encodeURIComponent(`Olá! Tenho interesse no notebook seminovo: ${title}. Ele ainda está disponível?`);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="landscape:pt-16">
        {/* Hero compacto */}
        <section className="relative bg-gradient-to-r from-[var(--darkblue)] via-[var(--deepblue)] to-[var(--blue)] text-white py-10 portrait:pt-28">
          <div className="absolute inset-0 z-0">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/hero-tech.jpg`}
              alt="Notebook Seminovo"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--tech-blue-dark))]/95 via-[hsl(var(--tech-blue-dark))]/85 to-[hsl(var(--tech-blue-dark))]/70" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/compra-venda`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Seminovos
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          </div>
        </section>

        {/* Conteúdo do Produto */}
        <section className="py-12 portrait:py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto flex gap-12 portrait:flex-col portrait:gap-8">

              {/* Coluna Esquerda - Galeria */}
              <div className="w-1/2 portrait:w-full">
                <SeminovoGallery images={galleryImages} title={title} />
              </div>

              {/* Coluna Direita - Info do Produto */}
              <div className="w-1/2 portrait:w-full flex flex-col">
                <div className="mb-6">
                  <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-3 py-1 rounded-full mb-4">
                    Seminovo Revisado
                  </span>
                  <h2 className="text-3xl font-bold text-foreground mb-2 portrait:text-2xl">
                    {title}
                  </h2>
                  <div className="h-1 w-16 bg-accent rounded mb-6" />
                </div>

                {/* Especificações */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Especificações</h3>
                  <div
                    className="prose prose-sm text-muted-foreground leading-relaxed [&>p]:mb-2 [&_br]:leading-loose"
                    dangerouslySetInnerHTML={{ __html: seminovo.content.rendered }}
                  />
                </div>

                {/* Garantias */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full border border-green-200">
                    ✓ Garantia de 1 ano
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-200">
                    ✓ Revisado e testado
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 text-xs font-medium px-3 py-1.5 rounded-full border border-purple-200">
                    ✓ Pronto para uso
                  </span>
                </div>

                {/* Botão WhatsApp */}
                <a
                  href={`https://wa.me/5541998870606?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wpp w-full text-center mx-0"
                >
                  <i className="fab fa-whatsapp text-3xl"></i>
                  <span className="flex flex-col items-start">
                    <span className="text-sm">Tenho interesse!</span>
                    <strong>(41) 99887-0606</strong>
                  </span>
                </a>

                <p className="text-xs text-muted-foreground mt-3 text-center">
                  * Sujeito à disponibilidade. Consulte condições.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[var(--darkblue)] via-[var(--deepblue)] to-[var(--blue)] text-white portrait:py-12" style={{ backgroundImage: 'url(/bg-faq.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 portrait:text-3xl">
                Veja mais opções
              </h2>
              <p className="text-xl mb-8 text-white/90 portrait:text-base portrait:mb-6 max-w-xl mx-auto">
                Confira todos os notebooks seminovos disponíveis com garantia de 1 ano.
              </p>

              <Link
                href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/compra-venda`}
                className="btn-primary inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Ver todos os seminovos
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Map />
      <Footer />
    </div>
  );
}
