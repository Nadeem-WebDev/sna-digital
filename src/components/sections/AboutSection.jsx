import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, GraduationCap, Briefcase } from 'lucide-react';
import TextType from '../reactbits/TextType';
import ParticleText from '../reactbits/ParticleText'; 

export const AboutSection = () => {
  const particleRef = useRef(null);
  const isParticleInView = useInView(particleRef, { once: false, amount: 0.3 });

  return (
    <section id="about" className="w-full py-32 bg-[#050505] border-t border-white/5 flex justify-center relative z-20">
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="mb-20 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">The Engineer Behind the Code</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ delay: 0.1 }} className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Dedicated to building scalable systems and impactful digital experiences.</motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.2 }}
            className="lg:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-10 flex flex-col justify-center relative overflow-hidden shadow-2xl hover:border-orange-500/30 transition-colors"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* FIXED: Increased mobile height to 140px and added mb-10 to safely push the typing text down */}
            <div 
              ref={particleRef} 
              className="relative w-[105%] sm:w-[350px] md:w-[420px] h-[140px] md:h-[130px] -ml-4 md:-ml-6 mb-0 md:mb-8 pointer-events-auto cursor-crosshair z-10 flex-shrink-0"
            >
              {isParticleInView && (
                <ParticleText text="Nadeem Shaikh" />
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
            
            <p className="text-gray-400 text-lg leading-relaxed mb-10 relative z-10">
              I am an Information Technology engineering graduate with hands-on experience in full-stack web development. I thrive on architecting secure backend systems, crafting dynamic React frontends, and optimizing databases. From high-traffic production platforms to robust local business solutions, I build technology that drives real business growth.
            </p>
            
            <div className="flex flex-wrap gap-4 relative z-10">
              <div className="px-5 py-3 bg-[#111111] border border-white/10 rounded-xl flex items-center gap-3 text-gray-300 font-medium">
                  <GraduationCap className="w-5 h-5 text-amber-500" /> B.E. Information Technology (2025)
              </div>
              <div className="px-5 py-3 bg-[#111111] border border-white/10 rounded-xl flex items-center gap-3 text-gray-300 font-medium">
                  <Briefcase className="w-5 h-5 text-rose-500" /> Software Programming Intern
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.2 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-10 flex flex-col gap-8 relative overflow-hidden shadow-2xl hover:border-orange-500/30 transition-colors"
          >
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Contact Details</h3>
            
            <div className="flex flex-col gap-6 relative z-10">
              <a href="mailto:nadeem786shaikh92@gmail.com" className="flex items-center gap-4 group">
                <div className="p-4 bg-[#111111] rounded-2xl border border-white/10 group-hover:border-orange-500/50 transition-colors shadow-lg">
                  <Mail className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-gray-200 font-medium group-hover:text-white transition-colors truncate max-w-[200px]" title="nadeem786shaikh92@gmail.com">
                    nadeem786shaikh92...
                  </p>
                </div>
              </a>

              <a href="tel:+918972469383" className="flex items-center gap-4 group">
                <div className="p-4 bg-[#111111] rounded-2xl border border-white/10 group-hover:border-orange-500/50 transition-colors shadow-lg">
                  <Phone className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="text-gray-200 font-medium group-hover:text-white transition-colors">+91 8972469383</p>
                </div>
              </a>

              <div className="flex items-center gap-4 group">
                <div className="p-4 bg-[#111111] rounded-2xl border border-white/10 shadow-lg">
                  <MapPin className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="text-gray-200 font-medium">Mumbai - Goregaon (W), MH</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};