"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PROJECTS_BY_ID, formatNo } from "@/data/projects";
import { EASE_OUT } from "@/lib/motion";

export interface PlateState {
  id: string;
  /** Reading direction of the last change: 1 = down the list, -1 = up. */
  dir: 1 | -1;
  /** Pointer crossed rows <100ms apart: swap without the wipe. */
  instant: boolean;
}

export const PLATE_SIZES = "(min-width: 1440px) 540px, 38vw";

const duration = (s: PlateState, reduce: boolean) => (s.instant ? 0 : reduce ? 0.12 : 0.26);

/**
 * The Index Plate. The hovered or focused project's screenshot wipes in, in
 * the direction you are reading. The wipe is a mask made of two opposite
 * translations (frame moves in, image moves back), so it stays on the
 * compositor and never depends on clip-path interpolation. Decorative
 * duplicate of the row content, so it is hidden from assistive tech.
 */
export function IndexPlate({ plate }: { plate: PlateState }) {
  const reduce = !!useReducedMotion();
  const p = PROJECTS_BY_ID[plate.id];
  const transition = { duration: duration(plate, reduce), ease: EASE_OUT };

  return (
    <div aria-hidden="true" className="sticky top-[calc(var(--nav-h)+2rem)] bg-off p-5 xl:p-6">
      <div className="shot-ring relative aspect-[16/9] overflow-hidden bg-canvas">
        <AnimatePresence initial={false} custom={plate}>
          <motion.div
            key={plate.id}
            custom={plate}
            className="absolute inset-0 overflow-hidden"
            variants={{
              enter: (s: PlateState) => (reduce ? { opacity: 0, zIndex: 2 } : { y: s.dir > 0 ? "100%" : "-100%", zIndex: 2 }),
              center: { y: "0%", opacity: 1, zIndex: 2 },
              // The outgoing image stays underneath until the incoming one lands.
              exit: (s: PlateState) => ({
                zIndex: 1,
                opacity: 0,
                transition: { delay: duration(s, reduce), duration: 0 },
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            <motion.div
              custom={plate}
              className="absolute inset-0"
              variants={{
                enter: (s: PlateState) => (reduce ? {} : { y: s.dir > 0 ? "-100%" : "100%", scale: 1.03 }),
                center: { y: "0%", scale: 1 },
              }}
              transition={transition}
            >
              <Image src={p.cover.src} alt="" fill sizes={PLATE_SIZES} className="object-cover object-top" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        key={p.id}
        className="mt-5 min-h-[10.5rem]"
        initial={plate.instant ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.16, ease: EASE_OUT }}
      >
        <p className="flex items-baseline gap-3">
          <span className="tabular type-meta text-ink-60">{formatNo(p.no)}</span>
          <span className="text-xl font-bold tracking-[-0.015em]">{p.name}</span>
        </p>
        <p className="mt-2 line-clamp-4 text-[0.9375rem] font-medium leading-[1.55] text-ink-60">{p.tagline}</p>
        <p className="type-meta mt-3 text-ink-60">{p.stack.join(", ")}</p>
      </motion.div>
    </div>
  );
}
