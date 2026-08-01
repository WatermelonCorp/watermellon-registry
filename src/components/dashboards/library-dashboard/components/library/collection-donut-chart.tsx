'use client';

import { useState } from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

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
  activeIndex?: number | null;
  onActiveIndexChange?: (index: number | null) => void;
};

export function CollectionDonutChart({
  data,
  total,
  label,
  size = 180,
  activeIndex: activeIndexProp,
  onActiveIndexChange,
}: CollectionDonutChartProps) {
  const [uncontrolledActiveIndex, setUncontrolledActiveIndex] = useState<
    number | null
  >(null);
  const isControlled = activeIndexProp !== undefined;
  const activeIndex = isControlled ? activeIndexProp : uncontrolledActiveIndex;
  const setActiveIndex = (index: number | null) => {
    if (!isControlled) setUncontrolledActiveIndex(index);
    onActiveIndexChange?.(index);
  };

  const activeDatum = activeIndex !== null ? data[activeIndex] : null;
  const displayValue = activeDatum ? activeDatum.value : total;
  const displayLabel = activeDatum ? activeDatum.name : label;

  const center = size / 2;
  // Thin deep outer rim + thicker lighter body (proportions from data values)
  const deepOuter = center - 1;
  const deepInner = deepOuter - 8;
  const lightOuter = deepInner;
  const lightInner = deepOuter - 31;
  const paddingAngle = 2.5;
  const animationDuration = 800;

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
        {/* Thick lighter inner body */}
        <Pie
          data={data}
          cx={center}
          cy={center}
          dataKey="value"
          innerRadius={lightInner}
          outerRadius={lightOuter}
          paddingAngle={paddingAngle}
          startAngle={90}
          endAngle={-270}
          stroke="none"
          isAnimationActive
          animationBegin={0}
          animationDuration={animationDuration}
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {data.map((entry, index) => (
            <Cell
              key={`light-${index}`}
              fill={entry.fill}
              fillOpacity={0.45}
              opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
              style={{ transition: 'opacity 200ms ease-in-out' }}
            />
          ))}
        </Pie>

        {/* Thin deep outer strip — same data/angles as inner */}
        <Pie
          data={data}
          cx={center}
          cy={center}
          dataKey="value"
          innerRadius={deepInner}
          outerRadius={deepOuter}
          paddingAngle={paddingAngle}
          startAngle={90}
          endAngle={-270}
          stroke="none"
          isAnimationActive
          animationBegin={0}
          animationDuration={animationDuration}
          pointerEvents="none"
        >
          {data.map((entry, index) => (
            <Cell
              key={`deep-${index}`}
              fill={entry.fill}
              opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
              style={{ transition: 'opacity 200ms ease-in-out' }}
            />
          ))}
        </Pie>
        <Tooltip content={() => null} cursor={false} />
      </PieChart>

      <div
        className="pointer-events-none absolute flex flex-col items-center justify-center text-center"
        style={{
          width: lightInner * 2,
          height: lightInner * 2,
          top: center - lightInner,
          left: center - lightInner,
        }}
      >
        <div
          key={displayLabel}
          aria-live="polite"
          className="animate-in fade-in slide-in-from-bottom-1 animation-duration-300 flex flex-col items-center gap-0.5"
        >
          <span className="text-foreground text-[23px] leading-normal font-medium tracking-[-0.02em]">
            {displayValue.toLocaleString()}
          </span>
          <span className="text-accent-foreground text-xs leading-[1.45]">
            {displayLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
