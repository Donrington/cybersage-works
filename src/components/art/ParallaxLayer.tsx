"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { REDUCED_MOTION_QUERY, useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Full-bleed background layer that drifts slower than the page and fades as
 * its section scrolls away. Children are server-rendered art.
 */
export function ParallaxLayer({ children, distance = 140, className = "" }: { children: ReactNode; distance?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useMediaQuery(REDUCED_MOTION_QUERY);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : distance]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.15]);

  return (
    <div ref={ref} aria-hidden="true" className={`fade-mask-b pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        {children}
      </motion.div>
    </div>
  );
}
