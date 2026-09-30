"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { PROJECTS_BY_ID, formatNo } from "@/data/projects";
import { STUDIO_SHOTS, type StudioShot } from "@/data/studio";
import { Lightbox, type LightboxItem } from "@/components/site/Lightbox";
import { openProject } from "@/lib/events";
import { scrollToElement } from "@/lib/lenis";
import { EASE_IN_OUT } from "@/lib/motion";

const INITIAL = 12;

const numberFor = (s: StudioShot) => (s.projectId ? formatNo(PROJECTS_BY_ID[s.projectId].no) : null);

const ITEMS: LightboxItem[] = STUDIO_SHOTS.map((s) => ({
  src: s.image.src,
  width: s.image.width,
  height: s.image.height,
  alt: s.alt,
  caption: [numberFor(s), s.title].filter(Boolean).join(" "),
  projectId: s.projectId,
}));

export function StudioSheet() {
  const reduce = !!useReducedMotion();
  const [showAll, setShowAll] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  const pendingProject = useRef<string | null>(null);
  const shots = showAll ? STUDIO_SHOTS : STUDIO_SHOTS.slice(0, INITIAL);

  function toggle() {
    if (!showAll) {
      setShowAll(true);
      return;
    }
    setShowAll(false);
    const studio = document.getElementById("studio");
    if (studio) scrollToElement(studio, "start");
  }

  // Close first; jump once the viewer is gone and scrolling is unlocked.
  function goToProject(projectId: string) {
    pendingProject.current = projectId;
    setIndex(null);
  }

  function onViewerClosed() {
    const id = pendingProject.current;
    pendingProject.current = null;
    if (id) openProject(id);
  }

  return (
    <>
      <ul id="studio-sheet" className="studio-sheet mt-10 md:mt-12">
        {shots.map((s, i) => {
          const ratio = s.image.width / s.image.height;
          const no = numberFor(s);
          return (
            <li key={s.slug} className="min-w-0" style={{ flex: `${ratio} 1 calc(${ratio} * var(--row-h))` }}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Enlarge: ${s.alt}`}
                className="group block w-full cursor-zoom-in text-left"
              >
                <span
                  className="shot-ring relative block overflow-hidden bg-canvas shadow-[0_24px_48px_-32px_rgb(10_10_10/0.35)]"
                  style={{ aspectRatio: `${s.image.width} / ${s.image.height}` }}
                >
                  <Image
                    src={s.image.src}
                    alt=""
                    width={s.image.width}
                    height={s.image.height}
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-quint group-hover:scale-[1.045]"
                  />
                  {/* Reveal: a band-coloured cover drains downward, top to bottom.
                      Transform-only, so it never waits on clip-path support. */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 z-[1] origin-bottom bg-off"
                    initial={{ scaleY: 1 }}
                    whileInView={{ scaleY: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: reduce ? 0 : 0.6, ease: EASE_IN_OUT, delay: reduce ? 0 : (i % 4) * 0.05 }}
                  />
                </span>
                <span className="mt-2 flex min-w-0 items-baseline gap-2 text-xs font-medium">
                  {no && <span className="tabular text-ink-45">{no}</span>}
                  <span className="truncate text-ink-60 transition-colors duration-150 group-hover:text-ink">{s.title}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-12 flex justify-center">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={showAll}
          aria-controls="studio-sheet"
          className="inline-flex h-11 items-center rounded-full border border-ink-20 px-6 text-sm font-semibold transition-[border-color,transform] duration-150 ease-quint hover:border-ink active:scale-[0.97]"
        >
          {showAll ? "Show fewer" : `Show all ${STUDIO_SHOTS.length} screens`}
        </button>
      </div>

      <Lightbox
        items={ITEMS}
        index={index}
        onIndexChange={setIndex}
        onClose={() => setIndex(null)}
        onGoToProject={goToProject}
        onExitComplete={onViewerClosed}
        label="Studio screens"
      />
    </>
  );
}
