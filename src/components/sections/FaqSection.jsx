import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '../../data/faqs';

const FaqItem = ({ faq, isOpen, onToggle, index }) => {
  const answerId = `faq-answer-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.4 }}
      className={`border rounded-2xl transition-colors duration-300 ${isOpen ? 'bg-white/[0.04] border-orange-500/40' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}
    >
      <h3>
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={answerId}
          className="w-full flex items-center justify-between gap-6 text-left px-6 md:px-8 py-5 md:py-6"
        >
          <span className="text-lg md:text-xl font-semibold text-white">{faq.question}</span>
          <Plus className={`w-5 h-5 shrink-0 text-orange-500 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
        </button>
      </h3>
      {/* Answer stays in the HTML when collapsed so crawlers can read it */}
      <div
        id={answerId}
        role="region"
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="px-6 md:px-8 pb-6 text-left text-gray-400 leading-relaxed text-base md:text-lg">{faq.answer}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="w-full py-32 bg-[#050505] border-t border-white/5 relative z-20 flex justify-center">
      <div className="w-full max-w-4xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Everything you need to know about working with SNA Digital.</p>
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
