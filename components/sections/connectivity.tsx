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
    <section className="relative overflow-hidden border-b border-border/50 mesh-gradient-bg">
      {/* Trusted by — marquee */}
      <div className="w-full py-8">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
          Trusted by 500+ Indian businesses
        </p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
          <motion.div
            className="flex gap-10 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {doubled.map((name, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-3 text-sm font-semibold text-foreground/30 transition-colors hover:text-foreground/60"
              >
                <span className="h-1 w-1 rounded-full bg-primary/40" />
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Integrations */}
      <div className="w-full border-t border-border/50 px-6 py-8 md:px-8">
        <ScrollReveal className="text-center">
          <p className="text-sm text-muted-foreground">
            Connects with{" "}
            <span className="font-semibold text-primary">200+ tools</span>{" "}
            Indian teams already use
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {integrations.map((name) => (
            <span
              key={name}
              className="glass-panel rounded-full px-3.5 py-1 text-xs font-medium text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
            >
              {name}
            </span>
          ))}
          <span className="rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-1 text-xs font-semibold text-primary">
            +188 more
          </span>
        </ScrollReveal>
      </div>
    </section>
  )
}
