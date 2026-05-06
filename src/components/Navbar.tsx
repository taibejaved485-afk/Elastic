import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Mission", href: "#mission" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled 
          ? "py-4 bg-white/70 backdrop-blur-md border-slate-200" 
          : "py-8 bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a 
          href="#home" 
          className={`text-2xl font-black italic tracking-tighter flex items-center gap-3 transition-colors duration-300 ${
            scrolled ? "text-brand-dark" : "text-white"
          }`}
        >
          <div className="w-9 h-9 bg-brand-blue rounded-xl flex items-center justify-center transform -skew-x-12 shadow-lg shadow-brand-blue/20">
            <div className="w-3.5 h-3.5 bg-white rounded-full animate-pulse" />
          </div>
          <span className="font-display uppercase tracking-widest text-xl">ELΛSTIC</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`nav-link ${
                scrolled 
                  ? "text-brand-dark/70 hover:text-brand-blue" 
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}
          <button 
            className={`px-7 py-3 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all shadow-lg ${
              scrolled 
                ? "bg-brand-dark text-white hover:bg-brand-blue shadow-brand-blue/10" 
                : "bg-white text-brand-dark hover:bg-brand-blue hover:text-white shadow-white/10"
            }`}
          >
            Client Portal
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden p-2 transition-colors duration-300 ${
            scrolled ? "text-brand-dark" : "text-white"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass md:hidden border-t border-slate-100"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xl font-bold text-brand-dark hover:text-brand-blue"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-slate-100" />
              <button className="btn-primary w-full">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
