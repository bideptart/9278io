"use client"

import { useEffect, useState } from "react"

type Section = { id: string; title: string }

export function TocNav({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b))
          setActiveId(topMost.target.id)
        }
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 },
    )

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [sections])

  return (
    <nav className="grid gap-1.5 sm:grid-cols-2">
      {sections.map((s) => {
        const isActive = s.id === activeId
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`text-sm underline-offset-4 transition-colors ${
              isActive ? "font-semibold text-primary" : "text-muted-foreground hover:text-primary hover:underline"
            }`}
          >
            {s.title}
          </a>
        )
      })}
    </nav>
  )
}
