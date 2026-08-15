import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-[#050505] overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 hex-grid z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-sm text-neutral-300 font-medium tracking-wide uppercase">Software Engineering Professional</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white leading-[1.1]"
        >
          Building Scalable <br />
          <span className="shiny-text">Data-Driven Apps.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Specializing in secure backend architectures, dynamic React frontends, and optimized database solutions across relational and NoSQL environments.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a href="#projects" className="h-14 px-8 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity w-full sm:w-auto min-w-[200px]">
            View Projects <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#contact" className="h-14 px-8 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all w-full sm:w-auto min-w-[200px]">
            Let's Connect
          </a>
        </motion.div>
      </div>
    </section>
  );
};