import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import SandDollarLoader from '@/components/SandDollarLoader';
import SEO from '@/components/SEO';
import { BlogPost } from '@/types/blog';
import { loadArticlesFromStorage } from '@/utils/storageManager';
import { loadArticlesWithFallback } from '@/utils/fileStorageManager';
import { ensureArticlesHaveSlugs, findArticleBySlug } from '@/utils/articleUtils';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const articles = await loadArticlesWithFallback();
        const articlesWithSlugs = ensureArticlesHaveSlugs(articles);
        const foundArticle = findArticleBySlug(articlesWithSlugs, slug || '');
        
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          // If not found, redirect to blog page
          navigate('/blog');
        }
      } catch (error) {
        console.error('Error loading article:', error);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug, navigate]);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Add scroll reveal effect
    const sections = document.querySelectorAll('section:not([data-no-reveal])');
    const animatedElements = document.querySelectorAll('.section-animate');
    
    const revealSection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    };

    const revealAnimatedElements = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    });

    const animatedObserver = new IntersectionObserver(revealAnimatedElements, {
      root: null,
      threshold: 0.1,
    });
    
    sections.forEach(section => {
      section.style.opacity = '0';
      sectionObserver.observe(section);
    });

    animatedElements.forEach(element => {
      animatedObserver.observe(element);
    });
    
    return () => {
      sections.forEach(section => {
        sectionObserver.unobserve(section);
      });
      animatedElements.forEach(element => {
        animatedObserver.unobserve(element);
      });
    };
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="smooth-scroll flex flex-col min-h-screen">
        <SEO
          title="Loading Article"
          description="Loading article content..."
          noindex={true}
        />
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <SandDollarLoader size="lg" text="Loading article..." />
        </main>
        <Footer />
        <BackToTop />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="smooth-scroll flex flex-col min-h-screen">
        <SEO
          title="Article Not Found"
          description="The article you are looking for does not exist."
          noindex={true}
        />
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/blog')}
              className="btn-primary"
            >
              Back to Blog
            </button>
          </div>
        </main>
        <Footer />
        <BackToTop />
      </div>
    );
  }

  return (
    <div className="smooth-scroll flex flex-col min-h-screen">
      <SEO
        title={article.title}
        description={article.excerpt || article.content?.replace(/<[^>]*>/g, '').substring(0, 160) || `Read ${article.title} - Expert insights on UX/UI design and AI development.`}
        keywords={`${article.category}, UX design, UI design, AI development, ${article.tags?.join(', ') || ''}, design insights, technology trends`}
        image={article.featuredImage}
        url={`https://sanddollardesign.co.za/article/${article.slug}`}
        type="article"
        author="Sand Dollar Design"
        publishedTime={article.publishDate}
        section={article.category}
        tags={article.tags || []}
      />
      <Navbar />
      <main>
        {/* Article Content Section */}
        <div className="w-full bg-white">
          <div className="container-custom pt-20 pb-16">
            {/* Back Button */}
            <div className="mb-8">
              <button
                onClick={() => navigate('/blog')}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </button>
            </div>

            {/* Article Header */}
            <div className="max-w-4xl mx-auto">
              {/* Category */}
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                {article.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.publishDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>By {article.author}</span>
                </div>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Featured Image */}
              {article.featuredImage && (
                <div className="mb-8">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg prose-gray max-w-none">
                {article.content && article.content.trim() && article.content !== 'This is a placeholder for your actual blog post content.' ? (
                  <div 
                    className="text-gray-700 leading-relaxed"
                    style={{
                      fontSize: '18px',
                      lineHeight: '1.7',
                      color: '#374151'
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: `
                        <style>
                          .article-content p { margin-bottom: 1.5rem; }
                          .article-content h1 { font-size: 2rem; font-weight: bold; margin-bottom: 1.5rem; margin-top: 2rem; }
                          .article-content h2 { font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; margin-top: 1.5rem; }
                          .article-content h3 { font-size: 1.25rem; font-weight: bold; margin-bottom: 0.75rem; margin-top: 1.25rem; }
                          .article-content h4 { font-size: 1.125rem; font-weight: bold; margin-bottom: 0.5rem; margin-top: 1rem; }
                          .article-content strong { font-weight: bold; }
                          .article-content em { font-style: italic; }
                          .article-content ul { list-style-type: disc; margin-left: 2rem; margin-bottom: 1.5rem; }
                          .article-content ol { list-style-type: decimal; margin-left: 2rem; margin-bottom: 1.5rem; }
                          .article-content li { margin-bottom: 0.5rem; }
                          .article-content img { max-width: 100%; height: auto; border-radius: 0.75rem; margin: 2rem 0; }
                          .article-content blockquote { border-left: 4px solid #3b82f6; padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: #6b7280; }
                          .article-content a { color: #3b82f6; text-decoration: underline; }
                          .article-content a:hover { color: #1d4ed8; }
                          .article-content code { background-color: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-family: 'Courier New', monospace; }
                          .article-content pre { background-color: #f3f4f6; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin: 1.5rem 0; }
                          .article-content pre code { background-color: transparent; padding: 0; }
                        </style>
                        <div class="article-content">${article.content}</div>
                      `
                    }}
                  />
                ) : (
                  <div className="text-gray-700 leading-relaxed">
                    <p className="mb-4">{article.excerpt}</p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                      <p className="text-blue-800 text-sm">
                        <strong>Note:</strong> This appears to be a placeholder article. Please check the blog admin panel for uploaded articles with full content.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default ArticlePage;
