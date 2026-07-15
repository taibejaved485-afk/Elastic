import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from "motion/react";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import LottieAnimation from "./LottieAnimation";
import { useConfig } from "../utils/ConfigContext";

function Particle({ p, mouseX, mouseY }: any) {
  const moveX = useTransform(mouseX, [-500, 500], [-p.drift, p.drift]);
  const moveY = useTransform(mouseY, [-500, 500], [-p.drift, p.drift]);
  const springX = useSpring(moveX, { stiffness: 40, damping: 25 });
  const springY = useSpring(moveY, { stiffness: 40, damping: 25 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: p.opacity, scale: 1 }}
      transition={{ duration: 2, delay: p.delay }}
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        x: springX,
        y: springY,
      }}
      className="absolute rounded-full bg-white/25 blur-[1px]"
    />
  );
}

function ParticleBackground({ mouseX, mouseY }: { mouseX: MotionValue<number>, mouseY: MotionValue<number> }) {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      drift: Math.random() * 40 + 20,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <Particle key={p.id} p={p} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
}

export default function Hero() {
  const { config } = useConfig();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const bgX = useTransform(mouseX, [-500, 500], [30, -30]);
  const bgY = useTransform(mouseY, [-500, 500], [30, -30]);
  
  const floatX = useTransform(mouseX, [-500, 500], [-50, 50]);
  const floatY = useTransform(mouseY, [-500, 500], [-50, 50]);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });
  const springBgX = useSpring(bgX, { stiffness: 50, damping: 20 });
  const springBgY = useSpring(bgY, { stiffness: 50, damping: 20 });
  const springFloatX = useSpring(floatX, { stiffness: 50, damping: 20 });
  const springFloatY = useSpring(floatY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const [displayText, setDisplayText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = ["meters shipped", "premium webbing", "textile grade", "industrial grade"];
  const [typingSpeed, setTypingSpeed] = useState(150);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force essential attributes for autoplay compatibility in new browsers/private modes
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      if (video) {
        video.play().catch((err) => {
          console.log("Autoplay waiting for user gesture or loading: ", err.message);
        });
      }
    };

    // Attempt play immediately
    playVideo();

    // Listen to buffering/ready events to play as soon as video has loaded enough
    video.addEventListener("loadedmetadata", playVideo);
    video.addEventListener("canplay", playVideo);

    // Play on first user interaction as a foolproof fallback
    const handleInteraction = () => {
      playVideo();
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      if (video) {
        video.removeEventListener("loadedmetadata", playVideo);
        video.removeEventListener("canplay", playVideo);
      }
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIdx];
      const shouldDelete = isDeleting;
      
      setDisplayText(prev => 
        shouldDelete 
          ? currentWord.substring(0, prev.length - 1)
          : currentWord.substring(0, prev.length + 1)
      );

      setTypingSpeed(shouldDelete ? 50 : 150);

      if (!shouldDelete && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (shouldDelete && displayText === "") {
        setIsDeleting(false);
        setWordIdx((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIdx, typingSpeed]);

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center relative overflow-hidden hero-gradient pt-32 pb-36 lg:pb-32"
    >
      {/* Background Video with premium overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://i.pinimg.com/736x/ba/94/66/ba94660a1f738e96182a8ac3af213cb9.jpg"
          className="w-full h-full object-cover opacity-[0.75] filter brightness-90 scale-[1.12] origin-center"
        >
          {/* 1. Fast, highly optimized Vercel CDN video (3.6MB) - Plays instantly */}
          <source src="https://elastic-one.vercel.app/hero-section-video.mp4" type="video/mp4" />
          
          {/* 2. Local fallback video (14MB) */}
          <source src="/hero-section-video.mp4" type="video/mp4" />
          
          {/* 3. High-quality textile loom alternative fallback */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-weaving-loom-machine-making-fabric-40552-large.mp4" type="video/mp4" />
        </video>
        {/* Soft, rich dark overlay for outstanding premium typography readability */}
        <div className="absolute inset-0 bg-black/55" />
        
        {/* Elegant bottom gradient fade to mask watermarks and blend into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        
        <ParticleBackground mouseX={mouseX} mouseY={mouseY} />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      </div>

      <div className="w-full px-6 md:px-12 z-10 max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/5 border border-white/15 backdrop-blur-md mb-8">
              <Sparkles size={14} className="text-white/80" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">{config.heroBadge}</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black text-white leading-[1.1] sm:leading-[1.0] lg:leading-[0.9] tracking-tighter mb-8 uppercase max-w-4xl text-center">
              {config.heroTitle.split(" ").slice(0, -1).join(" ")} <br />
              <motion.span 
                animate={{ 
                  scale: [1, 1.02, 1],
                  textShadow: [
                    "0 0 10px rgba(255, 255, 255, 0.15)",
                    "0 0 25px rgba(255, 255, 255, 0.4)",
                    "0 0 10px rgba(255, 255, 255, 0.15)"
                  ]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="text-stroke neon-glow italic inline-block py-2"
              >
                {config.heroTitle.split(" ").slice(-1)[0]}
              </motion.span>
            </h1>
            
            <p className="max-w-2xl text-lg sm:text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light min-h-[4rem] text-center">
              {config.heroSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-8 mt-4 sm:mt-0">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary w-full sm:w-auto px-12 py-6 text-sm uppercase tracking-[0.2em] flex items-center justify-center group relative overflow-hidden"
              >
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ 
                    scale: [1, 2],
                    opacity: [0.4, 0],
                  }}
                  transition={{ 
                    duration: 1.2, 
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  className="absolute inset-0 bg-white/30 rounded-full"
                />
                <span className="relative z-10 flex items-center">
                  Explore Products <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.button>
              <div className="flex items-center gap-4 text-white/50 text-[10px] sm:text-xs font-bold uppercase tracking-widest pl-2 group/teams cursor-default">
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&h=120&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=120&h=120&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=120&h=120&auto=format&fit=crop"
                  ].map((url, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ scale: 1.2, zIndex: 10, y: -5 }}
                      className="w-10 h-10 rounded-full border-2 border-[#020617] bg-slate-800 overflow-hidden shadow-lg shadow-black/50 transition-all duration-300"
                    >
                      <img src={url} alt="Team Member" className="w-full h-full object-cover grayscale group-hover/teams:grayscale-0 transition-all duration-500" />
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-white font-black group-hover/teams:text-brand-blue transition-colors">2K+ TEAMS</span>
                  <span className="text-[8px] opacity-60">TRUST OUR SCIENCE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ticker for "High End" feel */}
      <div className="absolute bottom-0 left-0 w-full bg-white/5 backdrop-blur-md border-t border-white/10 py-5 sm:py-6 overflow-hidden">
        <div className="flex animate-marquee-fast sm:animate-marquee-slow space-x-12 whitespace-nowrap px-12">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-white/20 font-black text-xl sm:text-2xl uppercase tracking-tighter">PREMIUM WEBBING</span>
              <span className="text-white/20"> &nbsp;/&nbsp; </span>
              <span className="text-white/20 font-black text-xl sm:text-2xl uppercase tracking-tighter">TRUSTED WORLDWIDE</span>
              <span className="text-white/20"> &nbsp;/&nbsp; </span>
              <span className="text-white/20 font-black text-xl sm:text-2xl uppercase tracking-tighter">TEXTILE GRADE</span>
              <span className="text-white/20"> &nbsp;/&nbsp; </span>
              <span className="text-white/20 font-black text-xl sm:text-2xl uppercase tracking-tighter">INDUSTRIAL STRENGTH</span>
              <span className="text-white/20"> &nbsp;/&nbsp; </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
