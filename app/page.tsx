import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { PricingFeature } from "@/components/sections/pricing-feature"
import { Features } from "@/components/sections/features"
import { Industries } from "@/components/sections/industries"
import { HowItWorks } from "@/components/sections/how-it-works"
import { FAQ } from "@/components/sections/faq"
import { ServiceJsonLd, FaqJsonLd } from "@/components/seo/jsonld"
import { FLAT_FAQ } from "@/lib/faq"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ServiceJsonLd
        name="9278.io — AI voice agents for Indian businesses"
        description="Native-audio voice agents for Indian businesses. Clean per-second billing (no minute-rounding), 10+ Indian languages, and RAG over your docs."
        path="/"
        serviceType="AI voice agent platform"
      />
      {/* FAQPage JSON-LD for the homepage FAQ block — same 8 questions shown below. */}
      <FaqJsonLd items={FLAT_FAQ.slice(0, 8)} />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Industries />
        <PricingFeature />
        <FAQ />
      </main>
      <SiteFooter />
    </div>
  )
}
