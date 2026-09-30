"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribe to a CSS media query. Returns `false` on the server and during
 * hydration, so anything gated on it must also be safe to render without it
 * (layout is always CSS-driven; this only decides client behaviour).
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Mouse / trackpad at desktop width: the index plate is live. */
export const PLATE_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
