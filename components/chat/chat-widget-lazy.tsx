"use client"

import dynamic from "next/dynamic"

/**
 * Client-side wrapper that lazy-loads the heavy ChatWidget bundle.
 *
 * The chat widget pulls in `motion`, lucide icons, and the chat UI —
 * roughly 80KB+ of JS that doesn't need to ship with the initial paint
 * of every page. By dynamic-importing it with `ssr: false`, we:
 *   • skip rendering it in the SSR HTML (smaller payload),
 *   • defer its module download until after page hydration,
 *   • keep the rest of the page interactive even if it's still loading.
 *
 * This file exists only because `dynamic(..., { ssr: false })` can't be
 * called from a Server Component (which is what `app/layout.tsx` is).
 */
const ChatWidget = dynamic(
  () => import("./chat-widget").then((m) => m.ChatWidget),
  { ssr: false },
)

export function ChatWidgetLazy() {
  return <ChatWidget />
}
