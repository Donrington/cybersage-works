import { CurveField } from "@/components/art/CurveField";
import { contourField } from "@/components/art/curves";
import { RevealHeading } from "@/components/site/RevealHeading";
import { StudioSheet } from "./StudioSheet";

const CONTOURS = contourField({ height: 640, lines: 18, seed: 17, amplitude: 0.08 });

/** From the Studio: a tonal band holding a justified contact sheet of every screen. */
export function FromTheStudio() {
  return (
    <section id="studio" aria-labelledby="studio-heading" className="relative isolate mt-(--section-y) bg-off">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] overflow-hidden fade-mask-b">
        <CurveField curves={CONTOURS} viewBox="0 0 1440 640" mode="view" className="h-full w-full" />
      </div>
      <div className="container-x section-y pb-(--section-y)">
        <RevealHeading id="studio-heading" text="From the studio" accent="studio" className="type-h2" />
        <p data-reveal="fade" className="mt-4 max-w-[46ch] text-base font-medium leading-relaxed text-ink-60" style={{ "--rd": "200ms" } as React.CSSProperties}>
          Interface captures from the projects above. Select any screen to see it full size.
        </p>
        <StudioSheet />
      </div>
    </section>
  );
}
