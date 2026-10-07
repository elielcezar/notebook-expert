import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import type { PostData } from "@/lib/wordpress";
import Link from "next/link";

interface PostListingProps {
  posts: PostData[];
  page: number;
  totalPages: number;
  pageHref: (n: number) => string;
  postHref: (slug: string) => string;
  title: string;
  emptyText: string;
  // Link de volta no topo (ex.: da marca para a seção). Sem ele, mostra o selo padrão.
  back?: { href: string; label: string };
}

// Visual da listagem de artigos, compartilhado pelas seções "Reparo de
// Notebooks" (posts) e "Dicas" (CPT dicas). Só recebe dados prontos.
export default function PostListing({ posts, page, totalPages, pageHref, postHref, title, emptyText, back }: PostListingProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="landscape:pt-16 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[var(--darkblue)] via-[var(--deepblue)] to-[var(--blue)] text-white py-20 portrait:py-16 portrait:pt-40">

        <div className="absolute inset-0 z-0">
          <img 
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/hero-tech.jpg`}
            alt="Assistência Técnica Profissional" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--tech-blue-dark))]/95 via-[hsl(var(--tech-blue-dark))]/85 to-[hsl(var(--tech-blue-dark))]/70" />
        </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in portrait:mb-3">
                {back ? (
                  <Link
                    href={back.href}
                    className="inline-flex items-center gap-1 text-yellow font-semibold text-sm uppercase tracking-wider hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {back.label}
                  </Link>
                ) : (
                  <span className="text-yellow font-semibold text-sm uppercase tracking-wider">
                    Conhecimento Especializado
                  </span>
                )}
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up portrait:text-4xl">
                {title}
              </h1>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200 portrait:text-base">
                Aprenda com quem tem 20 anos de experiência em manutenção e reparo de notebooks.
              </p>
            </div>
          </div>
          
          {/* Decorative Bottom Gradient */}
          {/*<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />*/}
        </section>

        {/* Posts List */}
        <section className="py-16 portrait:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="space-y-8 portrait:space-y-6">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-0 md:gap-6 portrait:gap-0">
                      {/* Image */}
                      <div className="relative h-32 md:h-auto w-full portrait:h-48">
                        <img loading="lazy" decoding="async"
                          src={post.featuredImage}
                          alt={post.featuredImageAlt}
                          className="w-full h-full object-cover"
                        />
                        {/*<div className="absolute top-4 left-4 bg-[var(--blue)] text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </div>*/}
                      </div>

                      {/* Content */}
                      <div className="p-6 md:py-6 md:pr-6 portrait:p-4">
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 portrait:flex-wrap portrait:gap-2">
                          <div className="flex items-center gap-1">
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
                          </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-foreground mb-3 hover:text-[var(--blue)] transition-colors portrait:text-xl portrait:mb-2">
                          <Link href={postHref(post.slug)}>
                            {post.title}
                          </Link>
                        </h2>

                        {/* Excerpt */}
                        <p className="text-muted-foreground mb-4 leading-relaxed portrait:text-sm portrait:mb-3">
                          {post.chamada}
                        </p>

                        {/* Read More Button */}
                        <Link
                          href={postHref(post.slug)}
                          className="inline-flex items-center gap-2 text-[var(--blue)] hover:text-[var(--darkblue)] font-semibold transition-colors group"
                        >
                          Leia mais
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Empty State para quando não houver posts */}
              {posts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    {emptyText}
                  </p>
                </div>
              )}

              {/* Paginação */}
              {totalPages > 1 && (
                <nav aria-label="Paginação" className="flex items-center justify-center gap-2 mt-12 flex-wrap">
                  {page > 1 && (
                    <Link
                      href={pageHref(page - 1)}
                      className="inline-flex items-center gap-1 h-10 px-3 rounded-md border border-border text-foreground hover:bg-[var(--blue)] hover:text-white transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Anterior
                    </Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <Link
                      key={n}
                      href={pageHref(n)}
                      aria-current={n === page ? "page" : undefined}
                      className={`inline-flex items-center justify-center h-10 min-w-10 px-3 rounded-md border font-semibold transition-colors ${
                        n === page
                          ? "bg-[var(--blue)] border-[var(--blue)] text-white"
                          : "border-border text-foreground hover:bg-[var(--blue)] hover:text-white"
                      }`}
                    >
                      {n}
                    </Link>
                  ))}
                  {page < totalPages && (
                    <Link
                      href={pageHref(page + 1)}
                      className="inline-flex items-center gap-1 h-10 px-3 rounded-md border border-border text-foreground hover:bg-[var(--blue)] hover:text-white transition-colors"
                    >
                      Próxima
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </nav>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
