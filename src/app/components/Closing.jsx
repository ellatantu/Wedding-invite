import { invite } from "../invite.config";
import Reveal from "./Reveal";
import { HeartOutline } from "./Ornaments";

function whatsappLink(phone) {
  // wa.me needs the number with no "+".
  return `https://wa.me/${phone.replace(/^\+/, "")}`;
}

const buttonClass =
  "border border-gold-deep px-4 py-2 font-body text-xs tracking-wide text-gold-deep transition-colors duration-300 hover:bg-gold-deep hover:text-cream focus-visible:bg-gold-deep focus-visible:text-cream";

export default function Closing() {
  return (
    <section className="px-6 pb-20 pt-14 text-center">
      <Reveal>
        <div className="relative mx-auto flex h-52 w-52 items-center justify-center text-moss">
          <HeartOutline className="absolute inset-0 h-full w-full" />
          <p className="relative -mt-2 font-script text-4xl font-bold leading-none text-moss-deep">
            We&apos;ll see
            <br />
            you there
          </p>
        </div>

        <h2 className="mt-12 font-display text-3xl italic text-moss-deep">
          Feel free to contact us
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {invite.contacts.map((c) => (
            <div key={c.name} className="flex flex-col items-center">
              <p className="font-display text-2xl text-moss-deep">{c.name}</p>
              <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-gold-deep">
                {c.role}
              </p>
              <p className="mt-2 font-body text-xs text-moss/70">{c.phone}</p>
              <div className="mt-3 flex gap-2">
                <a href={`tel:${c.phone}`} className={buttonClass}>Call</a>
                <a
                  href={whatsappLink(c.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-14 font-script text-3xl font-bold text-gold-deep">
          {invite.groom} &amp; {invite.bride}
        </p>
      </Reveal>
    </section>
  );
}
