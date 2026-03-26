"use client";
import React from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const CARD6_FEED = [
  {
    id: "alice",
    name: "Alice g.",
    message: "Alice successfully participated in the Team",
    date: "13.10.2025 Tuesday",
  },
  {
    id: "raj",
    name: "Raj g.",
    message: "Raj successfully participated in the Team",
    date: "13.10.2025 Tuesday",
  },
  {
    id: "shane",
    name: "Shane p.",
    message: "Shane successfully participated in the Team",
    date: "13.10.2025 Tuesday",
  },
  {
    id: "mia",
    name: "Mia r.",
    message: "Mia completed a customer feedback sync",
    date: "14.10.2025 Wednesday",
  },
  {
    id: "leo",
    name: "Leo t.",
    message: "Leo updated the sprint delivery timeline",
    date: "14.10.2025 Wednesday",
  },
] as const;

type Card6FeedItem = (typeof CARD6_FEED)[number];
type Card6VisibleEntry = {
  key: number;
  item: Card6FeedItem;
};

const CARD3_TARGET_TENTHS = 936;
const CARD3_DURATION_SECONDS = 4.2;

const buildDigitTrack = (steps: number) =>
  Array.from({ length: steps + 1 }, (_, index) => index % 10);

const CARD3_TENS_STEPS = Math.floor(CARD3_TARGET_TENTHS / 100);
const CARD3_ONES_STEPS = Math.floor(CARD3_TARGET_TENTHS / 10);
const CARD3_DECIMAL_STEPS = CARD3_TARGET_TENTHS;

const CARD3_TENS_TRACK = buildDigitTrack(CARD3_TENS_STEPS);
const CARD3_ONES_TRACK = buildDigitTrack(CARD3_ONES_STEPS);
const CARD3_DECIMAL_TRACK = buildDigitTrack(CARD3_DECIMAL_STEPS);

const CARD5_USERS = [
  { id: "alice", name: "Alice g.", email: "alice@gmail.com" },
  { id: "park", name: "Park k.", email: "alice@gmail.com" },
  { id: "leon", name: "Leon k.", email: "alice@gmail.com" },
] as const;

const MotionCard = motion(Card);

const Bento3 = () => {
  const [isCard4On, setIsCard4On] = React.useState(false);
  const card4Name = isCard4On ? "Mia" : "Kyle";
  const [card2SwapIndex, setCard2SwapIndex] = React.useState(0);
  const card3Ref = React.useRef<HTMLDivElement | null>(null);
  const isCard3InView = useInView(card3Ref, { once: true, amount: 0.6 });
  const [card5CheckedCount, setCard5CheckedCount] = React.useState(0);

  const card2Cards = [
    { id: "think", label: "Think" },
    { id: "analyze", label: "Analyze" },
    { id: "record", label: "Record" },
    { id: "status", label: "Status" },
    { id: "write", label: "Write" },
    { id: "host", label: "Host" },
  ] as const;

  const card2SwapOrder = ["think", "analyze", "write", "host", "status"] as const;

  const card2Slots = {
    think: { x: -138, y: -92 },
    analyze: { x: 138, y: -92 },
    record: { x: 0, y: -44 },
    status: { x: 0, y: 90 },
    write: { x: -138, y: 44 },
    host: { x: 138, y: 44 },
  } as const;

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCard2SwapIndex((prev) => (prev + 1) % card2SwapOrder.length);
    }, 1800);

    return () => clearInterval(intervalId);
  }, [card2SwapOrder.length]);

  const getCard2SlotId = (cardId: (typeof card2Cards)[number]["id"]) => {
    const currentSwapTarget = card2SwapOrder[card2SwapIndex];

    if (cardId === "record") return currentSwapTarget;
    if (cardId === currentSwapTarget) return "record";
    return cardId;
  };

  const [card6VisibleEntries, setCard6VisibleEntries] = React.useState<Card6VisibleEntry[]>(() => [
    { key: 0, item: CARD6_FEED[0] },
    { key: 1, item: CARD6_FEED[1] },
    { key: 2, item: CARD6_FEED[2] },
  ]);
  const card6CursorRef = React.useRef(3);
  const card6KeyRef = React.useRef(3);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCard6VisibleEntries((prev) => {
        const nextItem = CARD6_FEED[card6CursorRef.current % CARD6_FEED.length];
        card6CursorRef.current += 1;

        const nextKey = card6KeyRef.current;
        card6KeyRef.current += 1;

        return [prev[1], prev[2], { key: nextKey, item: nextItem }];
      });
    }, 1800);

    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    const hasCompletedCycle = card5CheckedCount >= CARD5_USERS.length;

    const timeoutId = setTimeout(() => {
      if (hasCompletedCycle) {
        // Reset all checks together before starting the next loop.
        setCard5CheckedCount(0);
        return;
      }

      setCard5CheckedCount((prev) => Math.min(prev + 1, CARD5_USERS.length));
    }, hasCompletedCycle ? 1100 : 800);

    return () => clearTimeout(timeoutId);
  }, [card5CheckedCount]);

  return (
    <div className="flex items-start xl:items-center justify-center min-h-screen bg-[#000000] relative font-['Inter',sans-serif] py-20 sm:py-14 px-3 sm:px-4">
      {/* Back */}

      {/* 
        Layout structure (nested flex for per-row column control):
        Row 1: [Card1 (wide)]  [Card2 (narrower)]
        Rows 2-3: [Left section]  [Right: Card5 spanning full height]
          Left section Row A: [Card3 (wider)] [Card4 (narrower)]
          Left section Row B: [Card6 (equal)] [Card7 (equal)]
      */}
      <div className="w-full max-w-[1080px] flex flex-col gap-3.5">
        {/* ===== ROW 1 ===== */}
        <div className="flex flex-col xl:flex-row gap-3.5 xl:h-[330px]">
          {/* Card 1 - Your Workflow, Accelerated (wider) */}
          <Card className="flex-[2.1] bg-[#070707] rounded-2xl border border-[#7B7B7B]/15 flex flex-col lg:flex-row relative overflow-hidden min-h-[360px] sm:min-h-[330px]">
            <div className="w-40 h-20 bg-[#B6B5B5] blur-[150px] absolute left-1/2 -translate-x-1/2 -top-20" />
            {/* Left content */}
            <CardHeader className="flex flex-col justify-end w-full lg:max-w-[400px] min-w-0 z-10 px-6 sm:px-8">
              <BullseyeIcon />
              <CardTitle className="text-[22px] sm:text-[24px] font-semibold bg-clip-text text-transparent bg-linear-to-r from-[#FFFFFF] to-[#999999] mt-4 leading-tight w-full">
                Your Workflow, Accelerated.
              </CardTitle>
              <CardTitle className="text-[22px] sm:text-[24px] font-semibold text-[#4488FF] leading-tight w-full">
                Smart Access Hub
              </CardTitle>
              <CardDescription className="text-[13px] sm:text-[14px] font-light text-white/40 mt-3 leading-relaxed tracking-tight w-full">
                Your most-used tools, intelligently organized. Spend less time
                searching and more time doing.
              </CardDescription>
            </CardHeader>

            {/* Right floating menu card */}
            <CardContent className="relative mt-2 lg:mt-0 lg:absolute lg:right-0 lg:top-6 w-full lg:w-[320px] min-h-[210px] m-4 lg:h-[calc(100%-16px)] bg-[#070707] border border-[#7B7B7B]/15 rounded-2xl flex flex-col gap-[22px] pt-7 sm:pt-10 px-8 sm:px-12 lg:px-16 mask-r-from-0%">
              <p className="text-[16px] font-light text-white/90">Table</p>
              <p className="text-[16px] font-light text-white/90">Status</p>
              <p className="text-[16px] font-light text-white/90">Position</p>
              <p className="text-[16px] font-light text-white/90">Comments</p>
              <p className="text-[16px] font-light text-white/90">
                Active Search
              </p>
              <motion.span
                className="w-[calc(100%-6rem)] sm:w-[calc(100%-6rem)] lg:w-full h-10 bg-zinc-400/30 rounded-lg mask-r-from-0% absolute left-4 sm:left-8 lg:left-8 top-5 sm:top-8 pointer-events-none"
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  y: [-2, -2, 44 , 44, 90, 90, 135, 135, 180, 180],
                  opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                }}
                transition={{
                  duration: 4,
                  times: [0, 0.08, 0.22, 0.32, 0.46, 0.56, 0.7, 0.8, 0.92, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.2,
                }}
              ></motion.span>
            </CardContent>
          </Card>

          {/* Card 2 - Live Activity Stream (Think, Analyze, Record, Write, Host) */}
          <Card className="flex-1 bg-[#070707] rounded-2xl border border-[#7B7B7B]/15 flex-col justify-between pb-7 relative overflow-hidden min-h-[330px] hidden xl:flex">
            <div className="w-15 h-15 bg-[#B6B5B5] blur-[80px] absolute left-1/2 -translate-x-1/2 -top-20" />

            {/* Labels and circles arrangement */}
            {/* Top row labels */}
            <CardContent className="w-full h-full relative mask-b-from-80% scale-[0.9] sm:scale-100 origin-center px-0">
              {card2Cards.map((card) => {
                const slotId = getCard2SlotId(card.id);
                const slot = card2Slots[slotId];

                return (
                  <motion.div
                    key={card.id}
                    className="size-25 border border-[#262626] flex items-end justify-center p-2 rounded-2xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
                    animate={{
                      x: slot.x,
                      y: slot.y,
                      scale: slotId === "record" ? 1.03 : 1,
                      opacity: slotId === "record" ? 0.96 : 0.78,
                      zIndex: slotId === "record" ? 3 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 24,
                      mass: 0.8,
                    }}
                  >
                    <span className="text-[13px] text-white/60 font-medium whitespace-nowrap">
                      {card.label}
                    </span>
                  </motion.div>
                );
              })}
            </CardContent>

            {/* Bottom text */}
            <CardFooter className="mt-auto px-6 sm:px-7 relative z-0 items-start flex-col bg-transparent border-none">
              <CardTitle className="text-[17px] font-medium text-white">
                Live Activity Stream
              </CardTitle>
              <CardDescription className="text-[13px] font-light text-white/40 mt-1 leading-relaxed">
                See important updates from your team as they happen.
              </CardDescription>
            </CardFooter>
          </Card>
        </div>

        {/* ===== ROWS 2-3 wrapper ===== */}
        <div className="flex flex-col xl:flex-row gap-3.5">
          {/* Left section (rows 2 and 3 stacked) */}
          <div className="flex-[2.45] flex flex-col gap-3.5">
            {/* Row 2: Success Metric + Kyle */}
            <div className="flex flex-col sm:flex-row gap-3.5 sm:h-[180px]">
              {/* Card 3 - Success Metric (+93.6%) â€” wider */}
              <div ref={card3Ref} className="flex-[1.4] min-h-[180px]">
                <Card className="h-full w-full bg-[#070707] rounded-2xl border border-[#7B7B7B]/15 flex flex-col sm:flex-row items-start sm:items-center p-6 sm:p-8 gap-4 sm:gap-6 relative overflow-hidden">
                <div className="w-30 h-10 bg-[#B6B5B5] blur-[100px] absolute left-30 -top-20" />

                {/* Big percentage */}
                <div className="text-[38px] sm:text-[48px] font-bold leading-none tracking-tight tabular-nums shrink-0 text-[#5BA6FF] flex items-baseline mask-b-from-0%">
                  <span className="-translate-y-3">+</span>
                  <RollingDigit
                    steps={CARD3_TENS_STEPS}
                    track={CARD3_TENS_TRACK}
                    shouldStart={isCard3InView}
                    durationSeconds={CARD3_DURATION_SECONDS}
                  />
                  <RollingDigit
                    steps={CARD3_ONES_STEPS}
                    track={CARD3_ONES_TRACK}
                    shouldStart={isCard3InView}
                    durationSeconds={CARD3_DURATION_SECONDS}
                  />
                  <span className="mx-0.5">.</span>
                  <RollingDigit
                    steps={CARD3_DECIMAL_STEPS}
                    track={CARD3_DECIMAL_TRACK}
                    shouldStart={isCard3InView}
                    durationSeconds={CARD3_DURATION_SECONDS}
                  />
                  <span className="-translate-y-1">%</span>
                </div>

                {/* Text content */}
                <CardHeader className="px-0 w-full sm:flex-1 sm:min-w-0">
                  <CardTitle className="text-[18px] font-medium text-white w-full">
                    Success Metric
                  </CardTitle>
                  <CardDescription className="text-[13px] font-light text-white/40 mt-1 leading-relaxed w-full">
                    Key performance indicators, visualized.
                  </CardDescription>
                </CardHeader>
                </Card>
              </div>

              {/* Card 4 - Kyle avatar â€” narrower */}
              <Card className="flex-[0.8] bg-[#070707] rounded-2xl border border-[#7B7B7B]/15 flex flex-col items-center justify-center relative overflow-hidden min-h-[180px]">
                <div className="w-10 h-10 bg-[#B6B5B5] blur-[60px] absolute left-0 -top-10" />
                <motion.div
                  role="switch"
                  aria-checked={isCard4On}
                  tabIndex={0}
                  onClick={() => setIsCard4On((prev) => !prev)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setIsCard4On((prev) => !prev);
                    }
                  }}
                  className={`w-18 h-10 rounded-full border relative`}
                  animate={{
                    backgroundColor: isCard4On
                      ? "#4488FF"
                      : "rgba(217, 217, 217, 0.1)",
                    borderColor: isCard4On ? "#5BA6FF" : "#3A3A3A",
                  }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                >
                  <motion.div
                    className="size-8.5 rounded-full bg-white absolute left-0.5 top-1/2 -translate-y-1/2"
                    animate={{ x: isCard4On ? 33 : 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                  ></motion.div>
                </motion.div>

                <motion.div
                  className="flex flex-col"
                  animate={{ x: isCard4On ? 16 : 10, y: isCard4On ? 0 : -10 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                >
                  <motion.div
                    animate={{ rotate: isCard4On ? 60 : 0, x: isCard4On ? 18 : 6, y: isCard4On ? 20 : 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                  >
                    <Arrow />
                  </motion.div>
                  <motion.div
                    className="relative mt-0.5"
                    animate={{ x: isCard4On ? 8 : 6, y: isCard4On ? -2 : 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                  >
                    <div className="relative h-[34px] min-w-[78px] px-3 py-1 rounded-full border border-[#D9D9D9] flex items-center justify-center">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={card4Name}
                          initial={{ opacity: 0, y: 4, filter: "blur(6px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -4, filter: "blur(6px)" }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          className="absolute text-[13px] font-light text-white leading-relaxed whitespace-nowrap"
                        >
                          {card4Name}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              </Card>
            </div>

            {/* Row 3: Activity Timeline + Work From Anywhere (EQUAL width) */}
            <div className="flex flex-col lg:flex-row gap-3.5 lg:h-[330px]">
              {/* Card 6 - Live Activity Stream (Timeline) */}
              <Card className="flex-1 bg-[#070707] rounded-2xl border border-[#7B7B7B]/15 flex flex-col sm:flex-row lg:flex-col px-6 sm:px-7 pb-7 pt-5 relative overflow-hidden min-h-[320px] gap-4 sm:gap-6">
                <div className="w-20 h-20 bg-[#B6B5B5]/50 blur-[60px] absolute left-15 -top-10" />

                {/* Activity entries */}
                <CardContent className="flex flex-col gap-4 flex-1 overflow-hidden order-1 sm:order-2 lg:order-1 sm:flex-[1.25] lg:flex-1 px-0">
                  <AnimatePresence initial={false} mode="popLayout">
                    {card6VisibleEntries.map(({ key, item }, index) => (
                      <motion.div
                        key={key}
                        layout="position"
                        className="flex items-start gap-3 will-change-transform"
                        initial={{ y: index === 2 ? 42 : 0, opacity: index === 2 ? 0 : 1, filter: index === 2 ? "blur(8px)" : "blur(0px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: -26, opacity: 0, filter: "blur(8px)" }}
                        transition={{
                          layout: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
                          y: { type: "spring", stiffness: 210, damping: 24, mass: 0.75 },
                          opacity: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                          filter: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                        }}
                      >
                        <div className="w-[30px] h-[30px] rounded-lg bg-[#141414] border border-[#7B7B7B]/15 shrink-0 mt-0.5 flex items-center justify-center">
                          <BullseyeIcon className="size-4 opacity-30" />
                        </div>
                        <div>
                          <p className="text-[13px] text-white/80 font-medium">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-white/30 font-light leading-relaxed">
                            {item.message}
                          </p>
                          <p className="text-[10px] text-white/20 font-light">
                            {item.date}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </CardContent>

                {/* Bottom text */}
                <CardFooter className="mt-auto sm:mt-0 lg:mt-auto order-2 sm:order-1 lg:order-2 sm:max-w-[220px] lg:max-w-none sm:flex sm:flex-col sm:justify-end items-start flex-col px-0 bg-transparent border-none">
                  <CardTitle className="text-[17px] font-semibold text-white">
                    Live Activity Stream
                  </CardTitle>
                  <CardDescription className="text-[13px] font-light text-white/40 mt-1 leading-relaxed">
                    See important updates from your team as they happen.
                  </CardDescription>
                </CardFooter>
              </Card>

              {/* Card 7 - Work From Anywhere (Phone mockup) */}
              <MotionCard
                initial="rest"
                whileHover="hover"
                className="flex-1 bg-[#070707] rounded-2xl border border-[#7B7B7B]/15 flex flex-col sm:flex-row lg:flex-col p-6 sm:p-7 relative overflow-hidden min-h-[320px] gap-4 sm:gap-6"
              >
                <div className="w-20 h-20 bg-[#B6B5B5]/60 blur-[70px] absolute left-25 -top-10" />

                {/* Phone mockup */}
                <CardContent className="order-1 sm:order-2 lg:order-1 flex-1 sm:flex-[1.2] lg:flex-1 flex items-center justify-center relative mask-b-from-60% min-h-[170px] sm:min-h-0 overflow-hidden px-0">
                  <motion.div
                    className="absolute h-78 sm:h-90 left-1/2 sm:left-25 top-8 sm:top-5 -translate-x-[8%] sm:translate-x-0 scale-75 sm:scale-80 blur-[1px]"
                    variants={{
                      rest: { y: 0 },
                      hover: { y: -18 },
                    }}
                    transition={{
                     type: "spring",
                     bounce: 0.3,
                     duration: 0.7,
                     delay: 0.2
                    }}
                  >
                    <PhoneMockup />
                  </motion.div>
                  <motion.div
                    className="absolute h-78 sm:h-90 top-8 sm:top-5 left-1/2 sm:left-5 -translate-x-[64%] sm:translate-x-0"
                    variants={{
                      rest: { y: 0 },
                      hover: { y: -20 },
                    }}
                    transition={{
                      type: "spring",
                     bounce: 0.3,
                     duration: 0.7
                    }}
                  >
                    <PhoneMockup />
                  </motion.div>
                </CardContent>

                {/* Bottom text */}
                <CardFooter className="mt-auto sm:mt-0 lg:mt-auto relative z-20 order-2 sm:order-1 lg:order-2 sm:max-w-[230px] lg:max-w-none sm:flex sm:flex-col sm:justify-end shrink-0 items-start flex-col px-0 bg-transparent border-none">
                  <CardTitle className="text-[17px] font-semibold text-white">
                    Work From Anywhere.
                  </CardTitle>
                  <CardDescription className="text-[13px] font-light text-white/40 mt-1 leading-relaxed">
                    Manage your pipeline on the go. Get the native app for iOS
                    and Android.
                  </CardDescription>
                </CardFooter>
              </MotionCard>
            </div>
          </div>

          {/* Right section: Card 5 - User Management (spans full height of rows 2-3) */}
          <Card className="flex-1 bg-[#070707] rounded-2xl border border-[#7B7B7B]/15 flex flex-col p-5 sm:p-6 relative overflow-hidden min-h-[460px] xl:h-[524px] gap-0">
            <div className="w-20 h-20 bg-[#B6B5B5]/80 rounded-full blur-[70px] absolute left-15 -top-15" />

            {/* Top tags */}
            <CardContent className="pt-3 pb-6 sm:pb-10 pr-4 sm:pr-6 bg-[#070707] border-2 border-[#7B7B7B]/10 rounded-3xl flex flex-col gap-2 items-end mask-l-from-20% relative lg:absolute top-0 lg:top-6 right-0 lg:right-6 px-0">
              <div className="flex gap-3">
                <span className="text-sm rounded-md text-white/20 px-2 py-1 border-2 border-[#1F1F1F]">
                  Change
                </span>
                <span className="text-sm rounded-md text-white/20 px-2 py-1 border-2 border-[#1F1F1F]">
                  Edit users
                </span>
              </div>

              <div className="w-full px-2 py-1 bg-[#1B1E1F]/70 flex justify-end text-white/30 rounded-lg text-sm mt-3">
                Current Date
              </div>
              <div className="w-full px-2 py-1 flex justify-end text-white/30 rounded-lg text-sm">
                Current Day
              </div>
            </CardContent>

            {/* User list */}
            <CardContent className="flex flex-col gap-3 mt-6 lg:mt-24 relative z-20 px-0">
              {CARD5_USERS.map((user, index) => {
                const isChecked = index < card5CheckedCount;

                return (
                  <div
                    key={user.id}
                    className="bg-[#070707] border border-[#212121] rounded-xl px-4 sm:px-5 py-4 flex items-center gap-3 w-full lg:max-w-[200px]"
                  >
                    <motion.div
                      className="w-[32px] h-[32px] rounded-full border-3 shrink-0 flex items-center justify-center"
                      animate={{
                        backgroundColor: isChecked
                          ? "rgba(91, 166, 255, 0.18)"
                          : "#070707",
                        borderColor: isChecked
                          ? "rgba(91, 166, 255, 0.85)"
                          : "rgba(75, 75, 75, 0.3)",
                      }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <motion.svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{ opacity: isChecked ? 1 : 0, scale: isChecked ? 1 : 0.8 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        <path
                          d="M2 7.4L5.2 10.3L12 3.7"
                          stroke="#8CC0FF"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    </motion.div>

                    <motion.div
                      animate={{ opacity: isChecked ? 0.55 : 1 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <p className="text-[13px] text-white/80 font-medium leading-tight">
                        <span className="relative inline-block">
                          {user.name}
                          <motion.span
                            className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/65 origin-left"
                            animate={{ scaleX: isChecked ? 1 : 0, opacity: isChecked ? 1 : 0 }}
                            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </span>
                      </p>
                      <p className="text-[11px] text-white/30 font-light">
                        <span className="relative inline-block">
                          {user.email}
                          <motion.span
                            className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/35 origin-left"
                            animate={{ scaleX: isChecked ? 1 : 0, opacity: isChecked ? 1 : 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                              delay: isChecked ? 0.04 : 0,
                            }}
                          />
                        </span>
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </CardContent>

            {/* Keyboard */}
            <CardFooter className="mt-5 sm:mt-auto pt-2 sm:pt-4 mask-b-from-0% w-full md:max-w-[360px] xl:max-w-none md:mx-auto xl:mx-0 px-0 bg-transparent border-none">
              <KeyboardGraphic />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Bento3;

/* ============================
   SUB-COMPONENTS
   ============================ */

const BullseyeIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <g filter="url(#filter0_i_bento3)">
        <circle cx="13.86" cy="13.86" r="13.86" fill="#070707" />
      </g>
      <circle
        cx="13.86"
        cy="13.86"
        r="12.936"
        stroke="#ACACAC"
        strokeOpacity="0.72"
        strokeWidth="1.848"
      />
      <circle cx="13.8609" cy="13.8613" r="8.316" fill="#070707" />
      <circle
        cx="13.8609"
        cy="13.8613"
        r="7.392"
        stroke="#ACACAC"
        strokeOpacity="0.72"
        strokeWidth="1.848"
      />
      <defs>
        <filter
          id="filter0_i_bento3"
          x="0"
          y="-10.164"
          width="27.7207"
          height="37.884"
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
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-10.164" />
          <feGaussianBlur stdDeviation="7.854" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.991346 0 0 0 0 0.991346 0 0 0 0.25 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>
      </defs>
    </svg>
  );
};

const PhoneMockup = () => {
  return (
    <img
      src="https://assets.watermelon.sh/iphone-mockup.png"
      alt="Phone Mockup"
      width={200}
      height={400}
      className="w-auto h-full object-contain"
      loading="lazy"
      decoding="async"
    />
  );
};

const KeyboardGraphic = () => {
  return (
    <img
      src="https://assets.watermelon.sh/keyboard.png"
      alt="Keyboard Graphic"
      width={400}
      height={100}
      className="w-full h-auto object-contain"
      loading="lazy"
      decoding="async"
    />
  );
};

const Arrow = () => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.97135 18.3756L0.304688 0.37561L16.3047 8.37561C8.30469 8.90894 5.4158 15.2645 4.97135 18.3756Z"
        fill="black"
        stroke="white"
        strokeWidth="0.4"
      />
    </svg>
  );
};

const RollingDigit = ({
  steps,
  track,
  shouldStart,
  durationSeconds,
}: {
  steps: number;
  track: number[];
  shouldStart: boolean;
  durationSeconds: number;
}) => {
  return (
    <span className="relative inline-flex h-[1em] w-[0.62em] overflow-hidden align-baseline">
      <motion.span
        className="absolute left-0 top-0 flex flex-col"
        initial={{ y: "0em" }}
        animate={{ y: shouldStart ? `-${steps}em` : "0em" }}
        transition={{ duration: durationSeconds, ease: [0.19, 1, 0.22, 1] }}
      >
        {track.map((value, index) => (
          <span key={`${value}-${index}`} className="h-[1em] leading-none">
            {value}
          </span>
        ))}
      </motion.span>
    </span>
  );
};
