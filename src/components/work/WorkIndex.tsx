"use client";

import Image, { getImageProps } from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { GROUPS, PROJECTS, PROJECTS_BY_ID, formatNo, type Project, type ProjectGroup } from "@/data/projects";
import { shotsForProject } from "@/data/studio";
import { ArrowUpRight, Expand, GitHub, Plus } from "@/components/site/Icons";
import { Lightbox, type LightboxItem } from "@/components/site/Lightbox";
import { OPEN_PROJECT_EVENT } from "@/lib/events";
import { scrollToElement } from "@/lib/lenis";
import { EASE_DRAWER, EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { LINKS } from "@/lib/site";
import { PLATE_QUERY, useMediaQuery } from "@/lib/useMediaQuery";
import { IndexPlate, PLATE_SIZES, type PlateState } from "./IndexPlate";

type Filter = "all" | ProjectGroup;

const FILTERS: { id: Filter; label: string; count: number }[] = [
  { id: "all", label: "All", count: PROJECTS.length },
  ...GROUPS.map((g) => ({ id: g.id, label: g.label, count: PROJECTS.filter((p) => p.group === g.id).length })),
];

/** Shared by the table header and every row, so columns always line up. */
const ROW_GRID =
  "grid items-baseline gap-x-3 grid-cols-[2.25rem_minmax(0,1fr)_1rem] md:grid-cols-[2.5rem_minmax(0,1fr)_11rem_3rem_1rem] lg:grid-cols-[3rem_minmax(0,1fr)_10rem_3.5rem_1rem] xl:grid-cols-[3rem_minmax(0,1fr)_13rem_3.5rem_1rem]";

/** Left inset of the expanded panel: aligns with the Name column. */
const PANEL_INSET = "pl-[3rem] md:pl-[3.25rem] lg:pl-[3.75rem]";

const OUTLINE_PILL =
  "inline-flex h-10 items-center gap-2 rounded-full border border-ink-20 px-[18px] text-sm font-semibold transition-[border-color,transform] duration-150 ease-quint hover:border-ink active:scale-[0.97]";

function groupByYear(list: Project[]): [number, Project[]][] {
  const map = new Map<number, Project[]>();
  for (const p of list) map.set(p.year, [...(map.get(p.year) ?? []), p]);
  return [...map.entries()];
}

function projectScreens(p: Project): LightboxItem[] {
  return shotsForProject(p.id).map((s) => ({
    src: s.image.src,
    width: s.image.width,
    height: s.image.height,
    alt: s.alt,
    caption: `${formatNo(p.no)} ${p.name}`,
  }));
}

export function WorkIndex() {
  const reduce = !!useReducedMotion();
  const canPlate = useMediaQuery(PLATE_QUERY);
  const rootRef = useRef<HTMLDivElement>(null);
  const lastChange = useRef(0);
  const leaveTimer = useRef<number | undefined>(undefined);

  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [plate, setPlate] = useState<PlateState>({ id: PROJECTS[0].id, dir: 1, instant: true });
  const [engaged, setEngaged] = useState(false);
  const [flashId, setFlashId] = useState<string | null>(null);
  const [viewer, setViewer] = useState<{ items: LightboxItem[]; index: number } | null>(null);

  const visible = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.group === filter);
  const years = groupByYear(visible);

  /** `at` is the triggering event's timeStamp (ms), used for the fast-scrub rule. */
  function activate(id: string, at: number) {
    if (id === plate.id) return;
    const instant = at - lastChange.current < 100;
    lastChange.current = at;
    setPlate({ id, dir: PROJECTS_BY_ID[id].no > PROJECTS_BY_ID[plate.id].no ? 1 : -1, instant });
  }

  function engage() {
    window.clearTimeout(leaveTimer.current);
    setEngaged(true);
  }

  function disengage() {
    window.clearTimeout(leaveTimer.current);
    leaveTimer.current = window.setTimeout(() => setEngaged(false), 120);
  }

  function changeFilter(next: Filter) {
    if (next === filter) return;
    setFilter(next);
    const first = next === "all" ? PROJECTS[0] : PROJECTS.find((p) => p.group === next);
    if (first) setPlate({ id: first.id, dir: 1, instant: true });
    if (openId && next !== "all" && PROJECTS_BY_ID[openId].group !== next) setOpenId(null);
  }

  // The studio lightbox's "Go to project" lands here: show, open, focus, flash.
  useEffect(() => {
    const timers: number[] = [];
    function onOpen(e: Event) {
      const id = (e as CustomEvent<string>).detail;
      const p = PROJECTS_BY_ID[id];
      if (!p) return;
      setFilter((f) => (f === "all" || f === p.group ? f : "all"));
      setOpenId(id);
      setPlate((prev) => ({ id, dir: p.no > PROJECTS_BY_ID[prev.id].no ? 1 : -1, instant: true }));
      setFlashId(id);
      timers.push(
        window.setTimeout(() => {
          const row = document.getElementById(`row-${id}`);
          if (!row) return;
          row.focus({ preventScroll: true });
          scrollToElement(row, "center");
        }, 60),
        window.setTimeout(() => setFlashId((cur) => (cur === id ? null : cur)), 1400),
      );
    }
    window.addEventListener(OPEN_PROJECT_EVENT, onOpen);
    return () => {
      window.removeEventListener(OPEN_PROJECT_EVENT, onOpen);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  // Warm every plate image once the index is near, so the wipe never shows
  // an empty frame. Same src/sizes as the plate, so the browser reuses them.
  useEffect(() => {
    if (!canPlate) return;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        io.disconnect();
        for (const p of PROJECTS) {
          const { props } = getImageProps({ src: p.cover.src, alt: "", fill: true, sizes: PLATE_SIZES });
          const img = new window.Image();
          img.decoding = "async";
          if (props.sizes) img.sizes = props.sizes;
          if (props.srcSet) img.srcset = props.srcSet;
          img.src = props.src;
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [canPlate]);

  useEffect(() => () => window.clearTimeout(leaveTimer.current), []);

  function onListBlur(e: FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) disengage();
  }

  return (
    <div ref={rootRef}>
      {/* Filter: a text segmented control. Scrolls sideways on small screens. */}
      <div className="no-scrollbar -mx-(--gutter) mt-6 overflow-x-auto px-(--gutter) md:mx-0 md:overflow-visible md:px-0">
        <div role="group" aria-label="Filter projects by type" className="flex w-max items-center gap-7 pr-4 md:pr-0">
          {FILTERS.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => changeFilter(f.id)}
                className={`relative inline-flex min-h-11 items-center gap-1 whitespace-nowrap text-[0.9375rem] font-semibold transition-colors duration-150 ${
                  active ? "text-ink" : "text-ink-60 hover:text-ink"
                }`}
              >
                {f.label}
                <span className="tabular -translate-y-1.5 text-[0.6875rem] text-ink-45">{f.count}</span>
                {active && (
                  <motion.span
                    layoutId="work-filter-underline"
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-1.5 h-0.5 bg-ink"
                    transition={reduce ? { duration: 0 } : { duration: 0.24, ease: EASE_IN_OUT }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} projects
      </p>

      <div className="mt-10 grid grid-cols-1 lg:can-hover:grid-cols-12 lg:can-hover:gap-x-6">
        <div
          className="min-w-0 lg:can-hover:col-span-7"
          onPointerEnter={engage}
          onPointerLeave={disengage}
          onFocus={engage}
          onBlur={onListBlur}
        >
          <div aria-hidden="true" className="type-micro hidden pb-3 text-ink-60 md:flex">
            <div className={`${ROW_GRID} flex-1`}>
              <span>No.</span>
              <span>Project</span>
              <span>Type</span>
              <span>Year</span>
              <span />
            </div>
            <span className="w-16 shrink-0" />
          </div>

          <motion.ol
            key={filter}
            className="work-index"
            data-engaged={engaged || undefined}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
          >
            {years.map(([year, items]) => (
              <li key={year}>
                <div data-reveal="fade" className="flex items-baseline gap-3 border-t border-ink pb-2 pt-5">
                  <h3 className="type-group tabular">{year}</h3>
                  <p className="type-meta text-ink-60">
                    {items.length} {items.length === 1 ? "project" : "projects"}
                  </p>
                </div>
                <ol>
                  {items.map((p, i) => (
                    <IndexRow
                      key={p.id}
                      p={p}
                      order={i}
                      open={openId === p.id}
                      active={plate.id === p.id}
                      flash={flashId === p.id}
                      reduce={reduce}
                      onToggle={() => setOpenId((cur) => (cur === p.id ? null : p.id))}
                      onActivate={(at) => activate(p.id, at)}
                      onViewScreens={() => setViewer({ items: projectScreens(p), index: 0 })}
                    />
                  ))}
                </ol>
              </li>
            ))}
          </motion.ol>
        </div>

        <div className="hidden lg:can-hover:col-span-5 lg:can-hover:block">
          <IndexPlate plate={plate} />
        </div>
      </div>

      <Lightbox
        items={viewer?.items ?? []}
        index={viewer ? viewer.index : null}
        onIndexChange={(index) => setViewer((v) => (v ? { ...v, index } : v))}
        onClose={() => setViewer(null)}
        label="Project screens"
      />
    </div>
  );
}

interface IndexRowProps {
  p: Project;
  /** Position within its year group: staggers the scroll reveal. */
  order: number;
  open: boolean;
  active: boolean;
  flash: boolean;
  reduce: boolean;
  onToggle: () => void;
  onActivate: (at: number) => void;
  onViewScreens: () => void;
}

function IndexRow({ p, order, open, active, flash, reduce, onToggle, onActivate, onViewScreens }: IndexRowProps) {
  const panelId = `panel-${p.id}`;
  return (
    <li
      id={`project-${p.id}`}
      data-row=""
      data-active={active || undefined}
      data-reveal="fade"
      style={{ "--rd": `${Math.min(order, 8) * 45}ms` } as React.CSSProperties}
      className={flash ? "row-flash" : undefined}
    >
      <div className="flex items-stretch">
        <button
          id={`row-${p.id}`}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          onPointerEnter={(e) => onActivate(e.timeStamp)}
          onFocus={(e) => onActivate(e.timeStamp)}
          className={`${ROW_GRID} min-h-[4.5rem] flex-1 py-4 text-left md:min-h-16`}
        >
          <span className="row-no tabular type-meta text-ink-45">{formatNo(p.no)}</span>
          <span className="min-w-0">
            <span className="row-name type-row block">{p.name}</span>
            <span className="type-meta mt-1 block text-ink-60 md:hidden">{p.category}</span>
          </span>
          <span className="hidden truncate text-sm font-medium text-ink-60 md:block">{p.category}</span>
          <span className="tabular type-meta hidden text-ink-60 md:block">{p.year}</span>
          <Plus
            size={16}
            className={`self-center justify-self-end text-ink-60 transition-transform duration-200 ease-quint ${open ? "rotate-45" : ""}`}
          />
        </button>
        <TrailingCell p={p} />
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={`row-${p.id}`}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: reduce ? 0 : 0.3, ease: EASE_DRAWER },
              opacity: { duration: reduce ? 0.12 : 0.2, delay: reduce ? 0 : 0.06 },
            }}
          >
            <RowPanel p={p} onViewScreens={onViewScreens} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/** Link out, or the plain word "Private". Never a dead or disabled control. */
function TrailingCell({ p }: { p: Project }) {
  const cell = "group/link flex w-16 shrink-0 items-center justify-center";
  const icon = "transition-transform duration-150 ease-quint group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5";
  if (p.link && p.linkKind === "repo") {
    return (
      <a href={p.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${p.name} on GitHub (opens in new tab)`} className={cell}>
        <GitHub size={18} className={icon} />
      </a>
    );
  }
  if (p.link) {
    return (
      <a href={p.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${p.name} (opens in new tab)`} className={cell}>
        <ArrowUpRight size={18} className={icon} />
      </a>
    );
  }
  return <span className="type-micro flex w-16 shrink-0 items-center justify-center text-ink-60">Private</span>;
}

function RowPanel({ p, onViewScreens }: { p: Project; onViewScreens: () => void }) {
  const screens = shotsForProject(p.id).length;
  return (
    <div className={`pb-8 pr-4 md:pr-16 ${PANEL_INSET}`}>
      {/* Touch and narrow screens have no plate: the screenshot lives here. */}
      <div className="shot-ring relative mb-6 aspect-[16/9] max-w-3xl overflow-hidden bg-off lg:can-hover:hidden">
        <Image
          src={p.cover.src}
          alt={`${p.name} interface`}
          fill
          sizes="(min-width: 768px) 80vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <p className="type-body-l max-w-[58ch] text-ink-80">{p.tagline}</p>
      <p className="type-meta mt-3 text-ink-60">
        <span className="sr-only">Stack: </span>
        {p.stack.join(", ")}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        {p.link ? (
          <a href={p.link} target="_blank" rel="noopener noreferrer" className={OUTLINE_PILL}>
            {p.linkKind === "repo" ? "View code on GitHub" : "Visit live site"}
            {p.linkKind === "repo" ? <GitHub size={16} /> : <ArrowUpRight size={16} />}
            <span className="sr-only">(opens in new tab)</span>
          </a>
        ) : (
          <p className="max-w-[54ch] text-[0.9375rem] font-medium leading-relaxed text-ink-60">
            Private build. The deployment isn’t public, but I’m happy to walk you through it on a call.{" "}
            <a
              href={`mailto:${LINKS.email}`}
              className="font-semibold text-ink underline decoration-[1.5px] underline-offset-4"
            >
              Email me
            </a>
          </p>
        )}
        <button
          type="button"
          onClick={onViewScreens}
          className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold decoration-[1.5px] underline-offset-[6px] hover:underline"
        >
          <Expand size={16} />
          {screens > 1 ? `View ${screens} screens` : "View screen"}
        </button>
      </div>
    </div>
  );
}
