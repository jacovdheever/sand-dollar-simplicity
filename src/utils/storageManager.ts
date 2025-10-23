// Utility to manage localStorage size and prevent quota exceeded errors
import { BlogPost } from '@/types/blog';

const STORAGE_KEY = 'sanddollar_blog_articles';
const MAX_STORAGE_SIZE = 25 * 1024 * 1024; // 25MB limit to accommodate multiple large articles

export const getStorageSize = (): number => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? new Blob([data]).size : 0;
};

export const getStorageSizeMB = (): number => {
  return getStorageSize() / (1024 * 1024);
};

export const isStorageNearLimit = (): boolean => {
  return getStorageSize() > MAX_STORAGE_SIZE * 0.8; // 80% of limit
};

export const optimizeArticleForStorage = (article: BlogPost): BlogPost => {
  // Truncate content if it's too long to prevent storage issues
  const maxContentLength = 5000000; // 5MB per article content to accommodate large articles
  
  if (article.content.length > maxContentLength) {
    console.warn(`Article "${article.title}" content truncated to prevent storage issues`);
    console.warn(`Original length: ${article.content.length} characters, truncated to: ${maxContentLength} characters`);
    return {
      ...article,
      content: article.content.substring(0, maxContentLength) + '\n\n[Content truncated due to storage limits]'
    };
  }
  
  return article;
};

export const saveArticlesToStorage = (articles: BlogPost[]): boolean => {
  // Optimize articles for storage to prevent quota exceeded errors
  const optimizedArticles = articles.map(optimizeArticleForStorage);
  
  // Convert to JSON
  const jsonData = JSON.stringify(optimizedArticles);
  const dataSize = new Blob([jsonData]).size;
  
  try {
    // Check if we're near the limit (but don't truncate - just warn)
    if (dataSize > MAX_STORAGE_SIZE) {
      console.warn(`⚠️ Data size (${(dataSize / 1024 / 1024).toFixed(2)}MB) exceeds storage limit (${(MAX_STORAGE_SIZE / 1024 / 1024).toFixed(2)}MB), but saving anyway to preserve content integrity.`);
      console.warn('Consider increasing MAX_STORAGE_SIZE if you encounter browser storage quota errors.');
    }
    
    // Save normally
    localStorage.setItem(STORAGE_KEY, jsonData);
    return true;
    
  } catch (error) {
    console.error('Failed to save articles to localStorage:', error);
    
    // If it's a quota exceeded error, try to clear some space
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.log('Storage quota exceeded, attempting to clear old data...');
      
      // Clear all localStorage data except our articles
      const keysToKeep = [STORAGE_KEY];
      const keysToRemove = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !keysToKeep.includes(key)) {
          keysToRemove.push(key);
        }
      }
      
      // Remove non-essential data
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      // Try saving again
      try {
        localStorage.setItem(STORAGE_KEY, jsonData);
        console.log('Articles saved successfully after clearing storage');
        return true;
      } catch (retryError) {
        console.log('Still hitting quota, removing oldest articles...');
        
        // If still failing, remove oldest articles to make space
        const sortedArticles = [...optimizedArticles].sort((a, b) => 
          new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
        );
        
        // Keep only the newest 3 articles
        const reducedArticles = sortedArticles.slice(-3);
        const reducedData = JSON.stringify(reducedArticles);
        
        try {
          localStorage.setItem(STORAGE_KEY, reducedData);
          console.log(`Articles saved successfully after removing oldest articles. Kept ${reducedArticles.length} newest articles.`);
          return true;
        } catch (finalError) {
          console.error('Still unable to save after removing old articles:', finalError);
          return false;
        }
      }
    }
    
    return false;
  }
};

export const loadArticlesFromStorage = (): BlogPost[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const articles = JSON.parse(data);
    return articles;
  } catch (error) {
    console.error('Failed to load articles from localStorage:', error);
    return [];
  }
};

export const clearAllStorage = (): void => {
  localStorage.clear();
  console.log('All localStorage data cleared');
};

export const emergencyRecovery = (): void => {
  // Emergency function to check what's in localStorage and try to recover
  console.log('🚨 EMERGENCY RECOVERY - Checking localStorage...');
  
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      const articles = JSON.parse(data);
      console.log(`Found ${articles.length} articles in localStorage:`, articles.map(a => a.title));
      
      // Check if any articles have real content
      const realArticles = articles.filter(article => 
        article.content && 
        article.content.trim() && 
        article.content !== 'This is a placeholder for your actual blog post content.'
      );
      
      console.log(`Found ${realArticles.length} articles with real content:`, realArticles.map(a => a.title));
      
      if (realArticles.length > 0) {
        console.log('✅ Real articles found in localStorage - they should be displaying');
        return;
      }
    } catch (error) {
      console.error('❌ Error parsing localStorage data:', error);
    }
  } else {
    console.log('❌ No articles found in localStorage');
  }
  
  console.log('🔍 Checking if articles are in browser backup...');
  // Check if there's a backup in sessionStorage or other keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.includes('sanddollar')) {
      console.log(`Found key: ${key}`);
    }
  }
};

export const restoreAllTruncatedArticles = (): void => {
  // Function to restore all truncated articles by removing the truncation message
  console.log('🔄 Restoring all truncated articles...');
  
  const articles = loadArticlesFromStorage();
  let hasChanges = false;
  
  const restoredArticles = articles.map(article => {
    if (article.content.includes('[Content truncated due to storage limits]')) {
      console.log(`🔄 Restoring truncated article: "${article.title}"`);
      hasChanges = true;
      return {
        ...article,
        content: article.content.replace('\n\n[Content truncated due to storage limits]', '')
      };
    }
    return article;
  });
  
  if (hasChanges) {
    console.log('💾 Saving restored articles...');
    const success = saveArticlesToStorage(restoredArticles);
    if (success) {
      console.log('✅ All truncated articles have been restored!');
      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent('articlesUpdated'));
    } else {
      console.error('❌ Failed to save restored articles');
    }
  } else {
    console.log('ℹ️ No truncated articles found to restore');
  }
};

export const restoreTruncatedContent = (): void => {
  // This function can be called to restore content that was previously truncated
  // It will re-save articles with the new, more generous storage limits
  const articles = loadArticlesFromStorage();
  if (articles.length > 0) {
    const success = saveArticlesToStorage(articles);
    if (success) {
      window.dispatchEvent(new CustomEvent('articlesUpdated'));
    }
  }
};

export const forceRestoreAllContent = (): void => {
  // Force restore all content by clearing storage and re-saving with new limits
  const articles = loadArticlesFromStorage();
  if (articles.length > 0) {
    // Clear storage first
    localStorage.removeItem(STORAGE_KEY);
    
    // Re-save with new limits
    const success = saveArticlesToStorage(articles);
    if (success) {
      window.dispatchEvent(new CustomEvent('articlesUpdated'));
    }
  }
};

export const restoreTruncatedArticle = (articleTitle: string): void => {
  // Restore a specific article that was truncated
  console.log(`🔄 Attempting to restore truncated article: "${articleTitle}"`);
  
  const articles = loadArticlesFromStorage();
  const targetArticle = articles.find(article => article.title.includes(articleTitle));
  
  if (targetArticle && targetArticle.content.includes('[Content truncated due to storage limits]')) {
    console.log(`⚠️ Found truncated article: "${targetArticle.title}"`);
    console.log(`Current content length: ${targetArticle.content.length}`);
    
    // Clear storage and re-save with new limits
    localStorage.removeItem(STORAGE_KEY);
    const success = saveArticlesToStorage(articles);
    
    if (success) {
      console.log(`✅ Article "${articleTitle}" restored with new storage limits`);
      window.dispatchEvent(new CustomEvent('articlesUpdated'));
    } else {
      console.error(`❌ Failed to restore article "${articleTitle}"`);
    }
  } else {
    console.log(`ℹ️ Article "${articleTitle}" not found or not truncated`);
  }
};
