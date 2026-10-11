"use client";

import { useEffect, useRef, useState } from "react";
import DoorsOpening from "./components/DoorsOpening";
import Cover from "./components/Cover";
import Message from "./components/Message";
import CalendarCard from "./components/CalendarCard";
import Venue from "./components/Venue";
import Schedule from "./components/Schedule";
import Albums from "./components/Albums";
import Signboard from "./components/Signboard";
import Closing from "./components/Closing";
import MusicToggle from "./components/MusicToggle";
import { invite } from "./invite.config";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef(null);

  // Called from inside the tap on the doors. Browsers only allow sound
  // after a user gesture, which is why music starts here and not on load.
  function startMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = invite.music.volume;
    // play() rejects if the browser refuses (rare after a tap); the
    // music button then simply shows "Play music".
    audio.play().catch(() => {});
  }

  // No scrolling the invitation behind the doors until they're opened.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* preload="none": the song isn't downloaded until the guest taps
          open, so it never slows the first load on mobile data. */}
      <audio ref={audioRef} src={invite.music.src} loop preload="none" />

      {!isOpen && (
        <DoorsOpening onTap={startMusic} onOpen={() => setIsOpen(true)} />
      )}

      {/* A phone-width column, centered on wider screens. Every
          section stays a direct child of <main> (the print CSS relies
          on that to isolate the signboard). */}
      <main className="mx-auto min-h-screen max-w-md bg-cream-warm shadow-[0_0_40px_rgba(47,64,41,0.1)]">
        <Cover isOpen={isOpen} />
        <Message />
        <CalendarCard />
        <Venue />
        <Schedule />
        <Albums />
        <Signboard />
        <Closing />
      </main>

      {isOpen && <MusicToggle audioRef={audioRef} />}
    </>
  );
}
