// components/FAQ.tsx
'use client';

import {Accordion} from '@radix-ui/react-accordion';
import {AccordionContent, AccordionItem, AccordionTrigger} from "@components/ui/accordion";
import Image from "next/image";

interface FAQItem {
    question: string;
    answer: string;
}

const faqList: FAQItem[] = [
    {
        question: '1. What is SettleX?',
        answer:
            'SettleX is the first confidential settlement layer for stablecoins. It nets cross-chain transfers into a single transaction, reducing cost and protecting privacy for institutions.',
    },
    {
        question: '2. How does multilateral netting work in SettleX?',
        answer:
            'Multilateral netting aggregates multiple cross-chain transfers across different participants into a single “net” settlement, drastically cutting bridging fees and operational overhead.',
    },
    {
        question: '3. Is SettleX compliant with regulations?',
        answer:
            'Yes. SettleX is built to meet regulatory requirements. Institutions can customize on-chain KYC/AML checks before executing confidential settlements.',
    },
    {
        question: '4. Which chains does SettleX support?',
        answer:
            'SettleX supports all major EVM-compatible chains and bridges, including Ethereum, Polygon, Arbitrum, Optimism, Base, and more.',
    },
    {
        question: '5. Who can use SettleX?',
        answer:
            'Institutional players like market makers, liquidity providers, and traditional financial firms can leverage SettleX for secure, confidential cross-chain stablecoin settlements.',
    },
];

export default function FAQ() {
    return (
        <section id="faq"
                 className="relative w-full mt-4 py-16 px-6 md:px-12 lg:px-24 overflow-clip">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-normal leading-tight text-foreground">Frequently Asked
                    Questions</h2>
                <p className="mt-4 font-light text-base text-muted-foreground">If you need to know about using SettleX
                    features, compliance, or supported chains.</p>
            </div>
            <>
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
            </>
            <div className="mt-8 max-w-2xl mx-auto space-y-4">
                {faqList.map((item, idx) => (
                    <Accordion type="single" collapsible key={idx}
                               className="bg-card rounded-xl">
                        <AccordionItem value={`item-${idx + 1}`}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </section>
    );
}
