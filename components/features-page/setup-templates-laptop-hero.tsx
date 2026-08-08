"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { User, HeartPulse, Bus, MessageSquareText, Plus, Star, ChevronRight, Check } from "lucide-react"

const TILES = [
  { icon: User, name: "Receptionist", tone: "#2563EB" },
  { icon: HeartPulse, name: "Healthcare", tone: "#10B981" },
  { icon: Bus, name: "Transport", tone: "#2563EB" },
  { icon: MessageSquareText, name: "Support", tone: "#0EA5E9" },
  { icon: Plus, name: "Blank", tone: "#2563EB" },
]

const CHECKLIST = ["Greeting", "Routing", "Knowledge"]

const TILE_CYCLE_MS = 1500
const STATUS = ["Opening Receptionist…", "Opening Healthcare…", "Opening Transport…", "Opening Support…", "Opening Blank…"]

// approximate cursor landing spot per tile, as % of the panel's content area
const CURSOR_POS = [
  { top: 34, left: 30 },
  { top: 34, left: 78 },
  { top: 62, left: 30 },
  { top: 62, left: 78 },
  { top: 90, left: 50 },
]

export function SetupTemplatesLaptopHero() {
  const [activeTile, setActiveTile] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActiveTile((a) => (a + 1) % TILES.length), TILE_CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-lg pb-8 pt-2" style={{ perspective: 1200 }}>
      {/* animated gradient ring — the rotating layer is oversized and clipped
          by this wrapper's overflow-hidden, so it can never bleed past a
          thin border no matter how the panel underneath is sized */}
      <div className="relative mx-auto w-[90%] overflow-hidden rounded-[18px] p-[2px]">
        <motion.div
          aria-hidden
          className="absolute inset-[-60%]"
          style={{ background: "conic-gradient(from 0deg, #1D4ED8, #60A5FA, #93C5FD, #2563EB, #1D4ED8)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        {/* dashboard panel — no laptop frame, no drop shadows or glow behind it,
            gently floating and tilting in 3D so it doesn't feel static */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-white"
          initial={{ opacity: 0, y: 24 }}
          animate={{ rotateX: [2, -2, 2], rotateY: [-2, 2, -2] }}
          whileInView={{ opacity: 1, y: [24, 0, -6, 0] }}
          viewport={{ once: false, amount: 0.4 }}
          style={{ transformStyle: "preserve-3d" }}
          transition={{
            opacity: { duration: 0.5 },
            y: { duration: 0.5, times: [0, 0.4, 0.7, 1], delay: 0, ease: [0.22, 1, 0.36, 1] },
            rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="size-2 rounded-full bg-[#F87171]" />
              <span className="size-2 rounded-full bg-[#FBBF24]" />
              <span className="size-2 rounded-full bg-[#34D399]" />
            </div>
            <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              <motion.span
                className="size-1.5 rounded-full bg-emerald-500"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              Live
            </span>
            <span className="rounded-full bg-[#F1F5F9] px-1.5 py-0.5 font-mono text-[9px] font-bold text-muted-foreground">
              {activeTile + 1}/{TILES.length}
            </span>
          </div>
          <div className="relative h-4 w-36 shrink-0 overflow-visible text-right">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeTile}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="absolute right-0 top-0 whitespace-nowrap text-[10px] font-medium leading-4 text-muted-foreground"
              >
                {STATUS[activeTile]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* progress bar showing how far into this tile's turn we are */}
        <div className="h-[2px] w-full overflow-hidden bg-[#EEF2F7]">
          <motion.div
            key={activeTile}
            className="h-full"
            style={{ backgroundColor: TILES[activeTile].tone }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: TILE_CYCLE_MS / 1000, ease: "linear" }}
          />
        </div>

        <div className="relative grid grid-cols-2 gap-3 p-4">
          {TILES.map((t, i) => {
            const Icon = t.icon
            const isBlank = t.name === "Blank"
            const isActive = activeTile === i
            return (
              <motion.div
                key={t.name}
                className={`relative flex flex-col items-start gap-3 rounded-xl p-3.5 ${i === TILES.length - 1 ? "col-span-2 mx-auto w-[calc(50%-6px)]" : ""}`}
                animate={{
                  backgroundColor: isActive ? `${t.tone}0F` : "#F7F9FC",
                  borderColor: isActive ? t.tone : "#EEF2F7",
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -6 : 0,
                  zIndex: isActive ? 10 : 1,
                  boxShadow: isActive ? `0 14px 28px -12px ${t.tone}55` : "0 0px 0px 0px transparent",
                  filter: isActive ? "blur(0px)" : "blur(1.5px)",
                  opacity: isActive ? 1 : 0.72,
                }}
                style={{ borderWidth: 1.5, borderStyle: "solid", transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.06 }}
              >
                <div className="relative">
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{ border: `1.5px solid ${t.tone}` }}
                      initial={{ opacity: 0.6, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.6 }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    />
                  )}
                  <motion.span
                    className="flex size-9 items-center justify-center rounded-full"
                    animate={{
                      backgroundColor: isBlank ? `${t.tone}12` : `${t.tone}18`,
                      scale: isActive ? [1, 1.15, 1] : 1,
                      rotate: isActive ? [0, -8, 8, 0] : 0,
                      z: isActive ? 24 : 0,
                      boxShadow: isActive ? `0 6px 14px -6px ${t.tone}70` : "0 0px 0px 0px transparent",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="size-4" style={{ color: t.tone }} aria-hidden />
                  </motion.span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-[13px] font-semibold text-foreground">{t.name}</span>
                  <motion.span animate={{ x: isActive ? [0, 3, 0] : 0 }} transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}>
                    <ChevronRight className="size-3.5 text-muted-foreground" aria-hidden />
                  </motion.span>
                </div>
              </motion.div>
            )
          })}

          {/* a live cursor that glides between tiles and clicks in, giving the
              panel a "someone is actually using this" feel */}
          <motion.div
            className="pointer-events-none absolute z-20"
            animate={{ top: `${CURSOR_POS[activeTile].top}%`, left: `${CURSOR_POS[activeTile].left}%` }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ backgroundColor: TILES[activeTile].tone }}
              animate={{ scale: [0.9, 1, 0.9] }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 1.5 L2 12.5 L5.2 9.8 L7.3 14 L9.1 13.1 L7 9 L11.5 8.7 Z" fill={TILES[activeTile].tone} stroke="white" strokeWidth={1} strokeLinejoin="round" />
              </svg>
            </motion.span>
            <motion.span
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ border: `1.5px solid ${TILES[activeTile].tone}`, width: 22, height: 22, left: 4, top: 4 }}
              initial={{ opacity: 0.7, scale: 0.4 }}
              animate={{ opacity: 0, scale: 1.6 }}
              transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
            />

            {/* tiny particle burst on click-in */}
            {[0, 60, 120, 180, 240, 300].map((angle) => {
              const rad = (angle * Math.PI) / 180
              return (
                <motion.span
                  key={angle}
                  className="absolute size-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ backgroundColor: TILES[activeTile].tone, left: 4, top: 4 }}
                  initial={{ opacity: 0.9, x: 0, y: 0 }}
                  animate={{ opacity: 0, x: Math.cos(rad) * 20, y: Math.sin(rad) * 20 }}
                  transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
                />
              )
            })}
          </motion.div>
        </div>

        {/* mini setup checklist — ticks off in sequence within each tile's
            turn, giving a sense of what "opening" a template actually does */}
        <div className="flex items-center justify-center gap-3 border-t border-border/60 bg-[#FAFBFF] px-4 py-2.5">
          {CHECKLIST.map((item, i) => (
            <motion.div
              key={`${activeTile}-${item}`}
              className="flex items-center gap-1"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.15 + i * (TILE_CYCLE_MS / 1000 / 4) }}
            >
              <motion.span
                className="flex size-3.5 items-center justify-center rounded-full"
                initial={{ backgroundColor: "#E2E8F0" }}
                animate={{ backgroundColor: TILES[activeTile].tone }}
                transition={{ duration: 0.2, delay: 0.15 + i * (TILE_CYCLE_MS / 1000 / 4) }}
              >
                <Check className="size-2 text-white" aria-hidden />
              </motion.span>
              <span className="text-[9px] font-medium text-muted-foreground">{item}</span>
            </motion.div>
          ))}
        </div>
        </motion.div>
      </div>

      {/* "Launch in minutes" badge, sitting fully above the dashboard rather
          than overlapping its edge — gentle pulse + star twinkle */}
      <motion.div
        className="absolute -top-1 right-0 flex items-center gap-1.5 rounded-full border border-border/60 bg-white px-3.5 py-2 shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)] sm:-right-4"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: [1, 1.06, 1] }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{
          opacity: { duration: 0.4, delay: 0.6 },
          scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1 },
        }}
      >
        <motion.span animate={{ rotate: [0, 15, -10, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
          <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
        </motion.span>
        <span className="whitespace-nowrap text-xs font-semibold text-foreground">Launch in minutes</span>
      </motion.div>
    </div>
  )
}
