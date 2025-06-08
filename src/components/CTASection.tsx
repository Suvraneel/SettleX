// components/CTASection.tsx
import Image from 'next/image';
import {Input} from "@components/ui/input";
import Link from "next/link";
import {Button} from "@components/ui/button";

export default function CTASection() {
    return (
        <section
            id="contact"
            className="relative p-10 md:px-12 lg:px-24 bg-card text-card-foreground overflow-clip
            flex flex-col md:flex-row items-center justify-between rounded-xl mx-6 md:mx-12 lg:mx-24 mt-12"
        >
            <div className="flex flex-col w-2/3">
                <h2 className="text-3xl md:text-5xl font-normal leading-tight text-foreground">
                    Let’s build the future of cross-chain settlements together.
                </h2>
                <p className="mt-4 font-light text-base text-muted-foreground">
                    Got a question, idea, or want to partner to support the next wave of institutional DeFi? <br/>
                    Reach out anytime. We’re listening.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Input
                        readOnly
                        type="text"
                        value="team@settlex.fi"
                        aria-label="Contact email"
                        className="w-64 sm:w-72 pointer-events-none"
                    />
                    <Link href="mailto:team@settlex.fi" passHref>
                        <Button>Contact Us</Button>
                    </Link>
                </div>
            </div>
            <div className="absolute right-10 -bottom-40 hidden md:block flex-1">
                <Image
                    src="/footer/token-wheel.svg"
                    alt="Globe Illustration"
                    width={400}
                    height={400}
                    className="mx-auto"
                />
            </div>
        </section>
    );
}
