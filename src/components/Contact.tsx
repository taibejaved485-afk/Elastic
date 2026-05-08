import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, Twitter, Linkedin, Github, Instagram, ArrowRight, Loader2, MapPin, AlertCircle, ShieldCheck, Zap } from "lucide-react";
import LottieAnimation from "./LottieAnimation";

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
    <section id="contact" className="py-24 sm:py-40 px-4 sm:px-12 lg:px-24 bg-white dark:bg-[#020617] relative overflow-hidden transition-colors duration-500">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
             style={{ 
               backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`, 
               backgroundSize: '40px 40px' 
             }} 
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-brand-blue font-black tracking-[.3em] text-xs uppercase mb-4 block"
          >
            Stay Flexible
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-black text-brand-dark dark:text-white tracking-tighter"
          >
            LET'S <span className="text-stroke-dark dark:text-stroke opacity-30 italic">STRETCH</span> IDEAS.
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group h-full"
        >
          {/* Glowing border effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-cyan-500 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative glass rounded-[3rem] overflow-hidden shadow-2xl dark:shadow-none border border-white/20 dark:border-white/5">
            <div className="grid lg:grid-cols-12 min-h-[700px]">
              {/* Left Column: Get in Touch */}
              <div className="lg:col-span-5 bg-brand-dark dark:bg-[#050b1a] p-8 sm:p-14 lg:p-20 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-blue/30 to-transparent" />
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-1 w-brand-blue bg-brand-blue mb-10 rounded-full" />
                  
                  <h3 className="text-4xl sm:text-5xl font-black mb-8 leading-tight tracking-tighter">
                    READY FOR THE <br />
                    <span className="text-brand-blue">BIG LEAP?</span>
                  </h3>
                  
                  <div className="relative w-20 h-20 mb-10 group/icon">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-brand-blue/20 blur-2xl rounded-full"
                    />
                    <div className="relative w-full h-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden backdrop-blur-sm group-hover/icon:border-brand-blue/50 transition-colors duration-500">
                      <Zap className="w-8 h-8 text-brand-blue group-hover/icon:scale-125 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/10 to-transparent" />
                    </div>
                  </div>
                  
                  <p className="text-slate-400 text-lg mb-12 max-w-sm font-light leading-relaxed">
                    Our team of material scientists and engineers is standing by to help you integrate ELΛSTIC fibers into your next generation of products.
                  </p>
                  
                  <div className="space-y-8">
                    <ContactItem 
                      Icon={Mail} 
                      label="Inquiries" 
                      value="hello@elastic.tech" 
                    />
                    <ContactItem 
                      Icon={MapPin} 
                      label="Studio" 
                      value="Innovation Hub, Silicon Valley" 
                    />
                  </div>
                </div>

                <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-between relative z-10">
                  <div className="flex gap-4">
                    {[Twitter, Linkedin, Github].map((Icon, i) => (
                      <motion.a 
                        key={i} 
                        href="#" 
                        whileHover={{ y: -5, color: "#007bff" }}
                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 transition-all border border-white/5"
                      >
                        <Icon size={18} />
                      </motion.a>
                    ))}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20">EST. 2024</div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 bg-white/80 dark:bg-slate-900/40 backdrop-blur-3xl relative">
                {/* Subtle Technical Pattern */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none" 
                     style={{ 
                       backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l15 30H15L30 0zM0 30l15 30h30L30 30 0 30z' fill='%23007bff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`, 
                       backgroundSize: '120px 120px' 
                     }} 
                />

                <form className="space-y-8 sm:space-y-10 relative z-10" onSubmit={handleSubmit} noValidate>
                  <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
                    <InputField 
                      id="name"
                      label="Your Name"
                      value={formData.name}
                      error={errors.name}
                      touched={touched.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                    />
                    <InputField 
                      id="email"
                      type="email"
                      label="Email Address"
                      value={formData.email}
                      error={errors.email}
                      touched={touched.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                    />
                  </div>

                  <InputField 
                    id="subject"
                    label="How can we help?"
                    value={formData.subject}
                    error={errors.subject}
                    touched={touched.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />

                  <div className="relative group/field">
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-transparent border-b-2 py-4 px-1 focus:outline-none transition-all duration-500 resize-none
                        ${errors.message && touched.message 
                          ? 'border-red-500/50' 
                          : 'border-slate-200 dark:border-white/10 focus:border-brand-blue'}
                      `}
                      placeholder="Your message..."
                      required
                      disabled={isSubmitting}
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue group-focus-within/field:w-full transition-all duration-700" />
                    <ErrorMessage error={errors.message} field="message" />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <motion.button 
                      type="submit" 
                      disabled={isSubmitting || isSubmitted}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex-1 py-5 rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs flex items-center justify-center transition-all duration-700 overflow-hidden
                        ${isSubmitted ? 'bg-emerald-500' : 'bg-brand-dark dark:bg-brand-blue'}
                        text-white shadow-xl shadow-brand-blue/20
                      `}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
                      
                      <span className="relative z-10 flex items-center gap-3">
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            PROCESSING
                          </>
                        ) : isSubmitted ? (
                          <>SUCCESSFUL</>
                        ) : (
                          <>
                            SEND MESSAGE
                            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                          </>
                        )}
                      </span>
                    </motion.button>
                    
                    <div className="flex -space-x-2">
                      {[
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&h=100&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop"
                      ].map((url, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700 overflow-hidden relative group/avatar">
                          <img 
                            src={url} 
                            alt="User Profile" 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/avatar:scale-125"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-[8px] text-white font-bold border-2 border-white dark:border-slate-800 relative z-10">
                        +4
                      </div>
                    </div>
                  </div>

                  {/* Anti-Empty Space Trust Section */}
                  <div className="pt-8 mt-4 border-t border-slate-100 dark:border-white/5 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 opacity-40 dark:opacity-20">
                      <ShieldCheck size={16} className="text-brand-blue" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-brand-dark dark:text-white">Encrypted Connection</span>
                    </div>
                    <div className="flex items-center gap-3 opacity-40 dark:opacity-20">
                      <Zap size={16} className="text-brand-blue" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-brand-dark dark:text-white">Instant Routing</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactItem({ Icon, label, value }: { Icon: any; label: string; value: string }) {
  return (
    <motion.div 
      whileHover={{ x: 10 }}
      className="flex items-center gap-6 group cursor-pointer"
    >
      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-brand-blue group-hover:shadow-[0_0_20px_rgba(0,123,255,0.4)] transition-all duration-500 border border-white/5 group-hover:border-transparent">
        <Icon size={24} className="text-brand-blue group-hover:text-white transition-colors" />
      </div>
      <div>
        <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
        <p className="text-xl font-medium group-hover:text-brand-blue transition-colors duration-300 tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}

function InputField({ id, label, value, error, touched, onChange, onBlur, disabled, type = "text" }: any) {
  return (
    <div className="relative group/field">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full bg-transparent border-b-2 py-4 px-1 focus:outline-none transition-all duration-500 peer
          ${error && touched ? 'border-red-500/50' : 'border-slate-200 dark:border-white/10 focus:border-brand-blue'}
        `}
        placeholder=" "
        required
        disabled={disabled}
      />
      <label 
        htmlFor={id} 
        className={`absolute left-1 top-4 text-slate-400 text-sm transition-all duration-500 pointer-events-none 
                   peer-focus:-top-6 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-brand-blue
                   ${value ? '-top-6 text-[10px] font-black uppercase tracking-widest' : ''}
                   ${error && touched ? 'text-red-500' : ''}
        `}
      >
        {label}
      </label>
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue group-focus-within/field:w-full transition-all duration-700" />
      <AnimatePresence>
        {error && touched && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 right-0"
          >
            <AlertCircle size={14} className="text-red-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
