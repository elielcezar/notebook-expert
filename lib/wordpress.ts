// Configuração e funções para integração com WordPress Headless

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://seu-wordpress.com/wp-json/wp/v2';

export interface WordPressPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  author: number;
  featured_media: number;
  _embedded?: {
    author?: Array<{
      name: string;
    }>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

// Buscar todos os posts
export async function getPosts(perPage: number = 10): Promise<WordPressPost[]> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?per_page=${perPage}&_embed`, {
      next: { revalidate: 60 } // Revalidar a cada 60 segundos (ISR)
    });

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Buscar post individual por slug
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }

    const posts = await res.json();
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Buscar post individual por ID
export async function getPostById(id: number): Promise<WordPressPost | null> {
  try {
    const res = await fetch(`${WP_API_URL}/posts/${id}?_embed`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Extrair dados úteis de um post
export function extractPostData(post: WordPressPost) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    content: post.content.rendered,
    excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ''), // Remove HTML tags
    date: post.date,
    author: post._embedded?.author?.[0]?.name || 'Tech Expert',
    featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/hero-tech.jpg',
  };
}

