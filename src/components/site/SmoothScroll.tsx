"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getLenis, setLenis } from "@/lib/lenis";

/** Lenis smooth scrolling. Off for reduced motion; anchors stay native (skip link). */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: true, anchors: false });
    setLenis(lenis);
    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // New page: start at the top without easing from the previous position.
  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
