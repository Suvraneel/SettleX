'use client'
import Navbar from '@components/Navbar';
import Hero from '@components/Hero';
import Features from '@components/Features';
import Partners from '@components/Partners';
import FAQ from '@components/FAQ';
import CTASection from '@components/CTASection';
import Footer from '@components/Footer';
import {useRef} from "react";

export default function HomePage() {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    return (
        <main className="scroll-smooth">
            <Navbar handleFocus={handleFocus}/>
            <Hero inputRef={inputRef}/>
            <Features/>
            <Partners/>
            <FAQ/>
            <CTASection/>
            <Footer/>
        </main>
    );
}