import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { PricingFeature } from "@/components/sections/pricing-feature"
import { Features } from "@/components/sections/features"
import { Platform } from "@/components/sections/platform"
import { Industries } from "@/components/sections/industries"
import { FAQ } from "@/components/sections/faq"
import { ServiceJsonLd } from "@/components/seo/jsonld"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ServiceJsonLd
        name="9278.io — AI voice agents for Indian businesses"
        description="Native-audio voice agents for Indian businesses. Clean per-second billing (no minute-rounding), 10+ Indian languages, and RAG over your docs."
        path="/"
        serviceType="AI voice agent platform"
      />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Platform />
        <Features />
        <Industries />
        <PricingFeature />
        <FAQ />
      </main>
      <SiteFooter />
    </div>
  )
}
