import { ChevronDown } from "lucide-react"
import type { FaqItem } from "@/lib/faq"

/**
 * Server-rendered FAQ accordion built on the native <details>/<summary>
 * elements. Unlike a JS-driven accordion, every answer is present in the
 * initial HTML (so it shows up in view-source and to crawlers) while still
 * collapsing visually and needing zero client-side JavaScript.
 */
export function FaqAccordion({ items, idPrefix }: { items: FaqItem[]; idPrefix?: string }) {
  return (
    <div className="w-full divide-y divide-border/60">
      {items.map((item, i) => (
        <details key={idPrefix ? `${idPrefix}-${i}` : i} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left text-base font-medium transition-colors hover:text-primary group-open:text-primary [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <ChevronDown
              className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <div className="pb-5 text-pretty leading-relaxed text-muted-foreground">{item.a}</div>
        </details>
      ))}
    </div>
  )
}
