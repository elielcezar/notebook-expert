import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - Dicas e Novidades | Tech Repair Spot',
  description: 'Confira dicas, tutoriais e novidades sobre manutenção e cuidados com notebooks.',
};

// Função para buscar posts do WordPress (placeholder)
async function getPosts() {
  // TODO: Implementar fetch para WordPress REST API
  // const res = await fetch('https://seu-wp.com/wp-json/wp/v2/posts');
  // return res.json();
  
  // Dados de exemplo
  return [
    {
      id: 1,
      slug: 'como-limpar-notebook',
      title: 'Como Limpar seu Notebook Corretamente',
      excerpt: 'Aprenda as melhores técnicas para manter seu notebook sempre limpo e funcionando perfeitamente.',
      date: '2024-01-15',
      author: 'Tech Expert',
      featured_image: '/hero-tech.jpg'
    },
    {
      id: 2,
      slug: 'sinais-de-superaquecimento',
      title: '5 Sinais de que seu Notebook Está Superaquecendo',
      excerpt: 'Descubra os principais indicadores de que seu notebook precisa de manutenção urgente.',
      date: '2024-01-10',
      author: 'Tech Expert',
      featured_image: '/hero-tech.jpg'
    },
  ];
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Blog Tech Repair
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto text-center">
            Dicas, tutoriais e novidades sobre manutenção de notebooks
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all"
            >
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-foreground mb-3">
                  {post.title}
                </h2>

                <p className="text-muted-foreground mb-4">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
                >
                  Ler mais
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Placeholder for empty state */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              Em breve, novos artigos serão publicados!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

