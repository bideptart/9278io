import { Marquee } from "@/components/ui/marquee"

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

export function LanguageMarquee() {
  return (
    <div className="mt-8 flex w-full flex-col gap-4">
      <Marquee pauseOnHover className="[--duration:12s] [--gap:0.75rem]" style={{ maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)" }}>
        {rowA.map((lang, i) => (
          <Pill key={lang} lang={lang} accentIndex={i} />
        ))}
      </Marquee>
      <Marquee
        pauseOnHover
        reverse
        className="[--duration:9s] [--gap:0.75rem]"
        style={{ maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)" }}
      >
        {rowB.map((lang, i) => (
          <Pill key={lang} lang={lang} accentIndex={i} />
        ))}
      </Marquee>
    </div>
  )
}
