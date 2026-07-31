import type { CSSProperties } from "react"

const rowA = ["Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati"]
const rowB = ["Kannada", "Malayalam", "Punjabi", "English", "+more"]

const ACCENT_DOTS = ["#2563EB", "#7C3AED", "#D97706"]

function Pill({ lang, accentIndex }: { lang: string; accentIndex: number }) {
  const dot = ACCENT_DOTS[accentIndex % ACCENT_DOTS.length]
  return (
    <span
      className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
      style={{ color: "#0F172A", border: "1px solid #E4ECFF", boxShadow: "0 6px 16px rgba(15,23,42,0.06)" }}
    >
      <span className="size-1.5 rounded-full" style={{ backgroundColor: dot }} aria-hidden />
      {lang}
    </span>
  )
}

function Row({ items, duration, reverse }: { items: string[]; duration: number; reverse?: boolean }) {
  // duplicated so the CSS marquee loop can wrap seamlessly at -100%
  const looped = [...items, ...items]
  return (
    <div
      className="group relative flex overflow-hidden"
      style={{ maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)" }}
    >
      <div
        className="animate-marquee flex shrink-0 gap-3 pr-3 group-hover:[animation-play-state:paused]"
        style={{ "--duration": `${duration}s`, "--gap": "0.75rem", animationDirection: reverse ? "reverse" : "normal" } as CSSProperties}
      >
        {looped.map((lang, i) => (
          <Pill key={`${lang}-${i}`} lang={lang} accentIndex={i} />
        ))}
      </div>
    </div>
  )
}

export function LanguageMarquee() {
  return (
    <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4">
      <Row items={rowA} duration={24} />
      <Row items={rowB} duration={20} reverse />
    </div>
  )
}
