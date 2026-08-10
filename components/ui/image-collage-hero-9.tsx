// Right-column image collage from the "hero-section-9" pattern, extracted
// as a standalone piece so it can drop into an existing hero's visual slot
// without duplicating that hero's own title/subtitle/CTA markup.
//
// Deliberately built from the same plain-CSS animation classes already
// used across every other industry hero on this site (reveal fade-in,
// hero-float-up/down, a hover lift with a deeper shadow) rather than a
// new custom effect — so it matches the site's own established,
// professional visual language exactly instead of introducing a new one.

const DEFAULT_IMAGES = [
  { src: "/images/finance-voice-agent-1.png", alt: "AI voice agent answering a finance call — account balance, transactions, and investment overview" },
  { src: "/images/finance-voice-agent-2.png", alt: "AI voice agent assisting a finance team member over a headset call" },
  { src: "/images/finance-voice-agent-3.png", alt: "AI voice agent reading back a financial summary during a call" },
]

export default function ImageCollageHero({ images = DEFAULT_IMAGES }: { images?: { src: string; alt: string }[] }) {
  return (
    <div className="relative h-[320px] w-full sm:h-[420px]">
      <div
        style={{
          animation: "reveal 0.7s cubic-bezier(0.22,1,0.36,1) both, heroFloatUp 2.8s ease-in-out infinite",
          animationDelay: "0s, 0s",
        }}
        className="absolute left-1/2 top-0 w-[64%] max-w-80 -translate-x-1/2 transition-transform duration-300 hover:-translate-y-1 sm:w-80"
      >
        <div
          className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-2 shadow-[0_16px_40px_-22px_rgba(15,23,42,0.35)] transition-shadow duration-300 hover:shadow-[0_28px_55px_-18px_rgba(15,23,42,0.45)]"
          style={{ aspectRatio: "758 / 548" }}
        >
          <img src={images[0].src} alt={images[0].alt} className="h-full w-full rounded-xl object-contain" />
        </div>
      </div>

      <div
        style={{
          animation: "reveal 0.7s cubic-bezier(0.22,1,0.36,1) both, heroFloatDown 2.8s ease-in-out infinite",
          animationDelay: "1s, 1.4s",
        }}
        className="absolute right-0 top-[40%] w-[56%] max-w-72 transition-transform duration-300 hover:-translate-y-1 sm:top-1/3 sm:w-72"
      >
        <div
          className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-2 shadow-[0_16px_40px_-22px_rgba(15,23,42,0.35)] transition-shadow duration-300 hover:shadow-[0_28px_55px_-18px_rgba(15,23,42,0.45)]"
          style={{ aspectRatio: "772 / 548" }}
        >
          <img src={images[1].src} alt={images[1].alt} className="h-full w-full rounded-xl object-contain" />
        </div>
      </div>

      <div
        style={{
          animation: "reveal 0.7s cubic-bezier(0.22,1,0.36,1) both, heroFloatUp 2.8s ease-in-out infinite",
          animationDelay: "2s, 0s",
        }}
        className="absolute -left-2 bottom-0 h-20 transition-transform duration-300 hover:-translate-y-1 sm:bottom-6 sm:h-32"
      >
        <div
          className="h-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-1 shadow-[0_16px_40px_-22px_rgba(15,23,42,0.35)] transition-shadow duration-300 hover:shadow-[0_28px_55px_-18px_rgba(15,23,42,0.45)]"
          style={{ aspectRatio: "1536 / 470", width: "auto" }}
        >
          <img src={images[2].src} alt={images[2].alt} className="h-full w-full rounded-xl object-cover" />
        </div>
      </div>
    </div>
  )
}
