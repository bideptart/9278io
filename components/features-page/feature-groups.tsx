import {
  Bot, AudioLines, SlidersHorizontal, BookOpen, Copy, GitBranch,
  FlaskConical, BarChart3, History, PhoneForwarded, BellRing,
  LifeBuoy, Mic, Settings, LayoutDashboard, Fingerprint,
  PhoneCall, LayoutTemplate,
} from "lucide-react"

const featureGroups = [
  {
    heading: "Build & Setup",
    cards: [
      { icon: Bot, tag: "Agents", tagColor: "bg-violet-50 text-violet-600", title: "Multi-Agent Management", description: "Create and manage as many AI agents as you need from a single account." },
      { icon: AudioLines, tag: "Voice", tagColor: "bg-blue-50 text-blue-600", title: "Voice Selection", description: "Choose from ten named voices, each with a personality description and a preview clip." },
      { icon: SlidersHorizontal, tag: "Behavior", tagColor: "bg-emerald-50 text-emerald-600", title: "Call Behavior Controls", description: "Set how your agent greets callers, handles interruptions, and hands off conversations." },
    ],
  },
  {
    heading: "Train & Configure",
    cards: [
      { icon: BookOpen, tag: "Knowledge", tagColor: "bg-orange-50 text-orange-600", title: "Knowledge Base (per agent)", description: "Give each agent its own set of company facts, FAQs, and policies to draw on." },
      { icon: Copy, tag: "Templates", tagColor: "bg-pink-50 text-pink-600", title: "Reusable Knowledge Templates", description: "Save a knowledge setup once and reuse it across multiple agents or numbers." },
      { icon: GitBranch, tag: "Routing", tagColor: "bg-indigo-50 text-indigo-600", title: "Behavior & Routing Rules", description: "Decide how calls get classified and routed by intent, keyword, or time of day." },
    ],
  },
  {
    heading: "Test & Go Live",
    cards: [
      { icon: FlaskConical, tag: "Testing", tagColor: "bg-teal-50 text-teal-600", title: "Playground / Live Testing", description: "Test your agent's responses in a live sandbox before it ever answers a real call." },
      { icon: PhoneCall, tag: "Live Call", tagColor: "bg-rose-50 text-rose-600", title: "Live Test Call (Real Number Dial-In)", description: "Dial your agent's real number and hear exactly what your callers hear, live." },
      { icon: LayoutTemplate, tag: "Templates", tagColor: "bg-cyan-50 text-cyan-600", title: "Ready-Made Setup Templates", description: "Start from Receptionist, Healthcare, Transport, Support, or Blank. Launch in minutes." },
    ],
  },
  {
    heading: "Operate & Monitor",
    cards: [
      { icon: BarChart3, tag: "Analytics", tagColor: "bg-blue-50 text-blue-600", title: "Analytics Dashboard", description: "Track call counts, minutes used, and average call duration in one place." },
      { icon: History, tag: "Bookings", tagColor: "bg-violet-50 text-violet-600", title: "Booking History", description: "See every appointment your agent has booked, in one searchable list." },
      { icon: PhoneForwarded, tag: "Transfer", tagColor: "bg-emerald-50 text-emerald-600", title: "Call Transfer Tool", description: "Hand off any call to a human number with a custom label you set." },
      { icon: BellRing, tag: "Alerts", tagColor: "bg-amber-50 text-amber-600", title: "Booking Notifications", description: "Get an email the moment your agent books a meeting or appointment." },
      { icon: LifeBuoy, tag: "Support", tagColor: "bg-pink-50 text-pink-600", title: "Support Tickets System", description: "Raise and track support requests directly from your dashboard." },
      { icon: Mic, tag: "Recordings", tagColor: "bg-orange-50 text-orange-600", title: "Call Reports (Recordings/Transcripts)", description: "Every call is recorded and transcribed, with playback and download built in." },
    ],
  },
  {
    heading: "Account & Overview",
    cards: [
      { icon: Settings, tag: "Settings", tagColor: "bg-indigo-50 text-indigo-600", title: "Account Settings", description: "Manage billing, team access, and account details in one place." },
      { icon: LayoutDashboard, tag: "Overview", tagColor: "bg-blue-50 text-blue-600", title: "Dashboard Overview", description: "See your account's activity at a glance the moment you log in." },
      { icon: Fingerprint, tag: "Identity", tagColor: "bg-teal-50 text-teal-600", title: "Agent Identity Setup", description: "Name your agent, set its avatar, and define how it introduces itself." },
    ],
  },
]

export function FeatureGroups() {
  return (
    <div className="mx-auto mt-14 max-w-5xl space-y-10">
      {featureGroups.map((group) => (
        <div key={group.heading}>
          <h3 className="text-center text-lg font-bold tracking-tight text-foreground sm:text-xl">{group.heading}</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.cards.map((c) => {
              const Icon = c.icon
              return (
                <div key={c.title} className="rounded-2xl border border-border bg-white p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/[0.08] text-primary">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <h4 className="text-sm font-semibold text-foreground">{c.title}</h4>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${c.tagColor}`}>
                      {c.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
