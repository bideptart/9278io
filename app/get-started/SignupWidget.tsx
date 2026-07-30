"use client"

// Inline signup widget for /get-started — fetches live plans from
// voice.9278.io, opens Razorpay Checkout, verifies payment,
// then redirects the customer into the portal already signed-in via ?token=.
// The customer's phone number is auto-assigned server-side at checkout.

import { useEffect, useMemo, useState } from "react"
import Script from "next/script"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedPrice } from "@/components/pricing/animated-price"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Check, Loader2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { trackGetStartedComplete, trackPurchaseThenRedirect } from "@/lib/analytics/gtag"

const PORTAL_BASE = "https://voice.9278.io"

type Plan = {
  id: string
  label: string
  amount: number
  yearlyAmount: number
  yearlySavingsInr: number
  min: number
  rate: number
  overage: number
  dids: number
  concurrent: number
  agents: number
  voiceStack: string
  support: string
  tag: string | null
  sub: string
  perks: string[]
}

const LANGUAGES: Array<{ value: string; label: string }> = [
  { value: "en-IN", label: "English (India)" },
  { value: "en-US", label: "English (US)" },
  { value: "hi-IN", label: "Hindi (हिन्दी)" },
  { value: "bn-IN", label: "Bengali (বাংলা)" },
  { value: "te-IN", label: "Telugu (తెలుగు)" },
  { value: "mr-IN", label: "Marathi (मराठी)" },
  { value: "ta-IN", label: "Tamil (தமிழ்)" },
  { value: "gu-IN", label: "Gujarati (ગુજરાતી)" },
  { value: "kn-IN", label: "Kannada (ಕನ್ನಡ)" },
  { value: "ml-IN", label: "Malayalam (മലയാളം)" },
  { value: "pa-IN", label: "Punjabi (ਪੰਜਾਬੀ)" },
]

const inr = (n: number) => "₹" + Number(n || 0).toLocaleString("en-IN")

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any
  }
}

export default function SignupWidget() {
  const searchParams = useSearchParams()
  const initialPlanId = (() => {
    const p = searchParams.get("plan")
    return p && ["starter", "growth", "scale"].includes(p) ? p : "growth"
  })()
  const initialCycle: "monthly" | "yearly" =
    searchParams.get("cycle") === "yearly" ? "yearly" : "monthly"

  const [plans, setPlans] = useState<Plan[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)

  const [cycle, setCycle] = useState<"monthly" | "yearly">(initialCycle)
  const [selectedId, setSelectedId] = useState<string>(initialPlanId)

  const [form, setForm] = useState({
    name: "",
    company: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    language: "en-IN",
    agentName: "",
    greeting: "",
    // Optional: number the agent forwards to when it can't handle the call.
    // Sent to the portal on signup; portal calls MCP set_transfer_number.
    transferNumber: "",
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load plans on mount.
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const plansRes = await fetch(`${PORTAL_BASE}/api/plans`).then((r) => r.json())
        if (cancelled) return
        setPlans(plansRes.plans || [])
      } catch (e) {
        if (!cancelled) setLoadError((e as Error).message || "Could not load plans")
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const selectedPlan = useMemo(() => plans.find((p) => p.id === selectedId), [plans, selectedId])

  const priceFor = (p: Plan) => (cycle === "yearly" ? p.yearlyAmount : p.amount)

  const updateInput =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))

  const updateTextarea =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))

  const validateAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!selectedPlan) return setError("Please pick a plan.")
    if (!form.name.trim()) return setError("Tell us your name.")
    if (!form.company.trim()) return setError("Company is required.")
    if (!form.username.trim()) return setError("Pick a username.")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError("Enter a valid email.")
    if (form.password.length < 8) return setError("Password must be 8+ characters.")
    // Transfer number is optional. If provided, validate loosely — E.164
    // or bare digits with at least 6 digits total.
    const transferDigits = form.transferNumber.replace(/\D+/g, "")
    if (form.transferNumber.trim() && transferDigits.length < 6) {
      return setError("Transfer number looks too short. Use E.164 (e.g. +91 98765 43210).")
    }

    setSubmitting(true)

    const body = {
      name: form.name.trim(),
      company: form.company.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,

      planLabel: selectedPlan.label,
      planAmount: priceFor(selectedPlan),
      planMin: selectedPlan.min,
      planRate: selectedPlan.rate,
      planAgents: selectedPlan.agents,
      planCycle: cycle,

      // Optional call-transfer number — pushed to the agent via MCP after
      // provisioning finishes.
      transferNumber: form.transferNumber.trim(),

      voice: "Kore",
      language: form.language,
      agentName: form.agentName.trim() || `${form.company.trim()} Receptionist`,
      greeting: form.greeting.trim(),
      prompt: "",
      kbCompany: "",
      kbFaqs: "",
    }

    let order:
      | {
          orderId: string
          amount: number
          currency?: string
          keyId: string
          pendingToken: string
          prefill?: { name?: string; email?: string; contact?: string }
        }
      | { error: string }

    try {
      order = await fetch(`${PORTAL_BASE}/api/razorpay/order/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((r) => r.json())
    } catch (e) {
      setSubmitting(false)
      return setError((e as Error).message || "Could not start checkout.")
    }

    if ("error" in order) {
      setSubmitting(false)
      return setError(order.error)
    }

    if (typeof window === "undefined" || !window.Razorpay) {
      setSubmitting(false)
      return setError("Payment library failed to load. Please refresh and try again.")
    }

    const rzp = new window.Razorpay({
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency || "INR",
      name: "9278.io",
      description: `${selectedPlan.label} plan`,
      prefill: order.prefill,
      theme: { color: "#0ea5e9" },
      handler: async (rzpResponse: {
        razorpay_order_id: string
        razorpay_payment_id: string
        razorpay_signature: string
      }) => {
        try {
          const v = await fetch(`${PORTAL_BASE}/api/razorpay/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              pendingToken: order.pendingToken,
              ...rzpResponse,
            }),
          }).then((r) => r.json())

          if (v.token) {
            const redirectUrl = `${PORTAL_BASE}/dashboard/overview?token=${encodeURIComponent(
              v.token,
            )}`
            trackGetStartedComplete({ plan: selectedPlan.label })
            trackPurchaseThenRedirect({
              value: priceFor(selectedPlan),
              currency: "INR",
              transactionId: rzpResponse.razorpay_payment_id,
              plan: selectedPlan.label,
              redirectUrl,
            })
          } else {
            setSubmitting(false)
            setError(v.error || "Payment verification failed.")
          }
        } catch (err) {
          setSubmitting(false)
          setError((err as Error).message || "Payment verification failed.")
        }
      },
      modal: {
        ondismiss: () => setSubmitting(false),
      },
    })

    rzp.open()
  }

  if (loadError) {
    return (
      <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive">
        Couldn&apos;t load the signup form: {loadError}
      </div>
    )
  }

  if (plans.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading plans…
      </div>
    )
  }

  const planPrice = selectedPlan ? priceFor(selectedPlan) : 0
  const totalAmount = planPrice

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      {/* Billing cycle toggle */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 text-sm">
          <button
            type="button"
            onClick={() => setCycle("monthly")}
            className={cn(
              "rounded-full px-4 py-1.5 transition",
              cycle === "monthly" ? "bg-foreground text-background" : "text-muted-foreground",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setCycle("yearly")}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-1.5 transition",
              cycle === "yearly" ? "bg-sky-500 text-white" : "text-muted-foreground",
            )}
          >
            Yearly
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px]",
                cycle === "yearly" ? "bg-white/20 text-white" : "bg-sky-100 text-sky-700",
              )}
            >
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Per-second billing callout */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
          <span>
            <strong>Per-second billing</strong> — pay only for the seconds your agent talks,
            with no minute-rounding.
          </span>
        </div>
      </div>

      {/* Plan cards */}
      <div className="mb-10 grid gap-5 md:grid-cols-3">
        {plans.map((p) => {
          const selected = p.id === selectedId
          const price = priceFor(p)
          return (
            <Card
              key={p.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedId(p.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setSelectedId(p.id)
                }
              }}
              className={cn(
                "relative cursor-pointer border-2 transition focus:outline-none",
                selected
                  ? "border-sky-500 ring-2 ring-sky-500/30"
                  : "hover:border-sky-500",
              )}
            >
              {p.tag && (
                <Badge className="absolute -top-3 left-4 bg-sky-500 hover:bg-sky-500">
                  {p.tag}
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{p.label}</CardTitle>
                <p className="text-sm text-muted-foreground">{p.sub}</p>
              </CardHeader>
              <CardContent>
                <div className="mb-1">
                  <span className="text-4xl font-bold tracking-tight">
                    <AnimatedPrice value={price} />
                  </span>
                  <span className="ml-1 text-sm text-muted-foreground">
                    /{cycle === "yearly" ? "yr" : "mo"}
                  </span>
                </div>
                {cycle === "yearly" && (
                  <div className="mb-2 text-xs text-sky-700 dark:text-sky-300">
                    Save {inr(p.yearlySavingsInr)} vs monthly
                  </div>
                )}
                <div className="mb-4 text-xs text-muted-foreground">
                  {p.min.toLocaleString("en-IN")} min · {inr(p.rate)}/min ·{" "}
                  {p.agents >= 999 ? "Unlimited" : `${p.agents} agents`}
                </div>
                <ul className="space-y-2 text-sm">
                  {p.perks.filter((perk) => !/phone number|concurrent call/i.test(perk)).map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Two-column section: form on the left, order summary on the right */}
      <form onSubmit={validateAndSubmit} className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* === LEFT: form fields ============================================= */}
        <Card>
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Field id="name" label="Your name" value={form.name} onChange={updateInput("name")} />
            <Field
              id="company"
              label="Company"
              value={form.company}
              onChange={updateInput("company")}
            />
            <Field
              id="username"
              label="Username"
              value={form.username}
              onChange={updateInput("username")}
            />
            <Field
              id="email"
              label="Work email"
              type="email"
              value={form.email}
              onChange={updateInput("email")}
            />
            <Field
              id="phone"
              label="Phone (optional)"
              value={form.phone}
              onChange={updateInput("phone")}
            />
            <Field
              id="password"
              label="Password (8+ chars)"
              type="password"
              value={form.password}
              onChange={updateInput("password")}
            />

            <div className="md:col-span-2 rounded-md border border-dashed border-border bg-muted/20 px-4 py-3 text-xs text-muted-foreground">
              📞 Your phone number is included in the plan and assigned
              automatically at checkout — no separate fee.
            </div>

            <div>
              <Label htmlFor="language" className="mb-1.5 block">
                Agent language
              </Label>
              <Select
                value={form.language}
                onValueChange={(v) => setForm((f) => ({ ...f, language: v }))}
              >
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Empty cell to keep the language picker in column 1 */}
            <div className="hidden md:block" />

            <Field
              id="agentName"
              label="Agent name (optional)"
              value={form.agentName}
              onChange={updateInput("agentName")}
              placeholder={form.company ? `${form.company} Receptionist` : "Acme Receptionist"}
              wrapperClassName="md:col-span-2"
            />

            {/* Call-transfer number — where the AI hands off when it can't help. */}
            <Field
              id="transferNumber"
              label="Call-transfer number (optional)"
              type="tel"
              value={form.transferNumber}
              onChange={updateInput("transferNumber")}
              placeholder="+91 98765 43210"
              wrapperClassName="md:col-span-2"
            />
            <p className="md:col-span-2 -mt-2 text-xs text-muted-foreground">
              When the AI needs to hand a caller to a human, it will transfer them to this number.
              You can add or change this later in your dashboard.
            </p>

            {/* Greeting — multi-line description-style textarea */}
            <div className="md:col-span-2">
              <Label htmlFor="greeting" className="mb-1.5 block">
                Greeting / description{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="greeting"
                rows={5}
                value={form.greeting}
                onChange={updateTextarea("greeting")}
                placeholder={
                  form.company
                    ? `e.g. "Hi, thanks for calling ${form.company}. I can help you book an appointment, share pricing, or take a message. What can I do for you today?"`
                    : 'e.g. "Hi, thanks for calling. I can help you book an appointment, share pricing, or take a message. What can I do for you today?"'
                }
                className="min-h-[120px] resize-y"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Leave blank to use the default greeting. Refine it any time
                in <strong>Knowledge &amp; Agent</strong>.
              </p>
              <div className="h-6" />
            </div>
          </CardContent>
        </Card>

        {/* === RIGHT: order summary (sticky on desktop) ====================== */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card className="border-sky-200/60 dark:border-sky-800/40">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-300">
                <Sparkles className="h-3.5 w-3.5" />
                Order summary
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <Row label="Plan">
                <div className="text-right">
                  <div className="font-semibold">
                    {selectedPlan?.label} · {cycle === "yearly" ? "yearly" : "monthly"}
                  </div>
                  {selectedPlan && (
                    <div className="text-xs text-muted-foreground">
                      ≈ {selectedPlan.min.toLocaleString("en-IN")} min ·{" "}
                      {selectedPlan.agents >= 999
                        ? "Unlimited"
                        : `${selectedPlan.agents} agents`}{" "}
                      · {inr(selectedPlan.rate)}/min
                    </div>
                  )}
                </div>
              </Row>

              <Row label="Phone number">
                <span className="text-xs font-medium text-muted-foreground">
                  Assigned at checkout
                </span>
              </Row>

              <Row label="Language">
                <span className="font-semibold">
                  {LANGUAGES.find((l) => l.value === form.language)?.label || form.language}
                </span>
              </Row>

              <Separator />

              <Row label={`${selectedPlan?.label || "Plan"} credit`}>
                <span className="font-semibold">{inr(planPrice)}</span>
              </Row>

              <Row label="Voice rate">
                <span className="text-xs font-medium text-muted-foreground">
                  {selectedPlan ? `${inr(selectedPlan.rate)} / min` : "—"}
                </span>
              </Row>

              <Separator />

              <Row label="Billed today">
                <span className="text-lg font-bold">{inr(totalAmount)}</span>
              </Row>

              <Separator />

              {error && (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button type="submit" size="lg" disabled={submitting} className="w-full">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Opening payment…
                  </>
                ) : (
                  <>Pay {inr(totalAmount)} with Razorpay →</>
                )}
              </Button>

              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                Secure Razorpay checkout · UPI / cards / netbanking / wallets.{" "}
                {cycle === "monthly"
                  ? "Plan minutes reset every month."
                  : "Yearly plan minutes reset every month, billed once upfront."}
              </p>
            </CardContent>
          </Card>
        </div>
      </form>
    </>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  wrapperClassName,
}: {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  placeholder?: string
  wrapperClassName?: string
}) {
  return (
    <div className={wrapperClassName}>
      <Label htmlFor={id} className="mb-1.5 block">
        {label}
      </Label>
      <Input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  )
}

function Row({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <div className="text-right">{children}</div>
    </div>
  )
}
