"use client";
import {FloatingNav} from "@components/ui/floating-navbar";
import {ThemeProvider} from "@components/theme-provider";
import {BrandGithub, BrandSlack, BrandTelegram, BrandX, ChevronRight} from "@mynaui/icons-react";
import Spline from "@splinetool/react-spline";

const navItems = [
    {name: "X", link: "/", icon: <BrandX className="h-5 w-5"/>},
    {name: "Telegram", link: "/", icon: <BrandTelegram className="h-5 w-5"/>},
    {name: "Github", link: "/", icon: <BrandGithub className="h-5 w-5"/>},
    {name: "Slack", link: "/", icon: <BrandSlack className="h-5 w-5"/>},
];

export default function Home() {
    return (
        <div
            className="h-screen overflow-hidden grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col relative gap-8 row-start-2 items-center sm:items-start">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <FloatingNav navItems={navItems}/>
                    <div
                        className="h-2/3 w-full dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-start">
                        <div className="w-1/2 flex flex-col">
                            <span className="text-2xl capitalize text-cyan-300 max-[410px]:text-xl xl:text-4xl"
                                  aria-label="Encrypted dynamic text">
                                Encrypted <span className="text-black dark:text-white" aria-live="polite"
                                                role="text">transfers</span>
                            </span>
                            <h1 className="mt-4 text-3xl leading-snug min-[410px]:text-4xl xl:text-6xl 2xl:text-7xl">
                                The Modular<br/>
                                <span className="text-black dark:text-white" aria-live="polite" role="text">Interoperability</span><br/>
                                Hall
                            </h1>
                            <p className="mt-4 text-base text-black dark:text-white/70 max-[410px]:text-sm sm:pr-4 xl:text-xl">
                                SettleX is the first FhEVM Clearing Layer, solving fragmentation in modular blockchains
                                while providing privacy for users. non-EVM networks.
                            </p>
                            <p className="mt-8 flex items-center gap-4 sm:gap-8 text-base text-black dark:text-white/70 max-[410px]:text-sm xl:text-xl"
                               aria-label="Powered by Union">
                                Powered by:
                                <span className="flex items-center gap-4 sm:gap-8">
                                    <a href="https://union.build" rel="noopener noreferrer" target="_blank"
                                       className="group">
                                        <img alt="Union - A Fluton Partner" draggable="false" loading="lazy" width="656"
                                             height="182" decoding="async" data-nimg="1"
                                             className="h-6 w-auto select-none group-hover:opacity-70 sm:h-8"
                                             style={{color: "transparent"}} src="./union-logo-white.svg"/>
                                    </a>
                                </span>
                            </p>
                            <div className="mt-16 flex items-center gap-8 max-[410px]:gap-2">
                                <a href="mailto: settlexfoundation@gmail.com" target="_blank" rel="noopener noreferrer"
                                   aria-label="Contact Us">
                                    <button
                                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
                                        text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                                        disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
                                        bg-primary hover:bg-zinc-700 text-primary-foreground shadow hover:bg-primary/70 px-4 py-2 h-[38px]">
                                        Contact Us
                                    </button>
                                </a>
                                <a aria-label="Join the waitlist" href="/join-waitlist">
                                    <button
                                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
                                        text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                                        disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 group
                                        bg-transparent shadow border border-cyan-300 text-black dark:text-white hover:bg-accent/30 hover:text-neutral-500 h-9 px-4 py-2">
                                        Join Waitlist<ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform"/>
                                    </button>
                                </a>
                            </div>
                        </div>
                        <div className="w-7/12 absolute right-0 h-[80vh] flex items-center justify-center">
                            <Spline
                                scene="https://prod.spline.design/L9ko-MFfr72kdSnS/scene.splinecode"
                            />
                        </div>
                    </div>
                </ThemeProvider>
            </main>
        </div>
    );
}