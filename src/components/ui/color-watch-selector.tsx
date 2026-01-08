"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

function ColorSwatchSelectorRoot({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="color-swatch-selector-root"
      className={cn(
        "flex items-center justify-between gap-4 py-3 bg-muted dark:bg-muted/60 p-3 pl-5 rounded-full",
        className,
      )}
      {...props}
    />
  )
}

interface ColorSwatchSelectorLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

function ColorSwatchSelectorLabel({ className, value, ...props }: ColorSwatchSelectorLabelProps) {
  return (
    <div
      data-slot="color-swatch-selector-label"
      className={cn("text-base font-normal leading-none", className)}
      {...props}
    >
      {value}
    </div>
  )
}

function ColorSwatchSelectorContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="color-swatch-selector-content" className={cn("flex items-center gap-2", className)} {...props} />
  )
}

interface ColorSwatchSelectorItemProps extends React.ComponentProps<typeof RadioGroupPrimitive.Item> {
  value: string
}

function ColorSwatchSelectorItem({ className, value, ...props }: ColorSwatchSelectorItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="color-swatch-selector-item"
      value={value}
      className={cn(
        "group relative h-8 w-8 shrink-0 cursor-pointer rounded-full outline-none transition-all",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      style={{ backgroundColor: value, boxShadow: `1px 3px 4px 0px rgba(0, 0, 0, 0.25) inset` }}
      {...props}
    >
      {/* Selected indicator - white ring in the center */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          "transition-all duration-200",
          "opacity-0 scale-0",
          "group-data-[state=checked]:opacity-100 group-data-[state=checked]:scale-100",
        )}
      >
        <div className="h-4 w-4 rounded-full border-[3px] bg-background" />
      </div>
    </RadioGroupPrimitive.Item>
  )
}

export const ColorSwatchSelector = {
  Root: ColorSwatchSelectorRoot,
  Label: ColorSwatchSelectorLabel,
  Content: ColorSwatchSelectorContent,
  Item: ColorSwatchSelectorItem,
}