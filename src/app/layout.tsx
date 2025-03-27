import "@/app/globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

import { Navbar } from "@/components/navigation/navbar";
import { Toaster } from "@/components/ui/sonner";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL("https://dream-travels-jade.vercel.app/"),
  title: {
    default: SITE.TITLE,
    template: `%s | ${SITE.TITLE}`,
  },
  description: SITE.DESCRIPTION,
  openGraph: {
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    url: SITE.URL,
    siteName: SITE.TITLE,
    images: [
      {
        url: `${SITE.URL}/images/og.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "es-ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: SITE.TITLE,
    site: SITE.TITLE,
    card: "summary_large_image",
    description: SITE.DESCRIPTION,
    images: [
      {
        url: `${SITE.URL}/images/og.png`,
        alt: `${SITE.TITLE} logo`,
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/apple-icon.png",
  },
};

const oakes = localFont({
  src: [
    {
      path: "../../public/fonts/oakes/light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/oakes/light-italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/oakes/regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/oakes/italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/oakes/medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/oakes/medium-italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/oakes/semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/oakes/semibold-italic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/oakes/bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/oakes/bold-italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-oakes",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="container" suppressHydrationWarning>
      <body className={cn(oakes.variable)}>
        <Navbar />
        <main className="mb-4 md:mb-12">
          <Toaster />
          {children}
        </main>
      </body>
    </html>
  );
}
