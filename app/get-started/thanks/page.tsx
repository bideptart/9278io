import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { formatPlanAgentNoun, formatPlanAgents, planAmountInr, type BillingPeriod, PLANS } from "@/lib/pricing"
import { getStripe, isStripeConfigured } from "@/lib/stripe"
import { PurchaseConversion } from "@/components/analytics/purchase-conversion"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Payment received",
  description: "Thanks — we’ve activated your 9278.io voice credit and are provisioning your agent now.",
  path: "/get-started/thanks",
  noindex: true,
})

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; billing?: string; session_id?: string }>
}) {
  const { plan: planId, billing, session_id } = await searchParams
  const plan = PLANS.find((p) => p.id === planId)
  const billingPeriod: BillingPeriod = billing === "yearly" ? "yearly" : "monthly"
  const amountInr = plan ? planAmountInr(plan, billingPeriod) : null

  let amountPaid: number | null = null
  let sessionCurrency: string | null = null
  let customerEmail: string | null = null
  let paid = false
  if (session_id && isStripeConfigured()) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id)
      paid = session.payment_status === "paid" || session.status === "complete"
      amountPaid = typeof session.amount_total === "number" ? session.amount_total / 100 : null
      sessionCurrency = typeof session.currency === "string" ? session.currency.toUpperCase() : null
      customerEmail =
        session.customer_details?.email ?? (typeof session.customer_email === "string" ? session.customer_email : null)
    } catch {
      // Swallow — show a generic confirmation if Stripe lookup fails.
    }
  }

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      {/* ── CONVERSION EVENTS (Stripe path): get-started completion + purchase ──
          Fires GA4 + Google Ads conversions once, only when the payment is
          confirmed as paid. */}
      {paid && (
        <PurchaseConversion
          value={amountPaid ?? undefined}
          currency={sessionCurrency ?? "INR"}
          transactionId={session_id}
          plan={plan?.name}
        />
      )}

      <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-24 text-center md:px-6 md:py-32">
        <span className="grid size-14 place-items-center rounded-full bg-primary/15 text-primary">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          {paid ? "Payment received." : "You're on the list."}
        </h1>
        <p className="mt-4 text-pretty text-muted-foreground">
          {paid
            ? `Thanks${customerEmail ? `, ${customerEmail}` : ""}. We've activated your ${plan ? `${plan.name} ` : ""}wallet credit${
                amountPaid ? ` ($${amountPaid.toFixed(2)} charged)` : ""
              } and are provisioning your agent now. Check your inbox for dashboard access at dashboard.9278.io.`
            : `We've received your details${plan && amountInr ? ` for the ${plan.name} plan (₹${amountInr} wallet credit)` : ""}. Our team will email you in the next few minutes with onboarding next steps.`}
        </p>

        {plan && (
          <div className="mt-8 w-full rounded-2xl border border-border/60 bg-white p-6 text-left">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Order</p>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-sm">{plan.name} credit</span>
              <span className="text-sm font-medium">₹{(amountInr ?? plan.amountInr).toLocaleString("en-IN")}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {plan.minutes.toLocaleString("en-IN")} included min · ₹{plan.ratePerMinInr}/min eff. ·{" "}
              {formatPlanAgents(plan.agents)} {formatPlanAgentNoun(plan.agents)}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="https://voice.9278.io/signin" target="_blank" rel="noopener noreferrer">
              Open dashboard
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
