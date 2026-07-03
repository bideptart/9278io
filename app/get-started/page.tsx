import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, Check, Loader2 } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { PLANS, formatPlanAgents } from "@/lib/pricing"
import { cn } from "@/lib/utils"
import SignupWidget from "./SignupWidget"

export const metadata: Metadata = pageSeo({
  title: "Get started — launch your AI voice agent",
  description:
    "Spin up your AI voice agent in minutes. Choose a credit plan, optionally add a phone number, and start talking.",
  path: "/get-started",
})

const inr = (n: number) => "₹" + Number(n || 0).toLocaleString("en-IN")

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

      <section className="w-full px-6 py-14 md:px-8 md:py-20">
        {/* ── Server-rendered hero: headline, key copy, primary CTA ── */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
            Get started
          </span>
          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Launch your AI voice agent in minutes
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
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {["Data stored in India", "TRAI & DPDP compliant", "GST-compliant invoicing", "Secure Razorpay checkout"].map(
              (item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-emerald-600" aria-hidden /> {item}
                </span>
              ),
            )}
          </div>
        </div>

        {/* ── Server-rendered plan summary (static pricing, no JS required) ── */}
        <div className="mx-auto mt-14 max-w-5xl">
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Simple, per-second pricing
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-2xl border bg-white p-6 shadow-sm",
                  plan.recommended ? "border-primary/40 ring-1 ring-primary/20" : "border-border",
                )}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-bold tracking-tight">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold tracking-tight">{inr(plan.amountInr)}</span>
                  <span className="ml-1 text-sm text-muted-foreground">/mo</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {plan.minutes.toLocaleString("en-IN")} min · ₹{plan.ratePerMinInr}/min ·{" "}
                  {formatPlanAgents(plan.agents)} agents
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {plan.highlights.slice(0, 4).map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            One Indian phone number is included with every plan. GST charged at checkout. No contracts —
            cancel anytime. See full <Link href="/pricing" className="font-medium text-primary underline-offset-4 hover:underline">pricing</Link>.
          </p>
        </div>

        {/* ── Interactive signup + payment (client widget) ── */}
        <div id="start" className="mx-auto mt-16 max-w-5xl scroll-mt-24">
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
