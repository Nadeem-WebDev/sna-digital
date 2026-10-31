import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const label = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
  const Icon = theme === 'light' ? Moon : Sun;

  const handleClick = (e) => {
    // The reveal circle grows from the center of the button
    const rect = e.currentTarget.getBoundingClientRect();
    toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed top-5 right-5 md:top-8 md:right-8 z-[90] w-12 h-12 flex items-center justify-center rounded-full bg-page/60 backdrop-blur-xl border border-contrast/10 text-muted hover:text-orange-500 shadow-2xl overflow-hidden transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 20, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -20, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          <Icon className="w-5 h-5" />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};
