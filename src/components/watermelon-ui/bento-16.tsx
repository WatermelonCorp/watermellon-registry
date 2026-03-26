"use client";
import { motion, type Variants } from "motion/react";
import { useMemo, useState } from "react";
import { FaShield } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// const container:Variants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08 },
//   },
// };

const item:Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function PerformanceCard() {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="col-span-12 sm:col-span-6 lg:col-span-3"
    >
      <Card className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-neutral-200 min-h-[420px] h-full gap-0 ring-0 shadow-none">
        <CardContent className="h-[250px] flex items-center justify-center relative p-0">
          <svg viewBox="0 0 200 120" className="mt-4">
            <rect x="40" y="70" width="20" height="150" fill="#9DB4E0" />
            <rect x="70" y="55" width="20" height="145" fill="#9DB4E0" />
            <rect x="100" y="40" width="20" height="160" fill="#9DB4E0" />
            <rect x="130" y="25" width="20" height="175" fill="#9DB4E0" />
          </svg>

          <ArrowPathIcon className="  scale-140 absolute -translate-y-9 text-[#9DB4E0]" />
        </CardContent>

        <CardFooter className="text-center p-0 w-full flex-col items-center gap-1 bg-transparent border-none">
          <CardTitle className="text-2xl font-semibold text-neutral-800">
            Build for performance
          </CardTitle>
          <CardDescription className="text-sm text-neutral-500 mt-1">
            Grew 30,000+ strong global design community!!
          </CardDescription>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

const dots = [
  { t: "13%", l: "40%" },
  { t: "38%", l: "30%" },
  { t: "32%", l: "60%" },
  { t: "70%", l: "50%" },
  { t: "80%", l: "73%" },
  { t: "85%", l: "35%" },
];

const createDelays = (seed: number) =>
  dots.map((_, index) => {
    const value = Math.abs(Math.sin((index + 1) * seed) * 10000);
    return (value - Math.floor(value)) * 0.8;
  });

function EarthDots() {
  const [hovered, setHovered] = useState(false);

  const enterDelays = useMemo(() => createDelays(12.9898), []);
  const exitDelays = useMemo(() => createDelays(78.233), []);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="col-span-12 lg:col-span-6"
    >
      <Card className="bg-[#f3f4f6] rounded-md p-6 flex flex-col items-center border gap-12 border-[#e5e7eb] h-[420px] w-full ring-0 shadow-none">
        <CardContent className="relative w-full h-[210px] p-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="https://assets.watermelon.sh/Earth.svg"
              className="absolute inset-0 w-[350px] mx-auto h-full object-contain"
            />

            {dots.map((pos, i) => (
              <motion.div
                key={i}
                animate={
                  hovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
                }
                transition={{
                  duration: 0.3,
                  delay: hovered ? enterDelays[i] : exitDelays[i],
                }}
                className="absolute w-3 h-3 bg-slate-800 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.25)]"
                style={{ top: pos.t, left: pos.l }}
              />
            ))}
          </div>
        </CardContent>

        <CardFooter className="text-center flex flex-col gap-2 p-0 items-center bg-transparent border-none">
          <CardTitle className="text-3xl font-semibold text-neutral-800">
            Effortless funding
          </CardTitle>
          <CardDescription className="text-md text-neutral-500 font-normal max-w-[280px]">
            Grew 30,000+ strong global design community!!
          </CardDescription>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

const card:Variants = {
  hidden: { y: 80, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const skeletonItem:Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function ProjectQualificationCard() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="col-span-12 lg:col-span-3"
    >
      <Card className="h-[420px] rounded-xl p-6 flex flex-col overflow-hidden border border-white/20 bg-gradient-to-b from-[#9fb2d9] to-[#8ea4cf] gap-0 ring-0 shadow-none">
        <CardHeader className="space-y-2 p-0">
          <CardTitle className="text-2xl font-medium text-neutral-900 leading-tight">
            Project qualification and verification
          </CardTitle>

          <CardDescription className="text-md font-medium text-black/70 leading-tight">
            Grew 30,000+ strong global design community!!
          </CardDescription>
        </CardHeader>

        <CardContent className="flex items-end justify-center mt-6 p-0">
          <motion.div
            className="relative w-[200px] z-0 h-[260px] rounded-lg bg-white/60  p-4 flex flex-col gap-3 [mask-image:linear-gradient(to_bottom,#000000,transparent)]"
            variants={card}
          >
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                variants={skeletonItem}
                className="flex items-center gap-3"
              >
                <div className="size-6 rounded-full bg-white/40" />
                <div className="h-4 flex-1 rounded-full bg-white/40" />
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function GraphBar({ className, delay = 0, origin = "left" }:{className:string, delay?:number, origin?:"left"|"right"}) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className={`${className} ${
        origin === "left" ? "origin-left" : "origin-right"
      }`}
    />
  );
}

function Card5() {
  return (
    <motion.div
      variants={item}
      className="col-span-12 lg:col-span-6"
    >
      <Card className="bg-neutral-100 rounded-xl p-8 flex flex-col gap-10 min-h-[420px] ring-0 shadow-none border-0">
        <CardHeader className="p-0">
          <CardTitle className="text-lg text-neutral-800 font-normal">
            Tax liability optimize
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 flex flex-col gap-10">
          <div className="flex items-center gap-6">
            <GraphBar
              className="flex-1 h-16 bg-slate-700 rounded-lg"
              delay={0}
              origin="left"
            />
            <div className="text-md font-semibold text-neutral-700 leading-tight">
              <div>Tax credit</div>
              <div>$100000</div>
            </div>
          </div>

          <div className="flex items-center flex-row-reverse">
            <div className="text-center text-md font-semibold">
              <div className="text-neutral-700">Tax saving</div>
              <div className="text-neutral-700">$1200000</div>
            </div>

            <GraphBar
              className="w-16 h-16 bg-blue-300 rounded-xl mr-4"
              delay={0.2}
              origin="right"
            />
          </div>

          <div className="flex items-center justify-end gap-6">
            <GraphBar
              className="w-48 md:w-72 h-16 bg-blue-200 rounded-xl"
              delay={0.4}
              origin="left"
            />
            <div className="text-md font-semibold text-neutral-700 leading-tight">
              <div>Paid</div>
              <div>$500000</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Bento16() {
  return (
    <motion.div className="grid grid-cols-12 gap-4 p-6 md:p-10 lg:p-20 min-h-screen font-sans">
      <EarthDots />
      <ProjectQualificationCard />

      <motion.div
        variants={item}
        className="col-span-12 md:col-span-6 lg:col-span-3"
      >
        <Card className="bg-[#2f3d59] text-white rounded-2xl p-6 flex flex-col justify-between h-[420px] gap-0 ring-0 shadow-none border-0">
          <CardHeader className="space-y-2 p-0">
            <CardTitle className="text-lg font-semibold text-white">Ongoing support</CardTitle>
            <CardDescription className="text-sm text-white/70 leading-relaxed">
              Grew 30,000+ strong global design community!!
            </CardDescription>
          </CardHeader>

          <CardContent className="flex items-center justify-center w-full h-full p-0">
            <div className="relative w-[200px] h-[200px] md:w-[250px] md:h-[250px] flex items-center justify-center">
              <div className="absolute w-[80%] h-[80%] rounded-full bg-white/5" />
              <div className="absolute w-[65%] h-[65%] rounded-full bg-white/10" />
              <div className="absolute w-[50%] h-[50%] rounded-full bg-white/15" />

              <motion.div
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{
                  duration: 8,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="absolute w-full h-full rounded-full pointer-events-none z-0 will-change-transform"
              >
                <div
                  className="w-full h-full rounded-full z-0"
                  style={{
                    background:
                      "conic-gradient(from 0deg, rgba(255,255,255,0.18) 0deg 90deg, transparent 60deg 360deg)",
                  }}
                />
              </motion.div>
              <div className="absolute w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full bg-[#2f3e5a] border border-white/20 z-10" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <PerformanceCard />

      <motion.div
        variants={item}
        className="col-span-12 md:col-span-6 lg:col-span-3"
      >
        <Card className="bg-[#2f3e5a] text-white rounded-xl p-6 flex flex-col justify-between min-h-[420px] gap-0 ring-0 shadow-none border-0">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-semibold mb-2 text-white">Secure transactions</CardTitle>
            <CardDescription className="text-md text-white/70">
              Grew 30,000+ strong global design community!!
            </CardDescription>
          </CardHeader>

          <CardContent className="flex items-center justify-center p-0">
            <div className="relative w-[180px] h-[180px] md:w-[200px] md:h-[200px] flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-full h-full rounded-full bg-white/5"
              />
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-[80%] h-[80%] rounded-full bg-white/10"
              />
              <motion.div
                animate={{ scale: [1, 1.16, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-[60%] h-[60%] rounded-full bg-white/15"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-[45%] h-[45%] rounded-full bg-[#2f3e5a] border border-black/10 flex items-center justify-center"
              >
                <FaShield className="size-8 md:size-12 text-white/90 fill-white/90" />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Card5 />
    </motion.div>
  );
}

function ArrowPathIcon({ className, ...props }: { className?: string; [key: string]: unknown }) {
  return (
    <svg
      width="112"
      height="95"
      viewBox="0 0 112 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <motion.path
        d="M10 85 L10 75 C10 68 16 63 23 63 C30 63 36 57 36 50 C36 43 43 38 50 38 C57 38 64 32 64 26 C64 20 70 15 78 15 L90 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        variants={{ hover: { pathLength: 1, opacity: 1 } }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <motion.path
        d="M82 7 L90 15 L82 23"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        variants={{ hover: { pathLength: 1, opacity: 1 } }}
        transition={{ duration: 0.2, delay: 0.8 }}
      />
    </svg>
  );
}
