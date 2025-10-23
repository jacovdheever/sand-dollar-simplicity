import { BlogPost } from '@/types/blog';
import { generateSlug } from './docxParser';

/**
 * Ensures all articles have a slug property
 * If an article doesn't have a slug, it generates one from the title
 */
export const ensureArticlesHaveSlugs = (articles: BlogPost[]): BlogPost[] => {
  return articles.map(article => {
    if (!article.slug) {
      return {
        ...article,
        slug: generateSlug(article.title)
      };
    }
    return article;
  });
};

/**
 * Finds an article by its slug
 */
export const findArticleBySlug = (articles: BlogPost[], slug: string): BlogPost | undefined => {
  return articles.find(article => article.slug === slug);
};
