"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight, MessageCircleQuestion, type LucideIcon } from "lucide-react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { FAQ_GROUP_ICONS } from "@/components/faq/faq-icons"
import { FAQ_GROUP_BLURBS } from "@/components/faq/faq-highlights"
import type { FaqGroup } from "@/lib/faq"

export function FaqCategoryGrid({ groups }: { groups: FaqGroup[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((g, i) => {
        const Icon: LucideIcon = FAQ_GROUP_ICONS[g.id] ?? MessageCircleQuestion
        return (
          <ScrollReveal key={g.id} delay={i * 0.04}>
            <Link
              href={`#${g.id}-detail`}
              className="group relative block h-full overflow-hidden rounded-2xl border border-border/60 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
            >
              {/* top accent bar that fills in on hover */}
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-[oklch(0.6_0.19_262.88)] transition-transform duration-300 ease-out group-hover:scale-x-100" />

              <div className="flex items-start justify-between">
                <motion.span
                  className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground"
                  whileHover={{ scale: 1.08, rotate: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                >
                  <Icon className="size-5" aria-hidden />
                </motion.span>
                <span className="font-mono text-xs text-muted-foreground/50 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-4 text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {g.title}
              </p>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{FAQ_GROUP_BLURBS[g.id]}</p>

              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold tabular-nums text-primary">
                {g.items.length} answers
                <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </ScrollReveal>
        )
      })}
    </div>
  )
}
