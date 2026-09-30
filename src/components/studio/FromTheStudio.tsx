import { StudioSheet } from "./StudioSheet";

/** From the Studio: a justified contact sheet of every interface capture. */
export function FromTheStudio() {
  return (
    <section id="studio" aria-labelledby="studio-heading" className="section-y">
      <div className="container-x">
        <div className="border-t border-ink-10 pt-12 md:pt-16">
          <h2 id="studio-heading" className="type-h2">
            From the studio
          </h2>
          <p className="mt-4 max-w-[46ch] text-base font-medium leading-relaxed text-ink-60">
            Interface captures from the projects above. Select any screen to see it full size.
          </p>
          <StudioSheet />
        </div>
      </div>
    </section>
  );
}
