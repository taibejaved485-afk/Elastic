import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, Twitter, Linkedin, Github, Instagram, ArrowRight, Loader2, MapPin } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after a few seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="section-padding bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50"
        >
          <div className="grid lg:grid-cols-2">
            {/* Left Column: Get in Touch */}
            <div className="bg-brand-dark p-12 lg:p-20 text-white flex flex-col justify-between relative overflow-hidden">
              {/* Background gradient for left side */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-blue/20 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-brand-blue font-bold tracking-widest uppercase text-xs mb-6 block"
                >
                  Contact Us
                </motion.span>
                <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-[1.1] tracking-tighter">
                  GET IN <br />
                  <span className="text-brand-blue italic">TOUCH.</span>
                </h2>
                <p className="text-slate-400 text-lg mb-12 max-w-md font-light leading-relaxed">
                  Have a custom project or need technical specifications? Our team of material engineers is ready to help you stretch the possibilities.
                </p>
                
                <div className="space-y-10">
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-6 group cursor-pointer"
                  >
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-blue group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300">
                      <Mail size={24} className="text-brand-blue group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Send an Email</p>
                      <p className="text-xl font-medium group-hover:text-brand-blue transition-colors">inquiry@elastic.tech</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-6 group cursor-pointer"
                  >
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-blue group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300">
                      <MapPin size={24} className="text-brand-blue group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Our Headquarters</p>
                      <p className="text-xl font-medium group-hover:text-brand-blue transition-colors">Industrial Zone 7, Tech Park</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="mt-16 flex items-center gap-8 text-white/30 relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Follow Us</p>
                <div className="h-[1px] flex-grow bg-white/10" />
                <div className="flex gap-4">
                  {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                    <motion.a 
                      key={i} 
                      href="#" 
                      whileHover={{ y: -3, color: "#2563eb" }}
                      className="transition-colors"
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="p-12 lg:p-20 bg-white/50 backdrop-blur-md">
              <form className="space-y-10" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      id="name"
                      className="form-input !px-0"
                      placeholder=" "
                      required
                      disabled={isSubmitting}
                    />
                    <label htmlFor="name" className="form-label !left-0">What's your name?</label>
                  </div>
                  <div className="form-group mb-0">
                    <input
                      type="email"
                      id="email"
                      className="form-input !px-0"
                      placeholder=" "
                      required
                      disabled={isSubmitting}
                    />
                    <label htmlFor="email" className="form-label !left-0">Email address</label>
                  </div>
                </div>

                <div className="form-group mb-0">
                  <input
                    type="text"
                    id="subject"
                    className="form-input !px-0"
                    placeholder=" "
                    required
                    disabled={isSubmitting}
                  />
                  <label htmlFor="subject" className="form-label !left-0">Subject of inquiry</label>
                </div>

                <div className="form-group mb-0">
                  <textarea
                    id="message"
                    rows={4}
                    className="form-input !px-0 resize-none"
                    placeholder=" "
                    required
                    disabled={isSubmitting}
                  ></textarea>
                  <label htmlFor="message" className="form-label !left-0">Tell us about your project...</label>
                </div>

                <motion.button 
                  type="submit" 
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-sm flex items-center justify-center transition-all duration-500 overflow-hidden group
                    ${isSubmitted ? 'bg-green-500 text-white shadow-green-200 shadow-xl' : 'bg-gradient-to-r from-brand-blue to-blue-700 text-white shadow-xl shadow-brand-blue/30'}
                    ${isSubmitting ? 'opacity-80' : ''}
                  `}
                >
                  {/* Subtle Ripple/Glow Effect */}
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  
                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin text-white" />
                        Processing
                      </>
                    ) : isSubmitted ? (
                      <>
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center"
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 6L5 9L10 3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.div>
                        Message Sent
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
