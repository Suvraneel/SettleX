// app/page.tsx
import Navbar from '@components/Navbar';
import Hero from '@components/Hero';
import Features from '@components/Features';
import Partners from '@components/Partners';
import FAQ from '@components/FAQ';
import CTASection from '@components/CTASection';
import Footer from '@components/Footer';

export default function HomePage() {
  return (
      <main>
        <Navbar />
        <Hero />
        <Features />
        <Partners />
        <FAQ />
        <CTASection />
        <Footer />
      </main>
  );
}