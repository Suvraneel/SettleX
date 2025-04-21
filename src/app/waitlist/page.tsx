"use client";
import {FormEvent, useState} from "react";
import {ChevronRight} from "@mynaui/icons-react";
import {Bounce, toast} from 'react-toastify';
import {useTheme} from "next-themes";
import Toaster from "@components/Toaster";
import {Input} from "@components/ui/input";

export default function Waitlist() {
    const {resolvedTheme} = useTheme();
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            email,
            timestamp: new Date().toISOString().replace("T", " ").replace("Z", ""),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            userAgent: navigator.userAgent,
            referrer: document.referrer || "direct"
        };

        try {
            await fetch("/api/appscript", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
            });

            toast.success('Email submitted successfully! 📧 ', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: resolvedTheme || "dark",
                transition: Bounce,
            });

            setEmail(""); // Clear input
            console.log("Form data submitted:", payload);
        } catch (err) {
            toast.error("Submission failed!", {
                position: "bottom-right",
                theme: resolvedTheme || "dark"
            });
            console.error("Submit error:", err);
        }
    };


    return (
        <div className="w-full h-full p-5">

            <div
                className="w-full h-full min-h-screen flex flex-col px-10 sm:px-20 pt-20 justify-start gap-5 sm:gap-12 items-center dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
                <h1 className="text-center text-2xl font-bold leading-tight pt-32 sm:pt-24 sm:text-4xl lg:pt-32">
                    Join the Waitlist Today 🚀
                </h1>
                <div className="w-full h-full mx-auto max-w-sm flex flex-col gap-5">
                    {/* <p className="text-center text-sm text-foreground/70 sm:text-base">
                        Sign up to be notified when our testnet launches and be among the first to try SettleX&#39;s
                        revolutionary technology.
                    </p> */}
                    <p className="text-center text-sm text-foreground/70 sm:text-base">
                        Be the first to stay updated on all major announcements and gain early access to experience
                        SettleX&#39;s groundbreaking technology.
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-3 sm:space-y-4"
                        aria-labelledby="waitlist-form"
                    >
                        <div className="flex flex-col gap-3">
                            <label htmlFor="email" className="max-sm:text-sm hidden">Email</label>
                            <Input
                                className="flex h-9 w-full rounded-md border border-input bg-white/50 dark:bg-black/50 px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mb-4"
                                id="email"
                                required
                                placeholder="Email address..."
                                aria-label="Email address"
                                type="email"
                                name="email"
                                inputMode="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="submit"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
                                        text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                                        disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 group
                                        bg-transparent shadow border border-cyan-300 text-black dark:text-white hover:bg-accent/40 hover:text-neutral-500 h-9 px-4 py-2">
                                Join Waitlist<ChevronRight
                                className="h-4 w-4 group-hover:translate-x-1 transition-transform"/>
                            </button>
                            <Toaster theme={resolvedTheme}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
