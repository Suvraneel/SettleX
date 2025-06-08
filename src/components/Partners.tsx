// components/Partners.tsx
import Image from 'next/image';

const partnerLogos = [
    { name: 'QuickNode', src: '/images/partner-quicknode.png' },
    { name: 'Union', src: '/images/partner-union.png' },
    { name: 'Fairblock', src: '/images/partner-fairblock.png' },
    { name: 'Forta', src: '/images/partner-forta.png' },
];

export default function Partners() {
    return (
        <section className="py-16 bg-[#0a0a0f] px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-semibold mb-6">Partners</h2>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8">
                {partnerLogos.map((partner, idx) => (
                    <div key={idx} className="h-12">
                        <Image
                            src={partner.src}
                            alt={`${partner.name} logo`}
                            width={partner.name === 'QuickNode' ? 120 : 100}
                            height={48}
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
