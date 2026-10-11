"use client";

import { useState } from "react";

/**
 * Two green doors with a "Tap to open" badge across the seam. Tapping
 * slides the doors apart (revealing the invitation, which is already
 * rendered underneath), then tells the parent to unmount this screen.
 * Reduced-motion users get the same sequence with the global CSS rule
 * collapsing the transitions to ~0ms.
 */
export default function DoorsOpening({ onOpen, onTap }) {
  const [opening, setOpening] = useState(false);

  function handleOpen() {
    if (opening) return;
    // Runs synchronously inside the tap. Browsers (iPhones especially)
    // only allow audio to start from inside a real user gesture, so
    // the music must be started here, not after the doors finish.
    onTap?.();
    setOpening(true);
    setTimeout(onOpen, 1500); // doors take 1200ms to slide, plus a beat
  }

  return (
    <div
      className={`fixed inset-0 z-50 transition-colors duration-500 ${
        opening ? "pointer-events-none bg-transparent" : "bg-cream"
      }`}
    >
      <div className="relative mx-auto h-full w-full max-w-md overflow-hidden">
        <div
          aria-hidden="true"
          className={`door-texture absolute inset-y-0 left-0 w-1/2 transition-transform duration-[1200ms] ease-in-out ${
            opening ? "-translate-x-full" : ""
          }`}
        />
        <div
          aria-hidden="true"
          className={`door-texture absolute inset-y-0 right-0 w-1/2 transition-transform duration-[1200ms] ease-in-out ${
            opening ? "translate-x-full" : ""
          }`}
        />

        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open the invitation"
          className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out hover:scale-105 focus-visible:scale-105 ${
            opening ? "scale-90 opacity-0" : ""
          }`}
        >
          <svg viewBox="0 0 150 200" className="h-52 w-40" aria-hidden="true">
            <ellipse cx="75" cy="100" rx="68" ry="94" className="fill-cream-warm stroke-gold" strokeWidth="3" />
            <ellipse cx="75" cy="100" rx="58" ry="84" fill="none" className="stroke-gold" strokeWidth="1" strokeDasharray="2 5" />
            <path d="M75 46 C 66 56, 66 68, 75 76 C 84 68, 84 56, 75 46 Z" className="fill-gold" />
            <path d="M75 76 L75 90" className="stroke-gold" strokeWidth="1.5" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center pt-10 text-center font-display text-sm font-semibold uppercase leading-snug tracking-[0.25em] text-gold-deep">
            Tap to
            <br />
            open
          </span>
        </button>
      </div>
    </div>
  );
}
