/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Hero from "./components/Hero";
import ShapeMorphDivider from "./components/ShapeMorphDivider";
import BackToTop from "./components/BackToTop";

// Lazy load below-the-fold components to reduce initial JavaScript payload size
const About = lazy(() => import("./components/About"));
const Mission = lazy(() => import("./components/Mission"));
const WhyChooseUs = lazy(() => import("./components/WhyChooseUs"));
const Services = lazy(() => import("./components/Services"));
const ProductSpecs = lazy(() => import("./components/ProductSpecs"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// Skeleton filler to prevent Cumulative Layout Shift (CLS)
function SectionPlaceholder({ height = "400px" }: { height?: string }) {
  return (
    <div 
      className="w-full max-w-7xl mx-auto my-8 bg-slate-50/50 dark:bg-slate-900/10" 
      style={{ height }}
    />
  );
}

export default function App() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "100px", // Detect slightly before they enter viewport
      threshold: 0.1,
    };

    const handleReveal = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    };

    const observer = new IntersectionObserver(handleReveal, observerOptions);
    const revealElements = document.querySelectorAll(".reveal");
    
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Hero />
        <ShapeMorphDivider fill="fill-white dark:fill-slate-950" className="-mt-1 relative z-20" />
        
        <Suspense fallback={<SectionPlaceholder height="500px" />}>
          <div id="about" className="reveal">
            <About />
          </div>
        </Suspense>

        <Suspense fallback={<SectionPlaceholder height="400px" />}>
          <div id="mission" className="reveal">
            <Mission />
          </div>
        </Suspense>

        <Suspense fallback={<SectionPlaceholder height="400px" />}>
          <div id="why-us" className="reveal">
            <WhyChooseUs />
          </div>
        </Suspense>

        <Suspense fallback={<SectionPlaceholder height="500px" />}>
          <div id="services" className="reveal">
            <Services />
          </div>
        </Suspense>

        <Suspense fallback={<SectionPlaceholder height="600px" />}>
          <div id="specs" className="reveal">
            <ProductSpecs />
          </div>
        </Suspense>

        <Suspense fallback={<SectionPlaceholder height="500px" />}>
          <div id="contact" className="reveal">
            <Contact />
          </div>
        </Suspense>
      </main>
      
      <Suspense fallback={<SectionPlaceholder height="300px" />}>
        <Footer />
      </Suspense>
      
      <BackToTop />
    </div>
  );
}
