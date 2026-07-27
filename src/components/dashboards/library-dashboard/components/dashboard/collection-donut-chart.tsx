"use client"

import { useState } from "react"
import {
  Cell,
  Pie,
  PieChart,
  Tooltip,
} from "recharts"

export type CollectionDonutDatum = {
  name: string
  value: number
  fill: string
}

type CollectionDonutChartProps = {
  data: CollectionDonutDatum[]
  total: number
  label: string
  size?: number
}

export function CollectionDonutChart({
  data,
  total,
  label,
  size = 200,
}: CollectionDonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const activeDatum = activeIndex !== null ? data[activeIndex] : null
  const displayValue = activeDatum ? activeDatum.value : total
  const displayLabel = activeDatum ? activeDatum.name : label

  const center = size / 2
  const outerRadius = size / 2 - 2
  const innerRadius = outerRadius * 0.7

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      onMouseDown={(event) => event.preventDefault()}
    >
      <PieChart
        width={size}
        height={size}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <Pie
          data={data}
          cx={center}
          cy={center}
          dataKey="value"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={2}
          startAngle={90}
          endAngle={-270}
          stroke="none"
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.fill}
              opacity={activeIndex === null || activeIndex === index ? 1 : 0.35}
              style={{ transition: "opacity 300ms ease-in-out" }}
            />
          ))}
        </Pie>
        <Tooltip content={() => null} cursor={false} />
      </PieChart>

      <div
        className="pointer-events-none absolute flex flex-col items-center justify-center text-center"
        style={{
          width: innerRadius * 2,
          height: innerRadius * 2,
          top: center - innerRadius,
          left: center - innerRadius,
        }}
      >
        <div
          key={displayLabel}
          aria-live="polite"
          className="animate-in fade-in slide-in-from-bottom-1 animation-duration-300 flex flex-col items-center"
        >
          <span className="text-foreground text-3xl leading-none font-bold">
            {displayValue.toLocaleString()}
          </span>
          <span className="text-muted-foreground mt-1 text-sm leading-none">
            {displayLabel}
          </span>
        </div>
      </div>
    </div>
  )
}
