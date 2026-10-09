"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { supabase, isConfigured } from "@/lib/supabaseClient";
import Reveal from "./Reveal";
import { invite } from "../invite.config";

const QUICK_PHRASES = [
  "Love",
  "Best wishes",
  "Congratulations",
  "Forever",
  "Cheers",
  "Blessings",
];

const NOTE_COLORS = [
  { id: "parchment", className: "bg-parchment" },
  { id: "gold-soft", className: "bg-gold-soft" },
  { id: "rose", className: "bg-rose" },
];

// Ethiopic Unicode block (U+1200–U+137F). A note written in Amharic
// renders in the Ethiopic-script font (Abyssinica SIL); anything else
// gets the cursive Latin script font (Tangerine).
function noteFontClass(text) {
  return /[\u1200-\u137F]/.test(text) ? "font-ethiopic" : "font-script";
}

export default function Signboard() {
  const boardRef = useRef(null);
  const [boardOpened, setBoardOpened] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHost, setIsHost] = useState(false);
  const [composer, setComposer] = useState(null); // { xPct, yPct, left, top }
  const [composerKey, setComposerKey] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState(NOTE_COLORS[0].className);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsHost(params.get("host") === "1");
  }, []);

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }
    supabase
      .from("signboard_notes")
      .select("*")
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (!error) setNotes(data);
        setLoading(false);
      });
  }, []);

  function handleBoardClick(event) {
    if (event.target.closest("[data-note]") || event.target.closest("[data-composer]")) {
      return;
    }

    const rect = boardRef.current.getBoundingClientRect();
    const xPct = ((event.clientX - rect.left) / rect.width) * 100;
    const yPct = ((event.clientY - rect.top) / rect.height) * 100;

    // These are where the note will land once posted — the composer
    // itself no longer renders at this position (see the fixed overlay
    // below), only the resulting note does.
    setComposer({ xPct, yPct });
    setComposerKey((k) => k + 1); // forces the zoom-in animation to replay
    setName("");
    setMessage("");
    setColor(NOTE_COLORS[0].className);
    setPostError(null);
  }

  async function handlePost() {
    if (!message.trim() || !name.trim() || !composer) return;
    setPosting(true);
    setPostError(null);

    // The id is generated here on the client, and we no longer chain
    // .select().single() after the insert to read the row back —
    // .single() requires exactly one row from a *second* query against
    // RLS and was the likely source of the uninformative empty error.
    // Since we already have every field (including a real id), we can
    // add the note to the board immediately without that round trip.
    const newNote = {
      id: crypto.randomUUID(),
      name: name.trim().slice(0, 60),
      message: message.trim().slice(0, 280),
      x_pct: composer.xPct,
      y_pct: composer.yPct,
      rotation: Math.random() * 16 - 8,
      color,
    };

    try {
      const { error } = await supabase.from("signboard_notes").insert(newNote);

      setPosting(false);
      if (error) {
        console.error("Signboard insert error — full object:", error);
        console.error("Signboard insert error — keys:", Object.keys(error));
        console.error("Signboard insert error — JSON:", JSON.stringify(error));
        setPostError(
          "Couldn't post that — " +
            (error.message ||
              error.hint ||
              error.details ||
              "check the browser console for details.")
        );
        return;
      }
      setNotes((prev) => [...prev, newNote]);
      setComposer(null);
    } catch (err) {
      setPosting(false);
      console.error("Signboard insert threw:", err);
      setPostError(
        "Couldn't reach the database — check that your Supabase project isn't paused."
      );
    }
  }

  // --- Compact teaser card (shown before the guest taps in) ---
  if (!boardOpened) {
    return (
      <section className="bg-ink px-6 py-20 sm:py-28">
        <Reveal className="mx-auto max-w-sm">
          <div className="signboard-texture overflow-hidden rounded-md bg-board p-5 ring-1 ring-gold/20">
            <p className="font-display text-xl italic text-parchment">
              Digital signboard
            </p>
            <p className="mt-1 font-body text-xs text-parchment/60">
              Leave us your heartfelt wishes or messages here
            </p>

            <div className="relative mx-auto mt-4 h-32 w-24 overflow-hidden rounded-sm ring-1 ring-gold/40">
              <Image
                src={invite.photos.board.src}
                alt={invite.photos.board.alt}
                fill
                sizes="150px"
                className={`object-cover ${invite.photos.board.position}`}
              />
            </div>

            <p className="mt-4 font-display text-lg text-parchment">
              Tamirat &amp; Megertu&apos;s Board
            </p>
            <p className="mt-1 font-body text-xs text-parchment/60">
              Add your voice to the wall of wishes — drop a message
            </p>

            <button
              type="button"
              onClick={() => setBoardOpened(true)}
              className="mt-5 w-full border border-gold py-2.5 font-body text-sm tracking-wide text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
            >
              Write your wishes
            </button>
          </div>
        </Reveal>
      </section>
    );
  }

  // --- Full interactive board ---
  return (
    <section className="signboard-print-section bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center print:max-w-none">
        <button
          type="button"
          onClick={() => setBoardOpened(false)}
          className="mb-6 font-body text-xs tracking-wide text-gold-soft hover:text-gold print:hidden"
        >
          ← Back
        </button>

        <h2 className="font-display text-3xl italic text-parchment sm:text-4xl print:hidden">
          Tap anywhere to leave a note
        </h2>

        {!isConfigured && (
          <p className="mx-auto mt-4 max-w-md text-sm text-rose print:hidden">
            Signboard isn&apos;t connected to a database yet — see
            .env.local.example to finish setup.
          </p>
        )}

        {/* Outer: sizing/positioning context only, NOT clipped, so the
            composer can pop out past the board's edge without being
            cut off. */}
        <div
          ref={boardRef}
          onClick={handleBoardClick}
          className="signboard-print-board relative mx-auto mt-10 aspect-[4/5] w-full max-w-md cursor-crosshair"
        >
          {/* Inner: the visual card itself — THIS is what gets clipped
              to rounded corners, never the composer. */}
          <div
            className="signboard-texture absolute inset-0 overflow-hidden rounded-sm bg-board shadow-[0_0_0_1px_rgba(184,146,63,0.3)]"
            data-signboard-print
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-24 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm ring-2 ring-gold/50 sm:h-44 sm:w-32 print:h-80 print:w-56">
              <Image
                src={invite.photos.board.src}
                alt={invite.photos.board.alt}
                fill
                priority
                sizes="200px"
                className={`object-cover ${invite.photos.board.position}`}
              />
            </div>

            {!loading && notes.length === 0 && !composer && (
              <p className="pointer-events-none absolute bottom-6 left-1/2 w-full -translate-x-1/2 px-6 text-center font-body text-xs text-parchment/50">
                Tap on an empty space to start writing
              </p>
            )}

            {notes.map((note) => (
              <div
                key={note.id}
                data-note
                style={{
                  left: `${note.x_pct}%`,
                  top: `${note.y_pct}%`,
                  transform: `translate(-50%, -50%) rotate(${note.rotation}deg)`,
                }}
                className={`absolute w-28 rounded-sm px-3 py-2 text-left shadow-md sm:w-32 print:w-44 print:px-4 print:py-3 ${note.color}`}
              >
                <p
                  lang={noteFontClass(note.message) === "font-ethiopic" ? "am" : undefined}
                  className={`${noteFontClass(note.message)} text-base leading-snug text-bottle break-words print:text-2xl`}
                >
                  {note.message}
                </p>
                <p className="mt-1 font-body text-[0.6rem] text-bottle/70">
                  — {note.name}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Composer: a fixed, centered overlay rather than positioned at
            the tap point. Tap-anchored positioning kept failing in
            practice — near the bottom of a tall board, the mobile
            keyboard covers the lower half of the screen, which hid the
            Post button behind it even though it rendered correctly.
            Centering it near the top of the viewport keeps it clear of
            the keyboard on effectively every phone. The resulting note
            still lands exactly where you tapped (composer.xPct/yPct) —
            only the writing step itself is now screen-anchored. */}
        {composer && (
          <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-ink/60 px-4 pt-20 sm:pt-32"
            onClick={() => setComposer(null)}
          >
            <div
              key={composerKey}
              data-composer
              className="animate-composer-in w-full max-w-sm rounded-sm bg-ink p-4 text-left shadow-xl ring-1 ring-gold/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {NOTE_COLORS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      aria-label={`Use ${c.id} note color`}
                      onClick={() => setColor(c.className)}
                      className={`h-5 w-5 rounded-full ${c.className} ${
                        color === c.className
                          ? "ring-2 ring-gold ring-offset-2 ring-offset-ink"
                          : ""
                      }`}
                    />
                  ))}
                </div>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  maxLength={60}
                  className="min-w-0 flex-1 border-b border-gold/30 bg-transparent py-1 font-body text-sm text-parchment placeholder:text-parchment/40 focus:border-gold focus:outline-none"
                />
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your wish on the board..."
                maxLength={280}
                rows={3}
                className={`mt-3 w-full resize-none border-b border-gold/30 bg-transparent py-1 text-xl text-parchment placeholder:text-base placeholder:text-parchment/40 focus:border-gold focus:outline-none ${noteFontClass(
                  message || "a"
                )}`}
              />

              <div className="mt-2 flex flex-wrap gap-1">
                {QUICK_PHRASES.map((phrase) => (
                  <button
                    key={phrase}
                    type="button"
                    onClick={() =>
                      setMessage((m) => (m ? `${m} ${phrase}` : phrase))
                    }
                    className="rounded-full border border-gold/40 px-2 py-0.5 font-body text-[0.65rem] text-gold-soft transition-colors hover:bg-gold hover:text-ink"
                  >
                    {phrase}
                  </button>
                ))}
              </div>

              {postError && (
                <p className="mt-2 font-body text-xs text-rose">{postError}</p>
              )}

              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setComposer(null)}
                  className="font-body text-xs text-parchment/60 hover:text-parchment"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePost}
                  disabled={posting || !isConfigured}
                  className="rounded-sm bg-gold px-3 py-1 font-body text-xs text-ink transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  {posting ? "Posting…" : "Post"}
                </button>
              </div>
            </div>
          </div>
        )}

        {isHost && (
          <button
            type="button"
            onClick={() => window.print()}
            className="mt-6 border border-gold px-6 py-2.5 font-body text-sm tracking-wide text-gold transition-colors duration-300 hover:bg-gold hover:text-ink print:hidden"
          >
            Print this board (host only)
          </button>
        )}
      </div>
    </section>
  );
}
