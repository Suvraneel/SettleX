// components/FAQ.tsx
"use client";

import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import Image from "next/image";

interface FAQItem {
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    question: "1. What is SettleX?",
    answer:
      "SettleX is the first confidential clearing and settlement layer for stablecoins. We help institutions and high-value liquidity users bridge assets across chains more efficiently and privately.",
  },
  {
    question: "2. Who can use SettleX?",
    answer:
      "Anyone looking to achieve maximum capital efficiency on bridging can use SettleX. Our core customers are institutional and high value users, including market makers, solvers, and liquidity providers bridging large amounts daily.",
  },
  {
    question: "3. Which chains does SettleX support?",
    answer:
      "SettleX is chain-agnostic and integrates seamlessly with all major blockchains, bridges, and intent networks.",
  },
  {
    question: "4. How does multilateral netting work in SettleX?",
    answer:
      "Instead of bridging every transaction, SettleX aggregates all cross-chain flows and bridges only the net delta. This significantly reduces transaction volume and cost.",
  },
  {
    question: "5. Is SettleX compliant with regulations?",
    answer:
      "Yes. SettleX is built with institutional-grade compliance in mind, ensuring secure and trusted settlement processes across jurisdictions.",
  },
  {
    question: "6. How can I integrate SettleX into my operations?",
    answer:
      "SettleX offers modular, plug-and-play architecture, making integration straightforward for intent networks, liquidity protocols, and other institutional partners.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative w-full mt-4 py-16 px-6 md:px-12 lg:px-24 overflow-clip"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-normal leading-tight text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 sm:mt-4 font-light text-base text-muted-foreground">
          If you need to know about using SettleX features, compliance, or
          supported chains.
        </p>
      </div>
      <Image
        src="/hero/floating-coin-1.svg"
        alt="USDC"
        width={150}
        height={150}
        className="absolute top-40 left-80 animate-float opacity-30 -z-10"
      />
      <Image
        src="/hero/floating-coin-4.svg"
        alt="USDT"
        width={150}
        height={150}
        className="absolute top-96 -right-12 animate-float delay-3000 opacity-30"
      />
      <div className="mt-8 max-w-2xl mx-auto space-y-4">
        {faqList.map((item, idx) => (
          <Accordion
            type="single"
            collapsible
            key={item.question.charAt(0)}
            className="bg-card rounded-xl"
          >
            <AccordionItem value={`item-${idx + 1}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
}
