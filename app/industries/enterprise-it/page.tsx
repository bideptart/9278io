import type { Metadata } from "next"
import { Server } from "lucide-react"
import { IndustryComingSoon } from "@/components/industries/industry-coming-soon"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "AI voice agents for enterprise IT",
  description: "AI voice agents for enterprise IT teams — playbook coming soon.",
  path: "/industries/enterprise-it",
})

export default function EnterpriseItPage() {
  return (
    <IndustryComingSoon
      name="enterprise IT"
      Icon={Server}
      description="We're building a dedicated playbook for enterprise IT teams. Check back soon, or get started with a Starter agent today."
    />
  )
}
