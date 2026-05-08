import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, useMotionTemplate } from "motion/react";
import { RefreshCw } from "lucide-react";

export default function PullToRefresh() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const y = useMotionValue(0);
  const THRESHOLD = 160;

  // The "Pinch" Magic:
  // We want the midpoint of the cloth to stretch faster than the drag distance.
  // This creates the illusion of tension and elastic "thinning".
  const pinchY = useTransform(y, [0, 500], [0, 700]);
  const path = useMotionTemplate`M 0 0 Q 500 ${pinchY} 1000 0 V 0 H 0 Z`;

  // Scale and rotation for the loading indicator
  const iconScale = useTransform(y, [0, THRESHOLD], [0.5, 1.2]);
  const iconRotate = useTransform(y, [0, THRESHOLD], [0, 360]);
  const iconOpacity = useTransform(y, [0, 60], [0, 1]);

  // Shadow intensity increases as we pinch
  const shadowOpacity = useTransform(y, [0, THRESHOLD], [0, 0.3]);
  const shadowBlur = useTransform(y, [0, THRESHOLD], [0, 30]);

  const handleDragEnd = () => {
    const currentY = y.get();
    if (currentY >= THRESHOLD) {
      triggerRefresh();
    } else {
      snapBack();
    }
  };

  const snapBack = () => {
    // Snap with high frequency vibration for "Cloth Snap" feel
    animate(y, 0, {
      type: "spring",
      stiffness: 800,
      damping: 10,
      mass: 0.5
    });
  };

  const triggerRefresh = () => {
    setIsRefreshing(true);
    
    // Bounce to a "Work state" holding position
    animate(y, 110, {
      type: "spring",
      stiffness: 400,
      damping: 15
    });

    // Simulate network delay
    setTimeout(() => {
      setIsRefreshing(false);
      snapBack();
    }, 2000);
  };

  // Move the entire page content with the drag
  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    const unsub = y.on("change", (latest) => {
      if (mainContent) {
        // Content resists more than the fabric (paralax effect)
        mainContent.style.transform = `translateY(${latest * 0.35}px)`;
      }
    });
    return () => unsub();
  }, [y]);

  return (
    <>
      {/* Invisible Drag Handle */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 400 }}
        dragElastic={0.6}
        style={{ y }}
        onDragEnd={handleDragEnd}
        className="fixed top-0 left-0 w-full h-16 z-[10001] cursor-grab active:cursor-grabbing pointer-events-auto"
      />

      {/* Visual Component */}
      <div className="fixed top-0 left-0 w-full pointer-events-none z-[10000] overflow-visible">
        
        {/* Shadow layer for depth */}
        <motion.div 
          style={{ 
            opacity: shadowOpacity,
            filter: useMotionTemplate`blur(${shadowBlur}px)`,
            y: useTransform(y, (v) => v * 0.1)
          }}
          className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-4 bg-black/50 rounded-[100%]"
        />

        {/* The Elastic Cloth Layer */}
        <svg 
          viewBox="0 0 1000 100" 
          preserveAspectRatio="none" 
          className="w-full h-[600px] absolute top-0"
        >
          <defs>
            <linearGradient id="cloth-fade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <motion.path 
            d={path} 
            fill="url(#cloth-fade)"
            className="text-slate-50 dark:text-slate-900 transition-colors duration-500"
          />
        </svg>

        {/* Centered Refresh UI */}
        <motion.div 
          style={{ 
            y: useTransform(y, (v) => v * 0.5),
            scale: iconScale,
            rotate: iconRotate,
            opacity: iconOpacity
          }}
          className="absolute left-1/2 -translate-x-1/2 top-14 flex flex-col items-center gap-3"
        >
          <div className="p-5 rounded-[2rem] bg-white dark:bg-slate-800 shadow-2xl border border-slate-100 dark:border-white/10 ring-4 ring-black/5">
            <RefreshCw 
              className={`w-6 h-6 text-brand-blue ${isRefreshing ? 'animate-spin' : ''}`} 
            />
          </div>
          
          <motion.div 
            className="px-4 py-1.5 rounded-full bg-brand-blue shadow-lg border border-white/20"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white">
              {isRefreshing ? "Testing Recovery" : y.get() >= THRESHOLD ? "Let Go" : "Stretch"}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
