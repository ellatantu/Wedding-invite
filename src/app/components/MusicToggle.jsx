"use client";

import { useEffect, useState } from "react";

/**
 * Small floating play/pause button for the background song. The audio
 * element itself lives in page.js so it can be started from the tap on
 * the doors; this only reflects its state and lets guests pause it.
 */
export default function MusicToggle({ audioRef }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const sync = () => setPlaying(!audio.paused);
    sync();
    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);
    return () => {
      audio.removeEventListener("play", sync);
      audio.removeEventListener("pause", sync);
    };
  }, [audioRef]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 print:hidden">
      <div className="mx-auto flex max-w-md justify-end px-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          aria-pressed={playing}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-moss text-cream shadow-lg ring-1 ring-gold/60 transition-transform duration-300 hover:scale-105 focus-visible:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
            {playing ? (
              <>
                <path d="M15.5 9a4.2 4.2 0 0 1 0 6" />
                <path d="M18 6.5a8 8 0 0 1 0 11" />
              </>
            ) : (
              <path d="M16 9.5l5 5M21 9.5l-5 5" />
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}
