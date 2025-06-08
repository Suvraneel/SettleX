// components/CTASection.tsx
import Image from 'next/image';

export default function CTASection() {
    return (
        <section
            id="join"
            className="py-20 px-6 md:px-12 lg:px-24 bg-[#0f0f14] flex flex-col md:flex-row items-center justify-between rounded-xl mx-6 md:mx-12 lg:mx-24 mt-12"
        >
            <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-semibold">
                    Let’s build the future of cross-chain settlements together.
                </h2>
                <p className="mt-4 text-gray-300 max-w-lg">
                    Get in touch, invest, or partner to support the next wave of institutional DeFi. We’re listening.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <input
                        type="text"
                        placeholder="yourname@domain.io"
                        aria-label="Contact email"
                        className="w-64 sm:w-72 px-4 py-3 rounded-md bg-[#1f1f2c] placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <button className="bg-teal-500 hover:bg-teal-600 text-black font-semibold px-6 py-3 rounded-md transition">
                        Copy
                    </button>
                </div>
            </div>
            <div className="hidden md:block flex-1 relative">
                {/* Replace this with a styled globe graphic or visual from your Figma */}
                <Image
                    src="/images/floating-coin-1.png"
                    alt="Globe Illustration"
                    width={350}
                    height={350}
                    className="mx-auto"
                />
            </div>
        </section>
    );
}
