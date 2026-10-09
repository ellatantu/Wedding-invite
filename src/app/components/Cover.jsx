import Image from "next/image";
import { invite } from "../invite.config";
import { Sprig } from "./Ornaments";

export default function Cover({ isOpen }) {
  const { cover } = invite.photos;
  const reveal = (delay) =>
    `transition-all duration-1000 ease-out ${delay} ${
      isOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
    }`;

  return (
    <section className="relative overflow-hidden px-6 pb-14 pt-16 text-center">
      <div className={`relative mx-auto w-72 ${reveal("delay-200")}`}>
        <Sprig className="absolute -left-10 -top-9 h-24 w-24 -rotate-12 text-moss" />
        <Sprig className="absolute -bottom-9 -right-10 h-24 w-24 rotate-[168deg] text-moss" />

        <div className="border-4 border-double border-gold bg-cream-warm px-6 py-7">
          <p className="font-body text-[0.65rem] uppercase tracking-[0.35em] text-moss">
            The wedding of
          </p>
          <h1 className="mt-2 font-script text-6xl font-bold leading-[0.85] text-gold-deep">
            {invite.groom}
            <span className="my-1 block text-4xl text-gold">&amp;</span>
            {invite.bride}
          </h1>
        </div>
      </div>

      <div className={`mx-auto mt-10 w-64 ${reveal("delay-500")}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-full border-2 border-gold p-1.5">
          <div className="relative h-full w-full overflow-hidden rounded-t-full">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              priority
              sizes="256px"
              className={`object-cover ${cover.position}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
