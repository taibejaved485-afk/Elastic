import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, useMotionTemplate } from "motion/react";
import { RefreshCw } from "lucide-react";

export default function PullToRefresh() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const y = useMotionValue(0);
  const THRESHOLD = 160;

  // Transform y distance into SVG path control point
  // We want the curve to stretch down as the user pulls
  const curveY = useTransform(y, [0, THRESHOLD * 2], [0, THRESHOLD * 1.5]);
  const path = useMotionTemplate`M 0 0 Q 500 ${curveY} 1000 0 V 0 H 0 Z`;

  // Scale and rotation for the icon
  const iconScale = useTransform(y, [0, THRESHOLD], [0.5, 1.2]);
  const iconRotate = useTransform(y, [0, THRESHOLD], [0, 360]);
  const iconOpacity = useTransform(y, [0, 40], [0, 1]);

  const handleDragEnd = () => {
    const currentY = y.get();
    if (currentY >= THRESHOLD) {
      triggerRefresh();
    } else {
      snapBack();
    }
  };

  const snapBack = () => {
    animate(y, 0, {
      type: "spring",
      stiffness: 400,
      damping: 15,
      mass: 1
    });
  };

  const triggerRefresh = () => {
    setIsRefreshing(true);
    
    // Settle to a "loading" position
    animate(y, 80, {
      type: "spring",
      stiffness: 300,
      damping: 20
    });

    // Simulate work
    setTimeout(() => {
      setIsRefreshing(false);
      snapBack();
    }, 2000);
  };

  // Sync main content y with pull distance
  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    const unsubscribe = y.on("change", (latest) => {
      if (mainContent) {
        // Content moves slightly less than the drag for a "heavy" feel
        mainContent.style.transform = `translateY(${latest * 0.4}px)`;
      }
    });
    return () => unsubscribe();
  }, [y]);

  return (
    <>
      {/* Interaction Surface */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: THRESHOLD * 2 }}
        dragElastic={0.5}
        style={{ y }}
        onDragEnd={handleDragEnd}
        className="fixed top-0 left-0 w-full h-8 z-[10001] cursor-grab active:cursor-grabbing pointer-events-auto"
      />

      {/* Visual Canvas */}
      <div className="fixed top-0 left-0 w-full pointer-events-none z-[10000] overflow-visible">
        {/* Soft Pastel Background Area */}
        <motion.div 
          style={{ height: y, opacity: iconOpacity }}
          className="absolute top-0 left-0 w-full bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-white/5"
        />

        {/* The Elastic Fabric Stretch */}
        <svg 
          viewBox="0 0 1000 100" 
          preserveAspectRatio="none" 
          className="w-full h-[150px] absolute top-0"
        >
          <motion.path 
            d={path} 
            fill="currentColor"
            className="text-slate-50 dark:text-slate-900 drop-shadow-2xl"
          />
        </svg>

        {/* Premium Icon Reveal */}
        <motion.div 
          style={{ 
            y: useTransform(y, (v) => v * 0.5),
            scale: iconScale,
            rotate: iconRotate,
            opacity: iconOpacity
          }}
          className="absolute left-1/2 -translate-x-1/2 top-10 flex flex-col items-center gap-3"
        >
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-white/10">
            <RefreshCw 
              className={`w-6 h-6 text-brand-blue ${isRefreshing ? 'animate-spin' : ''}`} 
            />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue bg-white/80 dark:bg-slate-800/80 px-3 py-1 rounded-full backdrop-blur-sm">
            {isRefreshing ? "Syncing" : y.get() >= THRESHOLD ? "Release" : "Elastic"}
          </span>
        </motion.div>
      </div>
    </>
  );
}
