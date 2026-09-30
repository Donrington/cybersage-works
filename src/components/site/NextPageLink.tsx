import Link from "next/link";
import { ArrowRight } from "./Icons";

/** Page-end wayfinding: one large link to the other page. Ink rises behind it on hover. */
export function NextPageLink({ href, label }: { href: string; label: string }) {
  return (
    <div className="container-x section-y">
      <Link href={href} className="next-link group flex items-center justify-between gap-6 border-t border-ink px-1 py-10 sm:py-12">
        <span className="next-slide next-slide-r type-next">
          <span className="next-muted text-ink-60">Next: </span>
          {label}
        </span>
        <ArrowRight size={32} className="next-slide next-slide-l shrink-0" />
      </Link>
    </div>
  );
}
