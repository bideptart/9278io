const ITEMS = [
  "Jio",
  "Airtel",
  "BSNL",
  "Vi",
  "Google Gemini",
  "OpenAI",
  "Razorpay",
  "Stripe",
  "DPDP Act 2023",
  "TRAI · DLT",
]

export function TrustStrip() {
  // Duplicated track so the -50% marquee loops seamlessly.
  const track = [...ITEMS, ...ITEMS]
  return (
    <section className="border-y border-border/60 bg-white">
      <div className="w-full px-6 py-10 md:px-8 md:py-12">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
          Built on India&apos;s carrier network &amp; best-in-class AI
        </p>
        <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max items-center gap-12 animate-marquee md:gap-16">
            {track.map((name, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-xl font-bold tracking-tight text-foreground/25 transition-colors hover:text-foreground/60 md:text-2xl"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
