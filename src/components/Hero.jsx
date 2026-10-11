import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-end justify-center overflow-hidden">
      <Image
        src="/images/couple-2.jpg"
        alt="Tamirat and Megertu together at their photoshoot"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_20%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10"
      />

      <div className="relative z-10 flex flex-col items-center gap-3 px-6 pb-16 text-center sm:pb-24">
        <p className="font-display text-lg italic text-gold-soft sm:text-xl">
          the wedding of
        </p>
        <h1 className="font-display text-5xl leading-tight text-parchment sm:text-7xl">
          Tamirat <span className="text-gold">&amp;</span> Megertu
        </h1>
        <div className="hairline mt-4 w-24" />
        <p className="font-body text-sm tracking-wide text-parchment/80 sm:text-base">
          Saturday, October 24 &middot; East Ayat Apostolic Church
        </p>
      </div>
    </section>
  );
}
