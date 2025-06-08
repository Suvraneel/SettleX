import Image from 'next/image';

const featuresData = [
    {
        title: 'Multilateral Netting',
        description: 'We aggregate multiple cross-chain transfers and only bridge the net delta, reducing bridging overhead and slashing costs for institutional players.',
        className: 'col-span-1 sm:col-span-2 lg:col-span-3',
        image: '/features/netting.svg',
    },
    {
        title: 'Institutional-Grade Compliance',
        description: 'Designed to meet regulatory and compliance frameworks, ensuring security and trust in settlement processes.',
    },
    {
        title: 'Chain-Agnostic Compatibility',
        description: 'Works seamlessly across all major chains and bridges, making SettleX a future-proof layer for global DeFi settlement.',
    },
    {
        title: 'Modular, Plug-and-Play Architecture',
        description: 'Flexible enough to integrate with existing solver networks, bridges, and liquidity protocols. Solvers and market makers can plug in effortlessly.',
    },
    {
        title: 'First Confidential Settlements',
        description: 'Protect counterparties\' trading data with selective decryption. Regulators can see what’s needed, while counterparties’ strategies remain private.',
        className: 'col-span-1 sm:col-span-2 lg:col-span-3',
        image: '/features/confidentiality.svg',
    },
];


function BentoCard(props: {
    feature: {
        title: string;
        description: string;
        className?: string;
        image?: string;
    }
}) {
    const {feature} = props;
    return <div
        className={`bg-card text-card-foreground py-6 px-10 rounded-3xl hover:shadow-lg transition ${feature.className}`}
    >
        <div className={`flex justify-start gap-10 w-full h-full ${feature.image ? 'items-center' : 'items-start'}`}>
            <div
                className={`flex flex-col items-start gap-4 justify-evenly flex-wrap ${feature.image ? 'w-1/2' : 'w-full'}`}>
                <h3 className="text-2xl font-light">{feature.title}</h3>
                <p className="text-muted-foreground text-base font-light">{feature.description}</p>
            </div>
            {feature.image &&
                <div className="w-[70%] h-full flex justify-center">
                    <Image src={feature.image} alt={`${feature.title} icon`} width={1000} height={1000}
                           className="aspect-auto"/>
                </div>
            }
        </div>
    </div>;
}

export default function Features() {
    return (
        <section id="features"
                 className="relative py-20 px-6 md:px-12 lg:px-24 bg-transparent flex flex-col justify-center items-center">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-normal leading-tight text-foreground">What we’re Building</h2>
                <p className="mt-4 font-light text-base text-muted-foreground">
                    Explore how SettleX powers secure, scalable, cross-chain settlements.
                </p>
            </div>
            <>
                <Image
                    src="/hero/floating-coin-3.svg"
                    alt="Doge"
                    width={120}
                    height={120}
                    className="absolute top-80 right-48 animate-float opacity-30 -z-10"
                />
                <Image
                    src="/hero/floating-coin-2.svg"
                    alt="Doge"
                    width={120}
                    height={120}
                    className="absolute bottom-36 -left-10 animate-float opacity-30 -z-10 delay-2000"
                />
            </>
            <div className="mt-12 flex flex-col items-center justify-center gap-5 w-3/4 h-full"
                 id="features-list">
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {featuresData.map((feature, idx) => (
                        <BentoCard key={idx} feature={feature}/>
                    ))}
                </div>
            </div>
        </section>
    );
}
