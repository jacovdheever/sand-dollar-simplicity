import { BlogPost } from '@/types/blog';
import { Project } from '@/types/project';

// File-based storage manager for development
// This will save data to JSON files in the public directory

const ARTICLES_FILE_PATH = '/data/articles.json';
const PROJECTS_FILE_PATH = '/data/projects.json';

export const saveArticlesToFile = async (articles: BlogPost[]): Promise<boolean> => {
  try {
    // In a real implementation, you'd send this to a server endpoint
    // For now, we'll use a simple approach with fetch to a local endpoint
    const response = await fetch('/sand-dollar-simplicity/api/save-articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articles),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error saving articles to file:', error);
    return false;
  }
};

export const loadArticlesFromFile = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch('/sand-dollar-simplicity/api/load-articles');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error loading articles from file:', error);
  }
  return [];
};

export const saveProjectsToFile = async (projects: Project[]): Promise<boolean> => {
  try {
    const response = await fetch('/sand-dollar-simplicity/api/save-projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projects),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error saving projects to file:', error);
    return false;
  }
};

export const loadProjectsFromFile = async (): Promise<Project[]> => {
  try {
    const response = await fetch('/sand-dollar-simplicity/api/load-projects');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error loading projects from file:', error);
  }
  return [];
};

// Fallback to localStorage if file operations fail
export const saveArticlesWithFallback = async (articles: BlogPost[]): Promise<boolean> => {
  const fileSuccess = await saveArticlesToFile(articles);
  if (!fileSuccess) {
    // Fallback to localStorage
    try {
      localStorage.setItem('sanddollar_blog_articles', JSON.stringify(articles));
      return true;
    } catch (error) {
      console.error('Both file and localStorage failed:', error);
      return false;
    }
  }
  return true;
};

export const loadArticlesWithFallback = async (): Promise<BlogPost[]> => {
  // Try API first (for development with backend)
  const fileArticles = await loadArticlesFromFile();
  if (fileArticles.length > 0) {
    return fileArticles;
  }
  
  // Try loading directly from static JSON file (for production/GitHub Pages)
  try {
    const response = await fetch('/sand-dollar-simplicity/data/articles.json');
    if (response.ok) {
      const staticArticles = await response.json();
      if (staticArticles.length > 0) {
        return staticArticles;
      }
    }
  } catch (error) {
    console.error('Error loading from static JSON file:', error);
  }
  
  // Fallback to localStorage
  try {
    const stored = localStorage.getItem('sanddollar_blog_articles');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return [];
  }
};

export const saveProjectsWithFallback = async (projects: Project[]): Promise<boolean> => {
  const fileSuccess = await saveProjectsToFile(projects);
  if (!fileSuccess) {
    // Fallback to localStorage
    try {
      localStorage.setItem('sand-dollar-projects', JSON.stringify(projects));
      return true;
    } catch (error) {
      console.error('Both file and localStorage failed:', error);
      return false;
    }
  }
  return true;
};

export const loadProjectsWithFallback = async (): Promise<Project[]> => {
  // Try API first (for development with backend)
  const fileProjects = await loadProjectsFromFile();
  if (fileProjects.length > 0) {
    return fileProjects;
  }
  
  // Try loading directly from static JSON file (for production/GitHub Pages)
  try {
    const response = await fetch('/sand-dollar-simplicity/data/projects.json');
    if (response.ok) {
      const staticProjects = await response.json();
      if (staticProjects.length > 0) {
        return staticProjects;
      }
    }
  } catch (error) {
    console.error('Error loading from static JSON file:', error);
  }
  
  // Fallback to localStorage
  try {
    const stored = localStorage.getItem('sand-dollar-projects');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return [];
  }
};
