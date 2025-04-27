import { ChevronRight } from "@mynaui/icons-react";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import Link from "next/link";
import TextScramble from "@components/Scrambler";

const encryptedSuffixPhrases = ["Compute", "Transfers", "Swaps", "Intents"];
const layerPrefixPhrases = ["Interoperability", "Confidentiality", "Scalability", "Communication", "Privacy", "Liquidity", "Security"];
export default function Home() {
  return (
    <div className="h-screen w-screen overflow-hidden flex justify-evenly items-center p-5 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="w-full h-full flex flex-col relative items-center dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
        <div className="mt-40 h-full md:h-2/3 w-full relative flex items-start justify-start px-10">
          <div className="w-full lg:w-1/2 h-full flex flex-col justify-evenly items-start">
            <span
              className="text-lg md:text-2xl capitalize text-cyan-700 dark:text-cyan-300 xl:text-4xl"
              aria-label="Encrypted dynamic text"
            >
              Encrypted{" "}
              <span
                className="text-black dark:text-white "
                aria-live="polite"
                role="text"
              >
                <TextScramble phrases={encryptedSuffixPhrases} />
              </span>
            </span>
            <h1 className="mt-4 text-base sm:text-2xl leading-snug md:text-4xl xl:text-5xl 2xl:text6xl">
              The Modular <br />
              <span
                className="text-black dark:text-white"
                aria-live="polite"
                role="text"
              >
                <TextScramble phrases={layerPrefixPhrases} />
              </span>
              <br />
              Layer
            </h1>
            <p className="mt-4 text-xs sm:text-base md:text-xl text-black dark:text-white/70 sm:pr-4">
              SettleX is the first Privacy-Preserving Cross-Chain Clearing and Settlement Layer
            </p>
            <p
              className="mt-3 sm:mt-5 md:mt-8 flex items-center gap-4 sm:gap-8 text-xs sm:text-sm md:text-lg xl:text-xl text-black dark:text-white/70"
              aria-label="Powered by Union"
            >
              Powered by:
              <span className="flex items-center gap-4 sm:gap-8">
                <a
                  href="https://union.build?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="group"
                >
                  <Image
                    alt="Union - Partner"
                    draggable="false"
                    loading="lazy"
                    width="656"
                    height="182"
                    decoding="async"
                    data-nimg="1"
                    className="h-4 sm:h-7 md:h-8 w-auto select-none group-hover:opacity-70 invert dark:invert-0"
                    src="/brands/union-logo-white.svg"
                  />
                </a>
              </span>
              <span className="flex items-center gap-4 sm:gap-8">
                <a
                  href="https://www.quicknode.com?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="group"
                >
                  <Image
                    alt="QuickNode - Partner"
                    draggable="false"
                    loading="lazy"
                    width="656"
                    height="182"
                    decoding="async"
                    data-nimg="1"
                    className="h-4 sm:h-7 md:h-8 w-auto select-none group-hover:opacity-70 dark:invert dark:hue-rotate-180"
                    src="/brands/quicknode-logo.png"
                  />
                </a>
              </span>
            </p>
            <div className="w-full h-full mt-3 sm:mt-5 md:mt-8 lg:mt-16 flex flex-col sm:flex-row justify-start items-start gap-3 sm:gap-8 max-[410px]:gap-2">
              <Link
                href="mailto: settlexfoundation@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Us"
              >
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
                                        text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                                        disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
                                        bg-primary hover:bg-cyan-400 text-primary-foreground shadow px-4 py-2"
                >
                  Contact Us
                </button>
              </Link>
              <Link aria-label="Join the waitlist" href="/waitlist">
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
                                        text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                                        disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 group
                                        bg-transparent shadow border border-primary text-black dark:text-white hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                >
                  Join Waitlist
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
          <div className="w-2/3 md:w-7/12 h-1/3 md:h-full absolute right-0 items-center justify-center hidden lg:flex overflow-visible">
            <Spline
              className="w-full h-full overflow-visible"
              scene="https://prod.spline.design/nUEenSI34SZGnWJ3/scene.splinecode"
            />
          </div>
        </div>
        <p className="absolute right-0 bottom-0 text-right text-xs text-neutral-500 mt-4">
          &copy; 2025 SettleX. All rights reserved.
        </p>
      </main>
    </div>
  );
}
