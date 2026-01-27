import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react'; 

export interface InterestItem {
  id: string;
  label: string;
  emoji: string;
}

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

interface Props {
  interests: InterestItem[];
  onChange?: (selectedIds: string[]) => void;
}

export const EmojiSpreeChips: React.FC<Props> = ({ interests, onChange }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isDark, setIsDark] = useState(false); 

  const toggleInterest = (id: string, emoji: string, e: React.MouseEvent<HTMLButtonElement>) => {
    const isSelected = selected.includes(id);
    const newSelected = isSelected 
      ? selected.filter((i) => i !== id) 
      : [...selected, id];
    
    setSelected(newSelected);
    onChange?.(newSelected);

    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top;

    const newParticles = Array.from({ length: 3 }).map((_) => ({
      id: Math.random() + Date.now(),
      emoji,
      x: centerX,
      y: centerY,
    }));

    setParticles((prev) => [...prev, ...newParticles]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setParticles((prev) => prev.filter(p => p.id > Date.now() - 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`w-full min-h-screen transition-colors duration-500 flex flex-col items-center ${isDark ? 'bg-[#0f0f12]' : 'bg-white'}`}>
      
      {/* Theme Toggle Button */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className={`mt-10 p-3 rounded-full transition-all active:scale-90 z-50 ${isDark ? 'bg-[#1e1e24] text-yellow-400' : 'bg-[#F4F4F9] text-slate-600'}`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="w-full max-w-4xl select-none overflow-hidden py-10 mt-14">
        <h2 className={`text-[36px] font-bold tracking-tight mb-6 px-6 ml-8 transition-colors ${isDark ? 'text-[#fefefe]' : 'text-[#343336]'}`}>
          Interests
        </h2>
        
        {/* Staggered Grid Container */}
        <div className="flex flex-wrap gap-x-4 gap-y-7 px-10 justify-center">
          {interests.map((item, _idx) => {
            const isSelected = selected.includes(item.id);
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => toggleInterest(item.id, item.emoji, e)}
                className={`
                  flex items-center justify-center gap-4 px-4 py-[10px] rounded-full border-[1.6px] 
                  text-[18px] font-semibold transition-all duration-300 whitespace-nowrap 
                  ${isSelected 
                    ? (isDark ? 'bg-[#26262b] border-[#3f3f46] text-[#fefefe]' : 'bg-[#fefefe] border-[#E6E5EA] text-[#262626]') 
                    : (isDark ? 'bg-[#1a1a1e] border-[#1a1a1e] text-[#a1a1aa] hover:border-[#3f3f46]' : 'bg-[#F4F4F9] border-[#F4F4F9]/80 text-[#262626] hover:border-[#E5E5E5]')}
                `}
              >
                <span className="text-xl">{item.emoji}</span>
                <span className='text-xl font-bold'>{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Floating Emoji Particles */}
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <AnimatePresence>
            {particles.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.2, y: p.y, x: p.x }}
                animate={{ 
                  opacity: [0, 1, 1, 0], 
                  scale: [0.5, 2, 1.8, 1.2], 
                  y: p.y - 250,
                  x: p.x + (i % 2 === 0 ? 240 : -60),
                  rotate: i % 2 === 0 ? 20 : -20
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute text-7xl drop-shadow-xl"
              >
                {p.emoji}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Counter Badge */}
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-40">
          <AnimatePresence>
            {selected.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className={`backdrop-blur-md border-[1.59px] px-12 py-[18px] rounded-full shadow-xl text-xl font-bold transition-colors ${
                  isDark 
                  ? 'bg-[#1a1a1e]/80 border-[#3f3f46] text-[#fefefe]' 
                  : 'bg-[#fefefe]/80 border-[#E6E5EA] text-[#68686F]'
                }`}
              >
                {selected.length} Interests
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};