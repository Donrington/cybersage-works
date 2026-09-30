import Link from "next/link";
import { ArrowRight } from "./Icons";

/** Page-end wayfinding: one large link to the other page. */
export function NextPageLink({ href, label }: { href: string; label: string }) {
  return (
    <div className="container-x section-y">
      <Link
        href={href}
        className="group flex items-center justify-between gap-6 border-t border-ink py-10 sm:py-12"
      >
        <span className="type-next">
          <span className="text-ink-60">Next: </span>
          {label}
        </span>
        <ArrowRight
          size={32}
          className="shrink-0 transition-transform duration-200 ease-quint group-hover:translate-x-1.5"
        />
      </Link>
    </div>
  );
}
