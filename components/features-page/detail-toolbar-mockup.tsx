"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Search, SlidersHorizontal, Download, Check } from "lucide-react"
import type { ReactNode } from "react"

type DetailItem = {
  icon: ReactNode
  title: string
  description: string
}

const CYCLE_MS = 2600
const SEARCH_TEXT = "Aarav Mehta — May 30"

/** Runs its own perpetual type → hold → clear → pause loop, independent of
 * which toolbar segment is currently highlighted — so the search bar keeps
 * "searching again" repeatedly on its own instead of typing once and then
 * sitting frozen while Filter/Export take their turn. */
function useLoopingTypewriter(text: string, { typeMs = 45, holdMs = 1800, pauseMs = 900 } = {}) {
  const [shown, setShown] = useState("")
  useEffect(() => {
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []

    function run() {
      setShown("")
      let i = 0
      const typeInterval = setInterval(() => {
        if (cancelled) return
        i++
        setShown(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(typeInterval)
          timers.push(setTimeout(() => !cancelled && setShown(""), holdMs))
          timers.push(setTimeout(run, holdMs + pauseMs))
        }
      }, typeMs)
      timers.push(typeInterval as unknown as ReturnType<typeof setTimeout>)
    }

    run()
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [text, typeMs, holdMs, pauseMs])
  return shown
}

/** Flips true partway through a segment's active window, so the "applied" /
 * "done" state has time to actually be seen before the cycle moves on. */
function useSettles(active: boolean, delayMs: number) {
  const [settled, setSettled] = useState(false)
  useEffect(() => {
    if (!active) {
      setSettled(false)
      return
    }
    const id = setTimeout(() => setSettled(true), delayMs)
    return () => clearTimeout(id)
  }, [active, delayMs])
  return settled
}

/**
 * "What you get" as a live toolbar mockup — a real search-bar/filter/export
 * UI strip (styled like the actual product toolbar) sitting above matching
 * description cards, each linked to its toolbar segment by a connector
 * line and shared accent color. Every segment plays its own live action
 * when it's the active one — the search bar types a query, the filter
 * button applies a date range, the export button completes a download —
 * instead of only the first segment doing anything while the rest just
 * glow. Distinct from the numbered-list, card-grid, and bordered-row
 * treatments used elsewhere on the site.
 */
export function DetailToolbarMockup({ items }: { items: DetailItem[] }) {
  const tones = ["#2563EB", "#7C3AED", "#D97706"]
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % 3), CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  const typed = useLoopingTypewriter(SEARCH_TEXT)
  const filterApplied = useSettles(active === 1, 900)
  const exported = useSettles(active === 2, 900)

  return (
    <div className="mt-2">
      {/* the toolbar itself — a literal mockup of the feature */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-white p-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:flex-row"
      >
        <motion.div
          className="flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-2.5"
          animate={{
            backgroundColor: "#F7F9FC",
            boxShadow: active === 0 ? `0 0 0 2px ${tones[0]}` : "0 0 0 0px transparent",
          }}
          transition={{ duration: 0.3 }}
        >
          <Search className="size-4 shrink-0" style={{ color: tones[0] }} aria-hidden />
          <span className="min-w-0 flex-1 truncate text-sm" style={{ color: typed ? "#0F172A" : "var(--muted-foreground)" }}>
            {typed || "Search bookings by name, date, agent…"}
            {typed.length < SEARCH_TEXT.length && (
              <motion.span
                className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5"
                style={{ backgroundColor: tones[0] }}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              />
            )}
          </span>
          {typed.length === SEARCH_TEXT.length && (
            <motion.span
              className="flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold"
              style={{ backgroundColor: `${tones[0]}14`, color: tones[0] }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: tones[0] }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              3 matches
            </motion.span>
          )}
        </motion.div>

        <motion.button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium text-foreground"
          animate={{ borderColor: active === 1 ? tones[1] : "var(--border)", backgroundColor: active === 1 ? `${tones[1]}0F` : "#FFFFFF" }}
          transition={{ duration: 0.3 }}
        >
          <SlidersHorizontal className="size-4" style={{ color: tones[1] }} aria-hidden />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={active === 1 && filterApplied ? "applied" : "idle"}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-1"
            >
              {active === 1 && filterApplied ? (
                <>
                  <Check className="size-3.5" style={{ color: tones[1] }} aria-hidden />
                  This week
                </>
              ) : (
                "Filter"
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        <motion.button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white"
          animate={{ backgroundColor: active === 2 && exported ? "#16A34A" : tones[2], scale: active === 2 && !exported ? [1, 1.05, 1] : 1 }}
          transition={{ duration: active === 2 && !exported ? 0.5 : 0.3 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {active === 2 && exported ? (
              <motion.span key="done" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2">
                <Check className="size-4" aria-hidden />
                Exported
              </motion.span>
            ) : (
              <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2">
                <Download className="size-4" aria-hidden />
                Export
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* connector lines from each toolbar segment down to its card, lit when active */}
      <div className="hidden grid-cols-3 gap-6 sm:grid" aria-hidden>
        {tones.map((tone, i) => (
          <div key={i} className="flex justify-center">
            <motion.div
              className="h-6 w-px"
              animate={{ backgroundColor: i === active ? tone : `${tone}30` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>

      {/* description cards, one per toolbar segment */}
      <div className="mt-2 grid gap-6 sm:mt-0 sm:grid-cols-3">
        {items.map((d, i) => (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px", amount: 0.4 }}
            transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
            animate={{
              borderColor: i === active ? tones[i] : "var(--border)",
              boxShadow: i === active ? `0 12px 28px -18px ${tones[i]}66` : "0 0px 0px 0px transparent",
            }}
            className="rounded-2xl border bg-white p-5"
          >
            <span
              className="flex size-9 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${tones[i]}14`, color: tones[i] }}
            >
              {d.icon}
            </span>
            <p className="mt-3 text-base font-semibold tracking-tight text-foreground">{d.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
