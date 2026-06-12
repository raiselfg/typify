import { Header } from "@/landing/components/header";
import { Hero } from "@/landing/components/hero";
import { SectionHead } from "@/landing/components/section-head";
import dynamic from "next/dynamic";

const Converter = dynamic(() => import("@/converter/components/converter"));
const Footer = dynamic(() => import("@/landing/components/footer"));
const HowItWorks = dynamic(() => import("@/landing/components/how-it-works"));
const Libraries = dynamic(() => import("@/landing/components/libraries"));
const Faq = dynamic(() => import("@/landing/components/faq"));

export default function Page() {
  return (
    <>
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Hero />

          {/* Converter */}
          <section id="converter" className="mx-auto max-w-6xl px-7 py-20">
            <SectionHead
              center
              kicker="Live Converter"
              title="Paste JSON on the left — get schema on the right"
              sub="Switch libraries on the fly. The result is recalculated instantly."
            />
            <Converter />
          </section>

          <Libraries />
          <HowItWorks />
          <Faq />
        </main>
        <Footer />
      </div>
    </>
  );
}
