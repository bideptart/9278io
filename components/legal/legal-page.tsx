import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"

export type LegalPageProps = {
  title: string
  /** e.g. "20 June 2026" */
  lastUpdated: string
  /** e.g. "Operated by Swadesh Mobile Private Limited · India" */
  operator?: string
  /** Route path, e.g. "/acceptable-use" */
  path: string
  /** The policy body: intro/preamble, then numbered "1. …" sections, optionally a trailing "CONTACT" block. */
  body: string
}

type Section = { id: string; title: string; content: string }

function parseBody(raw: string): { preamble: string; sections: Section[]; contact: string } {
  const text = raw.replace(/\r\n/g, "\n").trim()

  // Split off a trailing "CONTACT" block if present.
  const contactSplit = text.split(/\n\s*CONTACT\s*\n/i)
  const main = contactSplit[0]
  const contact = contactSplit.length > 1 ? contactSplit.slice(1).join("\n").trim() : ""

  const matches = Array.from(main.matchAll(/^(\d+)\.\s+(.+)$/gm))
  const firstIndex = matches.length ? (matches[0].index ?? 0) : main.length
  const preamble = main.slice(0, firstIndex).trim()

  const sections: Section[] = matches.map((m, i) => {
    const num = m[1]
    const heading = m[2].trim()
    const start = (m.index ?? 0) + m[0].length
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? main.length) : main.length
    return { id: `section-${num}`, title: `${num}. ${heading}`, content: main.slice(start, end).trim() }
  })

  return { preamble, sections, contact }
}

/** Render a block of text, turning "• " lines into a list and the rest into paragraphs. */
function ContentBlocks({ text, className }: { text: string; className?: string }) {
  const blocks = text.split(/\n{2,}/).filter((b) => b.trim())
  return (
    <div className={className ?? "space-y-3 text-sm leading-relaxed text-muted-foreground"}>
      {blocks.map((block, bi) => {
        const lines = block.split("\n")
        const bulletStart = lines.findIndex((l) => /^\s*•/.test(l))
        if (bulletStart === -1) {
          return (
            <p key={bi} className="whitespace-pre-line">
              {block}
            </p>
          )
        }
        const intro = lines.slice(0, bulletStart).join(" ").trim()
        const items = lines.filter((l) => /^\s*•/.test(l)).map((l) => l.replace(/^\s*•\s*/, "").trim())
        return (
          <div key={bi} className="space-y-2">
            {intro ? <p className="whitespace-pre-line">{intro}</p> : null}
            <ul className="space-y-1.5 pl-1">
              {items.map((it, ii) => (
                <li key={ii} className="flex gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/50" aria-hidden />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export function LegalPage({ title, lastUpdated, operator, path, body }: LegalPageProps) {
  const { preamble, sections, contact } = parseBody(body)

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Legal", path: "/legal" },
          { name: title, path },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[300px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.12),transparent_70%)]"
        />
        <div className="w-full px-6 py-14 text-center md:px-12 md:py-16 lg:px-20">
          <ScrollReveal>
            <div>
              <Link
                href="/legal"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" aria-hidden />
                All policies
              </Link>
            </div>
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
                Legal &amp; Compliance
              </span>
            </div>
            <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{title}</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {operator ? `${operator} · ` : ""}Last updated: {lastUpdated}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="w-full px-6 py-12 md:px-12 md:py-16 lg:px-20">
        {preamble ? (
          <ScrollReveal className="mb-10">
            <ContentBlocks
              text={preamble}
              className="space-y-3 text-base leading-relaxed text-foreground/80"
            />
          </ScrollReveal>
        ) : null}

        {/* Table of contents */}
        {sections.length > 1 ? (
          <ScrollReveal className="mb-12 rounded-2xl border-2 border-border bg-white p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Contents</p>
            <nav className="grid gap-1.5 sm:grid-cols-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </ScrollReveal>
        ) : null}

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-28">
              <ScrollReveal>
                <h2 className="text-xl font-bold tracking-tight">{s.title}</h2>
                <div className="mt-4">
                  <ContentBlocks text={s.content} />
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* Contact block */}
        {contact ? (
          <ScrollReveal className="mt-12 rounded-2xl border-2 border-primary/20 bg-primary/[0.04] p-6 md:p-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Contact</p>
            <ContentBlocks text={contact} className="space-y-2 text-sm leading-relaxed text-foreground/80" />
          </ScrollReveal>
        ) : null}
      </div>

      <SiteFooter />
    </main>
  )
}
