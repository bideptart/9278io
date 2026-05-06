import type React from "react"
import { cn } from "@/lib/utils"

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  /** Animation delay in seconds */
  delay?: number
}

/**
 * CSS-only fade-up animation that runs once on first paint.
 *
 * This is intentionally NOT a client component — it ships zero JS and
 * doesn't pull in the `motion` library. SSR'd HTML is rendered in its
 * final state with a CSS keyframe (`@keyframes reveal` in globals.css)
 * driving the entry animation. Content is visible immediately if JS is
 * disabled or hydration is delayed.
 *
 * Trade-off vs. the previous motion-based version: animation runs on
 * page load instead of on scroll-into-view. For the static long pages
 * (use-cases, about, faq, etc.) the difference is imperceptible and the
 * speed gain is significant.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  return (
    <div
      className={cn(
        "motion-safe:animate-[reveal_0.6s_cubic-bezier(0.22,1,0.36,1)_both]",
        className,
      )}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}

// Re-export the motion-based helpers so existing imports keep working.
// These are still client components, but only the 3 files that actually
// use them pay the cost.
export { StaggerGroup, StaggerItem } from "./stagger"
