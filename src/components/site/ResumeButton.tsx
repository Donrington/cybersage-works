import { LINKS } from "@/lib/site";
import { Download } from "./Icons";

const SIZE = {
  sm: {
    pill: "h-9 gap-2 pl-3.5 pr-1 text-[0.8125rem] sm:h-10 sm:gap-2.5 sm:pl-4 sm:text-sm",
    icon: "size-7",
    glyph: 15,
  },
  lg: {
    pill: "h-12 gap-3 pl-5 pr-1.5 text-[0.9375rem]",
    icon: "size-9",
    glyph: 17,
  },
} as const;

/** Ink pill with a nested icon circle. A plain download link: no JS. */
export function ResumeButton({ size = "sm" }: { size?: keyof typeof SIZE }) {
  const s = SIZE[size];
  return (
    <a
      href={LINKS.resume}
      download="Abakwe-Carrington-Resume.pdf"
      aria-label="Download résumé (PDF)"
      className={`group inline-flex shrink-0 items-center rounded-full bg-ink font-semibold text-on-ink transition-transform duration-100 ease-out active:scale-[0.97] ${s.pill}`}
    >
      <span>Résumé</span>
      <span
        className={`grid place-items-center rounded-full bg-white/12 transition-transform duration-150 ease-quint group-hover:translate-y-px ${s.icon}`}
      >
        <Download size={s.glyph} />
      </span>
    </a>
  );
}
