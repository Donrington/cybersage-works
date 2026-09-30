import { Fragment, type CSSProperties } from "react";
import { CurveField } from "@/components/art/CurveField";
import { ParallaxLayer } from "@/components/art/ParallaxLayer";
import { contourField, lensField } from "@/components/art/curves";
import { ArrowUpRight } from "@/components/site/Icons";
import { ResumeButton } from "@/components/site/ResumeButton";
import { PROJECTS } from "@/data/projects";
import { TESTIMONIALS } from "@/data/testimonials";
import { LINKS } from "@/lib/site";
import { CinematicPortrait } from "./CinematicPortrait";
import { RotatingWord } from "./RotatingWord";

const LENS = lensField({ lines: 24, seed: 7 });
const HAZE = contourField({ height: 900, lines: 12, seed: 23, amplitude: 0.05 });

const STATS = [
  { value: PROJECTS.length, label: "Products shipped" },
  { value: PROJECTS.filter((p) => p.linkKind === "live").length, label: "Live right now" },
  { value: TESTIMONIALS.length, label: "Testimonials, with proof" },
];

const HEAD = "Systems I’ve designed, built and";
const WORD_STEP = 60;
const WORD_START = 180;

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/**
 * Work page opening. Headline words rise out of masks on first paint (CSS,
 * so the H1 never waits for hydration), the last word cycles, the portrait
 * plays as a film still, and line art bends toward it like light through a
 * lens.
 */
export function WorkHero() {
  const words = HEAD.split(" ");
  const rotatorDelay = WORD_START + words.length * WORD_STEP;

  return (
    <section aria-labelledby="work-title" className="relative isolate">
      <ParallaxLayer>
        <div className="hero-halo" />
        <div className="curve-drift-slow hero-mask absolute inset-0">
          <CurveField curves={HAZE} viewBox="0 0 1440 900" className="h-full w-full opacity-70" delay={500} />
        </div>
        <div className="curve-drift hero-mask absolute inset-0">
          <CurveField curves={LENS} viewBox="0 0 1440 900" className="h-full w-full" />
        </div>
      </ParallaxLayer>

      <div className="container-x pb-[clamp(3rem,2rem+4vw,6rem)] pt-[clamp(1.5rem,0.75rem+3.5vw,5rem)]">
        <div className="grid gap-y-9 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4 lg:col-start-9 lg:row-start-1">
            <CinematicPortrait />
          </div>

          <div className="lg:col-span-8 lg:col-start-1 lg:row-start-1 lg:self-center">
            <p className="hero-in type-meta inline-flex items-center gap-2.5 font-semibold text-ink-60" style={vars({ "--d": "120ms" })}>
              <span aria-hidden="true" className="pulse-dot" />
              Open to new roles · Remote, worldwide
            </p>

            <h1 id="work-title" className="type-display mt-6">
              {words.map((w, i) => (
                <Fragment key={i}>
                  <span className="word-mask">
                    <span className="word" style={vars({ "--d": `${WORD_START + i * WORD_STEP}ms` })}>
                      {w}
                    </span>
                  </span>{" "}
                </Fragment>
              ))}
              <RotatingWord delayMs={rotatorDelay} />
            </h1>

            <p className="hero-in type-body-l mt-7 max-w-[52ch] text-ink-60" style={vars({ "--d": `${rotatorDelay + 120}ms` })}>
              I’m Abakwe Carrington, an infrastructure and systems architect. Here are {PROJECTS.length} products I’ve
              shipped across healthcare, energy, commerce and AI.
            </p>

            <div className="hero-in mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" style={vars({ "--d": `${rotatorDelay + 220}ms` })}>
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

            <dl
              className="hero-in mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-ink-10 pt-6 sm:gap-8"
              style={vars({ "--d": `${rotatorDelay + 320}ms` })}
            >
              {STATS.map((s, i) => (
                <div key={s.label} className="flex flex-col-reverse gap-1.5">
                  <dt className="type-meta text-ink-60">{s.label}</dt>
                  <dd className="text-[clamp(1.75rem,1.2rem+1.8vw,2.75rem)] font-extrabold leading-none tracking-[-0.04em]">
                    <span className="sr-only">{s.value}</span>
                    <span
                      aria-hidden="true"
                      className="count tabular"
                      style={vars({ "--to": s.value, "--d": `${rotatorDelay + 450 + i * 140}ms` })}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
