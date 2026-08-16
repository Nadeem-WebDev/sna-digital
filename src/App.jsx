import { useState } from 'react';
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
import { Footer } from './components/sections/Footer'; // <-- Import Footer
import { CustomCursor } from './components/CustomCursor';
import { LenisScroll } from './components/LenisScroll';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LenisScroll>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <CustomCursor />
      <FloatingNav />
      
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