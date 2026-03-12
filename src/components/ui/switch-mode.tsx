"use client";

import { useEffect, useState, type FC } from "react";
import { motion } from "framer-motion";
import { IoMoon, IoMoonOutline, IoSunny, IoSunnyOutline } from "react-icons/io5";
import { useTheme } from "next-themes";

/* --- Props --- */
interface SwitchModeProps {
    width?: number;
    height?: number;
    darkColor?: string;
    lightColor?: string;
    knobDarkColor?: string;
    knobLightColor?: string;
    borderDarkColor?: string;
    borderLightColor?: string;
}

export const SwitchMode: FC<SwitchModeProps> = ({
    width = 144,
    height = 72,
    darkColor = "#0B0B0B",
    lightColor = "#FFFFFF",
    knobDarkColor = "#2A2A2E",
    knobLightColor = "#F3F2F7",
    borderDarkColor = "#4C4C50",
    borderLightColor = "#D8D6E0",
}) => {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div style={{ width, height }} className="rounded-full border-2 border-transparent" />;
    }

    const isDark = resolvedTheme === "dark";
    const iconSize = height * 0.45;

    return (
        <motion.button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative flex items-center rounded-full border-2 transition-colors"
            style={{
                width,
                height,
                borderColor: isDark ? borderDarkColor : borderLightColor,
            }}
        >
            {/* TRACK */}
            <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ backgroundColor: isDark ? darkColor : lightColor }}
                transition={{ duration: 0.4 }}
            />

            {/* SLIDING KNOB */}
            <motion.div
                layout
                layoutId="switch-knob"
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute rounded-full border-2 z-30"
                style={{
                    width: height,
                    height,
                    right: isDark ? -2 : undefined,
                    left: isDark ? undefined : -2,
                    backgroundColor: isDark ? knobDarkColor : knobLightColor,
                    borderColor: isDark ? borderDarkColor : borderLightColor,
                }}
            />

            {/* SUN */}
            <motion.div
                className="relative z-30 flex items-center justify-center"
                style={{ width: height, height }}
                animate={{ rotate: isDark ? 45 : 0 }}
                transition={{ stiffness: 20 }}
            >
                {isDark ? (
                    <IoSunnyOutline
                        color="#8A8A8F"
                        fill="#8A8A8F"
                        stroke="#8A8A8F"
                        style={{ width: iconSize, height: iconSize }}
                        className="transition-colors duration-200"
                    />
                ) : (
                    <IoSunny
                        color="#686771"
                        fill="#686771"
                        style={{ width: iconSize, height: iconSize }}
                        className="transition-colors duration-200"
                    />
                )}
            </motion.div>

            {/* MOON */}
            <motion.div
                className="relative z-30 flex items-center justify-center"
                style={{ width: height, height }}
                animate={{ rotate: isDark ? 0 : 15 }}
                transition={{ stiffness: 20, damping: 14 }}
            >
                {isDark ? (
                    <IoMoon
                        color="#F4F4FB"
                        fill="#F4F4FB"
                        style={{ width: iconSize, height: iconSize }}
                        className="transition-colors duration-200"
                    />
                ) : (
                    <IoMoonOutline
                        color="#ABABB4"
                        fill="#ABABB4"
                        stroke="#ABABB4"
                        style={{ width: iconSize, height: iconSize }}
                        className="transition-colors duration-200"
                    />
                )}
            </motion.div>
        </motion.button>
    );
};


