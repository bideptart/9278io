"use client"

import { useBlogSearch } from "./blog-search-context"
import { BlogSearchBar } from "./blog-search-bar"

const CATEGORIES = ["Compliance", "Pricing", "Use Cases", "Industries"]

export function BlogCategoryFilter({ totalCount, topicCount }: { totalCount: number; topicCount: number }) {
  const { query, setQuery } = useBlogSearch()

  return (
    <div className="mb-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Categories</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Browse by categories</h2>

          <p className="mt-2 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Guides, playbooks, and voice AI deep-dives across {topicCount} topics.
          </p>

          <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
            {totalCount} articles
          </span>
        </div>

        <div className="flex w-full justify-center md:flex-1 md:justify-center">
          <BlogSearchBar />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setQuery("")}
          className={
            query === ""
              ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              : "rounded-full border border-border/60 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          }
        >
          All
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setQuery(category)}
            className={
              query === category
                ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                : "rounded-full border border-border/60 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            }
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
