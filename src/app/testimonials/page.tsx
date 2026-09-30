import type { Metadata } from "next";
import { NextPageLink } from "@/components/site/NextPageLink";
import { TestimonialsPage } from "@/components/testimonials/TestimonialsPage";
import { OG_IMAGE, PERSON } from "@/lib/site";

const TITLE = `Testimonials | ${PERSON.name}`;
const DESCRIPTION = `What clients and engineers say about working with ${PERSON.name}, each quote shown next to the original message, LinkedIn recommendation or Upwork review.`;

export const metadata: Metadata = {
  title: "Testimonials",
  description: DESCRIPTION,
  alternates: { canonical: "/testimonials" },
  openGraph: {
    type: "website",
    url: "/testimonials",
    siteName: `${PERSON.name}, selected work`,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@CarlSwitch_CHUG",
    images: [OG_IMAGE.url],
  },
};

export default function Testimonials() {
  return (
    <>
      <TestimonialsPage />
      <NextPageLink href="/" label="Proof of work" />
    </>
  );
}
