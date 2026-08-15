import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    text: "The custom booking platform completely transformed our daily operations. We spend less time on the phone and more time actually servicing our clients.",
    author: "Priya S.",
    business: "Goregaon Luxury Salon",
  },
  {
    text: "Their targeted Meta ad campaigns generated more qualified property walk-ins in one month than our previous marketing efforts did in six.",
    author: "Rahul M.",
    business: "Western Suburbs Realty",
  },
  {
    text: "Working with them was seamless. They understood our brand vision and delivered a website that exceeded our expectations.",
    author: "Anjali K.",
    business: "Boutique Cafe Mumbai",
  },
  {
    text: "Our lead generation skyrocketed after they revamped our landing pages and optimized our Google Ads. Highly recommended!",
    author: "Vikram D.",
    business: "Veda Legal Services",
  }
];

export const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  // Auto-play Effect (Changes every 3 seconds)
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  return (
    <section id='reviews' className="w-full py-24 bg-[#050505] border-y border-neutral-800 flex justify-center overflow-hidden">
      <div className="w-full max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-white">Client Success</h2>
        
        <div 
          className="relative w-full max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)} // Pauses auto-play when user is reading
          onMouseLeave={() => setIsPaused(false)} // Resumes auto-play when mouse leaves
        >
          {/* Carousel Navigation Buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 md:-ml-8 z-10 p-3 bg-neutral-900 border border-neutral-800 rounded-full text-white hover:bg-orange-500 hover:border-orange-500 transition-colors shadow-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 md:-mr-8 z-10 p-3 bg-neutral-900 border border-neutral-800 rounded-full text-white hover:bg-orange-500 hover:border-orange-500 transition-colors shadow-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Content */}
          <div className="overflow-hidden px-8 md:px-12 py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-neutral-900/40 border border-neutral-800 p-8 md:p-14 rounded-[2rem] text-left flex flex-col relative shadow-2xl"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-neutral-800/50" />
                <div className="flex gap-1 mb-8 text-amber-500">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-lg md:text-2xl text-neutral-300 italic mb-10 leading-relaxed relative z-10">"{reviews[currentIndex].text}"</p>
                <div className="mt-auto pt-6 border-t border-neutral-800">
                  <p className="font-bold text-white text-lg">{reviews[currentIndex].author}</p>
                  <p className="text-sm font-medium text-rose-400 mt-1">{reviews[currentIndex].business}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-8 bg-orange-500' : 'w-2 bg-neutral-700 hover:bg-neutral-500'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};