import Image from "next/image";
import { ArrowUpRight } from "@/components/site/Icons";
import { ResumeButton } from "@/components/site/ResumeButton";
import { PROJECTS } from "@/data/projects";
import { LINKS } from "@/lib/site";

/**
 * Work page intro. First-paint motion is pure CSS (line masks + fades), so
 * it never waits for hydration and the H1 stays the LCP text.
 */
export function WorkHero() {
  return (
    <section aria-labelledby="work-title" className="container-x pt-[clamp(2.5rem,1.5rem+4vw,6rem)]">
      <div className="grid gap-y-7 md:grid-cols-8 md:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
        <div
          className="enter-wipe w-[88px] md:w-28 lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:w-full lg:max-w-[300px] lg:self-end lg:justify-self-end"
          style={{ animationDelay: "150ms" }}
        >
          <Image
            src="/me.webp"
            alt="Abakwe Carrington"
            width={800}
            height={1000}
            sizes="(min-width: 1024px) 300px, 112px"
            loading="eager"
            fetchPriority="high"
            className="h-auto w-full grayscale"
          />
        </div>

        <div className="md:col-span-8 lg:col-span-9 lg:col-start-1 lg:row-start-1">
          <p className="enter-fade type-meta inline-flex items-center gap-2 font-semibold text-ink-60" style={{ animationDelay: "120ms" }}>
            <span aria-hidden="true" className="size-1.5 rounded-full bg-ink" />
            Open to new roles · Remote, worldwide
          </p>

          <h1 id="work-title" className="type-display mt-5">
            <span className="line-mask">
              <span>Systems I’ve designed,</span>
            </span>{" "}
            <span className="line-mask">
              <span style={{ animationDelay: "70ms" }}>
                built and <span className="accent">shipped</span>.
              </span>
            </span>
          </h1>

          <p className="enter-fade type-body-l mt-6 max-w-[52ch] text-ink-60" style={{ animationDelay: "220ms" }}>
            I’m Abakwe Carrington, an infrastructure and systems architect. Here are {PROJECTS.length} products I’ve
            shipped across healthcare, energy, commerce and AI.
          </p>

          <div className="enter-fade mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ animationDelay: "300ms" }}>
            <ResumeButton size="lg" />
            <a
              href={`mailto:${LINKS.email}`}
              className="group inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-semibold decoration-[1.5px] underline-offset-[6px] hover:underline"
            >
              Email me
              <ArrowUpRight
                size={16}
                className="transition-transform duration-150 ease-quint group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
