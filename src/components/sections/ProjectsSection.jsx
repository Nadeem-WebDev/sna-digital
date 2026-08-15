import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';

const projects = [
  {
    title: 'Salon Appointment Booking System',
    description: 'Built a full-stack PERN salon booking system with live queue tracking and OTP email verification. Features an admin dashboard with Recharts analytics.',
    tags: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL'],
    metric: 'Full-Stack',
    liveUrl: 'https://salon-appointment-booking-system.onrender.com/',
    githubUrl: '#'
  },
  {
    title: 'Chat Application',
    description: 'Built a real-time chat app with instant one-on-one messaging powered by Socket.io. Implemented secure JWT authentication with bcrypt hashing and Cloudinary image uploads.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io'],
    metric: 'Real-Time',
    liveUrl: 'https://chat-application-2-0.onrender.com',
    githubUrl: '#'
  },
  {
    title: 'Bakery Shop Web App',
    description: 'Built a responsive bakery app with filtering by price, flavour, and other categories. Used REST APIs to fetch and display product data dynamically.',
    tags: ['React.js', 'Tailwind CSS', 'Vite', 'REST API'],
    metric: 'Dynamic UI',
    liveUrl: 'https://honey-bakery-shop.vercel.app/',
    githubUrl: '#'
  },
  {
    title: 'Premium Realty Portal',
    description: 'A dynamic property listing application featuring advanced search filtering, high-res image galleries, and automated lead capture directly to WhatsApp.',
    tags: ['Web App', 'Lead Gen', 'MongoDB'],
    metric: '+45% Conversions',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'Ad Analytics Dashboard',
    description: 'Client-facing portal for tracking real-time ad spend, lead generation metrics, and monthly ROI reports directly from your browser.',
    tags: ['Dashboard', 'React', 'APIs'],
    metric: 'Real-time Sync',
    liveUrl: '#',
    githubUrl: '#'
  }
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="w-full py-32 bg-[#050505] border-t border-white/5 flex justify-center z-20">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Delivered Solutions</h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Real-world applications engineered to solve complex operational bottlenecks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => {
            // Logic to determine if it should open in a new tab
            const hasLiveUrl = project.liveUrl && project.liveUrl !== '#';
            const hasGithubUrl = project.githubUrl && project.githubUrl !== '#';

            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-3xl p-10 flex flex-col hover:border-orange-500/40 transition-colors shadow-2xl"
              >
                <div className="mb-8 inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold rounded-lg w-max uppercase tracking-wider">
                  {project.metric}
                </div>
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
                    <Code className="w-5 h-5" /> Source Code
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};