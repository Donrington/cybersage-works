"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { EASE_OUT } from "@/lib/motion";
import { REDUCED_MOTION_QUERY, useMediaQuery } from "@/lib/useMediaQuery";

const WORDS = ["shipped", "scaled", "secured", "automated"] as const;
const LONGEST = WORDS.reduce((a, b) => (b.length > a.length ? b : a));
const FIRST_HOLD = 2800;
const HOLD = 2600;

/**
 * The last word of the hero headline, cycling through what the systems had
 * done to them. Width is reserved for the longest word (CSS ::before), so
 * nothing on the line moves. Starts as "shipped." on the server, pauses when
 * off screen, and stays still for reduced motion.
 */
export function RotatingWord({ delayMs = 0 }: { delayMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reduce = useMediaQuery(REDUCED_MOTION_QUERY);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      setIndex((i) => (i + 1) % WORDS.length);
      interval = window.setInterval(() => setIndex((i) => (i + 1) % WORDS.length), HOLD);
    }, FIRST_HOLD);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [reduce, inView]);

  const word = WORDS[index];

  return (
    <span ref={ref} className="word-mask" style={{ "--d": `${delayMs}ms` } as CSSProperties}>
      <span className="word rotator accent" data-longest={`${LONGEST}.`}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={word}
            className="rotator-word"
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-105%", opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            {word}.
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
