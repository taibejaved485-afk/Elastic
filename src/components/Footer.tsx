import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram, Send, ArrowRight, X } from "lucide-react";

export default function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const modalContent: Record<string, { title: string; content: string }> = {
    privacy: {
      title: "Privacy Policy",
      content: `At ELΛSTIC, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
      
      1. Information Collection: We collect information you provide directly to us, such as when you sign up for our newsletter or contact us for inquiries.
      2. Data Usage: Your data is used to improve our services, communicate updates, and ensure a personalized experience for our industrial partners.
      3. Global Security: We implement enterprise-grade security measures to protect your data from unauthorized access or disclosure.
      4. Your Rights: You have the right to access, update, or delete your personal information at any time. Contact our data protection officer for assistance.`
    },
    terms: {
      title: "Terms & Conditions",
      content: `By accessing the ELΛSTIC platform, you agree to comply with and be bound by the following terms of use.
      
      1. Intellectual Property: All materials, designs, and proprietary technologies displayed on this site are the exclusive property of ELΛSTIC.
      2. Usage Limitations: Users are prohibited from reverse-engineering our material specifications or using our branding for unauthorized purposes.
      3. Liability: ELΛSTIC is not liable for any consequential damages arising from the use or inability to use our premium materials outside of specified industrial parameters.
      4. Governing Law: These terms are governed by the international trade laws of the jurisdiction in which our headquarters is located.`
    },
    cookies: {
      title: "Cookie Settings",
      content: `ELΛSTIC uses cookies to enhance your browsing experience and analyze site traffic.
      
      1. Essential Cookies: Necessary for the technical operation of our secure portals.
      2. Analytical Cookies: Help us understand how industrial partners interact with our material specifications.
      3. Personalization: Allow us to remember your preferences for a more efficient technical workflow.
      4. Management: You can adjust your cookie preferences through your browser settings, though some enterprise features may be limited.`
    },
    "industrial-webbing": {
      title: "Industrial Webbing",
      content: `Our heavy-duty industrial webbing is engineered for the most demanding environments.
      
      • Load Bearing: Tested for up to 50,000 Newtons of tensile force.
      • Durability: UV-resistant and chemical-resistant coatings available.
      • Applications: Safety harnesses, heavy cargo lifting, and extreme sports equipment.
      • Customization: Available in width ranges from 10mm to 300mm with variable elasticity profiles.`
    },
    "medical-grade": {
      title: "Medical Grade Elastics",
      content: `Precision-engineered textiles designed for healthcare and rehabilitation.
      
      • Hypoallergenic: LATEX-FREE compositions that are gentle on skin.
      • Breathability: Enhanced airflow technology for long-term wearable comfort.
      • Support: Calibrated compression levels for post-operative recovery.
      • Certification: Fully compliant with international medical textile safety standards.`
    },
    "textile-elastic": {
      title: "Premium Textile Elastic",
      content: `Excellence in high-end apparel and fashion industry elastic solutions.
      
      • Finish: Soft-touch silk finishes for premium close-to-skin contact.
      • Longevity: Guaranteed recovery performance even after 500+ industrial wash cycles.
      • Designs: Available in jacquard weaves, silicone-coated, and ultra-thin profiles.
      • Aesthetic: Color-matching service available for luxury brand requirements.`
    },
    "athletic-support": {
      title: "High-Performance Athletic Support",
      content: `The ultimate choice for professional athletes and extreme performance gear.
      
      • Compression: Dynamic zonal compression that moves with the athlete.
      • Moisture Management: Advanced wicking fibers embedded in the elastic matrix.
      • Resistance: Durable against sweat, salt, and chlorine.
      • Innovation: Integrated smart-fiber ready weaves for biometric sensors.`
    },
    "our-story": {
      title: "Our Story",
      content: `Founded in 1994, ELΛSTIC began with a single mission: to redefine the structural possibilities of flexible materials.
      
      What started as a small laboratory project has evolved into a global powerhouse in material science. We don't just manufacture elastic; we engineer the fibers that hold the industries of tomorrow together. From aerospace applications to high-fashion runways, our mark is everywhere.`
    },
    "quality-control": {
      title: "Quality Control",
      content: `Zero compromise. Our multi-stage testing protocol ensures every centimeter of ELΛSTIC product meets our rigid performance criteria.
      
      • Tensile Testing: Automated stress testing to failure.
      • Longevity Simulation: Accelerated aging chambers mimicking 10 years of use.
      • Chemical Analysis: Fiber purity checks and non-toxic verification.
      • Individual Batch Tracking: Full traceability from raw fiber to final weave.`
    },
    "sustainability": {
      title: "Sustainability Commitment",
      content: `At ELΛSTIC, our stretch doesn't come at the Earth's expense.
      
      • Bio-Based Polymers: Increasing use of plant-derived raw materials.
      • Circular Economy: We offer a material reclamation program for our industrial partners.
      • Energy Efficiency: Our manufacturing facilities are powered by 85% renewable energy.
      • Waste Reduction: Precision computer-aided weaving that reduces off-cut waste by 95%.`
    },
    "careers": {
      title: "Join the Team",
      content: `We are looking for the brightest minds in material science, engineering, and global logistics.
      
      At ELΛSTIC, you'll work at the intersection of technology and craftsmanship. We provide an environment where innovation is the default setting. 
      
      Current Openings:
      • Senior Material Scientist (Polymer Specialists)
      • Industrial Automation Engineer
      • Global Sustainability Lead
      • Precision Weaving Technician`
    }
  };

  return (
    <footer className="bg-[#020617] text-white pt-24 sm:pt-40 pb-12 px-6 sm:px-12 lg:px-16 xl:px-24 overflow-hidden relative">
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md cursor-default"
            onClick={() => setActiveModal(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-white/10 p-6 sm:p-10 rounded-[2.5rem] max-w-2xl w-full relative shadow-2xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-white transition-colors p-3 bg-white/5 rounded-full"
              >
                <X size={20} />
              </button>
              <div className="w-12 h-1 bg-brand-blue/30 rounded-full mb-8 mx-auto sm:ml-0" />
              <h3 className="text-2xl sm:text-3xl font-black italic tracking-tighter uppercase mb-6 text-white pr-8">
                {modalContent[activeModal].title}
              </h3>
              <div className="text-slate-400 leading-relaxed space-y-4 font-light whitespace-pre-line text-base">
                {modalContent[activeModal].content}
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="mt-10 w-full sm:w-auto px-10 py-4 bg-brand-blue rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-brand-blue/20"
              >
                Accept & Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-brand-blue/10 rounded-full blur-[140px] opacity-40" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -45, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] bg-indigo-500/5 rounded-full blur-[120px] opacity-20" 
        />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />
      </div>
      
      <div className="w-full relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          
          {/* Brand Card */}
          <div className="lg:col-span-5 p-8 sm:p-12 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 rounded-full blur-[60px] transform translate-x-10 -translate-y-10 group-hover:bg-brand-blue/30 transition-colors" />
            
            <a href="#home" className="flex items-center gap-4 mb-10 group/logo">
              <div className="w-14 h-14 bg-brand-blue rounded-2xl flex items-center justify-center transform -skew-x-12 shadow-2xl shadow-brand-blue/30 transition-all group-hover/logo:scale-110 group-hover/logo:rotate-3">
                <div className="w-5 h-5 bg-white rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-black uppercase tracking-[0.4em] text-2xl leading-none">ELΛSTIC</span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-blue/70 mt-1">Premium Industrial Solutions</span>
              </div>
            </a>
            
            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-12 max-w-md font-light italic">
              "We don't just manufacture elastic; we engineer the structural integrity of next-generation textiles."
            </p>
            
            <div className="flex flex-wrap gap-4">
              {[Twitter, Linkedin, Facebook, Instagram].map((Icon, idx) => (
                <motion.a 
                  key={idx} 
                  href="#" 
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-blue hover:bg-brand-blue shadow-lg transition-all"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Bento Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col">
              <h4 className="text-brand-blue font-black uppercase tracking-[0.2em] text-[11px] mb-10 flex items-center gap-3">
                <span className="w-4 h-[1px] bg-brand-blue" />
                Material Expertise
              </h4>
              <ul className="space-y-6 text-slate-400 font-bold text-xs uppercase tracking-widest flex-1">
                {[
                  { name: "Industrial Webbing", id: "industrial-webbing" },
                  { name: "Medical Grade", id: "medical-grade" },
                  { name: "Textile Elastic", id: "textile-elastic" },
                  { name: "Athletic Support", id: "athletic-support" }
                ].map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => setActiveModal(item.id)}
                      className="hover:text-white transition-all flex items-center group text-left"
                    >
                      <span className="w-0 group-hover:w-6 h-[1px] bg-brand-blue mr-0 group-hover:mr-2 transition-all duration-300" />
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col">
              <h4 className="text-brand-blue font-black uppercase tracking-[0.2em] text-[11px] mb-10 flex items-center gap-3">
                <span className="w-4 h-[1px] bg-brand-blue" />
                Ecosystem
              </h4>
              <ul className="space-y-6 text-slate-400 font-bold text-xs uppercase tracking-widest flex-1">
                {[
                  { name: "Our Story", id: "our-story" },
                  { name: "Quality Control", id: "quality-control" },
                  { name: "Sustainability", id: "sustainability" },
                  { name: "Global Careers", id: "careers" }
                ].map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => setActiveModal(item.id)}
                      className="hover:text-white transition-all flex items-center group text-left"
                    >
                      <span className="w-0 group-hover:w-6 h-[1px] bg-brand-blue mr-0 group-hover:mr-2 transition-all duration-300" />
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Combined Contact & Newsletter Row */}
            <div className="sm:col-span-2 p-8 sm:p-10 rounded-[2.5rem] bg-brand-blue/5 border border-brand-blue/10 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 w-full text-center md:text-left">
                <h4 className="text-white text-xl font-black tracking-tighter uppercase mb-2">Join the Future</h4>
                <p className="text-slate-400 text-sm font-light">Get early access to material science breakthroughs.</p>
              </div>
              <form className="relative w-full md:w-auto md:min-w-[400px] group" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="name@enterprise.com" 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-5 sm:py-6 px-8 text-sm focus:outline-none focus:border-brand-blue focus:bg-slate-900 transition-all backdrop-blur-xl pr-20 placeholder:text-slate-600"
                />
                <motion.button 
                  type="submit" 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-2 top-2 bottom-2 aspect-square bg-brand-blue rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-brand-blue/30 transition-all"
                >
                  <Send size={20} className="text-white" />
                </motion.button>
              </form>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: MapPin, text: "Industrial Zone 7, Tech Park City", label: "Global HQ" },
            { icon: Mail, text: "inquiry@elastic-premium.com", label: "Business Inquiry" },
            { icon: Phone, text: "+1 (800) STRETCH-01", label: "Direct Support" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }} 
              className="flex items-center gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <item.icon size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-brand-blue text-[9px] font-black uppercase tracking-[0.2em] mb-1">{item.label}</span>
                <span className="text-slate-300 text-sm font-medium">{item.text}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} EΛSTIC Premium Materials.
            </p>
            <div className="flex gap-8 text-slate-600 text-[9px] font-black uppercase tracking-widest">
              <button onClick={() => setActiveModal('privacy')} className="hover:text-brand-blue transition-colors">Privacy</button>
              <button onClick={() => setActiveModal('terms')} className="hover:text-brand-blue transition-colors">Terms</button>
              <button onClick={() => setActiveModal('cookies')} className="hover:text-brand-blue transition-colors">Cookies</button>
            </div>
          </div>

          <div className="flex items-center gap-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {/* Mock Global Partners */}
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400">Global Standards: ISO 9001 • REACH • OEKO-TEX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
