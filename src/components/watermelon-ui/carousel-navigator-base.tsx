'use client';

import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type FC } from 'react';

type ThemeConfig = {
  button: string;
  dot: string;
  progress: string;
};

interface ArrowButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  themeColor: string;
  disabled?: boolean;
}

interface CarouselNavigatorProps {
  totalSlides?: number;
  autoDelay?: number;
  themes?: ThemeConfig[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const DEFAULT_TOTAL_SLIDES = 4;
const DEFAULT_AUTO_DELAY = 5000;

const DEFAULT_THEMES: ThemeConfig[] = [
  {
    button: 'bg-primary text-primary-foreground',
    dot: 'bg-secondary',
    progress: 'bg-secondary',
  },
  {
    button: 'bg-primary text-primary-foreground',
    dot: 'bg-secondary',
    progress: 'bg-secondary',
  },
  {
    button: 'bg-primary text-primary-foreground',
    dot: 'bg-secondary',
    progress: 'bg-secondary',
  },
  {
    button: 'bg-primary text-primary-foreground',
    dot: 'bg-secondary',
    progress: 'bg-secondary',
  },
];

export const CarouselNavigator: FC<CarouselNavigatorProps> = ({
  totalSlides = DEFAULT_TOTAL_SLIDES,
  autoDelay = DEFAULT_AUTO_DELAY,
  themes = DEFAULT_THEMES,
  currentIndex,
  onIndexChange,
}) => {
  const theme = themes[currentIndex];

  const goPrev = () =>
    onIndexChange((currentIndex - 1 + totalSlides) % totalSlides);

  const goNext = () => onIndexChange((currentIndex + 1) % totalSlides);

  return (
    <motion.div
      className="theme-injected flex items-center justify-center gap-1 rounded-4xl border border-border bg-card px-4 py-3 font-sans transition-colors duration-300"
    >
      <ArrowButton
        onClick={goPrev}
        themeColor={theme.button}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={24} strokeWidth={3} />
      </ArrowButton>

      <div className="flex items-center gap-2 px-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <Indicator
            key={i}
            isActive={i === currentIndex}
            theme={theme}
            autoDelay={autoDelay}
            onClick={() => onIndexChange(i)}
          />
        ))}
      </div>

      <ArrowButton onClick={goNext} themeColor={theme.button}>
        <ChevronRight size={24} strokeWidth={3} />
      </ArrowButton>
    </motion.div>
  );
};

const ArrowButton = ({ children, onClick, themeColor, disabled }: ArrowButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      disabled={disabled}
      className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-4xl font-sans shadow-sm transition-colors duration-300 ${disabled ? 'cursor-not-allowed bg-input text-muted-foreground opacity-60' : `${themeColor} hover:brightness-95`}`}
    >
      {children}
    </motion.button>
  );
};

const Indicator = ({
  isActive,
  theme,
  autoDelay,
  onClick,
}: {
  isActive: boolean;
  theme: ThemeConfig;
  autoDelay: number;
  onClick: () => void;
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ borderRadius: 24 }}
      className={`relative h-3 cursor-pointer focus:outline-none ${isActive ? `w-12 ${theme.progress}` : `w-3 ${theme.dot}`} transition-colors duration-300`}
    >
      {isActive && (
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: autoDelay / 1000, ease: 'linear' }}
          className="absolute inset-0 rounded-4xl bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.4)]"
        />
      )}
    </motion.button>
  );
};
