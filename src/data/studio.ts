// From the Studio: every screenshot on the works site. Most belong to a
// project in PROJECTS (projectId); KICS Atelier is a studio build with no case entry.
import type { ImageAsset } from './projects';

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
  { slug: "wytnest", image: { src: '/shots/wytnest.webp', width: 1810, height: 982 }, projectId: "wytnest", title: "Wytnest", alt: "Screenshot of the Wytnest interface" },
  { slug: "autoboy", image: { src: '/shots/autoboy.webp', width: 1847, height: 951 }, projectId: "autoboy", title: "Autoboy Express", alt: "Screenshot of the Autoboy Express interface" },
  { slug: "recoverderm", image: { src: '/shots/recoverderm.webp', width: 1885, height: 1075 }, projectId: "recoverderm", title: "RecoverDerm", alt: "Screenshot of the RecoverDerm interface" },
  { slug: "anoc", image: { src: '/shots/anoc.webp', width: 1853, height: 1076 }, projectId: "anoc", title: "Anoc.ng", alt: "Screenshot of the Anoc.ng interface" },
  { slug: "nextgen", image: { src: '/shots/nextgen.webp', width: 1900, height: 961 }, projectId: "nextgen", title: "NextGen Robotics", alt: "Screenshot of the NextGen Robotics interface" },
  { slug: "circlesoflife-dashboard", image: { src: '/shots/circlesoflife-dashboard.webp', width: 1857, height: 970 }, projectId: "circlesoflife", title: "Circles of Life Healthcare", alt: "Screenshot of the Circles of Life Healthcare interface" },
  { slug: "chronos", image: { src: '/shots/chronos.webp', width: 1894, height: 922 }, projectId: "chronos", title: "Chronos", alt: "Screenshot of the Chronos interface" },
  { slug: "terryonfagan", image: { src: '/shots/terryonfagan.webp', width: 1830, height: 955 }, projectId: "terryonfagan", title: "Terryon Fagan", alt: "Screenshot of the Terryon Fagan interface" },
  { slug: "judygolden", image: { src: '/shots/judygolden.webp', width: 1711, height: 916 }, projectId: "judygolden", title: "Judy Golden Tiling", alt: "Screenshot of the Judy Golden Tiling interface" },
  { slug: "wynscollections", image: { src: '/shots/wynscollections.webp', width: 1801, height: 952 }, projectId: "wynscollections", title: "Wyns Collections", alt: "Screenshot of the Wyns Collections interface" },
  { slug: "theblacke", image: { src: '/shots/theblacke.webp', width: 1840, height: 939 }, projectId: "theblacke", title: "The Black-E", alt: "Screenshot of the The Black-E interface" },
  { slug: "ver", image: { src: '/shots/ver.webp', width: 1606, height: 940 }, projectId: "ver", title: "VER", alt: "Screenshot of the VER interface" },
  { slug: "axflo", image: { src: '/shots/axflo.webp', width: 1894, height: 992 }, projectId: "axflo", title: "Axflo Oil & Gas", alt: "Screenshot of the Axflo Oil & Gas interface" },
  { slug: "deets", image: { src: '/shots/deets.webp', width: 1869, height: 870 }, projectId: "deets", title: "Deets", alt: "Screenshot of the Deets interface" },
  { slug: "krkmotors", image: { src: '/shots/krkmotors.webp', width: 1897, height: 986 }, projectId: "krkmotors", title: "KRK Motors", alt: "Screenshot of the KRK Motors interface" },
  { slug: "samdus", image: { src: '/shots/samdus.webp', width: 2400, height: 1258 }, projectId: "samdus", title: "Samdus Oil & Gas", alt: "Screenshot of the Samdus Oil & Gas interface" },
  { slug: "rokeyla", image: { src: '/shots/rokeyla.webp', width: 2400, height: 1243 }, projectId: "rokeyla", title: "Rokeyla Fashion", alt: "Screenshot of the Rokeyla Fashion interface" },
  { slug: "amanigo", image: { src: '/shots/amanigo.webp', width: 1897, height: 899 }, projectId: "amanigo", title: "Amanigo Travels", alt: "Screenshot of the Amanigo Travels interface" },
  { slug: "circlesoflife", image: { src: '/shots/circlesoflife.webp', width: 1803, height: 967 }, projectId: "circlesoflife", title: "Circles of Life Healthcare", alt: "Screenshot 2 of the Circles of Life Healthcare interface" },
  { slug: "anoc-2", image: { src: '/shots/anoc-2.webp', width: 1834, height: 958 }, projectId: "anoc", title: "Anoc.ng", alt: "Screenshot 2 of the Anoc.ng interface" },
  { slug: "autoboy-2", image: { src: '/shots/autoboy-2.webp', width: 1828, height: 973 }, projectId: "autoboy", title: "Autoboy Express", alt: "Screenshot 2 of the Autoboy Express interface" },
  { slug: "nextgen-2", image: { src: '/shots/nextgen-2.webp', width: 1872, height: 925 }, projectId: "nextgen", title: "NextGen Robotics", alt: "Screenshot 2 of the NextGen Robotics interface" },
  { slug: "chronos-2", image: { src: '/shots/chronos-2.webp', width: 1904, height: 886 }, projectId: "chronos", title: "Chronos", alt: "Screenshot 2 of the Chronos interface" },
  { slug: "wynscollections-2", image: { src: '/shots/wynscollections-2.webp', width: 1744, height: 939 }, projectId: "wynscollections", title: "Wyns Collections", alt: "Screenshot 2 of the Wyns Collections interface" },
  { slug: "anoc-3", image: { src: '/shots/anoc-3.webp', width: 1858, height: 967 }, projectId: "anoc", title: "Anoc.ng", alt: "Screenshot 3 of the Anoc.ng interface" },
  { slug: "nextgen-3", image: { src: '/shots/nextgen-3.webp', width: 1682, height: 858 }, projectId: "nextgen", title: "NextGen Robotics", alt: "Screenshot 3 of the NextGen Robotics interface" },
  { slug: "wynscollections-3", image: { src: '/shots/wynscollections-3.webp', width: 1540, height: 927 }, projectId: "wynscollections", title: "Wyns Collections", alt: "Screenshot 3 of the Wyns Collections interface" },
  { slug: "circlesoflife-footer", image: { src: '/shots/circlesoflife-footer.webp', width: 1833, height: 796 }, projectId: "circlesoflife", title: "Circles of Life Healthcare", alt: "Screenshot 3 of the Circles of Life Healthcare interface" },
  { slug: "wynscollections-4", image: { src: '/shots/wynscollections-4.webp', width: 1561, height: 952 }, projectId: "wynscollections", title: "Wyns Collections", alt: "Screenshot 4 of the Wyns Collections interface" },
  { slug: "kics", image: { src: '/shots/kics.webp', width: 2400, height: 1119 }, projectId: null, title: "KICS Atelier", alt: "Screenshot of the KICS Atelier interface" },
  { slug: "techhub", image: { src: '/shots/techhub.webp', width: 2400, height: 1008 }, projectId: "techhub", title: "TechHub", alt: "Screenshot of the TechHub interface" },
  { slug: "tuantling", image: { src: '/shots/tuantling.webp', width: 1849, height: 999 }, projectId: "tuantling", title: "Tuan Tling Vinyl Flooring", alt: "Screenshot of the Tuan Tling Vinyl Flooring interface" },
  { slug: "chrisconteras", image: { src: '/shots/chrisconteras.webp', width: 1894, height: 909 }, projectId: "chrisconteras", title: "Chris Conteras", alt: "Screenshot of the Chris Conteras interface" },
  { slug: "myrakeleher", image: { src: '/shots/myrakeleher.webp', width: 1847, height: 947 }, projectId: "myrakeleher", title: "Myra Keleher", alt: "Screenshot of the Myra Keleher interface" },
  { slug: "handyman", image: { src: '/shots/handyman.webp', width: 2400, height: 1284 }, projectId: "handyman", title: "All A Handyman", alt: "Screenshot of the All A Handyman interface" },
  { slug: "twerk", image: { src: '/shots/twerk.webp', width: 2400, height: 1165 }, projectId: "twerk", title: "Twerk Queen Lagos", alt: "Screenshot of the Twerk Queen Lagos interface" },
];
