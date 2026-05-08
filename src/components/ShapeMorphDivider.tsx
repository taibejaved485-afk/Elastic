import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ShapeMorphDividerProps {
  className?: string;
  fill?: string;
}

export default function ShapeMorphDivider({ className, fill = "fill-slate-50 dark:fill-slate-950" }: ShapeMorphDividerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    // Path A: Fluid / Wavy shape
    const pathA = "M0 40 Q 250 80 500 40 T 1000 40 V 100 H 0 Z";
    // Path B: Flat / Straight shape
    const pathB = "M0 80 Q 250 80 500 80 T 1000 80 V 100 H 0 Z";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(pathRef.current, {
      attr: { d: pathB },
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden leading-[0] ${className}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className={`w-full h-[120px] sm:h-[180px] transform rotate-180 scale-y-[-1] transition-colors duration-300`}
      >
        <defs>
          <linearGradient id="morph-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="dark:stop-slate-950 stop-white transition-colors duration-300" />
            <stop offset="50%" className="dark:stop-slate-900 stop-slate-50 transition-colors duration-300" />
            <stop offset="100%" className="dark:stop-slate-950 stop-white transition-colors duration-300" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d="M0 40 Q 250 80 500 40 T 1000 40 V 100 H 0 Z"
          fill="url(#morph-gradient)"
          className="transition-colors duration-300"
        />
      </svg>
      
      {/* Subtle top border for definition */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 dark:bg-slate-800/20" />
    </div>
  );
}
