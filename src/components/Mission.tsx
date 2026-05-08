import { motion } from "motion/react";
import { Target, Shield, Zap, Heart } from "lucide-react";

const missions = [
  {
    icon: <Target className="text-brand-accent" size={32} />,
    title: "Precision Tension",
    description: "Every millimeter of our elastic is calibrated for consistent stretch ratios and uniform tension across the entire roll.",
  },
  {
    icon: <Shield className="text-brand-accent" size={32} />,
    title: "Unmatched Resilience",
    description: "Our materials are engineered to resist 'creeping'—maintaining their original shape even after thousands of cycles.",
  },
  {
    icon: <Zap className="text-brand-accent" size={32} />,
    title: "Rapid Sourcing",
    description: "Global distribution networks ensure that your production line never waits. We ship at the speed of your demand.",
  },
  {
    icon: <Heart className="text-brand-accent" size={32} />,
    title: "Sustainable Stretch",
    description: "We lead the industry in using recycled polymers and eco-friendly latex to minimize environmental impact.",
  },
];

export default function Mission() {
  return (
    <section className="section-padding bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-4 block">
              Quality Assurance
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built to <span className="text-brand-blue">Stretch Further</span>.</h2>
          </div>
          <p className="text-slate-400 max-w-sm mb-2 text-sm leading-relaxed text-left lg:text-right">
            We believe that the best products start with the best components. Our elastic is the backbone of premium manufacturing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {missions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800 hover:border-brand-blue/30 transition-all duration-500 group cursor-default"
            >
              <motion.div 
                whileHover={{ 
                  rotate: 12, 
                  scale: 1.15,
                  boxShadow: "0 0 30px rgba(37, 99, 235, 0.5)",
                }}
                className="mb-6 p-4 bg-brand-blue/10 w-fit rounded-2xl group-hover:bg-brand-blue transition-all duration-300 shadow-transparent"
              >
                <div className="group-hover:text-white transition-colors text-brand-blue">
                  {item.icon}
                </div>
              </motion.div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
