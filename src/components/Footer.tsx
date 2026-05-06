import { motion } from "motion/react";
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram, Send, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#020617] text-white pt-32 pb-12 px-6 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-brand-blue/5 rounded-full blur-[120px] liquid-shape opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-[30vw] h-[30vw] bg-blue-500/5 rounded-full blur-[100px] liquid-shape opacity-30" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <motion.a 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              href="#home" 
              className="text-2xl font-black italic tracking-tighter flex items-center gap-3 mb-10 group"
            >
              <div className="w-12 h-12 bg-brand-blue rounded-2xl flex items-center justify-center transform -skew-x-12 shadow-xl shadow-brand-blue/20 transition-transform group-hover:scale-110">
                <div className="w-5 h-5 bg-white rounded-full animate-pulse" />
              </div>
              <span className="font-display uppercase tracking-[0.3em] text-2xl">ELΛSTIC</span>
            </motion.a>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-sm font-light">
              We set the global benchmark for high-performance elastic materials. Engineered for extreme durability, trusted by world-class industries.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Facebook, Instagram].map((Icon, idx) => (
                <motion.a 
                  key={idx} 
                  href="#" 
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-blue hover:bg-brand-blue/20 transition-all shadow-sm"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-10 opacity-50">Products</h4>
            <ul className="space-y-5 text-slate-400 font-medium text-sm">
              {["Industrial Webbing", "Medical Grade", "Textile Elastic", "Athletic Support"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-brand-blue transition-colors flex items-center group">
                    <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-10 opacity-50">Company</h4>
            <ul className="space-y-5 text-slate-400 font-medium text-sm">
              {["Our Story", "Quality Control", "Sustainability", "Careers"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-brand-blue transition-colors flex items-center group">
                    <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-10 opacity-50">Join the Innovation</h4>
            <p className="text-slate-400 text-sm mb-8 font-light">Join 10k+ professionals receiving updates on new materials and industry insights.</p>
            <form className="relative group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm focus:outline-none focus:border-brand-blue/50 focus:bg-white/10 transition-all backdrop-blur-md"
              />
              <motion.button 
                type="submit" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2.5 top-2.5 p-3 bg-brand-blue rounded-xl hover:shadow-lg hover:shadow-brand-blue/30 transition-all"
              >
                <Send size={18} className="text-white" />
              </motion.button>
            </form>
          </div>
        </div>

        {/* Info Bars */}
        <div className="grid md:grid-cols-3 gap-12 py-12 border-y border-white/5 mb-12 text-slate-400 text-sm font-medium">
          <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 group cursor-default">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-blue/10 transition-colors">
              <MapPin size={18} className="text-brand-blue" />
            </div>
            <span className="group-hover:text-white transition-colors">Industrial Zone 7, Tech Park City</span>
          </motion.div>
          <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 group cursor-default">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-blue/10 transition-colors">
              <Mail size={18} className="text-brand-blue" />
            </div>
            <span className="group-hover:text-white transition-colors">inquiry@elastic-premium.com</span>
          </motion.div>
          <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 group cursor-default">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-blue/10 transition-colors">
              <Phone size={18} className="text-brand-blue" />
            </div>
            <span className="group-hover:text-white transition-colors">+1 (800) STRETCH-01</span>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} EΛSTIC Premium Materials. Pure Innovation.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
