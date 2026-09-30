import { Fragment, type CSSProperties, type ElementType } from "react";

interface RevealHeadingProps {
  /** Heading text. A "|" forces a line break at that point (from 640px up). */
  text: string;
  as?: ElementType;
  id?: string;
  className?: string;
  /** Word set in Instrument Serif italic. */
  accent?: string;
  /** "view": rises in when scrolled into view (RevealObserver). "load": on first paint. */
  mode?: "view" | "load";
  /** Delay before the first word (ms), load mode only. */
  delay?: number;
}

/**
 * Heading whose words rise out of line masks. Real text stays in the DOM,
 * so it reads normally for assistive tech and search.
 */
export function RevealHeading({ text, as: Tag = "h2", id, className = "", accent, mode = "view", delay = 0 }: RevealHeadingProps) {
  const lines = text.split("|").map((line) => line.trim().split(" "));
  // Index of each line's first word across the whole heading (for stagger).
  const offsets = lines.map((_, li) => lines.slice(0, li).reduce((sum, l) => sum + l.length, 0));
  return (
    <Tag id={id} className={`${mode === "view" ? "reveal-words" : ""} ${className}`} data-reveal={mode === "view" ? "" : undefined}>
      {lines.map((words, li) => (
        <Fragment key={li}>
          {li > 0 && (
            <>
              {" "}
              <br className="hidden sm:inline" />
            </>
          )}
          {words.map((w, wi) => {
            const i = offsets[li] + wi;
            const bare = w.replace(/[.,!?]$/, "");
            const isAccent = accent !== undefined && bare === accent;
            const punct = isAccent ? w.slice(bare.length) : "";
            const style = (mode === "view" ? { "--i": i } : { "--d": `${delay + i * 60}ms` }) as unknown as CSSProperties;
            return (
              <Fragment key={wi}>
                <span className="word-mask">
                  <span className={mode === "view" ? "w" : "word"} style={style}>
                    {isAccent ? (
                      <>
                        <span className="accent">{bare}</span>
                        {punct}
                      </>
                    ) : (
                      w
                    )}
                  </span>
                </span>
                {wi < words.length - 1 && " "}
              </Fragment>
            );
          })}
        </Fragment>
      ))}
    </Tag>
  );
}
