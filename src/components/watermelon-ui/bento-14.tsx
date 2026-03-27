"use client";
import type { RefObject } from "react";
import React, { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import {
  Play,
  Pause,
  Heart,
  Volume2,
  Repeat,
  Shuffle,
  Monitor,
  Speaker,
  SkipForward,
  SkipBack,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

function Row({
  direction,
  isHovered,
}: {
  direction: number;
  isHovered: boolean;
}) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return;

    const halfWidth = containerRef.current.scrollWidth / 2;
    const speed = isHovered ? 5 : 30;

    let next = x.get() + (direction * -speed * delta) / 1000;

    if (next <= -halfWidth) next += halfWidth;
    if (next >= 0) next -= halfWidth;

    x.set(next);
  });

  const items = [...Array(12)];

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div ref={containerRef} style={{ x }} className="flex gap-4 px-2">
        {[...items, ...items].map((_, i) => (
          <span
            key={i}
            className="px-4 py-2 border bg-neutral-800 border-white/20 text-neutral-100 rounded-sm text-xs flex items-center gap-2"
          >
            Sale on entire stock
            <span className="text-orange-400 text-lg">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
function MarqueeCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="md:col-span-7 bg-neutral-900 rounded-md p-6 flex flex-col justify-end border border-white/5 relative overflow-hidden h-[340px] gap-0 ring-0 shadow-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent
        className="absolute inset-0 opacity-20 pointer-events-none [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] p-0"
        style={{ perspective: "1000px" }}
      >
        <div className="flex flex-col gap-4 -rotate-12 skew-x-12 -translate-y-4 scale-125">
          <Row direction={1} isHovered={isHovered} />
          <Row direction={-1} isHovered={isHovered} />
          <Row direction={1} isHovered={isHovered} />
        </div>
      </CardContent>
      <CardFooter className="z-10 relative p-6 flex-col bg-transparent border-none">
        <CardTitle className="text-neutral-100 text-sm font-semibold mb-2">Tailored Precision</CardTitle>
        <CardDescription className="text-md leading-relaxed text-neutral-400 max-w-[90%]">
          Chime offers tailored precision and intelligent insights, adeptly
          managing diverse sophisticated contextual understanding.
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

function UploadCard() {
  const dragVariants = {
    rest: {
      x: 130,
      y: -80,
    },
    hover: {
      x: 0,
      y: -25,
      transition: {
        duration: 0.7,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="md:col-span-5"
    >
      <Card
        className="bg-neutral-900 rounded-md flex flex-col justify-between border border-white/5 relative overflow-hidden h-[340px] p-0 gap-0 ring-0 shadow-none"
      >
      <CardContent className="flex-1 relative flex items-center justify-center w-full h-full p-0">
        <div className="flex justify-center items-center w-full h-full overflow-hidden relative pt-8 z-0 [mask-image:linear-gradient(to_bottom,black,transparent)]">
          <div className="absolute bg-white/10 size-80 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl" />

          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage: "linear-gradient(to bottom, black, transparent)",
            }}
          />

          <div className="w-[250px] z-10 h-full shadow-3xl bg-neutral-600 flex items-center justify-center pt-3 px-3 rounded-t-[40px]">
            <div className="bg-neutral-500 flex-1 h-full shadow-3xl pt-3 px-3 rounded-t-[28px]">
              <div className="bg-neutral-900 flex-1 h-full rounded-t-[16px]" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
          <span className="text-md text-neutral-500 tracking-wide">
            Add your file
          </span>

          <motion.div
            variants={dragVariants}
            transition={{
              duration: 0.45,
              ease: [0.65, 0, 0.35, 1],
            }}
            className="absolute flex items-center"
          >
            <div className="relative flex items-center bg-blue-600 text-white text-md px-3 py-1 rounded-full shadow-lg shadow-blue-600/20 cursor-grabbing ">
              my_file.mp3
            </div>
          </motion.div>
        </div>
      </CardContent>
      <CardFooter className="text-md text-neutral-400 leading-relaxed p-6 w-full flex-col items-start bg-transparent border-none">
        <CardTitle className="text-neutral-100 text-sm font-semibold mb-2">Add Your File</CardTitle>
        <CardDescription className="text-left w-full text-xs">
          Powerful capabilities, simplified. Our advanced features are integrated
          with remarkably easy and seamless to master.
        </CardDescription>
      </CardFooter>
      </Card>
    </motion.div>
  );
}

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>; // Container ref
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      };

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        const controlY = startY - curvature;
        const d = `M ${startX},${startY} Q ${
          (startX + endX) / 2
        },${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updatePath();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    updatePath();

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute top-0 left-0 transform-gpu stroke-2",
        className
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits={"userSpaceOnUse"}
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  );
};

function Card2() {
  const moniterRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const speakerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <Card className="md:col-span-5 bg-neutral-900 rounded-md p-0 flex flex-col justify-between border border-white/5 relative overflow-hidden min-h-[340px] gap-0 ring-0 shadow-none">
      <CardContent className="flex-1 flex justify-center items-center h-full w-full relative p-0">
        <div
          ref={containerRef}
          className="flex items-center gap-12 relative z-10"
        >
          <div
            ref={speakerRef}
            className="p-4 bg-neutral-800 rounded-full z-20"
          >
            <Speaker className="size-10 opacity-60 text-neutral-400" />
          </div>

          <div
            ref={rippleRef}
            className="relative w-16 h-16 flex items-center justify-center z-20"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.5, 2],
                opacity: [0.5, 0.2, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="absolute w-16 h-16 rounded-full border border-white/50"
            />

            <div className="w-16 h-16 bg-[#333] rounded-full flex items-center justify-center border border-white/10">
              <div className="w-10 h-10 bg-[#444] rounded-full" />
            </div>
          </div>

          <div
            ref={moniterRef}
            className="p-4 bg-neutral-800 rounded-full z-20"
          >
            <Monitor className="size-10 opacity-60 text-neutral-400" />
          </div>
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={speakerRef}
            toRef={rippleRef}
            pathColor="white"
            pathWidth={2}
            pathOpacity={0.2}
            gradientStartColor="rgba(255,255,255,0.2)"
            gradientStopColor="rgba(255,255,255,0.2)"
            delay={0}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={rippleRef}
            toRef={moniterRef}
            pathColor="white"
            pathWidth={2}
            pathOpacity={0.2}
            gradientStartColor="rgba(255,255,255,0.2)"
            gradientStopColor="rgba(255,255,255,0.2)"
            delay={0.4}
          />
        </div>
      </CardContent>

      <CardFooter className="text-md text-neutral-400 leading-relaxed p-6 flex-col items-start bg-transparent border-none">
        <CardTitle className="text-neutral-100 text-sm font-semibold mb-2">Connected Hub</CardTitle>
        <CardDescription className="text-left w-full text-xs">
          A dedicated platform engineered to empower your creative vision, and
          global distribution.
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

const tracks = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Waves",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300",
    duration: 101,
  },
  {
    id: 2,
    title: "Ocean Lights",
    artist: "Aurora Sky",
    cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300",
    duration: 124,
  },
  {
    id: 3,
    title: "Neon Streets",
    artist: "Pulse City",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
    duration: 95,
  },
];

function formatTime(t: number) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const barVariants = {
  initial: { y: -60, opacity: 0, scale: 0, filter: "blur(4px)" },
  animate: { y: 16, opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { y: -60, opacity: 0, scale: 0, filter: "blur(4px)" },
};

const songVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 180 : -180,
    opacity: 0,
    scale: 0.75,
    filter: "blur(4px)",
  }),
  center: { x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: (dir: number) => ({
    x: dir > 0 ? -180 : 180,
    opacity: 0,
    scale: 0.75,
    filter: "blur(4px)",
  }),
};

function PlayerCard() {
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [hover, setHover] = useState(false);
  const [direction, setDirection] = useState(0);

  const duration = tracks[index].duration;
  const track = tracks[index];

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing || !hover) return;

    const interval = setInterval(() => {
      setTime((t) => {
        if (t >= duration) {
          if (loop) return 0;
          setDirection(1);
          if (shuffle) {
            setIndex(Math.floor(Math.random() * tracks.length));
          } else {
            setIndex((i) => (i + 1) % tracks.length);
          }
          return 0;
        }
        return t + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [playing, duration, hover, loop, shuffle]);

  function next() {
    setDirection(1);
    if (shuffle) {
      setIndex(Math.floor(Math.random() * tracks.length));
    } else {
      setIndex((i) => (i + 1) % tracks.length);
    }
    setTime(0);
  }

  function prev() {
    setDirection(-1);
    setIndex((i) => (i - 1 + tracks.length) % tracks.length);
    setTime(0);
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;

    setTime(percent * duration);
  }

  const progress = (time / duration) * 100;

  return (
    <Card
      onMouseEnter={() => {
        setHover(true);
        setPlaying(true);
      }}
      onMouseLeave={() => {
        setHover(false);
        setPlaying(false);
      }}
      className="md:col-span-7 relative bg-neutral-900 rounded-md flex flex-col justify-between border border-white/5 overflow-hidden h-[340px] p-0 gap-0 ring-0 shadow-none"
    >
      <AnimatePresence>
        {hover && (
          <motion.div
            key="info-bar"
            variants={barVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="bg-neutral-800/90 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-xl overflow-hidden w-[220px]">
              <AnimatePresence
                custom={direction}
                initial={false}
                mode="popLayout"
              >
                <motion.div
                  key={track.id}
                  custom={direction}
                  variants={songVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex items-center gap-3"
                >
                  <img
                    src={track.cover}
                    className="w-10 h-10 rounded-md object-cover"
                  />

                  <div className="flex flex-col">
                    <span className="text-sm text-white font-medium">
                      {track.title}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {track.artist}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CardContent className="flex-1 relative w-full h-full overflow-hidden p-0">
        <div className="absolute bg-white/10 size-60 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl" />

        <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[radial-gradient(circle_at_50%_-45%,transparent_0px,transparent_118px,rgba(255,255,255,0.6)_120px,transparent_122px,transparent_178px,rgba(255,255,255,0.6)_180px,transparent_182px,transparent_248px,rgba(255,255,255,0.6)_250px,transparent_252px)]" />

        <div className="absolute bottom-0 w-full px-6 pb-6">
          <div className="relative w-full">
            <div
              ref={ref}
              onClick={seek}
              className="h-[3px] w-full bg-white/20 rounded-full overflow-hidden cursor-pointer"
            >
              <div
                style={{ width: `${progress}%` }}
                className={`h-full rounded-full transition-all ${
                  playing
                    ? "bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.9)]"
                    : "bg-blue-600/50 shadow-[0_0_6px_rgba(59,130,246,0.25)]"
                }`}
              />
            </div>

            <div className="flex justify-between text-xs text-neutral-500 mt-2">
              <span>{formatTime(time)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <Heart
              onClick={() => setLiked(!liked)}
              className={`w-5 h-5 cursor-pointer ${
                liked ? "text-blue-500 fill-blue-500" : "text-neutral-400"
              }`}
            />

            <Volume2 className="w-5 h-5 text-neutral-400" />

            <SkipBack
              onClick={prev}
              className="w-5 h-5 text-neutral-400 cursor-pointer"
            />

            <div
              onClick={() => setPlaying(!playing)}
              className="bg-white rounded-full p-2.5 shadow-[0_0_18px_rgba(255,255,255,0.15)] cursor-pointer"
            >
              {playing ? (
                <Pause className="w-5 h-5 text-black fill-black" />
              ) : (
                <Play className="w-5 h-5 text-black fill-black" />
              )}
            </div>

            <SkipForward
              onClick={next}
              className="w-5 h-5 text-neutral-400 cursor-pointer"
            />

            <Repeat
              onClick={() => setLoop(!loop)}
              className={`w-5 h-5 cursor-pointer ${
                loop ? "text-blue-500" : "text-neutral-400"
              }`}
            />

            <Shuffle
              onClick={() => setShuffle(!shuffle)}
              className={`w-5 h-5 cursor-pointer ${
                shuffle ? "text-blue-500" : "text-neutral-400"
              }`}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="relative text-md leading-relaxed text-neutral-400 max-w-xl p-6 flex-col bg-transparent border-none">
        <CardTitle className="text-neutral-100 text-sm font-semibold mb-2">Break Free</CardTitle>
        <CardDescription className="text-xs">
          Seize full command over your music's journey
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
const Bento14 = () => {
  return (
    <div className="min-h-screen bg-black p-8 font-sans antialiased text-gray-400">
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-2 ">
        <Card2 />

        <PlayerCard />

        <MarqueeCard />

        <UploadCard />
      </div>
    </div>
  );
};

export default Bento14;
