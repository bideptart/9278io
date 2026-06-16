"use client"

import { useState } from "react"
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { submitContact, type ContactInput } from "@/app/contact/actions"

const EMPTY: ContactInput = { name: "", email: "", company: "", subject: "", message: "", website: "" }

const inputClass =
  "w-full rounded-xl border-2 border-border bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
const labelClass = "mb-1.5 block text-sm font-medium text-foreground"

export function ContactForm() {
  const [form, setForm] = useState<ContactInput>(EMPTY)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  function set<K extends keyof ContactInput>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === "loading") return
    setStatus("loading")
    setMessage("")
    try {
      const res = await submitContact(form)
      if (res.status === "success") {
        setStatus("success")
        setMessage(res.message)
        setForm(EMPTY)
      } else {
        setStatus("error")
        setMessage(res.message)
      }
    } catch {
      setStatus("error")
      setMessage("Something went wrong. Please try again, or email us at support@9278.io.")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-border bg-white p-8 text-center md:p-10">
        <span className="flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h3 className="mt-5 text-xl font-bold tracking-tight">Message sent</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{message}</p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle")
            setMessage("")
          }}
          className="mt-6 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border-2 border-border bg-white p-6 shadow-sm md:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Name <span className="text-primary">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email <span className="text-primary">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="cf-company" className={labelClass}>
            Company <span className="text-muted-foreground/60">(optional)</span>
          </label>
          <input
            id="cf-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            className={inputClass}
            placeholder="Company name"
          />
        </div>
        <div>
          <label htmlFor="cf-subject" className={labelClass}>
            Subject <span className="text-muted-foreground/60">(optional)</span>
          </label>
          <input
            id="cf-subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={(e) => set("subject", e.target.value)}
            className={inputClass}
            placeholder="What's this about?"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="cf-message" className={labelClass}>
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          className={`${inputClass} resize-y`}
          placeholder="Tell us how we can help…"
        />
      </div>

      {/* Honeypot — hidden from humans */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="cf-website">Leave this empty</label>
        <input
          id="cf-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      {status === "error" && (
        <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_4px_16px_oklch(0.52_0.22_265/0.3)] transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send className="size-4" aria-hidden />
          </>
        )}
      </button>

      <p className="mt-3 text-xs text-muted-foreground">
        We&apos;ll only use your details to reply to this enquiry.
      </p>
    </form>
  )
}
