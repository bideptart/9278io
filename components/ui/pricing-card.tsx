import * as React from 'react';
import { motion, type PanInfo } from "motion/react";
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

  // --- Mobile card-stack state ---
  // A static layered stack, not a scroll carousel — the active plan is
  // always centered in front with the other two permanently flanking it
  // 50% behind, on both sides. Switching the active plan is a plain click
  // or a swipe (drag gesture) on the front card — no scroll-snap or
  // IntersectionObserver math to get wrong or glitch mid-gesture.
  const popularIndex = Math.max(0, plans.findIndex((p) => p.isPopular));
  const [activeIndex, setActiveIndex] = React.useState(popularIndex);
  const otherIndices = plans.map((_, i) => i).filter((i) => i !== activeIndex);
  const leftIndex = otherIndices[0];
  const rightIndex = otherIndices[1];

  const SWIPE_THRESHOLD = 60; // px of drag before it counts as a swipe
  function handleDragEnd(_e: unknown, info: PanInfo) {
    if (info.offset.x <= -SWIPE_THRESHOLD) setActiveIndex(rightIndex);
    else if (info.offset.x >= SWIPE_THRESHOLD) setActiveIndex(leftIndex);
  }

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

  // --- 2.3. A single plan card (shared by the desktop grid and mobile stack) ---
  // `showBadge` — desktop always shows it on the popular plan; mobile only
  // shows it on whichever card is currently in front, since a demoted,
  // partially-hidden side card has nowhere clean for it to sit.
  // `previewCount` — the two mobile side cards render at a narrower width,
  // so a full feature list wraps onto more lines and makes that card taller
  // than the in-flow active card, which grows/shifts the whole stack.
  // Capping them to a fixed count keeps every side card the same height
  // regardless of which plan (e.g. Scale, with longer feature text) is
  // tucked behind. Desktop cards and the active mobile card stay unlimited.
  const SIDE_CARD_PREVIEW_COUNT = 5;
  function renderCard(plan: PriceTier, showBadge: boolean = plan.isPopular, previewCount?: number) {
    const isFeatured = plan.isPopular;
    const currentPrice = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
    const priceSuffix = billingCycle === 'monthly' ? '/mo' : '/yr';
    const visibleFeatures = previewCount ? plan.features.slice(0, previewCount) : plan.features;

    return (
      <Card
        className={cn(
          // min-w-0 stops the Buy button's non-wrapping text from forcing this
          // card wider than its assigned percentage width (a classic flexbox
          // min-width:auto issue) — without it, the longer price labels (e.g.
          // "Buy ₹8,799 now") pushed the whole mobile card past the viewport edge.
          // Same border width and shadow for every card, popular or not —
          // only the color differs — so the "Most popular" card is never a
          // different physical size from the other two.
          "relative flex h-full min-w-0 flex-col rounded-2xl border-2 bg-white shadow-sm transition-all duration-300",
          isFeatured ? "border-primary" : "border-border/60",
        )}
      >
        {showBadge && (
          <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Most popular
          </span>
        )}
        <CardHeader className="min-w-0 p-5 pb-0">
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
        <CardContent className="min-w-0 flex-grow p-5 pt-2">
          <ul className="list-none space-y-0">
            {visibleFeatures.map((feature) => (
              <li key={feature} className="flex items-start space-x-3 py-1">
                <Check className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                <span className="text-sm text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="min-w-0 p-5 pt-2">
          <Button
            onClick={() => onPlanSelect(plan.id, billingCycle)}
            className="h-auto min-h-10 w-full whitespace-normal rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
            aria-label={`Select ${plan.name} plan for ₹${currentPrice.toLocaleString("en-IN")} ${priceSuffix}`}
          >
            {plan.buttonLabel} ₹{currentPrice.toLocaleString("en-IN")} now
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // --- 2.4. Desktop grid ---
  const DesktopCards = (
    <div className="hidden gap-6 md:grid md:grid-cols-3 md:gap-5 lg:gap-6">
      {plans.map((plan) => (
        <div key={plan.id}>{renderCard(plan)}</div>
      ))}
    </div>
  );

  // --- 2.5. Mobile card stack (static layering, no scroll) ---
  const MobileStack = (
    // overflow-hidden clips any residual sizing overflow so a card can never
    // visually bleed past the viewport edge; pt-4 reserves room so the
    // "Most popular" badge (which sits slightly above its card) isn't clipped.
    <div className="relative overflow-hidden pt-4 md:hidden">
      {/* Active plan — the only card in normal flow, so it defines the stack's height.
          Swipe left/right on it to switch plans — drag={"x"} + dragConstraints
          snap it back to center on release, so this is a gesture trigger,
          not a scroll-based carousel. */}
      {/* Every plan shares one grid cell, so the cell is always as tall as the
          tallest plan and switching plans no longer resizes the stack (Scale's
          longer feature text used to make it taller than Starter). Only the
          active plan is visible; the rest are invisible height-setters —
          visibility:hidden also keeps their buttons out of the tab order. */}
      <div className="relative z-20 grid">
        {plans.map((plan, i) =>
          i === activeIndex ? null : (
            <div key={plan.id} aria-hidden className="invisible col-start-1 row-start-1 mx-auto w-[78%]">
              {renderCard(plan, plan.isPopular)}
            </div>
          ),
        )}
        <motion.div
          key={activeIndex}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          whileDrag={{ cursor: "grabbing" }}
          className="col-start-1 row-start-1 mx-auto w-[78%] cursor-grab touch-pan-y"
        >
          {renderCard(plans[activeIndex], plans[activeIndex].isPopular)}
        </motion.div>
      </div>

      {/* Left plan — permanently tucked ~50% behind the active card */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setActiveIndex(leftIndex)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setActiveIndex(leftIndex);
        }}
        aria-label={`Show ${plans[leftIndex].name} plan`}
        className="absolute left-0 top-4 z-10 w-[58%] cursor-pointer"
      >
        {renderCard(plans[leftIndex], false, SIDE_CARD_PREVIEW_COUNT)}
      </div>

      {/* Right plan — permanently tucked ~50% behind the active card */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setActiveIndex(rightIndex)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setActiveIndex(rightIndex);
        }}
        aria-label={`Show ${plans[rightIndex].name} plan`}
        className="absolute right-0 top-4 z-10 w-[58%] cursor-pointer"
      >
        {renderCard(plans[rightIndex], false, SIDE_CARD_PREVIEW_COUNT)}
      </div>

      {/* Dots — tap to switch which plan is in front */}
      <div className="relative z-30 mt-4 flex items-center justify-center gap-1.5">
        {plans.map((plan, i) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`Show ${plan.name} plan`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === activeIndex ? "w-5 bg-primary" : "w-1.5 bg-border",
            )}
          />
        ))}
      </div>
    </div>
  );

  // --- 2.6. Final Render ---
  return (
    <div className={cn("w-full pt-6 pb-12 md:pt-8 md:pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", className)} {...props}>
      {Badges}
      {CycleToggle}
      <section aria-labelledby="pricing-plans">
        {MobileStack}
        {DesktopCards}
      </section>
    </div>
  );
};

export type { BillingCycle, PriceTier, PricingComponentProps };
export { PricingComponent };
export default PricingComponent;
