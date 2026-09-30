// Site-wide constants. The works site is served at https://cybersage.dev/works
// through a rewrite on the main site, so every URL lives under BASE_PATH.
//
// next/link, metadata file conventions and route handlers get the basePath
// automatically. next/image string srcs, <a href> to files in /public, CSS
// url() and <video src> do NOT — wrap those with asset().

export const BASE_PATH = "/works"; // keep in sync with next.config.ts

export const SITE_URL = "https://cybersage.dev";
export const WORKS_URL = `${SITE_URL}${BASE_PATH}`;

/** Prefix a /public path with the basePath: asset('/shots/anoc.webp') -> '/works/shots/anoc.webp'. */
export function asset(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

export const PERSON = {
  name: "Abakwe Carrington",
  alias: "Cybersage",
  role: "Infrastructure & Systems Architect",
  location: "Lagos, Nigeria",
  availability: "Remote, worldwide",
} as const;

export const LINKS = {
  email: "abakwecarrington@gmail.com",
  github: "https://github.com/Donrington",
  linkedin: "https://www.linkedin.com/in/carrington-abakwe-b0b0a0217",
  x: "https://x.com/CarlSwitch_CHUG",
  /** File in /public — wrap with asset() when used as an href. */
  resume: "/resume/Abakwe-Carrington-Resume.pdf",
  mainSite: SITE_URL,
} as const;
