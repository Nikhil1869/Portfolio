import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteOrigin } from "@/lib/site";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2",
      weight: "400",
    },
    {
      path: "../../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2",
      weight: "500",
    },
    {
      path: "../../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2",
      weight: "600",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});
const barlow = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-600-normal.woff2",
      weight: "600",
    },
    {
      path: "../../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-700-normal.woff2",
      weight: "700",
    },
  ],
  variable: "--font-barlow",
  display: "swap",
});
const mono = localFont({
  src: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2",
  variable: "--font-plex",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin ?? "http://localhost:3000"),
  title: "Nikhil Suraj | The Developer Paddock",
  description:
    "Devathi Nikhil Suraj — full-stack developer, AI/ML practitioner, and open-source contributor in Hyderabad. Explore practical software, race analytics, and developer tools.",
  applicationName: "The Developer Paddock",
  authors: [{ name: "Devathi Nikhil Suraj" }],
  ...(siteOrigin ? { alternates: { canonical: siteOrigin } } : {}),
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Nikhil Suraj — The Developer Paddock",
    description:
      "Engineered for precision. Built for speed. Full-stack development, applied AI, and open source.",
    ...(siteOrigin ? { url: siteOrigin } : {}),
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nikhil Suraj — Building with precision. Shipping at speed.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhil Suraj — The Developer Paddock",
    images: ["/og-image.png"],
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#08090B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlow.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
