import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import SplitFlapText from '../reactbits/SplitFlapText';

export const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Adjust this number to change how many show per page

  useEffect(() => {
    const fetchProjects = async () => {
      console.log("Fetching projects from API...");
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

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
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {currentProjects.map((project, i) => {
                const hasLiveUrl = project.liveUrl && project.liveUrl !== '#';
                const hasGithubUrl = project.githubUrl && project.githubUrl !== '#';
                
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true, amount: 0.1 }} 
                    className="group bg-white/[0.02] border border-white/10 rounded-[2rem] flex flex-col hover:border-orange-500/40 transition-colors shadow-2xl overflow-hidden"
                  >
                    {/* Image Header Area */}
                    <div className="relative w-full h-64 overflow-hidden border-b border-white/10">
                      <div className="absolute top-6 left-6 z-20 h-9 inline-flex items-center px-4 bg-black/60 backdrop-blur-md border border-white/10 text-orange-400 text-xs font-bold rounded-lg uppercase tracking-wider overflow-hidden">
                        <SplitFlapText text={project.metric} />
                      </div>
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                    </div>
                    
                    {/* Content Area */}
                    <div className="p-8 md:p-10 flex flex-col flex-grow">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{project.title}</h3>
                      <p className="text-gray-400 mb-8 flex-grow leading-relaxed text-lg">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((t, idx) => (
                          <span key={idx} className="text-sm px-3 py-1.5 bg-black border border-white/10 rounded-lg text-gray-300 font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-auto">
                        <a href={project.liveUrl} target={hasLiveUrl ? "_blank" : "_self"} rel={hasLiveUrl ? "noreferrer" : undefined} className="flex items-center gap-2 text-sm md:text-base font-bold text-white hover:text-orange-500 transition-colors">
                          <ExternalLink className="w-5 h-5" /> Live Demo
                        </a>
                        <a href={project.githubUrl} target={hasGithubUrl ? "_blank" : "_self"} rel={hasGithubUrl ? "noreferrer" : undefined} className="flex items-center gap-2 text-sm md:text-base font-bold text-gray-500 hover:text-white transition-colors">
                          <Code className="w-5 h-5" /> Source Code
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
                  onClick={handlePrev} 
                  disabled={currentPage === 1}
                  className="p-3 bg-neutral-900 border border-neutral-800 rounded-full text-white hover:bg-orange-500 hover:border-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <span className="text-neutral-400 font-medium tracking-wide">
                  Page <span className="text-white">{currentPage}</span> of {totalPages}
                </span>
                
                <button 
                  onClick={handleNext} 
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