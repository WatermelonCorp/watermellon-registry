"use client";

import { useState } from "react";
import { Cell, Label, Pie, PieChart } from "recharts";

export type CollectionDonutDatum = {
  name: string;
  value: number;
  fill: string;
};

type CollectionDonutChartProps = {
  data: CollectionDonutDatum[];
  total: number;
  label: string;
  size?: number;
};

type DonutCenterProps = {
  datum?: CollectionDonutDatum;
  fallbackValue: number;
  fallbackLabel: string;
  center: number;
  innerRadius: number;
};

function DonutCenter({
  datum,
  fallbackValue,
  fallbackLabel,
  center,
  innerRadius,
}: DonutCenterProps) {
  const value = datum?.value ?? fallbackValue;
  const currentLabel = datum?.name ?? fallbackLabel;

  return (
    <foreignObject
      x={center - innerRadius}
      y={center - innerRadius}
      width={innerRadius * 2}
      height={innerRadius * 2}
      pointerEvents="none"
    >
      <div className="flex h-full w-full translate-y-1 items-center justify-center text-center">
        <div
          key={currentLabel}
          aria-live="polite"
          className="animate-in fade-in slide-in-from-bottom-1 animation-duration-300 flex flex-col items-center"
        >
          <span className="text-foreground text-3xl leading-none font-bold">
            {value.toLocaleString()}
          </span>
          <span className="text-muted-foreground mt-1 text-sm leading-none">
            {currentLabel}
          </span>
        </div>
      </div>
    </foreignObject>
  );
}

export function CollectionDonutChart({
  data,
  total,
  label,
  size = 200,
}: CollectionDonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const center = size / 2;
  const outerRadius = size / 2 - 2;
  const innerRadius = outerRadius * 0.7;

  return (
    <div
      className="shrink-0"
      style={{ width: size, height: size }}
      onMouseDown={(event) => event.preventDefault()}
    >
      <PieChart
        width={size}
        height={size}
        accessibilityLayer={false}
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
          rootTabIndex={-1}
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={entry.fill}
              opacity={activeIndex === null || activeIndex === index ? 1 : 0.35}
              style={{ transition: "opacity 300ms ease-in-out" }}
            />
          ))}
          <Label
            position="center"
            content={() => (
              <DonutCenter
                datum={activeIndex === null ? undefined : data[activeIndex]}
                fallbackValue={total}
                fallbackLabel={label}
                center={center}
                innerRadius={innerRadius}
              />
            )}
          />
        </Pie>
      </PieChart>
    </div>
  );
}
