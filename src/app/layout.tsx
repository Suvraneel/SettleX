import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import '@styles/fonts.css'
import {ReactNode} from "react";
import {Providers} from "@lib/providers";
import {Analytics} from "@vercel/analytics/react";

export const metadata: Metadata = {
    title: "SettleX",
    description:
        "SettleX is the first confidential clearing and settlement layer for stablecoins, fully compliant, chain-agnostic, and built for institutions.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/favicon.ico" sizes="any"/>
            <link
                rel="icon"
                type="image/png"
                href="/android-chrome-192x192.png"
                sizes="192x192"
            />
            <link
                rel="icon"
                type="image/png"
                href="/android-chrome-512x512.png"
                sizes="512x512"
            />
            <link rel="manifest" href="/site.webmanifest"/>
        </head>
        <body className="font-helvetica scroll-smooth">
        <Providers>
            {children}
            <Analytics/>
        </Providers>
        </body>
        </html>
    );
}
