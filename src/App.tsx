/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import Navbar from "./components/Navbar";
import ScrollProgressBar from "./components/ScrollProgressBar";
import PullToRefresh from "./components/PullToRefresh";
import Hero from "./components/Hero";
import ShapeMorphDivider from "./components/ShapeMorphDivider";
import About from "./components/About";
import Mission from "./components/Mission";
import WhyChooseUs from "./components/WhyChooseUs";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function App() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
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
      <PullToRefresh />
      <ScrollProgressBar />
      <Navbar />
      <main id="main-content">
        <Hero />
        <ShapeMorphDivider fill="fill-white dark:fill-slate-950" className="-mt-1 relative z-20" />
        <div id="about" className="reveal">
          <About />
        </div>
        <div id="mission" className="reveal">
          <Mission />
        </div>
        <div id="why-us" className="reveal">
          <WhyChooseUs />
        </div>
        <div id="services" className="reveal">
          <Services />
        </div>
        <div id="contact" className="reveal">
          <Contact />
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
