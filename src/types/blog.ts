export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  readTime: number; // in minutes
  featured?: boolean;
  slug: string; // URL-friendly version of the title
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogFilters {
  category?: string;
  search?: string;
  tags?: string[];
}
