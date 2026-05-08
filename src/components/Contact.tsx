import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, Twitter, Linkedin, Github, Instagram, ArrowRight, Loader2, MapPin, AlertCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email address is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email address";
        return "";
      case "subject":
        if (!value.trim()) return "Subject is required";
        return "";
      case "message":
        if (!value.trim()) return "Message cannot be empty";
        if (value.trim().length < 10) return "Message must be at least 10 characters long";
        return "";
      default:
        return "";
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id } = e.target;
    setTouched(prev => ({ ...prev, [id]: true }));
    const error = validateField(id, formData[id as keyof FormData]);
    setErrors(prev => ({ ...prev, [id]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Validate in real-time if the field has been touched
    if (touched[id]) {
      const error = validateField(id, value);
      setErrors(prev => ({ ...prev, [id]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    let hasErrors = false;
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

    if (hasErrors) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTouched({});
    setErrors({});
    
    // Reset after a few seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const ErrorMessage = ({ error, field }: { error?: string; field: string }) => (
    <AnimatePresence>
      {error && touched[field] && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -5 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -5 }}
          className="flex items-center gap-1.5 mt-2 text-red-500 overflow-hidden"
        >
          <AlertCircle size={14} className="flex-shrink-0" />
          <span className="text-[11px] font-bold uppercase tracking-wider">{error}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section id="contact" className="py-12 sm:py-24 px-4 sm:px-12 lg:px-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl lg:rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none"
        >
          <div className="grid lg:grid-cols-2">
            {/* Left Column: Get in Touch */}
            <div className="bg-brand-dark dark:bg-[#020617] p-6 sm:p-12 lg:p-20 text-white flex flex-col justify-between relative overflow-hidden transition-colors duration-300">
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
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-[1.1] tracking-tighter">
                  GET IN <br className="hidden sm:block" />
                  <span className="text-brand-blue italic ml-2 sm:ml-0">TOUCH.</span>
                </h2>
                <p className="text-slate-400 text-base sm:text-lg mb-10 sm:mb-12 max-w-md font-light leading-relaxed">
                  Have a custom project or need technical specifications? Our team of material engineers is ready to help you stretch the possibilities.
                </p>
                
                <div className="space-y-6 sm:space-y-10">
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 sm:gap-6 group cursor-pointer"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-blue group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300">
                      <Mail size={24} className="text-brand-blue group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Send an Email</p>
                      <p className="text-xl font-medium group-hover:text-brand-blue transition-colors text-base sm:text-xl">inquiry@elastic.tech</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 sm:gap-6 group cursor-pointer"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-blue group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300">
                      <MapPin size={24} className="text-brand-blue group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Our Headquarters</p>
                      <p className="text-xl font-medium group-hover:text-brand-blue transition-colors text-base sm:text-xl">Industrial Zone 7, Tech Park</p>
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
            <div className="p-6 sm:p-12 lg:p-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md transition-colors duration-300 border-t lg:border-t-0 lg:border-l border-white/10">
              <form className="space-y-8 sm:space-y-10" onSubmit={handleSubmit} noValidate>
                <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-input !px-2 ${errors.name && touched.name ? '!border-red-500' : ''}`}
                      placeholder=" "
                      required
                      disabled={isSubmitting}
                    />
                    <label htmlFor="name" className={`form-label !left-2 ${errors.name && touched.name ? '!text-red-500' : ''}`}>What's your name?</label>
                    <ErrorMessage error={errors.name} field="name" />
                  </div>
                  <div className="form-group mb-0">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-input !px-2 ${errors.email && touched.email ? '!border-red-500' : ''}`}
                      placeholder=" "
                      required
                      disabled={isSubmitting}
                    />
                    <label htmlFor="email" className={`form-label !left-2 ${errors.email && touched.email ? '!text-red-500' : ''}`}>Email address</label>
                    <ErrorMessage error={errors.email} field="email" />
                  </div>
                </div>

                <div className="form-group mb-0">
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input !px-2 ${errors.subject && touched.subject ? '!border-red-500' : ''}`}
                    placeholder=" "
                    required
                    disabled={isSubmitting}
                  />
                  <label htmlFor="subject" className={`form-label !left-2 ${errors.subject && touched.subject ? '!text-red-500' : ''}`}>Subject of inquiry</label>
                  <ErrorMessage error={errors.subject} field="subject" />
                </div>

                <div className="form-group mb-0">
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input !px-2 resize-none ${errors.message && touched.message ? '!border-red-500' : ''}`}
                    placeholder=" "
                    required
                    disabled={isSubmitting}
                  ></textarea>
                  <label htmlFor="message" className={`form-label !left-2 ${errors.message && touched.message ? '!text-red-500' : ''}`}>Tell us about your project...</label>
                  <ErrorMessage error={errors.message} field="message" />
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
