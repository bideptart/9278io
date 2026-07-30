import type { Metadata } from "next"
import { Truck } from "lucide-react"
import { IndustryComingSoon } from "@/components/industries/industry-coming-soon"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "AI voice agents for logistics",
  description: "AI voice agents for logistics teams — playbook coming soon.",
  path: "/industries/logistics",
})

export default function LogisticsPage() {
  return (
    <IndustryComingSoon
      name="logistics"
      Icon={Truck}
      description="We're building a dedicated playbook for logistics teams. Check back soon, or get started with a Starter agent today."
    />
  )
}
