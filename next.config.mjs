/** @type {import('next').NextConfig} */
const nextConfig = {
  // `standalone` outputs a self-contained `.next/standalone` folder that ships
  // its own `node_modules`. Drop it on any Node 18+ host (Hostinger, VPS,
  // Docker, etc.) and run `node server.js` — no Vercel runtime required.
  output: "standalone",
  allowedDevOrigins: ["192.168.2.84", "192.168.2.18"],
  // Keep nodemailer out of the bundle so the contact-form server action
  // runs it as a normal Node require in the serverless/standalone function.
  serverExternalPackages: ["nodemailer"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Sharp is installed (devDependency); standalone output ships it.
    // Enable Next/Image optimization so logos/screenshots are served as
    // resized AVIF/WebP instead of full-resolution PNG/JPEG.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // Ship lighter client bundles by inlining Lucide / Radix icon imports.
  // Without this, importing one icon pulls in the whole barrel file.
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "motion",
      "date-fns",
      "@radix-ui/react-icons",
    ],
  },
  // Permanent redirect from the non-www apex to the canonical www host, so
  // every URL resolves to https://www.9278.io. `permanent: true` emits a 308
  // (the permanent redirect that preserves method; search engines treat it the
  // same as a 301 for canonicalisation). The host value matches the apex
  // exactly, so www.9278.io is never redirected onto itself.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "9278.io" }],
        destination: "https://www.9278.io/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
