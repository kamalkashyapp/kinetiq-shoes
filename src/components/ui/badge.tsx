import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center text-[10px] font-mono uppercase tracking-[0.14em] transition-colors",
  {
    variants: {
      variant: {
        default: "bg-ink text-bone px-2 py-0.5",
        outline: "border border-line text-ink px-2 py-0.5 bg-paper/50",
        acid: "bg-acid text-ink px-2 py-0.5 font-semibold",
        clay: "bg-clay text-paper px-2 py-0.5 font-medium",
        smoke: "bg-smoke/15 text-smoke px-2 py-0.5",
        chip: "border border-line text-ink rounded-pill px-3 py-1 bg-paper hover:border-ink cursor-pointer",
        chipActive: "border-ink bg-ink text-bone rounded-pill px-3 py-1 cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
