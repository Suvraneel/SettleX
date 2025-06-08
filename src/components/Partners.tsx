import Image from 'next/image';
import Link from "next/link";

const partnerLogos = [
    {name: 'QuickNode', src: '/brands/quicknode-logo-white.svg', link: 'https://www.quicknode.com/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX'},
    {name: 'Union', src: '/brands/union-logo-white.svg', link: 'https://union.build/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX'},
    {name: 'Fairblock', src: '/brands/fairblock-logo-white.svg', link: 'https://www.fairblock.network/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX'},
    {name: 'Forta', src: '/brands/forta-logo-white.svg', link: 'https://forta.org/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX'},
];

export default function Partners() {
    return (
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-transparent flex flex-col justify-center items-center">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-normal leading-tight text-foreground">Partners</h2>
            </div>
            <div className="mt-12 flex flex-row items-center justify-center gap-5 w-3/4 h-20">
                {partnerLogos.map((partner, idx) => (
                    <Link key={idx} href={partner.link} target="_blank" rel="noopener noreferrer" passHref
                          className="w-full h-full bg-card px-6 py-4 rounded-xl flex items-center justify-center">
                        <Image
                            src={partner.src}
                            alt={`${partner.name} logo`}
                            width={180}
                            height={70}
                            className="object-contain"
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
}
