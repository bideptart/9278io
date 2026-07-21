"use client"

import { useState, useEffect, useRef, useCallback } from "react"

import { INDUSTRIES } from "@/lib/industries"

/** GSAP is pulled in from a CDN at runtime, so it is not in the npm deps. */
declare global {
  interface Window {
    gsap?: any
    MotionPathPlugin?: any
  }
}

/* Card face is 380x380 from lg up; below that it fills the column but never
   exceeds 380px. Sized with classes, not a percentage width — a percentage
   resolves against the indefinite `auto` grid track and collapses the card. */

interface ImageData {
  title: string
  url: string
  /** Shown in the panel beside the card for the active slide. */
  jobs: string[]
}

/* One slide per industry: the supplied artwork plus the side content the
   cards carried before. */
const images: ImageData[] = INDUSTRIES.map((ind) => ({
  title: ind.name,
  url: `/industries/${ind.slug}.jpg`,
  jobs: ind.jobs.slice(0, 3),
}))

// Main component for the Image Gallery
export function ImageGallery() {
  const [opened, setOpened] = useState(0)
  const [inPlace, setInPlace] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [gsapReady, setGsapReady] = useState(false)
  const autoplayTimer = useRef<number | null>(null)

  useEffect(() => {
    // This effect loads the GSAP library and its plugin from a CDN.
    const loadScripts = () => {
      if (window.gsap && window.MotionPathPlugin) {
        window.gsap.registerPlugin(window.MotionPathPlugin)
        setGsapReady(true)
        return
      }

      const gsapScript = document.createElement("script")
      gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
      gsapScript.onload = () => {
        const motionPathScript = document.createElement("script")
        motionPathScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js"
        motionPathScript.onload = () => {
          if (window.gsap && window.MotionPathPlugin) {
            window.gsap.registerPlugin(window.MotionPathPlugin)
            setGsapReady(true)
          }
        }
        document.body.appendChild(motionPathScript)
      }
      document.body.appendChild(gsapScript)
    }

    loadScripts()
  }, [])

  const onClick = (index: number) => {
    if (!disabled) setOpened(index)
  }

  const onInPlace = (index: number) => setInPlace(index)

  const next = useCallback(() => {
    setOpened((currentOpened) => {
      let nextIndex = currentOpened + 1
      if (nextIndex >= images.length) nextIndex = 0
      return nextIndex
    })
  }, [])

  const prev = useCallback(() => {
    setOpened((currentOpened) => {
      let prevIndex = currentOpened - 1
      if (prevIndex < 0) prevIndex = images.length - 1
      return prevIndex
    })
  }, [])

  // Disable clicks during animation transitions
  useEffect(() => setDisabled(true), [opened])
  useEffect(() => setDisabled(false), [inPlace])

  // Autoplay and timer reset logic
  useEffect(() => {
    if (!gsapReady) return

    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current)
    }

    autoplayTimer.current = window.setInterval(next, 4500)

    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current)
      }
    }
  }, [opened, gsapReady, next])

  const active = images[opened]

  return (
    <div className="flex w-full items-center justify-center bg-white font-sans">
      {/* minmax(0,…) tracks + min-w-0 items: without them the card's fixed
          380px width sizes the auto track and the whole grid overflows small
          screens instead of shrinking. */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16">
        {/* ── the fixed-size card on the left, arrows below it ──────── */}
        <div className="mx-auto flex w-full min-w-0 max-w-full flex-col items-center gap-4 lg:mx-0 lg:w-auto lg:justify-self-start">
          <div
            // bg is required: while GSAP clips a slide to a circle the rest of
            // the face is transparent, which otherwise shows the page behind.
            className="relative w-full max-w-[380px] overflow-hidden rounded-[20px] border border-black bg-[#e8f1fd] shadow-[0_2.8px_2.2px_rgba(0,0,0,0.02),0_6.7px_5.3px_rgba(0,0,0,0.028),0_12.5px_10px_rgba(0,0,0,0.035),0_22.3px_17.9px_rgba(0,0,0,0.042),0_41.8px_33.4px_rgba(0,0,0,0.05),0_100px_80px_rgba(0,0,0,0.07)] lg:w-[380px]"
            style={{ aspectRatio: "1 / 1" }}
          >
            {gsapReady &&
              images.map((image, i) => (
                <div
                  key={image.url}
                  className="absolute left-0 top-0 h-full w-full"
                  style={{ zIndex: inPlace === i ? i : images.length + 1 }}
                >
                  <GalleryImage
                    total={images.length}
                    id={i}
                    url={image.url}
                    title={image.title}
                    open={opened === i}
                    inPlace={inPlace === i}
                    onInPlace={onInPlace}
                  />
                </div>
              ))}
            <div className="absolute left-0 top-0 z-[100] h-full w-full pointer-events-none">
              <Tabs images={images} onSelect={onClick} />
            </div>
          </div>

          {/* Arrows sit in a row under the card. */}
          <div className="flex items-center justify-center gap-4">
          <button
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-slate-200 bg-white/95 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.12)] outline-none transition-all duration-300 ease-out hover:scale-110 hover:bg-white hover:border-blue-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] active:scale-95 focus-visible:ring-4 focus-visible:ring-blue-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            onClick={prev}
            disabled={disabled}
            aria-label="Previous Image"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-800 transition-transform duration-300 group-hover:-translate-x-0.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-slate-200 bg-white/95 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.12)] outline-none transition-all duration-300 ease-out hover:scale-110 hover:bg-white hover:border-blue-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.18)] active:scale-95 focus-visible:ring-4 focus-visible:ring-blue-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            onClick={next}
            disabled={disabled}
            aria-label="Next Image"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-800 transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          </div>
        </div>

        {/* ── right panel — active slide's headline + what the agent does ── */}
        <div key={`r-${active.url}`} className="min-w-0 lg:self-start lg:pt-2">
          {/* Tracks the open card, matching the wording on the artwork. */}
          <h3 className="ind-item-in text-balance break-words font-serif text-2xl font-bold leading-tight tracking-tight text-blue-600 sm:text-3xl lg:text-4xl">
            AI voice agents for {active.title.toLowerCase()}
          </h3>
          <h4 className="mb-4 mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 lg:mt-20">
            What the agent does
          </h4>
          <ul className="space-y-2.5">
            {active.jobs.map((text, i) => (
              <li
                key={text}
                className="ind-item-in flex items-start gap-3"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="min-w-0 break-words text-sm leading-snug text-foreground">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

interface GalleryImageProps {
  url: string
  title: string
  open: boolean
  inPlace: boolean
  id: number
  onInPlace: (id: number) => void
  total: number
}

function GalleryImage({ url, title, open, inPlace, id, onInPlace, total }: GalleryImageProps) {
  const [firstLoad, setLoaded] = useState(true)
  const clip = useRef<SVGCircleElement>(null)

  // --- Animation Constants ---
  const gap = 10
  const circleRadius = 7
  const defaults = { transformOrigin: "center center" }
  const duration = 0.4
  const width = 400
  const height = 400
  const scale = 700

  const bigSize = circleRadius * scale
  const overlap = 0

  // --- Position Calculation Functions ---
  const getPosSmall = () => ({
    cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
    cy: height - 30,
    r: circleRadius,
  })
  const getPosSmallAbove = () => ({
    cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
    cy: height / 2,
    r: circleRadius * 2,
  })
  const getPosCenter = () => ({ cx: width / 2, cy: height / 2, r: circleRadius * 7 })
  const getPosEnd = () => ({ cx: width / 2 - bigSize + overlap, cy: height / 2, r: bigSize })
  const getPosStart = () => ({ cx: width / 2 + bigSize - overlap, cy: height / 2, r: bigSize })

  // --- Animation Logic ---
  useEffect(() => {
    const gsap = window.gsap
    if (!gsap) return // Guard against GSAP not being loaded yet

    setLoaded(false)
    if (clip.current) {
      const flipDuration = firstLoad ? 0 : duration
      const upDuration = firstLoad ? 0 : 0.2
      const bounceDuration = firstLoad ? 0.01 : 1
      const delay = firstLoad ? 0 : flipDuration + upDuration

      if (open) {
        gsap
          .timeline()
          .set(clip.current, { ...defaults, ...getPosSmall() })
          .to(clip.current, {
            ...defaults,
            ...getPosCenter(),
            duration: upDuration,
            ease: "power3.inOut",
          })
          .to(clip.current, {
            ...defaults,
            ...getPosEnd(),
            duration: flipDuration,
            ease: "power4.in",
            onComplete: () => onInPlace(id),
          })
      } else {
        gsap
          .timeline({ overwrite: true })
          .set(clip.current, { ...defaults, ...getPosStart() })
          .to(clip.current, {
            ...defaults,
            ...getPosCenter(),
            delay: delay,
            duration: flipDuration,
            ease: "power4.out",
          })
          .to(clip.current, {
            ...defaults,
            motionPath: {
              path: [getPosSmallAbove(), getPosSmall()],
              curviness: 1,
            },
            duration: bounceDuration,
            ease: "bounce.out",
          })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <clipPath id={`${id}_circleClip`}>
          <circle className="clip" cx="0" cy="0" r={circleRadius} ref={clip}></circle>
        </clipPath>
        <clipPath id={`${id}_squareClip`}>
          <rect className="clip" width={width} height={height}></rect>
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}${inPlace ? "_squareClip" : "_circleClip"})`}>
        {/* "slice" makes the artwork cover the square card instead of being
            letterboxed inside it; anchoring left (xMin) keeps the headline and
            bullet list intact and crops only the illustration side. */}
        <image
          width={width}
          height={height}
          href={url}
          preserveAspectRatio="xMinYMid slice"
          className="pointer-events-none"
        ></image>
      </g>
    </svg>
  )
}

interface TabsProps {
  images: ImageData[]
  onSelect: (index: number) => void
}

function Tabs({ images, onSelect }: TabsProps) {
  const gap = 10
  const circleRadius = 7
  const width = 400
  const height = 400

  const getPosX = (i: number) =>
    width / 2 - (images.length * (circleRadius * 2 + gap) - gap) / 2 + i * (circleRadius * 2 + gap)
  const getPosY = () => height - 30

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      {images.map((image, i) => (
        <g key={image.url} className="pointer-events-auto">
          <defs>
            <clipPath id={`tab_${i}_clip`}>
              <circle cx={getPosX(i)} cy={getPosY()} r={circleRadius} />
            </clipPath>
          </defs>
          <image
            x={getPosX(i) - circleRadius}
            y={getPosY() - circleRadius}
            width={circleRadius * 2}
            height={circleRadius * 2}
            href={image.url}
            clipPath={`url(#tab_${i}_clip)`}
            className="pointer-events-none"
            preserveAspectRatio="xMidYMid slice"
          />
          <circle
            onClick={() => onSelect(i)}
            className="cursor-pointer fill-white/0 stroke-white/70 hover:stroke-white/100 transition-all"
            strokeWidth="2"
            cx={getPosX(i)}
            cy={getPosY()}
            r={circleRadius + 2}
          />
        </g>
      ))}
    </svg>
  )
}
