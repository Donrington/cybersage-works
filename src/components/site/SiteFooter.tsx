import { CurveField } from "@/components/art/CurveField";
import { contourField } from "@/components/art/curves";
import { LINKS, PERSON } from "@/lib/site";
import { CopyEmail } from "./CopyEmail";
import { ArrowUpRight } from "./Icons";
import { RevealHeading } from "./RevealHeading";

const YEAR = new Date().getFullYear();
const CONTOURS = contourField({ height: 700, lines: 20, seed: 41, amplitude: 0.09 });

const FOOTER_LINKS = [
  { href: LINKS.resume, label: "Résumé (PDF)" },
  { href: LINKS.github, label: "GitHub" },
  { href: LINKS.linkedin, label: "LinkedIn" },
  { href: LINKS.x, label: "X" },
  { href: LINKS.mainSite, label: "cybersage.dev" },
] as const;

/** The one ink block on the site: a dome rising out of the page, contour lines, contact. */
export function SiteFooter() {
  return (
    <footer aria-labelledby="footer-title">
      <svg aria-hidden="true" focusable="false" viewBox="0 0 1440 84" preserveAspectRatio="none" className="footer-dome">
        <path d="M0 84 Q720 -36 1440 84 Z" fill="currentColor" />
      </svg>
      <div className="on-ink relative isolate overflow-hidden bg-ink text-on-ink">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <CurveField curves={CONTOURS} viewBox="0 0 1440 700" mode="view" tone="white" className="h-full w-full" />
        </div>
        <div className="container-x pb-8 pt-[calc(var(--section-y)*0.8)]">
          <RevealHeading id="footer-title" text="Have a role in mind?" accent="role" className="type-h2 max-w-[16ch]" />
          <p data-reveal="fade" className="type-body-l mt-4 text-on-ink-60" style={{ "--rd": "250ms" } as React.CSSProperties}>
            Email is the fastest way to reach me.
          </p>

          <div data-reveal="fade" className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4" style={{ "--rd": "350ms" } as React.CSSProperties}>
            <a
              href={`mailto:${LINKS.email}`}
              className="email-link text-[clamp(1.25rem,0.8rem+2.6vw,3rem)] font-bold tracking-[-0.03em] [overflow-wrap:anywhere]"
            >
              {LINKS.email}
            </a>
            <CopyEmail email={LINKS.email} />
          </div>

          <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 lg:max-w-4xl lg:grid-cols-5">
            {FOOTER_LINKS.map((link, i) => (
              <li key={link.label} data-reveal="fade" style={{ "--rd": `${i * 60}ms` } as React.CSSProperties}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-on-ink-60 transition-colors duration-150 hover:text-on-ink"
                >
                  {link.label}
                  <ArrowUpRight size={14} className="transition-transform duration-150 ease-quint group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="type-meta mt-14 flex flex-col gap-2 border-t border-on-ink-15 pt-6 text-on-ink-60 sm:flex-row sm:justify-between">
            <p>
              © {YEAR} {PERSON.name}
            </p>
            <p>Based in Lagos, Nigeria. Working remotely, worldwide.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
