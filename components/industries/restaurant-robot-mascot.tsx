"use client"

import { motion } from "motion/react"
import { MessageCircle } from "lucide-react"

export function RestaurantRobotMascot() {
  return (
    <div className="relative flex h-80 items-center justify-center">
      <div aria-hidden className="absolute -right-8 -top-8 size-40 rounded-full bg-blue-300/30 blur-2xl" />
      <div aria-hidden className="absolute -bottom-4 -left-8 size-36 rounded-full bg-sky-300/30 blur-2xl" />
      <div aria-hidden className="absolute bottom-8 h-6 w-44 rounded-full bg-blue-900/20 blur-md" />

      <motion.div
        className="relative flex flex-col items-center"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Antenna */}
        <motion.span
          className="size-3 rounded-full bg-blue-500 shadow-[0_0_14px_rgba(59,130,246,0.9)]"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <span className="h-6 w-1 bg-blue-400" aria-hidden />

        {/* Head */}
        <div className="relative grid size-32 place-items-center rounded-[2.25rem] border-2 border-blue-100 bg-white shadow-xl shadow-blue-900/10">
          <div className="flex items-center gap-5">
            <motion.span
              className="size-5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.6)]"
              animate={{ scaleY: [1, 0.15, 1] }}
              transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
              aria-hidden
            />
            <motion.span
              className="size-5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.6)]"
              animate={{ scaleY: [1, 0.15, 1] }}
              transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
              aria-hidden
            />
          </div>
          {/* Ear buds */}
          <span className="absolute -left-3 top-9 size-4.5 rounded-full bg-blue-400 shadow-sm" aria-hidden />
          <motion.span
            className="absolute -right-3 top-9 size-4.5 rounded-full bg-blue-400 shadow-sm"
            style={{ transformOrigin: "50% -20%" }}
            animate={{ rotate: [0, 18, 0, -12, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
        </div>

        {/* Neck */}
        <span className="h-2.5 w-8 bg-blue-300" aria-hidden />

        {/* Body */}
        <div className="relative flex h-24 w-44 items-start justify-center rounded-[2.25rem] bg-gradient-to-b from-blue-600 to-sky-700 pt-5 shadow-xl">
          <motion.span
            className="absolute -left-4 top-5 h-12 w-4 origin-top rounded-full bg-blue-500"
            animate={{ rotate: [0, -22, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <span className="absolute -right-4 top-5 h-12 w-4 rounded-full bg-blue-500" aria-hidden />
          <motion.span
            className="grid size-11 place-items-center rounded-full bg-white text-blue-600 shadow-inner"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <MessageCircle className="size-5.5" aria-hidden />
          </motion.span>
        </div>
      </motion.div>
    </div>
  )
}
