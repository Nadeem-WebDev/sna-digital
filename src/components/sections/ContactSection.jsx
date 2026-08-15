import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Step 1: Replace these with your actual EmailJS credentials
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Step 2: Make sure these keys match the {{variables}} in your EmailJS template!
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      setStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Clear form
      setTimeout(() => setStatus('idle'), 3000); // Reset button after 3 seconds
      
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="w-full py-28 md:py-40 bg-[#0a0a0a] flex justify-center relative z-20">
      <div className="w-full max-w-3xl mx-auto px-6">
        
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Let's Build Together</h2>
          <p className="text-gray-400 text-lg md:text-xl">Ready to scale? Drop your details and let's discuss your project.</p>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          onSubmit={handleSubmit}
          className="w-full bg-[#111111] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl flex flex-col"
        >
          <div className="space-y-6 mb-10 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-3">Name</label>
                <input 
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  className="w-full px-5 py-4 bg-[#050505] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-300 mb-3">Email</label>
                <input 
                  type="email" name="email" required value={formData.email} onChange={handleChange}
                  className="w-full px-5 py-4 bg-[#050505] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors" 
                  placeholder="john@example.com" 
                />
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-3">Message</label>
              <textarea 
                rows={5} name="message" required value={formData.message} onChange={handleChange}
                className="w-full px-5 py-4 bg-[#050505] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors resize-none" 
                placeholder="Tell me about your business goals..." 
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={status === 'submitting' || status === 'success'}
            className={`w-full py-5 rounded-xl text-white font-bold text-lg transition-all flex justify-center items-center gap-2 shadow-lg 
              ${status === 'success' ? 'bg-emerald-500 shadow-emerald-500/20' : 
                status === 'error' ? 'bg-red-500' : 
                'bg-gradient-to-r from-orange-500 to-rose-500 hover:opacity-90 shadow-orange-500/20'}
            `}
          >
            {status === 'submitting' && <Loader2 className="w-6 h-6 animate-spin" />}
            {status === 'success' && <CheckCircle2 className="w-6 h-6" />}
            {status === 'idle' && <Send className="w-6 h-6" />}
            
            {status === 'submitting' ? 'Sending...' : 
             status === 'success' ? 'Message Sent!' : 
             status === 'error' ? 'Error. Try Again' : 'Send Message'}
          </button>
        </motion.form>

        <div className="flex justify-center gap-6 mt-20">
            <a href="https://github.com/Nadeem-WebDev" target="_blank" rel="noreferrer" className="p-4 flex items-center justify-center rounded-2xl bg-[#111111] border border-white/10 text-gray-400 hover:text-amber-500 hover:border-amber-500/30 transition-all shadow-lg"><FiGithub className="w-6 h-6"/></a>
            <a href="https://www.linkedin.com/in/nadeem-shaikh-1035a4345/" target="_blank" rel="noreferrer" className="p-4 flex items-center justify-center rounded-2xl bg-[#111111] border border-white/10 text-gray-400 hover:text-amber-500 hover:border-amber-500/30 transition-all shadow-lg"><FiLinkedin className="w-6 h-6"/></a>
            <a href="https://www.instagram.com/nadeem_7_shaikh/" target="_blank" rel="noreferrer" className="p-4 flex items-center justify-center rounded-2xl bg-[#111111] border border-white/10 text-gray-400 hover:text-amber-500 hover:border-amber-500/30 transition-all shadow-lg"><FiInstagram className="w-6 h-6"/></a>
            <a href="mailto:nadeem786shaikh92@gmail.com" className="p-4 flex items-center justify-center rounded-2xl bg-[#111111] border border-white/10 text-gray-400 hover:text-amber-500 hover:border-amber-500/30 transition-all shadow-lg"><Mail className="w-6 h-6"/></a>
        </div>
      </div>
    </section>
  );
};