import Link from "next/link"
import Image from "next/image"

const nav = {
  Platform: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "Dashboard", href: "https://voice.9278.io/signin" },
  ],
  Industries: [
    { label: "Real Estate", href: "/industries/real-estate" },
    { label: "Legal Services", href: "/industries/legal" },
    { label: "E-Commerce", href: "/industries/ecommerce" },
    { label: "Restaurants", href: "/industries/restaurants" },
    { label: "Explore Industries →", href: "/industries" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund & Cancellation", href: "/refund-policy" },
    { label: "Grievance Redressal", href: "/grievance-redressal" },
    { label: "All policies →", href: "/legal" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="relative bg-slate-900">
      <div aria-hidden className="h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="w-full px-6 py-8 md:px-8 md:py-16">
        {/* Top row */}
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-3">
            <Link href="/" aria-label="9278.io home">
              <Image src="/whitetheme.png" alt="9278.io" width={97} height={42} style={{ height: 42, width: "auto" }} />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50 md:mt-4">
              Native-audio voice agents for Indian businesses. Sub-second latency, self-hosted dashboard,
              Indian carrier connectivity — without the enterprise vendor markup.
            </p>
            <a
              href="https://voice.9278.io/signin"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-white/[0.06] px-3.5 py-2 text-xs font-medium text-white/80 shadow-[0_0_24px_-2px_oklch(0.546_0.215_262.88/0.45)] transition-all hover:border-primary/50 hover:bg-white/[0.1] hover:text-white hover:shadow-[0_0_32px_0_oklch(0.546_0.215_262.88/0.65)] sm:px-5 sm:py-2.5 sm:text-sm md:mt-6"
            >
              Customer dashboard
              <span className="text-primary" aria-hidden>↗</span>
            </a>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-4 gap-4 md:col-span-9 md:gap-8">
            {Object.entries(nav).map(([section, links]) => (
              <div key={section}>
                <h3 className="mb-2 text-[8px] font-semibold uppercase tracking-widest text-white/70 md:mb-4 md:text-xs">{section}</h3>
                <ul className="mt-2 space-y-0 md:mt-3 md:space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-block text-[10px] leading-tight text-white/40 transition-colors hover:text-white md:text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-start gap-2 border-t border-white/10 pt-4 md:mt-14 md:flex-row md:items-center md:justify-between md:gap-5 md:pt-8">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} 9278.io · All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
