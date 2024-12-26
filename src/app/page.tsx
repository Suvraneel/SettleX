import {ChevronRight} from "@mynaui/icons-react";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import Link from "next/link";
import TextScramble from "@components/ui/Scrambler";

const encryptedSuffixPhrases = [
    'Transfers',
    'Swaps',
    'Intents'
];
const phrases = [
    'Interoperability',
    'Confidentiality',
    'High Performance',
    'Scalability',
    'Communication',
    'Privacy',
    'Liquidity'
];
export default function Home() {
    return (
        <div
            className="h-screen w-screen overflow-hidden flex justify-evenly items-center p-5 min-h-screen font-[family-name:var(--font-geist-sans)]">
            <main
                className="w-full h-full flex flex-col relative items-center dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
                <div
                    className="mt-40 h-full md:h-2/3 w-full relative flex items-start justify-start px-10">
                    <div className="w-full lg:w-1/2 h-full flex flex-col justify-evenly items-start">
                            <span className="text-2xl capitalize text-cyan-300 xl:text-4xl"
                                  aria-label="Encrypted dynamic text">
                                Encrypted <span className="text-black dark:text-white " aria-live="polite"
                                                role="text"><TextScramble phrases={encryptedSuffixPhrases}/></span>
                            </span>
                        <h1 className="mt-4 text-base sm:text-2xl leading-snug md:text-4xl xl:text-5xl 2xl:text6xl">
                            The Modular{" "}<br/>
                            <span className="text-black dark:text-white" aria-live="polite"
                                  role="text"><TextScramble phrases={phrases}/></span><br/>
                            Hall
                        </h1>
                        <p className="mt-4 text-xs sm:text-base md:text-xl text-black dark:text-white/70 sm:pr-4">
                            SettleX is the first FhEVM Clearing Layer, solving fragmentation in modular blockchains
                            while providing privacy for users. non-EVM networks.
                        </p>
                        <p className="mt-5 sm:mt-8 md:mt-12 flex items-center gap-4 sm:gap-8 text-base text-black dark:text-white/70 max-[410px]:text-sm xl:text-xl"
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
                        <div
                            className="w-full h-full mt-5 sm:mt-8 md:mt-12 flex flex-col sm:flex-row justify-start items-start gap-3 sm:gap-8 max-[410px]:gap-2 relative">
                            <Link href="mailto: settlexfoundation@gmail.com" target="_blank" rel="noopener noreferrer"
                                  aria-label="Contact Us">
                                <button
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
                                        text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                                        disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
                                        bg-primary hover:bg-zinc-400 text-primary-foreground shadow px-4 py-2">
                                    Contact Us
                                </button>
                            </Link>
                            <Link aria-label="Join the waitlist" href="/waitlist">
                                <button
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
                                        text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                                        disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 group
                                        bg-transparent shadow border border-cyan-300 text-black dark:text-white hover:bg-accent/40 hover:text-neutral-500 h-9 px-4 py-2">
                                    Join Waitlist<ChevronRight
                                    className="h-4 w-4 group-hover:translate-x-1 transition-transform"/>
                                </button>
                            </Link>
                            <p className="absolute right-0 bottom-0 text-xs text-white mt-4">© 2025 SettleX. All
                                rights reserved.</p>
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