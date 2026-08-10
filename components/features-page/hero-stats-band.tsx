import type { LucideIcon } from "lucide-react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

type Stat = { icon: LucideIcon; stat: string; title: string; color: string; tile: string }

/** Four-tile stats band, pinned to the bottom of the hero's left column —
 * the same "Stats card" treatment used on the homepage hero, reused here so
 * every feature page's hero fills the same bottom space instead of leaving
 * it empty. */
export function HeroStatsBand({ stats }: { stats: Stat[] }) {
  return (
    <div className="w-full flex justify-center sm:block sm:w-auto">
      <ScrollReveal className="mt-8 grid w-[280px] max-w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border/60 sm:w-full sm:max-w-none sm:grid-cols-4">
        {stats.map((h) => {
          const Icon = h.icon
          return (
            <div key={h.title} className="flex flex-col items-center justify-center gap-0.5 bg-white px-1.5 py-1.5 text-center sm:gap-1 sm:px-3 sm:py-3">
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <span className={`flex size-5 items-center justify-center rounded-full ${h.tile} ${h.color} sm:size-8`}>
                  <Icon className="size-2.5 sm:size-4" aria-hidden />
                </span>
                <span className={`text-xs font-bold ${h.color} sm:text-lg`}>{h.stat}</span>
              </div>
              <span className="text-[8px] leading-tight text-muted-foreground sm:text-[11px]">{h.title}</span>
            </div>
          )
        })}
      </ScrollReveal>
    </div>
  )
}
