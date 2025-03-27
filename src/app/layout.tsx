import "@/app/globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

import { Navbar } from "@/components/navigation/navbar";
import { Toaster } from "@/components/ui/sonner";
// // import { TripCountdown } from "@/components/trip-countdown";

export const metadata: Metadata = {
  title: "Dream Travels",
  description: "Dream Travels",
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
        {/* <TripCountdown /> */}
        <main className="mb-12">
          <Toaster />
          {children}
        </main>
      </body>
    </html>
  );
}
