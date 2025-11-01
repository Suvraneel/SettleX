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
    name: "Union",
    src: "/brands/union-logo-white.svg",
    link: "https://union.build/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX",
  },
  {
    name: "QuickNode",
    src: "/brands/quicknode-logo-white.svg",
    link: "https://www.quicknode.com/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX",
  },
  {
    name: "Axelar",
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
    name: "Forta",
    src: "/brands/forta-logo-white.svg",
    link: "https://forta.org/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX",
  },
  {
    name: "Axelar",
    src: "/brands/axelar-logo-white.svg",
    link: "https://axelar.network/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX",
  },
  {
    name: "Polymer",
    src: "/brands/polymer-logo-white.svg",
    link: "https://polymerlabs.org/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX",
  },
];

export default function Partners() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-transparent flex flex-col justify-center items-center">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-normal leading-tight text-foreground">
          Partners
        </h2>
      </div>
      <div className="mt-12 w-4/5">
        <Marquee>
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />
          <MarqueeContent>
            {partnerLogos.concat(partnerLogos).map((partner, idx) => (
              <MarqueeItem className="h-20" key={idx}>
                <Link
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full bg-card px-6 py-4 rounded-xl flex items-center justify-center"
                >
                  <Image
                    src={partner.src}
                    alt={`${partner.name} logo`}
                    width={160}
                    height={48}
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
