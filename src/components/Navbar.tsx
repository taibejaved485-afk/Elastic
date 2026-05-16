import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Mission", href: "#mission" },
  { name: "Services", href: "#services" },
  { name: "Specs", href: "#specs" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled 
          ? "py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-800" 
          : "py-8 bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a 
          href="#home" 
          className={`text-2xl font-black italic tracking-tighter flex items-center gap-3 transition-colors duration-300 ${
            scrolled ? "text-brand-dark dark:text-white" : "text-white"
          }`}
        >
          <div className="w-9 h-9 bg-brand-blue rounded-xl flex items-center justify-center transform -skew-x-12 shadow-lg shadow-brand-blue/20">
            <div className="w-3.5 h-3.5 bg-white rounded-full animate-pulse" />
          </div>
          <span className="font-display uppercase tracking-widest text-lg sm:text-xl">ELΛSTIC</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`nav-link ${
                scrolled 
                  ? "text-brand-dark/70 dark:text-white/70 hover:text-brand-blue" 
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}
          
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${
              scrolled 
                ? "text-brand-dark hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800" 
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Toggle & Theme Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className={`p-2 transition-colors duration-300 ${
              scrolled ? "text-brand-dark dark:text-white" : "text-white"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          
          <button
            className={`p-2 transition-colors duration-300 ${
              scrolled ? "text-brand-dark dark:text-white" : "text-white"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass md:hidden border-t border-slate-100 dark:border-slate-800"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xl font-bold text-brand-dark dark:text-white hover:text-brand-blue"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-slate-100 dark:border-slate-800" />
              <button className="btn-primary w-full">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
