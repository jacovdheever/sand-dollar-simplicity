import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminLogin from '@/components/AdminLogin';
import AdminDashboard from '@/components/AdminDashboard';
import { BlogPost } from '@/types/blog';
import SEO from '@/components/SEO';
import { Project } from '@/types/project';
import { blogPosts } from '@/data/blogPosts';
import { saveArticlesToStorage, loadArticlesFromStorage, getStorageSizeMB } from '@/utils/storageManager';
import { saveProjectsToStorage, loadProjectsFromStorage, getProjectsStorageSizeMB } from '@/utils/projectStorageManager';
import { saveArticlesWithFallback, loadArticlesWithFallback, saveProjectsWithFallback, loadProjectsWithFallback } from '@/utils/fileStorageManager';

const AdminPage: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [articles, setArticles] = useState<BlogPost[]>(blogPosts);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Load articles with file storage fallback
    const loadArticles = async () => {
      const loadedArticles = await loadArticlesWithFallback();
      if (loadedArticles.length > 0) {
        setArticles(loadedArticles);
      } else {
        // Fall back to default blog posts if no articles in storage
        setArticles(blogPosts);
      }
    };

    // Load projects with file storage fallback
    const loadProjects = async () => {
      const loadedProjects = await loadProjectsWithFallback();
      if (loadedProjects.length > 0) {
        setProjects(loadedProjects);
      }
    };

    loadArticles();
    loadProjects();
  }, []);

  const saveArticles = async (newArticles: BlogPost[]) => {
    setArticles(newArticles);
    
    // Try file storage first, fallback to localStorage
    const success = await saveArticlesWithFallback(newArticles);
    
    if (success) {
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('articlesUpdated'));
      console.log(`Articles saved successfully`);
    } else {
      alert('Warning: Failed to save articles. Please check your storage setup.');
    }
  };

  const handleArticleCreated = (newArticle: BlogPost) => {
    // Unfeature all existing articles since the new one will be featured
    const updatedArticles = articles.map(article => ({
      ...article,
      featured: false
    }));
    
    // Add the new article (which is automatically featured)
    const finalArticles = [...updatedArticles, newArticle];
    saveArticles(finalArticles);
    
    // Show success message
    alert(`Article "${newArticle.title}" has been created successfully and is now the featured article!`);
  };

  const handleArticleUpdated = (updatedArticle: BlogPost) => {
    const updatedArticles = articles.map(article =>
      article.id === updatedArticle.id ? updatedArticle : article
    );
    saveArticles(updatedArticles);
    
    // Show success message
    alert(`Article "${updatedArticle.title}" has been updated successfully!`);
  };

  const handleArticleDeleted = (articleId: string) => {
    const updatedArticles = articles.filter(article => article.id !== articleId);
    saveArticles(updatedArticles);
  };

  // Project management functions
  const saveProjects = async (newProjects: Project[]) => {
    setProjects(newProjects);
    
    // Try file storage first, fallback to localStorage
    const success = await saveProjectsWithFallback(newProjects);
    
    if (success) {
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('projectsUpdated'));
      console.log(`Projects saved successfully`);
    } else {
      alert('Warning: Failed to save projects. Please check your storage setup.');
    }
  };

  const handleProjectCreated = (newProject: Project) => {
    const updatedProjects = [...projects, newProject];
    saveProjects(updatedProjects);
    
    // Show success message
    alert(`Project "${newProject.title}" has been created successfully!`);
  };

  const handleProjectUpdated = (updatedProject: Project) => {
    const updatedProjects = projects.map(project =>
      project.id === updatedProject.id ? updatedProject : project
    );
    saveProjects(updatedProjects);
    
    // Show success message
    alert(`Project "${updatedProject.title}" has been updated successfully!`);
  };

  const handleProjectDeleted = (projectId: string) => {
    const updatedProjects = projects.filter(project => project.id !== projectId);
    saveProjects(updatedProjects);
  };

  // Show login if not authenticated
  if (!isAuthenticated || !isAdmin) {
    return (
      <>
        <SEO
          title="Admin Login"
          description="Admin login for Sand Dollar Design content management system."
          noindex={true}
        />
        <AdminLogin onSuccess={() => setShowLogin(false)} />
      </>
    );
  }

  // Show dashboard if authenticated
  return (
    <>
      <SEO
        title="Admin Dashboard"
        description="Content management dashboard for Sand Dollar Design website."
        noindex={true}
      />
      <AdminDashboard
        articles={articles}
        onArticleCreated={handleArticleCreated}
        onArticleUpdated={handleArticleUpdated}
        onArticleDeleted={handleArticleDeleted}
        projects={projects}
        onProjectCreated={handleProjectCreated}
        onProjectUpdated={handleProjectUpdated}
        onProjectDeleted={handleProjectDeleted}
      />
    </>
  );
};

export default AdminPage;
