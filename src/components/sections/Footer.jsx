import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#050505] pt-10 pb-32 border-t border-white/10 flex justify-center relative z-20">
      <motion.div
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: false }} 
        className="text-center px-6"
      >
        <p className="text-gray-500 text-sm font-medium tracking-wide">
          &copy; {new Date().getFullYear()} SNA Digital. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};