"use client"

import { useState } from "react"
import { ArrowRight, Search } from "lucide-react"
import { useBlogSearch } from "./blog-search-context"

export function BlogSearchBar() {
  const { setQuery } = useBlogSearch()
  const [value, setValue] = useState("")

  function runSearch(q: string) {
    setQuery(q)
    document.getElementById("articles")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="mt-8">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          runSearch(value)
        }}
        className="mx-auto flex max-w-xl items-center gap-2 rounded-full border-2 border-border bg-white p-1.5 pl-5 transition-colors focus-within:border-primary"
      >
        <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search articles, topics..."
          aria-label="Search articles"
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
    </div>
  )
}
