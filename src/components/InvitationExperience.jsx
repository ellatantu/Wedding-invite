"use client";

import { useEffect, useState } from "react";
import OpeningScreen from "./OpeningScreen";
import Hero from "./Hero";
import Details from "./Details";

/**
 * Owns the single piece of state the whole page needs: has the
 * guest opened the invitation yet? Everything else (Hero, Details,
 * and what we add next — Gallery, Wishes, RSVP) is a plain child
 * that doesn't need to know about this state.
 */
export default function InvitationExperience() {
  const [opened, setOpened] = useState(false);

  // Keep the page from scrolling behind the seal until it's tapped,
  // so "tap to open" is a real first step, not a banner sitting on
  // top of content the guest could already scroll past.
  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <>
      <OpeningScreen onOpen={() => setOpened(true)} />
      <main>
        <Hero />
        <Details />
      </main>
    </>
  );
}
