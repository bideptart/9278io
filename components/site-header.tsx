"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
  Sun, Moon, ChevronDown,
  PhoneIncoming, PhoneOutgoing, UserCheck, CalendarDays, Headphones,
  Menu, X,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"

const useCaseLinks = [
  { label: "Inbound Calls",       href: "/use-cases/inbound-calls",       icon: PhoneIncoming,  desc: "Answer every call 24/7, zero wait time" },
  { label: "Outbound Campaigns",  href: "/use-cases/outbound-calls",      icon: PhoneOutgoing,  desc: "Run high-volume outbound at scale" },
  { label: "Lead Qualification",  href: "/use-cases/lead-qualification",  icon: UserCheck,      desc: "Score and qualify leads automatically" },
  { label: "Appointment Booking", href: "/use-cases/appointment-booking", icon: CalendarDays,   desc: "Book, reschedule and confirm appointments" },
  { label: "Customer Support",    href: "/use-cases/customer-support",    icon: Headphones,     desc: "Resolve queries without human agents" },
]

export function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile + dropdown on route change
  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [pathname])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

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
        "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
        isActive(href) ? "text-foreground" : "text-muted-foreground",
      )}
    >
      {label}
    </Link>
  )

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all duration-200",
        scrolled
          ? "border-border/70 bg-background/97 shadow-sm backdrop-blur-xl"
          : "border-border/50 bg-background/95 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="9278.io home">
          <Logo height={36} priority />
        </Link>

        {/* ── Desktop nav ── */}
        <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">

          {navLink("Features", "/#features")}

          {/* Use Cases dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              onClick={() => setDropdownOpen(o => !o)}
              className={cn(
                "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                (pathname.startsWith("/use-cases") || dropdownOpen)
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              Use Cases
              <motion.span
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.18 }}
                className="flex items-center"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.span>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute left-0 top-full z-50 pt-2"
                  style={{ width: "min(300px, calc(100vw - 2rem))" }}
                >
                  <div className="overflow-hidden rounded-xl border border-border bg-popover shadow-xl ring-1 ring-black/5 dark:ring-white/5">
                    <div className="p-1.5">
                      {useCaseLinks.map((item) => {
                        const Icon = item.icon
                        const active = pathname === item.href
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "group flex items-start gap-3 rounded-lg p-2.5 transition-colors",
                              active ? "bg-primary/[0.07]" : "hover:bg-muted",
                            )}
                          >
                            <span className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
                              active
                                ? "border-primary/25 bg-primary/[0.1] text-primary"
                                : "border-border bg-card/50 text-muted-foreground group-hover:border-primary/20 group-hover:bg-primary/[0.07] group-hover:text-primary",
                            )}>
                              <Icon className="h-3.5 w-3.5" />
                            </span>
                            <div className="min-w-0">
                              <p className={cn(
                                "text-sm font-medium leading-none",
                                active ? "text-primary" : "text-foreground",
                              )}>
                                {item.label}
                              </p>
                              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                    <div className="border-t border-border bg-muted/30 px-4 py-2.5">
                      <Link
                        href="/industries"
                        className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        Browse all industries →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLink("Industries", "/industries")}
          {navLink("Pricing", "/pricing")}
          {navLink("FAQ", "/faq")}
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-1.5">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="h-9 w-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && theme === "dark"
              ? <Sun className="h-4 w-4" />
              : <Moon className="h-4 w-4" />}
          </Button>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden text-sm text-muted-foreground hover:bg-muted hover:text-foreground sm:inline-flex"
          >
            <a href="https://dashboard.9278.io/login" target="_blank" rel="noopener noreferrer">
              Sign in
            </a>
          </Button>

          <Button
            asChild
            size="sm"
            className="hidden rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_oklch(0.78_0.16_195/0.3)] transition-all hover:bg-primary/90 hover:shadow-[0_0_28px_oklch(0.78_0.16_195/0.45)] sm:inline-flex"
          >
            <Link href="/get-started">Start Now</Link>
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
                href="/#features"
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Features
              </Link>

              {/* Use Cases group */}
              <div className="mt-2">
                <p className="px-3 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                  Use Cases
                </p>
                {useCaseLinks.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <item.icon className="h-3.5 w-3.5 shrink-0 text-primary/70" />
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-1">
                {[
                  { label: "Industries", href: "/industries" },
                  { label: "Pricing", href: "/pricing" },
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
                  <a href="https://dashboard.9278.io/login" target="_blank" rel="noopener noreferrer">
                    Sign in
                  </a>
                </Button>
                <Button asChild size="sm" className="w-full bg-primary font-semibold text-primary-foreground">
                  <Link href="/get-started">Start Now →</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
