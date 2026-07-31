import { MessageCircleQuestion, type LucideIcon } from "lucide-react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { FaqAccordion } from "@/components/faq/faq-accordion"
import { FAQ_GROUP_ICONS } from "@/components/faq/faq-icons"
import { FAQ_GROUP_INTROS } from "@/components/faq/faq-highlights"
import { cn } from "@/lib/utils"
import type { FaqGroup } from "@/lib/faq"

export function FaqDetailSections({ groups }: { groups: FaqGroup[] }) {
  return (
    <div className="space-y-20 md:space-y-28">
      {groups.map((g, i) => {
        const Icon: LucideIcon = FAQ_GROUP_ICONS[g.id] ?? MessageCircleQuestion
        const reversed = i % 2 === 1

        return (
          <section key={g.id} id={`${g.id}-detail`} className="scroll-mt-24">
            <div
              className={cn(
                "grid items-start gap-10 lg:grid-cols-2 lg:gap-16",
                reversed && "lg:[&>*:first-child]:order-2",
              )}
            >
              {/* Text column — sticks in place while the taller accordion scrolls past */}
              <ScrollReveal className="lg:sticky lg:top-24 lg:self-start">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/[0.07] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary ring-1 ring-inset ring-primary/20">
                  <Icon className="size-3.5" aria-hidden />
                  {g.title}
                </span>

                <h3 className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  {g.title}, answered.
                </h3>
                <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
                  {FAQ_GROUP_INTROS[g.id]}
                </p>
              </ScrollReveal>

              {/* Accordion column — the real questions and answers */}
              <ScrollReveal delay={0.06}>
                <div className="rounded-3xl bg-secondary/40 p-4 ring-1 ring-inset ring-border/60 md:p-5">
                  <FaqAccordion items={g.items} idPrefix={g.id} />
                </div>
              </ScrollReveal>
            </div>
          </section>
        )
      })}
    </div>
  )
}
