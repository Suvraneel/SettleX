"use client";
import {FloatingNav} from "@components/ui/floating-navbar";
import {BrandGithub, BrandSlack, BrandTelegram, BrandX, ChevronRight} from "@mynaui/icons-react";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import {useTheme} from "next-themes";

const navItems = [
    {name: "X", link: "/", icon: <BrandX className="h-5 w-5"/>},
    {name: "Telegram", link: "/", icon: <BrandTelegram className="h-5 w-5"/>},
    {name: "Github", link: "/", icon: <BrandGithub className="h-5 w-5"/>},
    {name: "Slack", link: "/", icon: <BrandSlack className="h-5 w-5"/>},
];

export default function Home() {
    const {resolvedTheme} = useTheme();
    console.log("Current theme:", resolvedTheme);
    return (
        <div
            className="h-screen overflow-hidden grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col relative gap-8 row-start-2 items-center sm:items-start">
                <Image src={resolvedTheme === 'dark' ? 'SettleXClrInv.svg' : './SettleXClr.svg'}
                       alt={'SettleX-logo'}
                       width={200} height={200}
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                       className='ml-10 mt-20 sm:mt-3 md:mt-0 md:ml-5 h-20 w-20 md:h-40 md:w-40 self-start'
                />
                <FloatingNav navItems={navItems}/>
                <div
                    className="h-2/3 w-full dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-start justify-start px-10">
                    <div className="w-full md:w-1/2 flex flex-col items-start">
                            <span className="text-2xl capitalize text-cyan-300 max-[410px]:text-xl xl:text-4xl"
                                  aria-label="Encrypted dynamic text">
                                Encrypted <span className="text-black dark:text-white" aria-live="polite"
                                                role="text">transfers</span>
                            </span>
                        <h1 className="mt-4 text-3xl leading-snug md:text-4xl xl:text-5xl 2xl:text6xl">
                            The Modular<br/>
                            <span className="text-black dark:text-white" aria-live="polite"
                                  role="text">Interoperability</span><br/>
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
                                    <a href="https://union.build?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX"
                                       rel="noopener noreferrer" target="_blank"
                                       className="group">
                                        <Image alt="Union - Partner" draggable="false" loading="lazy" width="656"
                                               height="182" decoding="async" data-nimg="1"
                                               className="h-6 w-auto select-none group-hover:opacity-70 sm:h-8 dark:filter-invert"
                                               src="./union-logo-white.svg"/>
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
                                    Join Waitlist<ChevronRight
                                    className="h-4 w-4 group-hover:translate-x-1 transition-transform"/>
                                </button>
                            </a>
                        </div>
                    </div>
                    <div
                        className="w-2/3 md:w-7/12 h-1/3 md:h-full absolute right-0 items-center justify-center hidden lg:flex">
                        <Spline
                            scene="https://prod.spline.design/L9ko-MFfr72kdSnS/scene.splinecode"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}