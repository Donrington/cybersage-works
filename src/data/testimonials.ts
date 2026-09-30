// Testimonials. Every quote is verbatim and backed by a screenshot of the
// original (proof). `highlight` is a verbatim substring of `quote`, set in
// full ink while the rest of the quote is quieter.
import type { ImageAsset } from "./projects";

export type TestimonialSource = "Client" | "LinkedIn" | "Upwork";
export type TestimonialGroup = "client" | "engineer";

export interface ProofImage extends ImageAsset {
  /** Short description of what the screenshot is, e.g. "LinkedIn recommendation". */
  label: string;
  alt: string;
}

export interface Testimonial {
  id: string;
  group: TestimonialGroup;
  name: string;
  role: string;
  /** Client company. Absent for peer endorsements and marketplace reviews. */
  company?: string;
  quote: string;
  /** Verbatim substring of quote. */
  highlight: string;
  source: TestimonialSource;
  /** Screenshots of the original, first one shown by default. */
  proofs: ProofImage[];
  /** White-on-transparent client logo (render with a filter on light surfaces). */
  logo?: ImageAsset;
  projectId?: string;
}

export const TESTIMONIAL_GROUPS: { id: TestimonialGroup; label: string }[] = [
  { id: "client", label: "Clients" },
  { id: "engineer", label: "Engineers" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "hycinth",
    group: "client",
    name: "Hycinth",
    role: "Chief Executive Officer",
    company: "SAMDUS Oil & Gas",
    quote: "It has been quite a pleasure and delightful experience working with you. Your professionalism, dedication, commitment, enthusiasm, passion, and especially patience are all commendable.",
    highlight: "Your professionalism, dedication, commitment, enthusiasm, passion, and especially patience are all commendable.",
    source: "Client",
    proofs: [
      { src: "/testimonials/hycinth-samdus.webp", width: 1200, height: 1428, label: "Client message", alt: "Screenshot of the original message from Hycinth, Chief Executive Officer at SAMDUS Oil & Gas" },
      { src: "/testimonials/hycinth-samdus-site.webp", width: 1200, height: 605, label: "Published testimonial", alt: "Published testimonial card from Hycinth, Chief Executive Officer at SAMDUS Oil & Gas" },
    ],
    logo: { src: "/logos/samdus.webp", width: 416, height: 128 },
    projectId: "samdus",
  },
  {
    id: "carita",
    group: "client",
    name: "Carita",
    role: "Founder",
    company: "RecoverDerm",
    quote: "The website is beautiful — already I’m getting a lot of compliments. I’m happy and proud we were able to bring my vision to light.",
    highlight: "I’m happy and proud we were able to bring my vision to light.",
    source: "Client",
    proofs: [
      { src: "/testimonials/carita-recoverderm.webp", width: 1200, height: 900, label: "Client message", alt: "Screenshot of the original message from Carita, Founder at RecoverDerm" },
    ],
    logo: { src: "/logos/recoverderm.webp", width: 800, height: 225 },
    projectId: "recoverderm",
  },
  {
    id: "halima",
    group: "client",
    name: "Halima",
    role: "Executive Director",
    company: "AmaniGo Travel",
    quote: "Cybersage delivered a top-notch CMS for our travel agency. It’s user-friendly and has genuinely enhanced our client engagement.",
    highlight: "Cybersage delivered a top-notch CMS for our travel agency.",
    source: "Client",
    proofs: [
      { src: "/testimonials/halima-amanigo.webp", width: 1200, height: 603, label: "Published testimonial", alt: "Published testimonial card from Halima, Executive Director at AmaniGo Travel" },
    ],
    logo: { src: "/logos/amanigo.webp", width: 400, height: 400 },
    projectId: "amanigo",
  },
  {
    id: "godspower-lawrence",
    group: "engineer",
    name: "Godspower Lawrence",
    role: "Software Engineer",
    quote: "I was consistently impressed by his exceptional Python skills, dedication, and attention to detail. He excels at solving complex problems with a systematic approach and collaborates effectively within a team. He is an asset to any team.",
    highlight: "He excels at solving complex problems with a systematic approach and collaborates effectively within a team.",
    source: "LinkedIn",
    proofs: [
      { src: "/testimonials/godspower-lawrence-linkedin.webp", width: 1200, height: 1055, label: "LinkedIn recommendation", alt: "Screenshot of the LinkedIn recommendation from Godspower Lawrence" },
    ],
  },
  {
    id: "precious-ukasoanya",
    group: "engineer",
    name: "Precious Ukasoanya",
    role: "Fullstack Software Engineer",
    quote: "Carrington possesses an in-depth understanding of Python, consistently delivering high-quality code with a keen eye for detail. A great team player who communicates effectively — I wholeheartedly endorse him.",
    highlight: "Carrington possesses an in-depth understanding of Python, consistently delivering high-quality code with a keen eye for detail.",
    source: "LinkedIn",
    proofs: [
      { src: "/testimonials/precious-ukasoanya-linkedin.webp", width: 1200, height: 1993, label: "LinkedIn recommendation", alt: "Screenshot of the LinkedIn recommendation from Precious Ukasoanya" },
    ],
  },
  {
    id: "ashley-j",
    group: "engineer",
    name: "Ashley J.",
    role: "Software Engineer",
    quote: "He consistently delivered quality work on time, communicated effectively, and demonstrated strong technical skills in Python. Professional, reliable, and easy to work with. Highly recommended.",
    highlight: "Professional, reliable, and easy to work with.",
    source: "Upwork",
    proofs: [
      { src: "/testimonials/ashley-upwork.webp", width: 1200, height: 1211, label: "Upwork review", alt: "Screenshot of the Upwork review from Ashley J." },
    ],
  },
];
