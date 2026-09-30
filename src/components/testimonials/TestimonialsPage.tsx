import { CurveField } from "@/components/art/CurveField";
import { ParallaxLayer } from "@/components/art/ParallaxLayer";
import { lensField } from "@/components/art/curves";
import { RevealHeading } from "@/components/site/RevealHeading";
import { TESTIMONIALS, TESTIMONIAL_GROUPS } from "@/data/testimonials";
import { TestimonialEntry } from "./TestimonialEntry";

const LENS = lensField({ lines: 20, seed: 29, focusX: 0.84, focusY: 0.42, pinch: 0.5, spread: 0.16 });

/** Testimonials page body: intro, then Clients and Engineers groups. */
export function TestimonialsPage() {
  return (
    <>
      <section aria-labelledby="testimonials-title" className="relative isolate">
        <ParallaxLayer distance={100}>
          <div className="hero-halo" />
          <div className="curve-drift hero-mask absolute inset-0">
            <CurveField curves={LENS} viewBox="0 0 1440 900" className="h-full w-full" />
          </div>
        </ParallaxLayer>
        <div className="container-x pb-4 pt-[clamp(2.5rem,1.5rem+4vw,6rem)]">
          <RevealHeading
            as="h1"
            id="testimonials-title"
            mode="load"
            delay={150}
            text="Clients and teammates,|in their own words."
            accent="words"
            className="type-display-sm"
          />
          <p className="hero-in type-body-l mt-7 max-w-[48ch] text-ink-60" style={{ "--d": "700ms" } as React.CSSProperties}>
            Each quote sits next to the original: a client message, a published testimonial, a LinkedIn recommendation or
            an Upwork review.
          </p>
        </div>
      </section>

      {TESTIMONIAL_GROUPS.map((group) => {
        const list = TESTIMONIALS.filter((t) => t.group === group.id);
        if (list.length === 0) return null;
        return (
          <section key={group.id} aria-labelledby={`group-${group.id}`} className="container-x section-y">
            <div data-reveal="fade" className="flex items-baseline gap-3 border-t border-ink pb-2 pt-5">
              <h2 id={`group-${group.id}`} className="type-group">
                {group.label}
              </h2>
              <p className="type-meta text-ink-60">
                {list.length} {list.length === 1 ? "testimonial" : "testimonials"}
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-16 md:mt-12 md:gap-24">
              {list.map((t) => (
                <TestimonialEntry key={t.id} t={t} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
