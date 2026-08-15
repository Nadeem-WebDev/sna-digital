import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TextType = ({ texts, typingSpeed = 100, erasingSpeed = 50, delay = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer;
    const i = loopNum % texts.length;
    const fullText = texts[i];

    if (isDeleting) {
      timer = setTimeout(() => {
        const nextText = fullText.substring(0, displayText.length - 1);
        setDisplayText(nextText);
        if (nextText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }, erasingSpeed);
    } else {
      timer = setTimeout(() => {
        const nextText = fullText.substring(0, displayText.length + 1);
        setDisplayText(nextText);
        if (nextText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), delay);
        }
      }, typingSpeed);
    }
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, texts, typingSpeed, erasingSpeed, delay]);

  return (
    <span className="inline-flex items-center">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[2px] h-[1em] ml-1 bg-orange-500"
      />
    </span>
  );
};

export default TextType;