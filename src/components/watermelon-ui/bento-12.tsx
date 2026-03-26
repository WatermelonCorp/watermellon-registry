"use client";
import { motion, type Variants } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
      <CardHeader className="flex w-full flex-1 flex-col">
        {title && <CardTitle className="w-full text-white">{title}</CardTitle>}
        {description && (
          <CardDescription className="text-neutral-600">
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
const dots = [
  { x: "50%", y: "10%" },
  { x: "50%", y: "90%" },
  { x: "-10%", y: "30%" },
  { x: "-10%", y: "70%" },
  { x: "15%", y: "50%" },
  { x: "110%", y: "30%" },
  { x: "110%", y: "70%" },
  { x: "85%", y: "50%" },
];
const delays = dots.map(() => BASE_DELAY + Math.random() * 0.8);
const BentoGrid12 = () => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const lineVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.6, ease: "easeInOut" },
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

  const barVariants: Variants = {
    hidden: { height: 0, opacity: 0 },
    visible: (height: number) => ({
      height,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
    }),
  };

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
            animate="visible"
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
                  initial="hidden"
                  animate="visible"
                  d="M36.4893 124.6C53.1559 165.6 88.8893 223 98.4893 124.6C110.489 1.60049 134.989 101.1 144.489 124.6C152.089 143.4 163.323 136.434 167.989 130.601C171.156 119.601 181.189 113.101 195.989 175.101C210.789 237.101 221.823 171.267 225.489 130.601C226.323 120.767 234.289 101.101 259.489 101.101C284.689 101.101 286.489 97.769 289.489 73.1024C292.489 62.6024 289.727 42.6009 309.489 42.6C333.989 42.5988 379.323 46.9333 392.489 44.1"
                  stroke="#E13D14"
                  strokeWidth="3"
                />
                <g filter="url(#filter0)">
                  <motion.path
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
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

        <BentoCard
          className="col-span-1 flex flex-col py-4 sm:px-8 md:col-span-3"
          title={
            <span className="block text-center text-2xl font-bold text-neutral-200 md:text-3xl">
              Outwork Yesterday
            </span>
          }
          description={
            <span className="md:text-md block text-center text-sm text-neutral-600">
              Track your stats and see how you stack up. Consistent effort
              deserves to be recognized.
            </span>
          }
        >
          <div className="relative flex h-[300px] flex-col items-center space-y-6 overflow-hidden rounded-3xl border border-white/10 bg-[#1a1a1a] p-4 md:h-[325px] md:rounded-4xl md:p-8">
            <div className="absolute top-0 left-0 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-5 blur-2xl" />
            <div className="flex h-full w-full flex-col space-y-6">
              <div className="flex w-full items-center justify-between">
                <span className="text-lg font-medium text-neutral-400 md:text-2xl">
                  Monthly Graph
                </span>
                <span className="rounded-full bg-neutral-950 px-3 py-2 text-[10px] text-neutral-400 shadow-[inset_0_1px_0px_rgba(255,255,255,0.2)] md:text-xs">
                  This Year
                </span>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex h-full w-full items-center gap-2 md:gap-3"
              >
                {[140, 170, 110, 80, 135, 190, 135].map((height, i) => (
                  <div
                    key={i}
                    className="flex h-full flex-1 flex-col items-center justify-end"
                  >
                    <motion.div
                      variants={barVariants}
                      custom={height}
                      className="w-full rounded-t-sm bg-gradient-to-b from-orange-900 to-orange-600 shadow-[0_0_15px_rgba(255,69,0,0.3)]"
                    />
                    <span className="mt-2 text-[10px] text-neutral-600 md:text-xs">
                      {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"][i]}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </BentoCard>

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
                <div className="z-10 flex size-12 items-center justify-center rounded-full border-6 border-orange-800 bg-white shadow-[0_0_20px_rgba(255,69,0,0.5)]">
                  <div className="size-6 rounded-full bg-blue-500" />
                </div>
                {dots.map((dot, i) => {
                  return (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: delays[i],
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e64010]"
                      style={{ left: dot.x, top: dot.y }}
                    />
                  );
                })}
              </div>
            </div>
          </BentoCard>

          <BentoCard className="flex items-center justify-center p-2">
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
              animate="visible"
              className="flex justify-center -space-x-3 sm:justify-end"
            >
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  variants={avatarVariants}
                  custom={i}
                  className="flex size-12 items-center justify-center rounded-full bg-orange-700 p-1 md:size-16"
                >
                  <div className="size-full rounded-full border-2 border-black md:border-3" />
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
