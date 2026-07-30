import type { Metadata } from "next"
import { Landmark } from "lucide-react"
import { IndustryComingSoon } from "@/components/industries/industry-coming-soon"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "AI voice agents for finance",
  description: "AI voice agents for finance teams — playbook coming soon.",
  path: "/industries/finance",
})

export default function FinancePage() {
  return (
    <IndustryComingSoon
      name="finance"
      Icon={Landmark}
      description="We're building a dedicated playbook for finance teams. Check back soon, or get started with a Starter agent today."
    />
  )
}
