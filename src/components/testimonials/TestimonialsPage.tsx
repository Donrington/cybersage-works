import { TESTIMONIALS, TESTIMONIAL_GROUPS } from "@/data/testimonials";
import { TestimonialEntry } from "./TestimonialEntry";

/** Testimonials page body: intro, then Clients and Engineers groups. */
export function TestimonialsPage() {
  return (
    <>
      <section aria-labelledby="testimonials-title" className="container-x pt-[clamp(2.5rem,1.5rem+4vw,6rem)]">
        <h1 id="testimonials-title" className="type-display-sm">
          <span className="line-mask">
            <span>Clients and teammates,</span>
          </span>{" "}
          <span className="line-mask">
            <span style={{ animationDelay: "70ms" }}>
              in their own <span className="accent">words</span>.
            </span>
          </span>
        </h1>
        <p className="enter-fade type-body-l mt-6 max-w-[48ch] text-ink-60" style={{ animationDelay: "200ms" }}>
          Each quote sits next to the original: a client message, a published testimonial, a LinkedIn recommendation or
          an Upwork review.
        </p>
      </section>

      {TESTIMONIAL_GROUPS.map((group) => {
        const list = TESTIMONIALS.filter((t) => t.group === group.id);
        if (list.length === 0) return null;
        return (
          <section key={group.id} aria-labelledby={`group-${group.id}`} className="container-x section-y">
            <div className="flex items-baseline gap-3 border-t border-ink pb-2 pt-5">
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
