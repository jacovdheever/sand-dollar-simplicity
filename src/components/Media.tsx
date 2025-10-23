import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, ChevronLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BlogPost } from '@/types/blog';
import { loadArticlesWithFallback } from '@/utils/fileStorageManager';
import { blogPosts } from '@/data/blogPosts';
import { ensureArticlesHaveSlugs } from '@/utils/articleUtils';
import BlogPostComponent from '@/components/BlogPost';

const Media = () => {
  const navigate = useNavigate();
  const [latestArticle, setLatestArticle] = useState<BlogPost | null>(null);
  const [allArticles, setAllArticles] = useState<BlogPost[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);


  const handleArticleClick = (article: BlogPost) => {
    navigate(`/article/${article.slug}`);
  };


  useEffect(() => {
    // Load all blog articles - same logic as Blog page
    const loadArticles = async () => {
      try {
        console.log('Media component - Loading articles...');
        const articles = await loadArticlesWithFallback();
        console.log('Media component - Loaded articles:', articles.length);
        let articlesToUse = articles;
        
        // If no articles from storage, use default blog posts
        if (articles.length === 0) {
          console.log('Media component - No articles from storage, using default blog posts');
          articlesToUse = blogPosts;
        }
        
        if (articlesToUse.length > 0) {
          // Ensure all articles have slugs
          const articlesWithSlugs = ensureArticlesHaveSlugs(articlesToUse);
          
          // Sort all articles by date and get the latest
          const sortedArticles = articlesWithSlugs.sort((a, b) => {
            const dateA = new Date(a.publishDate);
            const dateB = new Date(b.publishDate);
            return dateB.getTime() - dateA.getTime();
          });
          
          console.log('Media component - Setting articles:', sortedArticles.length);
          console.log('Media component - Latest article:', sortedArticles[0]?.title);
          setLatestArticle(sortedArticles[0]);
          setAllArticles(sortedArticles);
        }
      } catch (error) {
        console.error('Media component - Error loading articles:', error);
      }
    };
    
    // Load articles on mount
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

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320 + 32; // card width (w-80 = 320px) + gap (gap-8 = 32px)
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320 + 32; // card width (w-80 = 320px) + gap (gap-8 = 32px)
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const checkScrollPosition = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      
      setScrollPosition(scrollLeft);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < maxScrollLeft - 1); // -1 for floating point precision
      
      // Update current page based on scroll position
      const cardWidth = 320 + 32; // w-80 (320px) + gap-8 (32px)
      const visibleCards = Math.floor(container.clientWidth / cardWidth);
      const totalPages = Math.ceil((allArticles.length - 1) / visibleCards); // -1 because we skip the first article
      const newPage = Math.max(0, Math.min(Math.round(scrollLeft / (cardWidth * visibleCards)), totalPages - 1));
      setCurrentPage(newPage);
    }
  }, [allArticles.length]);

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
      
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, [allArticles.length, checkScrollPosition]); // Re-run when articles change





  // Calculate pagination dots
  const getPaginationDots = () => {
    if (!scrollContainerRef.current || allArticles.length <= 1) return [];
    
    const container = scrollContainerRef.current;
    const containerWidth = container.clientWidth;
    const cardWidth = 320 + 32; // w-80 (320px) + gap-8 (32px)
    const visibleCards = Math.floor(containerWidth / cardWidth);
    const totalPages = Math.ceil((allArticles.length - 1) / visibleCards); // -1 because we skip the first article
    
    return Array.from({ length: totalPages }, (_, index) => index);
  };

  const goToPage = (pageIndex: number) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = 320 + 32; // w-80 (320px) + gap-8 (32px)
    const visibleCards = Math.floor(container.clientWidth / cardWidth);
    const totalPages = Math.ceil((allArticles.length - 1) / visibleCards); // -1 because we skip the first article
    
    // Ensure page index is valid
    const validPageIndex = Math.max(0, Math.min(pageIndex, totalPages - 1));
    
    // Immediately update current page
    setCurrentPage(validPageIndex);
    
    const targetScroll = validPageIndex * cardWidth * visibleCards;
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  return (
    <>
      <section id="media" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16 section-animate">
          <div className="text-center max-w-4xl mx-auto">
            <div className="relative mb-8 group lg:group">
              <div className="flex items-center justify-center transition-all duration-700 ease-out lg:group-hover:justify-between">
                <h2 className="section-title from-left font-black transition-all duration-700 ease-out lg:group-hover:-translate-x-20">
                  <span className="gradient-text">Our Insights.</span>
                </h2>
                
                {/* Orange connecting line - only show on desktop hover */}
                <div className="absolute left-1/2 transform -translate-x-[38%] hidden lg:group-hover:block h-[2px] bg-[#f97315] w-[330px] transition-all duration-700 ease-out"></div>
                
                {/* View More link - only show on desktop hover */}
                <Link 
                  to="/blog"
                  className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 py-2 px-4 text-sm font-bold text-white opacity-0 translate-x-0 transition-all duration-700 ease-out lg:group-hover:opacity-100 lg:group-hover:left-full lg:group-hover:transform lg:group-hover:-translate-x-full rounded-lg hover:scale-105 whitespace-nowrap hidden lg:flex"
                  style={{backgroundColor: '#f97315'}}
                >
                  View more Articles
                  <ChevronRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto from-right">
            Stay updated with our latest insights, case studies, and industry thoughts.
          </p>
        </div>

        {/* Latest Featured Blog Article Preview */}
        {latestArticle && (
          <div className="mb-16">
            <div 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => handleArticleClick(latestArticle)}
            >
              <div className="flex flex-col lg:flex-row h-80">
                {/* Featured Image */}
                <div className="lg:w-1/2 h-48 lg:h-full">
                  {latestArticle.featuredImage ? (
                    <img
                      src={latestArticle.featuredImage}
                      alt={latestArticle.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-3xl font-bold mb-2">📱</div>
                        <div className="text-base font-semibold">{latestArticle.title}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="lg:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    {/* Category and Featured Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {latestArticle.category.charAt(0).toUpperCase() + latestArticle.category.slice(1)}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Featured
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-black text-gray-900 mb-3 line-clamp-2">
                      {latestArticle.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {latestArticle.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{latestArticle.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(latestArticle.publishDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{latestArticle.readTime} min read</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {latestArticle.tags && latestArticle.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {latestArticle.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            <Tag className="w-2 h-2 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {latestArticle.tags.length > 3 && (
                          <span className="text-xs text-gray-500">+{latestArticle.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Read More Button */}
                  <Link 
                    to={`/article/${latestArticle.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 text-sm"
                  >
                    Read Full Article
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Carousel */}
        {allArticles.length > 1 && (
          <div className="mb-16">
            {/* Carousel Layout - One Row with Navigation */}
            <div className="relative">
              {/* Left Navigation Button with fade effect - Only visible when can scroll left */}
              {canScrollLeft && (
                <div className="absolute left-0 top-0 bottom-0 z-10 hidden md:block w-20">
                  {/* Fade gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent pointer-events-none"></div>
                  {/* Navigation button */}
                  <button
                    onClick={scrollLeft}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#f97316] hover:bg-[#ea580c] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>
              )}

              {/* Right Navigation Button with fade effect */}
              {canScrollRight && (
                <div className="absolute right-0 top-0 bottom-0 z-10 hidden md:block w-20">
                  {/* Fade gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-l from-gray-50 via-gray-50/90 to-transparent pointer-events-none"></div>
                  {/* Navigation button */}
                  <button
                    onClick={scrollRight}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#f97316] hover:bg-[#ea580c] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}

              {/* Scrollable Container */}
              <div 
                ref={scrollContainerRef}
                className="overflow-x-auto pb-8 md:px-12 md:scrollbar-hide media-scrollbar-mobile"
              >
                <div className="flex gap-8 min-w-max">
                  {allArticles.slice(1, 6).map((article, index) => (
                    <div key={article.id} className="flex-shrink-0 w-80 h-[520px]">
                      <div 
                        className="h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col cursor-pointer"
                        onClick={() => handleArticleClick(article)}
                      >
                        {/* Featured Image */}
                        <div className="h-48">
                          {article.featuredImage ? (
                            <img
                              src={article.featuredImage}
                              alt={article.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                              <div className="text-white text-center">
                                <div className="text-4xl font-bold mb-2">📱</div>
                                <div className="text-lg font-semibold">{article.title}</div>
                              </div>
                            </div>
                          )}
                          {article.featured && (
                            <div className="absolute top-4 left-4">
                              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          {/* Header with Category and Date */}
                          <div className="flex justify-between items-start mb-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                            </span>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(article.publishDate)}</span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="font-black text-gray-900 group-hover:text-blue-600 transition-colors duration-200 text-xl mb-4 line-clamp-2">
                            {article.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical'}}>
                            {article.excerpt}
                          </p>

                          {/* Meta Information - Read Time Only */}
                          <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime} min read</span>
                          </div>

                          {/* Read More Button */}
                          <Link
                            to={`/article/${article.slug}`}
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 group/btn mt-auto"
                          >
                            Read More
                            <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Dots - Desktop only */}
              <div className="hidden md:flex justify-center mt-6 space-x-2">
                {getPaginationDots().map((pageIndex) => (
                  <button
                    key={pageIndex}
                    onClick={() => goToPage(pageIndex)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      pageIndex === currentPage
                        ? 'bg-[#f97316] scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to page ${pageIndex + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
    </>
  );
};

export default Media;
