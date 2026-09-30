import { LINKS, PERSON } from "@/lib/site";
import { CopyEmail } from "./CopyEmail";
import { ArrowUpRight } from "./Icons";

const YEAR = new Date().getFullYear();

const FOOTER_LINKS = [
  { href: LINKS.resume, label: "Résumé (PDF)" },
  { href: LINKS.github, label: "GitHub" },
  { href: LINKS.linkedin, label: "LinkedIn" },
  { href: LINKS.x, label: "X" },
  { href: LINKS.mainSite, label: "cybersage.dev" },
] as const;

/** The one ink block on the site: contact, links, and the sign-off. */
export function SiteFooter() {
  return (
    <footer className="on-ink bg-ink text-on-ink" aria-labelledby="footer-title">
      <div className="container-x section-y pb-8">
        <h2 id="footer-title" className="type-h2 max-w-[16ch]">
          Have a role in mind?
        </h2>
        <p className="type-body-l mt-4 text-on-ink-60">Email is the fastest way to reach me.</p>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
          <a
            href={`mailto:${LINKS.email}`}
            className="text-[clamp(1.25rem,0.8rem+2.6vw,3rem)] font-bold tracking-[-0.03em] [overflow-wrap:anywhere] decoration-2 underline-offset-[6px] hover:underline"
          >
            {LINKS.email}
          </a>
          <CopyEmail email={LINKS.email} />
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 lg:max-w-4xl lg:grid-cols-5">
          {FOOTER_LINKS.map((link) => (
            <li key={link.label}>
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
    </footer>
  );
}
