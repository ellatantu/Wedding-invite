import Image from "next/image";
import { invite } from "../invite.config";
import Reveal from "./Reveal";
import Countdown from "./Countdown";
import { Sprig } from "./Ornaments";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function buildMonth({ year, month }) {
  const firstWeekday = new Date(year, month - 1, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function CalendarCard() {
  const { date, photos } = invite;
  const cells = buildMonth(date);

  return (
    <section className="px-6 py-14">
      <Reveal className="relative mx-auto w-72">
        <Sprig className="absolute -left-9 -top-8 z-10 h-20 w-20 -rotate-12 text-moss" />
        <Sprig className="absolute -bottom-8 -right-9 z-10 h-20 w-20 rotate-[168deg] text-moss" />

        <div className="grid grid-cols-2 gap-1.5 bg-cream-warm p-1.5 shadow-md">
          {[photos.calendarLeft, photos.calendarRight].map((photo) => (
            <div key={photo.src} className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="140px"
                className={`object-cover ${photo.position}`}
              />
            </div>
          ))}
        </div>

        {/* Binder rings */}
        <div className="relative z-10 -my-2 flex justify-around px-6" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="h-5 w-2 rounded-full bg-cream-warm ring-1 ring-moss-deep/40" />
          ))}
        </div>

        <div className="bg-moss px-4 pb-5 pt-5 text-cream shadow-md">
          <p className="text-center font-script text-4xl font-bold">
            {MONTHS[date.month - 1]} {date.year}
          </p>
          <div className="mt-3 grid grid-cols-7 gap-y-1.5 text-center font-body text-xs">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={i} className="text-cream/70">{d}</span>
            ))}
            {cells.map((day, i) => (
              <span
                key={i}
                className={
                  day === date.day
                    ? "mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-gold font-semibold text-moss-deep"
                    : "py-0.5"
                }
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-10 text-center">
        <p className="font-display text-2xl text-moss-deep">
          {date.weekday}, {MONTHS[date.month - 1]} {date.day}
        </p>
        {invite.timeNote && (
          <p className="mt-1 font-body text-xs text-moss/70">{invite.timeNote}</p>
        )}
        <div className="mt-6">
          <Countdown />
        </div>
      </Reveal>
    </section>
  );
}
