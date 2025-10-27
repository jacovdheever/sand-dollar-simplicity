import { BlogPost, BlogCategory } from '@/types/blog';

// Sample blog posts - replace with your actual articles
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Design Thinking in the Digital Age',
    excerpt: 'Exploring how design thinking principles are evolving in our increasingly digital world and how businesses can leverage these methodologies.',
    content: 'This is a placeholder for your actual blog post content. When you provide your articles, I will replace this with the real content.',
    author: 'Sand Dollar Design Team',
    publishDate: '2024-01-15',
    category: 'design',
    tags: ['design-thinking', 'digital-transformation', 'ux'],
    featuredImage: 'Sand Dollar Design-1.png',
    readTime: 5,
    featured: true,
    slug: 'design-thinking-in-the-digital-age'
  },
  {
    id: '2',
    title: 'The Future of User Experience',
    excerpt: 'Predicting trends and innovations that will shape UX design in the coming years, from AI integration to immersive experiences.',
    content: 'This is a placeholder for your actual blog post content. When you provide your articles, I will replace this with the real content.',
    author: 'Sand Dollar Design Team',
    publishDate: '2024-01-10',
    category: 'ux',
    tags: ['user-experience', 'future-trends', 'innovation'],
    featuredImage: '/Sand Dollar Design-2.png',
    readTime: 7,
    featured: true,
    slug: 'the-future-of-user-experience'
  },
  {
    id: '3',
    title: 'Technology Implementation Best Practices',
    excerpt: 'A comprehensive guide to successfully implementing new technologies in your organization without disrupting existing workflows.',
    content: 'This is a placeholder for your actual blog post content. When you provide your articles, I will replace this with the real content.',
    author: 'Sand Dollar Design Team',
    publishDate: '2024-01-05',
    category: 'technology',
    tags: ['technology', 'implementation', 'best-practices'],
    featuredImage: '/Sand Dollar Design-3.png',
    readTime: 6,
    featured: false,
    slug: 'technology-implementation-best-practices'
  },
  {
    id: '4',
    title: 'Digital Strategy for Modern Businesses',
    excerpt: 'How to develop and execute a digital strategy that drives real business results and competitive advantage.',
    content: 'This is a placeholder for your actual blog post content. When you provide your articles, I will replace this with the real content.',
    author: 'Sand Dollar Design Team',
    publishDate: '2024-01-01',
    category: 'strategy',
    tags: ['digital-strategy', 'business', 'growth'],
    featuredImage: '/Sand Dollar Design-4.png',
    readTime: 8,
    featured: false,
    slug: 'digital-strategy-for-modern-businesses'
  }
];

export const blogCategories: BlogCategory[] = [
  {
    id: 'design',
    name: 'Design',
    slug: 'design',
    description: 'Design thinking, visual design, and creative processes'
  },
  {
    id: 'ux',
    name: 'User Experience',
    slug: 'ux',
    description: 'UX research, usability, and user-centered design'
  },
  {
    id: 'technology',
    name: 'Technology',
    slug: 'technology',
    description: 'Technical implementation, tools, and development'
  },
  {
    id: 'strategy',
    name: 'Strategy',
    slug: 'strategy',
    description: 'Digital strategy, business planning, and growth'
  }
];
