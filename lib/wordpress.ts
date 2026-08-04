// Configuração e funções para integração com WordPress Headless

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://admin.notebookexpert.com.br/wp-json/wp/v2';

// Espera entre tentativas. O anti-DDoS da Hostinger bloqueia rajadas vindas de
// IPs de datacenter (é o que derrubou os builds de 04/08), e esse bloqueio é
// temporário — esperar costuma resolver.
const RETRY_DELAYS_MS = [2000, 5000, 15000, 30000];

/**
 * Busca na API do WordPress com retentativas.
 *
 * Lança erro em vez de devolver vazio, de propósito. O site é um export
 * estático: se uma chamada falhasse silenciosamente e devolvesse [], o build
 * passaria e publicaria a página sem conteúdo — apagando a seção do ar. Um
 * build que falha é recuperável; um deploy vazio destrói o que estava
 * publicado. Sempre prefira quebrar o build.
 */
async function wpFetch(path: string): Promise<Response> {
  let lastError = new Error('erro desconhecido');

  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    if (attempt > 0) {
      const delay = RETRY_DELAYS_MS[attempt - 1];
      console.warn(`[WordPress] ${path} falhou (${lastError.message}); nova tentativa em ${delay}ms`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    let res: Response;
    try {
      // Identifica o cliente: o fetch do Node manda "User-Agent: node" por
      // padrão, que muitos WAFs tratam como bot e barram.
      res = await fetch(`${WP_API_URL}${path}`, {
        headers: {
          'User-Agent': 'NotebookExpert-Build/1.0 (+https://notebookexpert.com.br)',
          'Accept': 'application/json',
        },
      });
    } catch (error) {
      // Falha de rede/DNS: vale repetir
      lastError = error instanceof Error ? error : new Error(String(error));
      continue;
    }

    if (res.ok) return res;

    lastError = new Error(`HTTP ${res.status} ${res.statusText}`);

    // 4xx (exceto 429) é erro da requisição em si: repetir não muda nada
    if (res.status < 500 && res.status !== 429) break;
  }

  throw new Error(
    `[WordPress] ${path} falhou após ${RETRY_DELAYS_MS.length + 1} tentativas: ${lastError.message}. ` +
    `Build abortado de propósito — publicar com dados vazios apagaria o conteúdo do site.`
  );
}

// Decodifica entidades HTML numéricas e nomeadas mais comuns
// (WordPress retorna aspas curvas, traços e similares como &#NNNN;)
export function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rsquo;/g, '’')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&hellip;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

// Remove tags HTML e decodifica entidades — para texto puro vindo do WP
export function stripHtml(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, '')).trim();
}

export interface WordPressPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  acf: {
    chamada: string;
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
  const res = await wpFetch(`/posts?per_page=${perPage}&_embed&status=publish`);
  return res.json();
}

// Buscar todos os slugs dos posts (para generateStaticParams)
export async function getAllPostSlugs(): Promise<string[]> {
  const res = await wpFetch('/posts?per_page=100&_fields=slug&status=publish');
  const posts: { slug: string }[] = await res.json();
  return posts.map(post => post.slug);
}

// Buscar post individual por slug
// null aqui significa "não existe", não "falhou" — falha vira exceção
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  const res = await wpFetch(`/posts?slug=${encodeURIComponent(slug)}&_embed&status=publish`);
  const posts: WordPressPost[] = await res.json();
  return posts[0] || null;
}

// Buscar post individual por ID
export async function getPostById(id: number): Promise<WordPressPost | null> {
  const res = await wpFetch(`/posts/${id}?_embed`);
  return res.json();
}

// Buscar todas as categorias
export async function getCategories(): Promise<WordPressCategory[]> {
  const res = await wpFetch('/categories?per_page=100&hide_empty=true');
  return res.json();
}

// Interface para páginas do WordPress (com campos ACF)
export interface WordPressPage {
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
  featured_media: number;
  acf: Record<string, unknown>;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}

// Buscar página individual por ID
export async function getPageById(id: number): Promise<WordPressPage | null> {
  const res = await wpFetch(`/pages/${id}?_embed&acf_format=standard`);
  return res.json();
}

// Interface para Custom Post Type "Dica do Especialista"
export interface WordPressExpertTip {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}

// Buscar a dica do especialista mais recente
export async function getLatestExpertTip(): Promise<WordPressExpertTip | null> {
  const res = await wpFetch('/dica_do_especialista?per_page=1&orderby=date&order=desc');
  const tips: WordPressExpertTip[] = await res.json();
  return tips[0] || null;
}

// Interface para Custom Post Type "Depoimento"
export interface WordPressTestimonial {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}

// Buscar depoimentos (últimos N)
export async function getTestimonials(perPage: number = 12): Promise<WordPressTestimonial[]> {
  const res = await wpFetch(`/depoimento?per_page=${perPage}&orderby=date&order=desc`);
  return res.json();
}

// Interface para Custom Post Type "Seminovo"
export interface WordPressSeminovo {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  // Galeria do ACF — única fonte de imagem do seminovo. Por isso as buscas
  // abaixo não pedem _embed: a imagem destacada não é usada em lugar nenhum.
  acf: {
    imagens: string[];
  };
}

// Buscar seminovos (todos ou limitado)
export async function getSeminovos(perPage: number = 100): Promise<WordPressSeminovo[]> {
  const res = await wpFetch(`/seminovo?per_page=${perPage}&acf_format=standard&orderby=date&order=desc`);
  return res.json();
}

// Buscar seminovo individual por slug
// null aqui significa "não existe", não "falhou" — falha vira exceção
export async function getSeminovoBySlug(slug: string): Promise<WordPressSeminovo | null> {
  const res = await wpFetch(`/seminovo?slug=${encodeURIComponent(slug)}&acf_format=standard`);
  const items: WordPressSeminovo[] = await res.json();
  return items[0] || null;
}

// Buscar todos os slugs dos seminovos (para generateStaticParams)
export async function getAllSeminovoSlugs(): Promise<string[]> {
  const res = await wpFetch('/seminovo?per_page=100&_fields=slug');
  const items: { slug: string }[] = await res.json();
  return items.map(item => item.slug);
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
    chamada: post.acf?.chamada || '',
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

