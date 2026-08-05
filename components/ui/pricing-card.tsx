import * as React from 'react';
import { cn } from "@/lib/utils"; // Assuming a utility function for class merging
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedPrice } from "@/components/pricing/animated-price";

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

  // --- Mobile slider state ---
  // A real horizontal slider (native scroll-snap), one full-width card per
  // view with a small peek of the next card at each edge — not the old
  // static stack with two permanently shrunken 58%-width side cards.
  // Native scroll-snap drives the swipe gesture itself (smooth, no custom
  // drag/velocity math to get wrong), and `activeIndex` is just derived from
  // scroll position for the dots/arrows/badge to read.
  const popularIndex = Math.max(0, plans.findIndex((p) => p.isPopular));
  const [activeIndex, setActiveIndex] = React.useState(popularIndex);
  const trackRef = React.useRef<HTMLDivElement>(null);

  const scrollToIndex = React.useCallback((index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  // Center the initially-popular plan on mount without an animated scroll.
  React.useEffect(() => {
    const track = trackRef.current;
    const slide = track?.children[popularIndex] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollLeft = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep `activeIndex` in sync with whichever slide is nearest the center
  // as the user scrolls/swipes — snap-mandatory guarantees it settles
  // exactly on one, so "nearest center" is always unambiguous at rest.
  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDistance = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const elCenter = el.offsetLeft + el.clientWidth / 2;
      const distance = Math.abs(elCenter - center);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }

  const leftIndex = (activeIndex - 1 + plans.length) % plans.length;
  const rightIndex = (activeIndex + 1) % plans.length;

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

  // --- 2.3. A single plan card (shared by the desktop grid and mobile slider) ---
  // `showBadge` defaults to the plan's own `isPopular` flag — every card is
  // now full-size on both desktop and mobile, so there's no demoted/peek
  // card that needs the badge suppressed.
  function renderCard(plan: PriceTier, showBadge: boolean = plan.isPopular) {
    const isFeatured = plan.isPopular;
    const currentPrice = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
    const priceSuffix = billingCycle === 'monthly' ? '/mo' : '/yr';

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
          "glow-border relative flex h-full min-w-0 flex-col gap-3 rounded-2xl border-2 bg-white py-4 shadow-sm transition-all duration-300",
          isFeatured ? "border-primary" : "border-border/60 hover:border-primary",
        )}
      >
        {showBadge && (
          <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Most popular
          </span>
        )}
        <CardHeader className="min-w-0 p-4 pb-0">
          <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
          <CardDescription className="text-sm mt-1">{plan.description}</CardDescription>
          <div className="mt-2">
            <p className="text-3xl font-extrabold text-foreground">
              <AnimatedPrice value={currentPrice} />
              <span className="text-base font-normal text-muted-foreground ml-1">{priceSuffix}</span>
            </p>
            {plan.priceNote && <p className="mt-1 text-xs text-muted-foreground">{plan.priceNote}</p>}
          </div>
        </CardHeader>
        <CardContent className="min-w-0 flex-grow p-4 pt-2">
          <ul className="list-none space-y-0">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start space-x-3 py-0.5">
                <Check className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                <span className="text-sm text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="min-w-0 p-4 pt-1">
          <Button
            onClick={() => onPlanSelect(plan.id, billingCycle)}
            className={cn(
              "h-auto min-h-10 w-full rounded-full whitespace-normal",
              isFeatured
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-2 border-border/60 bg-white text-black hover:border-primary hover:bg-primary hover:text-primary-foreground",
            )}
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

  // --- 2.5. Mobile slider (native scroll-snap, one full card per view) ---
  const MobileStack = (
    // pt-4 reserves room so the "Most popular" badge (which sits slightly
    // above its card) isn't clipped by the track's own overflow.
    <div className="pt-4 md:hidden">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-[5%] pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {plans.map((plan, i) => (
          <div key={plan.id} className="w-[90%] flex-none snap-center">
            {renderCard(plan, plan.isPopular)}
          </div>
        ))}
      </div>

      {/* Arrows + dots — tap either to switch which plan is centered */}
      <div className="relative z-10 mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => scrollToIndex(leftIndex)}
          aria-label={`Show ${plans[leftIndex].name} plan`}
          className="flex size-8 flex-none items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>

        <div className="flex items-center gap-1.5">
          {plans.map((plan, i) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Show ${plan.name} plan`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex ? "w-5 bg-primary" : "w-1.5 bg-border",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToIndex(rightIndex)}
          aria-label={`Show ${plans[rightIndex].name} plan`}
          className="flex size-8 flex-none items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
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
