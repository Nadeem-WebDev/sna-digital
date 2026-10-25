import { useState, useEffect, useCallback } from 'react';
import ReactGA from 'react-ga4';
import './index.css';
import { Preloader } from './components/sections/Preloader';
import { FloatingNav } from './components/navigation/FloatingNav';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { TechStackShowcase } from './components/sections/TechStackShowcase';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CustomCursor } from './components/CustomCursor';
import { LenisScroll } from './components/LenisScroll';

function App() {
  // Only show the preloader on the first visit of the session
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return !sessionStorage.getItem('preloaderSeen');
    } catch {
      return true;
    }
  });

  const handlePreloaderComplete = useCallback(() => {
    try {
      sessionStorage.setItem('preloaderSeen', '1');
    } catch {
      // Storage unavailable (private mode etc.) – preloader will just show again
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (!trackingId) return;

    // Defer GA until the page has loaded and the browser is idle
    const initGA = () => {
      ReactGA.initialize(trackingId);
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    };
    const scheduleGA = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(initGA, { timeout: 4000 });
      } else {
        setTimeout(initGA, 2000);
      }
    };

    if (document.readyState === 'complete') {
      scheduleGA();
    } else {
      window.addEventListener('load', scheduleGA, { once: true });
      return () => window.removeEventListener('load', scheduleGA);
    }
  }, []);
  
  return (
    <LenisScroll>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <CustomCursor />
      <FloatingNav />
      <WhatsAppButton />
      
      <main className="w-full min-h-screen bg-[#050505] text-white flex flex-col items-center overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TechStackShowcase />
        <ProjectsSection />
        <ReviewsSection />
        <ContactSection />
        <Footer />
      </main>
    </LenisScroll>
  );
}

export default App;