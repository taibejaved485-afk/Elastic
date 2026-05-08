import React, { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate, useMotionTemplate } from "motion/react";
import { RefreshCw } from "lucide-react";

export default function PullToRefresh() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const y = useMotionValue(0);
  const THRESHOLD = 160;

  // The "Cloth Pinch" Logic:
  // 1. Center point stretches down (Pinch factor)
  // 2. Edges pull in towards the center (Tension factor)
  const pinchY = useTransform(y, [0, 500], [0, 700]);
  const edgeTension = useTransform(y, [0, 500], [0, 100]);
  
  // Coordinates for the pinch effect
  const leftX = useTransform(edgeTension, (v) => 0 + v);
  const rightX = useTransform(edgeTension, (v) => 1000 - v);
  
  // Path: Move to leftEdge, Quadratic curve through CenterPinch to rightEdge
  const path = useMotionTemplate`M ${leftX} 0 Q 500 ${pinchY} ${rightX} 0 V 0 H ${leftX} Z`;

  // Visual Transforms for UI elements
  const iconScale = useTransform(y, [0, THRESHOLD], [0.5, 1.2]);
  const iconRotate = useTransform(y, [0, THRESHOLD], [0, 360]);
  const iconOpacity = useTransform(y, [0, 60], [0, 1]);

  const snapBack = useCallback(() => {
    // High-stiffness spring for "Elastic Snap" with jiggle
    animate(y, 0, {
      type: "spring",
      stiffness: 500,
      damping: 15,
      mass: 0.8,
      velocity: 40
    });
  }, [y]);

  const triggerRefresh = useCallback(() => {
    setIsRefreshing(true);
    
    // Hold at "work state" position
    animate(y, 110, {
      type: "spring",
      stiffness: 300,
      damping: 20
    });

    // Simulate work/refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
      snapBack();
    }, 2000);
  }, [y, snapBack]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.y >= THRESHOLD) {
      triggerRefresh();
    } else {
      snapBack();
    }
  };

  // Parallax link with main content
  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    const unsubscribe = y.on("change", (latest) => {
      if (mainContent) {
        // Main content moves slightly to convey weight
        mainContent.style.transform = `translateY(${latest * 0.35}px)`;
      }
    });
    return () => unsubscribe();
  }, [y]);

  return (
    <>
      {/* Invisible Touch/Drag Surface (Does not block clicks when not pulling) */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 500 }}
        dragElastic={0.5}
        dragMomentum={false}
        onDrag={(_, info) => {
          // Only pull if we're at the top and not refreshing
          if (window.scrollY <= 5 && !isRefreshing) {
            y.set(info.offset.y);
          }
        }}
        onDragEnd={handleDragEnd}
        className="fixed top-0 left-0 w-full h-10 z-[10001] cursor-grab active:cursor-grabbing pointer-events-auto"
      />

      {/* Visual Canvas Overlay */}
      <div className="fixed top-0 left-0 w-full pointer-events-none z-[10000] overflow-visible">
        
        {/* The Elastic Cloth Stage */}
        <svg 
          viewBox="0 0 1000 100" 
          preserveAspectRatio="none" 
          className="w-full h-[650px] absolute top-0"
        >
          <defs>
            <linearGradient id="cloth-pinch-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <motion.path 
            d={path} 
            fill="url(#cloth-pinch-gradient)"
            className="text-brand-blue drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-colors duration-500"
          />
        </svg>

        {/* Floating Refresh UI revealed on deep pull */}
        <motion.div 
          style={{ 
            y: useTransform(y, (v) => v * 0.5 + 10),
            scale: iconScale,
            rotate: iconRotate,
            opacity: iconOpacity
          }}
          className="absolute left-1/2 -translate-x-1/2 top-12 flex flex-col items-center gap-3"
        >
          <div className="p-5 rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-2xl border border-white/20 ring-8 ring-black/5">
            <RefreshCw 
              className={`w-7 h-7 text-brand-blue ${isRefreshing ? 'animate-spin' : ''}`} 
            />
          </div>
          
          <motion.div 
            initial={false}
            animate={{ 
              backgroundColor: y.get() >= THRESHOLD ? "#ffffff" : "rgba(255,255,255,0.15)",
              color: y.get() >= THRESHOLD ? "#2563eb" : "#ffffff"
            }}
            className="px-5 py-1.5 rounded-full backdrop-blur-md shadow-lg border border-white/20"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              {isRefreshing ? "Synchronizing" : y.get() >= THRESHOLD ? "Let Go" : "Elasticity"}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
