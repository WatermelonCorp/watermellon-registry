import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  MotionConfig,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: Parameters<typeof useSpring>[1];
  as?: "span" | "div" | "p";
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

const MotionMap = {
  span: motion.span,
  div: motion.div,
  p: motion.p,
};

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = "span",
  decimals = 0,
  prefix = "",
  suffix = "",
}: AnimatedNumberProps) {
  const MotionComponent = MotionMap[as] || motion.span;

  const spring = useSpring(value, {
    stiffness: 120,
    damping: 20,
    ...springOptions,
  });

  const display = useTransform(spring, (current) => {
    const formatted = current.toFixed(decimals);
    const number = Number(formatted).toLocaleString();
    return `${prefix}${number}${suffix}`;
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <MotionComponent className={cn("tabular-nums", className)}>
      {display}
    </MotionComponent>
  );
}
const phoneVariants: Variants = {
  initial: { y: 100 },
  hover: {
    y: 20,
    transition: {
      duration: 0.4,
      ease: [0.65, 0, 0.35, 1],
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
};

const hiddenItem: Variants = {
  initial: { opacity: 0, y: 20 },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

const progressVariants: Variants = {
  initial: { strokeDashoffset: 230 },
  hover: {
    strokeDashoffset: 75.36,
    transition: {
      duration: 0.45,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

const barVariants: Variants = {
  initial: { scaleY: 0.5 },
  hover: {
    scaleY: 1,
    transition: {
      duration: 0.45,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

const FinancialWellnessCard = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <MotionConfig transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}>
      <motion.div
        initial="initial"
        whileHover="hover"
        animate="initial"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative col-span-1 flex flex-col items-center overflow-hidden rounded-3xl border border-white/5 bg-[#1a1a1a] px-6 pt-8 text-center md:col-span-3"
      >
        <Card className="h-full gap-0 overflow-hidden rounded-none border-0 bg-transparent p-0 ring-0">
          <CardHeader className="gap-0">
            <CardTitle className="mb-3 text-3xl font-semibold text-white">
              Financial Wellness
            </CardTitle>

            <CardDescription className="max-w-[340px] text-center text-lg leading-tight text-[#808080]">
              Gain control of your spending with intuitive tracking and
              categorization.
            </CardDescription>
          </CardHeader>

          <motion.div
            variants={phoneVariants}
            className="mt-10 w-full max-w-[360px] rounded-t-[52px] border-white/10 bg-neutral-800 [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)] p-5 pb-0 shadow-2xl"
          >
            <CardContent className="p-0">
              <div className="rounded-t-[32px] bg-neutral-900 px-1.5 py-5">
                <div className="mb-3 flex items-end justify-between px-3">
                  <span className="text-xs font-medium text-white/70">
                    9:30
                  </span>

                  <div className="flex items-center gap-1.5">
                    <div className="flex h-3 items-end gap-0.5">
                      <div className="h-1 w-[2px] bg-white/40"></div>
                      <div className="h-2 w-[2px] bg-white/40"></div>
                      <div className="h-3 w-[2px] bg-white"></div>
                    </div>

                    <svg
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                      />
                    </svg>

                    <div className="relative h-2.5 w-5 rounded-sm border border-white/30">
                      <div className="rounded-px absolute top-0.5 bottom-0.5 left-0.5 w-2 bg-white"></div>
                    </div>
                  </div>
                </div>

                <div className="mb-3 text-center leading-tight">
                  <h3 className="text-md font-medium text-white">
                    Welcome Back!
                  </h3>
                  <p className="text-xs text-neutral-500">Hi, Choudary Aoun</p>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <div className="flex min-h-[160px] flex-col items-start rounded-sm bg-[#1e1e1e] p-2.5">
                    <div className="flex items-center space-x-4">
                      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#252525]">
                        <div className="grid grid-cols-2 gap-0.5">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="h-1.5 w-1.5 rounded-sm border border-[#8b93ff]"
                            />
                          ))}
                        </div>
                      </div>

                      <span className="mb-4 text-xs text-neutral-400">
                        Projects
                      </span>
                    </div>

                    <div className="relative flex aspect-square w-full items-center justify-center">
                      <svg
                        className="h-full w-full -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#2a2a2a"
                          strokeWidth="8"
                        />

                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#8b93ff"
                          strokeWidth="8"
                          strokeDasharray="251.2"
                          strokeLinecap="round"
                          variants={progressVariants}
                        />
                      </svg>

                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[8px] text-neutral-500">
                          Liked By
                        </span>
                        <AnimatedNumber
                          value={isHovering ? 350 : 30}
                          className="text-sm font-bold text-[#8b93ff]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex min-h-[160px] flex-col items-start rounded-sm bg-[#1e1e1e] p-2.5">
                    <div className="flex items-center space-x-4">
                      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#252525] text-[#8b93ff]">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10"
                          />
                        </svg>
                      </div>

                      <span className="mb-4 text-xs text-neutral-400">
                        Analytic
                      </span>
                    </div>

                    <div className="mt-4 flex h-16 w-full items-end justify-between gap-1">
                      {[60, 80, 65, 95, 100, 40, 85, 50, 95, 45, 80, 70].map(
                        (h, i) => (
                          <motion.div
                            key={i}
                            variants={barVariants}
                            className="flex-1 origin-bottom rounded-2xl bg-[#8b93ff]"
                            style={{ height: `${h}%` }}
                          />
                        )
                      )}
                    </div>

                    <div className="mt-3 flex flex-col leading-tight">
                      <p className="text-[10px] text-neutral-500">This Week</p>
                      <p className="text-xs font-semibold text-[#8b93ff]">
                        63%
                      </p>
                    </div>
                  </div>

                  <motion.div
                    variants={hiddenItem}
                    className="flex min-h-[140px] flex-col items-start rounded-sm bg-[#3a3a3a] p-2.5"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black/20">
                        <svg
                          className="h-4 w-4 text-[#8b93ff]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682"
                          />
                        </svg>
                      </div>

                      <span className="mb-4 text-xs font-medium text-white">
                        Growth
                      </span>
                    </div>

                    <div
                      className="h-12 w-full bg-[#8b93ff] opacity-80"
                      style={{
                        clipPath:
                          "polygon(0 100%, 0 45%, 15% 35%, 30% 65%, 45% 15%, 60% 35%, 75% 5%, 90% 25%, 100% 15%, 100% 100%)",
                      }}
                    />
                  </motion.div>

                  <motion.div
                    variants={hiddenItem}
                    className="flex min-h-[140px] flex-col items-start rounded-sm bg-[#1e1e1e] p-2.5"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#252525]">
                        <div className="h-3 w-3 rounded-full border border-neutral-500"></div>
                      </div>

                      <span className="mb-4 text-xs text-neutral-400">
                        Projects
                      </span>
                    </div>

                    <p className="mt-auto text-[8px] text-neutral-500">
                      On Discussed
                    </p>

                    <p className="text-xs font-semibold text-[#8b93ff]">07</p>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </motion.div>
        </Card>
      </motion.div>
    </MotionConfig>
  );
};

const containerVariants: Variants = {
  initial: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  hover: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const barVariants2: Variants = {
  initial: {
    scaleY: 0.6,
  },
  hover: {
    scaleY: 1,
  },
};

const InvestmentGrowthCard = () => {
  const data = [140, 230, 205, 290, 245, 220, 170];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      animate="initial"
      className="col-span-1 flex flex-col items-center rounded-3xl border border-white/5 bg-[#1a1a1a] px-6 pt-8 text-center md:col-span-3"
    >
      <Card className="h-full w-full gap-0 overflow-hidden rounded-none border-0 bg-transparent p-0 ring-0">
        <CardHeader className="w-full flex-1 gap-0 text-center">
          <CardTitle className="mb-2 text-3xl font-semibold text-neutral-100">
            Investment Growth
          </CardTitle>

          <CardDescription className="mx-auto mb-8 max-w-[280px] text-center text-lg text-neutral-500">
            Explore diverse portfolios and watch your wealth flourish with
            expert guidance.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative mt-5 h-full w-full overflow-hidden rounded-t-2xl bg-[#242424] [mask-image:linear-gradient(to_right,black_80%,transparent_100%)] p-6">
          <motion.div className="absolute top-0 left-0 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-5 blur-2xl" />

          <div className="mb-6 flex items-center justify-between">
            <span className="text-lg font-medium text-neutral-100">
              Leaderboard
            </span>

            <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-neutral-400">
              Last 28 days
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            className="flex items-end justify-between gap-2 md:gap-4"
          >
            {data.map((height, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  variants={barVariants2}
                  transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
                  className={`w-full origin-bottom rounded-sm ${
                    i === 2 || i === 6 || i === 3
                      ? "bg-indigo-400"
                      : "bg-indigo-300"
                  }`}
                  style={{ height: `${height}px` }}
                />

                <span className="text-[10px] text-neutral-500 uppercase md:text-xs">
                  {months[i]}
                </span>
              </div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const BentoGrid13 = () => {
  const [value, setValue] = useState(0);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(250);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 font-sans text-white md:p-8">
      <motion.div
        className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
      >
        <FinancialWellnessCard />

        <InvestmentGrowthCard />

        <motion.div
          variants={itemVariants}
          className="col-span-1 flex min-h-[200px] flex-col items-center justify-center rounded-3xl border border-white/5 bg-[#1a1a1a] p-8 text-center md:col-span-3"
        >
          <Card className="h-full w-full gap-0 overflow-hidden rounded-none border-0 bg-transparent p-0 ring-0">
            <CardHeader className="w-full flex-1 items-center gap-0 text-center">
              <CardTitle className="text-3xl font-semibold text-neutral-100">
                Financial Planning
              </CardTitle>
              <CardDescription className="mb-4 text-lg text-neutral-400">
                Set goals and receive strategies for a secure future.
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="col-span-1 flex flex-col items-center rounded-3xl border border-white/5 bg-[#1a1a1a] p-8 text-center md:col-span-3"
        >
          <Card className="h-full w-full items-center gap-0 overflow-hidden rounded-none border-0 bg-transparent p-0 ring-0">
            <CardContent className="mb-6 flex items-center -space-x-3 overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="size-12 rounded-full border-4 border-[#1a1a1a] bg-indigo-300 md:size-16"
                ></div>
              ))}
            </CardContent>
            <CardHeader className="w-full flex-1 items-center gap-0 text-center">
              <CardTitle className="text-3xl font-semibold text-neutral-100">
                Community Support
              </CardTitle>
              <CardDescription className="text-lg text-neutral-500">
                Visit and share money to your friends instantly!
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="col-span-1 flex flex-col items-center rounded-3xl border border-white/5 bg-[#1a1a1a] p-8 text-center md:col-span-2"
        >
          <Card className="h-full w-full items-center gap-0 overflow-hidden rounded-none border-0 bg-transparent p-0 ring-0">
            <CardContent className="mb-6 size-16 rounded-xl bg-indigo-400 shadow-[0_0_20px_rgba(139,147,255,0.3)]"></CardContent>
            <CardHeader className="w-full flex-1 items-center gap-0 text-center">
              <CardTitle className="text-3xl font-semibold text-neutral-100">
                Expand & Save
              </CardTitle>
              <CardDescription className="text-lg text-neutral-500">
                Collect points and spends on growth.
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          viewport={{ once: true }}
          variants={itemVariants}
          className="col-span-1 flex flex-col items-center justify-center gap-1 rounded-3xl border border-white/5 bg-[#1a1a1a] p-8 text-center md:col-span-2"
        >
          <Card className="h-full w-full items-center gap-0 overflow-hidden rounded-none border-0 bg-transparent p-0 ring-0">
            <CardContent className="flex w-full items-center justify-between">
              <span className="mx-auto flex  text-center text-5xl font-bold text-indigo-400 tabular-nums md:text-7xl">
                $
                <AnimatedNumber
                  value={value}
                  className="text-center text-5xl font-bold text-indigo-400 md:text-7xl"
                />
                K
              </span>
            </CardContent>
            <CardHeader className="w-full flex-1 items-center gap-0 text-center">
              <CardTitle className="text-3xl font-semibold text-neutral-100">
                Expert Advice
              </CardTitle>
              <CardDescription className="text-lg text-neutral-500">
                Access tailored financial recommendations!
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="col-span-1 flex flex-col items-center rounded-3xl border border-white/5 bg-[#1a1a1a] p-8 text-center md:col-span-2"
        >
          <Card className="h-full w-full items-center gap-0 overflow-hidden rounded-none border-0 bg-transparent p-0 ring-0">
            <CardContent className="mb-6 flex size-16 items-center justify-center rounded-xl bg-[#8b93ff] shadow-[0_0_20px_rgba(139,147,255,0.3)]">
              <svg
                className="size-12 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l2.4 7.2h7.6l-6.1 4.5 2.3 7.3-6.2-4.5-6.2 4.5 2.3-7.3-6.1-4.5h7.6z" />
              </svg>
            </CardContent>
            <CardHeader className="w-full flex-1 items-center gap-0 text-center">
              <CardTitle className="text-3xl font-semibold text-neutral-100">
                Expert Advice
              </CardTitle>
              <CardDescription className="text-lg text-neutral-500">
                Access tailored financial recommendations!
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BentoGrid13;
