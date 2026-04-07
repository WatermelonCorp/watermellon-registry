"use client";
import React from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BentoCard = ({ children, className, title, description }: { children: React.ReactNode, className?: string, title?: React.ReactNode, description?: React.ReactNode }) => (
  <Card
    className={cn(
      "group relative min-h-[340px] cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 p-0",
      className
    )}
  >
    <CardContent className="mb-6 flex h-[250px] w-full flex-1 items-center justify-center pt-2">
      {children}
    </CardContent>

    <CardFooter className="z-10 flex flex-col items-center justify-center gap-2 pb-4 text-center bg-transparent border-none">
      <h3 className="mx-auto line-clamp-2 text-center text-3xl leading-tight font-medium tracking-tight text-neutral-200">
        {title}
      </h3>

      <p className="mx-auto max-w-[280px] text-xs leading-tight text-neutral-600">
        {description}
      </p>
    </CardFooter>
  </Card>
);

const GlowingOrb = ({
  color,
  className,
}: {
  color: string;
  className?: string;
}) => (
  <div
    className={cn(
      "absolute flex h-64 w-64 items-center justify-center transition-all duration-300 ease-out",
      className
    )}
  >
    <motion.div
      className="absolute h-38 w-38 rounded-full opacity-10"
      style={{ backgroundColor: color }}
      animate={{
        opacity: [0, 0.1, 0],
      }}
      transition={{
        duration: 1,
        delay: 0.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.5,
      }}
    />

    <motion.div
      className="absolute h-32 w-32 rounded-full opacity-15"
      style={{ backgroundColor: color }}
      animate={{
        opacity: [0, 0.15, 0],
      }}
      transition={{
        duration: 1,
        delay: 0.2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.5,
      }}
    />

    <div className="absolute h-26 w-26 rounded-full bg-black shadow-lg" />

    <div
      className="absolute h-20 w-20 rounded-full shadow-[inset_0px_4px_8px_0px_rgba(255,255,255,0.25),inset_0px_2px_1px_rgba(0,0,0,0.56),1px_2px_4px_2px_rgba(0,0,0,0.25)]"
      style={{
        background: `linear-gradient(to bottom, ${color}, ${color}90 )`,
      }}
    />
  </div>
);

const KeysList = () => {
  return (
    <div className="grid grid-cols-6 gap-2 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]">
      {Array(18)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="rounded-sm bg-gradient-to-b from-white/20 to-white/5 p-[1.5px] shadow-[0_0_4px_rgba(0,0,0,0.5)]"
          >
            <div className="h-12 w-12 rounded-sm bg-neutral-900" />
          </div>
        ))}
    </div>
  );
};

export default function BentoGrid8() {
  return (
    <div className="min-h-screen bg-black p-6 font-sans md:p-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <BentoCard
          title="Intelligence with Integrity"
          description="Experience a feed that adapts to you, built on a foundation of absolute privacy."
        >
          <KeysList />
          <GlowingOrb className="left-1/2 -translate-x-1/2" color="#BB3EC5" />
        </BentoCard>

        <BentoCard
          title="Unlock Deeper Knowledge"
          description="Go from long-form articles to core insights at the speed of thought."
        >
          <AuroraSvgBackground />
          <GetInfoButton />
        </BentoCard>

        <BentoCard
          title="Your Personal Information Hub"
          description="Unify your digital world. Bring every source you love into one elegant space."
        >
          <KeysList />
          <GlowingOrb className="left-1/2 -translate-x-1/2" color="#42E7FE" />
        </BentoCard>

        <BentoSource />

        <BentoCard
          className="md:col-span-2"
          title="Interest-Based Content Filtering"
          description="Simply select your topics of interest for a highly relevant and focused feed from the start."
        >
          <InterestsMarquee />
        </BentoCard>
      </div>
    </div>
  );
}

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" {...props}>
      <path
        d="M4.97062 18.3755L0.303955 0.375488L16.304 8.37549C8.30396 8.90882 5.41507 15.2644 4.97062 18.3755Z"
        fill="black"
        stroke="white"
        strokeWidth="0.4"
      />
    </svg>
  );
}

const GetInfoButton = () => {
  return (
    <div className="relative flex items-center justify-center p-8">
      <div className="relative inline-flex items-center justify-center">
        <button className="relative z-10 rounded-full border-[8px] border-neutral-950 bg-[#222325] px-16 py-3 text-xl text-neutral-300 shadow-[inset_2px_2px_8px_rgba(0,0,0,0.4),inset_1px_1px_1px_rgba(255,255,255,0.2)]">
          Get info
        </button>
      </div>
    </div>
  );
};

const BentoSource = () => {
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <Card
      className={cn(
        "group relative min-h-[340px] cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 p-0"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardContent className="mb-6 flex h-[250px] w-full flex-1 items-center justify-center pt-2">
        <div className="relative w-full max-w-[200px]">
          <div className="mask-b-blur-xl rounded-xl border border-white/10 bg-white/5 mask-b-from-0% mask-b-to-100% p-4">
            <div className="mb-3 flex items-center gap-1">
              <div className="size-7 rounded-full bg-white/20"></div>
              <div className="h-2 w-12 rounded-full bg-white/20" />
              <div className="h-2 w-20 rounded-full bg-white/20" />
            </div>

            <div className="mb-2 h-2 w-full rounded-full bg-white/20" />
            <div className="mb-6 h-2 w-2/3 rounded-full bg-white/20" />
          </div>

          <div className="absolute -bottom-6 left-1/2 z-20 -translate-x-1/2">
            <div className="relative rounded-full p-1 shadow-[inset__0px_0px_4px_0px_rgba(255,255,255,0.5)]">
              <div className="h-12 w-12 rounded-full bg-gradient-to-b from-cyan-400 to-cyan-500/50 shadow-[inset_5px_10px_20px_rgba(255,255,255,0.1),inset_-10px_-15px_20px_rgba(0,0,0,0.2)]" />

              <motion.div
                className="absolute -right-2 -bottom-2"
                animate={{
                  y: isHovering ? -2 : 0,
                  x: isHovering ? -50 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  animate={{
                    rotate: isHovering ? 45 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <ArrowIcon />
                </motion.div>
                <motion.div
                  className="absolute -right-12 rounded-tr-2xl rounded-b-2xl bg-gradient-to-b from-cyan-400 to-cyan-400/70 px-4 py-1 text-[10px] font-bold text-black"
                  animate={{
                    opacity: isHovering ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  Kyle
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="z-10 flex flex-col items-center justify-center gap-2 pb-4 text-center bg-transparent border-none">
        <h3 className="mx-auto line-clamp-2 text-center text-3xl leading-tight font-medium tracking-tight text-neutral-200">
          Become the Source
        </h3>

        <p className="mx-auto max-w-[280px] text-xs leading-tight text-neutral-600">
          AI-distilled insights, ready to share. Elevate your voice in any
          conversation.
        </p>
      </CardFooter>
    </Card>
  );
};

const interests1 = [
  "Developer",
  "Founder",
  "Engineer",
  "Writer",
  "Marketer",
  "Product",
  "Creator",
  "Researcher",
  "Artist",
  "Builder",
  "Strategist",
];

const interests2 = [
  "Developer",
  "Founder",
  "Engineer",
  "Designer",
  "Writer",
  "Marketer",
  "Product",
  "Creator",
  "Researcher",
  "Artist",
  "Builder",
  "Strategist",
];

const interests3 = [
  "Developer",
  "Founder",
  "Engineer",
  "Writer",
  "Marketer",
  "Product",
  "Creator",
  "Researcher",
  "Artist",
  "Builder",
  "Strategist",
];

function InterestsMarquee() {
  return (
    <div className="relative overflow-hidden py-3">
      <div
        className="space-y-4"
        style={{
          maskImage:
            "radial-gradient(ellipse 50% 100% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 100% at 50% 50%, black 10%, transparent 80%)",
        }}
      >
        <div className="opacity-80 blur-[1px]">
          <Row items={interests1} />
        </div>

        <Row reverse items={interests2} />

        <div className="opacity-80 blur-[1px]">
          <Row items={interests3} />
        </div>
      </div>
    </div>
  );
}

const Row = ({
  reverse = false,
  items,
}: {
  reverse?: boolean;
  items: string[];
}) => {
  const loopItems = [...items, ...items];

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: 35,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex w-max gap-4"
      >
        {loopItems.map((item, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center rounded-full border px-6 py-3 text-sm whitespace-nowrap",
              item === "Designer"
                ? "border-white/10 bg-gradient-to-r from-blue-600/40 to-blue-300/50 text-white"
                : "border-white/10 bg-neutral-800/80 text-neutral-400"
            )}
          >
            <span className="mr-3 h-4 w-4 rounded-full bg-orange-500" />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const AuroraSvgBackground = () => {
  return (
    <div className="absolute h-full w-full">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 420 303"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMin slice"
        className="pointer-events-none absolute top-8 opacity-100"
      >
        <g filter="url(#filter0_f_30_593)">
          <path d="M90.5631 86L0 -22H424L354.019 86H90.5631Z" fill="#38C764" />
          <path d="M90.5631 86L0 -22H424L354.019 86H90.5631Z" stroke="black" />
        </g>
        <g filter="url(#filter1_f_30_593)">
          <path
            d="M107.5 82L15.5 -31H-24V203L107.5 116V82Z"
            fill="url(#paint0_linear_30_593)"
          />
        </g>
        <g filter="url(#filter2_f_30_593)">
          <path
            d="M87.7766 83.2016L23.3766 4.10156H-4.27344V167.902L87.7766 107.002V83.2016Z"
            fill="url(#paint1_linear_30_593)"
          />
        </g>
        <g filter="url(#filter3_f_30_593)">
          <path
            d="M337 82L429 -31H468.5V203L337 116V82Z"
            fill="url(#paint2_linear_30_593)"
          />
        </g>
        <g filter="url(#filter4_f_30_593)">
          <path
            d="M356.723 83.2016L421.123 4.10156H448.773V167.902L356.723 107.002V83.2016Z"
            fill="url(#paint3_linear_30_593)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_30_593"
            x="-31.0718"
            y="-52.5"
            width="485.992"
            height="169"
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
              stdDeviation="15"
              result="effect1_foregroundBlur_30_593"
            />
          </filter>
          <filter
            id="filter1_f_30_593"
            x="-124"
            y="-131"
            width="331.5"
            height="434"
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
              stdDeviation="50"
              result="effect1_foregroundBlur_30_593"
            />
          </filter>
          <filter
            id="filter2_f_30_593"
            x="-39.2734"
            y="-30.8984"
            width="162.05"
            height="233.8"
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
              stdDeviation="17.5"
              result="effect1_foregroundBlur_30_593"
            />
          </filter>
          <filter
            id="filter3_f_30_593"
            x="237"
            y="-131"
            width="331.5"
            height="434"
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
              stdDeviation="50"
              result="effect1_foregroundBlur_30_593"
            />
          </filter>
          <filter
            id="filter4_f_30_593"
            x="321.723"
            y="-30.8984"
            width="162.05"
            height="233.8"
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
              stdDeviation="17.5"
              result="effect1_foregroundBlur_30_593"
            />
          </filter>
          <linearGradient
            id="paint0_linear_30_593"
            x1="41.75"
            y1="-31"
            x2="41.75"
            y2="203"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1DBDD1" />
            <stop offset="1" stopColor="#0D454C" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_30_593"
            x1="41.7516"
            y1="4.10156"
            x2="41.7516"
            y2="167.902"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#11ACC4" />
            <stop offset="1" stopColor="#075966" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_30_593"
            x1="402.75"
            y1="-31"
            x2="402.75"
            y2="203"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1DBDD1" />
            <stop offset="1" stopColor="#0D454C" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_30_593"
            x1="402.748"
            y1="4.10156"
            x2="402.748"
            y2="167.902"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#11ACC4" />
            <stop offset="1" stopColor="#075966" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
