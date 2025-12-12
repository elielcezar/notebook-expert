import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Calendar, User, Phone, Clock } from "lucide-react";
import { getPostBySlug, getAllPostSlugs, extractPostData } from "@/lib/wordpress";
import { notFound } from "next/navigation";

// Esta função define quais slugs devem ser gerados estaticamente
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Força geração estática - posts novos só aparecem após rebuild
export const dynamicParams = false;

// Metadata dinâmica para cada post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const wpPost = await getPostBySlug(slug);
  
  if (!wpPost) {
    return {
      title: "Post não encontrado | Notebook Expert"
    };
  }

  const post = extractPostData(wpPost);

  return {
    title: `${post.title} | Dicas Notebook Expert`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://novo.notebookexpert.com.br/dicas/${slug}`,
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

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const wpPost = await getPostBySlug(slug);

  // Se o post não existir, mostrar 404
  if (!wpPost) {
    notFound();
  }

  const post = extractPostData(wpPost);

  return (
    <div className="min-h-screen bg-background page-content-dicas">
      <Header />
      
      <main className="landscape:pt-16 min-h-screen">

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[var(--darkblue)] via-[var(--deepblue)] to-[var(--blue)] text-white py-20 portrait:py-16 portrait:pt-28">
          <div className="absolute inset-0 z-0">
            <img 
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/hero-tech.jpg`}
              alt="Assistência Técnica Profissional" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--tech-blue-dark))]/95 via-[hsl(var(--tech-blue-dark))]/85 to-[hsl(var(--tech-blue-dark))]/70" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in portrait:mb-3">
                  <div className="h-1 w-12 bg-accent rounded" />
                  <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                    Conhecimento Especializado
                  </span>
                  <div className="h-1 w-12 bg-accent rounded" />
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up portrait:text-4xl">
                  Dicas e Artigos
                </h1>
                
                <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200 portrait:text-base">
                  Aprenda com quem tem 16 anos de experiência em manutenção e reparo de notebooks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Post Content */}
        <section className="py-16 portrait:py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-24 portrait:gap-6">
                {/* Main Content */}
                <article>
                  {/* Category Badge */}
                  {/*<div className="mb-4">
                    <span className="inline-block bg-[var(--blue)] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>*/}

                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 portrait:text-3xl">
                    {post.title}
                  </h1>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-9 pb-3 border-b border-border portrait:flex-wrap">
                    {post.chamada && (
                      <div className="text-muted-foreground mb-4 leading-relaxed text-xl italic leading-6 portrait:text-sm portrait:mb-3">
                        <span>{post.chamada}</span>
                      </div>
                    )}
                    {/*<div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('pt-BR', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>*/}
                  </div>

                  {/* Featured Image */}
                  {/*<div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden portrait:h-[250px]">
                    <img
                      src={post.featuredImage}
                      alt={post.featuredImageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>*/}

                  {/* Content */}
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8 prose-h3:text-2xl prose-h3:font-bold prose-h3:mb-3 prose-h3:mt-6 prose-ul:my-4 prose-li:my-2 portrait:prose-base prose-a:text-[var(--blue)] prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                </article>

                {/* Sidebar */}
                <aside className="space-y-6 portrait:space-y-4">
                  {/* Contact Card */}
                  <div className="bg-gradient-to-br from-[var(--darkblue)] to-[var(--blue)] text-white rounded-lg p-6 portrait:p-4">
                    <h3 className="text-xl font-bold mb-4 portrait:text-lg">
                      Fale Conosco
                    </h3>
                    <div className="space-y-3 portrait:space-y-2">
                      <a 
                        href="https://wa.me/5541998870606"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-accent transition-colors"
                      >
                        <i className="fab fa-whatsapp text-xl"></i>
                        <span className="text-sm">(41) 99887-0606</span>
                      </a>
                      <a 
                        href="tel:+554130298746"
                        className="flex items-center gap-2 text-white hover:text-accent transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                        <span className="text-sm">(41) 3029-8746</span>
                      </a>
                      <div className="flex items-start gap-2 text-white/90">
                        <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-semibold">Seg-Sex: 9h às 18h</p>
                          <p>Sábados: 9h às 13h</p>
                        </div>
                      </div>
                    </div>
                    <a
                      href="https://wa.me/5541998870606?text=Olá! Vi o artigo no site e gostaria de mais informações."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-wpp mt-4 w-full text-center mx-0 bg-green-600 hover:bg-green-700"
                    >
                      <i className="fab fa-whatsapp text-xl"></i>
                      <span className="ml-2 text-sm">Chamar no WhatsApp</span>
                    </a>
                  </div>

                  {/* Banner Placeholder */}
                  <div className="bg-gradient-to-br from-[var(--blue)]/10 to-[var(--lightblue)]/10 border-2 border-dashed border-[var(--blue)]/30 rounded-lg p-6 text-center portrait:p-4">
                    <p className="text-sm text-muted-foreground mb-2">Espaço para</p>
                    <p className="text-lg font-bold text-[var(--blue)]">Banner / Publicidade</p>
                    <p className="text-xs text-muted-foreground mt-2">300x250px</p>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 portrait:py-12 border-t-4 border-accent bg-slate-50" style={{ backgroundImage: 'url(/bg-faq2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-foreground mb-6 portrait:text-3xl">
                Precisando de Assistência Técnica?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 portrait:text-base portrait:mb-6 max-w-xl mx-auto">
                Entre em contato agora e receba um atendimento personalizado com orçamento gratuito.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://wa.me/5541998870606?text=Olá! Vi o artigo no site e gostaria de conhecer mais sobre os serviços."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wpp mx-0"
                >
                  <i className="fab fa-whatsapp text-2xl"></i>
                  <span className="ml-2">WhatsApp: (41) 99887-0606</span>
                </a>                
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
