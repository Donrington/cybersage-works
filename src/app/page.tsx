import { NextPageLink } from "@/components/site/NextPageLink";
import { FromTheStudio } from "@/components/studio/FromTheStudio";
import { ProofOfWork } from "@/components/work/ProofOfWork";
import { WorkHero } from "@/components/work/WorkHero";
import { PROJECTS } from "@/data/projects";
import { LINKS, MAIN_SITE_URL, PERSON, SITE_URL } from "@/lib/site";

// Links this page to the Person entity on cybersage.dev, and lists the work.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#page`,
      url: `${SITE_URL}/`,
      name: `Selected work of ${PERSON.name}`,
      mainEntity: { "@id": `${MAIN_SITE_URL}/#person` },
      hasPart: { "@id": `${SITE_URL}/#work` },
    },
    {
      "@type": "Person",
      "@id": `${MAIN_SITE_URL}/#person`,
      name: PERSON.name,
      alternateName: PERSON.alias,
      jobTitle: PERSON.role,
      url: MAIN_SITE_URL,
      image: `${SITE_URL}/me.webp`,
      email: `mailto:${LINKS.email}`,
      sameAs: [LINKS.github, LINKS.linkedin, LINKS.x],
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#work`,
      name: "Proof of work",
      numberOfItems: PROJECTS.length,
      itemListElement: PROJECTS.map((p) => ({
        "@type": "ListItem",
        position: p.no,
        item: {
          "@type": "CreativeWork",
          name: p.name,
          description: p.tagline,
          dateCreated: String(p.year),
          genre: p.category,
          keywords: p.stack.join(", "),
          creator: { "@id": `${MAIN_SITE_URL}/#person` },
          ...(p.link ? { url: p.link } : {}),
        },
      })),
    },
  ],
};

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <WorkHero />
      <ProofOfWork />
      <FromTheStudio />
      <NextPageLink href="/testimonials" label="Testimonials" />
    </>
  );
}
