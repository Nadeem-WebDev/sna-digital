import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, MessageCircleQuestion } from 'lucide-react';
import { faqs } from '../../data/faqs';

// Moves the hover spotlight; CSS variables avoid a React re-render per mouse move
const trackSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
};

const FaqItem = ({ faq, isOpen, onToggle, index }) => {
  const answerId = `faq-answer-${index}`;
  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.4 }}
      onMouseMove={trackSpotlight}
      className={`group relative rounded-2xl p-px overflow-hidden transition-shadow duration-500 ${isOpen ? 'shadow-2xl shadow-orange-500/10' : ''}`}
    >
      {/* Border: a faint outline when closed, a spinning gradient when open */}
      <div className="absolute inset-0 bg-contrast/10 group-hover:bg-contrast/20 transition-colors duration-300" />
      <div className={`absolute inset-0 overflow-hidden rounded-2xl transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        {/* Only the open item spins, so closed items cost nothing */}
        <div className={`faq-spin-border ${isOpen ? 'is-spinning' : ''}`} />
      </div>

      <div className="relative rounded-[15px] bg-card overflow-hidden">
        {/* Cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(249, 115, 22, 0.09), transparent 45%)' }}
        />
        {/* Warm wash behind the open item */}
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/[0.07] via-transparent to-rose-500/[0.07] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />

        <h3 className="relative">
          <button
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={answerId}
            className="w-full flex items-center gap-4 md:gap-6 text-left px-5 md:px-8 py-5 md:py-6"
          >
            {/* Number is drawn by CSS so it isn't part of the heading text crawlers read */}
            <span
              aria-hidden="true"
              data-num={number}
              className={`before:content-[attr(data-num)] font-mono text-sm md:text-base font-bold tabular-nums transition-colors duration-300 ${isOpen ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500' : 'text-subtle group-hover:text-orange-500'}`}
            />
            <span className={`flex-1 text-base md:text-xl font-semibold transition-colors duration-300 ${isOpen ? 'text-fg' : 'text-fg-soft group-hover:text-fg'}`}>
              {faq.question}
            </span>
            <motion.span
              animate={{ rotate: isOpen ? 135 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`shrink-0 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border transition-colors duration-300 ${isOpen ? 'bg-gradient-to-br from-orange-500 to-rose-500 border-transparent text-white shadow-lg shadow-orange-500/30' : 'bg-inset border-contrast/10 text-orange-500 group-hover:border-orange-500/40'}`}
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
            </motion.span>
          </button>
        </h3>

        {/* Answer stays in the HTML when collapsed so crawlers can read it */}
        <div
          id={answerId}
          role="region"
          className={`relative grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <div className="overflow-hidden">
            <motion.div
              initial={false}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -8 }}
              transition={{ duration: 0.35, delay: isOpen ? 0.1 : 0 }}
              className="px-5 md:px-8 pb-6 md:pb-7 md:pl-[4.75rem]"
            >
              <div className="h-px mb-5 bg-gradient-to-r from-orange-500/40 via-rose-500/20 to-transparent" />
              <p className="text-left text-muted leading-relaxed text-base md:text-lg">{faq.answer}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="w-full py-32 bg-page border-t border-contrast/5 relative z-20 flex justify-center overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-24 -left-32 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-4xl mx-auto px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-panel/80 border border-edge backdrop-blur-md"
          >
            <MessageCircleQuestion className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-fg-soft font-medium tracking-wide uppercase">FAQ</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-fg tracking-tight text-center">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500">Questions</span>
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-center">Everything you need to know about working with SNA Digital.</p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
