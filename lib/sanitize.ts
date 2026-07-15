import DOMPurify from "isomorphic-dompurify"

/**
 * ───────────────────────────────────────────────────────────────────────────
 *  SANITIZATION BOUNDARY — XSS defence for `dangerouslySetInnerHTML`
 * ───────────────────────────────────────────────────────────────────────────
 *  Every HTML string that reaches a `dangerouslySetInnerHTML` in the blog
 *  renderers MUST pass through here first. It is deliberately the LAST
 *  transform before injection, so anything the renderers splice in themselves
 *  (e.g. the `loading="lazy"` hints) is covered too.
 *
 *  Why this exists even though it is currently a no-op:
 *  The only source today is the trusted, version-controlled HTML we author in
 *  public/blog-content/*.html — nothing there is user input. Verified against
 *  all 10 articles: no tag or attribute is dropped, and the pass is idempotent;
 *  the only byte-level change is HTML5 void-element serialization
 *  (`<img … />` -> `<img …>`), which parses to an identical DOM. So rendering
 *  is unchanged today. It exists so that the day this content comes from a CMS,
 *  a database, or a user submission, the boundary is already in place and
 *  enforced at the point of injection. Nobody has to remember to add it.
 *
 *  DO NOT bypass this for a new HTML source, and do not widen the allowlist
 *  without checking what the new tags/attributes let an author execute.
 *
 *  What is removed: <script>, event handlers (onerror/onclick/...),
 *  javascript:/data: URLs, <iframe>/<object>/<embed>, and anything else outside
 *  DOMPurify's HTML+SVG defaults.
 *
 *  What is preserved (everything the trusted articles rely on): inline <svg>
 *  diagrams and their presentation attributes, <figure>/<figcaption>,
 *  <details>/<summary>, tables, callout/CTA/btn `class`es, inline `style`
 *  sizing on images, and the img performance hints below.
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty) return ""

  return DOMPurify.sanitize(dirty, {
    // DOMPurify's defaults already allow HTML + SVG. These are the extras the
    // blog renderers depend on that aren't in the default attribute allowlist.
    ADD_ATTR: ["loading", "decoding", "target"],
  })
}
