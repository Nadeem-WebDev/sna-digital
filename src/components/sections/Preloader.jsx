import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export const Preloader = ({ onComplete }) => {
  const percentRef = useRef(null);
  const containerRef = useRef(null);
  const leftCurtainRef = useRef(null);
  const rightCurtainRef = useRef(null);
  const contentRef = useRef(null);
  const counter = useRef({ value: 0 });

  useEffect(() => {
    // Lock scrolling while loading
    document.body.style.overflow = 'hidden';

    const timeline = gsap.timeline();

    // 1. Count up to 100%
    timeline.to(counter.current, {
      value: 100,
      duration: 2.2,
      snap: { value: 1 },
      ease: 'power2.inOut',
      onUpdate: () => {
        if (percentRef.current) {
          percentRef.current.textContent = Math.floor(counter.current.value);
        }
      },
    });

    // 2. Fade out the text and loading bar
    timeline.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
    }, "-=0.2"); // Starts slightly before the counter finishes

    // 3. Open the curtains (Split screen in half)
    timeline.to([leftCurtainRef.current, rightCurtainRef.current], {
      width: 0,
      duration: 0.8,
      ease: 'power4.inOut',
      onComplete: () => {
        document.body.style.overflow = 'auto';
        onComplete();
      },
    });

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
    >
      {/* Left Curtain */}
      <div 
        ref={leftCurtainRef}
        className="absolute left-0 top-0 h-full w-1/2 bg-[#050505] origin-left"
      />
      {/* Right Curtain */}
      <div 
        ref={rightCurtainRef}
        className="absolute right-0 top-0 h-full w-1/2 bg-[#050505] origin-right"
      />

      {/* Loading Content */}
      <div ref={contentRef} className="flex flex-col items-center gap-8 relative z-10">
        <div className="relative">
          {/* Sunset Theme Gradient */}
          <div className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500">
            <span ref={percentRef}>0</span>%
          </div>
          {/* Neon Glow */}
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 opacity-20 -z-10" />
        </div>
        
        <motion.p
          className="text-sm md:text-base text-gray-400 font-mono tracking-widest uppercase"
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Initializing Portfolio
        </motion.p>
        
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-rose-500"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  );
};