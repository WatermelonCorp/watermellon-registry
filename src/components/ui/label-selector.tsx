"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function LabelSelectorRoot({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="label-selector-root"
      className={cn(
        "flex items-center justify-between gap-4 py-3 bg-muted dark:bg-muted/60 p-3 pl-5 rounded-full",
        className,
      )}
      {...props}
    />
  )
}

interface LabelSelectorLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

function LabelSelectorLabel({ className, value, ...props }: LabelSelectorLabelProps) {
  return (
    <div data-slot="label-selector-label" className={cn("text-base font-normal leading-none", className)} {...props}>
      {value}
    </div>
  )
}

function LabelSelectorContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="label-selector-content" className={cn("flex items-center gap-2", className)} {...props} />
}

const labelSelectorItemVariants = cva(
  "group relative shrink-0 cursor-pointer outline-none transition-all flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-2 border-muted-foreground/20 bg-background hover:border-muted-foreground/40 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground data-[state=checked]:border-primary data-[state=checked]:bg-accent data-[state=checked]:text-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground data-[state=checked]:bg-accent data-[state=checked]:text-foreground",
        solid:
          "bg-muted text-muted-foreground hover:bg-muted/80 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      },
      size: {
        sm: "min-w-[2rem] h-8 px-3 text-xs",
        default: "min-w-[2.5rem] h-10 px-4 text-sm",
        lg: "min-w-[3rem] h-12 px-5 text-base",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "lg",
    },
  },
)

interface LabelSelectorItemProps
  extends React.ComponentProps<typeof RadioGroupPrimitive.Item>,
  VariantProps<typeof labelSelectorItemVariants> {
  value: string
  label?: string
}

function LabelSelectorItem({ className, value, label, variant, size, rounded, ...props }: LabelSelectorItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="label-selector-item"
      value={value}
      className={cn(labelSelectorItemVariants({ variant, size, rounded, className }))}
      {...props}
    >
      <span className="font-medium">{label || value}</span>
    </RadioGroupPrimitive.Item>
  )
}

export const LabelSelector = {
  Root: LabelSelectorRoot,
  Label: LabelSelectorLabel,
  Content: LabelSelectorContent,
  Item: LabelSelectorItem,
}

export { labelSelectorItemVariants }