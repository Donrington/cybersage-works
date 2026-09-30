"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One observer for every scroll reveal on the page. Elements opt in with
 * `data-reveal`; when they enter the viewport they get `data-shown` once and
 * CSS does the rest. Hidden states only apply under `html.js` (set before
 * paint in layout), so content is visible without JS or with reduced motion.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const observeAll = (root: ParentNode) =>
      root.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => io.observe(el));

    observeAll(document);
    // Rows added later (filters, "show all") opt in the same way.
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && (n.matches("[data-reveal]") ? io.observe(n) : observeAll(n)));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
