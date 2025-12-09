// Configuração e funções para integração com WordPress Headless

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://admin.notebookexpert.com.br/wp-json/wp/v2';

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
  categories?: number[];
  _embedded?: {
    author?: Array<{
      name: string;
      avatar_urls?: {
        '96'?: string;
      };
    }>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// Buscar todos os posts
export async function getPosts(perPage: number = 100): Promise<WordPressPost[]> {
  const url = `${WP_API_URL}/posts?per_page=${perPage}&_embed&status=publish`;
  
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('[WordPress] getPosts error:', error);
    return [];
  }
}

// Buscar todos os slugs dos posts (para generateStaticParams)
export async function getAllPostSlugs(): Promise<string[]> {
  const url = `${WP_API_URL}/posts?per_page=100&_fields=slug&status=publish`;
  
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
    }

    const posts: { slug: string }[] = await res.json();
    return posts.map(post => post.slug);
  } catch (error) {
    console.error('[WordPress] getAllPostSlugs error:', error);
    return [];
  }
}

// Buscar post individual por slug
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  const url = `${WP_API_URL}/posts?slug=${encodeURIComponent(slug)}&_embed&status=publish`;
  
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
    }

    const posts = await res.json();
    return posts[0] || null;
  } catch (error) {
    console.error(`[WordPress] getPostBySlug(${slug}) error:`, error);
    return null;
  }
}

// Buscar post individual por ID
export async function getPostById(id: number): Promise<WordPressPost | null> {
  try {
    const res = await fetch(`${WP_API_URL}/posts/${id}?_embed`);

    if (!res.ok) {
      throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`[WordPress] getPostById(${id}) error:`, error);
    return null;
  }
}

// Buscar todas as categorias
export async function getCategories(): Promise<WordPressCategory[]> {
  try {
    const res = await fetch(`${WP_API_URL}/categories?per_page=100&hide_empty=true`);

    if (!res.ok) {
      throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('[WordPress] getCategories error:', error);
    return [];
  }
}

// Extrair dados úteis de um post
export function extractPostData(post: WordPressPost) {
  // Extrair primeira categoria do post
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const firstCategory = categories[0];

  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    content: post.content.rendered,
    excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').trim(), // Remove HTML tags
    date: post.date,
    author: post._embedded?.author?.[0]?.name || 'Equipe Notebook Expert',
    authorAvatar: post._embedded?.author?.[0]?.avatar_urls?.['96'],
    featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/blog.jpg',
    featuredImageAlt: post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered,
    category: firstCategory?.name || 'Dicas',
    categorySlug: firstCategory?.slug || 'dicas',
  };
}

