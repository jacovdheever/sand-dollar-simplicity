import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Project } from '@/types/project';
import { loadProjectsWithFallback } from '@/utils/fileStorageManager';
import SandDollarLoader from '@/components/SandDollarLoader';

const WorkPageContent = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const loadedProjects = await loadProjectsWithFallback();
        setProjects(loadedProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleContainerClick = (project: Project) => {
    navigate(`/project/${project.slug}`);
  };

  return (
    <div className="w-full bg-white">
      {/* Header section with container */}
      <div className="container-custom pt-20 pb-8">
        <div id="work-portfolio" className="mb-16 section-animate">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="section-title mb-8 from-left font-black">
              <span className="gradient-text">Our Work.</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed from-right">
              Our portfolio showcases successful projects across various industries, demonstrating our ability to deliver exceptional results through strategic thinking, innovative design, and cutting-edge technology implementation.
            </p>
          </div>
        </div>
      </div>

      {/* Full width projects section */}
      <div className="w-full px-0 pb-16">
        <div className="w-full max-w-none px-0">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <SandDollarLoader size="lg" text="Loading projects..." />
            </div>
          ) : projects.length > 0 ? (
            <div className="relative">
              <div className="grid grid-cols-1 gap-4">
                {projects.map((project, index) => {
                  return (
                    <div key={project.id} className={`section-animate in-view ${index % 2 === 0 ? 'from-left' : 'from-right'}`}>
                      <div 
                        className="h-[300px] relative cursor-pointer group overflow-hidden"
                        onClick={() => handleContainerClick(project)}
                      >
                        {/* Primary img tag for the image */}
                        <img 
                          src={project.featuredImage || '/placeholder.svg'} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-all duration-300 ease-out"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 transition-all duration-300 ease-out bg-black/0 group-hover:bg-black/75"></div>
                        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out opacity-0 group-hover:opacity-100">
                          <div className="text-center text-white px-8">
                            <h3 className="text-2xl font-black mb-4">{project.title}</h3>
                            <p className="text-lg mb-6">{project.description}</p>
                            <button 
                              className="inline-flex items-center gap-2 py-2 px-4 text-sm font-bold text-white rounded-lg hover:scale-105 transition-transform duration-200"
                              style={{backgroundColor: '#f97315'}}
                            >
                              Have a look
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-600 mb-4">No projects yet</h3>
              <p className="text-gray-500 mb-6">Upload your first project through the admin dashboard to see it here.</p>
              <Link 
                to="/sanddollar-admin"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Go to Admin Dashboard
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkPageContent;