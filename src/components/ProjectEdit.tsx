import React, { useState } from 'react';
import { X, Save, Image, FileText, Calendar, User, Clock, Tag } from 'lucide-react';
import { Project } from '@/types/project';
import SandDollarLoader from '@/components/SandDollarLoader';
import { processImageForUpload, processImageForProjectHero, fileToDataURL } from '@/utils/imageUtils';

interface ProjectEditProps {
  project: Project;
  onProjectUpdated: (project: Project) => void;
  onClose: () => void;
}

const ProjectEdit: React.FC<ProjectEditProps> = ({ project, onProjectUpdated, onClose }) => {
  // Parse the existing content to extract the two sections
  const parseContent = (content: string) => {
    const challengeMatch = content.match(/<h2>The Challenge\.<\/h2>\s*<p>(.*?)<\/p>/s);
    const solutionMatch = content.match(/<h2>The Solution\.<\/h2>\s*<p>(.*?)<\/p>/s);
    
    return {
      challenge: challengeMatch ? challengeMatch[1] : '',
      solution: solutionMatch ? solutionMatch[1] : ''
    };
  };

  const parsedContent = parseContent(project.content || '');

  const [formData, setFormData] = useState({
    title: project.title,
    servicesProvided: project.category,
    industry: project.industry || '',
    projectUrl: project.projectUrl || '',
    description: project.description,
    challenge: project.challenge || parsedContent.challenge,
    solution: project.solution || parsedContent.solution,
    featured: project.featured || false
  });
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(project.featuredImage);
  const [contentImages, setContentImages] = useState<File[]>([]);
  const [contentImagePreviews, setContentImagePreviews] = useState<string[]>(project.contentImages || []);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };


  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      try {
        // Process hero image with maximum quality preservation
        const dataURL = await processImageForProjectHero(file);
        setImagePreview(dataURL);
      } catch (error) {
        console.error('Error processing image:', error);
        // Fallback to basic FileReader
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleContentImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setContentImages(files);
      
      // Process each image with quality preservation
      const processedImages = await Promise.all(
        files.map(async (file) => {
          try {
            return await processImageForUpload(file);
          } catch (error) {
            console.error('Error processing content image:', error);
            // Fallback to basic FileReader
            return new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.readAsDataURL(file);
            });
          }
        })
      );
      
      setContentImagePreviews(prev => [...prev, ...processedImages]);
    }
  };

  const handleDeleteContentImage = (index: number) => {
    setContentImages(prev => prev.filter((_, i) => i !== index));
    setContentImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.servicesProvided.trim()) {
      alert('Please enter the services provided');
      return;
    }
    
    setIsUpdating(true);

    try {
      // Combine the three content sections with headings
      const combinedContent = `
        <h2>The Challenge.</h2>
        <p>${formData.challenge}</p>
        
        <h2>The Solution.</h2>
        <p>${formData.solution}</p>
      `;

      const updatedProject: Project = {
        ...project,
        title: formData.title,
        category: formData.servicesProvided,
        industry: formData.industry,
        projectUrl: formData.projectUrl,
        description: formData.description,
        featuredImage: imagePreview,
        challenge: formData.challenge,
        solution: formData.solution,
        contentImages: contentImagePreviews,
        solutionImages: [],
        author: 'Sand Dollar Design Team',
        readTime: 5,
        slug: generateSlug(formData.title),
        featured: formData.featured
      };

      onProjectUpdated(updatedProject);
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Error updating project. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Edit Project</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Project Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project title"
                />
              </div>

              {/* Services Provided */}
              <div>
                <label htmlFor="servicesProvided" className="block text-sm font-medium text-gray-700 mb-2">
                  <Tag className="w-4 h-4 inline mr-2" />
                  Services Provided *
                </label>
                <input
                  type="text"
                  id="servicesProvided"
                  name="servicesProvided"
                  value={formData.servicesProvided}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., UX Design, Web Development, Brand Strategy"
                />
              </div>

              {/* Industry */}
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Healthcare, Finance, E-commerce, Technology"
                />
              </div>

              {/* Project URL */}
              <div>
                <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  Project URL
                </label>
                <input
                  type="url"
                  id="projectUrl"
                  name="projectUrl"
                  value={formData.projectUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the project"
                />
              </div>

              {/* Featured Image */}
              <div>
                <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">
                  <Image className="w-4 h-4 inline mr-2" />
                  Featured Image *
                </label>
                <div className="space-y-4">
                  <input
                    type="file"
                    id="featuredImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* The Challenge */}
              <div>
                <label htmlFor="challenge" className="block text-sm font-medium text-gray-700 mb-2">
                  The Challenge *
                </label>
                <textarea
                  id="challenge"
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the challenge or problem that needed to be solved..."
                />
              </div>


              {/* The Solution */}
              <div>
                <label htmlFor="solution" className="block text-sm font-medium text-gray-700 mb-2">
                  The Solution *
                </label>
                <textarea
                  id="solution"
                  name="solution"
                  value={formData.solution}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the solution, results, and outcomes achieved..."
                />
              </div>

              {/* Content Images */}
              <div>
                <label htmlFor="contentImages" className="block text-sm font-medium text-gray-700 mb-2">
                  Content Images (Two Column Layout)
                </label>
                <input
                  type="file"
                  id="contentImages"
                  multiple
                  accept="image/*"
                  onChange={handleContentImagesChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Upload images that will be displayed in a two-column layout alongside the Challenge and Solution sections
                </p>
                {contentImagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {contentImagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Content preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteContentImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                          title="Delete image"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>


              {/* Meta Information */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                  Featured Project
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isUpdating ? (
                    <>
                      <SandDollarLoader size="sm" text="" className="mr-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Project
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEdit;
