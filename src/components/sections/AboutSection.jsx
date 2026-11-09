import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, GraduationCap, Briefcase } from 'lucide-react';
import TextType from '../reactbits/TextType';
import ParticleText from '../reactbits/ParticleText';
import { useTheme } from '../../hooks/useTheme';

const headingReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const subheadingReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.1 } },
};

export const AboutSection = () => {
  const particleRef = useRef(null);
  const isParticleInView = useInView(particleRef, { once: false, amount: 0.3 });
  const { theme } = useTheme();

  return (
    <section id="about" className="w-full py-16 md:py-20 bg-page border-t border-contrast/5 flex justify-center relative z-20">
      <div className="w-full max-w-6xl mx-auto px-6">
        {/* The wrapper (which never moves) watches the viewport, not the sliding text:
            observing the text itself made it flicker in and out at the screen edge */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} className="mb-10 md:mb-14 text-center">
          <motion.h2 variants={headingReveal} className="text-4xl md:text-5xl font-bold mb-6 text-fg tracking-tight">The Engineer Behind the Code</motion.h2>
          <motion.p variants={subheadingReveal} className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Dedicated to building scalable systems and impactful digital experiences.</motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.2 }}
            className="lg:col-span-2 bg-card border border-contrast/10 rounded-[2rem] p-6 md:p-10 flex flex-col justify-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* FIXED: Increased mobile height to 140px and added mb-10 to safely push the typing text down */}
            <div 
              ref={particleRef} 
              className="relative w-[105%] md:w-[560px] h-[140px] md:h-[130px] -ml-4 md:-ml-6 mb-0 md:mb-8 pointer-events-auto cursor-crosshair z-10 flex-shrink-0"
            >
              {isParticleInView && (
                <ParticleText text="Nadeem Shaikh" color={theme === 'light' ? '#0c0a09' : '#ffffff'} />
              )}
            </div>
            
            {/* The Continuous Typing Effect */}
            <p className="text-orange-500 font-bold mb-6 uppercase tracking-wider text-sm h-6 relative z-10">
              <TextType texts={[
                "Full Stack Web Developer", 
                "Software Engineer", 
                "React & Node.js Specialist",
                "Database Architect"
              ]} />
            </p>
            
            <p className="text-muted text-base md:text-lg leading-relaxed mb-8 md:mb-10 relative z-10">
              I am Nadeem, an Information Technology engineering graduate with hands-on experience in full-stack web development. I thrive on architecting secure backend systems, crafting dynamic React frontends, and optimizing databases. From high-traffic production platforms to robust local business solutions, I build technology that drives real business growth.
            </p>
            
            <div className="flex flex-wrap gap-4 relative z-10">
              <div className="px-4 md:px-5 py-3 bg-inset border border-contrast/10 rounded-xl flex items-center gap-3 text-sm md:text-base text-fg-soft font-medium">
                  <GraduationCap className="w-5 h-5 shrink-0 text-amber-500" /> B.E. Information Technology (2025)
              </div>
              <div className="px-4 md:px-5 py-3 bg-inset border border-contrast/10 rounded-xl flex items-center gap-3 text-sm md:text-base text-fg-soft font-medium">
                  <Briefcase className="w-5 h-5 shrink-0 text-rose-500" /> Software Programming Intern
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.2 }}
            className="bg-card border border-contrast/10 rounded-[2rem] p-10 flex flex-col gap-8 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-2xl font-bold text-fg mb-2 relative z-10">Contact Details</h3>
            
            <div className="flex flex-col gap-6 relative z-10">
              <a href="mailto:nadeem786shaikh92@gmail.com" className="flex items-center gap-4 group">
                <div className="relative overflow-hidden p-4 bg-inset rounded-2xl border border-contrast/10 shadow-lg group-hover:shadow-xl group-hover:shadow-orange-500/30 transition-shadow duration-300">
                  {/* Same whole-tile glow as the tech stack cards */}
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle,rgba(249,115,22,0.35),rgba(244,63,94,0.12)_55%,transparent_80%)]" />
                  <Mail className="relative w-5 h-5 text-orange-400 group-hover:text-orange-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] transition-all duration-300" />
                </div>
                <div>
                  <p className="text-sm text-subtle mb-1">Email</p>
                  <p className="text-fg-soft font-medium group-hover:text-fg transition-colors truncate max-w-[200px]" title="nadeem786shaikh92@gmail.com">
                    nadeem786shaikh92...
                  </p>
                </div>
              </a>

              <a href="tel:+918972469383" className="flex items-center gap-4 group">
                <div className="relative overflow-hidden p-4 bg-inset rounded-2xl border border-contrast/10 shadow-lg group-hover:shadow-xl group-hover:shadow-orange-500/30 transition-shadow duration-300">
                  {/* Same whole-tile glow as the tech stack cards */}
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle,rgba(249,115,22,0.35),rgba(244,63,94,0.12)_55%,transparent_80%)]" />
                  <Phone className="relative w-5 h-5 text-orange-400 group-hover:text-orange-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] transition-all duration-300" />
                </div>
                <div>
                  <p className="text-sm text-subtle mb-1">Phone</p>
                  <p className="text-fg-soft font-medium group-hover:text-fg transition-colors">+91 8972469383</p>
                </div>
              </a>

              <div className="flex items-center gap-4 group">
                <div className="p-4 bg-inset rounded-2xl border border-contrast/10 shadow-lg">
                  <MapPin className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-subtle mb-1">Location</p>
                  <p className="text-fg-soft font-medium">Mumbai - Goregaon (W), MH</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};