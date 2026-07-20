"use client"

import { useState } from "react"
import { Phone } from "lucide-react"

/**
 * Compact industry image.
 *   • Shows your own photo at /industries/<slug>.jpg when present.
 *   • Falls back to a clean branded poster until you add one.
 *
 * To use real photos: drop a file named after each industry's slug into
 * public/industries/ — e.g. public/industries/real-estate.jpg — and it
 * appears automatically. Recommended size ~640×480 (4:3), JPG or WEBP.
 */
export function IndustryImage({ slug, name }: { slug: string; name: string }) {
  const [failed, setFailed] = useState(false)

  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/industries/${slug}.jpg`}
        alt={`${name} — AI voice agent`}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    )
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/[0.12] via-primary/[0.05] to-transparent">
      <Phone className="size-9 text-primary/40" aria-hidden />
      <span className="px-3 text-center text-[11px] font-semibold uppercase tracking-wider text-primary/50">
        {name}
      </span>
    </div>
  )
}
