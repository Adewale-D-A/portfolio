import type { Metadata } from "next";
import { Raleway, Arizonia } from "next/font/google";
import "./globals.css";
import Menu from "@/components/layout";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  //👇 Add variable to our object
  variable: "--font-raleway",
});

const arizonia = Arizonia({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-arizonia",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Adewale",
    default: "Adewale",
  },
  description:
    "Driven to craft diverse, intuitive user interfaces that elevate digital experiences, build digital systems for all use-case and solve real-world problems.",
  applicationName: "Adewale's Portfolio",
  referrer: "origin-when-cross-origin",
  keywords: [
    "IT",
    "engineering",
    "build",
    "technology",
    "deployment",
    "frontend",
    "backend",
    "tech",
    "fullstack",
    "software",
    "app",
    "applications",
  ],
  manifest: "https://www.adewaleda.space/manifest.json",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        className={`${raleway.variable} ${arizonia.variable} ${raleway.className}`}
      >
        {children}
        <Menu />
      </body>
    </html>
  );
}
