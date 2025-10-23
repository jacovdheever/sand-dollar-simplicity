import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import BlogPostComponent from '@/components/BlogPost';
import BlogFiltersComponent from '@/components/BlogFilters';
import SEO from '@/components/SEO';
import { blogPosts, blogCategories } from '@/data/blogPosts';
import { BlogFilters, BlogPost } from '@/types/blog';
import { fixArticleExcerpts } from '@/utils/excerptFixer';
import { loadArticlesFromStorage, restoreAllTruncatedArticles } from '@/utils/storageManager';
import { loadArticlesWithFallback } from '@/utils/fileStorageManager';
import { ensureArticlesHaveSlugs } from '@/utils/articleUtils';

const blogWords = [
  "Design Thinking",
  "User Experience", 
  "Digital Strategy",
  "Innovation",
  "Technology",
  "Branding",
  "Research",
  "Development"
];

const BlogPage = () => {
  const [filters, setFilters] = useState<BlogFilters>({});
  const [articles, setArticles] = useState<BlogPost[]>(blogPosts);

  // Load articles from localStorage on component mount and when storage changes
  // This ensures the page automatically refreshes every time you land on it
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
        const loadArticles = async () => {
          // Restore all truncated articles first
          restoreAllTruncatedArticles();
          
          const loadedArticles = await loadArticlesWithFallback();
          
          console.log('🔍 DEBUG - Loading articles from storage:', loadedArticles.length, 'articles found');
          loadedArticles.forEach((article, index) => {
            console.log(`🔍 DEBUG - Article ${index + 1}: "${article.title}" - Content length: ${article.content?.length || 0}`);
            if (article.content?.includes('[Content truncated')) {
              console.log(`⚠️ WARNING - Article "${article.title}" is truncated!`);
            }
          });
          
          if (loadedArticles.length > 0) {
            // Check if we have real articles or just placeholders
            const realArticles = loadedArticles.filter(article => 
              article.content && 
              article.content.trim() && 
              article.content !== 'This is a placeholder for your actual blog post content.'
            );
            
            if (realArticles.length > 0) {
              console.log(`✅ Found ${realArticles.length} real articles, using them`);
              setArticles(ensureArticlesHaveSlugs(realArticles));
            } else {
              console.log('⚠️ No real articles found, using default blog posts');
              setArticles(ensureArticlesHaveSlugs(blogPosts));
            }
          } else {
            console.log('📭 No articles in storage, using default blog posts');
            setArticles(ensureArticlesHaveSlugs(blogPosts));
          }
        };

    // Load articles on mount - automatically refreshes every time you land on the page
    loadArticles();

    // Listen for storage changes (when articles are updated in admin)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sanddollar_blog_articles') {
        loadArticles();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom events (for same-tab updates)
    const handleCustomStorageChange = () => {
      loadArticles();
    };

    window.addEventListener('articlesUpdated', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('articlesUpdated', handleCustomStorageChange);
    };
  }, []);

  // Filter and search blog posts
  const filteredPosts = useMemo(() => {
    const filtered = articles.filter(post => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch = 
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category && post.category !== filters.category) {
        return false;
      }

      return true;
    });
    
    // Sort by date (latest first)
    return filtered.sort((a, b) => {
      const dateA = new Date(a.publishDate);
      const dateB = new Date(b.publishDate);
      return dateB.getTime() - dateA.getTime(); // Latest first
    });
  }, [articles, filters]);

  // Separate featured and regular posts
  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);
  



  useEffect(() => {
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

  return (
    <>
      <SEO
        title="Our Blog - UX/UI Design Insights & AI Development Articles"
        description="Stay updated with the latest insights, trends, and innovations in UX/UI design, AI development, and digital strategy. Expert articles on user experience, technology, and business transformation."
        keywords="UX design blog, UI design articles, AI development insights, digital strategy, user experience, design thinking, innovation consulting, technology trends, South Africa, USA"
        url="https://sanddollardesign.co.za/blog"
        type="website"
      />
      <div className="smooth-scroll flex flex-col min-h-screen">
        <Navbar />
        <main>
        {/* Blog Content Section */}
        <div className="w-full bg-white">
          <div className="container-custom pt-20 pb-16">
            <div id="blog-content" className="mb-6">
              <div className="text-center max-w-4xl mx-auto">
                <div className="relative mb-8">
                  <h2 className="section-title font-black">
                    <span className="gradient-text">Our Blog.</span>
                  </h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Stay updated with the latest insights, trends, and innovations in design, technology, and digital strategy. Our blog covers everything from user experience design to cutting-edge development practices.
                </p>
              </div>
            </div>





            {/* No Results */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
                <button
                  onClick={() => setFilters({})}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Featured Post - Full Width */}
        {featuredPosts.length > 0 && (
          <div className="w-full bg-white pt-0 pb-16">
            <div className="container-custom">
              <div className="w-full">
                <BlogPostComponent
                  post={featuredPosts[0]}
                  featured={true}
                />
              </div>
            </div>
          </div>
        )}

        {/* All Articles Section - Full Width Background */}
        {regularPosts.length > 0 && (
          <section style={{backgroundColor: '#f9fafb'}} className="py-16">
            <div className="container-custom">
              <h3 className="text-2xl font-black text-gray-900 mb-8">All Articles</h3>
              
              {/* Blog Filters */}
              <BlogFiltersComponent
                categories={blogCategories}
                filters={filters}
                onFiltersChange={setFilters}
                totalPosts={filteredPosts.length}
              />
              
              {/* Tiled Layout - 3 Articles per Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <div key={post.id} className="w-full">
                    <BlogPostComponent
                      post={post}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <div className="mt-auto">
        <Contact />
        <Footer />
      </div>
      </div>
      
      {/* Blog words carousel - positioned at bottom of screen */}
      <div className="overflow-hidden bg-black">
        <div>
          <div className="clients-marquee-no-hover">
            <div className="clients-marquee-track-no-hover">
              {[...blogWords, ...blogWords].map((word, index) => (
                <div key={`blog-words-${index}`} className="p-0">
                  <div className="h-[60px] md:h-[70px] lg:h-[80px] flex items-center justify-center">
                    <span className="text-[3.55rem] md:text-[4.19rem] lg:text-[4.83rem] font-black whitespace-nowrap mr-6 uppercase text-white">
                      {word}
                    </span>
                    <div className="ml-6 flex items-center justify-center">
                      <img 
                        src="/Sand-Dollar-icon.png" 
                        alt="Sand Dollar Design Icon - Blog separator" 
                        className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
};

export default BlogPage;
