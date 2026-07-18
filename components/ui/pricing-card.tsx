import * as React from 'react';
import { cn } from "@/lib/utils"; // Assuming a utility function for class merging
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

// --- 1. Typescript Interfaces (API) ---

type BillingCycle = 'monthly' | 'yearly';

interface PriceTier {
  id: string;
  name: string;
  /** Short one-line tagline shown under the plan name. */
  description: string;
  /** Muted line shown under the price, e.g. "250 min included · ₹12/min eff. · 2 agents". */
  priceNote?: string;
  priceMonthly: number;
  priceYearly: number;
  isPopular: boolean;
  /** Action verb for the buy button, e.g. "Buy" — the price is appended automatically. */
  buttonLabel: string;
  /** Plain list of included features/highlights, rendered with a checkmark. */
  features: string[];
}

interface PricingComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The list of pricing tiers to display. Must contain exactly 3 tiers. */
  plans: [PriceTier, PriceTier, PriceTier];
  /** The currently selected billing cycle. */
  billingCycle: BillingCycle;
  /** Callback function when the user changes the billing cycle. */
  onCycleChange: (cycle: BillingCycle) => void;
  /** Callback function when a user selects a plan. */
  onPlanSelect: (planId: string, cycle: BillingCycle) => void;
  /** Optional row of trust-badge pills shown above the billing toggle. */
  badges?: string[];
}

// --- 2. Main Component: PricingComponent ---

const PricingComponent: React.FC<PricingComponentProps> = ({
  plans,
  billingCycle,
  onCycleChange,
  onPlanSelect,
  badges,
  className,
  ...props
}) => {
  // Ensure exactly 3 plans are passed for the intended layout
  if (plans.length !== 3) {
    console.error("PricingComponent requires exactly 3 pricing tiers.");
    return null;
  }

  const yearlyDiscountPercent = 20;

  // --- 2.1. Trust badges ---
  const Badges = badges && badges.length > 0 && (
    <div className="mb-6 flex flex-wrap justify-center gap-2">
      {badges.map((badge) => (
        <span
          key={badge}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1 text-xs font-medium text-primary"
        >
          <Check className="h-3 w-3" aria-hidden="true" />
          {badge}
        </span>
      ))}
    </div>
  );

  // --- 2.2. Billing Toggle ---
  const CycleToggle = (
    <div className="mb-10 flex justify-center">
      <ToggleGroup
        type="single"
        value={billingCycle}
        onValueChange={(value) => {
          if (value && (value === 'monthly' || value === 'yearly')) {
            onCycleChange(value);
          }
        }}
        aria-label="Select billing cycle"
        className="gap-1 rounded-full border border-border/60 bg-white p-1"
      >
        <ToggleGroupItem
          value="monthly"
          aria-label="Monthly Billing"
          className="flex-none min-w-fit rounded-full first:rounded-full last:rounded-full px-[18px] py-2 text-sm font-medium text-muted-foreground transition-colors data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          Monthly
        </ToggleGroupItem>
        <ToggleGroupItem
          value="yearly"
          aria-label="Yearly Billing"
          className="flex-none min-w-fit inline-flex items-center gap-2 rounded-full first:rounded-full last:rounded-full px-[18px] py-2 text-sm font-medium text-muted-foreground transition-colors data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          Yearly
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-bold",
              billingCycle === 'yearly' ? "bg-black/15 text-primary-foreground" : "bg-primary/15 text-primary",
            )}
          >
            Save {yearlyDiscountPercent}%
          </span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );

  // --- 2.3. Pricing Cards ---
  const PricingCards = (
    <div className="grid gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
      {plans.map((plan) => {
        const isFeatured = plan.isPopular;
        const currentPrice = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
        const priceSuffix = billingCycle === 'monthly' ? '/mo' : '/yr';

        return (
          <Card
            key={plan.id}
            className={cn(
              "relative flex flex-col rounded-2xl border transition-all duration-300",
              isFeatured ? "border-2 border-primary shadow-md" : "border-border/60",
            )}
          >
            {isFeatured && (
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Most popular
              </span>
            )}
            <CardHeader className="p-5 pb-0">
              <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
              <CardDescription className="text-sm mt-1">{plan.description}</CardDescription>
              <div className="mt-2">
                <p className="text-3xl font-extrabold text-foreground">
                  ₹{currentPrice.toLocaleString("en-IN")}
                  <span className="text-base font-normal text-muted-foreground ml-1">{priceSuffix}</span>
                </p>
                {plan.priceNote && <p className="mt-1 text-xs text-muted-foreground">{plan.priceNote}</p>}
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-5 pt-2">
              <ul className="list-none space-y-0">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start space-x-3 py-1">
                    <Check className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-5 pt-2">
              <Button
                onClick={() => onPlanSelect(plan.id, billingCycle)}
                className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
                aria-label={`Select ${plan.name} plan for ₹${currentPrice.toLocaleString("en-IN")} ${priceSuffix}`}
              >
                {plan.buttonLabel} ₹{currentPrice.toLocaleString("en-IN")} now
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );

  // --- 2.4. Final Render ---
  return (
    <div className={cn("w-full py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", className)} {...props}>
      {Badges}
      {CycleToggle}
      <section aria-labelledby="pricing-plans">{PricingCards}</section>
    </div>
  );
};

export type { BillingCycle, PriceTier, PricingComponentProps };
export { PricingComponent };
export default PricingComponent;
