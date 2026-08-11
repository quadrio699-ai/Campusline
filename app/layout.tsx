import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted (not fetched from Google's servers at request time) so the
// site keeps working reliably on slow or unstable mobile connections.
const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk-Variable.ttf",
  variable: "--font-space-grotesk",
  display: "swap",
  weight: "300 700",
});

const plexSans = localFont({
  src: "./fonts/IBMPlexSans-Variable.ttf",
  variable: "--font-plex-sans",
  display: "swap",
  weight: "400 700",
});

const plexMono = localFont({
  src: [
    { path: "./fonts/IBMPlexMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexMono-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

// TODO: replace with your real deployed URL once it's live on Vercel.
const siteUrl = "https://campusline.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CampusLine — Registration help and a direct line for LASU students",
  description:
    "CampusLine is an independent tool for LASU students: registration season tips, and a direct, anonymous line to raise what isn't working. Built by a concerned LASU student.",
  keywords: [
    "LASU",
    "LASU registration help",
    "LASU registration tips",
    "Lagos State University",
  ],
  authors: [{ name: "Marvellous Al-ameen" }],
  openGraph: {
    title: "CampusLine — A direct line for LASU students",
    description:
      "Registration season tips and a direct line to raise what isn't working, from a concerned LASU student.",
    url: siteUrl,
    siteName: "CampusLine",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CampusLine — A direct line for LASU students",
    description:
      "Registration season tips and a direct line to raise what isn't working.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "CampusLine",
      url: siteUrl,
      description:
        "Registration help and a direct line for LASU students to raise concerns.",
    },
    {
      "@type": "Person",
      name: "Marvellous Al-ameen",
      url: siteUrl,
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "Lagos State University",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable} font-body`}
      >
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
