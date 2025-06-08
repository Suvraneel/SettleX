// components/Features.tsx
import Image from 'next/image';

const featuresData = [
    {
        title: 'Multilateral Netting',
        description: 'We optimize multiple cross-chain transfers into only one net settle, reducing bridging overhead and slashing costs for institutional players.',
        icon: '/images/feature-multilateral.svg',
    },
    {
        title: 'Institutional-Grade Compliance',
        description: 'Designed to meet regulatory and compliance frameworks, enabling KYC/AML-tailored on-chain settlements.',
        icon: '/images/feature-compliance.svg',
    },
    {
        title: 'Chain-Agnostic Compatibility',
        description: 'Works seamlessly across all major EVM chains and bridges, making SettleX the universal layer for global DeFi settlement.',
        icon: '/images/feature-chain-agnostic.svg',
    },
    {
        title: 'Modular, Plug-and-Play Architecture',
        description: 'Flexible enough to integrate with existing stablecoin rails, bridges, and liquidity protocols. Solvers and market makers can plug in effortlessly.',
        icon: '/images/feature-modular.svg',
    },
    {
        title: 'First Confidential Settlements',
        description: 'Achieve multilateral netting under select privacy layers. Regulators can see what’s needed, while counterparties transact privately.',
        icon: '/images/feature-confidential.svg',
    },
];

export default function Features() {
    return (
        <section id="features" className="py-20 px-6 md:px-12 lg:px-24 bg-transparent">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-normal leading-tight text-foreground">What we’re Building</h2>
                <p className="mt-4 font-light text-base text-muted-foreground">
                    Explore how SettleX powers secure, scalable, cross-chain settlements.
                </p>
            </div>

            <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {featuresData.map((feature, idx) => (
                    <div
                        key={idx}
                        className="bg-[#1a1a27] p-6 rounded-xl flex flex-col items-start hover:shadow-lg transition"
                    >
                        <Image src={feature.icon} alt={`${feature.title} icon`} width={48} height={48} />
                        <h3 className="mt-4 text-xl font-medium">{feature.title}</h3>
                        <p className="mt-2 text-gray-300 text-sm">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
