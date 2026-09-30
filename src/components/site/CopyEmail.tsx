"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "./Icons";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard API blocked (insecure context / permissions): fall back.
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-on-ink-15 px-4 text-sm font-semibold text-on-ink transition-[border-color,transform] duration-150 ease-quint hover:border-on-ink-60 active:scale-[0.97]"
      >
        {copied && <Check size={16} />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </>
  );
}
