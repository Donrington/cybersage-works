"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { DUR, EASE_DRAWER, EASE_OUT } from "@/lib/motion";
import { CaretLeft, CaretRight, Close } from "./Icons";

export interface LightboxItem {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Visible caption, e.g. "12 Anoc.ng". */
  caption: string;
  /** Set on studio screens so the viewer can jump to the project row. */
  projectId?: string | null;
}

interface LightboxProps {
  items: LightboxItem[];
  /** Index of the open item, or null when closed. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  /** When set, items with a projectId get a "Go to project" link. */
  onGoToProject?: (projectId: string) => void;
  /** Accessible name of the dialog. */
  label: string;
}

const noopSubscribe = () => () => {};

/**
 * Modal image viewer shared by the studio sheet, the index rows and the
 * testimonial proofs. Controlled: the parent owns `index`.
 */
export function Lightbox(props: LightboxProps) {
  // Portals need document; render nothing on the server and during hydration.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>{props.index !== null && <LightboxDialog key="lightbox" {...props} index={props.index} />}</AnimatePresence>,
    document.body,
  );
}

function LightboxDialog({ items, index, onIndexChange, onClose, onGoToProject, label }: LightboxProps & { index: number }) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const item = items[index];
  const many = items.length > 1;

  const go = (delta: 1 | -1) => {
    if (!many) return;
    setDir(delta);
    onIndexChange((index + delta + items.length) % items.length);
  };

  // Keep the latest handlers reachable from the one-time key listener.
  const goRef = useRef(go);
  const closeHandlerRef = useRef(onClose);
  useEffect(() => {
    goRef.current = go;
    closeHandlerRef.current = onClose;
  });

  // Open: remember the trigger, lock scroll, focus the close button.
  // Close: unlock, and give focus back unless something outside took it.
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const scrollbar = window.innerWidth - html.clientWidth;
    const prev = { overflow: html.style.overflow, paddingRight: html.style.paddingRight };
    html.style.overflow = "hidden";
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeHandlerRef.current();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goRef.current(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goRef.current(-1);
      } else if (e.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]'),
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    const dialog = dialogRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prev.overflow;
      html.style.paddingRight = prev.paddingRight;
      const now = document.activeElement;
      if (!now || now === document.body || dialog?.contains(now)) trigger?.focus({ preventScroll: true });
    };
  }, []);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x < -60 || velocity.x < -400) go(1);
    else if (offset.x > 60 || velocity.x > 400) go(-1);
  };

  const fade = { duration: reduce ? 0.12 : DUR.state, ease: EASE_OUT };

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="on-ink fixed inset-0 z-50 flex flex-col bg-ink/94 text-on-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduce ? 0.12 : 0.16 } }}
      transition={fade}
    >
      <div className="flex justify-end p-3 sm:p-5">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid size-11 place-items-center rounded-full bg-white/10 transition-colors duration-150 hover:bg-white/20"
        >
          <Close size={20} />
        </button>
      </div>

      {/* Stage: clicking the empty scrim closes; the image itself does not. */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 sm:px-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <AnimatePresence initial={false} mode="popLayout" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            className="flex max-h-full items-center justify-center"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 24, scale: 1 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -24 }}
            transition={{ duration: reduce ? 0.12 : 0.18, ease: EASE_OUT }}
            drag={many && !reduce ? "x" : false}
            dragSnapToOrigin
            dragElastic={0.2}
            onDragEnd={onDragEnd}
          >
            <motion.div
              initial={reduce ? false : { scale: 0.96 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.24, ease: EASE_DRAWER }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(min-width: 1024px) 88vw, 100vw"
                quality={85}
                loading="eager"
                draggable={false}
                className="block h-auto max-h-[calc(100dvh-10.5rem)] w-auto max-w-[min(88vw,1600px)] select-none"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-4 p-3 sm:p-5">
        <div className="type-meta min-w-0 text-on-ink-60">
          <p className="truncate text-on-ink">{item.caption}</p>
          <p className="tabular" aria-live="polite">
            {index + 1} of {items.length}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {onGoToProject && item.projectId && (
            <button
              type="button"
              onClick={() => onGoToProject(item.projectId as string)}
              className="mr-2 inline-flex min-h-11 items-center text-sm font-semibold decoration-[1.5px] underline-offset-[6px] hover:underline"
            >
              Go to project
            </button>
          )}
          {many && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous screen"
                className="grid size-11 place-items-center rounded-full bg-white/10 transition-colors duration-150 hover:bg-white/20"
              >
                <CaretLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next screen"
                className="grid size-11 place-items-center rounded-full bg-white/10 transition-colors duration-150 hover:bg-white/20"
              >
                <CaretRight size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
