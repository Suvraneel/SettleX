// components/FAQ.tsx
'use client';

import { useState } from 'react';

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
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleIndex = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section id="faq" className="py-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-normal leading-tight text-foreground">Frequently Asked Questions</h2>
                <p className="mt-4 font-light text-base text-muted-foreground">If you need to know about using SettleX features, compliance, or supported chains.</p>
            </div>

            <div className="mt-8 max-w-3xl mx-auto space-y-4">
                {faqList.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-[#1f1f2c] rounded-lg overflow-hidden"
                    >
                        <button
                            onClick={() => toggleIndex(idx)}
                            aria-expanded={openIndex === idx}
                            className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                        >
                            <span className="text-gray-100 font-medium">{item.question}</span>
                            <span className="text-teal-400 text-xl">
                {openIndex === idx ? '−' : '+'}
              </span>
                        </button>
                        {openIndex === idx && (
                            <div className="px-6 pb-4 text-gray-300">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
