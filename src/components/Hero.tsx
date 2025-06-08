// components/Hero.tsx
'use client';

import Image from 'next/image';
import {useEffect} from 'react';
import {Button} from "@components/ui/button";
import {Parallax} from 'react-scroll-parallax';

export default function Hero() {
    // Optional: Simple floating animation using CSS keyframes
    useEffect(() => {
        // Could add JS-driven animations here if desired
    }, []);

    return (
        <section
            id="hero"
            className="relative flex flex-col items-center text-center"
        >
            {/* Radial Blur Effect */}
            <div
                className="absolute -translate-y-1/2 inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(23,193,222,0.45)_0%,_transparent_80%)] blur-3xl z-0 scale-y-125 scale-x-75"/>
            <div
                className="absolute -translate-y-1/2 inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(23,193,222,0.35)_0%,_transparent_50%)] blur-xl z-0 scale-y-150 scale-x-75"/>
            <div
                className="absolute -translate-y-1/2 inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(23,193,222,0.15)_0%,_transparent_30%)] blur-md z-0 scale-y-150 scale-x-75"/>

            {/* Rays */}
            <div className="absolute -top-20 w-1/2 h-[50vh] pointer-events-none select-none">
                <Image
                    src="/hero/Rays.svg"
                    alt="Sunray"
                    width={1000}
                    height={1000}
                    className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-auto blur-sm scale-125"
                />
            </div>

            <div className="relative pt-20 h-full w-full flex flex-col items-center text-center">
                {/* Floating Icons */}
                <div className="absolute -top-12 w-1/2 h-full pointer-events-none">
                    <Image
                        src="/hero/floating-coin-3.svg"
                        alt="Flow"
                        width={110}
                        height={120}
                        className="absolute top-32 left-[19rem] animate-float delay-1000"
                    />
                    <Image
                        src="/hero/floating-coin-1.svg"
                        alt="USDC"
                        width={120}
                        height={120}
                        className="absolute top-48 left-28 animate-float"
                    />
                    <Image
                        src="/hero/floating-coin-2.svg"
                        alt="Doge"
                        width={120}
                        height={120}
                        className="absolute top-36 right-28 animate-float delay-2000"
                    />
                    <Image
                        src="/hero/floating-coin-4.svg"
                        alt="USDT"
                        width={120}
                        height={120}
                        className="absolute top-72 left-80 animate-float delay-3000"
                    />
                </div>
            </div>

            {/* Hero CTA Section */}
            <Parallax speed={20}>
                <div className="relative mt-80 -top-5 flex flex-col items-center justify-center">
                    {/* Hero Text */}
                    <h1 className="text-4xl md:text-6xl font-normal leading-tight max-w-xl text-foreground">
                        The Settlement Layer for Stablecoins
                    </h1>
                    <p className="mt-4 font-light text-base max-w-xl text-muted-foreground">
                        SettleX is the first confidential settlement layer for stablecoins. We net cross-chain transfers
                        to
                        cut
                        capital cost, ensure institutional privacy, and enable compliance all in one seamless,
                        chain-agnostic
                        solution.
                    </p>

                    {/* Email Input & Button */}
                    <div className="mt-8 h-12 flex flex-col sm:flex-row items-center gap-2">
                        <input
                            type="email"
                            placeholder="yourname@gmail.com"
                            aria-label="Email for waitlist"
                            className="h-full w-64 sm:w-80 px-4 py-3 rounded-xl bg-input border border-border placeholder-muted-foreground_60
                        text-white focus:outline-none focus:ring-2 focus:ring-teal-400 backdrop-blur"
                        />
                        <Button>Join Waitlist</Button>
                    </div>
                </div>
            </Parallax>
            <>
                <Image
                    src="/hero/floating-coin-1.svg"
                    alt="USDC"
                    width={150}
                    height={150}
                    className="absolute top-[100vh] -left-10 animate-float opacity-30"
                />
                <Image
                    src="/hero/floating-coin-4.svg"
                    alt="USDT"
                    width={150}
                    height={150}
                    className="absolute top-[150vh] right-10 animate-float delay-3000 opacity-30"
                />
            </>
            <Parallax speed={50}>
                <div className="relative h-full w-full flex flex-col items-center text-center">
                    <div
                        className="w-2/3 mt-40 mb-52 flex flex-col items-center justify-center text-3xl font-normal flex-wrap text-wrap">
                        SettleX
                        is the first confidential settlement layer for stablecoins
                        built to cut cross-chain costs and protect trading privacy. By bridging only
                        the net difference of flows, it offers the most capital-efficient and private way
                        for institutions like market makers and liquidity providers
                        move stablecoins
                        across chains.
                    </div>
                </div>
            </Parallax>
        </section>
    );
}
