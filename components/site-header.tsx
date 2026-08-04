"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  ArrowRight, ArrowUpRight, ChevronDown, Menu, X,
  Building2, Wrench, Briefcase, ShoppingBag, Sparkles,
  Info, FileText, Phone,
  Landmark, Cpu, Truck, Users, Server, ShoppingCart,
  Bot, Mic, SlidersHorizontal, GraduationCap, BookOpen, Route,
  Rocket, PhoneCall, LayoutTemplate, Activity, BarChart3, History,
  PhoneForwarded, BellRing, Ticket, FileBarChart, UserCog, Settings,
  LayoutDashboard, PlayCircle,
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

/* ── Features mega-menu content, grouped by where each feature sits in the
   product lifecycle: set up an agent, train it, test it, run it day to day,
   then manage the account around it. ── */
const FEATURE_GROUPS = [
  {
    label: "Agent Setup",
    icon: Bot,
    subtitle: "Multi-agent, voices, call rules",
    tagline: "Agent setup",
    heading: "Configure how your agents work.",
    lead: "Run multiple agents, pick a voice, and set call behavior.",
    items: [
      { slug: "multi-agent-management", name: "Multi-Agent Management", icon: Users, short: "Run and manage multiple AI agents from one account." },
      { slug: "voice-selection", name: "Voice Selection", icon: Mic, short: "Choose a natural, human-like voice for your agent." },
      { slug: "call-behavior-controls", name: "Call Behavior Controls", icon: SlidersHorizontal, short: "Fine-tune how your agent handles every call." },
    ],
  },
  {
    label: "Train & Configure",
    icon: GraduationCap,
    subtitle: "Knowledge, templates, routing",
    tagline: "Train & configure",
    heading: "Teach your agent what it needs to know.",
    lead: "Knowledge base, reusable templates, and routing rules.",
    items: [
      { slug: "knowledge-base", name: "Knowledge Base", icon: BookOpen, short: "Give each agent its own company-specific knowledge." },
      { slug: "knowledge-templates", name: "Knowledge Templates", icon: FileText, short: "Reusable knowledge templates across agents." },
      { slug: "behavior-routing-rules", name: "Behavior & Routing Rules", icon: Route, short: "Control how calls are routed and handled." },
    ],
  },
  {
    label: "Test & Go Live",
    icon: Rocket,
    subtitle: "Live test calls, setup templates",
    tagline: "Test & go live",
    heading: "Try it before you launch.",
    lead: "Real test calls and ready-made setup templates.",
    items: [
      { slug: "live-test-call", name: "Live Test Call", icon: PhoneCall, short: "Dial in and test your agent on a real number." },
      { slug: "setup-templates", name: "Setup Templates", icon: LayoutTemplate, short: "Ready-made templates to launch faster." },
      { slug: "playground-live-testing", name: "Playground & Live Testing", icon: PlayCircle, short: "Try your agent live in an interactive playground." },
    ],
  },
  {
    label: "Operate & Monitor",
    icon: Activity,
    subtitle: "Analytics, bookings, tickets, reports",
    tagline: "Operate & monitor",
    heading: "Keep every call and booking on track.",
    lead: "Analytics, bookings, transfers, notifications, tickets, and reports.",
    items: [
      { slug: "analytics-dashboard", name: "Analytics Dashboard", icon: BarChart3, short: "Real-time insights into every call." },
      { slug: "booking-history", name: "Booking History", icon: History, short: "Full history of every booking made." },
      { slug: "call-transfer-tool", name: "Call Transfer Tool", icon: PhoneForwarded, short: "Transfer live calls to your team seamlessly." },
      { slug: "booking-notifications", name: "Booking Notifications", icon: BellRing, short: "Automatic alerts for every new booking." },
      { slug: "support-tickets-system", name: "Support Tickets", icon: Ticket, short: "Auto-generate support tickets from calls." },
      { slug: "call-reports", name: "Call Reports", icon: FileBarChart, short: "Recordings and transcripts for every call." },
    ],
  },
  {
    label: "Account & Overview",
    icon: UserCog,
    subtitle: "Settings, dashboard, identity",
    tagline: "Account & overview",
    heading: "Everything about your account, in one place.",
    lead: "Account settings, dashboard overview, and agent identity.",
    items: [
      { slug: "account-settings", name: "Account Settings", icon: Settings, short: "Manage your billing, team, and preferences." },
      { slug: "dashboard-overview", name: "Dashboard Overview", icon: LayoutDashboard, short: "A birds-eye view of your whole account." },
      { slug: "identity-setup", name: "Agent Identity Setup", icon: UserCog, short: "Name, greeting, and personality for your agent." },
    ],
  },
]

function FeaturesMenu() {
  const [activeGroup, setActiveGroup] = useState(0)
  const group = FEATURE_GROUPS[activeGroup]

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
      <div className="grid grid-cols-[220px_1fr]">
        {/* Left: group list */}
        <div className="border-r border-border/60 bg-slate-50/60 p-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Features</p>
            <p className="text-[11px] text-muted-foreground">{FEATURE_GROUPS.length} groups</p>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            {FEATURE_GROUPS.map((g, i) => {
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

        {/* Right: active group detail — fixed height (tall enough for the
            largest group, 6 items) so switching groups never resizes the menu */}
        <div className="flex h-[300px] flex-col overflow-hidden p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              {group.tagline}
            </span>
            <Link
              href="/features"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              Overview <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </div>

          <h3 className="mt-3 text-lg font-bold tracking-tight text-foreground">{group.heading}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{group.lead}</p>

          <div className="mt-4 grid grid-cols-2 items-start gap-x-3 gap-y-1 overflow-y-auto">
            {group.items.map((f) => {
              const Icon = f.icon
              return (
                <Link
                  key={f.slug}
                  href={`/features/${f.slug}`}
                  className="flex h-[62px] items-start gap-2.5 rounded-xl p-1.5 transition-colors hover:bg-slate-50"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/[0.08] text-primary">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0 leading-snug">
                    <span className="block truncate text-sm font-semibold text-foreground">{f.name}</span>
                    <span
                      className="block overflow-hidden text-xs text-muted-foreground"
                      style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
                    >
                      {f.short}
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
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  // Only one mobile submenu open at a time — opening one closes the others.
  const [mobileExpanded, setMobileExpanded] = useState<"features" | "industries" | "company" | null>(null)
  const mobileFeaturesOpen = mobileExpanded === "features"
  const mobileIndustriesOpen = mobileExpanded === "industries"
  const mobileCompanyOpen = mobileExpanded === "company"
  // Second level, nested inside Features/Industries — only one category open
  // at a time, reset whenever the top-level section changes.
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(null)
  const toggleMobileSection = (section: "features" | "industries" | "company") => {
    setMobileExpanded((s) => (s === section ? null : section))
    setMobileCategoryOpen(null)
  }
  const toggleMobileCategory = (label: string) => {
    setMobileCategoryOpen((c) => (c === label ? null : label))
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile menu (and any expanded submenu) on route change
  useEffect(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
    setMobileCategoryOpen(null)
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
        "group relative rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-600 hover:text-white",
        isActive(href) ? "text-foreground" : "text-muted-foreground",
      )}
    >
      {label}
    </Link>
  )

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-white transition-shadow duration-300",
        scrolled ? "shadow-[0_8px_30px_-16px_oklch(0.13_0.025_255/0.25)]" : "",
      )}
    >
      <div className="flex h-20 w-full items-center justify-between px-4 md:grid md:h-16 md:grid-cols-[1fr_auto_1fr] md:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center justify-self-start" aria-label="9278.io home">
          <Logo height={36} priority />
        </Link>

        {/* ── Desktop nav ── */}
        <nav aria-label="Primary" className="hidden items-center justify-self-center gap-3 md:flex">

          <div
            className="relative"
            onMouseEnter={() => setFeaturesOpen(true)}
            onMouseLeave={() => setFeaturesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setFeaturesOpen((o) => !o)}
              className={cn(
                "relative flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-600 hover:text-white",
                isActive("/features") ? "text-foreground" : "text-muted-foreground",
                featuresOpen ? "bg-blue-600 text-white" : "",
              )}
            >
              Features
              <ChevronDown className={cn("size-3.5 transition-transform duration-300 ease-out", featuresOpen ? "rotate-180" : "")} aria-hidden />
            </button>
            <AnimatePresence>
              {featuresOpen && (
                <div className="fixed left-1/2 top-16 z-50 mt-2 w-[min(94vw,1020px)] -translate-x-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <FeaturesMenu />
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

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
              <ChevronDown className={cn("size-3.5 transition-transform duration-300 ease-out", industriesOpen ? "rotate-180" : "")} aria-hidden />
            </button>
            <AnimatePresence>
              {industriesOpen && (
                <div className="fixed left-1/2 top-16 z-50 mt-2 w-[min(94vw,1020px)] -translate-x-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
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
              <ChevronDown className={cn("size-3.5 transition-transform duration-300 ease-out", companyOpen ? "rotate-180" : "")} aria-hidden />
            </button>
            <AnimatePresence>
              {companyOpen && (
                <div className="fixed left-1/2 top-16 z-50 mt-2 w-[min(94vw,1020px)] -translate-x-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
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
            // Opacity only — see the fade-only note on the submenu motion.divs
            // below: a height:0->"auto" animation locks in its measured height
            // once (when this panel first opens, before any submenu inside it
            // has expanded), and never re-measures afterward. Expanding a
            // submenu later then grows past that locked height and gets
            // clipped by this wrapper's own overflow-hidden. The inner <nav>
            // already has its own max-height + scroll, so this wrapper doesn't
            // need to animate height at all.
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-border/50 md:hidden"
          >
            <nav className="flex max-h-[calc(100dvh-5rem)] flex-col overflow-y-auto overscroll-contain px-4 pb-6">
              {/* Features — top-level dropdown; each category inside is its
                  own nested dropdown (category -> pages), matching the
                  requested two-level accordion pattern. */}
              <div className="border-b border-border/50">
                <button
                  type="button"
                  onClick={() => toggleMobileSection("features")}
                  className="flex w-full items-center justify-between py-3.5 text-left text-[15px] font-semibold text-foreground transition-colors hover:text-primary"
                  aria-expanded={mobileFeaturesOpen}
                >
                  Features
                  <ChevronDown
                    className={cn("size-4 text-muted-foreground transition-transform duration-300 ease-out", mobileFeaturesOpen ? "rotate-180" : "")}
                    aria-hidden
                  />
                </button>
                <div
                  // A true CSS height transition (grid-template-rows 0fr -> 1fr)
                  // instead of Framer's fade-only workaround: the browser's own
                  // layout engine drives the track size every frame, so it never
                  // locks in a stale measured height like animating height:auto
                  // did — that's what caused the earlier clipping bug. This also
                  // reads as noticeably smoother on mobile since the content no
                  // longer snaps to full height while only opacity animates.
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    mobileFeaturesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div
                    className={cn(
                      "overflow-hidden transition-opacity duration-300",
                      mobileFeaturesOpen ? "opacity-100 delay-75" : "opacity-0",
                    )}
                  >
                    <div className="pb-2">
                      <Link
                        href="/features"
                        className="block py-2 text-sm font-semibold text-primary transition-colors hover:text-primary/70"
                      >
                        All features →
                      </Link>
                      {FEATURE_GROUPS.map((g) => {
                        const catKey = `features:${g.label}`
                        const catOpen = mobileCategoryOpen === catKey
                        return (
                          <div key={g.label} className="border-t border-border/30">
                            <button
                              type="button"
                              onClick={() => toggleMobileCategory(catKey)}
                              className="flex w-full items-center justify-between py-2.5 text-left text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
                              aria-expanded={catOpen}
                            >
                              {g.label}
                              <ChevronDown
                                className={cn("size-3.5 text-muted-foreground transition-transform duration-300 ease-out", catOpen ? "rotate-180" : "")}
                                aria-hidden
                              />
                            </button>
                            <div
                              className={cn(
                                "grid transition-[grid-template-rows] duration-300 ease-out",
                                catOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                              )}
                            >
                              <div
                                className={cn(
                                  "overflow-hidden transition-opacity duration-300",
                                  catOpen ? "opacity-100 delay-75" : "opacity-0",
                                )}
                              >
                                <div className="flex flex-col gap-0.5 pb-2">
                                  {g.items.map((f) => (
                                    <Link
                                      key={f.slug}
                                      href={`/features/${f.slug}`}
                                      className="rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                      {f.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Industries — same two-level pattern */}
              <div className="border-b border-border/50">
                <button
                  type="button"
                  onClick={() => toggleMobileSection("industries")}
                  className="flex w-full items-center justify-between py-3.5 text-left text-[15px] font-semibold text-foreground transition-colors hover:text-primary"
                  aria-expanded={mobileIndustriesOpen}
                >
                  Industries
                  <ChevronDown
                    className={cn("size-4 text-muted-foreground transition-transform duration-300 ease-out", mobileIndustriesOpen ? "rotate-180" : "")}
                    aria-hidden
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    mobileIndustriesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div
                    className={cn(
                      "overflow-hidden transition-opacity duration-300",
                      mobileIndustriesOpen ? "opacity-100 delay-75" : "opacity-0",
                    )}
                  >
                    <div className="pb-2">
                      <Link
                        href="/industries"
                        className="block py-2 text-sm font-semibold text-primary transition-colors hover:text-primary/70"
                      >
                        All industries →
                      </Link>
                      {INDUSTRY_GROUPS.map((g) => {
                        const catKey = `industries:${g.label}`
                        const catOpen = mobileCategoryOpen === catKey
                        const items = [...g.slugs.map((s) => getIndustry(s)).filter(Boolean), ...g.items] as {
                          slug: string
                          name: string
                        }[]
                        return (
                          <div key={g.label} className="border-t border-border/30">
                            <button
                              type="button"
                              onClick={() => toggleMobileCategory(catKey)}
                              className="flex w-full items-center justify-between py-2.5 text-left text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
                              aria-expanded={catOpen}
                            >
                              {g.label}
                              <ChevronDown
                                className={cn("size-3.5 text-muted-foreground transition-transform duration-300 ease-out", catOpen ? "rotate-180" : "")}
                                aria-hidden
                              />
                            </button>
                            <div
                              className={cn(
                                "grid transition-[grid-template-rows] duration-300 ease-out",
                                catOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                              )}
                            >
                              <div
                                className={cn(
                                  "overflow-hidden transition-opacity duration-300",
                                  catOpen ? "opacity-100 delay-75" : "opacity-0",
                                )}
                              >
                                <div className="flex flex-col gap-0.5 pb-2">
                                  {items.map((ind) => (
                                    <Link
                                      key={ind.slug}
                                      href={`/industries/${ind.slug}`}
                                      className="rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                      {ind.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/pricing"
                className="block border-b border-border/50 py-3.5 text-[15px] font-semibold text-foreground transition-colors hover:text-primary"
              >
                Pricing
              </Link>

              {/* Company — single-level dropdown (About / Blog / Contact only, no nested categories) */}
              <div className="border-b border-border/50">
                <button
                  type="button"
                  onClick={() => toggleMobileSection("company")}
                  className="flex w-full items-center justify-between py-3.5 text-left text-[15px] font-semibold text-foreground transition-colors hover:text-primary"
                  aria-expanded={mobileCompanyOpen}
                >
                  Company
                  <ChevronDown
                    className={cn("size-4 text-muted-foreground transition-transform duration-300 ease-out", mobileCompanyOpen ? "rotate-180" : "")}
                    aria-hidden
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    mobileCompanyOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div
                    className={cn(
                      "overflow-hidden transition-opacity duration-300",
                      mobileCompanyOpen ? "opacity-100 delay-75" : "opacity-0",
                    )}
                  >
                    <div className="flex flex-col pb-2">
                      {COMPANY_LINKS.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/faq"
                className="block border-b border-border/50 py-3.5 text-[15px] font-semibold text-foreground transition-colors hover:text-primary"
              >
                FAQ
              </Link>

              <div className="mt-4 flex flex-col gap-2.5">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="h-11 w-full justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <a href="https://voice.9278.io/signin" target="_blank" rel="noopener noreferrer">
                    Sign in
                  </a>
                </Button>
                <Button asChild size="sm" className="h-11 w-full rounded-full bg-primary font-semibold text-primary-foreground">
                  <Link href="/get-started">Get Started Free Trial</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
