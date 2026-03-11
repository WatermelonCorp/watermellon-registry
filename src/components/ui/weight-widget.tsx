"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type PanInfo, MotionValue } from 'motion/react';
import { useTheme } from 'next-themes';

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
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const pixelsPerUnit = 80;

    const x = useMotionValue(-initialValue * pixelsPerUnit);
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const springX = useSpring(x, springConfig);

    const [displayValue, setDisplayValue] = useState(initialValue);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDrag = (_: any, info: PanInfo) => {
        const newX = x.get() + info.delta.x;
        const minX = -max * pixelsPerUnit;
        const maxX = -min * pixelsPerUnit;
        x.set(Math.max(minX, Math.min(maxX, newX)));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDragEnd = (_: any, info: PanInfo) => {
        const currentX = x.get();
        const velocity = info.velocity.x * 0.1;
        const targetX = currentX + velocity;
        const snappedX = Math.round(targetX / pixelsPerUnit) * pixelsPerUnit;
        x.set(snappedX);
    };

    const visibleRange = useMemo(() => {
        const items = [];
        const buffer = 5;
        for (let i = Math.max(min, displayValue - buffer); i <= Math.min(max, displayValue + buffer); i++) {
            items.push(i);
        }
        return items;
    }, [min, max, displayValue]);

    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';

    return (
        <div
            className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] rounded-[35px] sm:rounded-[45px] font-sans shadow-lg flex flex-col items-center overflow-hidden select-none touch-none border-2 transition-colors duration-300 bg-white dark:bg-[#121214] border-[#F0F0F0] dark:border-[#1E1E21]"
        >
            <div className="mt-8 sm:mt-10 font-semibold text-xl sm:text-[26px] capitalize tracking-wide transition-colors text-[#94A3B8] dark:text-[#475569]">
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
                    {visibleRange.map((i) => (
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
                <div className="absolute bottom-0 flex flex-col items-center z-20 pointer-events-none mb-1 sm:mb-0">
                    <div className="w-2 h-2 sm:w-[10px] sm:h-[10px] rounded-full mb-1 transition-colors bg-black dark:bg-white" />
                    <div className="w-[3px] sm:w-[4px] h-10 sm:h-14 rounded-full transition-colors bg-black dark:bg-white" />
                </div>

                {/* Side Gradients */}
                <div className="absolute inset-y-0 left-0 w-16 sm:w-24 z-30 pointer-events-none transition-colors bg-gradient-to-r from-white dark:from-[#121214] via-white/80 dark:via-[#121214]/80 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-16 sm:w-24 z-30 pointer-events-none transition-colors bg-gradient-to-l from-white dark:from-[#121214] via-white/80 dark:via-[#121214]/80 to-transparent" />
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
                className="text-[62px] sm:text-[74px] font-bold tracking-tighter"
                style={{ color }}
            >
                {value}
            </motion.span>

            <div className="flex flex-col items-center mt-4 sm:mt-6">
                <div className={`w-[3px] sm:w-[4px] h-7 sm:h-9 rounded-full transition-colors ${isDark ? 'bg-[#2D2D30]' : 'bg-[#D6D5E1]'}`} />
            </div>
        </motion.div>
    );
};
