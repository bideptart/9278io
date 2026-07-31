"use client"

import { motion } from "motion/react"
import { Mail, MessageSquare, Phone, MapPin, type LucideIcon } from "lucide-react"

type Channel = {
  icon: LucideIcon
  title: string
  description: string
  action: string
  href: string
}

const channels: Channel[] = [
  {
    icon: Mail,
    title: "Email support",
    description: "For billing, technical issues, and general questions. We respond within one business day.",
    action: "support@9278.io",
    href: "mailto:support@9278.io",
  },
  {
    icon: MessageSquare,
    title: "Sales & partnerships",
    description: "Custom plans, reseller partnerships, or enterprise onboarding. We'll reply within a few hours.",
    action: "info@9278.io",
    href: "mailto:info@9278.io",
  },
  {
    icon: Phone,
    title: "Talk to an agent",
    description: "The fastest way to see 9278.io in action — call our demo agent right now and test the experience.",
    action: "Try a live demo",
    href: "/get-started",
  },
  {
    icon: MapPin,
    title: "Registered office",
    description:
      "Swadesh Mobile Private Limited (9278.io) · 1108, Sureshwari Techno IT Park Premises CHS, Link Road, Borivali West, Mumbai, Maharashtra 400092, India.",
    action: "View on map",
    href: "https://www.google.com/maps/search/?api=1&query=Sureshwari+Techno+IT+Park+Premises+CHS+Link+Road+Borivali+West+Mumbai+400092",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
}

export function ChannelCards() {
  return (
    <motion.div
      className="mt-6 grid flex-1 grid-cols-2 gap-3 lg:flex lg:flex-col lg:justify-between"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={containerVariants}
    >
      {channels.map((c) => {
        const Icon = c.icon
        return (
          <motion.div
            key={c.title}
            variants={cardVariants}
            className="flex min-w-0 flex-col gap-2 rounded-2xl border-2 border-border bg-white p-3.5 lg:flex-row lg:gap-3 lg:p-4"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08] text-primary lg:h-10 lg:w-10">
              <Icon className="h-4 w-4 lg:h-4.5 lg:w-4.5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-col items-start gap-0.5 lg:flex-row lg:items-start lg:justify-between lg:gap-3">
                <h3 className="font-semibold tracking-tight">{c.title}</h3>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="truncate text-sm font-semibold text-primary underline-offset-4 hover:underline lg:shrink-0"
                >
                  {c.action}
                </a>
              </div>
              <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{c.description}</p>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
