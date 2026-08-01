"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  Sparkles,
  RotateCcw,
  Phone,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Role = "user" | "assistant"

type Message = {
  id: string
  role: Role
  content: string
  /** When true, this message is still being streamed in. */
  streaming?: boolean
}

const STORAGE_KEY = "9278:chat:messages:v1"
const MAX_USER_CHARS = 2000

const SUGGESTIONS = [
  "What does the Growth plan include?",
  "Which Indian languages do you support?",
  "How fast can I be live?",
  "Are you TRAI compliant?",
]

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm the 9278.io assistant. Ask me about pricing, languages, integrations, TRAI compliance, or how to get started.",
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [unread, setUnread] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  // Tracks which message ids have already played their entrance animation,
  // so reopening the panel doesn't replay every bubble in the history at once.
  const seenIds = useRef<Set<string>>(new Set())

  // Restore conversation from sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as Message[]
      if (Array.isArray(parsed) && parsed.length) setMessages(parsed)
    } catch {
      // ignore
    }
  }, [])

  // Toggle a root attribute so global CSS can shift the page content on
  // desktop without each route having to know about the chat state.
  //
  // Only *setting* it happens here, on open. The page-shift this attribute
  // triggers (body padding-right) forces a layout reflow, so removing it
  // must wait until the panel's exit animation actually finishes (see
  // onExitComplete below) — otherwise the page snaps back to full width
  // instantly while the panel is still visibly sliding out, which is what
  // caused the lag on close.
  useEffect(() => {
    if (typeof document === "undefined") return
    if (open) document.documentElement.setAttribute("data-chat-open", "true")
  }, [open])

  // Belt-and-suspenders: if the component unmounts entirely while open,
  // don't leave the page permanently shifted.
  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") document.documentElement.removeAttribute("data-chat-open")
    }
  }, [])

  // Mark rendered messages as seen so their entrance animation doesn't replay
  // the next time the panel opens.
  useEffect(() => {
    messages.forEach((m) => seenIds.current.add(m.id))
  }, [messages])

  // Persist conversation
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      // ignore quota errors
    }
  }, [messages])

  // Auto-scroll on new content — smooth, so streaming replies feel alive.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages])

  // Snap to bottom instantly when the panel opens — running a smooth-scroll
  // animation at the same time as the panel's slide-in spring is what caused
  // the visible lag/jank on open.
  useEffect(() => {
    if (!open) return
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [open])

  // Focus input when panel opens.
  // On mobile we skip auto-focus: focusing the textarea pops the on-screen
  // keyboard, which resizes the viewport and makes the open feel like it
  // jumps/stutters. The user taps the field when they're ready to type.
  useEffect(() => {
    if (open) {
      setUnread(false)
      const isMobile =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches
      if (isMobile) return
      // small delay so the slide-in animation finishes
      const t = setTimeout(() => textareaRef.current?.focus(), 250)
      return () => clearTimeout(t)
    }
  }, [open])

  // Esc to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "0px"
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [input])

  async function send(rawText?: string) {
    const text = (rawText ?? input).trim()
    if (!text || sending) return

    const userMsg: Message = { id: uid(), role: "user", content: text }
    const assistantId = uid()
    const assistantMsg: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      streaming: true,
    }

    const next = [...messages, userMsg, assistantMsg]
    setMessages(next)
    setInput("")
    setSending(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const payload = next
        .filter((m) => m.id !== "welcome" && m.id !== assistantId)
        .map((m) => ({ role: m.role, content: m.content }))

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: payload }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        let errMsg = "Sorry, something went wrong. Please try again."
        try {
          const j = (await res.json()) as { error?: string }
          if (j.error) errMsg = j.error
        } catch {
          /* ignore */
        }
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: errMsg, streaming: false } : m,
          ),
        )
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ""
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: acc } : m,
          ),
        )
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        // user-initiated cancel
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    "Connection error. Check your internet and try again.",
                  streaming: false,
                }
              : m,
          ),
        )
      }
    } finally {
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, streaming: false } : m)),
      )
      setSending(false)
      abortRef.current = null
      // If the panel is closed when a message lands, mark unread
      if (!open) setUnread(true)
    }
  }

  function reset() {
    abortRef.current?.abort()
    setMessages([WELCOME])
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      void send()
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open chat"
            className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6"
          >
            <MessageSquare className="relative h-6 w-6" />
            {unread && (
              <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-destructive ring-2 ring-background" />
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Backdrop — mobile overlay only. Cheap to mount, so it stays in
          AnimatePresence for a clean fade. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            aria-hidden
            className="fixed inset-0 z-40 bg-background/60 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Side panel — ALWAYS mounted (parked off-screen at x:100% when closed)
          so opening is a pure transform toggle with ZERO mount/render cost.
          Previously the whole panel mounted on click, blocking the main thread
          for a frame or two right as the slide started → the "hitch" on open. */}
      <motion.aside
        role="dialog"
        aria-label="9278.io assistant"
        aria-modal="true"
        aria-hidden={!open}
        {...(open ? {} : { inert: true })}
        initial={false}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        // The page-shift attribute is only safe to remove once this slide-out
        // transition actually finishes — see the effect above for why.
        onAnimationComplete={() => {
          if (!open && typeof document !== "undefined") document.documentElement.removeAttribute("data-chat-open")
        }}
        className={cn(
          "transform-gpu fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-border/60 bg-card shadow-2xl [will-change:transform] md:inset-y-0 md:right-0 md:w-[380px] md:rounded-none md:border-y-0 md:border-l md:shadow-[0_0_60px_oklch(0.78_0.16_195/0.10)] xl:w-[420px]",
          !open && "pointer-events-none",
        )}
      >
              {/* Glow halo — desktop only. On mobile these big blur-3xl layers
                  are expensive to rasterize on first mount and make the slide-in
                  hitch, so we skip them below md. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:rounded-2xl md:block"
              >
                <div className="absolute -top-24 left-1/2 h-40 w-60 -translate-x-1/2 rounded-full bg-primary/15 blur-2xl" />
                <div className="absolute -bottom-24 right-0 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
              </div>

              {/* Header — height matches the main site header (h-16) so the
                   bottom-border lines align across the page when docked. */}
              <header className="relative flex h-16 shrink-0 items-center justify-between border-b border-border/60 px-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <Sparkles className="h-4 w-4" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-foreground">
                      9278.io Assistant
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      <span className="inline-block h-1.5 w-1.5 translate-y-[-1px] animate-pulse rounded-full bg-emerald-500" />{" "}
                      Online · usually replies instantly
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={reset}
                    aria-label="New chat"
                    title="New chat"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close chat"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </header>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="chat-scroll relative flex-1 overflow-y-auto px-4 py-4"
              >
                <div className="flex flex-col gap-3">
                  {messages.map((m) => (
                    <MessageBubble key={m.id} message={m} skipAnimation={seenIds.current.has(m.id)} />
                  ))}
                </div>

                {/* Suggestions — show only on the welcome state */}
                {messages.length === 1 && messages[0].id === "welcome" && (
                  <div className="mt-5">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                      Try asking
                    </p>
                    <div className="flex flex-col gap-2">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => void send(s)}
                          className="group flex items-center justify-between rounded-xl border border-border bg-background/40 px-3 py-2.5 text-left text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/[0.06]"
                        >
                          <span>{s}</span>
                          <Send className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Composer */}
              <div className="relative border-t border-border/60 bg-background/40 px-3 pb-3 pt-2.5">
                <div className="flex items-end gap-2 rounded-2xl border border-border bg-card/70 p-2 transition-colors focus-within:border-primary/50">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about pricing, languages, TRAI…"
                    rows={1}
                    maxLength={MAX_USER_CHARS}
                    disabled={sending}
                    className="chat-scroll flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => void send()}
                    disabled={sending || !input.trim()}
                    aria-label="Send message"
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-primary-foreground transition-all",
                      sending || !input.trim()
                        ? "cursor-not-allowed bg-muted text-muted-foreground"
                        : "bg-primary shadow-[0_0_18px_oklch(0.78_0.16_195/0.4)] hover:bg-primary/90 hover:shadow-[0_0_28px_oklch(0.78_0.16_195/0.55)]",
                    )}
                  >
                    {sending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-muted-foreground/70">
                  <span>Press Enter to send · Shift+Enter for newline</span>
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Phone className="h-3 w-3" />
                    Talk to sales
                  </Link>
                </div>
              </div>
      </motion.aside>
    </>
  )
}

function MessageBubble({ message, skipAnimation }: { message: Message; skipAnimation?: boolean }) {
  const isUser = message.role === "user"
  return (
    <motion.div
      initial={skipAnimation ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div className="mr-2 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm",
          isUser
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md border border-border/60 bg-background/70 text-foreground",
        )}
      >
        {message.content ? (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : (
          <TypingDots />
        )}
        {message.streaming && message.content && (
          <span className="ml-0.5 inline-block h-3.5 w-[2px] -translate-y-[1px] animate-pulse bg-current align-middle" />
        )}
      </div>
    </motion.div>
  )
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{
            duration: 0.9,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.15,
          }}
        />
      ))}
    </span>
  )
}
