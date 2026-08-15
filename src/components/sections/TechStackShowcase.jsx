import { motion } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, 
  SiTypescript, SiTailwindcss, SiFramer, 
  SiPython, SiPhp, SiMysql, SiPostgresql 
} from 'react-icons/si';
import { GitBranch } from 'lucide-react';

const tech = [
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Python', icon: SiPython },
  { name: 'PHP', icon: SiPhp },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'MySQL', icon: SiMysql },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Framer Motion', icon: SiFramer },
  { name: 'Git/GitHub', icon: GitBranch },
];

export const TechStackShowcase = () => {
  return (
    <section id='tech' className="w-full py-24 bg-[#050505] border-y border-neutral-800 flex justify-center">
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Our Arsenal</h2>
          <p className="text-neutral-400 text-lg">The modern stack we use to build robust, full-stack applications.</p>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {tech.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center justify-center p-6 bg-neutral-900/40 border border-neutral-800 rounded-2xl hover:border-orange-500/40 transition-colors shadow-lg"
            >
              <item.icon className="w-8 h-8 text-amber-500 mb-4 opacity-80" />
              <span className="text-sm font-semibold text-neutral-300 text-center">{item.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};