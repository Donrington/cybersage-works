import type { CSSProperties } from "react";
import type { Curve } from "./curves";

interface CurveFieldProps {
  curves: Curve[];
  viewBox: string;
  /** "load": lines draw in on first paint. "view": they draw in when scrolled into view. */
  mode?: "load" | "view";
  tone?: "ink" | "white";
  /** Extra delay before the first line starts drawing (ms). */
  delay?: number;
  className?: string;
}

/**
 * Decorative line art. Static SVG from the server; drawing in is pure CSS
 * (stroke-dashoffset on normalised path length), so it costs no client JS.
 */
export function CurveField({ curves, viewBox, mode = "load", tone = "ink", delay = 0, className = "" }: CurveFieldProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={viewBox}
      preserveAspectRatio="none"
      fill="none"
      stroke={tone === "ink" ? "#0a0a0a" : "#ffffff"}
      className={`curve-field ${mode === "load" ? "curve-load" : "curve-view"} ${className}`}
      data-reveal={mode === "view" ? "" : undefined}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {curves.map((c, i) => (
        <path key={i} d={c.d} pathLength={1} strokeOpacity={c.opacity} style={{ "--i": i } as CSSProperties} />
      ))}
    </svg>
  );
}
