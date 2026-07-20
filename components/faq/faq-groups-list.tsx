"use client"

import { useMemo } from "react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { FaqAccordion } from "@/components/faq/faq-accordion"
import { useFaqSearch } from "./faq-search-context"
import type { FaqGroup } from "@/lib/faq"

export function FaqGroupsList({ groups }: { groups: FaqGroup[] }) {
  const { query } = useFaqSearch()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return groups
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter((it) => it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q)),
      }))
      .filter((g) => g.items.length > 0)
  }, [query, groups])

  if (filtered.length === 0) {
    return <p className="py-16 text-center text-muted-foreground">No questions match &quot;{query}&quot;.</p>
  }

  return (
    <>
      {filtered.map((group) => (
        <section
          key={group.id}
          id={group.id}
          className="scroll-mt-24 border-b border-border/50 py-10 first:pt-0 last:border-b-0"
        >
          <ScrollReveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{group.title}</h2>
          </ScrollReveal>

          <ScrollReveal className="mt-6">
            <FaqAccordion items={group.items} idPrefix={group.id} />
          </ScrollReveal>
        </section>
      ))}
    </>
  )
}
