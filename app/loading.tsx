/**
 * Root-level loading UI shown by Next.js automatically during route
 * transitions and Server Component data fetches. Without this file the
 * router waits silently for the new route to be ready, which feels
 * unresponsive — especially in dev where Turbopack compiles on demand.
 *
 * The bar is purely CSS (no JS) so it appears instantly, even before
 * any route chunks have loaded.
 */
export default function Loading() {
  return (
    <div
      role="progressbar"
      aria-label="Loading"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5 overflow-hidden bg-transparent"
    >
      <div className="h-full w-full origin-left animate-[loading-bar_1.2s_cubic-bezier(0.4,0,0.2,1)_infinite] bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
    </div>
  )
}
