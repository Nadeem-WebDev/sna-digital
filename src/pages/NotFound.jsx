import { motion } from 'framer-motion';
import { Home, Mail, Compass } from 'lucide-react';
import ParticleText from '../components/reactbits/ParticleText';
import { ThemeToggle } from '../components/ThemeToggle';
import { CustomCursor } from '../components/CustomCursor';
import { useTheme } from '../hooks/useTheme';

const quickLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Projects', href: '/#projects' },
  { name: 'FAQ', href: '/#faq' },
];

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
});

export const NotFound = () => {
  const { theme } = useTheme();
  const path = window.location.pathname;

  return (
    <>
      <CustomCursor />
      <ThemeToggle />

      <main className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-page text-fg overflow-hidden text-center">
        {/* Same backdrop as the hero */}
        <div className="absolute inset-0 hex-grid z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-page via-transparent to-transparent z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
          <motion.div
            {...fadeUp(0)}
            className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-panel/80 border border-edge backdrop-blur-md"
          >
            <Compass className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-fg-soft font-medium tracking-wide uppercase">Error 404</span>
          </motion.div>

          {/* Interactive particle "404": move the cursor through it to scatter the particles */}
          <div className="relative w-full max-w-[560px] h-[180px] md:h-[240px] cursor-crosshair">
            <ParticleText
              text="404"
              fontSize="clamp(7rem, 30vw, 13rem)"
              color={theme === 'light' ? '#0c0a09' : '#ffffff'}
              highlightColor="#f97316"
              className="min-h-0!"
            />
          </div>

          <motion.h1 {...fadeUp(0.3)} className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-fg">
            Lost in the code?
          </motion.h1>

          <motion.p {...fadeUp(0.4)} className="mt-4 text-base md:text-lg text-muted leading-relaxed max-w-lg">
            The page you're looking for doesn't exist or has moved. Let's get you back on track.
          </motion.p>

          {path !== '/' && (
            <motion.p
              {...fadeUp(0.45)}
              className="mt-4 max-w-full px-3 py-1.5 rounded-lg bg-inset border border-contrast/10 font-mono text-xs md:text-sm text-subtle truncate"
              title={path}
            >
              {path}
            </motion.p>
          )}

          <motion.div {...fadeUp(0.5)} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href="/"
              className="h-14 px-8 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:opacity-90 transition-all w-full sm:w-auto min-w-[200px]"
            >
              <Home className="w-5 h-5" /> Back to Home
            </a>
            <a
              href="/#contact"
              className="h-14 px-8 rounded-xl bg-panel border border-edge-strong text-fg font-bold flex items-center justify-center gap-2 hover:bg-inset transition-all w-full sm:w-auto min-w-[200px]"
            >
              <Mail className="w-5 h-5" /> Contact Me
            </a>
          </motion.div>

          <motion.nav {...fadeUp(0.6)} aria-label="Popular pages" className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm">
            <span className="text-subtle mr-1">Or jump to:</span>
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-full border border-contrast/10 text-fg-soft hover:text-orange-500 hover:bg-orange-500/10 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.nav>
        </div>
      </main>
    </>
  );
};
