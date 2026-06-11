"use client"

import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

const companies = [
  "Tata Consultancy", "Infosys", "HDFC Bank", "Bajaj Finserv", "Swiggy",
  "Practo", "Nykaa", "PolicyBazaar", "Zomato", "Marico",
  "MakeMyTrip", "PhonePe", "Lenskart", "Urban Company", "Meesho",
]

const integrations = [
  "Zoho CRM", "Freshworks", "LeadSquared", "WhatsApp Business",
  "Razorpay", "IndiaMART", "Tally", "Salesforce",
  "Google Calendar", "Zapier", "Microsoft 365", "HubSpot",
]

export function Connectivity() {
  const doubled = [...companies, ...companies]

  return (
    <section className="overflow-hidden border-b border-border bg-white/[0.015]">
      <div className="w-full px-6 py-16 md:px-8 md:py-20">
        <ScrollReveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted by 500+ Indian businesses
          </p>
        </ScrollReveal>

        {/* Scrolling company names */}
        <div className="relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background/95 to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background/95 to-transparent md:w-24" />
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {doubled.map((name, i) => (
              <span
                key={i}
                className="inline-flex items-center text-sm font-semibold text-muted-foreground/40 transition-colors hover:text-muted-foreground/70"
              >
                <span className="mr-12 text-primary/30">·</span>
                {name}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Integrations */}
        <div className="mt-16 border-t border-border pt-12">
          <ScrollReveal className="text-center">
            <p className="text-sm text-muted-foreground">
              Connects with{" "}
              <span className="font-semibold text-foreground">200+ tools</span> Indian teams already use
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {integrations.map((name) => (
              <span
                key={name}
                className="rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/20 hover:text-foreground"
              >
                {name}
              </span>
            ))}
            <span className="rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-muted-foreground">
              +188 more
            </span>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
