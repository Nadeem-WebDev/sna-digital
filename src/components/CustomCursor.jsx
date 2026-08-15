import { motion } from 'framer-motion';
import { useMousePosition, useReducedMotionPreference } from '../hooks/useAnimations';
import { useState, useEffect } from 'react';

export const CustomCursor = () => {
  const mousePosition = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    const handleMouseOver = (e) => {
      const clickableElements = ['BUTTON', 'A', 'INPUT', 'TEXTAREA'];
      // Check if hovering over a clickable element or its children
      if (clickableElements.includes(e.target.tagName) || e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      }
    };
    const handleMouseOut = () => {
      setIsHovering(false);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <>
      {/* Hide the default cursor everywhere */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Outer ring (expands on hover) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-orange-500 rounded-full pointer-events-none z-[100] mix-blend-screen"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(249, 115, 22, 0.1)' : 'transparent'
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 28,
          mass: 0.5,
        }}
      />
      
      {/* Inner solid dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-rose-500 rounded-full pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isHovering ? 0 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 800,
          damping: 32,
          mass: 0.3,
        }}
      />
    </>
  );
};