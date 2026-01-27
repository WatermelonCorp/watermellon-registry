"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

/*  useLoop HOOK  */

const useLoop = (delay = 1000) => {
  const [key, setKey] = useState(0);

  const incrementKey = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const interval = setInterval(incrementKey, delay);
    return () => clearInterval(interval);
  }, [delay, incrementKey]);

  return { key };
};

export { useLoop };

/*  TYPES  */

interface LoopHookProps {
  items?: string[];
  delay?: number;
  title?: string;
}

/*  COMPONENT  */

export const LoopHook = ({
  items,
  delay = 1000,
  title = "useLoop hook",
}: LoopHookProps) => {
  const { key } = useLoop(delay);

  const array = useMemo(
    () =>
      items ?? [
        "Tik-Tik uno",
        "Tik-Tik dos",
        "Tik-Tik tres",
        "Tik-Tik cuatro",
        "Tik-Tik cinco",
        "Tik-Tik seis",
        "Tik-Tik siete",
        "Tik-Tik ocho",
        "Tik-Tik nueve",
        "Tik-Tik diez",
      ],
    [items]
  );

  const currentItem = useMemo(() => {
    return array[key % array.length];
  }, [array, key]);

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8 h-screen bg-[#121212] w-full">
      <div className="mb-10 grid content-start justify-items-center gap-6 text-center">
        <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-70 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-[''] text-[#f1f1f1]">
          {title}
        </span>
        <div className="h-32 w-[1.6px] bg-gradient-to-b from-zinc-700 to-transparent mt-6" />
      </div>

      <AnimatePresence mode="popLayout">
        <motion.h1
          key={key}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.3 }}
          className="bordr whitespace-nowrap text-center text-[#f1f1f1]"
        >
          {currentItem}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};
