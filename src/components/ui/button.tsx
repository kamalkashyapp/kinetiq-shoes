import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-xs font-mono uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-bone hover:bg-ink-soft hover:shadow-pop",
        secondary:
          "bg-paper text-ink border border-line hover:border-ink hover:bg-bone",
        acid:
          "bg-acid text-ink font-semibold hover:bg-[#c9ef30] hover:shadow-pop",
        clay:
          "bg-clay text-paper font-semibold hover:bg-[#a0462e]",
        ghost:
          "text-ink hover:bg-ink/5 border border-transparent",
        pill:
          "bg-ink text-bone rounded-pill px-6 py-2.5 hover:bg-ink-soft",
        outline:
          "bg-transparent text-ink border border-line hover:border-ink",
      },
      size: {
        sm: "h-8 px-3 text-[10px]",
        default: "h-11 px-6 py-2.5",
        lg: "h-14 px-8 text-sm",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
