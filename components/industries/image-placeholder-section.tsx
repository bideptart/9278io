import Image from "next/image"
import { ImageIcon } from "lucide-react"
import { ScrollStepItem } from "@/components/animation/stagger"

/**
 * Image slot between the stats bar and the CTA banner. Pass `src`/`alt` once
 * the asset is ready — omit them to keep showing the dashed placeholder.
 * `heading`/`paragraph` render as copy beside the image (only used once `src` is set).
 */
export function ImagePlaceholderSection({
  src,
  alt,
  heading,
  paragraph,
}: {
  src?: string
  alt?: string
  heading?: string
  paragraph?: string
}) {
  return (
    <section className="w-full px-6 pb-10 md:px-8 md:pb-14">
      <ScrollStepItem>
        {src ? (
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 rounded-[1.75rem] border border-blue-400 bg-white p-6 shadow-sm sm:p-8 md:flex-row">
            <div className="relative h-80 w-full shrink-0 overflow-hidden rounded-[1.5rem] bg-blue-50/40 sm:h-96 md:h-[28rem] md:w-1/2">
              <Image src={src} alt={alt ?? ""} fill className="object-contain p-3" />
            </div>
            {(heading || paragraph) && (
              <div className="md:w-1/2">
                {heading && (
                  <h2 className="text-balance font-sans text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.75rem]">
                    {heading}
                  </h2>
                )}
                {paragraph && (
                  <p className="mt-4 text-pretty leading-relaxed text-slate-600">{paragraph}</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="mx-auto flex h-64 max-w-7xl flex-col items-center justify-center gap-3 rounded-[1.75rem] border border-dashed border-blue-300 bg-blue-50/30 text-blue-400 sm:h-80 md:h-96">
            <ImageIcon className="size-10" aria-hidden />
            <p className="text-[13px] font-semibold uppercase tracking-wide">Add image here</p>
          </div>
        )}
      </ScrollStepItem>
    </section>
  )
}
