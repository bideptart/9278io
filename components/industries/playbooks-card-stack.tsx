"use client"

import { useRouter } from "next/navigation"
import { Component, type CardData } from "@/components/ui/morphing-card-stack"
import { INDUSTRIES } from "@/lib/industries"

/**
 * Feeds the industries into the morphing card stack (stack / grid / list).
 * Same content — each card is an industry with its icon, name, and summary.
 * Clicking a card opens that industry's page.
 */
export function PlaybooksCardStack() {
  const router = useRouter()
  const cards: CardData[] = INDUSTRIES.map((ind) => {
    const Icon = ind.icon
    return {
      id: ind.slug,
      title: ind.name,
      description: ind.short,
      icon: <Icon className="h-5 w-5" />,
      leftInfo: { title: "What the agent does", items: ind.jobs.slice(0, 3) },
      rightInfo: { title: "Real phrases it handles", items: ind.sampleLines },
    }
  })

  return (
    <Component
      cards={cards}
      defaultLayout="stack"
      availableLayouts={["stack", "list"]}
      onCardClick={(card) => router.push(`/industries/${card.id}`)}
    />
  )
}
