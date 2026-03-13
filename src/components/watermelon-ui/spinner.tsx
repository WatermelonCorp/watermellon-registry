import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "size-4",
      default: "size-6",
      lg: "size-8",
      xl: "size-12",
    },
    speed: {
      slow: "[animation-duration:1200ms]",
      default: "[animation-duration:900ms]",
      fast: "[animation-duration:600ms]",
    },
  },
  defaultVariants: {
    size: "default",
    speed: "default",
  },
})

export interface SpinnerProps
  extends Omit<React.ComponentProps<"svg">, "size" | "speed">,
  VariantProps<typeof spinnerVariants> {
  /**
   * Stroke width of the spinner arc
   * @default 3
   */
  strokeWidth?: number
  /**
   * CSS class for the background circle
   * @default "stroke-muted-foreground/20"
   */
  bgClassName?: string
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, speed, strokeWidth = 3, bgClassName = "stroke-muted-foreground/20", ...props }, ref) => {
    return (
      <svg
        ref={ref}
        className={cn(spinnerVariants({ size, speed }), "text-foreground", className)}
        viewBox="0 0 42 42"
        {...props}
      >
        <g fill="none" transform="translate(3 3)" strokeWidth={strokeWidth}>
          <circle className={bgClassName} cx="18" cy="18" r="18" />
          <path
            className="stroke-current"
            stroke="currentColor"
            d="M36 18c0-9.94-8.06-18-18-18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    )
  },
)

Spinner.displayName = "Spinner"

export { Spinner, spinnerVariants }