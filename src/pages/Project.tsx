import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Building2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import SandDollarLoader from '@/components/SandDollarLoader';
import SEO from '@/components/SEO';
import { Project } from '@/types/project';
import { loadProjectsWithFallback } from '@/utils/fileStorageManager';


const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load projects from storage
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

  const project = projects.find(p => p.slug === slug);

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
          title="Loading Project"
          description="Loading project details..."
          noindex={true}
        />
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <SandDollarLoader size="lg" text="Loading project..." />
        </main>
        <Footer />
        <BackToTop />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="smooth-scroll flex flex-col min-h-screen">
        <SEO
          title="Project Not Found"
          description="The project you are looking for does not exist."
          noindex={true}
        />
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <p className="text-gray-600 mb-6">The project you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/work')}
              className="btn-primary"
            >
              Back to Our Work
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
        title={project.title}
        description={project.description || `Explore ${project.title} - A successful UX/UI design and development project by Sand Dollar Design. See how we solved complex challenges and delivered exceptional results.`}
        keywords={`${project.category}, ${project.industry || ''}, UX design, UI design, project case study, ${project.title}, design portfolio, digital transformation, innovation consulting`}
        image={project.featuredImage}
        url={`https://sanddollardesign.co.za/project/${project.slug}`}
        type="website"
      />
      <Navbar />
      <main>
        {/* Project Content Section */}
        <div className="w-full bg-white">
          <div className="container-custom pt-20 pb-16">
            {/* Back Button */}
            <div className="mb-8">
              <button
                onClick={() => navigate('/work')}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Our Work
              </button>
            </div>

            {/* Project Header */}
            <div className="max-w-6xl mx-auto">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                {project.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(project.publishDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{project.readTime} min read</span>
                </div>
                {project.industry && (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{project.industry}</span>
                  </div>
                )}
                {project.projectUrl && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Project URL:</span>
                    <a 
                      href={project.projectUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {project.projectUrl}
                    </a>
                  </div>
                )}
              </div>

              {/* Featured Image */}
              {project.featuredImage && (
                <div className="mb-8">
                  <div className="w-screen bg-[#f9fafb] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
                    <img
                      src={project.featuredImage}
                      alt={project.title}
                      className="w-full h-[400px] md:h-[500px] object-cover object-top"
                      style={{
                        boxShadow: 'inset 0 20px 40px -20px rgba(0, 0, 0, 0.3), inset 0 -20px 40px -20px rgba(0, 0, 0, 0.3)'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Three Row Layout */}
              <div className="space-y-12 mb-12">
                {/* Row 1: Challenge (left) + First Image (right) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">Challenge</h2>
                    <div 
                      className="text-gray-600"
                      dangerouslySetInnerHTML={{ 
                        __html: `<p>${project.challenge || 'No challenge content available.'}</p>`
                      }}
                    />
                  </div>
                  <div>
                    {project.contentImages && project.contentImages[0] ? (
                      <img
                        src={project.contentImages[0]}
                        alt="Content image 1"
                        className="w-full h-auto object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="text-center text-gray-500 py-8 bg-gray-100 rounded-2xl">
                        <p>No content image available</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 2: Second Image (left) + Solution (right) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-center">
                  <div>
                    {project.contentImages && project.contentImages[1] ? (
                      <img
                        src={project.contentImages[1]}
                        alt="Content image 2"
                        className="w-full h-auto object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="text-center text-gray-500 py-8 bg-gray-100 rounded-2xl">
                        <p>No content image available</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">Solution</h2>
                    <div 
                      className="text-gray-600"
                      dangerouslySetInnerHTML={{ 
                        __html: `<p>${project.solution || 'No solution content available.'}</p>`
                      }}
                    />
                  </div>
                </div>

                {/* Row 3: Services (left) + Third Image (right) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">Services</h2>
                    <div className="text-gray-600">
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <div>
                    {project.contentImages && project.contentImages[2] ? (
                      <img
                        src={project.contentImages[2]}
                        alt="Content image 3"
                        className="w-full h-auto object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="text-center text-gray-500 py-8 bg-gray-100 rounded-2xl">
                        <p>No content image available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Solution Images - One Column Layout */}
              {project.solutionImages && project.solutionImages.length > 0 && (
                <div className="grid grid-cols-1 gap-6 mb-12">
                  {project.solutionImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Solution image ${index + 1}`}
                        className="w-full h-auto object-cover rounded-2xl"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default ProjectPage;
