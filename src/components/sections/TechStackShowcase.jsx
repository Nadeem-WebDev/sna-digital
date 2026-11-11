import { motion } from 'framer-motion';
import { 
  SiReact, SiExpress, SiNodedotjs, SiMongodb, 
  SiLinux, SiTailwindcss, SiFramer, 
  SiPython, SiPhp, SiMysql, SiPostgresql 
} from 'react-icons/si';
import { GitBranch } from 'lucide-react';

const tech = [
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Python', icon: SiPython },
  { name: 'PHP', icon: SiPhp },
  { name: 'React', icon: SiReact },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Framer Motion', icon: SiFramer },
  { name: 'Express', icon: SiExpress },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'MySQL', icon: SiMysql },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Linux', icon: SiLinux },
  { name: 'Git/GitHub', icon: GitBranch },
];

export const TechStackShowcase = () => {
  return (
    <section id='tech' className="w-full py-16 md:py-20 bg-page border-y border-edge flex justify-center">
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-fg">Tech Stack</h2>
          <p className="text-muted text-lg">The modern stack i use to build robust, full-stack applications.</p>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {tech.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col items-center justify-center p-6 bg-panel/40 border border-edge rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 transition-shadow duration-300"
            >
              {/* Hover glow that fills the whole tile, brightest behind the icon */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_35%,rgba(249,115,22,0.28),rgba(244,63,94,0.10)_45%,transparent_75%)]" />
              <item.icon className="relative w-8 h-8 text-amber-500 mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.8)] transition-all duration-300" />
              <span className="relative text-sm font-semibold text-fg-soft group-hover:text-fg text-center transition-colors duration-300">{item.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};