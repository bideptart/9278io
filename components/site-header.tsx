"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  ArrowRight, ArrowUpRight, ChevronDown, Menu, X,
  Building2, Wrench, Briefcase, ShoppingBag, Sparkles,
  Info, FileText, Phone,
  Landmark, Cpu, Truck, Users, Server, ShoppingCart,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"
import { getIndustry } from "@/lib/industries"

/* ── Industries mega-menu content, grouped from the real industry list ── */
const INDUSTRY_GROUPS = [
  {
    label: "Core Industries",
    icon: Building2,
    subtitle: "Real estate, food, home, SaaS",
    tagline: "Core industries",
    heading: "Local businesses, covered end to end.",
    lead: "Real estate, restaurants, home-service, and SaaS teams.",
    slugs: ["real-estate", "home-services", "restaurants"],
    items: [
      { slug: "saas-tech", name: "SaaS & Tech", icon: Cpu, short: "Support and onboarding for product teams." },
    ],
  },
  {
    label: "Field & Local Services",
    icon: Wrench,
    subtitle: "Automotive, fitness, logistics, retail",
    tagline: "Field & local services",
    heading: "Dealerships and studios, always on call.",
    lead: "Automotive, fitness & wellness, logistics, and retail teams.",
    slugs: ["automotive", "fitness"],
    items: [
      { slug: "logistics", name: "Logistics", icon: Truck, short: "Dispatch, tracking, and delivery updates." },
      { slug: "retail-ecom", name: "Retail & eCom", icon: ShoppingCart, short: "Storefronts and D2C support, unified." },
    ],
  },
  {
    label: "Professional Services",
    icon: Briefcase,
    subtitle: "Legal, education, enterprise IT",
    tagline: "Professional services",
    heading: "Intake and enrollment, handled right.",
    lead: "Law firms, education, enterprise IT, and remote teams.",
    slugs: ["legal", "education"],
    items: [
      { slug: "enterprise-it", name: "Enterprise IT", icon: Server, short: "Internal helpdesk and IT support at scale." },
      { slug: "remote-teams", name: "Remote Teams", icon: Users, short: "Always-on coverage for distributed teams." },
    ],
  },
  {
    label: "Retail & Finance",
    icon: ShoppingBag,
    subtitle: "E-commerce, BFSI, BPO, finance",
    tagline: "Retail & finance",
    heading: "Software-first teams, covered end to end.",
    lead: "E-commerce, BFSI & fintech, BPO, and finance teams.",
    slugs: ["ecommerce", "bfsi", "bpo"],
    items: [
      { slug: "finance", name: "Finance", icon: Landmark, short: "Compliant, always-on financial services calls." },
    ],
  },
]

function IndustriesMenu() {
  const [activeGroup, setActiveGroup] = useState(0)
  const group = INDUSTRY_GROUPS[activeGroup]
  const fromSlugs = group.slugs.map((s) => getIndustry(s)).filter(Boolean) as NonNullable<ReturnType<typeof getIndustry>>[]
  const items = [...fromSlugs, ...group.items]

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
      <div className="grid grid-cols-[220px_1fr]">
        {/* Left: group list */}
        <div className="border-r border-border/60 bg-slate-50/60 p-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Our industries</p>
            <p className="text-[11px] text-muted-foreground">{INDUSTRY_GROUPS.length} groups</p>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            {INDUSTRY_GROUPS.map((g, i) => {
              const Icon = g.icon
              const active = i === activeGroup
              return (
                <button
                  key={g.label}
                  type="button"
                  onMouseEnter={() => setActiveGroup(i)}
                  onFocus={() => setActiveGroup(i)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors",
                    active ? "bg-white shadow-sm ring-1 ring-border" : "hover:bg-white/70",
                  )}
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/[0.08] text-primary">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block truncate text-[13px] font-semibold text-foreground">{g.label}</span>
                    <span className="block truncate text-[11px] text-muted-foreground">{g.subtitle}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right: active group detail — fixed height so switching groups never resizes the menu */}
        <div className="flex h-[260px] flex-col overflow-hidden p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              {group.tagline}
            </span>
            <Link
              href="/industries"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              Overview <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </div>

          <h3 className="mt-3 text-lg font-bold tracking-tight text-foreground">{group.heading}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{group.lead}</p>

          <div className="mt-4 grid grid-cols-2 items-start gap-x-3 gap-y-1">
            {items.map((ind) => {
              const Icon = ind.icon
              return (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="flex h-[62px] items-start gap-2.5 rounded-xl p-1.5 transition-colors hover:bg-slate-50"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/[0.08] text-primary">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0 leading-snug">
                    <span className="block truncate text-sm font-semibold text-foreground">{ind.name}</span>
                    <span
                      className="block overflow-hidden text-xs text-muted-foreground"
                      style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
                    >
                      {ind.short}
                    </span>
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 border-t border-border/60 bg-slate-50/60 px-5 py-3">
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="size-4 text-primary" aria-hidden />
          Every plan includes per-second billing and a 10+ language voice agent.
        </span>
        <div className="flex shrink-0 items-center gap-3">
          <Link href="/pricing" className="text-xs font-semibold text-primary hover:underline">
            Compare plans
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Talk to sales <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ── Company dropdown content ── */
const COMPANY_LINKS = [
  { label: "About", href: "/about", icon: Info, desc: "Learn what 9278.io is building and why." },
  { label: "Blog", href: "/blog", icon: FileText, desc: "Product updates, guides, and company news." },
  { label: "Contact", href: "/contact", icon: Phone, desc: "Talk to sales or start a free trial." },
]

function CompanyMenu() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Our company</p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            Overview <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        </div>

        <h3 className="mt-3 text-lg font-bold tracking-tight text-foreground">Get to know the team behind 9278.io.</h3>
        <p className="mt-1 text-sm text-muted-foreground">About, blog, and how to reach us.</p>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {COMPANY_LINKS.map((c) => {
            const Icon = c.icon
            return (
              <Link
                key={c.href}
                href={c.href}
                className="flex items-start gap-2.5 rounded-xl p-2 transition-colors hover:bg-slate-50"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/[0.08] text-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="min-w-0 leading-snug">
                  <span className="block text-sm font-semibold text-foreground">{c.label}</span>
                  <span className="line-clamp-2 block text-xs text-muted-foreground">{c.desc}</span>
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 border-t border-border/60 bg-slate-50/60 px-5 py-3">
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="size-4 text-primary" aria-hidden />
          Every plan includes per-second billing and a 10+ language voice agent.
        </span>
        <div className="flex shrink-0 items-center gap-3">
          <Link href="/pricing" className="text-xs font-semibold text-primary hover:underline">
            Compare plans
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Talk to sales <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    const clean = href.replace("/#", "/")
    return pathname.startsWith(clean)
  }

  const navLink = (label: string, href: string) => (
    <Link
      key={href}
      href={href}
      className={cn(
        "relative rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-600 hover:text-white",
        isActive(href) ? "text-foreground" : "text-muted-foreground",
      )}
    >
      {label}
    </Link>
  )

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-white transition-shadow duration-200",
        scrolled ? "shadow-sm" : "",
      )}
    >
      <div className="flex h-20 w-full items-center justify-between px-4 md:grid md:h-16 md:grid-cols-[1fr_auto_1fr] md:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center justify-self-start" aria-label="9278.io home">
          <Logo height={36} priority />
        </Link>

        {/* ── Desktop nav ── */}
        <nav aria-label="Primary" className="hidden items-center justify-self-center gap-3 md:flex">

          {navLink("Features", "/features")}

          <div
            className="relative"
            onMouseEnter={() => setIndustriesOpen(true)}
            onMouseLeave={() => setIndustriesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIndustriesOpen((o) => !o)}
              className={cn(
                "relative flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-600 hover:text-white",
                isActive("/industries") ? "text-foreground" : "text-muted-foreground",
                industriesOpen ? "bg-blue-600 text-white" : "",
              )}
            >
              Industries
              <ChevronDown className={cn("size-3.5 transition-transform", industriesOpen ? "rotate-180" : "")} aria-hidden />
            </button>
            <AnimatePresence>
              {industriesOpen && (
                <div className="fixed left-1/2 top-16 z-50 mt-2 w-[min(94vw,1020px)] -translate-x-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                  >
                    <IndustriesMenu />
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {navLink("Pricing", "/pricing")}

          <div
            className="relative"
            onMouseEnter={() => setCompanyOpen(true)}
            onMouseLeave={() => setCompanyOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCompanyOpen((o) => !o)}
              className={cn(
                "relative flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-600 hover:text-white",
                isActive("/about") || isActive("/blog") || isActive("/contact") ? "text-foreground" : "text-muted-foreground",
                companyOpen ? "bg-blue-600 text-white" : "",
              )}
            >
              Company
              <ChevronDown className={cn("size-3.5 transition-transform", companyOpen ? "rotate-180" : "")} aria-hidden />
            </button>
            <AnimatePresence>
              {companyOpen && (
                <div className="fixed left-1/2 top-16 z-50 mt-2 w-[min(94vw,1020px)] -translate-x-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                  >
                    <CompanyMenu />
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {navLink("FAQ", "/faq")}
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center justify-self-end gap-1.5">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden text-sm text-muted-foreground hover:bg-muted hover:text-foreground sm:inline-flex"
          >
            <a href="https://voice.9278.io/signin" target="_blank" rel="noopener noreferrer">
              Sign in
            </a>
          </Button>

          <Button
            asChild
            size="sm"
            className="inline-flex h-[36px] w-[120.67px] rounded-full bg-primary px-[10px] py-0 text-[14px] font-semibold text-primary-foreground shadow-[0_6px_20px_oklch(0.546_0.215_262.88/0.35)] transition-all hover:bg-primary/90 hover:shadow-[0_8px_28px_oklch(0.546_0.215_262.88/0.5)]"
          >
            <Link href="/get-started">
              Get Started
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </Button>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg md:hidden"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="h-4 w-4" /></motion.span>
                : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="h-4 w-4" /></motion.span>
              }
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/50 md:hidden"
          >
            <nav className="flex flex-col gap-0.5 p-4 pb-6">
              <Link
                href="/features"
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Features
              </Link>

              <div className="mt-1">
                {[
                  { label: "Industries", href: "/industries" },
                  { label: "Pricing", href: "/pricing" },
                  { label: "About", href: "/about" },
                  { label: "Blog", href: "/blog" },
                  { label: "Contact", href: "/contact" },
                  { label: "FAQ", href: "/faq" },
                ].map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-3 flex flex-col gap-2 border-t border-border/50 pt-4">
                <Button asChild variant="ghost" size="sm" className="w-full justify-center text-muted-foreground">
                  <a href="https://voice.9278.io/signin" target="_blank" rel="noopener noreferrer">
                    Sign in
                  </a>
                </Button>
                <Button asChild size="sm" className="w-full bg-primary font-semibold text-primary-foreground">
                  <Link href="/get-started">Get Started →</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
