export interface Project {
  id: string;
  title: string;
  category: string;
  industry?: string; // Industry field for project categorization
  projectUrl?: string; // Project URL field for external links
  description: string;
  featuredImage: string;
  challenge: string;
  solution: string;
  content?: string; // Legacy content field for backward compatibility
  contentImages: string[]; // Array of image URLs for content area
  solutionImages: string[]; // Array of image URLs for solution area
  publishDate: string;
  readTime: number;
  author: string;
  slug: string;
  featured?: boolean;
}
