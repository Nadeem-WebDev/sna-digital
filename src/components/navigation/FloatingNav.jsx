import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Layers, Folder, Star, Mail } from 'lucide-react';

const navItems = [
  { name: 'Home', icon: Home, href: '#' },
  { name: 'About', icon: User, href: '#about' },
  { name: 'Services', icon: Briefcase, href: '#services' },
  { name: 'Tech', icon: Layers, href: '#tech' },
  { name: 'Projects', icon: Folder, href: '#projects' },
  { name: 'Contact', icon: Mail, href: '#contact' },
];

export const FloatingNav = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, type: 'spring' }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90]"
    >
      <div className="flex items-center gap-2 p-3 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative p-3 rounded-full hover:bg-white/10 transition-colors group flex items-center justify-center"
          >
            {/* React Bits Tooltip Animation */}
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-neutral-900 border border-white/10 rounded-lg text-xs font-semibold text-white whitespace-nowrap shadow-xl"
                >
                  {item.name}
                  {/* Tooltip Arrow */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 border-b border-r border-white/10 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* React Bits Dock Magnify Effect */}
            <motion.div
              animate={{ 
                scale: hoveredIndex === idx ? 1.3 : 1,
                y: hoveredIndex === idx ? -4 : 0,
                color: hoveredIndex === idx ? '#f97316' : '#9ca3af' // Turns orange on hover
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <item.icon className="w-5 h-5" />
            </motion.div>
          </a>
        ))}
      </div>
    </motion.div>
  );
};