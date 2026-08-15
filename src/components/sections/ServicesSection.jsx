import { motion } from 'framer-motion';
import { Globe, TrendingUp, Search } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Custom Web Development',
    description: 'Blazing fast, beautifully designed platforms with built-in booking systems and property databases tailored to your operations.',
  },
  {
    icon: TrendingUp,
    title: 'Meta & Social Ads',
    description: 'Hyper-local, data-driven ad campaigns designed to capture high-intent leads and drive footfall directly to your business.',
  },
  {
    icon: Search,
    title: 'Local SEO & Google Ads',
    description: 'Dominate local search results. We ensure your business appears first when clients search for your services in your area.',
  }
];

export const ServicesSection = () => {
  return (
    <section id="services" className="w-full py-32 bg-[#050505] border-t border-white/5 relative z-20 flex justify-center">
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">How We Drive Growth</h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">End-to-end digital solutions designed specifically to increase your revenue and scale your brand.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-white/[0.02] border border-white/10 rounded-3xl p-10 hover:bg-white/[0.04] hover:border-orange-500/50 transition-all duration-300 relative overflow-hidden flex flex-col items-start"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-colors" />
              <div className="p-4 bg-black border border-white/10 rounded-2xl mb-8 group-hover:scale-110 transition-transform">
                <service.icon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed text-lg">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};