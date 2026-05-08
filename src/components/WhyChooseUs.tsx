import React from "react";
import { motion } from "motion/react";
import { Zap, ShieldCheck, Microscope, Earth } from "lucide-react";

const benefits = [
  {
    title: "Unrivaled Elasticity",
    description: "Our proprietary polymers achieve up to 800% elongation with 99.9% recovery memory, setting a new industry benchmark.",
    icon: <Zap className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-400",
    metric: "800%",
    label: "Tensile Range"
  },
  {
    title: "Clinical Grade Safety",
    description: "Certified hypoallergenic and OEKO-TEX® Standard 100 compliant, making our fibers safe for direct prolonged skin contact.",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-400",
    metric: "100%",
    label: "Hypoallergenic"
  },
  {
    title: "Precision Engineering",
    description: "Every micron is scanned using advanced optical sensors to ensure uniform thickness and tension across thousands of meters.",
    icon: <Microscope className="w-6 h-6" />,
    color: "from-purple-500 to-indigo-400",
    metric: "0.01μm",
    label: "Tolerance"
  },
  {
    title: "Infinite Life Cycle",
    description: "Engineered to withstand 5,000+ high-intensity wash cycles without losing tensile strength or structural integrity.",
    icon: <Earth className="w-6 h-6" />,
    color: "from-orange-500 to-red-400",
    metric: "5,000+",
    label: "Cycle Count"
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 sm:py-40 bg-slate-50 dark:bg-[#020617] transition-colors duration-500 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20 dark:opacity-40">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-blue/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            className="text-brand-blue font-black text-sm uppercase mb-6 block"
          >
            Engineering Excellence
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl font-black text-brand-dark dark:text-white leading-[0.9] tracking-tighter mb-8"
          >
            THE SCIENCE OF <br />
            <span className="text-stroke-dark dark:text-stroke opacity-30">ELΛSTICITY.</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            className="h-1.5 bg-brand-blue mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-6">
            {benefits.slice(0, 2).map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index} />
            ))}
          </div>

          {/* Center Column - Visual Hub */}
          <div className="lg:col-span-4 flex justify-center py-12 lg:py-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[1px] border-dashed border-brand-blue/30 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border-[1px] border-brand-blue/20 rounded-full"
              />
              <div className="absolute inset-6 rounded-full glass border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                <div className="text-center">
                  <div className="text-4xl font-black text-brand-blue mb-1">CORE</div>
                  <div className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50 dark:text-white">Technology</div>
                </div>
                {/* Floating particles or inner decorative svgs could go here */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-transparent pointer-events-none" />
              </div>
              
              {/* Orbitting nodes */}
              {[0, 90, 180, 270].map((angle, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 10 + i, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 w-full h-full -ml-[50%] -mt-[50%]"
                >
                  <div className="absolute top-0 left-1/2 -ml-2 w-4 h-4 rounded-full bg-brand-blue shadow-[0_0_10px_#007bff]" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            {benefits.slice(2, 4).map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index + 2} />
            ))}
          </div>
        </div>
        
        {/* Enhanced Trusted By Banner */}
        <div className="mt-32 pt-16 border-t border-slate-200 dark:border-white/5 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/20">Strategic Partners</span>
          </div>

          <div className="relative overflow-hidden group">
            {/* Gradient Mask for fading out edges */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-slate-50 via-transparent to-slate-50 dark:from-[#020617] dark:to-[#020617]" />
            
            <div className="flex w-fit animate-marquee hover:[animation-play-state:paused]">
              <div className="flex items-center gap-12 sm:gap-24 px-12">
                <BrandLogo brand="NIKE" type="Sport Performance" />
                <BrandLogo brand="ADIDAS" type="Material Lab" />
                <BrandLogo brand="NASA" type="Aerospace Grade" />
                <BrandLogo brand="SPACEX" type="Tactical Systems" />
                <BrandLogo brand="TESLA" type="Energy Fibers" />
              </div>
              <div className="flex items-center gap-12 sm:gap-24 px-12">
                <BrandLogo brand="NIKE" type="Sport Performance" />
                <BrandLogo brand="ADIDAS" type="Material Lab" />
                <BrandLogo brand="NASA" type="Aerospace Grade" />
                <BrandLogo brand="SPACEX" type="Tactical Systems" />
                <BrandLogo brand="TESLA" type="Energy Fibers" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandLogo({ brand, type }: { brand: string, type: string }) {
  return (
    <div className="group/brand relative py-4">
      <div className="flex flex-col items-center">
        <span className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-300 dark:text-slate-800 group-hover/brand:text-brand-blue transition-all duration-500 cursor-default">
          {brand}
        </span>
        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 opacity-0 group-hover/brand:opacity-100 transition-all duration-500 translate-y-2 group-hover/brand:translate-y-0">
          {type}
        </span>
      </div>
      
      {/* Decorative scanline effect on hover */}
      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-blue group-hover/brand:w-full transition-all duration-700" />
    </div>
  );
}

function BenefitCard({ benefit, index }: { 
  key?: string | number;
  benefit: {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    metric: string;
    label: string;
  }; 
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index < 2 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative p-8 rounded-[2rem] bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 hover:border-brand-blue/40 transition-all duration-500 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${benefit.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
      
      <div className="flex items-start gap-6">
        <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white shadow-lg`}>
          {benefit.icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-brand-dark dark:text-white mb-2 tracking-tight">
            {benefit.title}
          </h3>
          <p className="text-brand-slate dark:text-slate-400 text-sm leading-relaxed mb-6 group-hover:text-brand-dark dark:group-hover:text-white transition-colors">
            {benefit.description}
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className={`text-xl font-black bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                {benefit.metric}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 dark:text-white">
                {benefit.label}
              </span>
            </div>
            
            <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10" />
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              className="flex-1 h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden"
            >
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "70%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-full bg-gradient-to-r ${benefit.color}`}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
