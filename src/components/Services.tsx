import { motion } from "motion/react";
import { Factory, Shirt, HeartPulse, Zap, Scissors, Dumbbell, ArrowRight } from "lucide-react";

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
    <section className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-4 block">
            Product Line
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">Premium Elastic Solutions</h2>
          <p className="text-brand-slate max-w-2xl mx-auto">Engineered for superior stretch, recovery, and long-term durability in every application.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-hover hover-lift flex flex-col items-start gap-6 group"
            >
              <div className="p-4 bg-blue-50 text-brand-blue rounded-2xl group-hover:bg-brand-blue group-hover:text-white group-hover:animate-bounce-subtle transition-all duration-300">
                {service.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">{service.title}</h3>
                <p className="text-brand-slate text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
              <a href="#" className="text-brand-blue text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all mt-auto">
                Discover More <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
