import Link from "next/link"
import { MessageCircleQuestion, type LucideIcon } from "lucide-react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { FAQ_GROUP_ICONS } from "@/components/faq/faq-icons"
import { FAQ_GROUP_BLURBS } from "@/components/faq/faq-highlights"
import type { FaqGroup } from "@/lib/faq"

export function FaqCategoryGrid({ groups }: { groups: FaqGroup[] }) {
  return (
    <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 md:gap-y-12 lg:grid-cols-3">
      {groups.map((g, i) => {
        const Icon: LucideIcon = FAQ_GROUP_ICONS[g.id] ?? MessageCircleQuestion
        return (
          <ScrollReveal key={g.id} delay={i * 0.04}>
            <Link href={`#${g.id}-detail`} className="group block">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-muted-foreground/60 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
              </div>
              <p className="mt-3 text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {g.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{FAQ_GROUP_BLURBS[g.id]}</p>
              <p className="mt-2 text-xs font-medium tabular-nums text-primary">{g.items.length} answers →</p>
            </Link>
          </ScrollReveal>
        )
      })}
    </div>
  )
}
