"use client";

import { useEffect, useState, type FC } from "react";
import { motion } from "motion/react";
import {
  IoMoon,
  IoMoonOutline,
  IoSunny,
  IoSunnyOutline,
} from "react-icons/io5";
import { useTheme } from "next-themes";

interface SwitchModeProps {
  width?: number;
  height?: number;
}

export const SwitchMode: FC<SwitchModeProps> = ({
  width = 144,
  height = 72,
}) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  if (!mounted) {
    return (
      <div
        style={{ width, height }}
        className="theme-injected border-border rounded-lg border-2"
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const iconSize = height * 0.45;

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="theme-injected border-border bg-background relative flex items-center rounded-lg border-2 transition-colors"
      style={{ width, height }}
    >
      {/* TRACK */}
      <motion.div
        className="bg-background absolute inset-0 rounded-lg"
        transition={{ duration: 0.4 }}
      />

      {/* KNOB */}
      <motion.div
        layout
        layoutId="switch-knob"
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="border-border bg-muted shadow-xs absolute z-30 rounded-lg border-2"
        style={{
          width: height,
          height,
          right: isDark ? -2 : undefined,
          left: isDark ? undefined : -2,
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
            className="text-muted-foreground transition-colors duration-200"
            style={{ width: iconSize, height: iconSize }}
          />
        ) : (
          <IoSunny
            className="text-foreground transition-colors duration-200"
            style={{ width: iconSize, height: iconSize }}
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
            className="text-foreground transition-colors duration-200"
            style={{ width: iconSize, height: iconSize }}
          />
        ) : (
          <IoMoonOutline
            className="text-muted-foreground transition-colors duration-200"
            style={{ width: iconSize, height: iconSize }}
          />
        )}
      </motion.div>
    </motion.button>
  );
};
