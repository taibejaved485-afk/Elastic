import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { Loader2, RefreshCw } from "lucide-react";

export default function PullToRefresh() {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  
  const THRESHOLD = 120;
  const RESISTANCE = 0.4;

  const handleTouchStart = (e: TouchEvent) => {
    // Only allow pull if we're at the top of the page
    if (window.scrollY > 10 || isRefreshing) return;
    startY.current = e.touches[0].pageY;
    setIsPulling(true);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isPulling || isRefreshing) return;
    
    const currentY = e.touches[0].pageY;
    const diff = (currentY - startY.current) * RESISTANCE;
    
    if (diff > 0) {
      if (e.cancelable) e.preventDefault();
      setPullDistance(diff);
      
      // Morph SVG path
      if (pathRef.current) {
        // M 0 0 | Q 500 {diff * 2} 1000 0
        // We stretch the midpoint down
        const controlPointY = diff * 2.5;
        gsap.to(pathRef.current, {
          attr: { d: `M 0 0 Q 500 ${controlPointY} 1000 0 V 0 H 0 Z` },
          duration: 0.1,
          overwrite: true
        });
      }

      // Rotate loader based on pull
      if (loaderRef.current) {
        gsap.to(loaderRef.current, {
          rotation: diff * 2,
          scale: Math.min(diff / THRESHOLD, 1.2),
          opacity: Math.min(diff / 50, 1),
          duration: 0.1,
          overwrite: true
        });
      }
    }
  }, [isPulling, isRefreshing]);

  const handleTouchEnd = useCallback(() => {
    if (!isPulling) return;
    setIsPulling(false);

    if (pullDistance >= THRESHOLD) {
      triggerRefresh();
    } else {
      snapBack();
    }
  }, [pullDistance, isPulling]);

  const snapBack = () => {
    gsap.to(pathRef.current, {
      attr: { d: `M 0 0 Q 500 0 1000 0 V 0 H 0 Z` },
      duration: 0.8,
      ease: "elastic.out(1, 0.4)"
    });
    
    gsap.to(loaderRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    });

    setPullDistance(0);
  };

  const triggerRefresh = () => {
    setIsRefreshing(true);
    setPullDistance(THRESHOLD);

    // Settle path to a "holding" state
    gsap.to(pathRef.current, {
      attr: { d: `M 0 0 Q 500 60 1000 0 V 0 H 0 Z` },
      duration: 0.5,
      ease: "power2.out"
    });

    // Simulate a refresh delay
    setTimeout(() => {
      completeRefresh();
    }, 2000);
  };

  const completeRefresh = () => {
    // Elegant exit
    setIsRefreshing(false);
    snapBack();
    
    // Optionally trigger a page reload or state update here
    // window.location.reload(); 
  };

  useEffect(() => {
    const el = document.body;
    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchMove, handleTouchEnd]);

  return (
    <div 
      className="fixed top-0 left-0 w-full pointer-events-none z-[10000] overflow-visible"
      ref={containerRef}
    >
      {/* Background Gradient Area */}
      <div 
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand-blue/20 to-transparent transition-opacity duration-300"
        style={{ 
          height: `${pullDistance * 1.5}px`,
          opacity: isPulling || isRefreshing ? 1 : 0 
        }}
      />

      {/* Elastic SVG Band */}
      <svg 
        viewBox="0 0 1000 100" 
        preserveAspectRatio="none" 
        className="w-full h-[100px] overflow-visible"
      >
        <path 
          ref={pathRef}
          d="M 0 0 Q 500 0 1000 0 V 0 H 0 Z" 
          fill="currentColor"
          className="text-brand-blue drop-shadow-[0_2px_10px_rgba(0,123,255,0.3)]"
        />
      </svg>

      {/* Centered Loading Icon */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2"
        style={{ top: `${Math.min(pullDistance - 40, THRESHOLD - 40)}px` }}
      >
        <div 
          ref={loaderRef}
          className="w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center shadow-xl opacity-0 scale-0"
        >
          {isRefreshing ? (
            <RefreshCw className="w-6 h-6 text-brand-blue animate-spin" />
          ) : (
            <RefreshCw className={`w-6 h-6 text-brand-blue ${pullDistance >= THRESHOLD ? 'scale-125' : ''} transition-transform`} />
          )}
        </div>
        
        {(isPulling || isRefreshing) && (
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue/60 mt-1 whitespace-nowrap">
            {isRefreshing ? "Synchronizing" : pullDistance >= THRESHOLD ? "Release to Refresh" : "Stretch to Refresh"}
          </span>
        )}
      </div>
    </div>
  );
}
