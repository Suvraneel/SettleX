import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import Header from "@components/Header";
import {NextThemeProvider} from "@/lib/theme-provider";
import {Analytics} from "@vercel/analytics/react"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SettleX",
    description: "SettleX is the first Privacy-Preserving Cross-Chain Clearing and Settlement Layer",
};

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextThemeProvider attribute="class" defaultTheme="dark" storageKey='theme' disableTransitionOnChange={false}>
            <Header/>
            {children}
            <Analytics/>
        </NextThemeProvider>
        </body>
        </html>
    );
}
