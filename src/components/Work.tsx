import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Project } from '@/types/project';
import { loadProjectsWithFallback } from '@/utils/fileStorageManager';
import SandDollarLoader from '@/components/SandDollarLoader';

interface WorkProps {
  showHoverAnimation?: boolean;
}

const Work = ({ showHoverAnimation = true }: WorkProps) => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleFeaturedProjectClick = (project: Project) => {
    navigate(`/project/${project.slug}`);
  };

  useEffect(() => {
  const loadProjects = async () => {
    try {
      const allProjects = await loadProjectsWithFallback();
      console.log('All projects loaded:', allProjects);
      console.log('Projects with featured flag:', allProjects.map(p => ({ title: p.title, featured: p.featured })));
      
      setProjects(allProjects);
      
      const allFeaturedProjects = allProjects.filter(project => project.featured === true);
      const sortedFeaturedProjects = allFeaturedProjects.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
      console.log('All featured projects:', sortedFeaturedProjects);
        console.log('Featured projects count:', sortedFeaturedProjects.length);
      
      setFeaturedProjects(sortedFeaturedProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

    loadProjects();
  }, []);

  return (
    <div className="w-full bg-white">

      {/* Header section with padding */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div id="work-portfolio" className="mb-16 section-animate">
          <div className="text-center max-w-4xl mx-auto">
            <div className={`relative mb-8 ${showHoverAnimation ? 'group lg:group' : ''}`}>
              <div className={`flex items-center justify-center ${showHoverAnimation ? 'transition-all duration-700 ease-out lg:group-hover:justify-between' : ''}`}>
                <h2 className={`section-title from-left font-black ${showHoverAnimation ? 'transition-all duration-700 ease-out lg:group-hover:-translate-x-20' : ''}`}>
                  <span className="gradient-text">Our Work.</span>
                </h2>
                
                {/* Orange connecting line - only show if hover animation is enabled and on desktop */}
                {showHoverAnimation && (
                  <div className="absolute left-1/2 transform -translate-x-[45%] hidden lg:group-hover:block h-[2px] bg-[#f97315] w-[450px] transition-all duration-700 ease-out"></div>
                )}
                
                {/* View More link - only show if hover animation is enabled and on desktop */}
                {showHoverAnimation && (
                  <Link 
                    to="/projects#featured-case-studies"
                    className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 py-2 px-4 text-sm font-bold text-white opacity-0 translate-x-0 transition-all duration-700 ease-out lg:group-hover:opacity-100 lg:group-hover:left-full lg:group-hover:transform lg:group-hover:-translate-x-full rounded-lg hover:scale-105 whitespace-nowrap hidden lg:flex"
                    style={{backgroundColor: '#f97315'}}
                  >
                    View our Work
                    <ChevronRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed from-right">
              Our portfolio showcases successful projects across various industries, demonstrating our ability to deliver exceptional results through strategic thinking, innovative design, and cutting-edge technology implementation.
            </p>
          </div>
        </div>
      </div>

      {/* Mosaic Grid section - Full screen width */}
      <div className="w-full px-0 pb-16">
        <div className="w-full max-w-none px-0">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <SandDollarLoader size="lg" text="Loading projects..." />
            </div>
          ) : featuredProjects.length > 0 ? (
            <div className="space-y-4">
              {/* Row 1: 2 tiles with different widths */}
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 md:col-span-5">
                  <div 
                    className="bg-gray-200  overflow-hidden cursor-pointer group h-80"
                    onClick={() => handleFeaturedProjectClick(featuredProjects[0])}
                  >
                    <div className="relative w-full h-full">
                      <img 
                        src={featuredProjects[0]?.featuredImage || '/placeholder.svg'} 
                        alt={featuredProjects[0]?.title}
                        className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-7">
                  <div 
                    className="bg-gray-200  overflow-hidden cursor-pointer group h-80"
                    onClick={() => handleFeaturedProjectClick(featuredProjects[1])}
                  >
                    <div className="relative w-full h-full">
                      <img 
                        src={featuredProjects[1]?.featuredImage || '/placeholder.svg'} 
                        alt={featuredProjects[1]?.title}
                        className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: 4 tiles with different widths */}
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 md:col-span-3">
                  <div 
                    className="bg-gray-200  overflow-hidden cursor-pointer group h-64"
                    onClick={() => handleFeaturedProjectClick(featuredProjects[2])}
                  >
                    <div className="relative w-full h-full">
                      <img 
                        src={featuredProjects[2]?.featuredImage || '/placeholder.svg'} 
                        alt={featuredProjects[2]?.title}
                        className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <div 
                    className="bg-gray-200  overflow-hidden cursor-pointer group h-64"
                    onClick={() => handleFeaturedProjectClick(featuredProjects[3])}
                  >
                    <div className="relative w-full h-full">
                      <img 
                        src={featuredProjects[3]?.featuredImage || '/placeholder.svg'} 
                        alt={featuredProjects[3]?.title}
                        className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-3">
                  <div 
                    className="bg-gray-200  overflow-hidden cursor-pointer group h-64"
                    onClick={() => handleFeaturedProjectClick(featuredProjects[4])}
                  >
                    <div className="relative w-full h-full">
                      <img 
                        src={featuredProjects[4]?.featuredImage || '/placeholder.svg'} 
                        alt={featuredProjects[4]?.title}
                        className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-2">
                  <div 
                    className="bg-gray-200  overflow-hidden cursor-pointer group h-64"
                    onClick={() => handleFeaturedProjectClick(featuredProjects[5])}
                  >
                    <div className="relative w-full h-full">
                      <img 
                        src={featuredProjects[5]?.featuredImage || '/placeholder.svg'} 
                        alt={featuredProjects[5]?.title}
                        className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: 3 tiles with different widths */}
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 md:col-span-4">
                  <div 
                    className="bg-gray-200  overflow-hidden cursor-pointer group h-72"
                    onClick={() => handleFeaturedProjectClick(featuredProjects[6])}
                  >
                    <div className="relative w-full h-full">
                      <img 
                        src={featuredProjects[6]?.featuredImage || '/placeholder.svg'} 
                        alt={featuredProjects[6]?.title}
                        className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div 
                    className="bg-gray-200  overflow-hidden cursor-pointer group h-72"
                    onClick={() => handleFeaturedProjectClick(featuredProjects[7])}
                  >
                    <div className="relative w-full h-full">
                      <img 
                        src={featuredProjects[7]?.featuredImage || '/placeholder.svg'} 
                        alt={featuredProjects[7]?.title}
                        className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-3">
                  <div 
                    className="bg-gray-200  overflow-hidden cursor-pointer group h-72"
                    onClick={() => handleFeaturedProjectClick(featuredProjects[8])}
                  >
                    <div className="relative w-full h-full">
                      <img 
                        src={featuredProjects[8]?.featuredImage || '/placeholder.svg'} 
                        alt={featuredProjects[8]?.title}
                        className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No projects available at the moment.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile View More button with padding - Commented out as requested */}
      {/* {showHoverAnimation && (
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mt-16 mb-16 lg:hidden">
            <Link 
              to="/projects#featured-case-studies"
              className="inline-flex items-center gap-2 py-3 px-6 text-sm font-bold text-white rounded-lg hover:scale-105 transition-transform duration-200"
              style={{backgroundColor: '#f97315'}}
            >
              View our Work
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Work;