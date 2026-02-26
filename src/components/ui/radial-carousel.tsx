"use client";

import React, { useState, useCallback, useEffect } from 'react';
import {
    motion,
    AnimatePresence,
    type Variants,
    useMotionValue,
    useSpring,
    useTransform
} from 'motion/react';
import { X } from 'lucide-react';

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

    const [responsiveSizes, setResponsiveSizes] = useState({
        radius,
        thumbnailSize,
        centerSize
    });

    useEffect(() => {
        const updateSizes = () => {
            const width = window.innerWidth;

            if (width < 640) {
                setResponsiveSizes({
                    radius: Math.min(radius, 140),
                    thumbnailSize: Math.min(thumbnailSize, 80),
                    centerSize: Math.min(centerSize, 280)
                });
            } else if (width < 1024) {
                setResponsiveSizes({
                    radius: Math.min(radius, 200),
                    thumbnailSize: Math.min(thumbnailSize, 90),
                    centerSize: Math.min(centerSize, 340)
                });
            } else {
                setResponsiveSizes({ radius, thumbnailSize, centerSize });
            }
        };

        updateSizes();
        window.addEventListener('resize', updateSizes);
        return () => window.removeEventListener('resize', updateSizes);
    }, [radius, thumbnailSize, centerSize]);

    const rotation = useMotionValue(0);

    const smoothRotation = useSpring(rotation, {
        stiffness: 60,
        damping: 25,
        mass: 1.2
    });

    const toggleExpand = useCallback(() => {
        setIsExpanded(prev => !prev);
        if (!isExpanded) rotation.set(0);
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
        <div className="relative flex items-center justify-center w-full sm:h-[450px] h-[350px] select-none touch-none overflow-visible">
            <AnimatePresence mode="popLayout">
                {!isExpanded ? (
                    <motion.div
                        key="center-view"
                        initial={{ scale: 0.8, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.4, opacity: 0, transition: { duration: 0.25 } }}
                        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                        className="relative z-10"
                    >
                        <div
                            style={{ width: responsiveSizes.centerSize, height: responsiveSizes.centerSize }}
                            className="relative p-3 sm:p-4 rounded-[32px] sm:rounded-[42px] overflow-hidden border transition-colors duration-300 bg-white border-neutral-200 shadow-2xl dark:bg-neutral-900 dark:border-neutral-800"
                        >
                            <img
                                src={items[activeIndex].url}
                                alt={items[activeIndex].title}
                                className="w-full h-full object-cover rounded-[28px] sm:rounded-[36px]"
                                draggable={false}
                            />

                            <button
                                onClick={toggleExpand}
                                className="absolute top-6 right-6 sm:top-8 sm:right-8 w-8 h-8 sm:w-10 sm:h-10 backdrop-blur-xl rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 bg-neutral-100 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20"
                            >
                                <X size={20} className="sm:hidden text-neutral-500 dark:text-white" />
                                <X size={28} className="hidden sm:block text-neutral-500 dark:text-white" />
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
                            rotation.set(rotation.get() + info.delta.x * 0.5);
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
                                    radius={responsiveSizes.radius}
                                    thumbnailSize={responsiveSizes.thumbnailSize}
                                    rotation={smoothRotation}
                                    onClick={() => handleItemClick(index)}
                                />
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
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
    onClick: () => void;
}

const Item: React.FC<ItemProps> = ({
    index,
    item,
    baseAngle,
    radius,
    thumbnailSize,
    rotation,
    onClick
}) => {
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
                className="p-1.5 sm:p-2 rounded-[18px] sm:rounded-[24px] shadow-2xl border overflow-hidden transition-colors duration-300 bg-white border-neutral-200 ring-1 ring-black/5 dark:bg-neutral-900 dark:border-neutral-800 dark:ring-white/5"
            >
                <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-[13px] sm:rounded-[18px]"
                    draggable={false}
                />
            </div>
        </motion.div>
    );
};