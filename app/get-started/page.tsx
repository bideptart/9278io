import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import SignupWidget from "./SignupWidget"

export const metadata: Metadata = pageSeo({
  title: "Get started — launch your AI voice agent",
  description:
    "Spin up your AI voice agent in minutes. Choose a credit plan, optionally add a phone number, and start talking.",
  path: "/get-started",
})

export default function GetStartedPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Get started", path: "/get-started" },
        ]}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <SignupWidget />
      </section>

      <SiteFooter />
    </main>
  )
}
