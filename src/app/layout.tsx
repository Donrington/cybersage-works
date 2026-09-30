import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { MAIN_SITE_URL, OG_IMAGE, PERSON, SITE_URL } from "@/lib/site";
import "./globals.css";

const satoshi = localFont({
  src: [{ path: "../fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" }],
  variable: "--font-satoshi",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

const DESCRIPTION =
  "Selected work of Abakwe Carrington, an infrastructure and systems architect: 24 shipped products across healthcare, energy, commerce and AI, with testimonials from clients and engineers.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Selected work | ${PERSON.name}, ${PERSON.role}`,
    template: `%s | ${PERSON.name}`,
  },
  description: DESCRIPTION,
  applicationName: `${PERSON.name}, selected work`,
  authors: [{ name: PERSON.name, url: MAIN_SITE_URL }],
  creator: PERSON.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${PERSON.name}, selected work`,
    title: `Selected work | ${PERSON.name}`,
    description: DESCRIPTION,
    locale: "en",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `Selected work | ${PERSON.name}`,
    description: DESCRIPTION,
    creator: "@CarlSwitch_CHUG",
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${satoshi.variable} ${instrument.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
