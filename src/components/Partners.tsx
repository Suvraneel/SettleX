"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@components/ui/marquee";

const partnerLogos = [
  {
    name: "Axelar",
    src: "/brands/axelar-logo-white.svg",
    link: "https://axelar.network/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX",
  },
  {
    name: "QuickNode",
    src: "/brands/quicknode-logo-white.svg",
    link: "https://www.quicknode.com/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX",
  },
  {
    name: "Concero",
    src: "/brands/concero-logo-white.svg",
    link: "https://concero.io/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX",
  },
  {
    name: "Forta",
    src: "/brands/forta-logo-white.svg",
    link: "https://forta.org/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX",
  },
  {
    name: "Axelar2",
    src: "/brands/axelar-logo-white.svg",
    link: "https://axelar.network/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX",
  },
  {
    name: "Fairblock",
    src: "/brands/fairblock-logo-white.svg",
    link: "https://www.fairblock.network/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX",
  },
  {
    name: "Avail",
    src: "/brands/avail-logo-white.svg",
    link: "https://www.availproject.org/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX",
  },
  {
    name: "Polymer",
    src: "/brands/polymer-logo-white.svg",
    link: "https://polymerlabs.org/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX",
  },
  {
    name: "Union",
    src: "/brands/union-logo-white.svg",
    link: "https://union.build/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX",
  },
];

export default function Partners() {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-transparent flex flex-col justify-center items-center">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-normal leading-tight text-foreground">
          Partners
        </h2>
      </div>

      {/* Mobile: flex wrap with centered last line (3 per row) */}
      <div className="mt-8 w-full md:hidden">
        <ul className="flex flex-wrap justify-evenly gap-2 px-2">
          {partnerLogos.filter((partner) => partner.name !== "Axelar2")
          .map((partner) => (
            <li
              key={partner.name}
              className="list-none flex-[0_0_calc((100%-1rem)/3)]"
            >
              <Link
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${partner.name} (opens in new tab)`}
                className="w-full h-12 sm:h-14 rounded-md flex items-center justify-center"
              >
                <Image
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  width={110}
                  height={32}
                  sizes="(max-width: 640px) calc((100vw-1rem)/3), 25vw"
                  className="object-contain h-5 sm:h-6 w-auto"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop/Tablet: keep marquee for continuous motion */}
      <div className="mt-12 w-11/12 md:w-5/6 lg:w-4/5 hidden md:block">
        <Marquee>
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />
          <MarqueeContent>
            {partnerLogos.concat(partnerLogos).map((partner, idx) => (
              <MarqueeItem className="h-20" key={`${partner.name}-${idx}`}>
                <Link
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${partner.name} (opens in new tab)`}
                  className="w-full h-full bg-card px-6 py-4 rounded-xl flex items-center justify-center"
                >
                  <Image
                    src={partner.src}
                    alt={`${partner.name} logo`}
                    width={180}
                    height={56}
                    sizes="(max-width: 1024px) 160px, 180px"
                    className="object-contain"
                  />
                </Link>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </section>
  );
}
