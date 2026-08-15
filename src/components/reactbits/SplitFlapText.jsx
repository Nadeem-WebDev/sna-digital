import { motion } from 'framer-motion';

const SplitFlapText = ({ text }) => {
  return (
    <span className="inline-flex overflow-hidden">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            delay: index * 0.05, 
            type: "spring", 
            damping: 15, 
            stiffness: 200 
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

export default SplitFlapText;