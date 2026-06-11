import type { Metadata } from "next"
import Link from "next/link"
import { Sparkles, CalendarCheck, Clock, Bell, RefreshCw, Check } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"

export const metadata: Metadata = pageSeo({
  title: "AI Appointment Booking for Indian Businesses — 9278.io",
  description:
    "Let AI book, confirm, and remind appointments over phone calls in Hindi and 10+ Indian languages. Works with Google Calendar, Calendly, and custom booking systems.",
  path: "/use-cases/appointment-booking",
})

const features = [
  "Checks your calendar and offers available slots in real time",
  "Books in Hindi, Tamil, Telugu, Kannada, and 11+ more languages",
  "Sends WhatsApp confirmation immediately after booking",
  "Automated reminder call 24 hours before the appointment",
  "Handles reschedules and cancellations over voice",
  "Integrates with Google Calendar, Calendly, and custom CRMs",
  "Logs every booking to Zoho CRM or Freshworks automatically",
  "Works for clinics, salons, real estate, and service businesses",
]

const stats = [
  { value: "40%", label: "Fewer no-shows with reminder calls" },
  { value: "24/7", label: "Booking availability" },
  { value: "< 2 min", label: "Average booking call length" },
  { value: "10+", label: "Indian languages" },
]

export default function AppointmentBookingPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Appointment Booking", path: "/use-cases/appointment-booking" },
        ]}
      />

      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]"
        />
        <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center md:px-6 md:py-28">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" aria-hidden />
              Use case
            </span>
            <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
              Appointment{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                Booking
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Let callers book their own appointments over the phone — in their language, on their schedule — without
              tying up your front-desk staff. Reminder calls and WhatsApp confirmations included.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/get-started">Start for free</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-border/50">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
          <div className="grid grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card/50 md:grid-cols-4 md:divide-y-0">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1.5 px-6 py-8 text-center">
                <span className="text-3xl font-bold tracking-tight text-foreground">{s.value}</span>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">What you get</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              A booking assistant that never takes a day off
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              From hospitals to hair salons, our appointment booking agent handles the full flow — checking availability,
              confirming the slot, sending reminders, and rescheduling — entirely over voice.
            </p>
            <ul className="mt-8 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal className="grid gap-4">
            {[
              { icon: CalendarCheck, title: "Live availability", desc: "The agent checks your real calendar before offering slots — no double bookings, ever." },
              { icon: Clock, title: "After-hours booking", desc: "Callers at 11 PM can still book for tomorrow morning. You wake up to a full schedule." },
              { icon: Bell, title: "Reminder calls", desc: "Automated reminder call the day before reduces no-shows by up to 40% for clinics and salons." },
              { icon: RefreshCw, title: "Easy rescheduling", desc: "Callers can reschedule by calling back — no app, no web form, just a voice conversation." },
            ].map((card) => {
              const Icon = card.icon
              return (
                <div key={card.title} className="flex gap-4 rounded-2xl border border-border bg-card/50 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08] text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold">{card.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{card.desc}</p>
                  </div>
                </div>
              )
            })}
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-24 md:px-6">
        <ScrollReveal className="rounded-2xl border border-border/60 bg-card/30 px-6 py-12 text-center md:px-12 md:py-14">
          <h3 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            Fill your calendar without lifting a finger.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Starter plan from ₹3,000. Up and running in under 5 minutes. No contracts.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/get-started">Get started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      <RelatedLinks
        heading="Related use cases"
        description="More ways to automate customer calls."
        links={[
          { href: "/use-cases/inbound-calls", title: "Inbound calls", description: "Handle all inbound calls 24/7 in Hindi and regional languages." },
          { href: "/use-cases/lead-qualification", title: "Lead qualification", description: "Qualify every lead the moment they enquire." },
          { href: "/use-cases/customer-support", title: "Customer support", description: "Automate tier-1 support and escalate when needed." },
        ]}
      />

      <SiteFooter />
    </main>
  )
}
