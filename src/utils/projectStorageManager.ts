import { Project } from '@/types/project';

const PROJECTS_STORAGE_KEY = 'sand-dollar-projects';

export const saveProjectsToStorage = (projects: Project[]): boolean => {
  try {
    const dataString = JSON.stringify(projects);
    const dataSize = new Blob([dataString]).size;
    const maxSize = 5 * 1024 * 1024; // 5MB limit
    
    if (dataSize > maxSize) {
      console.warn('Projects data exceeds 5MB limit, truncating...');
      // Keep only the most recent projects to fit within limit
      const truncatedProjects = projects.slice(-50); // Keep last 50 projects
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(truncatedProjects));
      return false;
    }
    
    localStorage.setItem(PROJECTS_STORAGE_KEY, dataString);
    return true;
  } catch (error) {
    console.error('Error saving projects to localStorage:', error);
    return false;
  }
};

export const loadProjectsFromStorage = (): Project[] => {
  try {
    const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading projects from localStorage:', error);
  }
  return [];
};

export const getProjectsStorageSizeMB = (): number => {
  try {
    const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (stored) {
      return new Blob([stored]).size / (1024 * 1024);
    }
  } catch (error) {
    console.error('Error calculating projects storage size:', error);
  }
  return 0;
};

export const clearProjectsStorage = (): void => {
  try {
    localStorage.removeItem(PROJECTS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing projects storage:', error);
  }
};

