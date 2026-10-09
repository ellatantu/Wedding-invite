export default function Details() {
  return (
    <section className="flex flex-col items-center gap-10 bg-ink px-6 py-24 text-center sm:py-32">
      <div className="flex flex-col items-center gap-2">
        <p className="font-display text-lg italic text-gold-soft">
          save the date
        </p>
        <p className="font-display text-4xl text-parchment sm:text-5xl">
          Saturday, October 24
          Afternoon 8:00 LT
        </p>
      </div>

      <div className="hairline w-32" />

      <div className="flex flex-col items-center gap-2">
        <p className="font-display text-lg italic text-gold-soft">
          the ceremony
        </p>
        <p className="font-display text-2xl text-parchment sm:text-3xl">
          East Ayat Apostolic Church
        </p>
        <a
          href="https://www.google.com/maps/search/?api=1&query=East+Ayat+Apostolic+Church+Addis+Ababa"
          target="_blank"
          rel="noreferrer"
          className="mt-1 font-body text-sm text-gold underline underline-offset-4 hover:text-gold-soft"
        >
          view on the map
        </a>
      </div>
    </section>
  );
}
