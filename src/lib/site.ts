// Site-wide constants. The works site lives at the root of its own subdomain,
// so /public paths are used as-is (no basePath).

export const SITE_URL = "https://works.cybersage.dev";
export const MAIN_SITE_URL = "https://cybersage.dev";

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
  resume: "/resume/Abakwe-Carrington-Resume.pdf",
  mainSite: MAIN_SITE_URL,
} as const;
