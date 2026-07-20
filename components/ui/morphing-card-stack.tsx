"use client"

import { useState, useEffect, type ReactNode } from "react"
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
const AUTO_ADVANCE_MS = 3000

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

  // Auto-advance the stack; pauses while hovering (see mouse handlers below).
  useEffect(() => {
    if (layout !== "stack" || cards.length <= 1 || paused) return
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length)
      setExpandedCard(null)
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [layout, cards.length, paused])

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
    stack: "relative h-[19rem] w-80 sm:h-[21rem] sm:w-96",
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
      className={cn("space-y-4", className)}
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
            <div className="pointer-events-none absolute right-full top-1/2 mr-20 hidden w-60 -translate-y-1/2 flex-col gap-3 lg:flex xl:w-72">
              {leftInfo.title && (
                <p className="text-right text-[11px] font-semibold uppercase tracking-wider text-primary">
                  {leftInfo.title}
                </p>
              )}
              <ul className="space-y-2.5">
                {leftInfo.items.map((it, i) => (
                  <li
                    key={i}
                    className="border-r-2 border-primary/30 pr-3 text-right text-[15px] leading-snug text-foreground/80"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {layout === "stack" && rightInfo && (
            <div className="pointer-events-none absolute left-full top-1/2 ml-20 hidden w-60 -translate-y-1/2 flex-col gap-3 lg:flex xl:w-72">
              {rightInfo.title && (
                <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                  {rightInfo.title}
                </p>
              )}
              <ul className="space-y-2.5">
                {rightInfo.items.map((it, i) => (
                  <li
                    key={i}
                    className="border-l-2 border-primary/30 pl-3 text-[15px] leading-snug text-foreground/80"
                  >
                    {it}
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
                  exit={{ opacity: 0, scale: 0.8, x: -200 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
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
                    "cursor-pointer rounded-xl border border-border bg-card p-4",
                    "hover:border-primary/50 transition-colors",
                    layout === "stack" && "absolute w-72 h-64 sm:w-80 sm:h-72 p-5",
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
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
                        {card.icon}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-card-foreground truncate">{card.title}</h3>
                      <p
                        className={cn(
                          "text-base text-muted-foreground mt-1.5",
                          layout === "stack" && "line-clamp-3",
                          layout === "grid" && "line-clamp-2",
                          layout === "list" && "line-clamp-1",
                        )}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {isTopCard && (
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className="text-xs text-muted-foreground/50">Swipe to navigate</span>
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
