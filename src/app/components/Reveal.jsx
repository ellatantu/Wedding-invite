"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades + slides its children up the first time they scroll into view.
 * Triggers once (doesn't replay if you scroll past and back) so it reads
 * as an entrance, not a distracting bounce every time. Respects
 * prefers-reduced-motion via the global CSS rule in globals.css, which
 * collapses the transition duration to ~0ms — content still appears,
 * just without the animated motion.
 */
export default function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}
