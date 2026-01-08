import React from "react"

import { cn } from "@/lib/utils"

interface BookProps {
  children: React.ReactNode
  color?: string
  textColor?: string
  texture?: boolean
  depth?: number
  variant?: "default" | "simple" | "hardcover" | "notebook"
  illustration?: React.ReactNode
  width?: number
  height?: number
  spineText?: string
  bookmark?: boolean
  bookmarkColor?: string
  animation?: "hover" | "float" | "pulse" | "flip" | "none"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  orientation?: "portrait" | "landscape"
  pages?: number
  author?: string
  title?: string
}

const sizePresets = {
  xs: { width: 120, height: 160 },
  sm: { width: 150, height: 200 },
  md: { width: 196, height: 240 },
  lg: { width: 240, height: 320 },
  xl: { width: 300, height: 400 },
}

export function Book({
  children,
  color = "#555555",
  textColor = "currentColor",
  depth = 5,
  variant = "default",
  illustration,
  width,
  height,
  spineText,
  bookmark = false,
  bookmarkColor = "#fff200",
  animation = "hover",
  size = "md",
  orientation = "portrait",
  pages = 100,
  author,
  title,
}: BookProps) {
  const dimensions = sizePresets[size]
  const bookWidth = width || dimensions.width
  const bookHeight = height || dimensions.height

  const getVariantStyles = () => {
    switch (variant) {
      case "hardcover":
        return {
          borderRadius: "4px",
          border: "2px solid rgba(0,0,0,0.1)",
        }
      case "notebook":
        return {
          borderRadius: "6px",
          background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
        }
      default:
        return {
          borderRadius: "4px",
        }
    }
  }

  const getAnimationClass = () => {
    switch (animation) {
      case "hover":
        return "group-hover:[transform:rotateY(-25deg)_scale(1.05)_translateX(-12px)]"
      case "none":
        return ""
      default:
        return "group-hover:[transform:rotateY(-20deg)_scale(1.066)_translateX(-8px)]"
    }
  }

  const bindBg =
    variant === "notebook"
      ? "linear-gradient(90deg, transparent 0%, rgba(255,0,0,0.3) 2%, transparent 4%, transparent 96%, rgba(255,0,0,0.5) 98%, transparent 100%)"
      : "linear-gradient(90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,0) 12%,hsla(0,0%,100%,.25) 29.25%,hsla(0,0%,100%,0) 50.5%,hsla(0,0%,100%,0) 75.25%,hsla(0,0%,100%,.25) 91%,hsla(0,0%,100%,0)),linear-gradient(90deg,rgba(0,0,0,.03),rgba(0,0,0,.1) 12%,transparent 30%,rgba(0,0,0,.02) 50%,rgba(0,0,0,.2) 73.5%,rgba(0,0,0,.5) 75.25%,rgba(0,0,0,.15) 85.25%,transparent)"

  const pageGradient =
    variant === "notebook"
      ? "repeating-linear-gradient(90deg, #f8f9fa 0px, #e9ecef 1px, #f8f9fa 2px, #dee2e6 3px)"
      : "repeating-linear-gradient(90deg,#fff,#a3a3a3 1px,#fff 4px,#9a9a9a 0)"

  const variantStyles = getVariantStyles()

  return (
    <div
      className={cn(
        "group inline-block w-fit cursor-pointer transition-all duration-300 [perspective:1200px]"
      )}
      style={
        {
          "--book-color": color,
          "--text-color": textColor,
          "--book-depth": `${depth}cqw`,
          "--book-width": `${bookWidth}px`,
          "--book-height": `${bookHeight}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "relative w-fit min-w-[calc(var(--book-width))] rotate-0 transition-all duration-700 ease-out contain-inline-size [transform-style:preserve-3d]",
          orientation === "landscape" ? "aspect-[4/3]" : "aspect-[3/4]",
          getAnimationClass()
        )}
      >
        {/* Main Book Cover */}
        <div
          className="absolute size-full overflow-hidden border"
          style={{
            backgroundColor: color,
            ...variantStyles,
            height: bookHeight,
          }}
        >
          {/* Bookmark Ribbon */}
          {bookmark && (
            <div
              className="absolute top-0 right-4 z-10 h-16 w-4 shadow-sm"
              style={{
                backgroundColor: bookmarkColor,
                clipPath: "polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)",
              }}
            />
          )}

          {/* Spine Text */}
          {spineText && (
            <div
              className="absolute top-1/2 left-0 z-10 -translate-y-1/2 -rotate-90 px-2 text-xs font-semibold whitespace-nowrap"
              style={{ color: textColor, transformOrigin: "center" }}
            >
              {spineText}
            </div>
          )}

          {/* Cover Content */}
          {variant !== "simple" && (
            <div
              className="relative flex h-full flex-col overflow-hidden"
              style={{ backgroundColor: color }}
            >
              {/* Bind Effect */}
              <div
                className="absolute inset-y-0 left-0 w-[10%] opacity-100 mix-blend-overlay"
                style={{ backgroundImage: bindBg }}
              />

              {/* Title and Author */}
              {(title || author) && (
                <div className="p-4 text-center">
                  {title && (
                    <h3
                      className={cn("mb-2 text-lg font-bold")}
                      style={{ color: textColor }}
                    >
                      {title}
                    </h3>
                  )}
                  {author && (
                    <p
                      className="absolute bottom-2 left-7 text-xs opacity-70"
                      style={{ color: textColor }}
                    >
                      {author}
                    </p>
                  )}
                </div>
              )}

              {/* Illustration */}
              {illustration && (
                <div className="flex flex-1 items-center justify-center p-4">
                  {illustration}
                </div>
              )}

              {/* Content */}
              <div className="flex-1 p-4">
                <div className="h-full w-full">{children}</div>
              </div>

              {/* Page Count */}
              {pages && (
                <div
                  className="absolute right-2 bottom-2 text-xs opacity-70"
                  style={{ color: textColor }}
                >
                  {pages}p
                </div>
              )}
            </div>
          )}

          {/* Simple Variant Content */}
          {variant === "simple" && (
            <div className="flex h-full items-center justify-center p-4">
              {children}
            </div>
          )}
        </div>

        {/* Book Pages (Side) */}
        <div
          aria-hidden={true}
          className="absolute top-[3px] h-[calc(88%)] w-[calc(var(--book-depth)-2px)]"
          style={{
            backgroundImage: pageGradient,
            transform: `translateX(calc(var(--book-width) - var(--book-depth) / 2 - 6px)) rotateY(90deg) translateX(calc(var(--book-depth) / 2))`,
          }}
        />

        {/* Book Back Cover */}
        <div
          aria-hidden={true}
          className="absolute left-0 h-[calc(90%)] w-full"
          style={{
            backgroundColor: color,
            ...variantStyles,
            transform: "translateZ(calc(-1 * var(--book-depth)))",
            filter: "brightness(0.8)",
          }}
        />
      </div>
    </div>
  )
}
