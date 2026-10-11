"use client";

import { useState } from "react";

/**
 * Full-screen black overlay with a gold seal in the middle.
 * Tapping it fades the overlay out (not unmounts it instantly),
 * so the transition itself feels like opening something, rather
 * than a page just flashing to new content.
 */
export default function OpeningScreen({ onOpen }) {
  const [closing, setClosing] = useState(false);

  function handleOpen() {
    if (closing) return;
    setClosing(true);
    onOpen();
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-ink px-6 text-center transition-opacity duration-1000 ease-out ${
        closing ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <button
        type="button"
        onClick={handleOpen}
        className="flex h-36 w-36 items-center justify-center rounded-full border border-gold text-gold transition-transform duration-500 hover:scale-105 focus-visible:scale-105 sm:h-44 sm:w-44"
        aria-label="Open the wedding invitation"
      >
        <span className="font-display text-3xl italic sm:text-4xl">
          T
          <span className="mx-1 text-xl not-italic text-gold-soft sm:text-2xl">
            &amp;
          </span>
          M
        </span>
      </button>

      <p className="font-display text-base italic text-parchment/70">
        tap to open your invitation
      </p>
    </div>
  );
}
