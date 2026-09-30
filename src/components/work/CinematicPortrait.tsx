"use client";

import { getImageProps } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { REDUCED_MOTION_QUERY, useMediaQuery } from "@/lib/useMediaQuery";

const ALT = "Abakwe Carrington";

// Art direction: a widescreen still on phones and tablets, a tall portrait
// beside the headline on desktop.
const {
  props: { srcSet: tallSrcSet },
} = getImageProps({ alt: ALT, src: "/me.webp", width: 800, height: 1000, quality: 85, sizes: "(min-width: 1440px) 440px, 32vw" });
const { props: wide } = getImageProps({
  alt: ALT,
  src: "/me-wide.webp",
  width: 1392,
  height: 928,
  quality: 85,
  sizes: "(min-width: 768px) 90vw, 100vw",
  loading: "eager",
  fetchPriority: "high",
});

/**
 * The portrait as a film still: a shutter opens from the centre, the frame
 * settles from a slow push-in, then drifts against the scroll. Letterbox
 * strips, vignette and grain are layered on top. First-paint motion is CSS;
 * only the scroll parallax needs JS.
 */
export function CinematicPortrait() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useMediaQuery(REDUCED_MOTION_QUERY);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);
  const scale = useTransform(scrollYProgress, [0.45, 1], [1, reduce ? 1 : 1.09]);

  return (
    <figure ref={ref} className="cine">
      <div className="relative">
        <span aria-hidden="true" className="cine-mark cine-mark-tl" />
        <span aria-hidden="true" className="cine-mark cine-mark-tr" />
        <span aria-hidden="true" className="cine-mark cine-mark-bl" />
        <span aria-hidden="true" className="cine-mark cine-mark-br" />

        <div className="cine-frame relative aspect-[3/2] overflow-hidden bg-ink md:aspect-[16/9] lg:aspect-[4/5]">
          <motion.div className="absolute inset-[-8%]" style={{ y, scale }}>
            <picture>
              <source media="(min-width: 1024px)" srcSet={tallSrcSet} sizes="(min-width: 1440px) 440px, 32vw" />
              {/* Art-directed <picture> via getImageProps (next/image can't switch sources by media). */}
              <img {...wide} alt={ALT} className="cine-img h-full w-full object-cover object-[50%_28%]" />
            </picture>
          </motion.div>
          <span aria-hidden="true" className="cine-vignette" />
          <span aria-hidden="true" className="cine-grain" />
          <span aria-hidden="true" className="cine-bar cine-bar-top" />
          <span aria-hidden="true" className="cine-bar cine-bar-bottom" />
        </div>
      </div>

      <figcaption className="type-micro mt-3 flex items-center justify-between gap-4 text-ink-60">
        <span>Fig. 01 · Abakwe Carrington</span>
        <span className="tabular">Lagos · Remote</span>
      </figcaption>
    </figure>
  );
}
