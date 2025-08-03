import type { Metadata } from "next";
import "./globals.css";
import "@styles/fonts.css";
import { ReactNode } from "react";
import { Providers } from "@lib/providers";
import { Analytics } from "@vercel/analytics/react";
import { headers } from "next/headers";
import ContextProvider from "@lib/context";

export const metadata: Metadata = {
  title: "SettleX",
  description:
    "SettleX is the first confidential clearing and settlement layer for stablecoins, fully compliant, chain-agnostic, and built for institutions.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");
  return (
    <html lang="en">
      <head></head>
      <body className="font-helvetica scroll-smooth">
        <ContextProvider cookies={cookies}>
          <Providers>
            {children}
            <Analytics />
          </Providers>
        </ContextProvider>
      </body>
    </html>
  );
}
