"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode, RefObject } from "react";

const QUIET = "rgba(10, 10, 10, 0.6)";
const INK = "rgba(10, 10, 10, 1)";

/**
 * The key sentence of a quote inks in word by word as the quote scrolls up
 * through the viewport. Reduced motion: CSS pins every word to full ink.
 */
export function InkText({ text, targetRef }: { text: string; targetRef: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <InkWord key={i} progress={scrollYProgress} from={i / words.length} to={(i + 1) / words.length}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </InkWord>
      ))}
    </>
  );
}

function InkWord({ progress, from, to, children }: { progress: MotionValue<number>; from: number; to: number; children: ReactNode }) {
  const color = useTransform(progress, [from, to], [QUIET, INK]);
  return (
    <motion.span className="ink-word" style={{ color }}>
      {children}
    </motion.span>
  );
}
