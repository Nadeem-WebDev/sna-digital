import './index.css';
import { useState } from 'react';
import { FloatingNav } from './components/navigation/FloatingNav';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { TechStackShowcase } from './components/sections/TechStackShowcase';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { ContactSection } from './components/sections/ContactSection';
import { CustomCursor } from './components/CustomCursor';
import { LenisScroll } from './components/LenisScroll';
import { Preloader } from './components/sections/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <LenisScroll>
        {/* Interactive Cursor & Navigation */}
        <CustomCursor />
        <FloatingNav />
        
        {/* Main Layout */}
        <main className="w-full min-h-screen bg-bg text-white flex flex-col items-center overflow-x-hidden">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <TechStackShowcase />
          <ProjectsSection />
          <ReviewsSection />
          <ContactSection />
        </main>
      </LenisScroll>
    </>
  );
}

export default App;