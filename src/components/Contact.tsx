import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, Twitter, Linkedin, Github, Instagram, ArrowRight, Loader2 } from "lucide-react";

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
    <section className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden"
        >
          <div className="grid lg:grid-cols-5">
            {/* Info Side (2 cols) */}
            <div className="lg:col-span-2 bg-brand-dark p-10 md:p-16 text-white flex flex-col justify-between">
              <div>
                <span className="text-brand-blue font-bold tracking-widest uppercase text-xs mb-4 block">
                  Connect
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  Let's shape the <br />
                  <span className="text-brand-blue">future together.</span>
                </h2>
                
                <div className="space-y-10 mt-16">
                  <div className="flex items-start gap-6 group">
                    <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-brand-blue transition-all duration-300">
                      <Mail size={24} className="text-brand-blue group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Email Us</p>
                      <p className="text-lg font-medium">hello@elastic.tech</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 group">
                    <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-brand-blue transition-all duration-300">
                      <Phone size={24} className="text-brand-blue group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Call Us</p>
                      <p className="text-lg font-medium">+1 (800) ELASTIC</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16">
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-6">Socials</p>
                <div className="flex gap-4">
                  {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl hover:bg-brand-blue transition-all duration-300"
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Side (3 cols) */}
            <div className="lg:col-span-3 p-10 md:p-20 bg-white">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-x-12">
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      className="form-input"
                      placeholder=" "
                      required
                      disabled={isSubmitting}
                    />
                    <label htmlFor="name" className="form-label">Full Name</label>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      className="form-input"
                      placeholder=" "
                      required
                      disabled={isSubmitting}
                    />
                    <label htmlFor="email" className="form-label">Email Address</label>
                  </div>
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    id="subject"
                    className="form-input"
                    placeholder=" "
                    disabled={isSubmitting}
                  />
                  <label htmlFor="subject" className="form-label">Subject</label>
                </div>

                <div className="form-group">
                  <textarea
                    id="message"
                    rows={4}
                    className="form-input resize-none"
                    placeholder=" "
                    required
                    disabled={isSubmitting}
                  ></textarea>
                  <label htmlFor="message" className="form-label">Your Message</label>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || isSubmitted}
                  className={`btn-primary glow-hover w-full py-6 text-sm uppercase tracking-[0.2em] mt-8 group flex items-center justify-center transition-all ${
                    isSubmitting ? "opacity-80 cursor-not-allowed" : ""
                  } ${isSubmitted ? "bg-green-600 shadow-green-200" : ""}`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin mr-3" />
                      Processing...
                    </>
                  ) : isSubmitted ? (
                    "Message Sent Successfully"
                  ) : (
                    <>
                      Initiate Inquiry 
                      <ArrowRight className="inline ml-3 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
