import type { Metadata } from "next"
import { Users } from "lucide-react"
import { IndustryComingSoon } from "@/components/industries/industry-coming-soon"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "AI voice agents for remote teams",
  description: "AI voice agents for remote teams — playbook coming soon.",
  path: "/industries/remote-teams",
})

export default function RemoteTeamsPage() {
  return (
    <IndustryComingSoon
      name="remote teams"
      Icon={Users}
      description="We're building a dedicated playbook for remote and distributed teams. Check back soon, or get started with a Starter agent today."
    />
  )
}
