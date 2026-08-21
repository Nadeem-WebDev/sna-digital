import { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (trackingId) {
      // Initialize GA4
      ReactGA.initialize(trackingId); 
      // Track the initial pageview
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }
  }, []);
  
  return (
    <LenisScroll>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
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