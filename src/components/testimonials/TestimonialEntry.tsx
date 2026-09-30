"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import type { Testimonial, TestimonialSource } from "@/data/testimonials";
import { Expand } from "@/components/site/Icons";
import { Lightbox, type LightboxItem } from "@/components/site/Lightbox";
import { EASE_OUT } from "@/lib/motion";
import { InkText } from "./InkText";

const SOURCE_LABEL: Record<TestimonialSource, string> = {
  Client: "Client",
  LinkedIn: "LinkedIn",
  Upwork: "Upwork",
};

/** Short tab names for entries with more than one proof. */
const TAB_LABEL: Record<string, string> = {
  "Client message": "Message",
  "Published testimonial": "Published",
};

function splitQuote(quote: string, highlight: string) {
  const at = quote.indexOf(highlight);
  if (at < 0) return { before: quote, match: "", after: "" };
  return { before: quote.slice(0, at), match: highlight, after: quote.slice(at + highlight.length) };
}

/**
 * One testimonial: verbatim quote (key sentence in full ink), attribution,
 * and the original screenshot beside it as evidence.
 */
export function TestimonialEntry({ t }: { t: Testimonial }) {
  const reduce = !!useReducedMotion();
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const [tab, setTab] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);
  const proof = t.proofs[tab];
  const { before, match, after } = splitQuote(t.quote, t.highlight);
  const attribution = t.company ? `${t.role}, ${t.company}` : t.role;
  const panelId = `proof-${t.id}`;

  const items: LightboxItem[] = t.proofs.map((p) => ({
    src: p.src,
    width: p.width,
    height: p.height,
    alt: p.alt,
    caption: `${t.name}: ${p.label}`,
  }));

  function onTabKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (tab + (e.key === "ArrowRight" ? 1 : -1) + t.proofs.length) % t.proofs.length;
    setTab(next);
    (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
  }

  return (
    <motion.article
      aria-labelledby={`t-${t.id}`}
      className="grid grid-cols-1 gap-y-6 md:grid-cols-8 md:gap-x-5 lg:grid-cols-12 lg:gap-x-6"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    >
      <div className="flex items-center gap-4 md:col-span-8 lg:col-span-2 lg:flex-col lg:items-start lg:gap-5">
        <p className="text-[0.8125rem] font-semibold text-ink-60">{SOURCE_LABEL[t.source]}</p>
        {t.logo && (
          <Image
            src={t.logo.src}
            alt={t.company ?? ""}
            width={t.logo.width}
            height={t.logo.height}
            className="h-7 w-auto max-w-28 object-contain object-left opacity-85 brightness-0"
          />
        )}
      </div>

      <div className="md:col-span-8 lg:col-span-6">
        <blockquote className="type-quote text-ink-60">
          <p ref={quoteRef} className="-indent-[0.42em]">
            “{before}
            <InkText text={match} targetRef={quoteRef} />
            {after}”
          </p>
        </blockquote>
        <div className="mt-6">
          <p id={`t-${t.id}`} className="text-base font-bold">
            {t.name}
          </p>
          <p className="mt-0.5 text-sm font-medium text-ink-60">{attribution}</p>
        </div>
      </div>

      <div className="md:col-span-8 lg:col-span-4">
        <div className="md:max-w-[420px] lg:max-w-none">
          <div id={panelId} role={t.proofs.length > 1 ? "tabpanel" : undefined}>
            {/* Mouse shortcut; keyboard users get the "View original" button below. */}
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => setViewer(tab)}
              className="relative block aspect-[4/5] max-h-[70dvh] w-full cursor-zoom-in bg-off"
            >
              <AnimatePresence initial={false}>
                <motion.span
                  key={proof.src}
                  className="absolute inset-5 flex items-center justify-center sm:inset-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: EASE_OUT }}
                >
                  <Image
                    src={proof.src}
                    alt={proof.alt}
                    width={proof.width}
                    height={proof.height}
                    sizes="(min-width: 1024px) 28vw, (min-width: 768px) 420px, 90vw"
                    className="h-auto max-h-full w-auto max-w-full outline outline-1 -outline-offset-1 outline-ink-06"
                  />
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            {t.proofs.length > 1 ? (
              <div role="tablist" aria-label={`Proof for ${t.name}'s testimonial`} className="flex items-center gap-5">
                {t.proofs.map((p, i) => (
                  <button
                    key={p.src}
                    type="button"
                    role="tab"
                    aria-selected={i === tab}
                    aria-controls={panelId}
                    tabIndex={i === tab ? 0 : -1}
                    onClick={() => setTab(i)}
                    onKeyDown={onTabKey}
                    className={`min-h-11 text-[0.8125rem] font-semibold decoration-[1.5px] underline-offset-[6px] transition-colors duration-150 ${
                      i === tab ? "text-ink underline" : "text-ink-60 hover:text-ink"
                    }`}
                  >
                    {TAB_LABEL[p.label] ?? p.label}
                  </button>
                ))}
              </div>
            ) : (
              <p className="type-meta text-ink-60">{proof.label}</p>
            )}
            <button
              type="button"
              onClick={() => setViewer(tab)}
              className="inline-flex min-h-11 items-center gap-1.5 text-[0.8125rem] font-semibold decoration-[1.5px] underline-offset-[6px] hover:underline"
            >
              <Expand size={14} />
              View original
              <span className="sr-only">: {proof.label.toLowerCase()} from {t.name}</span>
            </button>
          </div>
        </div>
      </div>

      <Lightbox
        items={items}
        index={viewer}
        onIndexChange={setViewer}
        onClose={() => setViewer(null)}
        label={`Proof for ${t.name}'s testimonial`}
      />
    </motion.article>
  );
}
