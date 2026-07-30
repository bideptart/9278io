import type { Metadata } from "next"
import { ShoppingCart } from "lucide-react"
import { IndustryComingSoon } from "@/components/industries/industry-coming-soon"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "AI voice agents for retail & e-commerce",
  description: "AI voice agents for retail & e-commerce teams — playbook coming soon.",
  path: "/industries/retail-ecom",
})

export default function RetailEcomPage() {
  return (
    <IndustryComingSoon
      name="retail & e-commerce"
      Icon={ShoppingCart}
      description="We're building a dedicated playbook for retail and e-commerce teams. Check back soon, or get started with a Starter agent today."
    />
  )
}
