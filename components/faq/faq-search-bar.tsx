"use client"

import { ArrowRight, Search } from "lucide-react"
import { useFaqSearch } from "./faq-search-context"

export function FaqSearchBar() {
  const { query, setQuery } = useFaqSearch()

  function runSearch() {
    document.getElementById("faq-results")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        runSearch()
      }}
      className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full border-2 border-border bg-white p-1.5 pl-5 transition-colors focus-within:border-primary"
    >
      <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search questions..."
        aria-label="Search FAQ"
        className="w-full bg-transparent py-2 text-sm outline-none"
      />
      <button
        type="submit"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Search
        <ArrowRight className="size-4" aria-hidden />
      </button>
    </form>
  )
}
