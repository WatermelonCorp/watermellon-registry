import { useEffect, useState } from "react"
import type { CSSProperties, SVGProps } from "react"
import { useMotionValue, useSpring } from "framer-motion"

import { cn } from "@/lib/utils"

export interface GaugeProps extends Omit<SVGProps<SVGSVGElement>, "className"> {
  value: number
  size?: number | string
  gapPercent?: number
  strokeWidth?: number
  equal?: boolean
  showValue?: boolean
  showPercentage?: boolean
  primary?:
    | "danger"
    | "warning"
    | "success"
    | "info"
    | string
    | { [key: number]: string }
  secondary?:
    | "danger"
    | "warning"
    | "success"
    | "info"
    | string
    | { [key: number]: string }
  gradient?: boolean
  multiRing?: {
    enabled: boolean
    rings?: Array<{
      value: number
      color: string
      strokeWidth?: number
      opacity?: number
    }>
  }
  thresholds?: Array<{
    value: number
    color: string
    label?: string
  }>
  gaugeType?: "full" | "half" | "quarter"
  transition?: {
    length?: number
    step?: number
    delay?: number
  }
  className?:
    | string
    | {
        svgClassName?: string
        primaryClassName?: string
        secondaryClassName?: string
        textClassName?: string
        labelClassName?: string
      }
  label?: string
  unit?: string
  min?: number
  max?: number
  tickMarks?: boolean
  glowEffect?: boolean
}

export function Gauge({
  value,
  size = 150,
  gapPercent = 5,
  strokeWidth = 10,
  equal = false,
  showValue = true,
  showPercentage = false,
  primary,
  secondary,
  gradient = false,
  multiRing,
  thresholds,
  gaugeType = "full",
  transition = {
    length: 1000,
    step: 200,
    delay: 0,
  },
  className,
  label,
  unit = "%",
  min = 0,
  max = 100,
  tickMarks = false,
  glowEffect = false,
  ...props
}: GaugeProps) {
  const circleSize = 100
  const radius = circleSize / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const percentToDegree = 360 / 100

  const offsetFactor = equal ? 0.5 : 0
  const offsetFactorSecondary = 1 - offsetFactor

  const { formattedValue: animatedValue, rawValue: animatedRawValue } =
    useNumberCounter({
      value,
      delay: (transition?.delay ?? 0) / 1000,
      decimalPlaces: value % 1 !== 0 ? 1 : 0,
    })

  const getGaugeConfig = () => {
    switch (gaugeType) {
      case "half":
        return {
          startAngle: -90,
          endAngle: 90,
          circumferenceFactor: 0.5,
          viewBox: `0 25 ${circleSize} 50`,
        }
      case "quarter":
        return {
          startAngle: 0,
          endAngle: 90,
          circumferenceFactor: 0.25,
          viewBox: `25 25 50 50`,
        }
      default:
        return {
          startAngle: -90,
          endAngle: 270,
          circumferenceFactor: 1,
          viewBox: `0 0 ${circleSize} ${circleSize}`,
        }
    }
  }

  // Use the animated raw value for circle calculations instead of the static value
  const strokePercent = animatedRawValue

  const gaugeConfig = getGaugeConfig()
  const adjustedCircumference = circumference * gaugeConfig.circumferenceFactor
  const adjustedPercentToPx = adjustedCircumference / 100

  const primaryStrokeDasharray = () => {
    if (
      offsetFactor > 0 &&
      strokePercent > 100 - gapPercent * 2 * offsetFactor
    ) {
      const subtract = -strokePercent + 100
      return `${Math.max(strokePercent * adjustedPercentToPx - subtract * adjustedPercentToPx, 0)} ${adjustedCircumference}`
    } else {
      const subtract = gapPercent * 2 * offsetFactor
      return `${Math.max(strokePercent * adjustedPercentToPx - subtract * adjustedPercentToPx, 0)} ${adjustedCircumference}`
    }
  }

  const secondaryStrokeDasharray = () => {
    if (
      offsetFactorSecondary < 1 &&
      strokePercent < gapPercent * 2 * offsetFactorSecondary
    ) {
      const subtract = strokePercent
      return `${Math.max((100 - strokePercent) * adjustedPercentToPx - subtract * adjustedPercentToPx, 0)} ${adjustedCircumference}`
    } else {
      const subtract = gapPercent * 2 * offsetFactorSecondary
      return `${Math.max((100 - strokePercent) * adjustedPercentToPx - subtract * adjustedPercentToPx, 0)} ${adjustedCircumference}`
    }
  }

  const primaryTransform = () => {
    if (
      offsetFactor > 0 &&
      strokePercent > 100 - gapPercent * 2 * offsetFactor
    ) {
      const add = 0.5 * (-strokePercent + 100)
      return `rotate(${-90 + add * percentToDegree}deg)`
    } else {
      const add = gapPercent * offsetFactor
      return `rotate(${-90 + add * percentToDegree}deg)`
    }
  }

  const secondaryTransform = () => {
    if (
      offsetFactorSecondary < 1 &&
      strokePercent < gapPercent * 2 * offsetFactorSecondary
    ) {
      const subtract = 0.5 * strokePercent
      return `rotate(${360 - 90 - subtract * percentToDegree}deg) scaleY(-1)`
    } else {
      const subtract = gapPercent * offsetFactorSecondary
      return `rotate(${360 - 90 - subtract * percentToDegree}deg) scaleY(-1)`
    }
  }

  const getColor = (colorProp: typeof primary, isSecondary = false) => {
    const defaultColors = isSecondary
      ? {
          danger: "#fecaca",
          warning: "#fde68a",
          info: "#bfdbfe",
          success: "#bbf7d0",
        }
      : {
          danger: "#dc2626",
          warning: "#f59e0b",
          info: "#3b82f6",
          success: "#22c55e",
        }

    if (!colorProp) {
      if (isSecondary) return "rgba(85, 85, 85, 0.2)"
      return strokePercent <= 25
        ? defaultColors.danger
        : strokePercent <= 50
          ? defaultColors.warning
          : strokePercent <= 75
            ? defaultColors.info
            : defaultColors.success
    }

    if (typeof colorProp === "string") {
      return defaultColors[colorProp as keyof typeof defaultColors] || colorProp
    }

    if (typeof colorProp === "object") {
      const keys = Object.keys(colorProp).sort((a, b) => Number(a) - Number(b))
      const checkValue = isSecondary ? 100 - strokePercent : strokePercent

      for (let i = 0; i < keys.length; i++) {
        const currentKey = Number(keys[i])
        const nextKey = Number(keys[i + 1])
        if (checkValue >= currentKey && (checkValue < nextKey || !nextKey)) {
          const color = colorProp[currentKey]
          return defaultColors[color as keyof typeof defaultColors] || color
        }
      }
    }

    return isSecondary ? "#e5e7eb" : "#3b82f6"
  }

  const primaryStroke = getColor(primary)
  const secondaryStroke = getColor(secondary, true)

  const primaryOpacity = () => {
    if (
      offsetFactor > 0 &&
      strokePercent < gapPercent * 2 * offsetFactor &&
      strokePercent < gapPercent * 2 * offsetFactorSecondary
    ) {
      return 0
    } else return 1
  }

  const secondaryOpacity = () => {
    if (
      (offsetFactor === 0 && strokePercent > 100 - gapPercent * 2) ||
      (offsetFactor > 0 &&
        strokePercent > 100 - gapPercent * 2 * offsetFactor &&
        strokePercent > 100 - gapPercent * 2 * offsetFactorSecondary)
    ) {
      return 0
    } else return 1
  }

  const circleStyles: CSSProperties = {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeDashoffset: 0,
    strokeWidth: strokeWidth,
    // Remove CSS transition since we're using animated values
    transformOrigin: "50% 50%",
    shapeRendering: "geometricPrecision",
  }

  const glowStyles = glowEffect
    ? {
        filter: `
        drop-shadow(0 0 2px ${primaryStroke}80)
        drop-shadow(0 0 6px ${primaryStroke}60)
        drop-shadow(0 0 12px ${primaryStroke}40)
        drop-shadow(0 0 20px ${primaryStroke}20)
      `,
      }
    : {}

  const generateTickMarks = () => {
    if (!tickMarks) return null
    const ticks = []
    const tickCount = 8

    for (let i = 0; i <= tickCount; i++) {
      const angle =
        (i / tickCount) * (gaugeConfig.endAngle - gaugeConfig.startAngle) +
        gaugeConfig.startAngle
      const tickRadius = radius - strokeWidth / 2
      const tickLength = 6

      const x1 =
        circleSize / 2 +
        (tickRadius - tickLength) * Math.cos((angle * Math.PI) / 180)
      const y1 =
        circleSize / 2 +
        (tickRadius - tickLength) * Math.sin((angle * Math.PI) / 180)
      const x2 = circleSize / 2 + tickRadius * Math.cos((angle * Math.PI) / 180)
      const y2 = circleSize / 2 + tickRadius * Math.sin((angle * Math.PI) / 180)

      ticks.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
        />
      )
    }
    return ticks
  }

  return (
    <div className="relative inline-block">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${circleSize} ${circleSize}`}
        shapeRendering="crispEdges"
        width={size}
        height={size}
        style={{ userSelect: "none", ...glowStyles }}
        fill="none"
        className={cn(
          "",
          typeof className === "string" ? className : className?.svgClassName
        )}
        {...props}
      >
        {gradient && (
          <defs>
            <linearGradient
              id="primaryGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={primaryStroke} stopOpacity="0.3" />
              <stop offset="100%" stopColor={primaryStroke} stopOpacity="1" />
            </linearGradient>
          </defs>
        )}

        {generateTickMarks()}

        {multiRing?.enabled &&
          multiRing.rings?.map((ring, index) => (
            <circle
              key={`ring-${index}`}
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radius - (index + 1) * (strokeWidth + 2)}
              style={{
                ...circleStyles,
                strokeWidth: ring.strokeWidth || strokeWidth - 2,
                strokeDasharray: `${(ring.value / 100) * adjustedCircumference} ${adjustedCircumference}`,
                transform: primaryTransform(),
                stroke: ring.color,
                opacity: ring.opacity,
              }}
            />
          ))}

        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          style={{
            ...circleStyles,
            strokeDasharray: secondaryStrokeDasharray(),
            transform: secondaryTransform(),
            stroke: secondaryStroke,
            opacity: secondaryOpacity(),
          }}
          className={cn(
            "",
            typeof className === "object" && className?.secondaryClassName
          )}
        />

        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          style={{
            ...circleStyles,
            strokeDasharray: primaryStrokeDasharray(),
            transform: primaryTransform(),
            stroke: gradient ? "url(#primaryGradient)" : primaryStroke,
            opacity: primaryOpacity(),
          }}
          className={cn(
            "",
            typeof className === "object" && className?.primaryClassName
          )}
        />
        {thresholds?.map((threshold, index) => {
          const thresholdPercent = ((threshold.value - min) / (max - min)) * 100
          const angle =
            (thresholdPercent / 100) *
              (gaugeConfig.endAngle - gaugeConfig.startAngle) +
            gaugeConfig.startAngle
          const indicatorRadius = radius + strokeWidth / 2 + 5
          const x =
            circleSize / 2 + indicatorRadius * Math.cos((angle * Math.PI) / 180)
          const y =
            circleSize / 2 + indicatorRadius * Math.sin((angle * Math.PI) / 180)

          return (
            <circle
              key={`threshold-${index}`}
              cx={x}
              cy={y}
              r="2"
              fill={threshold.color}
            />
          )
        })}

        {showValue && (
          <g>
            <text
              x={circleSize / 2}
              y={circleSize / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              alignmentBaseline="central"
              fill="currentColor"
              fontSize={30}
              fontWeight="700"
              className={cn(
                "font-bold",
                typeof className === "object" && className?.textClassName
              )}
              style={{ userSelect: "none" }}
            >
              {animatedValue}
              {showPercentage && unit}
            </text>
          </g>
        )}
        {label && (
          <text
            x={circleSize / 2}
            y={circleSize / 2 + 20}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={8}
            fontWeight="400"
            className="fill-muted-foreground"
            style={{ userSelect: "none" }}
          >
            {label}
          </text>
        )}
      </svg>
    </div>
  )
}

// Hook version for use in SVG contexts - now returns both formatted text and raw animated value
export function useNumberCounter({
  value,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
}: {
  value: number
  direction?: "up" | "down"
  delay?: number
  decimalPlaces?: number
}) {
  const [displayValue, setDisplayValue] = useState(
    direction === "down" ? value : 0
  )
  const [rawValue, setRawValue] = useState(direction === "down" ? value : 0)
  const [isInView, setIsInView] = useState(false)

  const motionValue = useMotionValue(direction === "down" ? value : 0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })

  // Set initial display value
  useEffect(() => {
    const initialValue = direction === "down" ? value : 0
    setDisplayValue(initialValue)
    setRawValue(initialValue)
  }, [direction, value])

  // Simulate useInView for SVG context
  useEffect(() => {
    const timer = setTimeout(() => setIsInView(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Trigger animation after delay
  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value)
      }, delay * 1000)
      return () => clearTimeout(timeout)
    }
  }, [motionValue, isInView, delay, value, direction])

  // Update display value when spring value changes
  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      const formattedValue = Number(latest.toFixed(decimalPlaces))
      setDisplayValue(formattedValue)
      setRawValue(latest) // Keep the raw animated value for circle animation
    })
    return unsubscribe
  }, [springValue, decimalPlaces])

  const formattedDisplayValue = Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(displayValue)

  return {
    formattedValue: formattedDisplayValue,
    rawValue: rawValue,
  }
}
