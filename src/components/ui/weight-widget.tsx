import React, { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type PanInfo, MotionValue } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface WeightWidgetProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export const WeightWidget: React.FC<WeightWidgetProps> = ({
  initialValue = 25,
  min = 0,
  max = 100,
  onChange
}) => {
  const widgetWidth = 350; 
  const widgetHeight = 350;
  const pixelsPerUnit = 80;

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const isDark = theme === 'dark';

  const x = useMotionValue(-initialValue * pixelsPerUnit);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);

  const [displayValue, setDisplayValue] = useState(initialValue);

  useEffect(() => {
    const unsubscribe = springX.on("change", (latest) => {
      const val = Math.abs(latest / pixelsPerUnit);
      const roundedVal = Math.round(val);
      if (roundedVal !== displayValue) {
        setDisplayValue(roundedVal);
        if (onChange) onChange(roundedVal);
      }
    });
    return () => unsubscribe();
  }, [springX, pixelsPerUnit, onChange, displayValue]);

  const handleDrag = (_: any, info: PanInfo) => {
    const newX = x.get() + info.delta.x;
    const minX = -max * pixelsPerUnit;
    const maxX = -min * pixelsPerUnit;
    x.set(Math.max(minX, Math.min(maxX, newX)));
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const currentX = x.get();
    const velocity = info.velocity.x * 0.1; 
    const targetX = currentX + velocity;
    const snappedX = Math.round(targetX / pixelsPerUnit) * pixelsPerUnit;
    x.set(snappedX);
  };

  const range = useMemo(() => {
    const items = [];
    for (let i = min; i <= max; i++) {
      items.push(i);
    }
    return items;
  }, [min, max]);

  return (
     <div className={`flex flex-col items-center justify-center h-screen p-8 space-y-8 transition-colors duration-500 ${isDark ? 'bg-[#0A0A0B]' : 'bg-gray-50'}`}>
      
      {/* Theme Toggle */}
      <motion.button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        whileTap={{ scale: 0.9 }}
        className={`p-3 rounded-full border shadow-sm transition-colors ${isDark ? 'bg-[#161618] border-[#27272A] text-yellow-400' : 'bg-white border-[#F0F0F0] text-slate-600'}`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>

      <div 
        className={`relative rounded-[45px] font-sans shadow-lg flex flex-col items-center overflow-hidden select-none touch-none border-2 transition-colors duration-300 ${
          isDark ? 'bg-[#121214] border-[#1E1E21]' : 'bg-white border-[#F0F0F0]'
        }`}
        style={{ width: widgetWidth, height: widgetHeight }}
      >
        <div className={`mt-10 font-semibold text-[26px] capitalize tracking-wide transition-colors ${isDark ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
          Weight
        </div>

        <div className="relative flex-1 w-full flex justify-center items-start">
          {/* Sliding Numbers Layer */}
          <motion.div 
            drag="x"
            dragMomentum={true}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            className="absolute h-full w-full flex items-start cursor-grab active:cursor-grabbing"
            style={{ x: springX, left: '50%' }}
          >
            {range.map((i) => (
              <DialItem 
                key={i} 
                value={i} 
                pixelsPerUnit={pixelsPerUnit} 
                scrollX={springX}
                isDark={isDark}
              />
            ))}
          </motion.div>

          {/* Static Indicator */}
          <div className="absolute bottom-0 flex flex-col items-center z-20 pointer-events-none">
            <div className={`w-[10px] h-[10px] rounded-full mb-1 transition-colors ${isDark ? 'bg-white' : 'bg-black'}`} />
            <div className={`w-[4px] h-14 rounded-full transition-colors ${isDark ? 'bg-white' : 'bg-black'}`} />
          </div>

          {/* Side Gradients */}
          <div className={`absolute inset-y-0 left-0 w-16 z-10 pointer-events-none transition-colors ${
            isDark 
            ? 'bg-gradient-to-r from-[#121214] via-[#121214]/80 to-transparent' 
            : 'bg-gradient-to-r from-white via-white/80 to-transparent'
          }`} />
          <div className={`absolute inset-y-0 right-0 w-16 z-10 pointer-events-none transition-colors ${
            isDark 
            ? 'bg-gradient-to-l from-[#121214] via-[#121214]/80 to-transparent' 
            : 'bg-gradient-to-l from-white via-white/80 to-transparent'
          }`} />
        </div>
      </div>
    </div>
  );
};

const DialItem: React.FC<{ 
  value: number; 
  pixelsPerUnit: number; 
  scrollX: MotionValue<number>;
  isDark: boolean;
}> = ({ value, pixelsPerUnit, scrollX, isDark }) => {
  const itemX = value * pixelsPerUnit;
  const distance = useTransform(scrollX, (s: number) => Math.abs(s + itemX));

  const opacity = useTransform(distance, [0, pixelsPerUnit * 2, pixelsPerUnit * 3], [1, 0.4, 0]);
  
  const color = useTransform(
    distance, 
    [0, pixelsPerUnit], 
    isDark ? ["#F8FAFC", "#334155"] : ["#25262B", "#CBD5E1"]
  );

  const scale = useTransform(distance, [0, pixelsPerUnit * 2], [1, 0.85]);
  const yOffset = useTransform(distance, [0, pixelsPerUnit * 3], [0, 60]);

  const rotate = useTransform(scrollX, (s: number) => {
    const d = s + itemX;
    return (d / pixelsPerUnit) * 12; 
  });

  return (
    <motion.div
      className="absolute top-0 flex flex-col items-center"
      style={{ 
        left: itemX,
        x: "-50%",
        opacity,
        scale,
        y: yOffset,
        rotate,
        transformOrigin: "center 190px" 
      }}
    >
      <motion.span 
        className="text-[74px] font-bold tracking-tighter"
        style={{ color }}
      >
        {value}
      </motion.span>

      <div className="flex flex-col items-center mt-6">
        <div className={`w-[4px] h-9 rounded-full transition-colors ${isDark ? 'bg-[#2D2D30]' : 'bg-[#D6D5E1]'}`} />
      </div>
    </motion.div>
  );
};