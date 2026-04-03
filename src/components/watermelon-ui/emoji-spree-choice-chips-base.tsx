'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface InterestItem {
  id: string;
  label: string;
  emoji: string;
}

interface Particle {
  id: string;
  emoji: string;
  xOffset: number;
  rotate: number;
}

interface Props {
  interests: InterestItem[];
  onChange?: (selectedIds: string[]) => void;
}

export const EmojiSpreeChips: React.FC<Props> = ({ interests, onChange }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isPanning, setIsPanning] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const spawnParticles = (emoji: string) => {
    const newParticles: Particle[] = Array.from({ length: 3 }).map(() => ({
      id: crypto.randomUUID(),
      emoji,
      xOffset: (Math.random() - 0.5) * 180,
      rotate: (Math.random() - 0.5) * 40,
    }));

    setParticles(newParticles);

    setTimeout(() => {
      setParticles([]);
    }, 1600);
  };

  const toggleInterest = (id: string, emoji: string) => {
    setSelected((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((i) => i !== id) : [...prev, id];

      onChange?.(updated);

      if (!exists) spawnParticles(emoji);

      return updated;
    });
  };

  const rows = React.useMemo(() => {
    const result: InterestItem[][] = [[], [], []];
    interests.forEach((item, index) => {
      result[index % 3].push(item);
    });
    return result;
  }, [interests]);

  return (
    <div className="theme-injected relative isolate flex min-h-[500px] w-full max-w-4xl flex-col items-center overflow-hidden py-10 sm:min-h-[600px]">
      <h2 className="mb-6 w-full self-start px-6 text-2xl font-bold sm:mb-8 sm:text-3xl">
        Interests
      </h2>

      {/* Chips */}
      <motion.div
        ref={containerRef}
        className={`relative z-20 w-full cursor-grab overflow-hidden mask-r-from-90% mask-l-from-90% px-6 active:cursor-grabbing ${
          isPanning ? 'touch-none' : 'touch-pan-y'
        }`}
      >
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          onPanStart={() => setIsPanning(true)}
          onPanEnd={() => setIsPanning(false)}
          className="flex w-max flex-col gap-4 pr-12 sm:gap-5"
        >
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex w-max gap-4 sm:gap-5">
              {row.map((item) => {
                const isSelected = selected.includes(item.id);

                return (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    onClick={() => toggleInterest(item.id, item.emoji)}
                    className={`flex w-max items-center gap-2 rounded-3xl border px-4 py-1.5 font-sans text-base font-semibold whitespace-nowrap sm:gap-3 sm:px-5 sm:py-2 sm:text-lg ${
                      isSelected
                        ? 'border-border bg-card dark:border-border dark:bg-muted'
                        : 'border-border bg-secondary dark:border-border dark:bg-muted'
                    }`}
                  >
                    <span>{item.emoji}</span>
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* PARTICLES */}
      <div className="pointer-events-none absolute inset-0">
        <AnimatePresence>
          {particles.map((p, index) => (
            <FloatingEmoji
              key={p.id}
              emoji={p.emoji}
              delay={index * 0.08}
              xOffset={p.xOffset}
              rotate={p.rotate}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Selected Pill */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 sm:bottom-12">
        <AnimatePresence>
          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
              className="border-border bg-card dark:bg-card dark:text-foreground relative rounded-4xl border px-6 py-2.5 font-sans text-lg font-bold shadow-lg sm:px-10 sm:py-4 sm:text-xl"
            >
              {selected.length} Interests
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* Floating Emoji Component */
const FloatingEmoji = ({
  emoji,
  delay,
  xOffset,
  rotate,
}: {
  emoji: string;
  delay: number;
  xOffset: number;
  rotate: number;
}) => {
  const [phase, setPhase] = useState<'up' | 'down'>('up');
  const isMobile = React.useSyncExternalStore(
    (callback) => {
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    () => window.innerWidth < 640,
    () => false
  );

  return (
    <motion.div
      initial={{ y: 0, x: 0, opacity: 0, scale: 0.6, rotate: 0 }}
      animate={{
        y: [0, isMobile ? -180 : -260, isMobile ? -180 : -260, 30],
        x: [
          0,
          xOffset * (isMobile ? 0.6 : 1),
          xOffset * (isMobile ? 0.5 : 0.8),
        ],
        opacity: [0, 1, 1, 0],
        scale: [0.6, isMobile ? 2 : 3, isMobile ? 2 : 3, 0.6],
        rotate: [0, rotate, rotate * 0.5],
      }}
      transition={{
        duration: 1,
        ease: 'easeInOut',
        delay,
      }}
      onUpdate={(latest) => {
        if (typeof latest.y === 'number') {
          const threshold = isMobile ? -90 : -130;
          if (latest.y < threshold) {
            setPhase('up');
          } else {
            setPhase('down');
          }
        }
      }}
      className={`absolute bottom-20 left-1/2 -translate-x-1/2 text-4xl select-none sm:text-6xl ${
        phase === 'up' ? 'z-30' : 'z-10'
      }`}
    >
      {emoji}
    </motion.div>
  );
};
