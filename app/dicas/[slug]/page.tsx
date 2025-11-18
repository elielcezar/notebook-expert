import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Phone, Clock } from "lucide-react";

// Dados dos posts (depois virá do WordPress)
const postsData: { [key: string]: any } = {
  'upgrade-ssd-velocidade-notebook': {
    title: "Upgrade de SSD – Mais velocidade para o seu notebook",
    excerpt: "Seu notebook está lento, demorando para ligar ou abrindo programas devagar? O upgrade para SSD é a solução ideal.",
    image: "/maintenance2.jpg",
    date: "2024-11-18",
    author: "Equipe Notebook Expert",
    category: "Upgrades",
    content: `
      <p class="lead">Seu notebook está lento, demorando para ligar ou abrindo programas devagar?</p>
      
      <p>O upgrade para SSD é a solução ideal para dar uma nova vida ao seu equipamento, aumentando a velocidade e o desempenho de forma impressionante.</p>

      <h2>O que é um SSD?</h2>
      
      <p>O SSD (Solid State Drive) é um tipo de armazenamento moderno que substitui o HD tradicional. Ele não possui partes móveis, o que o torna muito mais rápido, silencioso e resistente.</p>

      <h2>Benefícios do Upgrade de SSD:</h2>
      
      <ul>
        <li><strong>Inicialização do sistema até 10x mais rápida</strong></li>
        <li>Programas e arquivos abrem em segundos</li>
        <li>Mais durabilidade e resistência a impactos</li>
        <li>Maior segurança para seus dados</li>
        <li>Menor consumo de energia</li>
      </ul>

      <h2>Instalação profissional e segura</h2>
      
      <p>Na <strong>Notebook Expert</strong>, realizamos o upgrade de SSD com todo o cuidado técnico necessário. Fazemos a migração completa dos seus dados e sistema, para que você receba o notebook pronto para uso — rápido, otimizado e sem perder nada.</p>

      <h3>Indicado para:</h3>
      
      <ul>
        <li>Notebooks lentos ou travando</li>
        <li>Equipamentos com HD antigo</li>
        <li>Usuários que querem mais agilidade e desempenho</li>
      </ul>

      <h2>Resultados imediatos</h2>
      
      <p>Após o upgrade, o notebook liga em segundos, responde mais rápido e ganha anos a mais de vida útil. É o melhor custo-benefício para quem quer desempenho de notebook novo sem precisar comprar um.</p>

      <div class="cta-box">
        <h3>Agende seu upgrade agora e sinta a diferença no primeiro uso!</h3>
      </div>
    `
  }
};

// Esta função define quais slugs devem ser gerados estaticamente
export async function generateStaticParams() {
  // Retorna todos os slugs disponíveis
  const slugs = Object.keys(postsData);
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Força geração estática
export const dynamicParams = false;

// Metadata dinâmica para cada post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = postsData[slug];
  
  if (!post) {
    return {
      title: "Post não encontrado | Notebook Expert"
    };
  }

  return {
    title: `${post.title} | Dicas Notebook Expert`,
    description: post.excerpt,
    keywords: "upgrade SSD, notebook lento, melhorar desempenho notebook, trocar HD por SSD",
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://eliel.dev/clients/notebookexpert/dicas/${slug}`,
      type: "article",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postsData[slug];

  // Se o post não existir, mostrar 404
  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Post não encontrado</h1>
          <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/dicas`} className="text-[var(--blue)] hover:underline">
            Voltar para Dicas
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="landscape:pt-16">
        {/* Breadcrumb / Back Link */}
        <section className="bg-muted/30 py-4 portrait:pt-20">
          <div className="container mx-auto px-4">
            <Link 
              href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/dicas`}
              className="inline-flex items-center gap-2 text-[var(--blue)] hover:text-[var(--darkblue)] font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Dicas
            </Link>
          </div>
        </section>

        {/* Post Content */}
        <section className="py-12 portrait:py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 portrait:gap-6">
                {/* Main Content */}
                <article className="bg-card border border-border rounded-lg p-8 portrait:p-4">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-block bg-[var(--blue)] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 portrait:text-3xl">
                    {post.title}
                  </h1>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border portrait:flex-wrap">
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

                  {/* Featured Image */}
                  <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden portrait:h-[250px]">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${post.image}`}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8 prose-h3:text-2xl prose-h3:font-bold prose-h3:mb-3 prose-h3:mt-6 prose-ul:my-4 prose-li:my-2 portrait:prose-base"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* CTA no final do post */}
                  <div className="mt-12 p-6 bg-gradient-to-r from-[var(--blue)]/10 to-[var(--lightblue)]/10 border-l-4 border-[var(--blue)] rounded-lg portrait:mt-8 portrait:p-4">
                    <h3 className="text-2xl font-bold text-foreground mb-3 portrait:text-xl">
                      Precisa de um upgrade de SSD?
                    </h3>
                    <p className="text-muted-foreground mb-4 portrait:text-sm">
                      Entre em contato conosco e receba um orçamento gratuito. Fazemos a instalação completa com migração de dados.
                    </p>
                    <a
                      href="https://wa.me/5541998870606?text=Olá! Gostaria de fazer um upgrade de SSD no meu notebook."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-wpp inline-flex mx-0"
                    >
                      <i className="fab fa-whatsapp text-2xl"></i>
                      <span className="ml-2">WhatsApp: (41) 99887-0606</span>
                    </a>
                  </div>
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

                  {/* Services Card */}
                  <div className="bg-card border border-border rounded-lg p-6 portrait:p-4">
                    <h3 className="text-xl font-bold text-foreground mb-4 portrait:text-lg">
                      Outros Serviços
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link 
                          href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/servicos`}
                          className="text-[var(--blue)] hover:text-[var(--darkblue)] transition-colors"
                        >
                          → Reparo de Placa-Mãe
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/servicos`}
                          className="text-[var(--blue)] hover:text-[var(--darkblue)] transition-colors"
                        >
                          → Troca de Tela
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/servicos`}
                          className="text-[var(--blue)] hover:text-[var(--darkblue)] transition-colors"
                        >
                          → Limpeza e Manutenção
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/servicos`}
                          className="text-[var(--blue)] hover:text-[var(--darkblue)] transition-colors font-semibold"
                        >
                          → Ver Todos os Serviços
                        </Link>
                      </li>
                    </ul>
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
      </main>
      
      <Footer />
    </div>
  );
}

