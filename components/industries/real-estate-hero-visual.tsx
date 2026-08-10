"use client"

import { motion } from "motion/react"
import { KeyRound, FileCheck2, MapPin, Sparkles, BedDouble, Bath, Ruler } from "lucide-react"

/**
 * Real-estate hero visual: a phone mockup with a pulsing lock+key core and
 * a live property card, plus floating "Property Secured" / "Offer Accepted"
 * status chips that straddle the card edge — 9278 blue + white only, no photography.
 */
export function RealEstateHeroVisual() {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[480px] sm:aspect-[9/8]">
      {/* card background */}
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-50 via-white to-blue-100 shadow-[0_25px_55px_-15px_rgba(15,23,42,0.4)]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] bg-[length:16px_16px] opacity-25"
        />
      </div>

      {/* phone mockup, centered */}
      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-7">
        <div className="relative flex h-full w-[70%] flex-col items-center rounded-[2rem] border-[3px] border-blue-200 bg-white/90 pb-5 shadow-2xl shadow-blue-900/10 backdrop-blur">
          <span aria-hidden className="mt-3 h-1.5 w-12 shrink-0 rounded-full bg-blue-100" />
          <p className="mt-3 px-2 text-center text-[11.5px] font-bold leading-tight text-blue-700 sm:text-[13px]">
            AI Real Estate Assistant
          </p>

          {/* pulsing lock+key core */}
          <motion.div
            className="relative mt-4 grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.5_0.21_255)] text-white shadow-lg ring-[6px] ring-blue-100/60 sm:size-16"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-blue-400/30 motion-safe:animate-ping"
              style={{ animationDuration: "2.4s" }}
            />
            <KeyRound className="relative size-6 sm:size-7" aria-hidden />
          </motion.div>

          {/* live property card — real details */}
          <div className="mt-4 w-full px-3.5 sm:px-4">
            <div className="rounded-2xl border border-blue-100 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold leading-tight text-slate-900 sm:text-[13px]">3BHK Apartment</p>
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9.5px] font-bold text-blue-600">New</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-[10.5px] font-medium text-slate-500">
                <MapPin className="size-3 shrink-0 text-blue-400" aria-hidden />
                Greenwood, Bangalore
              </div>

              <div className="mt-2.5 flex items-center gap-3 border-t border-blue-50 pt-2.5 text-[10px] font-semibold text-slate-600">
                <span className="flex items-center gap-1">
                  <Ruler className="size-3 text-blue-400" aria-hidden />
                  1450 sq.ft
                </span>
                <span className="flex items-center gap-1">
                  <BedDouble className="size-3 text-blue-400" aria-hidden />
                  3 Beds
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="size-3 text-blue-400" aria-hidden />
                  3 Baths
                </span>
              </div>

              <div className="mt-2.5 flex items-center justify-between border-t border-blue-50 pt-2.5">
                <p className="text-[13px] font-extrabold text-blue-700">₹85.5L</p>
                <span className="rounded-full bg-gradient-to-r from-primary to-[oklch(0.5_0.21_255)] px-2.5 py-1 text-[9.5px] font-bold text-white">
                  View Details
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating chip — Property Secured (straddles the top-left corner) */}
      <motion.div
        className="absolute -left-2 top-3 z-20 sm:-left-[95px] sm:top-8"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-1.5 rounded-xl border border-white/60 bg-white/95 px-2 py-1.5 shadow-[0_14px_40px_-14px_rgba(2,132,199,0.35)] backdrop-blur-md ring-1 ring-blue-100/60 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3">
          <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-blue-500/10 to-sky-500/10 text-blue-600 sm:size-10 sm:rounded-xl">
            <KeyRound className="size-3.5 sm:size-5" aria-hidden />
          </span>
          <div>
            <p className="text-[9px] font-bold leading-tight text-slate-800 sm:text-[12.5px]">Property Secured</p>
            <p className="hidden text-[11px] font-medium text-slate-500 sm:block">Closing completed</p>
          </div>
        </div>
      </motion.div>

      {/* floating chip — Offer Accepted (straddles the bottom-right corner) */}
      <motion.div
        className="absolute -right-2 bottom-5 z-20 sm:-right-[95px] sm:bottom-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="flex items-center gap-1.5 rounded-xl border border-white/60 bg-white/95 px-2 py-1.5 shadow-[0_14px_40px_-14px_rgba(2,132,199,0.35)] backdrop-blur-md ring-1 ring-blue-100/60 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3">
          <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-blue-500/10 to-sky-500/10 text-blue-600 sm:size-10 sm:rounded-xl">
            <FileCheck2 className="size-3.5 sm:size-5" aria-hidden />
          </span>
          <div>
            <p className="text-[9px] font-bold leading-tight text-slate-800 sm:text-[12.5px]">Offer Accepted</p>
            <p className="hidden text-[11px] font-medium text-slate-500 sm:block">Signed &amp; confirmed</p>
          </div>
        </div>
      </motion.div>

      {/* location pin marker */}
      <motion.div
        className="absolute right-8 top-8 z-20 grid size-8 place-items-center rounded-full bg-white text-blue-600 shadow-md"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <MapPin className="size-4" aria-hidden />
      </motion.div>

      {/* sparkle accent */}
      <motion.span
        aria-hidden
        className="absolute bottom-6 right-6 z-20 text-blue-300"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.15, 0.8] }}
        transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <Sparkles className="size-6" aria-hidden />
      </motion.span>
    </div>
  )
}
