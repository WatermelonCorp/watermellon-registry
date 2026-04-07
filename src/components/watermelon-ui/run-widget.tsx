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
    <div className="relative flex h-[320px] w-[320px] flex-col justify-between overflow-hidden rounded-[42px] border-2 border-[#E7E5E1] bg-[#FEFEFE] p-[7px] shadow-lg dark:border-white/5 dark:bg-[#1C1C1C]">
      <div className="flex items-start justify-between px-3 py-3">
        <div className="flex flex-col justify-center">
          <div className="relative -ml-2 flex h-[76px] w-[180px] items-center overflow-hidden">
            <NumberFlow
              value={miles}
              format={{
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }}
              className="font-sans text-[84px] leading-none font-bold text-[#282828] tabular-nums dark:text-white"
              style={{
                fontVariantNumeric: 'tabular-nums',
                lineHeight: '1',
              }}
            />
          </div>

          <span className="mt-2 text-[24px] font-medium text-[#8C8C8A] dark:text-gray-500">
            miles
          </span>
        </div>

        <button className="shrink-0 rounded-xl bg-[#8D8C85] p-2.5 text-white hover:bg-[#8F8D8B]/80 dark:bg-[#3A3A38] dark:hover:bg-[#4A4A48]">
          <HiOutlineArrowUpRight size={34} strokeWidth={3} />
        </button>
      </div>

      <div className="relative -mx-8 flex h-24 items-center justify-center">
        <div className="absolute left-1/2 z-10 h-12 w-[4px] -translate-x-1/2 rounded-full bg-[#595753] dark:bg-white" />

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
                className="h-9 w-1 flex-shrink-0 rounded-full bg-[#DFDDDC] dark:bg-white/20"
              />
            ))}
          </div>
        </motion.div>
      </div>

      <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-[8px] rounded-b-[32px] bg-[#F0ECE6] py-[18px] text-[22px] font-semibold text-[#2A2620] hover:bg-[#e9e4dc] dark:bg-white/10 dark:text-white dark:hover:bg-white/20">
        <FaRunning size={28} />
        Begin Run
      </button>
    </div>
  );
};
