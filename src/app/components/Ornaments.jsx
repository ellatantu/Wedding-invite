// Simple SVG ornaments drawn for this project (not taken from any
// template). They inherit color from the surrounding text color.

export function Sprig({ className = "" }) {
  const leaves = [
    { x: 22, y: 78, r: -50 },
    { x: 30, y: 62, r: 25 },
    { x: 44, y: 52, r: -60 },
    { x: 55, y: 38, r: 15 },
    { x: 70, y: 28, r: -65 },
    { x: 80, y: 14, r: 5 },
  ];
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M12 92 C 30 66, 52 44, 88 8"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      {leaves.map((l, i) => (
        <ellipse
          key={i}
          cx={l.x}
          cy={l.y}
          rx="9"
          ry="3.6"
          fill="currentColor"
          opacity="0.85"
          transform={`rotate(${l.r} ${l.x} ${l.y})`}
        />
      ))}
    </svg>
  );
}

export function HeartOutline({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 90 C 8 58, 6 28, 29 19 C 41 15, 50 23, 50 33 C 50 23, 59 15, 71 19 C 94 28, 92 58, 50 90 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SmallHeart({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 21 C 3 14, 2 8, 6.5 6 C 9 5, 11 6.5, 12 8.5 C 13 6.5, 15 5, 17.5 6 C 22 8, 21 14, 12 21 Z"
        fill="currentColor"
      />
    </svg>
  );
}
