import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next";

const fallbackFontVariables = {
  "--font-inter": "Inter, Arial, sans-serif",
  "--font-cinzel": "Cinzel, Georgia, serif",
  "--font-playfair": "\"Playfair Display\", \"Times New Roman\", serif",
} as CSSProperties;

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
      <body style={fallbackFontVariables} className="antialiased">
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
