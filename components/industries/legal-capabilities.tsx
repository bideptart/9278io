import Image from "next/image"
import { Languages, CalendarCheck, FileSearch, Check } from "lucide-react"

/**
 * Legal-only capability tiles. Every tile carries its own continuous loop —
 * languages cross-fading, a checklist ticking itself off, a slot being
 * confirmed, a transcript redacting PII — so the section keeps moving
 * instead of being four static cards.
 *
 * Deliberately CSS-only (no "use client", no state): the loops are staggered
 * `animation-delay` offsets against a shared duration, which keeps this a
 * server component, ships no JS for the section, and means the motion runs
 * even if hydration hasn't happened yet.
 *
 * All keyframes are `lgc-` prefixed and scoped under `.lgc-caps` in the
 * <style> block below, so nothing reaches the global sheet or another page.
 * Every loop has a prefers-reduced-motion override that settles the tile on
 * its completed state rather than freezing it mid-transition.
 */

const SLOTS = ["Tue 11:00", "Wed 15:30", "Thu 09:45"]

export function LegalCapabilities({ sampleLines, jobs }: { sampleLines: string[]; jobs: string[] }) {
  const quotes = sampleLines.slice(0, 3)

  return (
    <div className="lgc-caps grid gap-4 md:grid-cols-6">
      {/* ── Languages — the caller's line cross-fading between languages ── */}
      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-3 md:p-7">
        <div className="flex items-center justify-between">
          <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
            <Languages className="size-5" aria-hidden />
          </span>
          <div className="flex gap-1.5" aria-hidden>
            {["हिन्दी", "EN", "ਪੰਜਾਬੀ"].map((lang, i) => (
              <span
                key={lang}
                style={{ animationDelay: `${i * 4}s` }}
                className="lgc-lang rounded-full border border-primary/20 px-2.5 py-1 text-[10.5px] font-semibold text-primary"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        <h3 className="mt-4 text-balance text-lg font-semibold tracking-tight">
          Intake in the caller&apos;s own language
        </h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          Real lines the agent uses on legal calls — switching mid-call when a family member takes over.
        </p>

        {/* quotes share one slot and cross-fade, so the tile never resizes */}
        <div className="relative mt-5 min-h-[76px] flex-1">
          {quotes.map((line, i) => (
            <p
              key={line}
              style={{ animationDelay: `${i * 4}s` }}
              className="lgc-quote absolute inset-x-0 top-0 rounded-xl rounded-bl-sm bg-primary/[0.07] px-4 py-3 text-[13px] leading-relaxed text-foreground/85 ring-1 ring-primary/10"
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* ── Consultations — a slot being offered, then confirmed ── */}
      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-3 md:p-7">
        <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <CalendarCheck className="size-5" aria-hidden />
        </span>
        <h3 className="mt-4 text-balance text-lg font-semibold tracking-tight">Consults that stick</h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          Real availability offered on the call and confirmed on the spot, with document reminders sent before the
          appointment.
        </p>

        <div aria-hidden className="mt-5 flex flex-1 flex-col justify-end gap-3">
          <div className="flex flex-wrap gap-2">
            {SLOTS.map((slot, i) => (
              <span
                key={slot}
                style={{ animationDelay: `${i * 1.1}s` }}
                className="lgc-slot rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] font-medium text-foreground/75"
              >
                {slot}
              </span>
            ))}
          </div>
          <div className="lgc-confirm flex items-center gap-2 rounded-xl bg-primary/[0.07] px-3.5 py-2.5 ring-1 ring-primary/15">
            <span className="grid size-5 place-items-center rounded-full bg-primary text-white">
              <Check className="size-3" />
            </span>
            <p className="text-[12.5px] font-medium text-foreground/80">
              Wed 15:30 confirmed · reminder scheduled
            </p>
          </div>
        </div>
      </div>

      {/* ── Day one — the playbook checking itself off ── */}
      <div className="flex flex-col rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/[0.07] to-white p-6 shadow-sm md:col-span-2">
        <span className="grid size-10 place-items-center rounded-xl bg-primary text-white shadow-sm shadow-primary/25">
          <FileSearch className="size-5" aria-hidden />
        </span>
        <h3 className="mt-4 text-balance text-lg font-semibold tracking-tight">Live from day one</h3>

        <ul className="mt-5 flex-1 space-y-3">
          {jobs.map((job, i) => (
            <li key={job} className="flex items-start gap-2.5">
              <span
                style={{ animationDelay: `${i * 1.1}s` }}
                className="lgc-tick mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-primary text-white"
                aria-hidden
              >
                <Check className="size-2.5" />
              </span>
              <span className="text-pretty text-[13px] leading-relaxed text-foreground/80">{job}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── On the record — rendered as an image (see public/industries) ── */}
      <div className="md:col-span-4">
        <Image
          src="/industries/legal-on-the-record.png"
          alt="On the record, and redacted — every call recorded and transcribed to your dashboard, with PII redaction options and DPDP Act 2023 handling. Sample transcript: caller confirmed the sale deed is in his name; Aadhaar ending redacted; consult booked with consent to record captured."
          width={1526}
          height={652}
          className="h-auto w-full"
        />
      </div>

      <style>{`
        /* language chips: the active one lights up in turn (12s / 3 = 4s each) */
        @keyframes lgcLang {
          0%, 1%     { background-color: transparent; color: oklch(0.546 0.215 262.88); }
          4%, 30%    { background-color: oklch(0.546 0.215 262.88); color: #fff; }
          34%, 100%  { background-color: transparent; color: oklch(0.546 0.215 262.88); }
        }
        .lgc-caps .lgc-lang { animation: lgcLang 12s linear infinite both; }

        /* the quotes share one slot and cross-fade */
        @keyframes lgcQuote {
          0%, 1%    { opacity: 0; transform: translateY(6px); }
          5%, 28%   { opacity: 1; transform: translateY(0); }
          33%, 100% { opacity: 0; transform: translateY(-5px); }
        }
        .lgc-caps .lgc-quote { animation: lgcQuote 12s cubic-bezier(0.22, 1, 0.36, 1) infinite both; }

        /* slots offered one by one, then the chosen one settles */
        @keyframes lgcSlot {
          0%, 6%    { opacity: 0; transform: translateY(6px); }
          14%, 88%  { opacity: 1; transform: translateY(0); }
          96%, 100% { opacity: 0; transform: translateY(-4px); }
        }
        .lgc-caps .lgc-slot { animation: lgcSlot 6.5s cubic-bezier(0.22, 1, 0.36, 1) infinite both; }

        @keyframes lgcConfirm {
          0%, 55%   { opacity: 0; transform: translateY(8px); }
          65%, 90%  { opacity: 1; transform: translateY(0); }
          98%, 100% { opacity: 0; transform: translateY(-4px); }
        }
        .lgc-caps .lgc-confirm { animation: lgcConfirm 6.5s cubic-bezier(0.22, 1, 0.36, 1) infinite both; }

        /* checklist ticking itself off, then resetting */
        @keyframes lgcTick {
          0%, 4%    { opacity: 0; transform: scale(0.5); }
          9%        { opacity: 1; transform: scale(1.2); }
          14%, 86%  { opacity: 1; transform: scale(1); }
          94%, 100% { opacity: 0; transform: scale(0.9); }
        }
        .lgc-caps .lgc-tick { animation: lgcTick 8s cubic-bezier(0.22, 1, 0.36, 1) infinite both; }

        @media (prefers-reduced-motion: reduce) {
          .lgc-caps .lgc-lang,
          .lgc-caps .lgc-slot,
          .lgc-caps .lgc-confirm,
          .lgc-caps .lgc-tick {
            animation: none;
            opacity: 1;
            transform: none;
            clip-path: none;
          }
          /* with motion off, show only the first quote so they don't stack */
          .lgc-caps .lgc-quote { animation: none; opacity: 0; }
          .lgc-caps .lgc-quote:first-of-type { opacity: 1; position: relative; }
        }
      `}</style>
    </div>
  )
}
