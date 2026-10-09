import { invite } from "../invite.config";
import Reveal from "./Reveal";

export default function Venue() {
  const { venue } = invite;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.name}, ${venue.city}`
  )}`;

  return (
    <section className="px-6 py-12 text-center">
      <Reveal>
        <div className="hairline mx-auto w-24" />
        <p className="mt-8 font-body text-[0.65rem] uppercase tracking-[0.3em] text-gold-deep">
          Venue
        </p>
        <p className="mt-3 font-display text-3xl text-moss-deep">{venue.name}</p>
        <p className="mt-1 font-body text-sm text-moss/70">{venue.city}</p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block border border-gold-deep px-6 py-2.5 font-body text-sm tracking-wide text-gold-deep transition-colors duration-300 hover:bg-gold-deep hover:text-cream focus-visible:bg-gold-deep focus-visible:text-cream"
        >
          View on map
        </a>
      </Reveal>
    </section>
  );
}
