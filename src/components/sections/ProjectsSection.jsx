import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import ReactGA from 'react-ga4';
import SplitFlapText from '../reactbits/SplitFlapText';

const projects = [
  {
    title: 'Salon Appointment Booking',
    description: 'Built a full-stack PERN salon booking system with live queue tracking and OTP email verification. Features an admin dashboard with Recharts analytics.',
    tags: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL'],
    metric: 'Full-Stack',
    liveUrl: 'https://salon-appointment-booking-system.onrender.com/',
    githubUrl: '#',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Bakery Shop Web App',
    description: 'Built a responsive bakery app with filtering by price, flavour, and other categories. Used REST APIs to fetch and display product data dynamically.',
    tags: ['React.js', 'Tailwind CSS', 'Vite', 'REST API'],
    metric: 'Dynamic UI',
    liveUrl: 'https://honey-bakery-shop.vercel.app/',
    githubUrl: '#',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Premium Realty Portal',
    description: 'A dynamic property listing application featuring advanced search filtering, high-res image galleries, and automated lead capture directly to WhatsApp.',
    tags: ['Web App', 'Lead Gen', 'MongoDB'],
    metric: '+45% Conversions',
    liveUrl: 'https://sna-real-estate-07.vercel.app/',
    githubUrl: '#',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Chat Application 2.0',
    description: 'Built a real-time chat app with instant one-on-one messaging powered by Socket.io. Implemented secure JWT authentication with bcrypt hashing.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io'],
    metric: 'Real-Time',
    liveUrl: 'https://chat-application-2-0.onrender.com/',
    githubUrl: '#',
    image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=800&auto=format&fit=crop'
  }
];

export const ProjectsSection = () => {
  // Function to handle the click event for the live demo button and send GA4 event
  const handleDemoClick = (projectName) => {
    ReactGA.event({
      category: "Projects",
      action: "Clicked Live Demo",
      label: projectName 
    });
  };
  return (
    <section id="projects" className="w-full py-32 bg-[#050505] border-t border-white/5 flex justify-center z-20">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Delivered Solutions</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ delay: 0.1 }} className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Real-world applications engineered to solve complex operational bottlenecks.</motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, i) => {
            const hasLiveUrl = project.liveUrl && project.liveUrl !== '#';
            const hasGithubUrl = project.githubUrl && project.githubUrl !== '#';

            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white/[0.02] border border-white/10 rounded-[2rem] flex flex-col hover:border-orange-500/40 transition-colors shadow-2xl overflow-hidden"
              >
                {/* Image Header Area */}
                <div className="relative w-full h-64 overflow-hidden border-b border-white/10">
                  {/* Floating Metric Badge */}
                  <div className="absolute top-6 left-6 z-20 h-9 inline-flex items-center px-4 bg-black/60 backdrop-blur-md border border-white/10 text-orange-400 text-xs font-bold rounded-lg uppercase tracking-wider overflow-hidden">
                    <SplitFlapText text={project.metric} />
                  </div>
                  
                  {/* Image with Hover Zoom */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  {/* Dark overlay to ensure text/badges stay readable */}
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
                    <a 
                      href={project.liveUrl}
                      target={hasLiveUrl ? "_blank" : "_self"}
                      rel={hasLiveUrl ? "noreferrer" : undefined}
                      onClick={() => handleDemoClick(project.title)}
                      className="flex items-center gap-2 text-sm md:text-base font-bold text-white hover:text-orange-500 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" /> Live Demo
                    </a>
                    <a 
                      href={project.githubUrl}
                      target={hasGithubUrl ? "_blank" : "_self"}
                      rel={hasGithubUrl ? "noreferrer" : undefined}
                      className="flex items-center gap-2 text-sm md:text-base font-bold text-gray-500 hover:text-white transition-colors"
                    >
                      <FiGithub className="w-5 h-5" /> Source Code
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};