import { useSyncExternalStore, useCallback } from 'react';
import { flushSync } from 'react-dom';

// The inline script in index.html applies the saved theme before first paint;
// this module just reads and updates the class it set on <html>.
const STORAGE_KEY = 'theme';
const THEME_COLORS = { dark: '#050505', light: '#fafaf9' };
const listeners = new Set();

const getTheme = () =>
  document.documentElement.classList.contains('light') ? 'light' : 'dark';

// Prerendered HTML is always dark; React re-renders with the real theme after hydrating
const getServerTheme = () => 'dark';

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const setTheme = (theme) => {
  document.documentElement.classList.toggle('light', theme === 'light');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage unavailable – theme just won't persist across visits
  }
  listeners.forEach((listener) => listener());
};

// Switches theme with a circle that grows from `origin` ({ x, y } in viewport px)
// until it covers the page. Uses the View Transitions API; browsers without it,
// or visitors who prefer reduced motion, get an instant switch.
export const switchTheme = (theme, origin) => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduceMotion || !origin) {
    setTheme(theme);
    return;
  }

  const root = document.documentElement;
  // Distance to the farthest corner, so the circle ends up covering everything
  const radius = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y)
  );

  // Kill per-element color transitions so the new snapshot is already fully themed
  root.classList.add('theme-switching');
  // flushSync so React-driven colors (particle text, nav icons) update inside the snapshot
  const transition = document.startViewTransition(() => flushSync(() => setTheme(theme)));

  transition.ready.then(() => {
    root.animate(
      {
        clipPath: [
          `circle(0px at ${origin.x}px ${origin.y}px)`,
          `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
        ],
      },
      {
        duration: 700,
        easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  }).catch(() => {});

  transition.finished.finally(() => root.classList.remove('theme-switching'));
};

export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const toggleTheme = useCallback(
    (origin) => switchTheme(theme === 'light' ? 'dark' : 'light', origin),
    [theme]
  );
  return { theme, toggleTheme };
};
