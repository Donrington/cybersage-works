// Lenis instance shared across client leaves (lightbox scroll lock, programmatic
// scrolls). Null when smooth scrolling is off (reduced motion, before mount).
import type Lenis from "lenis";
import { prefersReducedMotion } from "./events";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

/** Scroll an element into view through Lenis when it is running, natively otherwise. */
export function scrollToElement(el: HTMLElement, block: "start" | "center" = "start") {
  const reduce = prefersReducedMotion();
  const lenis = instance;
  if (!lenis) {
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block });
    return;
  }
  const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) * 16 || 64;
  const offset = block === "center" ? -(window.innerHeight / 2 - el.offsetHeight / 2) : -(navH + 24);
  lenis.scrollTo(el, { offset, immediate: reduce, duration: 1.2, force: true });
}
