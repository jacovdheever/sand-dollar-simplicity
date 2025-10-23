import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, Check, AlertCircle, Loader2, Image as ImageIcon } from 'lucide-react';
import { parseArticleFile, estimateReadingTime, generateSlug, ParsedArticle } from '@/utils/docxParser';
import { BlogPost } from '@/types/blog';
import SandDollarLoader from '@/components/SandDollarLoader';

interface ArticleUploadProps {
  onArticleCreated: (article: BlogPost) => void;
  onClose: () => void;
}

const ArticleUpload: React.FC<ArticleUploadProps> = ({ onArticleCreated, onClose }) => {

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [parsedArticle, setParsedArticle] = useState<ParsedArticle | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
         // Form fields
         const [formData, setFormData] = useState({
           title: '',
           excerpt: '',
           content: '',
           author: 'Sand Dollar Design Team',
           category: 'design' as const,
           tags: [] as string[],
           featuredImage: ''
         });
  
  // Separate state for tags input to avoid circular updates
  const [tagsInput, setTagsInput] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadedFile(file);
    setError(null);
    setIsProcessing(true);

    try {
      const parsed = await parseArticleFile(file);
      setParsedArticle(parsed);
      
             // Populate form data with parsed content
             setFormData(prev => ({
               ...prev,
               title: parsed.title,
               excerpt: parsed.excerpt,
               content: parsed.content
             }));
    } catch (err) {
      setError('Failed to parse the file. Please make sure it\'s a valid .docx document.');
      setParsedArticle(null);
    } finally {
      setIsProcessing(false);
    }
  }, []);

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024 // 10MB limit
  });

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps, isDragActive: isImageDragActive } = useDropzone({
    onDrop: onImageDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024 // 5MB limit for images
  });

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTagsChange = (value: string) => {
    setTagsInput(value);
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleCreateArticle = async () => {
    if (!parsedArticle) return;

    setIsCreating(true);
    
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
      // Use uploaded image if available, otherwise use URL
      let featuredImageUrl = formData.featuredImage;
      
      if (uploadedImage && imagePreview) {
        // For now, we'll use the data URL. In a real app, you'd upload to a server
        featuredImageUrl = imagePreview;
      }

             const newArticle: BlogPost = {
               id: generateSlug(formData.title) + '-' + Date.now(),
               title: formData.title,
               excerpt: formData.excerpt,
               content: formData.content,
               author: formData.author,
               publishDate: new Date().toISOString(),
               category: formData.category,
               tags: formData.tags,
               featuredImage: featuredImageUrl || undefined,
               readTime: estimateReadingTime(formData.content.replace(/<[^>]*>/g, '').split(/\s+/).length),
               featured: true, // Latest article is always featured
               slug: generateSlug(formData.title)
             };

      // Debug for Mukuru article
      if (formData.title.includes("Mukuru")) {
        console.log('🔍 DEBUG - Creating Mukuru Article:', {
          title: formData.title,
          contentLength: parsedArticle.content?.length || 0,
          contentPreview: parsedArticle.content?.substring(0, 100) || 'No content',
          wordCount: parsedArticle.wordCount
        });
      }

      console.log('Creating new article:', newArticle);
      onArticleCreated(newArticle);
    } catch (err) {
      console.error('Article creation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create article. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setParsedArticle(null);
    setError(null);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Upload New Article</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Upload Article File
              </label>
              
              {!uploadedFile ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
                    isDragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    {isDragActive ? 'Drop the file here' : 'Drag & drop a .docx file here'}
                  </p>
                  <p className="text-sm text-gray-500">
                    or click to select a file
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Supports: .docx (max 10MB)
                  </p>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeFile}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Processing Status */}
            {isProcessing && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center">
                  <SandDollarLoader size="sm" text="" className="mr-3" />
                  <p className="text-blue-800">Processing document...</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                  <p className="text-red-800">{error}</p>
                </div>
              </div>
            )}

            {/* Parsed Article Preview */}
            {parsedArticle && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center mb-3">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <p className="text-green-800 font-medium">Document parsed successfully!</p>
                </div>
                <div className="text-sm text-green-700">
                  <p><strong>Parsed Title:</strong> {parsedArticle.title}</p>
                  <p><strong>Parsed Excerpt:</strong> {parsedArticle.excerpt.substring(0, 100)}...</p>
                  <p><strong>Word Count:</strong> {parsedArticle.wordCount} words</p>
                  <p><strong>Estimated Reading Time:</strong> {estimateReadingTime(parsedArticle.wordCount)} minutes</p>
                  {parsedArticle.images && parsedArticle.images.length > 0 && (
                    <p><strong>Images Found:</strong> {parsedArticle.images.length} image(s) preserved from document</p>
                  )}
                  <p className="text-xs text-green-600 mt-2">
                    💡 You can edit the title and excerpt in the form below. Images from the document are preserved in the content.
                  </p>
                </div>
              </div>
            )}

            {/* Article Details Form */}
            {parsedArticle && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Article Details</h3>
                
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Article Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter article title"
                  />
                </div>

                       {/* Excerpt */}
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Article Excerpt
                         </label>
                         <textarea
                           value={formData.excerpt}
                           onChange={(e) => handleInputChange('excerpt', e.target.value)}
                           rows={3}
                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           placeholder="Enter article excerpt or summary"
                           maxLength={1000}
                         />
                         <div className="flex justify-between items-center mt-1">
                           <p className="text-xs text-gray-500">
                             This will be displayed as a preview on the blog page
                           </p>
                           <p className="text-xs text-gray-400">
                             {formData.excerpt.split(/\s+/).filter(word => word.length > 0).length}/50 words
                           </p>
                         </div>
                       </div>

                       {/* Content */}
                       <div>
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
                       </div>
                
                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    value={tagsInput}
                    onChange={(e) => handleTagsChange(e.target.value)}
                    placeholder="design, ux, innovation"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Featured Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Featured Image (optional)
                  </label>
                  
                  {!uploadedImage ? (
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
                            <p className="font-medium text-gray-900">{uploadedImage.name}</p>
                            <p className="text-sm text-gray-500">
                              {(uploadedImage.size / 1024 / 1024).toFixed(2)} MB
                            </p>
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
                      {imagePreview && (
                        <div className="mt-3">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                        </div>
                      )}
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

                {/* Featured */}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateArticle}
                disabled={!parsedArticle || isCreating}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
              >
                {isCreating ? (
                  <div className="flex items-center">
                    <SandDollarLoader size="sm" text="" className="mr-2" />
                    Creating...
                  </div>
                ) : (
                  'Create Article'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleUpload;
