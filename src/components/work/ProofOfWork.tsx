import { CurveField } from "@/components/art/CurveField";
import { orbitField } from "@/components/art/curves";
import { RevealHeading } from "@/components/site/RevealHeading";
import { WorkIndex } from "./WorkIndex";

const ORBITS = orbitField({ cx: 1260, cy: 110, rings: 13, start: 60, step: 48, seed: 5 });

/** Proof of Work: a numbered, year-grouped index of every shipped project. */
export function ProofOfWork() {
  return (
    <section id="work" aria-labelledby="work-heading" className="relative isolate">
      {/* Orbits drawn around the section's top-right corner. The wrapper clips
          itself, so the sticky plate below keeps the viewport as scroller. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] overflow-hidden fade-mask-b">
        <CurveField curves={ORBITS} viewBox="0 0 1440 720" mode="view" className="h-full w-full" />
      </div>
      <div className="container-x section-y">
        <RevealHeading id="work-heading" text="Proof of work" accent="work" className="type-h2" />
        <WorkIndex />
      </div>
    </section>
  );
}
