import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export const WhatsAppButton = () => {
  // Your phone number (must include country code without the '+')
  const phoneNumber = "918972469383"; 
  
  // The pre-filled message
  const message = "Hi Nadeem, I saw your portfolio and would like to discuss a project!";
  
  // WhatsApp Click-to-Chat URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] group flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* The pulsing background effect */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping" />
      
      {/* The main button */}
      <div className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg shadow-[#25D366]/30">
        <FaWhatsapp className="w-8 h-8 text-white" />
      </div>

      {/* Hover Tooltip */}
      <div className="absolute right-full mr-4 px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
        Chat with me
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-neutral-900 border-r border-t border-white/10 rotate-45" />
      </div>
    </motion.a>
  );
};