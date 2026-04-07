"use client";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { GiJumpingRope } from "react-icons/gi";
import { TbTreadmill } from "react-icons/tb";
import { GrYoga } from "react-icons/gr";
import { GiMeditation } from "react-icons/gi";

const BASE_DELAY = 0.3;

const BentoCard = ({
  title,
  description,
  children,
  className,
  ...props
}: {
  title?: React.ReactElement;
  description?: React.ReactElement;
  children?: React.ReactNode;
  className?: string;
}) => (
  <Card
    className={cn(
      "rounded-3xl border border-white/5 bg-[#121212] text-white",
      className
    )}
    {...props}
  >
    {(title || description) && (
      <CardHeader className="flex w-full flex-1 flex-col text-center">
        {title && <CardTitle className="w-full text-white">{title}</CardTitle>}
        {description && (
          <CardDescription className="w-full text-center text-neutral-600">
            {description}
          </CardDescription>
        )}
      </CardHeader>
    )}
    <CardContent
      className={cn(!title && !description ? "p-0" : "w-full md:w-auto")}
    >
      {children}
    </CardContent>
  </Card>
);

const PatternIcon10 = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        width="28"
        height="28"
        transform="matrix(-1 0 0 1 28 0)"
        fill="url(#pattern10)"
      />

      <defs>
        <pattern
          id="pattern10"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image10" transform="scale(0.01)" />
        </pattern>

        <image
          id="image10"
          width="100"
          height="100"
          preserveAspectRatio="none"
          href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

type IconProps = {
  className?: string;
};

const PatternIconSmall = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="20" height="20" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image0" transform="scale(0.01)" />
        </pattern>
        <image
          id="image0"
          width="100"
          height="100"
          preserveAspectRatio="none"
          href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

const PatternIconSmall2 = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="20" height="20" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image0" transform="scale(0.01)" />
        </pattern>
        <image
          id="image0"
          width="100"
          height="100"
          preserveAspectRatio="none"
          href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};
const PatternIconSmall3 = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="20" height="20" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image0" transform="scale(0.01)" />
        </pattern>
        <image
          id="image0"
          width="100"
          height="100"
          preserveAspectRatio="none"
          href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

const yearlyData = [140, 170, 110, 80, 135, 190, 135];
const monthlyData = [80, 120, 70, 50, 95, 140, 100];
const CHART_HEIGHT = 220;
const BAR_WIDTH = 50;
const GAP = 14;
const labelsYear = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"];
const BarGraphCard = () => {
  const [isYear, setIsYear] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsYear((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const data = isYear ? yearlyData : monthlyData;
  const labels = labelsYear;

  return (
    <BentoCard
      className="col-span-1 flex flex-col py-4 sm:px-8 md:col-span-3"
      title={
        <span className="block text-center text-2xl font-bold text-neutral-200 md:text-3xl">
          Outwork Yesterday
        </span>
      }
      description={
        <span className="md:text-md w-full text-center text-sm text-neutral-600">
          Track your stats and see how you stack up.
        </span>
      }
    >
      <div className="relative flex flex-col space-y-6 overflow-hidden rounded-3xl border border-white/10 bg-[#1a1a1a] p-4 md:p-8">
        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-medium text-neutral-400 md:text-2xl">
            Monthly Graph
          </span>

          <motion.span
            layout
            className="inline-flex items-center justify-center overflow-hidden rounded-full bg-neutral-950 px-3 py-2 text-[10px] text-neutral-400 shadow-[inset_0_1px_0px_rgba(255,255,255,0.2)] md:text-xs"
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={isYear ? "year" : "month"}
                initial={{
                  opacity: 0,
                  filter: "blur(4px)",
                  y: isYear ? -20 : 20,
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  filter: "blur(4px)",
                  y: isYear ? 20 : -20,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="block"
              >
                {isYear ? "2026" : "2025"}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </div>

        {/* CHART */}
        <div className="w-full">
          <motion.svg
            viewBox={`0 0 ${data.length * (BAR_WIDTH + GAP)} ${CHART_HEIGHT}`}
            className="ml-1 w-full"
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c2d12" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>

            {data.map((height, i) => {
              const x = i * (BAR_WIDTH + GAP);

              return (
                <motion.rect
                  key={i}
                  x={x}
                  width={BAR_WIDTH}
                  rx={4}
                  initial={{
                    height: 0,
                    y: CHART_HEIGHT,
                  }}
                  animate={{
                    height,
                    y: CHART_HEIGHT - height,
                  }}
                  transition={{
                    duration: 0.6,

                    delay: isYear ? i * 0.08 : (data.length - 1 - i) * 0.08,

                    ease: [0.65, 0, 0.35, 1],
                  }}
                  fill="url(#barGradient)"
                />
              );
            })}
          </motion.svg>

          {/* LABELS */}
          <div className="mt-3 flex justify-between px-1">
            {labels.map((label, i) => (
              <span
                key={i}
                className="w-[40px] text-center text-[10px] text-neutral-600 md:text-xs"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
};
const dots = [
  { x: "50%", y: "10%", icon: PatternIconSmall3 },
  { x: "50%", y: "90%", icon: PatternIconSmall2 },
  { x: "-10%", y: "30%", icon: PatternIconSmall },
  { x: "-10%", y: "70%", icon: GiJumpingRope },
  { x: "15%", y: "50%", icon: TbTreadmill },
  { x: "110%", y: "30%", icon: GrYoga },
  { x: "110%", y: "70%", icon: GiMeditation },
  { x: "85%", y: "50%", icon: GiJumpingRope },
];
const delays = dots.map(() => BASE_DELAY + Math.random() * 0.8);
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  hover: {
    scale: 1.02,
  },
};

const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 0.5,
    opacity: 1,
    transition: { duration: 1.6, ease: "easeInOut" },
  },
  hover: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const avatarVariants: Variants = {
  hidden: { x: 60, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: BASE_DELAY + i * 0.07,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};
const images = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/78.jpg",
  "https://randomuser.me/api/portraits/women/40.jpg",
];
const BentoGrid12 = () => {
  return (
    <div className="min-h-screen bg-black p-4 font-sans text-white md:p-8">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-6">
        <BentoCard
          className="col-span-1 flex flex-col items-center justify-between overflow-hidden pt-8 pl-8 md:col-span-6 md:flex-row"
          title={
            <span className="flex-1 text-3xl leading-tight font-bold tracking-tight md:text-4xl">
              Train Smarter
              <br />
              See Results Faster
            </span>
          }
          description={
            <span className="text-base leading-relaxed text-neutral-600 md:text-lg">
              Sync your health data to merge expert workouts with your personal
              biometrics. Every rep, run, and ring closed, visualized.
            </span>
          }
        >
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            className="relative flex w-full flex-col items-center space-y-6 overflow-hidden rounded-tl-3xl border border-white/10 bg-[#1a1a1a] mask-r-from-0% [mask-image:linear-gradient(to_top,transparent_0%,black_40%)] p-6 md:w-[350px] md:rounded-tl-4xl"
          >
            <div className="absolute top-0 left-0 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/8 blur-2xl" />
            <div className="flex w-full items-center justify-between">
              <span className="text-2xl font-bold text-white md:text-3xl">
                83k
              </span>
              <div className="mt-1 flex gap-2">
                <span className="rounded-full bg-black px-2 py-1 text-[10px] text-neutral-400 shadow-[inset_0_1px_0px_rgba(255,255,255,0.2)] md:text-xs">
                  ACTIVITY
                </span>
                <span className="rounded-full bg-black px-2 py-1 text-[10px] text-neutral-400 shadow-[inset_0_1px_0px_rgba(255,255,255,0.2)] md:text-xs">
                  USERS
                </span>
              </div>
            </div>
            <div className="flex w-full flex-col-reverse items-start gap-4">
              {[0, 2, 4, 6, 8, 10].map((val) => (
                <div key={val} className="flex w-full items-center gap-4">
                  <span className="w-6 text-right text-xs font-medium text-neutral-600 md:text-sm">
                    {val}k
                  </span>
                  <div className="h-[1px] w-full bg-white/5" />
                </div>
              ))}
              <svg
                width="336"
                height="238"
                viewBox="0 0 336 238"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute flex w-full sm:-translate-x-20 sm:scale-x-150 md:translate-x-0 md:scale-x-100"
              >
                <motion.path
                  variants={lineVariants}
                  d="M36.4893 124.6C53.1559 165.6 88.8893 223 98.4893 124.6C110.489 1.60049 134.989 101.1 144.489 124.6C152.089 143.4 163.323 136.434 167.989 130.601C171.156 119.601 181.189 113.101 195.989 175.101C210.789 237.101 221.823 171.267 225.489 130.601C226.323 120.767 234.289 101.101 259.489 101.101C284.689 101.101 286.489 97.769 289.489 73.1024C292.489 62.6024 289.727 42.6009 309.489 42.6C333.989 42.5988 379.323 46.9333 392.489 44.1"
                  stroke="#E13D14"
                  strokeWidth="3"
                />
                <motion.path
                  d="M36.4893 124.6C53.1559 165.6 88.8893 223 98.4893 124.6C110.489 1.60049 134.989 101.1 144.489 124.6C152.089 143.4 163.323 136.434 167.989 130.601C171.156 119.601 181.189 113.101 195.989 175.101C210.789 237.101 221.823 171.267 225.489 130.601C226.323 120.767 234.289 101.101 259.489 101.101C284.689 101.101 286.489 97.769 289.489 73.1024C292.489 62.6024 289.727 42.6009 309.489 42.6C333.989 42.5988 379.323 46.9333 392.489 44.1"
                  stroke="#ffffff10"
                  strokeWidth="3"
                />
                <g filter="url(#filter0)">
                  <motion.path
                    variants={lineVariants}
                    d="M36.4893 124.601C53.1559 165.601 88.8893 223.001 98.4893 124.601C110.489 1.60086 134.989 101.101 144.489 124.601C152.089 143.401 163.323 136.434 167.989 130.601C171.156 119.601 181.189 113.101 195.989 175.101C210.789 237.101 221.823 171.268 225.489 130.601C226.323 120.768 234.289 101.101 259.489 101.101C284.689 101.101 287.989 97.7674 290.989 73.1007C293.989 62.6007 308.727 36.6004 328.489 36.6C347.489 36.5996 377.323 51.9324 390.489 49.0991"
                    stroke="#E13D14"
                    strokeOpacity="0.67"
                    strokeWidth="3"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0"
                    x="-0.000389099"
                    y="-2.28882e-05"
                    width="425.905"
                    height="237.125"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="17.55"
                      result="effect1_foregroundBlur"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </motion.div>
        </BentoCard>
        <BarGraphCard />

        <div className="col-span-1 grid grid-cols-1 gap-4 md:col-span-3">
          <BentoCard
            className="relative flex min-h-[250px] flex-col items-center justify-center overflow-hidden py-4"
            title={
              <span className="block text-center text-2xl font-bold">
                Find Your Flow
              </span>
            }
          >
            <div className="flex w-full items-center justify-center">
              <div className="relative flex h-32 w-40 items-center justify-center">
                {/* CENTER NODE */}
                <div className="z-10 flex size-12 items-center justify-center rounded-full border-6 border-orange-800 bg-white shadow-[0_0_20px_rgba(255,69,0,0.5)]">
                  <div className="size-6 rounded-full bg-blue-500" />
                </div>

                {dots.map((dot, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      opacity: 1,
                      scale: [1, 0.85, 1],
                      transition: {
                        scale: {
                          delay: delays[i],
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      },
                    }}
                    className="absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#e64010]"
                    style={{ left: dot.x, top: dot.y }}
                  >
                    <dot.icon className="size-6 text-black" />
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoCard>

          <BentoCard className="relative flex items-center justify-center p-6">
            <motion.div
              className="absolute top-4 sm:left-12 left-6"
              animate={{ scale: [1, 0.8, 1], rotate: [0, 180, 0] }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
            >
              <PatternIcon10 className="size-8" />
            </motion.div>

            <motion.div
              className="absolute sm:right-12 bottom-4 right-6"
              animate={{ scale: [1, 0.8, 1], rotate: [0, 180, 0] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1,
              }}
            >
              <PatternIcon10 className="size-8" />
            </motion.div>

            <h3 className="text-center text-2xl font-bold text-white">
              Never the Same Workout Twice
            </h3>
          </BentoCard>

          <BentoCard
            className="flex flex-col items-center justify-between gap-4 p-2 sm:flex-row"
            title={
              <span className="mx-auto block w-[120px] text-center text-2xl leading-tight font-bold sm:text-left">
                Train with
                <br />
                the Elite
              </span>
            }
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="flex justify-center -space-x-3 sm:justify-end"
            >
              {images.map((img, i) => (
                <motion.div
                  key={i}
                  variants={avatarVariants}
                  custom={i}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    zIndex: 50,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative flex size-12 cursor-pointer items-center justify-center rounded-full bg-orange-700 p-1 md:size-16"
                >
                  <div className="relative size-full overflow-hidden rounded-full border-2 border-black md:border-3">
                    <img
                      src={img}
                      alt="avatar"
                      className="absolute inset-0 size-full rounded-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid12;
