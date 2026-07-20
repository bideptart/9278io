"use client"

import { useState } from "react"

/* Tries several formats so it works whatever you save the file as. */
const SOURCES = [
  "/industries/playbook.png",
  "/industries/playbook.jpg",
  "/industries/playbook.jpeg",
  "/industries/playbook.webp",
]

export function PlaybookImage() {
  const [i, setI] = useState(0)

  if (i < SOURCES.length) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={SOURCES[i]}
        alt="How the AI voice agent works — identifies the caller, schedules, and sends reminders, 24/7"
        onError={() => setI((v) => v + 1)}
        className="h-full w-full bg-white object-contain"
        loading="lazy"
      />
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-50 px-3 text-center text-[11px] font-medium leading-snug text-slate-400">
      Save your image to public/industries/playbook.png
    </div>
  )
}
