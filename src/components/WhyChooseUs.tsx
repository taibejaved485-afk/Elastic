import React from "react";
import { motion } from "motion/react";
import { Zap, ShieldCheck, Microscope, Earth } from "lucide-react";

const benefits = [
  {
    title: "Unrivaled Elasticity",
    description: "Our proprietary polymers achieve up to 800% elongation with 99.9% recovery memory, setting a new industry benchmark.",
    icon: <Zap className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Clinical Grade Safety",
    description: "Certified hypoallergenic and OEKO-TEX® Standard 100 compliant, making our fibers safe for direct prolonged skin contact.",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-400"
  },
  {
    title: "Precision Engineering",
    description: "Every micron is scanned using AI-driven optical sensors to ensure uniform thickness and tension across thousands of meters.",
    icon: <Microscope className="w-6 h-6" />,
    color: "from-purple-500 to-indigo-400"
  },
  {
    title: "Infinite Life Cycle",
    description: "Engineered to withstand 5,000+ high-intensity wash cycles without losing tensile strength or structural integrity.",
    icon: <Earth className="w-6 h-6" />,
    color: "from-orange-500 to-red-400"
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 sm:py-32 bg-white dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 dark:bg-white/[0.02] -skew-x-12 translate-x-20 z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-brand-blue font-bold tracking-[0.2em] text-sm uppercase mb-4 block"
            >
              The Science of Strength
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-6xl font-black text-brand-dark dark:text-white leading-tight tracking-tighter"
            >
              WHY THE WORLD'S BEST <br />
              <span className="text-stroke-dark dark:text-stroke">CHOOSE ELΛSTIC.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-slate dark:text-slate-400 max-w-sm mb-4 lg:text-right"
          >
            We don't just manufacture textiles; we engineer solutions that stretch the boundaries of what is possible in textile science.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-brand-blue/30 transition-all duration-500 overflow-hidden relative"
            >
              {/* Highlight effect */}
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${benefit.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} p-0.5 mb-8 transform group-hover:rotate-6 transition-transform duration-500`}>
                <div className="w-full h-full rounded-[14px] bg-white dark:bg-slate-900 flex items-center justify-center text-brand-dark dark:text-white group-hover:bg-transparent group-hover:text-white transition-colors">
                  {benefit.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-4 tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-brand-slate dark:text-slate-400 text-sm leading-relaxed">
                {benefit.description}
              </p>
              
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-blue flex items-center gap-2">
                  Technical Spec <Zap size={12} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
