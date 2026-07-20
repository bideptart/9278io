"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "motion/react"
import { cn } from "@/lib/utils"
import { Grid3X3, Layers, LayoutList, ChevronLeft, ChevronRight } from "lucide-react"

export type LayoutMode = "stack" | "grid" | "list"

export interface CardSide {
  title?: string
  items: string[]
}

export interface CardData {
  id: string
  title: string
  description: string
  icon?: ReactNode
  color?: string
  /** Related info panels shown beside the open card (stack layout). */
  leftInfo?: CardSide
  rightInfo?: CardSide
}

export interface MorphingCardStackProps {
  cards?: CardData[]
  className?: string
  defaultLayout?: LayoutMode
  onCardClick?: (card: CardData) => void
  /** Which layout toggles to show. Defaults to all three. */
  availableLayouts?: LayoutMode[]
}

const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList,
}

const SWIPE_THRESHOLD = 50
const AUTO_ADVANCE_MS = 2000

export function Component({
  cards = [],
  className,
  defaultLayout = "stack",
  onCardClick,
  availableLayouts = ["stack", "grid", "list"],
}: MorphingCardStackProps) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  pausedRef.current = paused

  // Auto-advance the stack; pauses while hovering (checked via ref so the
  // timer keeps running instead of resetting on every hover).
  useEffect(() => {
    if (layout !== "stack" || cards.length <= 1) return
    const id = window.setInterval(() => {
      if (pausedRef.current) return
      setActiveIndex((prev) => (prev + 1) % cards.length)
      setExpandedCard(null)
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [layout, cards.length])

  if (!cards || cards.length === 0) {
    return null
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x

    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      // Swiped left - go to next card
      setActiveIndex((prev) => (prev + 1) % cards.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      // Swiped right - go to previous card
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }
    setIsDragging(false)
  }

  const getStackOrder = () => {
    const reordered = []
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length
      reordered.push({ ...cards[index], stackPosition: i })
    }
    return reordered.reverse() // Reverse so top card renders last (on top)
  }

  const getLayoutStyles = (stackPosition: number) => {
    switch (layout) {
      case "stack":
        return {
          top: stackPosition * 5,
          left: stackPosition * 4,
          zIndex: cards.length - stackPosition,
          rotate: (stackPosition - 1) * 1,
        }
      case "grid":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
        }
      case "list":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
        }
    }
  }

  const containerStyles = {
    stack: "relative h-[17rem] w-60 sm:h-[18rem] sm:w-72",
    grid: "grid grid-cols-2 gap-3",
    list: "flex flex-col gap-3",
  }

  const displayCards = layout === "stack" ? getStackOrder() : cards.map((c, i) => ({ ...c, stackPosition: i }))

  // Related info panels shown on each side of the open (top) card.
  const activeCard = cards[activeIndex]
  const leftInfo = activeCard?.leftInfo
  const rightInfo = activeCard?.rightInfo

  return (
    <div
      className={cn("space-y-3", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Layout Toggle */}
      <div className="flex items-center justify-center gap-1 rounded-lg bg-secondary/50 p-1 w-fit mx-auto">
        {availableLayouts.map((mode) => {
          const Icon = layoutIcons[mode]
          return (
            <button
              key={mode}
              onClick={() => {
                setLayout(mode)
                setExpandedCard(null)
              }}
              className={cn(
                "rounded-md p-2 transition-all",
                layout === mode
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary",
              )}
              aria-label={`Switch to ${mode} layout`}
            >
              <Icon className="h-4 w-4" />
            </button>
          )
        })}
      </div>

      {/* Cards Container */}
      <LayoutGroup>
        <div className={cn("relative", layout === "stack" && "mx-auto w-fit")}>
          {layout === "stack" && leftInfo && (
            <div className="pointer-events-none absolute right-full top-1/2 mr-16 hidden w-64 -translate-y-1/2 flex-col gap-3.5 lg:flex xl:mr-20 xl:w-72">
              {leftInfo.title && (
                <div className="flex items-center justify-end gap-2">
                  <p className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-[11px] font-bold uppercase tracking-[0.15em] text-transparent">
                    {leftInfo.title}
                  </p>
                  <span className="h-3.5 w-1 rounded-full bg-gradient-to-b from-sky-400 to-blue-600" aria-hidden />
                </div>
              )}
              <ul key={activeIndex} className="space-y-2.5">
                {leftInfo.items.map((it, i) => (
                  <li
                    key={i}
                    style={{ animationDelay: `${i * 0.08}s` }}
                    className="ind-item-in flex items-center justify-end gap-3"
                  >
                    <span className="text-right text-[13px] font-medium leading-snug text-foreground/85">{it}</span>
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 font-serif text-xs font-bold text-white shadow-md shadow-blue-500/30">
                      {i + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {layout === "stack" && rightInfo && (
            <div className="pointer-events-none absolute left-full top-1/2 ml-16 hidden w-64 -translate-y-1/2 flex-col gap-3.5 lg:flex xl:ml-20 xl:w-72">
              {rightInfo.title && (
                <div className="flex items-center gap-2">
                  <span className="h-3.5 w-1 rounded-full bg-gradient-to-b from-sky-400 to-blue-600" aria-hidden />
                  <p className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-[11px] font-bold uppercase tracking-[0.15em] text-transparent">
                    {rightInfo.title}
                  </p>
                </div>
              )}
              <ul key={activeIndex} className="space-y-2.5">
                {rightInfo.items.map((it, i) => (
                  <li
                    key={i}
                    style={{ animationDelay: `${i * 0.08}s` }}
                    className="ind-item-in relative overflow-hidden rounded-xl border border-slate-200/70 bg-white/80 py-2.5 pl-4 pr-3.5 shadow-sm backdrop-blur-sm"
                  >
                    <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-sky-400 to-blue-600" />
                    <p className="text-[13px] italic leading-snug text-foreground/75">
                      <span className="mr-0.5 font-serif text-base not-italic text-sky-500">&ldquo;</span>
                      {it}
                      <span className="font-serif text-base not-italic text-sky-500">&rdquo;</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <motion.div layout className={cn(containerStyles[layout], "mx-auto")}>
          <AnimatePresence mode="popLayout">
            {displayCards.map((card) => {
              const styles = getLayoutStyles(card.stackPosition)
              const isExpanded = expandedCard === card.id
              const isTopCard = layout === "stack" && card.stackPosition === 0

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: isExpanded ? 1.05 : 1,
                    x: 0,
                    ...styles,
                  }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{
                    duration: 0.38,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  drag={isTopCard ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                  onClick={() => {
                    if (isDragging) return
                    setExpandedCard(isExpanded ? null : card.id)
                    onCardClick?.(card)
                  }}
                  className={cn(
                    "cursor-pointer rounded-xl border border-white/25 bg-gradient-to-br from-sky-400 to-blue-500 p-4 shadow-lg shadow-blue-500/20",
                    "hover:border-white/50 transition-colors",
                    layout === "stack" && "absolute w-56 h-56 sm:w-60 sm:h-60 p-4",
                    layout === "stack" && isTopCard && "cursor-grab active:cursor-grabbing",
                    layout === "grid" && "w-full aspect-square",
                    layout === "list" && "w-full",
                    isExpanded && "ring-2 ring-primary",
                  )}
                  style={{
                    backgroundColor: card.color || undefined,
                  }}
                >
                  <div className="flex items-start gap-3">
                    {card.icon && (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white ring-1 ring-white/25">
                        {card.icon}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-white truncate">{card.title}</h3>
                      <p
                        className={cn(
                          "font-medium text-white/90 mt-1.5",
                          layout === "stack" && "text-[11px] leading-snug",
                          layout === "grid" && "text-sm line-clamp-2",
                          layout === "list" && "text-sm line-clamp-1",
                        )}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {layout === "stack" && (
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                        View in detail
                      </span>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
          </motion.div>
        </div>
      </LayoutGroup>

      {layout === "stack" && cards.length > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
              setExpandedCard(null)
            }}
            aria-label="Previous card"
            className="grid size-9 place-items-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-secondary"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex items-center gap-1.5">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index)
                  setExpandedCard(null)
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  index === activeIndex ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                )}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveIndex((prev) => (prev + 1) % cards.length)
              setExpandedCard(null)
            }}
            aria-label="Next card"
            className="grid size-9 place-items-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-secondary"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}

      {/* Related info below the card on mobile/tablet (side panels only show on lg+) */}
      {layout === "stack" && (leftInfo || rightInfo) && (
        <div className="mx-auto grid max-w-md gap-5 px-2 pt-2 sm:grid-cols-2 lg:hidden">
          {leftInfo ? (
            <div>
              {leftInfo.title ? (
                <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">{leftInfo.title}</p>
              ) : null}
              <ul className="mt-2.5 space-y-2">
                {leftInfo.items.map((it, i) => (
                  <li key={i} className="border-l-2 border-primary/30 pl-3 text-[13px] leading-snug text-foreground/80">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {rightInfo ? (
            <div>
              {rightInfo.title ? (
                <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">{rightInfo.title}</p>
              ) : null}
              <ul className="mt-2.5 space-y-2">
                {rightInfo.items.map((it, i) => (
                  <li key={i} className="border-l-2 border-primary/30 pl-3 text-[13px] leading-snug text-foreground/80">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
