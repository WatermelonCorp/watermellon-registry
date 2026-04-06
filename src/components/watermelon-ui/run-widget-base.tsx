import { useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent } from 'motion/react';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import { FaRunning } from 'react-icons/fa';
import NumberFlow from '@number-flow/react';

const TICK_GAP = 12;

export const RunWidget = () => {
  const x = useMotionValue(-96);

  const [miles, setMiles] = useState(() => {
    const initial = Math.abs(-96) / (TICK_GAP * 10);
    return Math.round(initial * 10) / 10;
  });

  useMotionValueEvent(x, 'change', (latest) => {
    if (typeof latest !== 'number') return;

    const calculated = Math.abs(latest) / (TICK_GAP * 10);

    if (!Number.isFinite(calculated)) return;

    const rounded = Math.round(calculated * 10) / 10;

    setMiles((prev) => {
      if (prev === rounded) return prev;
      return rounded;
    });
  });

  return (
    <div className="border-border theme-injected bg-card relative flex h-[320px] w-[320px] flex-col justify-between overflow-hidden rounded-lg border-2 p-[7px] shadow-lg">
      <div className="flex items-start justify-between px-3 py-3">
        <div className="flex flex-col justify-center">
          <div className="relative -ml-2 flex h-[76px] w-[180px] items-center overflow-hidden">
            <NumberFlow
              value={miles}
              format={{
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }}
              className="text-foreground font-sans text-[84px] leading-none font-bold tabular-nums"
              style={{
                fontVariantNumeric: 'tabular-nums',
                lineHeight: '1',
              }}
            />
          </div>

          <span className="text-muted-foreground mt-2 text-[24px] font-medium">
            miles
          </span>
        </div>

        <button className="bg-secondary text-secondary-foreground shrink-0 rounded-lg p-2.5 hover:opacity-80">
          <HiOutlineArrowUpRight size={34} strokeWidth={3} />
        </button>
      </div>

      <div className="relative -mx-8 flex h-24 items-center justify-center">
        <div className="bg-foreground absolute left-1/2 z-10 h-12 w-[4px] -translate-x-1/2 rounded-lg" />

        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -1200 }}
          dragElastic={0.05}
          style={{ x, left: '50%' }}
          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
          className="absolute left-1/2 flex cursor-grab items-center active:cursor-grabbing"
        >
          <div className="flex items-center gap-[12px]">
            {[...Array(200)].map((_, i) => (
              <div
                key={i}
                className="bg-foreground/20 h-9 w-1 flex-shrink-0 rounded-lg"
              />
            ))}
          </div>
        </motion.div>
      </div>

      <button className="bg-accent text-accent-foreground mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-[18px] text-[22px] font-semibold hover:opacity-90">
        <FaRunning size={28} />
        Begin Run
      </button>
    </div>
  );
};
