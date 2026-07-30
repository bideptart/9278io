import type { Metadata } from "next"
import Link from "next/link"
import { LayoutDashboard, Copy, PhoneCall, ArrowLeft, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { GradientCta } from "@/components/sections/gradient-cta"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"
import { RelatedLinks } from "@/components/seo/related-links"
import { MultiAgentHub } from "@/components/features-page/multi-agent-hub"

export const metadata: Metadata = pageSeo({
  title: "Multi-Agent Management — 9278.io Features",
  description:
    "Create and manage as many AI voice agents as you need from a single 9278.io account — one dashboard, fast cloning, and a dedicated number per agent.",
  path: "/features/multi-agent-management",
})

const capabilities = [
  {
    icon: LayoutDashboard,
    title: "One dashboard for every agent you run",
    description:
      "Every agent on your account — however many you create — shows up in the same dashboard. Switch between them without juggling separate logins or tools.",
  },
  {
    icon: Copy,
    title: "Clone an existing agent to start a new one fast",
    description:
      "Already have an agent configured the way you like? Clone it to spin up a new one with the same voice, knowledge base, and call behavior as a starting point, instead of building from scratch.",
  },
  {
    icon: PhoneCall,
    title: "Assign a different number to each agent",
    description:
      "Give each agent its own phone number, so a caller to your sales line and a caller to your support line reach the right agent automatically — no manual routing required.",
  },
]

export default function MultiAgentManagementPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
          { name: "Multi-Agent Management", path: "/features/multi-agent-management" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#F7F9FC" }}>
        {/* page-level soft blue blobs, top-right and bottom-left */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[520px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #2563EB, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-32 -z-10 size-[420px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #2563EB, transparent 70%)" }}
        />
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-10 px-6 py-10 md:px-8 md:py-14 lg:flex-row lg:items-center lg:gap-10">
          <div className="w-full max-w-2xl text-center lg:max-w-none lg:flex-1 lg:text-left">
            <ScrollReveal>
              <Link
                href="/features"
                className="inline-flex items-center gap-1.5 text-base font-medium transition-colors hover:text-[#2563EB]"
                style={{ color: "#667085" }}
              >
                <ArrowLeft className="size-4" aria-hidden />
                Back to Features
              </Link>

              <div className="mt-8 flex justify-center lg:justify-start">
                <span
                  className="inline-flex h-10 items-center gap-2 rounded-full text-[15px] font-semibold"
                  style={{ backgroundColor: "#EEF4FF", border: "1px solid #BBD1FF", color: "#2563EB", padding: "0 18px" }}
                >
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: "#2563EB" }} aria-hidden />
                  BUILD &amp; SETUP
                </span>
              </div>

              <h1
                className="mt-8 text-[44px] font-extrabold md:text-[60px] lg:text-[72px]"
                style={{ lineHeight: 0.95, letterSpacing: "-2px" }}
              >
                <span style={{ color: "#0F172A" }}>Multi-Agent</span>
                <br />
                <span
                  style={{
                    backgroundImage: "linear-gradient(90deg, #4F8DFF, #2563EB)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Management
                </span>
              </h1>

              <p
                className="mx-auto mt-8 text-xl md:text-[24px] lg:mx-0"
                style={{ color: "#667085", lineHeight: 1.6, maxWidth: "500px" }}
              >
                Create and manage as many AI agents as you need from a single account.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-5 lg:justify-start">
                <Link
                  href="/get-started"
                  className="group inline-flex h-[60px] items-center gap-2 rounded-full pl-[34px] pr-[10px] text-base font-semibold text-white transition-all hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(90deg, #4F8DFF, #2563EB)",
                    boxShadow: "0 20px 60px rgba(37,99,235,0.25)",
                  }}
                >
                  Build your first agent
                  <span className="flex size-9 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-[60px] items-center rounded-full px-9 text-base font-semibold transition-colors hover:bg-[#F1F5F9]"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #D0D5DD", color: "#0F172A" }}
                >
                  Talk to sales
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="w-full max-w-md lg:max-w-none lg:flex-1">
            <ScrollReveal>
              <MultiAgentHub />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-b border-border/50">
        <div className="w-full px-6 py-14 md:px-8 md:py-20">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Multi-Agent Management</p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Every agent, managed from{" "}
              <span className="bg-gradient-to-r from-primary via-[oklch(0.62_0.2_240)] to-[oklch(0.5_0.22_255)] bg-clip-text text-transparent">
                one place.
              </span>
            </h2>
          </ScrollReveal>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
            {capabilities.map((c) => {
              const Icon = c.icon
              return (
                <ScrollReveal key={c.title}>
                  <div className="h-full rounded-2xl border border-border bg-white p-7 shadow-[0_16px_34px_-24px_oklch(0.2_0.05_260/0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_50px_-20px_oklch(0.546_0.215_262.88/0.3)]">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.42_0.19_264)] text-white shadow-[0_6px_14px_-4px_oklch(0.546_0.215_262.88/0.45)]">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <GradientCta
        heading="Ready to manage your agents from one place?"
        description="Create your first agent free, then add as many more as your business needs — all from one dashboard."
        primaryHref="/get-started"
        primaryLabel="Get started"
        secondaryHref="/pricing"
        secondaryLabel="View pricing"
      />

      <RelatedLinks
        heading="Explore more of 9278.io"
        description="See the rest of what's included, or check pricing and common questions."
        links={[
          { href: "/features", title: "All features", description: "Every capability across Build, Train, Test, Operate, and Account." },
          { href: "/pricing", title: "Pricing in INR", description: "Starter ₹2,999, Growth ₹8,799, Scale ₹29,999. Per-second billing." },
          { href: "/faq", title: "Frequently asked questions", description: "TRAI compliance, Indian languages, billing, and account questions." },
        ]}
      />

      <SiteFooter />
    </main>
  )
}
