"use client";

import { useState, type FC } from "react";
import { motion } from "motion/react";
import { IoMoon, IoMoonOutline, IoSunny, IoSunnyOutline } from "react-icons/io5";

/* --- Props --- */
interface SwitchModeProps {
  initialDark?: boolean;
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
  initialDark = false,
  width = 144,
  height = 72,
  darkColor = "#0B0B0B",
  lightColor = "#FFFFFF",
  knobDarkColor = "#2A2A2E",
  knobLightColor = "#F3F2F7",
  borderDarkColor = "#4C4C50",
  borderLightColor = "#D8D6E0",
}) => {
  const [dark, setDark] = useState<boolean>(initialDark);

  return (
    <div
      className={`flex min-h-screen items-center justify-center transition-colors duration-500`}
      style={{ backgroundColor: dark ? "#000" : "#fff" }}
    >
      <motion.button
        onClick={() => setDark(!dark)}
        className="relative flex items-center rounded-full border-2 transition-colors"
        style={{
          width,
          height,
          borderColor: dark ? borderDarkColor : borderLightColor,
        }}
      >
        {/* TRACK */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ backgroundColor: dark ? darkColor : lightColor }}
          transition={{ duration: 0.4 }}
        />

        {/* SLIDING KNOB */}
        <motion.div
          layout
          layoutId="switch-knob"
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="absolute rounded-full border-[3px] z-30"
          style={{
            width: height,
            height,
            right: dark ? -2 : undefined,
            left: dark ? undefined : -2,
            backgroundColor: dark ? knobDarkColor : knobLightColor,
            borderColor: dark ? borderDarkColor : borderLightColor,
          }}
        />

        {/* SUN */}
        <motion.div
          className="relative z-30 flex items-center justify-center"
          style={{ width: height, height }}
          animate={{ rotate: dark ? 45 : 0 }}
          transition={{ stiffness: 20 }}
        >
          {dark ? (
            <IoSunnyOutline className="h-[36px] w-[36px] text-[#8A8A8F] hover:text-[#a5a5ab] transition-colors duration-200" />
          ) : (
            <IoSunny className="h-[36px] w-[36px] text-[#686771]" />
          )}
        </motion.div>

        {/* MOON */}
        <motion.div
          className="relative z-30 flex items-center justify-center"
          style={{ width: height, height }}
          animate={{ rotate: dark ? 0 : 15 }}
          transition={{ stiffness: 20, damping: 14 }}
        >
          {dark ? (
            <IoMoon className="h-[36px] w-[36px] text-[#F4F4FB]" />
          ) : (
            <IoMoonOutline className="h-[36px] w-[36px] text-[#ABABB4] hover:text-[#95959c] transition-colors duration-200" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

