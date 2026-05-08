import React from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const bgX = useTransform(mouseX, [-500, 500], [30, -30]);
  const bgY = useTransform(mouseY, [-500, 500], [30, -30]);
  
  const floatX = useTransform(mouseX, [-500, 500], [-50, 50]);
  const floatY = useTransform(mouseY, [-500, 500], [-50, 50]);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });
  const springBgX = useSpring(bgX, { stiffness: 50, damping: 20 });
  const springBgY = useSpring(bgY, { stiffness: 50, damping: 20 });
  const springFloatX = useSpring(floatX, { stiffness: 50, damping: 20 });
  const springFloatY = useSpring(floatY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center relative overflow-hidden hero-gradient pt-20"
    >
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.07] mix-blend-overlay grayscale scale-110"
          style={{ backgroundImage: `url('https://i.pinimg.com/736x/2e/a2/70/2ea270d4f6899783b9ebe70d5ca4c9dd.jpg')`, x: springBgX, y: springBgY }}
        />
        <motion.div 
          style={{ x: springFloatX, y: springFloatY }}
          className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blue/20 via-transparent to-transparent blur-3xl animate-pulse" 
        />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        
        {/* Floating Decorative Elements */}
        <motion.div 
          style={{ x: springFloatX, y: springFloatY, rotate: 15 }}
          className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/5 rounded-full blur-[2px]"
        />
        <motion.div 
          style={{ x: springBgX, y: springBgY, rotate: -15 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-brand-blue/10 rounded-full blur-[1px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          {/* Content Side */}
          <div className="lg:col-span-7 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-brand-blue/10 border border-brand-blue/20 backdrop-blur-md mb-8">
                <Sparkles size={14} className="text-brand-blue" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue">Premium Latex & Polymer Elastic</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black text-white leading-[0.85] tracking-tighter mb-8 max-w-4xl">
                ENGINEERED <br />
                <motion.span 
                  animate={{ 
                    scale: [1, 1.02, 1],
                    textShadow: [
                      "0 0 10px rgba(37, 99, 235, 0.2)",
                      "0 0 30px rgba(37, 99, 235, 0.5)",
                      "0 0 10px rgba(37, 99, 235, 0.2)"
                    ]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="text-stroke neon-glow italic inline-block"
                >
                  STRETCH
                </motion.span>
              </h1>
              
              <p className="max-w-xl text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed font-light">
                The world's most resilient elastic materials. Designed for <span className="text-white font-semibold">high-performance</span> textiles, medical precision, and industrial durability.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary w-full sm:w-auto px-12 py-6 text-sm uppercase tracking-[0.2em] flex items-center justify-center group relative overflow-hidden"
                >
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ 
                      scale: [1, 2],
                      opacity: [0.4, 0],
                    }}
                    transition={{ 
                      duration: 1.2, 
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                    className="absolute inset-0 bg-white/30 rounded-full"
                  />
                  <span className="relative z-10 flex items-center">
                    Explore Products <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </span>
                </motion.button>
                <div className="flex items-center gap-4 text-white/40 text-xs font-bold uppercase tracking-widest pl-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-slate-800" />
                    ))}
                  </div>
                  <span>Trusted by 2k+ Teams</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* High-End Visual Side */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square"
            >
              {/* Hero Image Container */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl rounded-[4rem] border border-white/20 shadow-2xl overflow-hidden group/img"
                style={{ transform: "translateZ(50px)" }}
              >
                <img 
                  src="https://i.pinimg.com/736x/2e/a2/70/2ea270d4f6899783b9ebe70d5ca4c9dd.jpg"
                  alt="ELΛSTIC high-performance industrial textile weave"
                  className="w-full h-full object-cover opacity-60 group-hover/img:scale-110 group-hover/img:opacity-80 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Decorative rings around the visual */}
              <div className="absolute -inset-10 border border-white/5 rounded-full scale-[1.1] opacity-50" />
              <div className="absolute -inset-20 border border-brand-blue/10 rounded-full scale-[1.2] opacity-30" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ticker for "High End" feel */}
      <div className="absolute bottom-0 left-0 w-full bg-white/5 backdrop-blur-md border-t border-white/10 py-6 overflow-hidden">
        <div className="flex animate-marquee space-x-12 whitespace-nowrap px-12">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-white/20 font-black text-2xl uppercase tracking-tighter">PREMIUM WEBBING</span>
              <span className="text-brand-blue">/</span>
              <span className="text-white/20 font-black text-2xl uppercase tracking-tighter">50M+ METERS SHIPPED</span>
              <span className="text-brand-blue">/</span>
              <span className="text-white/20 font-black text-2xl uppercase tracking-tighter">TEXTILE GRADE</span>
              <span className="text-brand-blue">/</span>
              <span className="text-white/20 font-black text-2xl uppercase tracking-tighter">INDUSTRIAL STRENGTH</span>
              <span className="text-brand-blue">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
