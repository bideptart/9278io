import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, Check, Loader2 } from "lucide-react"
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

      <section className="w-full border-b border-border/50 bg-gradient-to-b from-blue-50/50 via-background to-background px-6 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8">
        {/* ── Server-rendered hero: headline, key copy, primary CTA ── */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Launch your{" "}
            <span className="bg-gradient-to-r from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.72_0.18_150)] bg-clip-text text-transparent">
              AI voice agent
            </span>{" "}
            in minutes
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Pick a credit plan, create your account, and your AI receptionist goes live — answering calls in
            10+ Indian languages, with an Indian phone number included. Per-second billing means you pay only
            for the seconds your agent actually talks.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#start"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_6px_20px_oklch(0.546_0.215_262.88/0.35)] transition-all hover:bg-primary/90"
            >
              Choose your plan
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href="https://voice.9278.io/signin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-white px-7 text-base font-semibold text-foreground transition-colors hover:border-primary/30 hover:bg-slate-50"
            >
              Already have an account? Sign in
            </a>
          </div>

          {/* Verifiable credibility signals (no fabricated social proof) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {["Data stored in India", "TRAI & DPDP compliant", "GST-compliant invoicing", "Secure Razorpay checkout"].map(
              (item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-white px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  <Check className="size-3.5 text-emerald-600" aria-hidden /> {item}
                </span>
              ),
            )}
          </div>
        </div>

        {/* ── Interactive signup + payment (client widget) ── */}
        <div id="start" className="mx-auto mt-14 max-w-5xl scroll-mt-24">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading signup…
              </div>
            }
          >
            <SignupWidget />
          </Suspense>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
