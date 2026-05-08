import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    // Initial state: Blue color, zero width
    gsap.set(barRef.current, { 
      scaleX: 0,
      backgroundColor: "#007bff",
      boxShadow: "0 0 15px rgba(0, 123, 255, 0.6)"
    });

    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Define colors for interpolation
        const startColor = "#007bff"; // Blue
        const endColor = "#00ffcc";   // Cyan
        const startGlow = "rgba(0, 123, 255, 0.6)";
        const endGlow = "rgba(0, 255, 204, 0.6)";

        // Morph the bar width and color simultaneously with elastic feel
        gsap.to(barRef.current, {
          scaleX: progress,
          backgroundColor: gsap.utils.interpolate(startColor, endColor, progress),
          boxShadow: `0 0 20px ${gsap.utils.interpolate(startGlow, endGlow, progress)}`,
          duration: 1,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 sm:h-1.5 z-[9999] pointer-events-none origin-left overflow-visible">
      <div
        ref={barRef}
        className="w-full h-full bg-brand-blue origin-left"
        style={{ willChange: "transform, background-color, box-shadow" }}
      />
    </div>
  );
}
