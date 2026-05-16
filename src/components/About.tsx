import { motion, useInView, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";

function Counter({ value, duration = 2, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        onUpdate: (latest) => setCount(Math.floor(latest)),
        ease: "easeOut",
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function TypingText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const characters = text.split("");
  
  return (
    <motion.p
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.015,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-accent font-semibold tracking-widest uppercase text-sm mb-4 block">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-blue mb-8 leading-tight">
            Mastering the science of stretch and recovery.
          </h2>
          
          <TypingText 
            text="Founded with a vision to provide the global manufacturing industry with high-quality, resilient elastic, our company has become a leader in stretch technology. We combine specialized weaving techniques with modern polymer science."
            className="text-lg text-brand-slate dark:text-slate-400 mb-6 leading-relaxed min-h-[5em]"
          />
          
          <TypingText 
            delay={2}
            text="Whether it's for high-end fashion, critical medical equipment, or heavy-duty industrial use, our elastic products are designed to perform. We focus on durability and precision across every inch of material."
            className="text-lg text-brand-slate dark:text-slate-400 mb-8 leading-relaxed min-h-[5em]"
          />
          
          <div className="grid grid-cols-2 gap-8 py-6 border-y border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-4xl font-display font-bold text-brand-blue">
                <Counter value={50} suffix="M+" />
              </p>
              <p className="text-sm text-brand-slate dark:text-slate-500 font-medium">Meters Shipped</p>
            </div>
            <div>
              <p className="text-4xl font-display font-bold text-brand-blue">
                <Counter value={150} suffix="+" />
              </p>
              <p className="text-sm text-brand-slate dark:text-slate-500 font-medium">Custom Blends</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden relative z-10 shadow-2xl">
            <img
              src="https://i.pinimg.com/736x/3c/f2/ad/3cf2ad6c9aaf09cdfed2fa72a2acebf4.jpg"
              alt="Professional team collaborating"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-accent/20 rounded-full blur-2xl z-0" />
          <div className="absolute -top-6 -left-6 w-48 h-48 bg-blue-100 rounded-full blur-3xl z-0" />
        </motion.div>
      </div>
    </section>
  );
}
