"use client"

import { motion } from "motion/react"
import type { FaqItem } from "@/lib/faq"

/**
 * FAQ list with no card backgrounds at all — just generous whitespace and a
 * thin accent bar that fades in on the left on hover, blockquote-style. A
 * deliberately different, boxless shape from FaqAccordion (expand/collapse
 * list) and FaqPreviewCards (bordered card grid), so this page doesn't
 * repeat a format already used elsewhere.
 */
export function FaqPlainList({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-8">
      {items.map((item, i) => (
        <motion.div
          key={item.q}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px", amount: 0.4 }}
          transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
          className="group relative pl-5"
        >
          <span className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-0.5 origin-top scale-y-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-y-100" />
          <p className="text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {item.q}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
        </motion.div>
      ))}
    </div>
  )
}
