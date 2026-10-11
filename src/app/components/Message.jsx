import { invite } from "../invite.config";
import Reveal from "./Reveal";
import { Sprig, SmallHeart } from "./Ornaments";

export default function Message() {
  return (
    <section className="relative overflow-hidden px-8 py-14 text-center">
      <Sprig className="absolute -left-4 top-4 h-28 w-28 -rotate-6 text-moss/80" />
      <Sprig className="absolute -bottom-2 -right-4 h-28 w-28 rotate-[174deg] text-moss/80" />

      <Reveal className="relative mx-auto max-w-xs">
        <p
          lang="am"
          className="font-ethiopic text-lg leading-relaxed text-moss-deep"
        >
          {invite.verse.amharic}
        </p>
        <p className="mt-3 font-body text-[0.65rem] uppercase tracking-[0.25em] text-gold-deep">
          {invite.verse.ref}
        </p>

        <div className="my-7 flex items-center justify-center gap-3 text-moss">
          <span className="h-px w-14 bg-moss/50" />
          <SmallHeart className="h-4 w-4" />
          <span className="h-px w-14 bg-moss/50" />
        </div>

        <p className="font-display text-lg italic leading-relaxed text-moss-deep">
          {invite.message}
        </p>
      </Reveal>
    </section>
  );
}
