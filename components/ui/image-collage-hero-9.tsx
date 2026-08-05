"use client"

import { motion } from "motion/react"

// Right-column image collage from the "hero-section-9" pattern, extracted
// as a standalone piece so it can drop into an existing hero's visual slot
// without duplicating that hero's own title/subtitle/CTA markup.

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

const floatingVariants = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
  },
}

const DEFAULT_IMAGES = [
  { src: "/images/finance-voice-agent-1.png", alt: "AI voice agent answering a finance call — account balance, transactions, and investment overview" },
  { src: "/images/finance-voice-agent-2.png", alt: "AI voice agent assisting a finance team member over a headset call" },
  { src: "/images/finance-voice-agent-3.png", alt: "AI voice agent reading back a financial summary during a call" },
]

export default function ImageCollageHero({ images = DEFAULT_IMAGES }: { images?: { src: string; alt: string }[] }) {
  return (
    <motion.div
      className="relative h-[400px] w-full sm:h-[500px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Decorative shapes */}
      <motion.div
        className="absolute -top-4 left-1/4 h-16 w-16 rounded-full bg-blue-200/50"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-0 right-1/4 h-12 w-12 rounded-lg bg-sky-200/50"
        variants={floatingVariants}
        animate="animate"
        style={{ transitionDelay: "0.5s" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-4 h-6 w-6 rounded-full bg-emerald-200/50"
        variants={floatingVariants}
        animate="animate"
        style={{ transitionDelay: "1s" }}
      />

      {/* Images — each box matches its image's real aspect ratio, and
          object-contain guarantees the full frame is always visible with
          no cropping, regardless of ratio. */}
      <motion.div
        className="absolute left-1/2 top-0 w-52 -translate-x-1/2 rounded-2xl bg-white p-2 shadow-lg sm:w-72"
        style={{ transformOrigin: "bottom center", aspectRatio: "758 / 548" }}
        variants={imageVariants}
      >
        <img src={images[0].src} alt={images[0].alt} className="h-full w-full rounded-xl object-contain" />
      </motion.div>
      <motion.div
        className="absolute right-0 top-1/3 w-44 rounded-2xl bg-white p-2 shadow-lg sm:w-64"
        style={{ transformOrigin: "left center", aspectRatio: "772 / 548" }}
        variants={imageVariants}
      >
        <img src={images[1].src} alt={images[1].alt} className="h-full w-full rounded-xl object-contain" />
      </motion.div>
      <motion.div
        className="absolute -left-2 bottom-6 h-24 rounded-2xl bg-white p-1 shadow-lg sm:h-32"
        style={{ transformOrigin: "top right", aspectRatio: "1536 / 470", width: "auto" }}
        variants={imageVariants}
      >
        <img src={images[2].src} alt={images[2].alt} className="h-full w-full rounded-xl object-contain" />
      </motion.div>
    </motion.div>
  )
}
