import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { Loader2, RefreshCw } from "lucide-react";

export default function PullToRefresh() {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const displacementRef = useRef<SVGFEPointLightElement>(null);
  const filterMapRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  
  const THRESHOLD = 160;
  const DAMPING = 0.35;

  const handleTouchStart = (e: TouchEvent) => {
    if (window.scrollY > 5 || isRefreshing) return;
    startY.current = e.touches[0].pageY;
    setIsPulling(true);
    
    // Reset filter state
    if (filterMapRef.current) {
      gsap.to(filterMapRef.current, { attr: { scale: 0 }, duration: 0 });
    }
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isPulling || isRefreshing) return;
    
    const currentY = e.touches[0].pageY;
    const diff = (currentY - startY.current) * DAMPING;
    
    if (diff > 0) {
      if (e.cancelable) e.preventDefault();
      setPullDistance(diff);
      
      // Apply "Cloth Pinch" Distortion
      // The scale determines the magnitude of the displacement
      if (filterMapRef.current) {
        gsap.to(filterMapRef.current, {
          attr: { scale: Math.min(diff * 1.5, 200) },
          duration: 0.1,
          overwrite: true
        });
      }

      // Slightly shift the main content down
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        gsap.to(mainContent, {
          y: diff * 0.4,
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
    // Snap content back with vibration
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      gsap.to(mainContent, {
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)"
      });
    }

    // Vibrate and eliminate the displacement scale
    if (filterMapRef.current) {
      gsap.to(filterMapRef.current, {
        attr: { scale: 0 },
        duration: 1.5,
        ease: "elastic.out(1.2, 0.2)"
      });
    }

    setPullDistance(0);
  };

  const triggerRefresh = () => {
    setIsRefreshing(true);
    
    // Hold state
    gsap.to(filterMapRef.current, {
      attr: { scale: 40 },
      duration: 0.8,
      ease: "power2.out"
    });

    setTimeout(() => {
      completeRefresh();
    }, 2000);
  };

  const completeRefresh = () => {
    setIsRefreshing(false);
    snapBack();
  };

  useEffect(() => {
    const el = document.body;
    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);

    // Apply the filter to main content
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.style.filter = "url(#cloth-filter)";
      mainContent.style.transformOrigin = "top center";
    }

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchMove, handleTouchEnd]);

  return (
    <>
      {/* Hidden SVG Filter Definition */}
      <svg className="fixed pointer-events-none opacity-0">
        <defs>
          <filter id="cloth-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence 
              ref={turbRef}
              type="fractalNoise" 
              baseFrequency="0.01 0.001" 
              numOctaves="2" 
              result="noise" 
            />
            <feDisplacementMap 
              ref={filterMapRef}
              in="SourceGraphic" 
              in2="noise" 
              scale="0" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>

      <div 
        className="fixed top-0 left-0 w-full pointer-events-none z-[10000]"
        ref={containerRef}
      >
        {/* Visual feedback icon */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ 
            top: `${Math.min(pullDistance - 60, 100)}px`,
            opacity: pullDistance > 20 ? 1 : 0
          }}
        >
          <div className={`w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center shadow-2xl transition-all duration-300 ${isRefreshing ? 'rotate-180 scale-110' : ''}`}>
             <RefreshCw className={`w-6 h-6 text-brand-blue ${isRefreshing ? 'animate-spin' : ''}`} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue drop-shadow-md">
            {isRefreshing ? "Synchronizing" : pullDistance >= THRESHOLD ? "Release" : "Stretch"}
          </span>
        </div>
      </div>
    </>
  );
}
