"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { X } from "lucide-react";
import { FaPen } from "react-icons/fa6";
import { MdDraw } from "react-icons/md";
import { FaCheckCircle, FaRedo } from "react-icons/fa";
import { useTheme } from "next-themes";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

interface DrawSignatureComponentProps {
  startLabel?: string;
  finishLabel?: string;
  doneLabel?: string;
  defaultStep?: "idle" | "drawing" | "done";
  onFinish?: (canvas: HTMLCanvasElement | null) => void;
  onClear?: () => void;
  onStepChange?: (step: "idle" | "drawing" | "done") => void;
}

export const DrawSignatureComponent: React.FC<DrawSignatureComponentProps> = ({
  startLabel = "Start Signing",
  finishLabel = "Finish Signing",
  doneLabel = "Signing Done",
  defaultStep = "idle",
  onFinish,
  onClear,
  onStepChange,
}) => {
  const [step, setStep] = useState<"idle" | "drawing" | "done">(defaultStep);
  const [ref, bounds] = useMeasure({ offsetSize: true });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [savedSignature, setSavedSignature] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  useEffect(() => {
    if (step === "drawing" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.strokeStyle = resolvedTheme === "dark" ? "#ffffff" : "#000000";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (savedSignature) {
        const img = new Image();
        img.src = savedSignature;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
      }
    }
  }, [step, resolvedTheme, savedSignature]);

  if (!mounted) return null;

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ("touches" in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ("touches" in e ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    setSavedSignature(null);
    onClear?.();
  };

  const finishSigning = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      setSavedSignature(dataUrl);
    }

    setStep("done");
    onFinish?.(canvasRef.current);
  };

  const penColor = resolvedTheme === "dark" ? "white" : "black";

  return (
    <MotionConfig
      transition={{
        type: "spring",
        bounce: 0.15,
        duration: 0.7,
      }}
    >
      <motion.div
        animate={{
          width: bounds.width > 0 ? bounds.width : "auto",
          height: bounds.height > 0 ? bounds.height : "auto",
        }}
        className={cn(
          "relative z-10 flex items-center justify-center overflow-hidden border-4 border-dashed border-transparent transition-colors duration-400 ease-out",
          step === "drawing" &&
            "border-4 border-dashed border-neutral-300 dark:border-neutral-700"
        )}
        style={{
          borderRadius: 32,
        }}
      >
        <div ref={ref} className="i flex shrink-0 p-1">
          <AnimatePresence mode="popLayout" initial={false}>
            {step === "idle" && (
              <motion.button
                key="start"
                // exit={{ opacity: 0, transition: { duration: 0 } }}
                layoutId="container-button"
                onClick={() => setStep("drawing")}
                className="flex items-center gap-2 rounded-full bg-neutral-100 px-8 py-5 text-lg font-bold text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
              >
                <motion.div layoutId="container-button-icon">
                  <MdDraw size={24} />
                </motion.div>
                <motion.span layoutId="container-button-text">
                  {startLabel}
                </motion.span>
              </motion.button>
            )}

            {step === "drawing" && (
              <motion.div
                key="pad"
                exit={{
                  opacity: 0,
                  y: "-30%",
                  x: "-10%",
                }}
                className="w-[320px] max-w-[320px] rounded-[34px] bg-white p-6 pb-4 will-change-transform dark:bg-neutral-900"
              >
                <div className="mb-6 flex items-center justify-between">
                  <button
                    onClick={clearCanvas}
                    className="text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
                  >
                    <FaRedo size={22} />
                  </button>

                  <span className="text-lg font-bold text-neutral-500 dark:text-neutral-400">
                    Sign
                  </span>

                  <button
                    onClick={() => setStep("idle")}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-400 text-white hover:bg-neutral-500 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <canvas
                  ref={canvasRef}
                  width={290}
                  height={200}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="h-[200px] w-full touch-none"
                  style={{
                    cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="${penColor}" stroke="${
                      resolvedTheme === "dark" ? "black" : "white"
                    }" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>') 0 22, auto`,
                  }}
                />

                <motion.button
                  layoutId="container-button"
                  exit={{ opacity: 0, transition: { duration: 0 } }}
                  whileTap={{ scale: 0.97 }}
                  onClick={finishSigning}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-neutral-100 px-6 py-4 text-lg font-bold text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
                >
                  <motion.div layoutId="container-button-icon">
                    <MdDraw size={28} />
                  </motion.div>
                  <motion.span layoutId="container-button-text">
                    {finishLabel}
                  </motion.span>
                </motion.button>
              </motion.div>
            )}

            {step === "done" && (
              <motion.div
                key="done"
                exit={{ opacity: 0, transition: { duration: 0 } }}
                className="flex items-center gap-3"
                layoutId="container-button"
              >
                <motion.div className="flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-4 text-lg font-bold text-white dark:bg-neutral-100 dark:text-neutral-900">
                  <motion.div layoutId="container-button-icon">
                    <FaCheckCircle size={24} />
                  </motion.div>
                  <motion.span layoutId="container-button-text">
                    {doneLabel}
                  </motion.span>
                </motion.div>

                <motion.button
                  // initial={{ scale: 0.5, opacity: 0 }}
                  // animate={{ scale: 1, opacity: 1 }}
                  onClick={() => setStep("drawing")}
                  className="rounded-full bg-neutral-100 p-4 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
                >
                  <FaPen size={22} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </MotionConfig>
  );
};
