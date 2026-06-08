import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { PricingFeature } from "@/components/sections/pricing-feature"
import { VoiceEngineContent, VoiceEngineHeader } from "@/components/sections/features"
import { AiReceptionistHeader } from "@/components/sections/platform"
import { Connectivity } from "@/components/sections/connectivity"
import { Industries } from "@/components/sections/industries"
import { UseCases } from "@/components/sections/use-cases"
import { FAQ } from "@/components/sections/faq"
import { CTA } from "@/components/sections/cta"
import { ServiceJsonLd } from "@/components/seo/jsonld"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ServiceJsonLd
        name="9278.io — AI voice agents for Indian businesses"
        description="Native-audio voice agents for Indian businesses. Clean per-second billing (no minute-rounding), 15+ Indian languages, and RAG over your docs."
        path="/"
        serviceType="AI voice agent platform"
      />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Connectivity />
        <section id="features" className="border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
            <div className="grid gap-12 lg:grid-cols-2">
              <AiReceptionistHeader />
              <VoiceEngineHeader />
            </div>
            <VoiceEngineContent />
          </div>
        </section>
        <Industries />
        <UseCases />
        <PricingFeature />
        <FAQ />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  )
}
