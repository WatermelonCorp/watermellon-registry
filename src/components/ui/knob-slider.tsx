import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

interface KnobSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: number;
}

export const KnobSlider: React.FC<KnobSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  size = 320
}) => {
  const knobRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const tickCount = 60;
  const startAngle = 0;
  const endAngle = 360;

  const calculateValueFromAngle = useCallback((angle: number) => {
    let normalizedAngle = (angle + 360) % 360;
    const range = endAngle - startAngle;
    const valueRange = max - min;
    const rawValue = ((normalizedAngle - startAngle) / range) * valueRange + min;
    return Math.max(min, Math.min(max, Math.round(rawValue)));
  }, [min, max]);

  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    if (!knobRef.current) return;
    const rect = knobRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (angle < 0) angle += 360;
    const newValue = calculateValueFromAngle(angle);
    onChange(newValue);
  }, [onChange, calculateValueFromAngle]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => { if (isDragging) handleInteraction(e.clientX, e.clientY); };
    const onTouchMove = (e: TouchEvent) => { if (isDragging) handleInteraction(e.touches[0].clientX, e.touches[0].clientY); };
    const onEnd = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging, handleInteraction]);

  const currentAngle = useMemo(() => {
    return ((value - min) / (max - min)) * (endAngle - startAngle) + startAngle;
  }, [value, min, max]);

  // Theme configuration
  const theme = {
    screenBg: isDark ? 'bg-[#0f0f10]' : 'bg-[#FEFEFE]',
    knobBg: isDark ? '#1a1a1c' : '#FEFEFE',
    outerRing: isDark ? 'bg-[#151517] border-[#222225]' : 'bg-[#fcfdfe] border-[#EEEDF2]',
    middleRing: isDark ? 'bg-[#121214]' : 'bg-[#F4F4FB]',
    tickActive: isDark ? '#E4E4E7' : '#84838A',
    tickInactive: isDark ? '#27272a' : '#D5D4DD',
    text: isDark ? '#E4E4E7' : '#85848D',
    shadow: isDark 
      ? `15px 15px 30px rgba(0,0,0,0.6), -5px -5px 15px rgba(255,255,255,0.02), inset 0 1px 1px rgba(255,255,255,0.05)` 
      : `15px 15px 25px rgba(0,0,0,0.1), -5px -5px 15px rgba(255,255,255,0.8), inset 0 1px 2px rgba(255,255,255,1), inset 0 -1px 2px rgba(0,0,0,0.05)`
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-500 p-6 selection:bg-transparent ${theme.screenBg}`}>
      
      {/* Theme Toggle Button */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className={`mb-12 p-3 rounded-full transition-all active:scale-90 border ${
          isDark ? 'bg-[#1c1c1e] border-white/10 text-yellow-400' : 'bg-white border-black/5 text-gray-400 shadow-sm'
        }`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="relative flex items-center justify-center select-none touch-none" style={{ width: size, height: size }}>
        <div className={`absolute rounded-full border-[1.8px] w-[95%] h-[95%] transition-colors duration-300 ${theme.outerRing}`} />
        
        <svg className="absolute inset-0 pointer-events-none z-50" viewBox="0 0 100 100">
          {Array.from({ length: tickCount }).map((_, i) => {
            const angle = (i * 360) / tickCount;
            const active = ((angle / 360) * (max - min) + min) <= value;
            return (
              <line 
                key={i} x1="50" y1="10" x2="50" y2="13" 
                transform={`rotate(${angle} 50 50)`} 
                stroke={active ? theme.tickActive : theme.tickInactive} 
                strokeWidth="0.7" strokeLinecap="round" 
                className="transition-colors duration-200" 
              />
            );
          })}
        </svg>

        <div
          ref={knobRef}
          onMouseDown={(e) => { setIsDragging(true); handleInteraction(e.clientX, e.clientY); }}
          onTouchStart={(e) => { setIsDragging(true); handleInteraction(e.touches[0].clientX, e.touches[0].clientY); }}
          className={`relative border-[1.8px] flex items-center justify-center rounded-full cursor-grab active:cursor-grabbing z-20 transition-all duration-300 active:scale-[0.98] ${isDark ? 'border-[#2c2c2e]' : 'border-[#EEEDF2]'}`}
          style={{ 
            width: '60%', 
            height: '60%', 
            backgroundColor: theme.knobBg,
            boxShadow: theme.shadow 
          }}
        >
          <div className="flex flex-col items-center justify-center pointer-events-none overflow-hidden h-full w-full">
            <BlurredNumber value={value} color={theme.text} />
          </div>
          <motion.div className="absolute inset-0 pointer-events-none" animate={{ rotate: currentAngle }} transition={{ type: 'spring', stiffness: 400, damping: 28 }}>
            <div className={`absolute top-[-10px] left-1/2 -translate-x-1/2 w-1 h-6 rounded-full shadow-md ${isDark ? 'bg-[#E4E4E7]' : 'bg-[#84848D]'}`} />
          </motion.div>
        </div>
        
        <div className={`absolute rounded-full pointer-events-none transition-colors duration-300 ${theme.middleRing}`} style={{ width: '88%', height: '88%' }} />
      </div>
    </div>
  );
};

const BlurredNumber: React.FC<{ value: number; color: string }> = ({ value, color }) => {
  return (
    <div className="relative h-24 w-full flex items-center justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)', scale: 0.9 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)', scale: 0.9 }}
          transition={{ 
            type: 'spring', 
            stiffness: 600, 
            damping: 40,
            opacity: { duration: 0.1 },
            filter: { duration: 0.1 }
          }}
          className="absolute text-[78px] font-bold font-sans tabular-nums transition-colors duration-300"
          style={{ color: color, textShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};