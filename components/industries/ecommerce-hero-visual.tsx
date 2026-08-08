"use client"

import { motion } from "motion/react"
import {
  Search,
  Headphones,
  Star,
  Percent,
  ShoppingCart,
  Lock,
  Truck,
  RotateCcw,
  Mic,
  Sparkles,
} from "lucide-react"

const ORBIT_ICONS = [
  { Icon: Search, label: "Voice Search", angle: -90, from: "from-violet-500", to: "to-purple-500" },
  { Icon: Star, label: "Recommendations", angle: -45, from: "from-amber-400", to: "to-orange-500" },
  { Icon: ShoppingCart, label: "Add to Cart", angle: 0, from: "from-blue-500", to: "to-sky-500" },
  { Icon: Lock, label: "Secure Checkout", angle: 45, from: "from-emerald-500", to: "to-teal-500" },
  { Icon: Truck, label: "Order Tracking", angle: 90, from: "from-sky-500", to: "to-cyan-500" },
  { Icon: RotateCcw, label: "Returns & Refunds", angle: 135, from: "from-rose-500", to: "to-pink-500" },
  { Icon: Percent, label: "Offers & Deals", angle: 180, from: "from-fuchsia-500", to: "to-purple-500" },
  { Icon: Headphones, label: "24/7 Support", angle: -135, from: "from-indigo-500", to: "to-blue-500" },
]

const SPARKLES = [
  { top: "8%", left: "18%", delay: 0, size: "size-2.5" },
  { top: "14%", left: "82%", delay: 0.6, size: "size-2" },
  { top: "78%", left: "10%", delay: 1.2, size: "size-2" },
  { top: "88%", left: "78%", delay: 0.3, size: "size-2.5" },
  { top: "48%", left: "3%", delay: 0.9, size: "size-1.5" },
  { top: "50%", left: "97%", delay: 1.5, size: "size-1.5" },
]

const ORBIT_RADIUS = 42

/**
 * E-commerce hero visual: a circular voice-AI orbit — 8 colour-coded
 * capability nodes (voice search, recommendations, cart, checkout, tracking,
 * returns, offers, support) floating around a pulsing central mic core,
 * with twinkling sparkles and floating trust chips for extra life.
 */
export function EcommerceHeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]">
      {/* outer dashed ring, slowly rotating */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full border border-dashed border-blue-400/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      {/* second ring, counter-rotating for a layered feel */}
      <motion.div
        aria-hidden
        className="absolute inset-[20%] rounded-full border border-dashed border-blue-400/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 38, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      {/* inner solid ring */}
      <div aria-hidden className="absolute inset-[12%] rounded-full border border-blue-400/15" />

      {/* radar sonar pings, rippling outward from the mic core */}
      {[0, 1.3, 2.6].map((delay) => (
        <motion.div
          key={delay}
          aria-hidden
          className="absolute inset-0 m-auto size-24 rounded-full border-2 border-blue-400 sm:size-32"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 2.6, opacity: 0 }}
          transition={{ duration: 3.9, repeat: Number.POSITIVE_INFINITY, ease: "easeOut", delay }}
        />
      ))}

      {/* orbiting satellite dots — small glowing dots that travel around the ring */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <span
          className="absolute size-3 rounded-full bg-blue-500 shadow-[0_0_10px_3px_rgba(59,130,246,0.6)]"
          style={{ left: `${50 + ORBIT_RADIUS}%`, top: "50%", transform: "translate(-50%, -50%)" }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <span
          className="absolute size-2 rounded-full bg-sky-400 shadow-[0_0_8px_2px_rgba(56,189,248,0.6)]"
          style={{ left: `${50 - ORBIT_RADIUS}%`, top: "50%", transform: "translate(-50%, -50%)" }}
        />
      </motion.div>

      {/* dotted disc background */}
      <div
        aria-hidden
        className="absolute inset-[6%] overflow-hidden rounded-full bg-gradient-to-br from-blue-500/[0.06] via-sky-50 to-blue-500/[0.08] shadow-inner"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] bg-[length:14px_14px] opacity-40" />
      </div>

      {/* twinkling sparkle particles */}
      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`absolute z-10 ${s.size} text-blue-300`}
          style={{ top: s.top, left: s.left }}
          animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.15, 0.7] }}
          transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: s.delay }}
        >
          <Sparkles className="size-full" aria-hidden />
        </motion.span>
      ))}

      {/* orbiting capability nodes */}
      {ORBIT_ICONS.map(({ Icon, label, angle, from, to }, i) => {
        const rad = (angle * Math.PI) / 180
        const x = 50 + ORBIT_RADIUS * Math.cos(rad)
        const y = 50 + ORBIT_RADIUS * Math.sin(rad)
        return (
          <motion.div
            key={label}
            className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: i * 0.08 },
              scale: { duration: 0.5, delay: i * 0.08, type: "spring", stiffness: 260, damping: 18 },
              y: { duration: 3.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: i * 0.2 + 0.5 },
            }}
          >
            <span
              className={`grid size-11 place-items-center rounded-full bg-gradient-to-br ${from} ${to} text-white shadow-lg ring-2 ring-white sm:size-12`}
            >
              <Icon className="size-4.5 sm:size-5" aria-hidden />
            </span>
            <span className="whitespace-nowrap rounded-full bg-white/90 px-2 py-0.5 text-[9.5px] font-semibold text-slate-700 shadow-sm backdrop-blur sm:text-[10.5px]">
              {label}
            </span>
          </motion.div>
        )
      })}

      {/* central pulsing mic core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative z-30 grid size-24 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-2xl shadow-blue-600/30 ring-8 ring-blue-100/50 sm:size-32"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-blue-400/30 motion-safe:animate-ping"
            style={{ animationDuration: "2.4s" }}
          />
          <Mic className="relative size-9 sm:size-11" aria-hidden />
        </motion.div>
      </div>
    </div>
  )
}
