export const WP_API_URL = 'https://achartemas.com/wp-json/wp/v2';
export const SUPABASE_DATA_URL = 'https://eezccvpkexmssynooupi.supabase.co/storage/v1/object/public/data';

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface Post {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
  yoast_head_json?: {
    og_image?: Array<{
      url: string;
    }>;
  };
  categories: number[];
  imageUrl?: string;
}

export interface WPComment {
  id: number;
  author_name: string;
  date: string;
  content: { rendered: string };
  author_avatar_urls?: { [key: string]: string };
  post: number;
}

// Caches para não ficar refazendo requests pro Supabase à toa
let cachedCategories: Category[] | null = null;
let cachedPostsData: Post[] | null = null;
let cachedCommentsData: WPComment[] | null = null;

export async function fetchCategories(): Promise<Category[]> {
  if (cachedCategories) return cachedCategories;
  try {
    const res = await fetch(`${SUPABASE_DATA_URL}/categories.json`);
    if (res.ok) {
      cachedCategories = await res.json();
      return cachedCategories!;
    }
  } catch(e) {}
  // Fallback to static if network fails or file not present
  const data = await import('../data/categories.json');
  return data.default as Category[];
}

export async function fetchAllPostsData(): Promise<Post[]> {
  if (cachedPostsData) return cachedPostsData;
  try {
    const res = await fetch('/api/posts', { cache: 'no-store' });
    if (res.ok) {
      cachedPostsData = await res.json();
    }
  } catch(e) {}
  
  if (!cachedPostsData) {
    // Fallback if API fails
    const data = await import('../data/posts.json');
    cachedPostsData = data.default as Post[];
  }
  
  // Custom sorting to ensure the newest posts (by date or id) appear first
  cachedPostsData = cachedPostsData!.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  return cachedPostsData;
}

export async function fetchPosts(categoryIds?: number[], searchQuery?: string): Promise<Post[]> {
  let filteredPosts = await fetchAllPostsData();

  if (categoryIds && categoryIds.length > 0) {
    filteredPosts = filteredPosts.filter(post => 
      post.categories.some(catId => categoryIds.includes(catId))
    );
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.title.rendered.toLowerCase().includes(query) ||
      post.content.rendered.toLowerCase().includes(query) ||
      post.excerpt.rendered.toLowerCase().includes(query)
    );
  }

  return filteredPosts;
}

export async function searchAllPosts(): Promise<Post[]> {
  return await fetchAllPostsData();
}

export async function fetchPost(id: number): Promise<Post> {
  const posts = await fetchAllPostsData();
  const post = posts.find(p => p.id === id);
  if (!post) throw new Error('Post not found');
  return post;
}

export async function fetchComments(postId: number): Promise<WPComment[]> {
  if (cachedCommentsData) return cachedCommentsData.filter(c => c.post === postId);
  try {
    const res = await fetch(`${SUPABASE_DATA_URL}/comments.json`);
    if (res.ok) {
      cachedCommentsData = await res.json();
      return cachedCommentsData!.filter(c => c.post === postId);
    }
  } catch(e) {}
  const data = await import('../data/comments.json');
  return (data.default as WPComment[]).filter(c => c.post === postId);
}
