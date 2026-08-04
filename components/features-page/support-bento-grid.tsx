"use client"

import { motion } from "motion/react"
import { History, LayoutDashboard, Plug2, ShieldCheck, Users } from "lucide-react"

const CELLS = [
  {
    icon: LayoutDashboard,
    title: "Dashboard-native",
    description: "No separate portal to log into — tickets live right where you already manage your agents.",
    chip: "Zero extra logins",
    span: "sm:col-span-2",
  },
  {
    icon: Users,
    title: "Whole team sees it",
    description: "Anyone on your account can see ticket status, not just whoever raised it.",
    chip: "Shared visibility",
    span: "",
  },
  {
    icon: ShieldCheck,
    title: "SLA-ready",
    description: "Priority queues on Growth and Scale, with a dedicated success manager on Scale.",
    chip: "Priority queue",
    span: "",
  },
  {
    icon: History,
    title: "Full history, always searchable",
    description: "Every ticket you've ever raised stays on record — reopen or reference it anytime.",
    chip: "Never lost",
    span: "",
  },
  {
    icon: Plug2,
    title: "Works with your CRM",
    description: "Ticket context syncs to Zoho, Freshworks, and 200+ tools you already use, via webhooks or Zapier.",
    chip: "200+ integrations",
    span: "",
  },
]

/**
 * A mixed-size "bento" grid of five capability tiles instead of an
 * evenly-spaced card row — one wide hero tile up top, four even tiles
 * below. Distinct from the plain 3-card grid already used for "What you
 * get" higher on this same page, and from every card/row/list format
 * used on other feature pages.
 */
export function SupportBentoGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {CELLS.map((cell, i) => {
        const Icon = cell.icon
        return (
          <motion.div
            key={cell.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px", amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
            className={`group rounded-2xl border border-border/60 bg-gradient-to-br from-white to-primary/[0.03] p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_12px_28px_-14px_rgba(15,23,42,0.18)] ${cell.span}`}
          >
            <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary transition-colors group-hover:from-primary group-hover:to-[oklch(0.45_0.19_264)] group-hover:text-white">
              <Icon className="size-5" aria-hidden />
            </span>
            <p className="mt-4 text-base font-semibold tracking-tight text-foreground">{cell.title}</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{cell.description}</p>
            <span className="mt-3 inline-flex items-center rounded-full bg-primary/[0.06] px-2.5 py-1 text-[11px] font-semibold text-primary">
              {cell.chip}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}
