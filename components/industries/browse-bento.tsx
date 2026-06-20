"use client"

import Link from "next/link"
import { ArrowRight, Plus } from "lucide-react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { INDUSTRIES, CAP_COLORS, type Industry } from "@/lib/industries"

/* ══════════════════════════════════════════════════
   "Browse by industry" — bento grid (hero + tiles)
══════════════════════════════════════════════════ */

export function BrowseBento() {
  const [hero, ...rest] = INDUSTRIES
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(196px,auto)]">
      <HeroTile item={hero} />
      {rest.map((ind, i) => (
        <BentoTile key={ind.slug} item={ind} delay={0.04 * (i + 1)} />
      ))}
      <MoreTile delay={0.04 * (rest.length + 1)} />
    </div>
  )
}

/* ── Hero tile (2×2) ── */

function HeroTile({ item }: { item: Industry }) {
  const Icon = item.icon
  const href = `/industries/${item.slug}`
  return (
    <ScrollReveal className="h-full sm:col-span-2 lg:row-span-2">
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border-[3px] border-primary/20 bg-gradient-to-br from-primary/[0.07] via-white to-white p-7 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/15 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />

        <div className="relative flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-white text-primary shadow-sm">
            <Icon className="h-6 w-6" aria-hidden />
          </span>
          <span className="rounded-full border border-primary/20 bg-primary/[0.08] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
            Most popular
          </span>
        </div>

        <h3 className="relative mt-4 text-2xl font-bold tracking-tight">{item.name}</h3>
        <p className="relative mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{item.short}</p>

        <div className="relative mt-4 flex flex-wrap gap-2">
          {item.caps.map((cap) => (
            <span key={cap} className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${CAP_COLORS[cap]}`}>
              {cap}
            </span>
          ))}
        </div>

        {/* Live agent conversation */}
        <div className="relative mt-auto pt-6">
          <p className="mb-2.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <motion.span className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
            Live agent preview
          </p>
          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur-sm">
            {item.conversation.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: line.speaker === "Agent" ? -8 : 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.15 * i }}
                className={`flex text-xs ${line.speaker === "Agent" ? "justify-start" : "justify-end"}`}
              >
                {line.speaker === "Agent" ? (
                  <span className="max-w-[85%] rounded-2xl rounded-bl-sm bg-primary/15 px-3 py-1.5 text-primary ring-1 ring-primary/20">
                    <span className="mr-1 text-[9px] font-bold opacity-60">Agent</span>
                    {line.text}
                  </span>
                ) : (
                  <span className="max-w-[85%] rounded-2xl rounded-br-sm bg-white px-3 py-1.5 text-slate-700 shadow-sm ring-1 ring-slate-200">
                    <span className="mr-1 text-[9px] font-bold opacity-40">Caller</span>
                    {line.text}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
          <Link
            href={href}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Explore {item.name.toLowerCase()} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

/* ── Compact bento tile ── */

function BentoTile({ item, delay }: { item: Industry; delay: number }) {
  const Icon = item.icon
  const href = `/industries/${item.slug}`
  const agentLine = item.conversation.find((l) => l.speaker === "Agent")?.text
  return (
    <ScrollReveal delay={delay} className="h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border-[3px] border-border bg-white p-5 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:bg-slate-50/70"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/15 bg-primary/[0.07] text-primary transition-colors duration-200 group-hover:border-primary/30 group-hover:bg-primary/[0.12]">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <ArrowRight className="size-4 -translate-x-1 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
        </div>

        {/* Text */}
        <h3 className="mt-3.5 text-[15px] font-bold tracking-tight transition-colors group-hover:text-primary">
          {item.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{item.short}</p>

        {/* Capability tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.caps.map((cap) => (
            <span key={cap} className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${CAP_COLORS[cap]}`}>
              {cap}
            </span>
          ))}
        </div>

        {/* Footer: one-line agent quote */}
        <div className="mt-auto pt-4">
          {agentLine && (
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-2.5 py-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/15 text-[9px] font-bold text-primary">A</span>
              <p className="truncate text-[11px] italic leading-relaxed text-slate-500">{agentLine}</p>
            </div>
          )}
          <Link
            href={href}
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            Explore <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

/* ── "Many more" tile ── */

function MoreTile({ delay }: { delay: number }) {
  return (
    <ScrollReveal delay={delay} className="h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border-[3px] border-dashed border-primary/30 bg-primary/[0.04] p-5 transition-all duration-300 hover:border-primary/50 hover:bg-primary/[0.07]"
      >
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-white text-primary">
            <Plus className="h-5 w-5" aria-hidden />
          </span>
          <ArrowRight className="size-4 -translate-x-1 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
        </div>

        <h3 className="mt-3.5 text-[15px] font-bold tracking-tight text-primary">Many more</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          Security, recruiting, insurance, finance and more — tell us your calls and we&apos;ll tune an agent for you.
        </p>

        <Link
          href="/get-started"
          className="mt-auto inline-flex items-center gap-1 pt-4 text-[11px] font-semibold uppercase tracking-wider text-primary"
        >
          Get started <ArrowRight className="h-3 w-3" />
        </Link>
      </motion.div>
    </ScrollReveal>
  )
}
