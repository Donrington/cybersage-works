// From the Studio: every interface capture on the site. Order: one cover per
// project (in project-number order), KICS Atelier, then the extra screens
// grouped by project. KICS Atelier is a studio build with no case entry.
import type { ImageAsset } from "./projects";

export interface StudioShot {
  slug: string;
  image: ImageAsset;
  /** Project this capture belongs to, or null for standalone studio work. */
  projectId: string | null;
  /** Display name of the product in the capture. */
  title: string;
  alt: string;
}

export const STUDIO_SHOTS: StudioShot[] = [
  { slug: "circlesoflife-dashboard", image: { src: "/shots/circlesoflife-dashboard.webp", width: 1857, height: 970 }, projectId: "circlesoflife", title: "Circles of Life Healthcare", alt: "Circles of Life Healthcare interface, screen 1 of 3" },
  { slug: "recoverderm", image: { src: "/shots/recoverderm.webp", width: 1885, height: 1075 }, projectId: "recoverderm", title: "RecoverDerm", alt: "RecoverDerm interface" },
  { slug: "wytnest", image: { src: "/shots/wytnest.webp", width: 1810, height: 982 }, projectId: "wytnest", title: "Wytnest", alt: "Wytnest interface" },
  { slug: "chronos", image: { src: "/shots/chronos.webp", width: 1894, height: 922 }, projectId: "chronos", title: "Chronos", alt: "Chronos interface, screen 1 of 2" },
  { slug: "wynscollections", image: { src: "/shots/wynscollections.webp", width: 1801, height: 952 }, projectId: "wynscollections", title: "Wyns Collections", alt: "Wyns Collections interface, screen 1 of 4" },
  { slug: "ver", image: { src: "/shots/ver.webp", width: 1606, height: 940 }, projectId: "ver", title: "VER", alt: "VER interface" },
  { slug: "theblacke", image: { src: "/shots/theblacke.webp", width: 1840, height: 939 }, projectId: "theblacke", title: "The Black-E", alt: "The Black-E interface" },
  { slug: "terryonfagan", image: { src: "/shots/terryonfagan.webp", width: 1830, height: 955 }, projectId: "terryonfagan", title: "Terryon Fagan", alt: "Terryon Fagan interface" },
  { slug: "tuantling", image: { src: "/shots/tuantling.webp", width: 1849, height: 999 }, projectId: "tuantling", title: "Tuan Tling Vinyl Flooring", alt: "Tuan Tling Vinyl Flooring interface" },
  { slug: "autoboy", image: { src: "/shots/autoboy.webp", width: 1847, height: 951 }, projectId: "autoboy", title: "Autoboy Express", alt: "Autoboy Express interface, screen 1 of 2" },
  { slug: "anoc", image: { src: "/shots/anoc.webp", width: 1853, height: 1076 }, projectId: "anoc", title: "Anoc.ng", alt: "Anoc.ng interface, screen 1 of 3" },
  { slug: "nextgen", image: { src: "/shots/nextgen.webp", width: 1900, height: 961 }, projectId: "nextgen", title: "NextGen Robotics", alt: "NextGen Robotics interface, screen 1 of 3" },
  { slug: "axflo", image: { src: "/shots/axflo.webp", width: 1894, height: 992 }, projectId: "axflo", title: "Axflo Oil & Gas", alt: "Axflo Oil & Gas interface" },
  { slug: "deets", image: { src: "/shots/deets.webp", width: 1869, height: 870 }, projectId: "deets", title: "Deets", alt: "Deets interface" },
  { slug: "chrisconteras", image: { src: "/shots/chrisconteras.webp", width: 1894, height: 909 }, projectId: "chrisconteras", title: "Chris Conteras", alt: "Chris Conteras interface" },
  { slug: "myrakeleher", image: { src: "/shots/myrakeleher.webp", width: 1847, height: 947 }, projectId: "myrakeleher", title: "Myra Keleher", alt: "Myra Keleher interface" },
  { slug: "samdus", image: { src: "/shots/samdus.webp", width: 2400, height: 1258 }, projectId: "samdus", title: "Samdus Oil & Gas", alt: "Samdus Oil & Gas interface" },
  { slug: "amanigo", image: { src: "/shots/amanigo.webp", width: 1897, height: 899 }, projectId: "amanigo", title: "Amanigo Travels", alt: "Amanigo Travels interface" },
  { slug: "rokeyla", image: { src: "/shots/rokeyla.webp", width: 2400, height: 1243 }, projectId: "rokeyla", title: "Rokeyla Fashion", alt: "Rokeyla Fashion interface" },
  { slug: "krkmotors", image: { src: "/shots/krkmotors.webp", width: 1897, height: 986 }, projectId: "krkmotors", title: "KRK Motors", alt: "KRK Motors interface" },
  { slug: "twerk", image: { src: "/shots/twerk.webp", width: 2400, height: 1165 }, projectId: "twerk", title: "Twerk Queen Lagos", alt: "Twerk Queen Lagos interface" },
  { slug: "handyman", image: { src: "/shots/handyman.webp", width: 2400, height: 1284 }, projectId: "handyman", title: "All A Handyman", alt: "All A Handyman interface" },
  { slug: "techhub", image: { src: "/shots/techhub.webp", width: 2400, height: 1008 }, projectId: "techhub", title: "TechHub", alt: "TechHub interface" },
  { slug: "kics", image: { src: "/shots/kics.webp", width: 2400, height: 1119 }, projectId: null, title: "KICS Atelier", alt: "KICS Atelier interface" },
  { slug: "circlesoflife", image: { src: "/shots/circlesoflife.webp", width: 1803, height: 967 }, projectId: "circlesoflife", title: "Circles of Life Healthcare", alt: "Circles of Life Healthcare interface, screen 2 of 3" },
  { slug: "circlesoflife-footer", image: { src: "/shots/circlesoflife-footer.webp", width: 1833, height: 796 }, projectId: "circlesoflife", title: "Circles of Life Healthcare", alt: "Circles of Life Healthcare interface, screen 3 of 3" },
  { slug: "chronos-2", image: { src: "/shots/chronos-2.webp", width: 1904, height: 886 }, projectId: "chronos", title: "Chronos", alt: "Chronos interface, screen 2 of 2" },
  { slug: "wynscollections-2", image: { src: "/shots/wynscollections-2.webp", width: 1744, height: 939 }, projectId: "wynscollections", title: "Wyns Collections", alt: "Wyns Collections interface, screen 2 of 4" },
  { slug: "wynscollections-3", image: { src: "/shots/wynscollections-3.webp", width: 1540, height: 927 }, projectId: "wynscollections", title: "Wyns Collections", alt: "Wyns Collections interface, screen 3 of 4" },
  { slug: "wynscollections-4", image: { src: "/shots/wynscollections-4.webp", width: 1561, height: 952 }, projectId: "wynscollections", title: "Wyns Collections", alt: "Wyns Collections interface, screen 4 of 4" },
  { slug: "autoboy-2", image: { src: "/shots/autoboy-2.webp", width: 1828, height: 973 }, projectId: "autoboy", title: "Autoboy Express", alt: "Autoboy Express interface, screen 2 of 2" },
  { slug: "anoc-2", image: { src: "/shots/anoc-2.webp", width: 1834, height: 958 }, projectId: "anoc", title: "Anoc.ng", alt: "Anoc.ng interface, screen 2 of 3" },
  { slug: "anoc-3", image: { src: "/shots/anoc-3.webp", width: 1858, height: 967 }, projectId: "anoc", title: "Anoc.ng", alt: "Anoc.ng interface, screen 3 of 3" },
  { slug: "nextgen-2", image: { src: "/shots/nextgen-2.webp", width: 1872, height: 925 }, projectId: "nextgen", title: "NextGen Robotics", alt: "NextGen Robotics interface, screen 2 of 3" },
  { slug: "nextgen-3", image: { src: "/shots/nextgen-3.webp", width: 1682, height: 858 }, projectId: "nextgen", title: "NextGen Robotics", alt: "NextGen Robotics interface, screen 3 of 3" },
];

/** Every capture of one project, in display order. */
export const shotsForProject = (projectId: string) => STUDIO_SHOTS.filter((s) => s.projectId === projectId);
