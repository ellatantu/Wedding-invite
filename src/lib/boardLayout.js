// Places signboard notes on a poster-shaped board (2:3, like a 60 x 90 cm
// sign) so they never overlap each other, never cover the couple's photo,
// and never run off the edge.
//
// Each note's saved position (x_pct / y_pct) is only a *preferred* spot,
// where the guest tapped. Notes are placed in order of posting, so earlier
// ones keep their place and later ones are nudged to the nearest free spot.
//
// If the board fills up, notes shrink in small steps to fit (down to
// MIN_SCALE) so the poster keeps its 2:3 shape. Only past that does the
// board grow taller. Nothing here changes what is stored in the database.

export const BASE_ASPECT = 1.5; // board height = width * 1.5  (60 x 90)

const STEPS = 20; // note scale is quantised to 1/20ths, so it changes rarely
const MIN_STEP = 4; // smallest scale = 4/20 = 0.2 (about 140 notes fit)

export function layoutNotes({ width, notes, sizes, photo }) {
  const W = width;
  const baseH = W * BASE_ASPECT;
  const photoCy = baseH / 2;

  // Spacing is relative to the board width, so the layout is identical
  // at any size, including the printed one.
  const EDGE = W * 0.025;
  const GAP = W * 0.02;
  const TILT = W * 0.02; // allowance for each note's slight rotation

  // `sizes` are each note's natural size (before shrinking), in px.
  // allowGrow=false keeps every note inside the poster (fails if one can't
  // fit). allowGrow=true is the last resort: notes may extend below it.
  function place(scale, allowGrow) {
    const placed = [
      {
        l: W / 2 - photo.w / 2 - GAP,
        r: W / 2 + photo.w / 2 + GAP,
        t: photoCy - photo.h / 2 - GAP,
        b: photoCy + photo.h / 2 + GAP,
      },
    ];
    const hits = (a) =>
      placed.some((b) => a.l < b.r && a.r > b.l && a.t < b.b && a.b > b.t);

    const centers = {};
    let bottom = baseH;

    for (const note of notes) {
      const size = sizes[note.id] || { w: W * 0.16, h: W * 0.1 };
      const hw = (size.w * scale) / 2 + TILT;
      const hh = (size.h * scale) / 2 + TILT;

      const minX = EDGE + hw;
      const maxX = Math.max(minX, W - EDGE - hw);
      const clampX = (x) => Math.min(Math.max(x, minX), maxX);
      const minY = EDGE + hh;
      const maxY = Math.max(minY, baseH - EDGE - hh);
      const clampY = (y) =>
        allowGrow ? Math.max(y, minY) : Math.min(Math.max(y, minY), maxY);
      const rectAt = (cx, cy) => ({ l: cx - hw, r: cx + hw, t: cy - hh, b: cy + hh });

      const wantX = clampX((note.x_pct / 100) * W);
      const wantY = clampY((note.y_pct / 100) * baseH);

      let spot = hits(rectAt(wantX, wantY)) ? null : { cx: wantX, cy: wantY };

      // Taken: search outward in widening rings for the nearest free spot.
      if (!spot) {
        const ring = Math.max(W * 0.04, 6);
        const maxRadius = Math.max(W, baseH) * 1.5;
        search: for (let r = ring; r <= maxRadius; r += ring) {
          const steps = Math.max(10, Math.round((2 * Math.PI * r) / (ring * 1.5)));
          for (let k = 0; k < steps; k++) {
            const angle = (2 * Math.PI * k) / steps;
            const cx = clampX(wantX + r * Math.cos(angle));
            const cy = clampY(wantY + r * Math.sin(angle));
            if (!hits(rectAt(cx, cy))) {
              spot = { cx, cy };
              break search;
            }
          }
        }
      }

      if (!spot) {
        if (!allowGrow) return null; // doesn't fit on the poster at this size
        // Safety net: put it below everything else.
        const lowest = Math.max(...placed.map((p) => p.b));
        spot = { cx: wantX, cy: lowest + GAP + hh };
      }

      const rect = rectAt(spot.cx, spot.cy);
      placed.push(rect);
      bottom = Math.max(bottom, rect.b + EDGE);
      centers[note.id] = spot;
    }
    return { centers, bottom };
  }

  // Largest scale (in steps) at which everything fits on the poster.
  const fits = (step) => place(step / STEPS, false) !== null;
  let step = STEPS;
  if (!fits(STEPS)) {
    if (!fits(MIN_STEP)) {
      step = MIN_STEP; // too many notes even at the smallest size: board grows
    } else {
      let lo = MIN_STEP; // fits
      let hi = STEPS; // doesn't fit
      while (hi - lo > 1) {
        const mid = Math.floor((lo + hi) / 2);
        if (fits(mid)) lo = mid;
        else hi = mid;
      }
      step = lo;
    }
  }

  const scale = step / STEPS;
  const { centers, bottom } = place(scale, step === MIN_STEP && !fits(MIN_STEP)) ?? place(scale, true);
  const height = Math.max(baseH, bottom);

  const positions = {};
  for (const id of Object.keys(centers)) {
    positions[id] = {
      left: (centers[id].cx / W) * 100,
      top: (centers[id].cy / height) * 100,
    };
  }

  return {
    positions,
    height,
    ratio: height / W,
    scale,
    photoTopPct: (photoCy / height) * 100,
  };
}
