import Image from "next/image";
import { invite } from "../invite.config";
import Reveal from "./Reveal";

function Album({ title, photos }) {
  return (
    <div className="mb-14 last:mb-0">
      <Reveal className="px-6 text-center">
        <p className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-gold-deep">
          {title}
        </p>
        <div className="hairline mx-auto mt-3 w-16" />
      </Reveal>

      {/* Native horizontal scroll with snap points: swipes on touch
          devices with no JS needed. */}
      <div className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {photos.map((photo) => (
          <div
            key={photo.src}
            className="flex-none snap-center bg-cream-warm p-2 shadow-lg ring-1 ring-gold/40"
          >
            <div className="relative h-64 w-44 overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="176px"
                className={`object-cover ${photo.position ?? ""}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Albums() {
  return (
    <section className="py-14">
      <div className="px-6 text-center">
        <p className="font-script text-5xl font-bold text-moss-deep">A few moments</p>
        <p className="mt-1 font-body text-xs text-moss/60">Swipe to see more →</p>
      </div>

      <div className="mt-8">
        {invite.albums.map((album) => (
          <Album key={album.title} {...album} />
        ))}
      </div>
    </section>
  );
}
