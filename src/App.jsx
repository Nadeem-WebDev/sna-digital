import { useState, useEffect, useLayoutEffect, useCallback, memo, Suspense } from 'react';
import ReactGA from 'react-ga4';
import './index.css';
import { Preloader } from './components/sections/Preloader';
import { FloatingNav } from './components/navigation/FloatingNav';
import { HeroSection } from './components/sections/HeroSection';
import { Footer } from './components/sections/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CustomCursor } from './components/CustomCursor';
import { LenisScroll } from './components/LenisScroll';
import { lazyWhenVisible } from './utils/lazyWhenVisible';

// Below-the-fold sections: their code loads and hydrates as they scroll into view
const AboutSection = lazyWhenVisible('about', () =>
  import('./components/sections/AboutSection').then((m) => ({ default: m.AboutSection })));
const ServicesSection = lazyWhenVisible('services', () =>
  import('./components/sections/ServicesSection').then((m) => ({ default: m.ServicesSection })));
const TechStackShowcase = lazyWhenVisible('tech', () =>
  import('./components/sections/TechStackShowcase').then((m) => ({ default: m.TechStackShowcase })));
const ProjectsSection = lazyWhenVisible('projects', () =>
  import('./components/sections/ProjectsSection').then((m) => ({ default: m.ProjectsSection })));
const ReviewsSection = lazyWhenVisible('reviews', () =>
  import('./components/sections/ReviewsSection').then((m) => ({ default: m.ReviewsSection })));
const FaqSection = lazyWhenVisible('faq', () =>
  import('./components/sections/FaqSection').then((m) => ({ default: m.FaqSection })));
const ContactSection = lazyWhenVisible('contact', () =>
  import('./components/sections/ContactSection').then((m) => ({ default: m.ContactSection })));

// Memoized so App's own re-renders (e.g. preloader finishing) never touch
// sections that are still waiting to hydrate
const BelowFold = memo(function BelowFold({ initialProjects }) {
  return (
    <>
      <Suspense fallback={null}><AboutSection /></Suspense>
      <Suspense fallback={null}><ServicesSection /></Suspense>
      <Suspense fallback={null}><TechStackShowcase /></Suspense>
      <Suspense fallback={null}><ProjectsSection initialProjects={initialProjects} /></Suspense>
      <Suspense fallback={null}><ReviewsSection /></Suspense>
      <Suspense fallback={null}><FaqSection /></Suspense>
      <Suspense fallback={null}><ContactSection /></Suspense>
      <Footer />
    </>
  );
});

function App({ initialProjects = [] }) {
  // Starts true on both server and client so the prerendered HTML hydrates cleanly
  const [isLoading, setIsLoading] = useState(true);

  // Only show the preloader on the first visit of the session.
  // Layout effect runs before paint, so returning visitors don't see it flash.
  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem('preloaderSeen')) setIsLoading(false);
    } catch {
      // Storage unavailable – keep showing the preloader
    }
  }, []);

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
        <BelowFold initialProjects={initialProjects} />
      </main>
    </LenisScroll>
  );
}

export default App;