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
    <footer className="bg-[#020617] text-white pt-32 pb-12 px-6 overflow-hidden relative">
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm cursor-default"
            onClick={() => setActiveModal(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-white/10 p-10 rounded-3xl max-w-2xl w-full relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-6 text-brand-blue">
                {modalContent[activeModal].title}
              </h3>
              <div className="text-slate-400 leading-relaxed space-y-4 font-light whitespace-pre-line">
                {modalContent[activeModal].content}
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="mt-10 px-8 py-3 bg-brand-blue rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blue-700 transition-colors"
              >
                Accept & Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              {[
                { name: "Industrial Webbing", id: "industrial-webbing" },
                { name: "Medical Grade", id: "medical-grade" },
                { name: "Textile Elastic", id: "textile-elastic" },
                { name: "Athletic Support", id: "athletic-support" }
              ].map((item) => (
                <li key={item.id}>
                   <button 
                    onClick={() => setActiveModal(item.id)}
                    className="hover:text-brand-blue transition-colors flex items-center group text-left"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-10 opacity-50">Company</h4>
            <ul className="space-y-5 text-slate-400 font-medium text-sm">
              {[
                { name: "Our Story", id: "our-story" },
                { name: "Quality Control", id: "quality-control" },
                { name: "Sustainability", id: "sustainability" },
                { name: "Careers", id: "careers" }
              ].map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => setActiveModal(item.id)}
                    className="hover:text-brand-blue transition-colors flex items-center group text-left"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item.name}
                  </button>
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
            <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors">Terms & Conditions</button>
            <button onClick={() => setActiveModal('cookies')} className="hover:text-white transition-colors">Cookie Settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
