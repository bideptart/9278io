/** @type {import('next').NextConfig} */
const nextConfig = {
  // `standalone` outputs a self-contained `.next/standalone` folder that ships
  // its own `node_modules`. Drop it on any Node 18+ host (Hostinger, VPS,
  // Docker, etc.) and run `node server.js` — no Vercel runtime required.
  output: "standalone",
  allowedDevOrigins: ["192.168.2.84", "192.168.2.18"],
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
}

export default nextConfig
