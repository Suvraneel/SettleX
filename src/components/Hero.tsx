"use client";

import Image from "next/image";
import { FormEvent, RefObject, useState } from "react";
import { Button } from "@components/ui/button";
import { Parallax } from "react-scroll-parallax";
import { ParticlesContainer } from "@components/ParticlesContainer";
import { Input } from "@components/ui/input";
import { Bounce, toast } from "react-toastify";
import Toaster from "@components/Toaster";

export default function Hero(props: {
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);

    const payload = {
      email,
      timestamp: new Date().toISOString().replace("T", " ").replace("Z", ""),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      userAgent: navigator.userAgent,
      referrer: document.referrer || "direct",
    };

    // Show loading toast
    const loadingToastId = toast.loading("Submitting your email... ⏳", {
      position: "bottom-right",
      theme: "dark",
    });

    try {
      const response = await fetch("/api/appscript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("API response:", data);

      if (data.success) {
        // Handle different success message keys from AppScript
        let successMessage = "Email submitted successfully! 📧";
        let toastIcon = "📧";

        switch (data.data?.message) {
          case "append.successful":
            successMessage = "Welcome to the waitlist! 🎉";
            toastIcon = "🎉";
            break;
          case "duplicate.email":
            successMessage = "You're already on the waitlist! ✅";
            toastIcon = "✅";
            break;
          default:
            successMessage = `Email submitted successfully! ${toastIcon}`;
        }

        // Dismiss loading toast and show success toast
        toast.dismiss(loadingToastId);
        toast.success(successMessage, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        setEmail("");
        console.log("Form data submitted:", payload);
      } else {
        // Dismiss loading toast and show error toast
        toast.dismiss(loadingToastId);
        toast.error(data.error || "Submission failed!", {
          position: "bottom-right",
          theme: "dark",
        });
      }
    } catch (err) {
      // Dismiss loading toast and show error toast
      toast.dismiss(loadingToastId);
      toast.error("Submission failed!", {
        position: "bottom-right",
        theme: "dark",
      });
      console.error("Submit error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center text-center"
    >
      {/* Radial Blur Effect */}
      <div className="absolute -translate-y-1/2 inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(23,193,222,0.45)_0%,_transparent_80%)] blur-3xl z-0 scale-y-125 scale-x-75" />
      <div className="absolute -translate-y-1/2 inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(23,193,222,0.35)_0%,_transparent_50%)] blur-xl z-[1] scale-y-150 scale-x-75" />
      <div className="absolute -translate-y-1/2 inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(23,193,222,0.15)_0%,_transparent_30%)] blur-md z-[2] scale-y-150 scale-x-75" />

      {/* Rays */}
      <div className="absolute -top-0 w-1/2 h-[50vh] pointer-events-none select-none z-[1]">
        <Image
          src="/hero/Rays.svg"
          alt="Sunray"
          width={1000}
          height={1000}
          className="absolute top-0 left-1/2 -translate-x-1/2 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-auto scale-150 bg-blend-overlay"
        />
        <div className="absolute inset-0">
          <ParticlesContainer />
        </div>
      </div>

      <div className="relative pt-20 h-full w-full flex flex-col items-center text-center z-10">
        {/* Floating Icons */}
        <div className="absolute -top-12 w-1/2 h-full pointer-events-none">
          <Image
            src="/hero/floating-coin-3.svg"
            alt="Flow"
            width={110}
            height={120}
            className="absolute top-32 left-[19rem] animate-float delay-1000"
          />
          <Image
            src="/hero/floating-coin-1.svg"
            alt="USDC"
            width={120}
            height={120}
            className="absolute top-48 left-28 animate-float"
          />
          <Image
            src="/hero/floating-coin-2.svg"
            alt="Doge"
            width={120}
            height={120}
            className="absolute top-36 right-28 animate-float delay-2000"
          />
          <Image
            src="/hero/floating-coin-4.svg"
            alt="USDT"
            width={120}
            height={120}
            className="absolute top-72 left-80 animate-float delay-3000"
          />
        </div>
      </div>

      {/* Hero CTA Section */}
      <Parallax speed={20} className="relative z-10">
        <div className="relative mt-80 -top-5 flex flex-col items-center justify-center">
          {/* Hero Text */}
          <h1 className="text-4xl md:text-6xl font-normal leading-tight max-w-xl text-foreground">
            The Settlement Layer for Stablecoins
          </h1>
          <p className="mt-4 font-light text-base max-w-xl text-muted-foreground">
            SettleX is the first confidential clearing and settlement layer for
            stablecoins, fully compliant, chain-agnostic, and built for
            institutions.
          </p>

          {/* Waitlist Form */}
          <form
            id="join-waitlist"
            onSubmit={handleSubmit}
            className="mt-8 h-12 flex flex-col sm:flex-row items-center gap-2"
            aria-labelledby="waitlist-form"
          >
            <Input
              ref={props.inputRef}
              type="email"
              placeholder="yourname@gmail.com"
              aria-label="Email address"
              className="w-64 sm:w-72 px-4 py-3 rounded-xl bg-input border border-border"
              id="email"
              required
              name="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Join Waitlist"
              )}
            </Button>
          </form>
        </div>
      </Parallax>
      <>
        <Image
          src="/hero/floating-coin-1.svg"
          alt="USDC"
          width={150}
          height={150}
          className="absolute top-[100vh] -left-10 animate-float opacity-30"
        />
        <Image
          src="/hero/floating-coin-4.svg"
          alt="USDT"
          width={150}
          height={150}
          className="absolute top-[150vh] right-10 animate-float delay-3000 opacity-30"
        />
      </>
      <Parallax speed={50}>
        <div className="relative h-full w-full flex flex-col items-center text-center">
          <div className="w-2/3 mt-40 mb-52 flex flex-col items-center justify-center text-2xl font-normal flex-wrap text-wrap">
            {/*SettleX
                        is the first confidential settlement layer for stablecoins
                        built to cut cross-chain costs and protect trading privacy. By bridging only
                        the net difference of flows, it offers the most capital-efficient and private way
                        for institutions like market makers and liquidity providers
                        move stablecoins
                        across chains.*/}
            SettleX is the first confidential clearing and settlement layer for
            stablecoins, <br /> built to optimize capital efficiency and privacy
            across chains. <br /> By bridging only the net difference of flows,
            SettleX slashes bridging costs, protects trading strategies, and
            enables seamless cross-chain liquidity for institutional users.{" "}
            <br /> As the cheapest bridging solution, SettleX serves
            institutional-grade liquidity participants, including market makers,
            solvers, and liquidity providers aiming to unlock maximum efficiency
            and privacy in cross-chain flows.
          </div>
        </div>
      </Parallax>
      <Toaster />
    </section>
  );
}
