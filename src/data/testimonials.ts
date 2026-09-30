// Testimonials. Every quote is backed by a screenshot of the original
// (proof). Client quotes link to the project they're about (projectId).
import type { ImageAsset } from './projects';

export type TestimonialSource = 'Client' | 'LinkedIn' | 'Upwork';

export interface ProofImage extends ImageAsset {
  alt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  /** Client company. Absent for peer endorsements (LinkedIn) and marketplace reviews (Upwork). */
  company?: string;
  quote: string;
  source: TestimonialSource;
  /** Screenshot of the original message / recommendation / review. */
  proof: ProofImage;
  /** Second proof, e.g. the quote as published on the client's own site. */
  extraProof?: ProofImage;
  /** White-on-transparent client logo (for dark surfaces; invert on light). */
  logo?: ImageAsset;
  projectId?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "hycinth",
    name: "Hycinth",
    role: "Chief Executive Officer",
    company: "SAMDUS Oil & Gas",
    quote: "It has been quite a pleasure and delightful experience working with you. Your professionalism, dedication, commitment, enthusiasm, passion, and especially patience are all commendable.",
    source: "Client",
    proof: { src: '/testimonials/hycinth-samdus.webp', width: 1200, height: 1428, alt: "Screenshot of the original feedback from Hycinth, Chief Executive Officer at SAMDUS Oil & Gas" },
    extraProof: { src: '/testimonials/hycinth-samdus-site.webp', width: 1200, height: 605, alt: "Hycinth's quote as published on the SAMDUS Oil & Gas website" },
    logo: { src: '/logos/samdus.webp', width: 416, height: 128 },
    projectId: "samdus",
  },
  {
    id: "carita",
    name: "Carita",
    role: "Founder",
    company: "RecoverDerm",
    quote: "The website is beautiful — already I’m getting a lot of compliments. I’m happy and proud we were able to bring my vision to light.",
    source: "Client",
    proof: { src: '/testimonials/carita-recoverderm.webp', width: 1200, height: 900, alt: "Screenshot of the original feedback from Carita, Founder at RecoverDerm" },
    logo: { src: '/logos/recoverderm.webp', width: 800, height: 225 },
    projectId: "recoverderm",
  },
  {
    id: "halima",
    name: "Halima",
    role: "Executive Director",
    company: "AmaniGo Travel",
    quote: "Cybersage delivered a top-notch CMS for our travel agency. It’s user-friendly and has genuinely enhanced our client engagement.",
    source: "Client",
    proof: { src: '/testimonials/halima-amanigo.webp', width: 1200, height: 603, alt: "Screenshot of the original feedback from Halima, Executive Director at AmaniGo Travel" },
    logo: { src: '/logos/amanigo.webp', width: 400, height: 400 },
    projectId: "amanigo",
  },
  {
    id: "godspower-lawrence",
    name: "Godspower Lawrence",
    role: "Software Engineer",
    quote: "I was consistently impressed by his exceptional Python skills, dedication, and attention to detail. He excels at solving complex problems with a systematic approach and collaborates effectively within a team. He is an asset to any team.",
    source: "LinkedIn",
    proof: { src: '/testimonials/godspower-lawrence-linkedin.webp', width: 1200, height: 1055, alt: "Screenshot of the original LinkedIn recommendation from Godspower Lawrence" },
  },
  {
    id: "precious-ukasoanya",
    name: "Precious Ukasoanya",
    role: "Fullstack Software Engineer",
    quote: "Carrington possesses an in-depth understanding of Python, consistently delivering high-quality code with a keen eye for detail. A great team player who communicates effectively — I wholeheartedly endorse him.",
    source: "LinkedIn",
    proof: { src: '/testimonials/precious-ukasoanya-linkedin.webp', width: 1200, height: 1993, alt: "Screenshot of the original LinkedIn recommendation from Precious Ukasoanya" },
  },
  {
    id: "ashley-j",
    name: "Ashley J.",
    role: "Software Engineer",
    quote: "He consistently delivered quality work on time, communicated effectively, and demonstrated strong technical skills in Python. Professional, reliable, and easy to work with. Highly recommended.",
    source: "Upwork",
    proof: { src: '/testimonials/ashley-upwork.webp', width: 1200, height: 1211, alt: "Screenshot of the original Upwork review from Ashley J." },
  },
];
