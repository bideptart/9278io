"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowRight, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
        "sticky top-0 z-40 w-full border-b border-border bg-white transition-shadow duration-200",
        scrolled ? "shadow-sm" : "",
      )}
    >
      <div className="flex h-16 w-full items-center justify-between px-6 md:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="9278.io home">
          <Logo height={36} priority />
        </Link>

        {/* ── Desktop nav ── */}
        <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">

          {navLink("Features", "/#features")}
          {navLink("Industries", "/industries")}
          {navLink("Pricing", "/pricing")}
          {navLink("Blog", "/blog")}
          {navLink("FAQ", "/faq")}
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-1.5">
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
            className="hidden rounded-full bg-primary py-2 pl-5 pr-1.5 text-sm font-semibold text-primary-foreground shadow-[0_6px_20px_oklch(0.546_0.215_262.88/0.35)] transition-all hover:bg-primary/90 hover:shadow-[0_8px_28px_oklch(0.546_0.215_262.88/0.5)] sm:inline-flex"
          >
            <Link href="/get-started">
              Get Started
              <span className="flex size-6 items-center justify-center rounded-full bg-white/20">
                <ArrowRight className="size-3.5" aria-hidden />
              </span>
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
                href="/#features"
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Features
              </Link>

              <div className="mt-1">
                {[
                  { label: "Industries", href: "/industries" },
                  { label: "Pricing", href: "/pricing" },
                  { label: "Blog", href: "/blog" },
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
