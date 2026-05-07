import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { PricingFeature } from "@/components/sections/pricing-feature"
import { Features } from "@/components/sections/features"
import { Platform } from "@/components/sections/platform"
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
        description="Native-audio voice agents for Indian businesses. Sub-second latency on Jio/Airtel/BSNL/Vi, RAG over your docs, and a self-hosted control panel — without the enterprise vendor markup."
        path="/"
        serviceType="AI voice agent platform"
      />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Connectivity />
        <Platform />
        <Features />
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
