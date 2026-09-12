import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import SplitFlapText from '../reactbits/SplitFlapText';

export const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Set to 6 so it perfectly fills two rows on a 3-column grid
  const itemsPerPage = 6; 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || "Failed to fetch projects");
        }

        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        console.error("Project fetch error:", err);
        setError("Currently unable to load projects. Please check back later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  // Smooth scroll handler for pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // setTimeout ensures the DOM updates the grid height before scrolling
    setTimeout(() => {
      const section = document.getElementById('projects');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <section id="projects" className="w-full py-32 bg-[#050505] border-t border-white/5 flex justify-center z-20">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Delivered Solutions</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ delay: 0.1 }} className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Real-world applications engineered to solve complex operational bottlenecks.</motion.p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
          </div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 bg-white/[0.02] border border-white/10 rounded-[2rem]"
          >
            <AlertCircle className="w-12 h-12 text-rose-500 mb-4 opacity-80" />
            <p className="text-gray-400 text-lg">{error}</p>
          </motion.div>
        ) : projects.length === 0 ? (
           <div className="flex justify-center py-20">
             <p className="text-gray-500 text-lg">New projects are being updated. Coming soon!</p>
           </div>
        ) : (
          <>
            {/* Updated Grid: 3 columns on large screens, adjusted gap */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentProjects.map((project, i) => {
                const hasLiveUrl = project.liveUrl && project.liveUrl !== '#';
                const hasGithubUrl = project.githubUrl && project.githubUrl !== '#';
                
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true, amount: 0.1 }} 
                    className="group bg-white/[0.02] border border-white/10 rounded-[1.5rem] flex flex-col hover:border-orange-500/40 transition-colors shadow-2xl overflow-hidden"
                  >
                    {/* Updated Image Area: Reduced height from h-64 to h-48/h-52 */}
                    <div className="relative w-full h-48 sm:h-52 overflow-hidden border-b border-white/10">
                      <div className="absolute top-4 left-4 z-20 h-8 inline-flex items-center px-3 bg-black/60 backdrop-blur-md border border-white/10 text-orange-400 text-xs font-bold rounded-lg uppercase tracking-wider overflow-hidden">
                        <SplitFlapText text={project.metric} />
                      </div>
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                    </div>
                    
                    {/* Updated Content Area: Tighter padding and text sizes */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{project.title}</h3>
                      <p className="text-gray-400 mb-6 flex-grow leading-relaxed text-base">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags?.map((t, idx) => (
                          <span key={idx} className="text-xs px-2.5 py-1 bg-black border border-white/10 rounded-lg text-gray-300 font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                        <a href={project.liveUrl} target={hasLiveUrl ? "_blank" : "_self"} rel={hasLiveUrl ? "noreferrer" : undefined} className="flex items-center gap-2 text-sm font-bold text-white hover:text-orange-500 transition-colors">
                          <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                        <a href={project.githubUrl} target={hasGithubUrl ? "_blank" : "_self"} rel={hasGithubUrl ? "noreferrer" : undefined} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white transition-colors">
                          <Code className="w-4 h-4" /> Source
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-16">
                <button 
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} 
                  disabled={currentPage === 1}
                  className="p-3 bg-neutral-900 border border-neutral-800 rounded-full text-white hover:bg-orange-500 hover:border-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <span className="text-neutral-400 font-medium tracking-wide">
                  Page <span className="text-white">{currentPage}</span> of {totalPages}
                </span>
                
                <button 
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} 
                  disabled={currentPage === totalPages}
                  className="p-3 bg-neutral-900 border border-neutral-800 rounded-full text-white hover:bg-orange-500 hover:border-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};