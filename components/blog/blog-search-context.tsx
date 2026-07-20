"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

const BlogSearchContext = createContext<{ query: string; setQuery: (q: string) => void } | null>(null)

export function BlogSearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("")
  return <BlogSearchContext.Provider value={{ query, setQuery }}>{children}</BlogSearchContext.Provider>
}

export function useBlogSearch() {
  const ctx = useContext(BlogSearchContext)
  if (!ctx) throw new Error("useBlogSearch must be used within BlogSearchProvider")
  return ctx
}
