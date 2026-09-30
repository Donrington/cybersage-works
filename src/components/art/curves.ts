// Deterministic line-art generators for the backgrounds. Pure functions, so the
// SVG is computed on the server and ships as static markup (no client JS).

export interface Curve {
  d: string;
  opacity: number;
}

/** mulberry32: tiny seeded PRNG, identical output on server and client. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Catmull-Rom spline through the points, as cubic Bézier path data. */
function smooth(points: [number, number][]) {
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(points[0][0])} ${f(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(
      p2[1] - (p3[1] - p1[1]) / 6,
    )} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

/**
 * "Lens" field: flowing lines that pinch toward a focal point, like light
 * bending through a lens. Used behind the hero portrait.
 */
export function lensField({
  width = 1440,
  height = 900,
  lines = 22,
  focusX = 0.78,
  focusY = 0.46,
  pinch = 0.55,
  spread = 0.13,
  seed = 7,
}: {
  width?: number;
  height?: number;
  lines?: number;
  focusX?: number;
  focusY?: number;
  pinch?: number;
  spread?: number;
  seed?: number;
} = {}): Curve[] {
  const r = rng(seed);
  const out: Curve[] = [];
  const fy = focusY * height;
  for (let i = 0; i < lines; i++) {
    const t = i / (lines - 1);
    const y0 = -height * 0.08 + t * height * 1.16;
    const phase = r() * Math.PI * 2;
    const freq = 0.7 + r() * 0.7;
    const amp = height * (0.03 + r() * 0.05);
    const pts: [number, number][] = [];
    for (let k = 0; k <= 12; k++) {
      const x = -width * 0.06 + (k / 12) * width * 1.12;
      const u = x / width;
      const g = Math.exp(-((u - focusX) ** 2) / (2 * spread ** 2));
      let y = y0 + amp * Math.sin(Math.PI * 2 * freq * u + phase) * (1 - 0.7 * g);
      y += (fy + (y0 - fy) * 0.18 - y) * pinch * g;
      pts.push([x, y]);
    }
    // Lines near the focus read strongest; the outer ones fade into the page.
    const centrality = 1 - Math.abs(t - focusY) * 1.6;
    out.push({ d: smooth(pts), opacity: 0.05 + 0.1 * Math.max(0, centrality) });
  }
  return out;
}

/** "Contour" field: gentle stacked waves, like a topographic map. */
export function contourField({
  width = 1440,
  height = 600,
  lines = 16,
  seed = 11,
  amplitude = 0.07,
}: {
  width?: number;
  height?: number;
  lines?: number;
  seed?: number;
  amplitude?: number;
} = {}): Curve[] {
  const r = rng(seed);
  const out: Curve[] = [];
  const phaseA = r() * Math.PI * 2;
  const phaseB = r() * Math.PI * 2;
  for (let i = 0; i < lines; i++) {
    const t = i / (lines - 1);
    const y0 = height * (0.08 + t * 0.9);
    const drift = (r() - 0.5) * 0.6;
    const pts: [number, number][] = [];
    for (let k = 0; k <= 10; k++) {
      const u = -0.05 + (k / 10) * 1.1;
      const x = u * width;
      const y =
        y0 +
        height * amplitude * Math.sin(Math.PI * 2 * (0.8 * u + t * 0.35) + phaseA + drift) +
        height * amplitude * 0.5 * Math.sin(Math.PI * 2 * (1.9 * u - t * 0.2) + phaseB);
      pts.push([x, y]);
    }
    out.push({ d: smooth(pts), opacity: 0.05 + 0.07 * Math.sin(Math.PI * t) });
  }
  return out;
}

/** "Orbit" field: concentric ellipses around a point, for section corners. */
export function orbitField({
  cx = 1200,
  cy = 120,
  rings = 12,
  start = 70,
  step = 52,
  squash = 0.62,
  seed = 3,
}: {
  cx?: number;
  cy?: number;
  rings?: number;
  start?: number;
  step?: number;
  squash?: number;
  seed?: number;
} = {}): Curve[] {
  const r = rng(seed);
  const out: Curve[] = [];
  for (let i = 0; i < rings; i++) {
    const rx = start + i * step + r() * 8;
    const ry = rx * squash;
    const tilt = (r() - 0.5) * 0.25;
    const pts: [number, number][] = [];
    for (let k = 0; k <= 24; k++) {
      const a = (k / 24) * Math.PI * 2;
      const x0 = Math.cos(a) * rx;
      const y0 = Math.sin(a) * ry;
      pts.push([cx + x0 * Math.cos(tilt) - y0 * Math.sin(tilt), cy + x0 * Math.sin(tilt) + y0 * Math.cos(tilt)]);
    }
    out.push({ d: `${smooth(pts)} Z`, opacity: 0.12 * (1 - i / rings) + 0.03 });
  }
  return out;
}
