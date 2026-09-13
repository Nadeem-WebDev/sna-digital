import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import ReactGA from 'react-ga4';
import SplitFlapText from '../reactbits/SplitFlapText';

// --- Premium 3D Tilt Card Component ---
const ProjectCard = ({ project, handleDemoClick }) => {
  const hasLiveUrl = project.liveUrl && project.liveUrl !== '#';
  const hasGithubUrl = project.githubUrl && project.githubUrl !== '#projects';

  // 3D Tilt Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="w-full h-full flex flex-col">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        // The scale compresses slightly when you click/tap the card
        whileTap={{ scale: 0.98 }}
        className="group relative w-full h-full flex flex-col flex-grow cursor-default"
      >
        {/* Inner Card Content with Parallax Pop */}
        <div 
          className="relative flex flex-col flex-grow w-full rounded-[1.5rem] bg-[#0a0a0a] border border-white/10 group-hover:border-orange-500/50 group-hover:shadow-2xl group-hover:shadow-orange-500/20 transition-all duration-500 overflow-hidden z-10 text-left"
          style={{ transform: "translateZ(40px)" }} 
        >
          {/* ✨ NEW: Soft Inner Gradient Glow on Hover ✨ */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-transparent to-rose-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

          {/* Image Area - z-10 keeps it above the background gradient */}
          <div className="relative w-full h-48 overflow-hidden rounded-t-[1.5rem] border-b border-white/10 flex-shrink-0 bg-black z-10">
            <div className="absolute top-4 left-4 z-20 h-7 inline-flex items-center px-3 bg-black/60 backdrop-blur-md border border-white/10 text-orange-400 text-[10px] font-bold rounded-lg uppercase tracking-wider overflow-hidden">
              <SplitFlapText text={project.metric} />
            </div>
            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80 pointer-events-none" />
          </div>

          {/* Text & Tags Area - z-10 keeps text crisp above the gradient */}
          <div className="p-6 flex flex-col flex-grow relative z-10">
            <h3 className="text-xl font-bold text-white mb-4 line-clamp-1" title={project.title}>{project.title}</h3>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags?.map((t, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 bg-[#111111] border border-white/10 rounded-lg text-gray-300 font-medium whitespace-nowrap shadow-inner">
                  {t}
                </span>
              ))}
            </div>

            {/* Pure CSS Interactive Buttons */}
            <div className="flex items-center gap-3 mt-auto relative z-20">
              <a
                href={project.liveUrl}
                target={hasLiveUrl ? "_blank" : "_self"}
                rel={hasLiveUrl ? "noreferrer" : undefined}
                onClick={() => handleDemoClick(project.title)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 rounded-xl text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/50 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                <ExternalLink className="w-4 h-4" /> Live
              </a>
              <a
                href={project.githubUrl}
                target={hasGithubUrl ? "_blank" : "_self"}
                rel={hasGithubUrl ? "noreferrer" : undefined}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#111111] border border-white/10 hover:border-white/30 hover:bg-white/5 rounded-xl text-sm font-bold text-gray-300 hover:text-white shadow-lg transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                <FiGithub className="w-4 h-4" /> Source
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Section Component ---
export const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setTimeout(() => {
      const section = document.getElementById('projects');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleDemoClick = (projectName) => {
    ReactGA.event({ category: "Projects", action: "Clicked Live Demo", label: projectName });
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
            {/* items-stretch ensures all cards in a row match the height of the tallest one automatically */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              {currentProjects.map((project, i) => (
                <ProjectCard key={i} project={project} handleDemoClick={handleDemoClick} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-16">
                <motion.button 
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} 
                  disabled={currentPage === 1}
                  className="p-3 bg-neutral-900 border border-neutral-800 rounded-full text-white hover:bg-orange-500 hover:border-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                
                <span className="text-neutral-400 font-medium tracking-wide">
                  Page <span className="text-white">{currentPage}</span> of {totalPages}
                </span>
                
                <motion.button 
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} 
                  disabled={currentPage === totalPages}
                  className="p-3 bg-neutral-900 border border-neutral-800 rounded-full text-white hover:bg-orange-500 hover:border-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};