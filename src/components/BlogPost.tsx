import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '@/types/blog';
import { Calendar, Clock } from 'lucide-react';

interface BlogPostProps {
  post: BlogPost;
  featured?: boolean;
  onReadMore?: (post: BlogPost) => void;
}

const BlogPostComponent: React.FC<BlogPostProps> = ({ post, featured = false, onReadMore }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleReadMore = () => {
    if (onReadMore) {
      onReadMore(post);
    } else {
      // Navigate to individual article page
      navigate(`/article/${post.slug}`);
    }
  };

  return (
    <article 
      className={`group cursor-pointer transition-all duration-300 ${featured ? 'md:col-span-2' : ''}`}
      onClick={handleReadMore}
    >
      <div className={`h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${featured ? '' : 'flex flex-col'}`}>
        {/* Featured Image */}
        <div className={`relative overflow-hidden ${featured ? 'h-[125px] md:h-[150px]' : 'h-48'}`}>
          {post.featuredImage ? (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-4xl font-bold mb-2">📱</div>
                <div className="text-lg font-semibold">{post.title}</div>
              </div>
            </div>
          )}
          {post.featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`${featured ? 'p-4 md:p-6' : 'p-6 flex-1 flex flex-col'}`}>
          {/* Header with Category and Date */}
          <div className="flex justify-between items-start mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishDate)}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className={`font-black text-gray-900 group-hover:text-blue-600 transition-colors duration-200 ${featured ? 'text-lg md:text-xl mb-3' : 'text-xl mb-4 line-clamp-2'}`}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className={`text-gray-600 leading-relaxed ${featured ? 'text-sm mb-4 flex-1 overflow-hidden' : 'text-sm mb-4 flex-1 overflow-hidden'}`} 
             style={featured ? {display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical'} : {display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical'}}>
            {post.excerpt}
          </p>

          {/* Meta Information - Read Time Only */}
          <div className={`flex items-center gap-1 text-sm text-gray-500 ${featured ? 'mb-4' : 'mb-4'}`}>
            <Clock className="w-4 h-4" />
            <span>{post.readTime} min read</span>
          </div>

          {/* Hidden Tags for SEO - Not visible but present in DOM */}
          {post.tags && post.tags.length > 0 && (
            <div className="sr-only">
              {post.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
          )}

          {/* Read More Button */}
          <button
            onClick={handleReadMore}
            className={`inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 group/btn ${featured ? '' : 'mt-auto'}`}
          >
            Read More
            <svg
              className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="prose prose-gray max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {post.content}
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="mt-4 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
              >
                Show Less
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default BlogPostComponent;
