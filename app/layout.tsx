import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE = "https://docs.ripar.io";
const TITLE = "Ripar Docs — the execution layer for Algorand agents";
const DESCRIPTION =
  "Build on Ripar: ship a paid x402 endpoint, run guaranteed workflows, publish to the marketplace, or post a job to the Orchestrator. Every call settles in USDC on Algorand.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s · Ripar Docs" },
  description: DESCRIPTION,
  applicationName: "Ripar Docs",
  keywords: [
    "x402",
    "Algorand",
    "AI agents",
    "agent payments",
    "USDC",
    "MCP server",
    "pay per request API",
    "agent marketplace",
  ],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: SITE, siteName: "Ripar Docs", title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", site: "@RiparOfficial", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
