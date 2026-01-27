import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence, type Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, Sun, Moon } from 'lucide-react';

export interface GalleryItem {
  id: string | number;
  url: string;
  title?: string;
}

export interface RadialCarouselProps {
  items: GalleryItem[];
  radius?: number;
  thumbnailSize?: number;
  centerSize?: number;
}

export const RadialCarousel: React.FC<RadialCarouselProps> = ({
  items,
  radius = 260,
  thumbnailSize = 110,
  centerSize = 400,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDark, setIsDark] = useState(false); 

  const rotation = useMotionValue(0);
  
  const smoothRotation = useSpring(rotation, {
    stiffness: 60,
    damping: 25,
    mass: 1.2
  });

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
    if (!isExpanded) {
      rotation.set(0);
    }
  }, [isExpanded, rotation]);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    setIsExpanded(false);
  };

  const containerVariants: Variants = {
    collapsed: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
    expanded: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
  };

  return (
    <div className={`min-h-[110vh] w-full flex flex-col items-center justify-center p-4 transition-colors duration-500 ${isDark ? 'bg-[#0A0A0B]' : 'bg-white'}`}>
      
      {/* Theme Toggle */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className={`mb-8 p-3 rounded-full transition-all active:scale-95 border ${
          isDark ? 'bg-[#1C1C1E] border-white/10 text-yellow-400' : 'bg-white border-black/5 text-gray-400 shadow-sm'
        }`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="relative flex items-center justify-center w-full h-[400px] select-none touch-none overflow-visible">
        <AnimatePresence mode="popLayout">
          {!isExpanded ? (
            <motion.div
              key="center-view"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.4, opacity: 0, transition: { duration: 0.25 } }}
              transition={{ type: 'spring' as const, stiffness: 260, damping: 25 }}
              className="relative z-10"
            >
              <div 
                style={{ width: centerSize, height: centerSize }}
                className={`relative p-4 rounded-[42px] overflow-hidden border-[1.7px] transition-colors duration-300 ${
                  isDark 
                    ? "bg-[#1C1C1E] border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]" 
                    : "bg-white border-[#F4F4F4] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]"
                }`}
              >
                <img
                  src={items[activeIndex].url}
                  alt={items[activeIndex].title}
                  className="w-full h-full object-cover rounded-[36px]"
                  draggable={false}
                />
                
                <button title='close'
                  onClick={toggleExpand}
                  className={`absolute top-8 right-8 w-10 h-10 backdrop-blur-xl rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                    isDark ? "bg-white/10 hover:bg-white/20" : "bg-[#F6F1F0] hover:bg-white"
                  }`}
                >
                  <X size={28} className={isDark ? "text-white" : "text-[#908B90]"} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="radial-view"
              variants={containerVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="relative flex items-center justify-center w-full h-full cursor-grab active:cursor-grabbing"
              onPan={(_, info) => {
                const current = rotation.get();
                rotation.set(current + info.delta.x * 0.5);
              }}
            >
              {items.map((item, index) => {
                const baseAngle = (index / items.length) * (2 * Math.PI) - Math.PI / 2;
                return (
                  <Item 
                    key={item.id}
                    index={index}
                    item={item}
                    baseAngle={baseAngle}
                    radius={radius}
                    thumbnailSize={thumbnailSize}
                    rotation={smoothRotation}
                    isDark={isDark}
                    onClick={() => handleItemClick(index)}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

interface ItemProps {
  index: number;
  item: GalleryItem;
  baseAngle: number;
  radius: number;
  thumbnailSize: number;
  rotation: any;
  isDark: boolean;
  onClick: () => void;
}

const Item: React.FC<ItemProps> = ({ index, item, baseAngle, radius, thumbnailSize, rotation, isDark, onClick }) => {
  const x = useTransform(rotation, (r: number) => {
    const currentAngle = baseAngle + (r * Math.PI) / 180;
    return Math.cos(currentAngle) * radius;
  });

  const y = useTransform(rotation, (r: number) => {
    const currentAngle = baseAngle + (r * Math.PI) / 180;
    return Math.sin(currentAngle) * radius;
  });

  const rotate = useTransform(rotation, (r: number) => {
      return (index % 2 === 0 ? 5 : -5) + (r * 0.05);
  });

  const itemVariants: Variants = {
    collapsed: { scale: 0, opacity: 0, transition: { type: 'spring', stiffness: 350, damping: 30 } },
    expanded: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  };

  return (
    <motion.div
      variants={itemVariants}
      style={{ x, y, rotate }}
      whileHover={{ scale: 1.12, rotate: 0, zIndex: 50 }}
      onClick={onClick}
      className="absolute cursor-pointer"
    >
      <div 
        style={{ width: thumbnailSize, height: thumbnailSize }}
        className={`p-2 rounded-[24px] shadow-2xl border overflow-hidden transition-colors duration-300 ${
          isDark 
            ? "bg-[#1C1C1E] border-white/10 ring-1 ring-white/5" 
            : "bg-white border-white/80 ring-1 ring-black/[0.03]"
        }`}
      >
        <img
          src={item.url}
          alt={item.title}
          className="w-full h-full object-cover rounded-[18px]"
          draggable={false}
        />
      </div>
    </motion.div>
  );
};
