import React from 'react';
import { X, Calendar, Clock, User, Tag } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface BlogPostModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null;

  // Temporary debug for the specific article
  if (post.title.includes("Mukuru")) {
    console.log('🔍 DEBUG - Mukuru Article:', {
      title: post.title,
      contentLength: post.content?.length || 0,
      contentPreview: post.content?.substring(0, 100) || 'No content',
      isPlaceholder: post.content === 'This is a placeholder for your actual blog post content.',
      hasContent: !!(post.content && post.content.trim() && post.content !== 'This is a placeholder for your actual blog post content.')
    });
  }


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
              {post.featured && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Featured
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="h-[300px] overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6 md:p-8">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag, index) => (
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

              {/* Content */}
              <div className="prose prose-lg prose-gray max-w-none">
                {post.content && post.content.trim() && post.content !== 'This is a placeholder for your actual blog post content.' ? (
                  <div 
                    className="text-gray-700 leading-relaxed"
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.6',
                      color: '#374151'
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: `
                        <style>
                          .article-content p { margin-bottom: 1rem; }
                          .article-content h1 { font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; }
                          .article-content h2 { font-size: 1.25rem; font-weight: bold; margin-bottom: 0.75rem; }
                          .article-content h3 { font-size: 1.125rem; font-weight: bold; margin-bottom: 0.5rem; }
                          .article-content strong { font-weight: bold; }
                          .article-content em { font-style: italic; }
                          .article-content ul { list-style-type: disc; margin-left: 1.5rem; }
                          .article-content ol { list-style-type: decimal; margin-left: 1.5rem; }
                          .article-content li { margin-bottom: 0.25rem; }
                          .article-content img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1rem 0; }
                        </style>
                        <div class="article-content">${post.content}</div>
                      `
                    }}
                  />
                ) : (
                  <div className="text-gray-700 leading-relaxed">
                    <p className="mb-4">{post.excerpt}</p>
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
      </div>
    </div>
  );
};

export default BlogPostModal;
