// Utility to fix excerpts for existing articles
import { BlogPost } from '@/types/blog';

export const fixArticleExcerpts = (articles: BlogPost[]): BlogPost[] => {
  return articles.map(article => {
    // Check if excerpt is too long (more than 50 words)
    const wordCount = article.excerpt.split(/\s+/).filter(word => word.length > 0).length;
    
    if (wordCount > 50) {
      // Truncate to 50 words
      const words = article.excerpt.split(/\s+/).filter(word => word.length > 0);
      const newExcerpt = words.slice(0, 50).join(' ') + '...';
      
      
      return {
        ...article,
        excerpt: newExcerpt
      };
    }
    
    return article;
  });
};

export const applyExcerptFix = () => {
  // Get articles from localStorage
  const savedArticles = localStorage.getItem('sanddollar_blog_articles');
  if (!savedArticles) {
    console.log('No articles found in localStorage');
    return;
  }

  const articles = JSON.parse(savedArticles);
  const fixedArticles = fixArticleExcerpts(articles);
  
  // Save back to localStorage
  localStorage.setItem('sanddollar_blog_articles', JSON.stringify(fixedArticles));
  
  // Dispatch event to notify components
  window.dispatchEvent(new CustomEvent('articlesUpdated'));
  
  console.log('All article excerpts have been fixed!');
};
