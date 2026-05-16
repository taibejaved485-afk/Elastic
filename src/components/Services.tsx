import { motion } from "motion/react";
import { Factory, Shirt, HeartPulse, Zap, Scissors, Dumbbell } from "lucide-react";

const services = [
  {
    icon: <Factory size={30} />,
    title: "Industrial Webbing",
    description: "High-tensile, heavy-duty elastic webbing designed for industrial safety and machinery applications.",
  },
  {
    icon: <Shirt size={30} />,
    title: "Textile Elastic",
    description: "Soft, durable elastic bands optimized for high-performance activewear and everyday garments.",
  },
  {
    icon: <HeartPulse size={30} />,
    title: "Medical Grade",
    description: "Hypoallergenic and sterilized elastic solutions for surgical masks, bandages, and healthcare equipment.",
  },
  {
    icon: <Zap size={30} />,
    title: "Power Bungees",
    description: "Custom-length, ultra-stretch bungee cords built for logistics, cargo, and extreme weather resilience.",
  },
  {
    icon: <Scissors size={30} />,
    title: "Fashion Ribbons",
    description: "Multi-colored aesthetic elastic ribbons for couture fashion, accessories, and creative finishing.",
  },
  {
    icon: <Dumbbell size={30} />,
    title: "Athletic Support",
    description: "Compression-focused elastic materials for orthopedic braces, joints, and athletic recovery gear.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-4 block">
            Product Line
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark dark:text-white mb-6">Premium Elastic Solutions</h2>
          <p className="text-brand-slate dark:text-slate-400 max-w-2xl mx-auto">Engineered for superior stretch, recovery, and long-term durability in every application.</p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-[1px] overflow-hidden rounded-3xl group"
            >
              {/* Rotating Border Glow - Enhanced Laser Sweep */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_35%,#3b82f6_45%,#ffffff_50%,#3b82f6_55%,transparent_65%)] opacity-60 blur-[30px]"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_45%,#2563eb_50%,transparent_55%)] opacity-100"
              />

              <div className="relative h-full bg-white dark:bg-slate-900 p-8 rounded-[calc(1.5rem-1px)] flex flex-col items-start gap-6 border border-slate-100 dark:border-slate-800 shadow-[0_0_40px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_50px_rgba(37,99,235,0.25)] transition-all duration-500 group-hover:-translate-y-1">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.1 + 0.3 
                  }}
                  className="p-4 bg-blue-50 dark:bg-blue-900/20 text-brand-blue rounded-2xl group-hover:bg-brand-blue group-hover:text-white group-hover:animate-bounce-subtle transition-all duration-300"
                >
                  {service.icon}
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-3">{service.title}</h3>
                  <p className="text-brand-slate dark:text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Auto-Rotating Slider */}
        <div className="lg:hidden relative overflow-hidden -mx-4 sm:-mx-12">
          <motion.div
            animate={{
              x: [0, "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="flex gap-6 px-4 w-max"
          >
            {[...services, ...services].map((service, index) => (
              <div
                key={`${service.title}-${index}`}
                className="relative p-[1px] overflow-hidden rounded-3xl group"
              >
                {/* Rotating Border Glow - Enhanced Laser Sweep */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_35%,#3b82f6_45%,#ffffff_50%,#3b82f6_55%,transparent_65%)] opacity-60 blur-[30px]"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_45%,#2563eb_50%,transparent_55%)] opacity-100"
                />

                <div className="relative w-[280px] sm:w-[320px] h-full p-8 rounded-[calc(1.5rem-1px)] flex flex-col items-start gap-6 bg-white dark:bg-slate-900 border border-white/20 dark:border-slate-700/50 backdrop-blur-md shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-brand-blue rounded-2xl group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-dark dark:text-white mb-2">{service.title}</h3>
                    <p className="text-brand-slate dark:text-slate-400 text-xs leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Gradient Shadows for smooth transition */}
          <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
