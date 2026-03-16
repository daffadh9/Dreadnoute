import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

import { Playfair_Display } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DreadNoute | Horror Superapp",
  description: "Dimana Ketakutan Menemukan Rumahnya. Platform horor imersif.",
  icons: {
    icon: "/branding/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cinzel.variable} ${playfair.variable} antialiased`}
      >
        <div className="grain-overlay" />
        <div className="vignette" />
        <main className="relative z-10 transition-colors duration-1000">
          <ClientWrapper>{children}</ClientWrapper>
        </main>
        <SpeedInsights />
      </body>
    </html>
  );
}
