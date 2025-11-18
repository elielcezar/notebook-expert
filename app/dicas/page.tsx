import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Dicas e Artigos sobre Notebooks | Notebook Expert",
  description: "Dicas especializadas sobre manutenção, upgrade e cuidados com notebooks. Aprenda com quem tem 16 anos de experiência em Curitiba.",
  keywords: "dicas notebook, upgrade SSD, manutenção notebook, cuidados notebook, artigos técnicos",
  openGraph: {
    title: "Dicas e Artigos sobre Notebooks | Notebook Expert",
    description: "Dicas especializadas sobre manutenção, upgrade e cuidados com notebooks.",
    url: "https://eliel.dev/clients/notebookexpert/dicas",
    type: "website",
    images: [
      {
        url: "/hero-tech.jpg",
        width: 1200,
        height: 630,
        alt: "Dicas sobre Notebooks - Notebook Expert",
      },
    ],
  },
};

// Posts estáticos (depois virá do WordPress)
const posts = [
  {
    slug: "upgrade-ssd-velocidade-notebook",
    title: "Upgrade de SSD – Mais velocidade para o seu notebook",
    excerpt: "Seu notebook está lento, demorando para ligar ou abrindo programas devagar? O upgrade para SSD é a solução ideal para dar uma nova vida ao seu equipamento.",
    image: "/maintenance2.jpg",
    date: "2024-11-18",
    author: "Equipe Notebook Expert",
    category: "Upgrades"
  },
  // Adicionar mais posts aqui futuramente
];

export default function DicasPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="landscape:pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[var(--darkblue)] via-[var(--deepblue)] to-[var(--blue)] text-white py-20 portrait:py-16 portrait:pt-28">
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
          
          {/* Decorative Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Posts List */}
        <section className="py-16 portrait:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="space-y-8 portrait:space-y-6">
                {posts.map((post, index) => (
                  <article
                    key={index}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-0 md:gap-6 portrait:gap-0">
                      {/* Image */}
                      <div className="relative h-64 md:h-auto w-full portrait:h-48">
                        <img
                          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${post.image}`}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-[var(--blue)] text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </div>
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
                          <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/dicas/${post.slug}`}>
                            {post.title}
                          </a>
                        </h2>

                        {/* Excerpt */}
                        <p className="text-muted-foreground mb-4 leading-relaxed portrait:text-sm portrait:mb-3">
                          {post.excerpt}
                        </p>

                        {/* Read More Button */}
                        <a
                          href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/dicas/${post.slug}`}
                          className="inline-flex items-center gap-2 text-[var(--blue)] hover:text-[var(--darkblue)] font-semibold transition-colors group"
                        >
                          Leia mais
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Empty State para quando adicionar mais posts */}
              {posts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    Em breve, novos artigos e dicas sobre notebooks.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

