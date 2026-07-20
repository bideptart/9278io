"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type FaqSearchContextValue = {
  query: string
  setQuery: (query: string) => void
}

const FaqSearchContext = createContext<FaqSearchContextValue | null>(null)

export function FaqSearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("")
  return <FaqSearchContext.Provider value={{ query, setQuery }}>{children}</FaqSearchContext.Provider>
}

export function useFaqSearch() {
  const ctx = useContext(FaqSearchContext)
  if (!ctx) throw new Error("useFaqSearch must be used within FaqSearchProvider")
  return ctx
}
