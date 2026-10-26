import { lazy } from 'react';

// Resolves once the element with this id is near the viewport.
// On the server (prerender) or when the element isn't in the DOM yet (dev mode,
// no prerendered HTML) it resolves immediately.
const whenVisible = (id, rootMargin) =>
  new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve();

    const el = document.getElementById(id);
    if (!el || !('IntersectionObserver' in window)) return resolve();

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        resolve();
      }
    }, { rootMargin });
    observer.observe(el);
  });

// Lazy-loads a section's code only when it scrolls near the viewport.
// Its prerendered HTML stays on screen until then, so nothing visibly changes;
// React just attaches (hydrates) later, keeping the initial page load light.
export const lazyWhenVisible = (id, loader, rootMargin = '600px 0px') =>
  lazy(() => whenVisible(id, rootMargin).then(loader));
