import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Save, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { generateSlug } from '@/utils/docxParser';
import SandDollarLoader from '@/components/SandDollarLoader';

interface ArticleEditProps {
  article: BlogPost;
  onArticleUpdated: (article: BlogPost) => void;
  onClose: () => void;
}

const ArticleEdit: React.FC<ArticleEditProps> = ({ article, onArticleUpdated, onClose }) => {
  const [formData, setFormData] = useState({
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    author: article.author,
    category: article.category,
    tags: article.tags.join(', '),
    featuredImage: article.featuredImage || '',
    readTime: article.readTime
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Initialize image preview with existing featured image
  useEffect(() => {
    if (article.featuredImage && !imagePreview) {
      setImagePreview(article.featuredImage);
    }
  }, [article.featuredImage, imagePreview]);

  const onImageDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadedImage(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps, isDragActive: isImageDragActive } = useDropzone({
    onDrop: onImageDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024 // 5MB limit for images
  });

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
  };

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (!formData.excerpt.trim()) {
        throw new Error('Excerpt is required');
      }
      if (!formData.content.trim()) {
        throw new Error('Content is required');
      }
      if (!formData.author.trim()) {
        throw new Error('Author is required');
      }
      
      // Validate excerpt word count
      const excerptWordCount = formData.excerpt.split(/\s+/).filter(word => word.length > 0).length;
      if (excerptWordCount > 50) {
        throw new Error('Excerpt must be 50 words or less');
      }

      // Process tags
      const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

      // Use uploaded image if available, otherwise use URL
      let featuredImageUrl = formData.featuredImage.trim();
      
      if (uploadedImage && imagePreview) {
        // For now, we'll use the data URL. In a real app, you'd upload to a server
        featuredImageUrl = imagePreview;
      }

      // Create updated article
      const updatedArticle: BlogPost = {
        ...article,
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        author: formData.author.trim(),
        category: formData.category,
        tags,
        featured: article.featured, // Preserve the original featured status
        featuredImage: featuredImageUrl || undefined,
        readTime: formData.readTime,
        slug: generateSlug(formData.title.trim())
      };

      onArticleUpdated(updatedArticle);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save article');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Edit Article</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
            <div className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                    <p className="text-red-800">{error}</p>
                  </div>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Article title"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the article"
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">
                    Brief description of the article (max 50 words)
                  </p>
                  <p className="text-xs text-gray-400">
                    {formData.excerpt.split(/\s+/).filter(word => word.length > 0).length}/50 words
                  </p>
                </div>
              </div>

              {/* Content - Commented out as requested */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Article Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Enter the full article content here as plain text."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical min-h-[200px]"
                  rows={10}
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">
                    Full article content as plain text (HTML tags will be removed).
                  </p>
                  <p className="text-xs text-gray-400">
                    {formData.content.length} characters
                  </p>
                </div>
              </div> */}


              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Author name"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="design">Design</option>
                  <option value="ux">User Experience</option>
                  <option value="technology">Technology</option>
                  <option value="strategy">Strategy</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="design, ux, innovation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Featured Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Featured Image
                </label>
                
                {!imagePreview ? (
                  <div
                    {...getImageRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${
                      isImageDragActive
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input {...getImageInputProps()} />
                    <ImageIcon className="mx-auto h-8 w-8 text-gray-400 mb-3" />
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {isImageDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
                    </p>
                    <p className="text-xs text-gray-500">
                      or click to select an image
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Supports: JPG, PNG, GIF, WebP (max 5MB)
                    </p>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <ImageIcon className="h-6 w-6 text-blue-600 mr-2" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {uploadedImage ? uploadedImage.name : 'Current Featured Image'}
                          </p>
                          {uploadedImage && (
                            <p className="text-sm text-gray-500">
                              {(uploadedImage.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={removeImage}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Image Preview */}
                    <div className="mt-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                    
                    {/* Replace Image Option */}
                    <div className="mt-3 text-center">
                      <div
                        {...getImageRootProps()}
                        className="inline-block cursor-pointer text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        <input {...getImageInputProps()} />
                        Replace image
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Alternative: URL input */}
                <div className="mt-3">
                  <label className="block text-xs text-gray-500 mb-1">
                    Or enter image URL:
                  </label>
                  <input
                    type="url"
                    value={formData.featuredImage}
                    onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Reading Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reading Time (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.readTime}
                  onChange={(e) => handleInputChange('readTime', parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Featured */}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
              >
                {isSaving ? (
                  <>
                    <SandDollarLoader size="sm" text="" className="mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleEdit;
