import localFont from "next/font/local";
import "./globals.css";

// Self-hosted instead of fetched from Google at request time: faster for
// guests on mobile data, and no external dependency at all. Both are
// variable fonts, so one file covers every weight we use.
const cormorant = localFont({
  src: [
    { path: "./fonts/CormorantGaramond.ttf", style: "normal" },
    { path: "./fonts/CormorantGaramond-Italic.ttf", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = localFont({
  src: "./fonts/Jost.ttf",
  variable: "--font-jost",
  display: "swap",
});

// Abyssinica SIL (OFL-licensed, see fonts/LICENSE-AbyssinicaSIL.txt) — the
// only one of our three fonts that actually covers Ethiopic script glyphs,
// so the Amharic verse renders in an intentional typeface instead of
// silently falling back to whatever generic font the guest's device has.
const ethiopic = localFont({
  src: "./fonts/AbyssinicaSIL-Regular.ttf",
  variable: "--font-ethiopic",
  display: "swap",
});

// Cursive script font used only for signboard note text (Latin script) —
// gives the "smoother", handwritten feel requested for guest messages.
const tangerine = localFont({
  src: [
    { path: "./fonts/Tangerine-Regular.ttf", weight: "400" },
    { path: "./fonts/Tangerine-Bold.ttf", weight: "700" },
  ],
  variable: "--font-tangerine",
  display: "swap",
});

export const metadata = {
  title: "Wedding Invitation | October 24",
  description:
    "Join us to celebrate our wedding on Saturday, October 24, at East Ayat Apostolic Church, Addis Ababa.",
  openGraph: {
    title: "Wedding Invitation",
    description:
      "We warmly invite you to celebrate our special day.",
    url: "https://wedding-invite-plum-rho.vercel.app",
    siteName: "Wedding Invitation",
    images: [
      {
        url: "https://wedding-invite-plum-rho.vercel.app/images/wedding-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Bride and groom wedding invitation",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Invitation",
    description: "Join us to celebrate our special day.",
    images: ["https://wedding-invite-plum-rho.vercel.app/images/wedding-preview.jpg"],
  },
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${ethiopic.variable} ${tangerine.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-cream text-moss-deep font-body antialiased">
        {children}
      </body>
    </html>
  );
}
