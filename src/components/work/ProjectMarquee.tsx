import { Fragment } from "react";
import { PROJECTS } from "@/data/projects";

/** Slow band of every project name in outline type. Decorative; pauses on hover. */
export function ProjectMarquee() {
  const run = (copy: number) => (
    <div className="marquee-run flex shrink-0 items-center" aria-hidden={copy > 0 || undefined}>
      {PROJECTS.map((p) => (
        <Fragment key={`${copy}-${p.id}`}>
          <span className="marquee-name">{p.name}</span>
          <span className="marquee-sep accent" aria-hidden="true">
            ✳
          </span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className="marquee relative border-y border-ink-10 py-5 md:py-7" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {run(0)}
        {run(1)}
      </div>
    </div>
  );
}
