"use client";

import { useEffect, useState } from "react";
import { invite } from "../invite.config";

const WEDDING_DATE = new Date(invite.dateTimeISO);

function getTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  // null until mounted, so server HTML and first client render match.
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) return null;

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-start justify-center gap-4">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <span
            key={unit.value}
            className="animate-tick font-display text-4xl text-gold-deep tabular-nums"
          >
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="mt-1 font-body text-[0.6rem] uppercase tracking-[0.15em] text-moss/70">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
