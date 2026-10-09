import { invite } from "../invite.config";
import Reveal from "./Reveal";

// Stays hidden until invite.config.js has showSchedule: true and real
// entries — no invented times on a live invitation.
export default function Schedule() {
  if (!invite.showSchedule || invite.schedule.length === 0) return null;

  return (
    <section className="px-6 py-14">
      <Reveal className="mx-auto max-w-xs">
        <h2 className="text-center font-script text-5xl font-bold text-moss-deep">
          Order of the Day
        </h2>

        <ol className="relative mt-8">
          <span className="absolute bottom-2 left-1/2 top-2 w-px -translate-x-1/2 bg-moss/50" aria-hidden="true" />
          {invite.schedule.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <li key={`${item.time}-${i}`} className="relative grid grid-cols-2 gap-6 py-3">
                <span
                  className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-moss"
                  aria-hidden="true"
                />
                <div className={left ? "text-right" : "order-2"}>
                  <p className="font-display text-lg font-semibold text-gold-deep">{item.time}</p>
                  <p className="font-body text-sm text-moss-deep">{item.label}</p>
                </div>
                <div className={left ? "" : "order-1"} />
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
