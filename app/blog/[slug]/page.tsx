import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ArrowLeft } from 'lucide-react';

// Função para buscar post individual do WordPress (placeholder)
async function getPost(slug: string) {
  // TODO: Implementar fetch para WordPress REST API
  // const res = await fetch(`https://seu-wp.com/wp-json/wp/v2/posts?slug=${slug}`);
  // const posts = await res.json();
  // return posts[0];
  
  // Dados de exemplo
  const posts: Record<string, any> = {
    'como-limpar-notebook': {
      id: 1,
      slug: 'como-limpar-notebook',
      title: 'Como Limpar seu Notebook Corretamente',
      content: `
        <p>Manter seu notebook limpo é essencial para garantir seu bom funcionamento e prolongar sua vida útil.</p>
        
        <h2>Materiais Necessários</h2>
        <ul>
          <li>Pano de microfibra</li>
          <li>Álcool isopropílico</li>
          <li>Ar comprimido</li>
          <li>Pincel macio</li>
        </ul>

        <h2>Passo a Passo</h2>
        <p>1. Desligue completamente o notebook e desconecte da tomada.</p>
        <p>2. Use o ar comprimido para remover poeira das entradas de ventilação.</p>
        <p>3. Limpe o teclado com pincel macio e pano levemente umedecido.</p>
        <p>4. Limpe a tela com pano de microfibra em movimentos suaves.</p>

        <h2>Quando Procurar Ajuda Profissional</h2>
        <p>Se você notar superaquecimento constante, barulhos estranhos ou lentidão, é hora de fazer uma limpeza interna profissional.</p>
      `,
      date: '2024-01-15',
      author: 'Tech Expert',
      featured_image: '/hero-tech.jpg'
    },
  };

  return posts[slug] || null;
}

// Gerar metadata dinâmico
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }

  return {
    title: `${post.title} | Tech Repair Spot Blog`,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [post.featured_image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o blog
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-primary-foreground/90">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date(post.date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {post.author}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          {/* Featured Image */}
          <div className="aspect-video bg-muted rounded-xl overflow-hidden mb-10">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Post Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div className="mt-16 p-8 bg-accent/5 rounded-xl border border-accent/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Precisa de ajuda profissional?
            </h3>
            <p className="text-muted-foreground mb-6">
              Entre em contato conosco para agendar uma manutenção preventiva ou reparos no seu notebook.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
            >
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

