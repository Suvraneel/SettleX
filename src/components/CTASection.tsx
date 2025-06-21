// components/CTASection.tsx
import {Input} from "@components/ui/input";
import Link from "next/link";
import {Button} from "@components/ui/button";
import Image from "next/image";

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
                <div id="token-wheel" className="relative w-[400px] h-[400px] mx-auto">
                    <div
                        className="absolute w-[150px] h-[150px] bg-white/5 backdrop-blur border border-white/10 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                        <Image
                            src="/footer/centerBaseWheel.svg"
                            alt="Outer Token Wheel"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div
                        className="absolute w-[250px] h-[250px] bg-white/5 backdrop-blur border border-white/10 rounded-full top-1/2 left-1/2
                        transform -translate-x-1/2 -translate-y-1/2 z-20 scale-110">
                        <Image
                            src="/footer/midConcentricWheel.svg"
                            alt="Inner Token Wheel"
                            fill
                            className="object-contain animate-[spin_20s_linear_infinite_reverse]"
                        />
                    </div>
                    <div
                        className="absolute w-[400px] h-[400px] bg-white/5 backdrop-blur border border-white/10 rounded-full top-1/2 left-1/2
                        transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <Image
                            src="/footer/outerConcentricWheel.svg"
                            alt="Globe Illustration"
                            fill
                            className="object-contain object-center animate-[spin_20s_linear_infinite]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
