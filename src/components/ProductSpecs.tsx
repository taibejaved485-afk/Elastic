import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  Settings2, 
  Ruler, 
  Palette, 
  Baby, 
  Activity, 
  ChevronRight,
  MessageSquare
} from "lucide-react";

const COLORS = [
  { name: "White", class: "bg-white border-slate-200", label: "Standard White", urdu: "سفید" },
  { name: "Black", class: "bg-slate-950 border-slate-800", label: "Industrial Black", urdu: "کالا" }
];

const SIZES = [
  { width: "1.0 cm", app: "Lightweight garments, masks, and inner linings", scale: 10 },
  { width: "2.0 cm", app: "Kids' wear and light waistbands", scale: 20 },
  { width: "2.5 cm", app: "Standard kids' apparel and sportswear", scale: 25 },
  { width: "3.0 cm", app: "Trousers, trackpants, and activewear", scale: 30 },
  { width: "3.5 cm", app: "Premium sweatpants and shorts", scale: 35 },
  { width: "4.0 cm", app: "Heavy-duty waistbands and casual wear", scale: 40 },
  { width: "4.5 cm", app: "Industrial and specialized apparel", scale: 45 },
  { width: "5.0 cm", app: "Premium boxer briefs and jacket hems", scale: 50 },
  { width: "5.5 cm", app: "Tactical gear and heavy-duty garments", scale: 55 },
  { width: "6.0 cm", app: "Maximum support belts and industrial textiles", scale: 60 },
];

const TABS = [
  { id: "dimensions", label: "Sizes & Colors", icon: Ruler },
  { id: "technical", label: "Technical Core", icon: Settings2 },
  { id: "custom", label: "Custom Orders", icon: MessageSquare },
];

export default function ProductSpecs() {
  const [activeTab, setActiveTab] = useState("dimensions");
  const [selectedWidth, setSelectedWidth] = useState(SIZES[3]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  return (
    <section id="specs" className="py-24 bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
            >
              <Activity size={12} />
              Product Catalogue 2024
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]"
            >
              ENGINEERED <br />
              <span className="text-brand-blue italic">SPECIFICATIONS.</span>
            </motion.h2>
            <p className="mt-4 text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs">
              پراڈکٹ کی تفصیلات اور چوڑائی (سائز) کی معلومات
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center sm:justify-start bg-slate-200/50 dark:bg-white/5 px-1 sm:px-2 rounded-2xl backdrop-blur-xl border border-white/20 overflow-x-auto no-scrollbar max-w-full mx-auto lg:mx-0">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center justify-center gap-2 px-5 sm:px-6 py-4 sm:py-5 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                    isActive 
                      ? "text-brand-blue" 
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon size={18} className="sm:size-[14px]" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {isActive && (
                    <>
                      {/* Subtle Glow */}
                      <motion.div 
                        layoutId="activeTabSpecGlow"
                        className="absolute inset-x-1 inset-y-1 bg-brand-blue/10 rounded-xl -z-10"
                      />
                      {/* Prominent Underline */}
                      <motion.div 
                        layoutId="activeTabSpecLine"
                        className="absolute bottom-0 left-2 right-2 sm:left-6 sm:right-6 h-1 bg-brand-blue rounded-full shadow-[0_0_12px_rgba(37,99,235,0.6)]"
                      />
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Visual/Detail Panel */}
          <div className="lg:col-span-12">
            <AnimatePresence mode="wait">
              {activeTab === "dimensions" && (
                <motion.div
                  key="dimensions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid md:grid-cols-2 gap-12"
                >
                  {/* Left: Interactive Selectors */}
                  <div className="space-y-12">
                    {/* Color Section */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 flex items-center gap-2">
                          <Palette size={16} /> 01. Color Variants
                        </h4>
                        <div className="text-right">
                          <motion.div 
                            key={selectedColor.name}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-end"
                          >
                            <span className="text-xl font-black text-brand-blue uppercase tracking-tighter">{selectedColor.name}</span>
                            <span className="text-[10px] font-medium text-slate-400 font-urdu">{selectedColor.urdu}</span>
                          </motion.div>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        {COLORS.map((color) => {
                          const isSelected = selectedColor.name === color.name;
                          return (
                            <button 
                              key={color.name} 
                              onClick={() => setSelectedColor(color)}
                              onMouseEnter={() => setHoveredColor(color.name)}
                              onMouseLeave={() => setHoveredColor(null)}
                              className="group relative flex flex-col items-center"
                            >
                              {/* Tooltip */}
                              <AnimatePresence>
                                {hoveredColor === color.name && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute -top-14 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900 dark:bg-brand-blue text-white rounded-xl shadow-2xl pointer-events-none z-50 whitespace-nowrap"
                                  >
                                    <div className="flex flex-col items-center">
                                      <span className="text-[10px] font-black uppercase tracking-widest">{color.name}</span>
                                      <span className="text-[12px] font-medium font-urdu leading-none mt-1">{color.urdu}</span>
                                    </div>
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-brand-blue rotate-45" />
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              <div className={`
                                w-20 h-20 rounded-3xl border-4 transition-all duration-500 flex items-center justify-center relative overflow-hidden
                                ${color.class} 
                                ${isSelected 
                                  ? `${color.name === 'White' 
                                      ? 'shadow-[0_0_25px_rgba(255,255,255,0.4)] border-brand-blue/50 scale-110' 
                                      : 'shadow-[0_0_25px_rgba(37,99,235,0.4)] border-brand-blue scale-110'}` 
                                  : 'border-transparent shadow-xl group-hover:scale-105 opacity-60 hover:opacity-100'}
                              `}>
                                {color.name === "Black" && <div className="absolute inset-0 bg-white/5" />}
                                {isSelected && (
                                  <motion.div 
                                    layoutId="colorSelectionDot"
                                    className={`w-2 h-2 rounded-full mix-blend-difference bg-white z-10`}
                                  />
                                )}
                              </div>
                              <p className={`mt-3 text-[10px] font-black uppercase tracking-widest transition-colors ${isSelected ? 'text-brand-blue' : 'text-slate-400'}`}>
                                {color.name}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Width Selector */}
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-6 flex items-center gap-2">
                        <Ruler size={16} /> 02. Width Selection (چوڑائی)
                      </h4>
                      
                      {/* Visual scale indicator */}
                      <div className="mb-8 p-8 rounded-3xl bg-slate-200/50 dark:bg-white/5 border border-dashed border-slate-300 dark:border-white/10 relative overflow-hidden flex flex-col items-center justify-center min-h-[160px]">
                        <div className="absolute inset-0 opacity-5 flex items-center justify-center">
                           <div className="w-full h-[1px] bg-slate-900 dark:bg-white" />
                        </div>
                        <motion.div 
                          initial={false}
                          animate={{ height: selectedWidth.scale * 2 }}
                          className="w-full max-w-[280px] bg-brand-blue rounded-lg shadow-[0_0_30px_rgba(37,99,235,0.3)] relative group/stretch"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10" />
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-brand-blue uppercase tracking-widest">Selected Gauge</div>
                        </motion.div>
                        <div className="mt-6 text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase flex items-baseline gap-2">
                          {selectedWidth.width} <span className="text-[10px] text-slate-400">Precision Cut</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
                        {SIZES.map((s) => (
                          <button
                            key={s.width}
                            onClick={() => setSelectedWidth(s)}
                            className={`py-3 rounded-xl text-[10px] font-bold border transition-all hover:scale-105 active:scale-95 ${
                              selectedWidth.width === s.width
                                ? "bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/20"
                                : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:border-brand-blue hover:bg-brand-blue/5"
                            }`}
                          >
                            {s.width.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                      
                      <motion.div 
                        key={selectedWidth.width}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mt-8 p-6 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 flex items-start gap-4"
                      >
                        <div className="mt-1 p-2 bg-brand-blue rounded-lg text-white">
                          <CheckCircle2 size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-1">Recommended Application</p>
                          <p className="text-slate-900 dark:text-white font-medium">{selectedWidth.app}</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Right: Kids' Special Section */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-500" />
                    <div className="relative h-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-10 border border-slate-300/60 dark:border-white/10 shadow-xl">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 mb-6 sm:mb-8">
                        <Baby size={28} className="sm:hidden" />
                        <Baby size={32} className="hidden sm:block" />
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black tracking-tighter mb-4 text-slate-900 dark:text-white uppercase">KIDS' SPECIAL VARIETIES</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 font-light leading-relaxed">
                        Chote bacho ke apparel aur comfortable stretch ke liye specialized options specifically designed for sensitive skin and gentle compression.
                      </p>
                      
                      <div className="space-y-4">
                        {[
                          { title: "5 Taar Elastic", label: "Ultra-soft", desc: "Infants & Toddlers", urdu: "چھوٹے بچوں کے لئے" },
                          { title: "6 Taar Elastic", label: "Standard Soft", desc: "Undergarments & Shorts", urdu: "نارمل سافٹ اسٹریچ" }
                        ].map((item) => (
                          <div key={item.title} className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-300/60 dark:border-white/10 group/baby hover:border-orange-500/30 transition-all hover:bg-orange-500/5">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">{item.title}</span>
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 uppercase tracking-tighter border border-orange-500/20">{item.label}</span>
                            </div>
                            <div className="flex justify-between items-start">
                              <p className="text-xs text-slate-500">{item.desc}</p>
                              <p className="text-[9px] font-medium text-orange-500/60 font-urdu">{item.urdu}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 pt-8 border-t border-slate-300/60 dark:border-white/10 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-600">
                        تار کے حساب سے خصوصیات
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "technical" && (
                <motion.div
                  key="technical"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid md:grid-cols-2 gap-6 sm:gap-8"
                >
                  <div className="p-6 sm:p-10 rounded-[2.5rem] glass dark:bg-white/5 border border-white/20 shadow-2xl">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue mb-6 sm:mb-8">
                      <Settings2 size={24} />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-black tracking-tighter mb-2 text-slate-900 dark:text-white uppercase">Thread Options</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue mb-4 sm:mb-6">دھاگہ کی اقسام</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 sm:mb-10 font-light leading-relaxed">
                      Optimized for texture and strength, our thread counts ensure durability across industrial and fashion applications.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {[
                        { val: "300", label: "Standard Tech", desc: "Balanced Comfort" },
                        { val: "600", label: "Premium Elite", desc: "Maximum Strength" }
                      ].map((t) => (
                        <div key={t.val} className="p-4 sm:p-6 rounded-2xl bg-brand-blue text-white shadow-xl shadow-brand-blue/20">
                          <div className="text-2xl sm:text-3xl font-black tracking-tighter mb-1">{t.val}</div>
                          <div className="text-[8px] font-black uppercase tracking-widest opacity-80 mb-2 sm:mb-4">{t.label}</div>
                          <p className="text-[10px] opacity-60 leading-tight">{t.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 sm:p-10 rounded-[2.5rem] glass bg-white dark:bg-[#050b1a] text-slate-900 dark:text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                    
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-blue/10 dark:bg-white/5 rounded-xl flex items-center justify-center text-brand-blue dark:text-white/50 mb-6 sm:mb-8">
                      <Activity size={24} />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-black tracking-tighter mb-2 uppercase">Rubber Density</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue dark:text-cyan-400 mb-4 sm:mb-6">ربڑ کی کثافت</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 sm:mb-10 font-light leading-relaxed">
                      Manufactured using high-grade formulations to ensure permanent shape retention and elastic memory.
                    </p>
                    
                    <div className="space-y-3 sm:space-y-4">
                      {[
                        { val: "38 Rubber", type: "Standard Build", strength: "High Retention" },
                        { val: "44 Rubber", type: "Heavy-Duty Build", strength: "Peak Compression" }
                      ].map((r) => (
                        <div key={r.val} className="flex justify-between items-center p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                          <div>
                            <div className="text-lg sm:text-xl font-bold uppercase tracking-tight">{r.val}</div>
                            <div className="text-[8px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500">{r.type}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-black text-brand-blue dark:text-cyan-400 uppercase tracking-widest">{r.strength}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "custom" && (
                <motion.div
                  key="custom"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative group"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-brand-blue via-cyan-500 to-indigo-500 rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000" />
                  <div className="relative glass bg-white dark:bg-slate-900 rounded-[3rem] p-6 sm:p-20 border border-white/20 shadow-2xl flex flex-col lg:flex-row items-center gap-8 sm:gap-12 overflow-hidden">
                    
                    <div className="lg:w-1/2">
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-16 h-1 w-brand-blue bg-brand-blue mb-6 sm:mb-10 rounded-full" 
                      />
                      <h3 className="text-3xl sm:text-6xl font-black text-slate-900 dark:text-white mb-6 sm:mb-8 tracking-tighter leading-tight uppercase text-center lg:text-left">
                        BESPOKE <br />
                        <span className="text-brand-blue italic">SOLUTIONS.</span>
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg mb-8 sm:mb-10 font-light leading-relaxed max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                        Beyond our standard catalogue, we specialize in high-volume custom manufacturing tailored to your exact technical requirements.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
                        <div className="text-center lg:text-left">
                          <p className="text-[9px] sm:text-[10px] font-black text-brand-blue uppercase tracking-widest mb-1 sm:mb-2">Custom Density</p>
                          <p className="text-[11px] sm:text-sm font-bold text-slate-900 dark:text-white">Variable formulations beyond 44PR</p>
                        </div>
                        <div className="text-center lg:text-left">
                          <p className="text-[9px] sm:text-[10px] font-black text-brand-blue uppercase tracking-widest mb-1 sm:mb-2">Bespoke Thickness</p>
                          <p className="text-[11px] sm:text-sm font-bold text-slate-900 dark:text-white">Precision gauges for specific textiles</p>
                        </div>
                      </div>

                      <div className="flex justify-center lg:justify-start">
                        <a 
                          href="#contact"
                          className="flex items-center justify-center gap-4 bg-brand-dark dark:bg-brand-blue text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl transition-all hover:scale-105 active:scale-95 group/btn w-full sm:w-auto"
                        >
                          Get Custom Quote
                          <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                        </a>
                      </div>
                    </div>

                    <div className="lg:w-1/2 relative w-full max-w-[300px] sm:max-w-none mx-auto">
                      <div className="w-full aspect-square bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center border border-dashed border-slate-300 dark:border-white/10 group-hover:border-brand-blue transition-colors duration-1000 p-8 sm:p-12">
                        <div className="relative w-full h-full bg-brand-blue/5 rounded-full flex items-center justify-center overflow-hidden">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 opacity-10"
                          >
                             <div className="absolute inset-0 border-[20px] border-dotted border-brand-blue rounded-full" />
                          </motion.div>
                          <div className="relative z-10 text-center">
                            <MessageSquare size={64} className="text-brand-blue mb-4 mx-auto" />
                            <p className="text-[10px] font-black text-brand-blue uppercase tracking-[0.3em]">Direct B2B Line</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
