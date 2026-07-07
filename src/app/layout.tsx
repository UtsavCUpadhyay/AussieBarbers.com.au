import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://aussiebarbers.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AussieBarbers — Premium Mobile Barbers in Brisbane, At Your Door",
    template: "%s | AussieBarbers",
  },
  description:
    "Australia's premium mobile barber platform. Book a verified, insured barber to your home, office, hotel or event in Brisbane. Sharp cuts, fades and beard work — in under 60 seconds.",
  keywords: [
    "mobile barber Brisbane",
    "barber near me",
    "home haircut Brisbane",
    "mobile fade Brisbane",
    "wedding barber",
    "corporate barber",
    "beard trim Brisbane",
    "same day barber",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: SITE_URL,
    siteName: "AussieBarbers",
    title: "AussieBarbers — Premium Mobile Barbers, At Your Door",
    description:
      "Book a verified, insured mobile barber to your home, office or event in Brisbane. The future of barbering in Australia.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        {children}
      </body>
    </html>
  );
}
