// Everything that changes from couple to couple lives in this one file.
// To swap photos: drop the new files into public/images/ and change the
// paths below. To add the day's schedule: fill in `schedule` and set
// `showSchedule` to true.

export const invite = {
  groom: "Tamirat",
  bride: "Megertu",

  // Wedding day. dateTimeISO drives the countdown; update it (and
  // timeNote) once the ceremony time is confirmed, e.g.
  // "2026-10-24T09:00:00+03:00" and timeNote: "Ceremony at 9:00 AM".
  date: { year: 2026, month: 10, day: 24, weekday: "Saturday" },
  dateTimeISO: "2026-10-24T00:00:00+03:00",
  timeNote: "Time to follow",

  venue: { name: "East Ayat Apostolic Church", city: "Addis Ababa" },

  verse: {
    amharic:
      "ለባሪያህ ከሠራኸው ከምሕረትህና ከእውነትህም ሁሉ ትንሽ ስንኳ የማይገባኝ ነኝ፤ በትሬን ብቻ ይዤ ይህን ዮርዳኖስን ተሻግሬ ነበርና፥ አሁን ግን የሁለት ክፍል ሠራዊት ሆንሁ።",
    ref: "ዘፍጥረት 32:10 · Genesis 32:10",
  },

  // Edit freely — this is a draft welcome message.
  message:
    "With hearts full of gratitude, we invite you to celebrate the beginning of our life together. Your love, your prayers and your presence mean the world to us, and having you beside us on this day will make it complete.",

  // Background music, started when the guest taps "Tap to open".
  // To use a different song, replace public/audio/song.mp3 (keep it
  // small — a few MB — since guests may be on mobile data).
  music: { src: "/audio/song.mp3", volume: 0.7 },

  contacts: [
    { name: "Tamirat", role: "Groom", phone: "+251925319976" },
    { name: "Megertu", role: "Bride", phone: "+251994178093" },
  ],

  // "Order of the Day". Hidden until you fill it in with the real
  // times and flip showSchedule to true.
  showSchedule: false,
  schedule: [
    // { time: "9:00 AM", label: "Ceremony at the church" },
  ],

  photos: {
    cover: { src: "/images/couple-1.jpg", position: "object-[50%_15%]", alt: "Tamirat and Megertu" },
    calendarLeft: { src: "/images/couple-2.jpg", position: "object-[50%_25%]", alt: "Tamirat and Megertu embracing by a stone wall" },
    calendarRight: { src: "/images/couple-bw-4.jpg", position: "object-[50%_30%]", alt: "Tamirat and Megertu leaning against an archway" },
    board: { src: "/images/couple-1.jpg", position: "object-[50%_15%]", alt: "Tamirat and Megertu" },
  },

  albums: [
    {
      title: "Our Portraits",
      photos: [
        { src: "/images/couple-1.jpg", alt: "Tamirat and Megertu at a stone archway", position: "object-[50%_15%]" },
        { src: "/images/couple-2.jpg", alt: "Tamirat and Megertu embracing by a stone wall", position: "object-[50%_20%]" },
        { src: "/images/couple-bw-1.jpg", alt: "Tamirat and Megertu walking, black and white" },
        { src: "/images/couple-bw-2.jpg", alt: "Tamirat and Megertu in front of the church", position: "object-[50%_25%]" },
      ],
    },
    {
      title: "A Few More Moments",
      photos: [
        { src: "/images/groom-1.jpg", alt: "Tamirat", position: "object-[50%_8%]" },
        { src: "/images/bride-1.jpg", alt: "Megertu", position: "object-[50%_8%]" },
        { src: "/images/groom-2.jpg", alt: "Tamirat in his tuxedo", position: "object-[50%_8%]" },
        { src: "/images/bride-2.jpg", alt: "Megertu smiling, close up", position: "object-[50%_15%]" },
        { src: "/images/couple-bw-4.jpg", alt: "Tamirat and Megertu leaning against an archway, black and white" },
      ],
    },
  ],
};
