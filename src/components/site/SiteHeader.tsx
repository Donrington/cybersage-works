"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PERSON } from "@/lib/site";
import { ResumeButton } from "./ResumeButton";

const NAV = [
  { href: "/", label: "Work" },
  { href: "/testimonials", label: "Testimonials" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Hairline appears once the page leaves the top. An observer on a sentinel,
  // not a scroll listener.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-2 w-px" />
      <header className="nav-glass sticky top-0 z-40" data-scrolled={scrolled || undefined}>
        <div className="container-x flex h-(--nav-h) items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${PERSON.name}, selected work`}>
            <Image src="/brand/sage-prim-dark.webp" alt="" width={256} height={292} className="h-[22px] w-auto" />
            <span className="hidden text-[0.9375rem] font-bold tracking-[-0.01em] min-[480px]:inline sm:hidden">Carrington</span>
            <span className="hidden text-[0.9375rem] font-bold tracking-[-0.01em] sm:inline">{PERSON.name}</span>
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-7">
            <ul className="flex items-center gap-4 sm:gap-7">
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex min-h-11 items-center text-sm font-medium decoration-[1.5px] underline-offset-[6px] transition-colors duration-150 ${
                        active ? "text-ink underline" : "text-ink-60 hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ResumeButton size="sm" />
          </nav>
        </div>
      </header>
    </>
  );
}
