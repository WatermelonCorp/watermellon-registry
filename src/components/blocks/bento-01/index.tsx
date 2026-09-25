"use client";

import { cn } from '@/lib/utils';
import {
  Zap,
  User,
  MessageSquare,
  Users,
  MousePointer2,
  GitMerge,
} from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Shield01Icon, LockKeyIcon } from '@hugeicons/core-free-icons';
import { motion } from "motion/react";
import { useState } from "react";

const avatars = [
  {
    src: 'https://assets.watermelon.sh/wm_ben.png',
    name: 'Mark',
  },
  {
    src: 'https://assets.watermelon.sh/wm_olivia.png',
    name: 'Olivia',
  },
  {
    src: 'https://assets.watermelon.sh/wm_josh.png',
    name: 'Josh',
  },
  {
    src: 'https://assets.watermelon.sh/wm_emma.png',
    name: 'Emma',
  },
];

interface Bento1Props {
  className?: string;
}

const bentoCardClass = cn(
  'group relative flex flex-col justify-between overflow-hidden rounded-xl bg-muted p-4 lg:p-6 duration-300 antialiased',
  'shadow-[inset_0_0_2px_2px_rgba(255,255,255,1),inset_0_0_0_1px_rgba(0,0,0,0.2),0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)]',
  'dark:shadow-[inset_0_0_2px_2px_rgba(255,255,255,0.04),inset_0_0_0_1px_rgba(255,255,255,0.08),0px_0px_0px_1px_rgba(255,255,255,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.5),0px_2px_4px_0px_rgba(0,0,0,0.4)]',
);

export default function Bento1({ className }: Bento1Props) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section
      className={cn(
        'bg-background flex h-full w-full items-center justify-center px-4 py-12 font-sans antialiased',
        className,
      )}
    >
      <div className="flex w-full max-w-4xl flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Top Left Card */}
          <div
            className={cn(
              bentoCardClass,
              'flex min-h-[320px] flex-col md:col-span-2',
            )}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Mockup UI at the top */}
            <div className="relative mb-8 flex flex-1 items-start justify-center overflow-visible">
              <motion.div 
                className="bg-background/90 border-border relative flex w-full max-w-sm -translate-y-6 flex-col rounded-b-2xl border border-t-0 p-4 shadow-sm z-20"
                initial={{ marginBottom: 0 }}
                animate={hoveredCard === 1 ? { marginBottom: -44 } : { marginBottom: 0 }}
                transition={{ duration: 0.4, delay: hoveredCard === 1 ? 1.3 : 0, ease: "easeInOut" }}
              >
                {/* Workflow Node 1 */}
                <motion.div 
                  className="bg-background relative flex items-center gap-3 rounded-xl border border-border p-3 shadow-sm z-10"
                  initial={{ opacity: 1, y: 0 }}
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 shadow-sm dark:bg-blue-500/20 dark:text-blue-400">
                    <Zap className="size-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-foreground text-xs font-bold">
                      Trigger
                    </span>
                    <span className="text-muted-foreground text-xs font-medium">
                      When issue is created
                    </span>
                  </div>
                </motion.div>

                {/* Connector */}
                <div className="relative mx-auto h-6 w-px z-0">
                  <div className="absolute inset-0 w-full bg-border" />
                  <motion.div 
                    className="absolute top-0 w-full bg-blue-500"
                    initial={{ height: "0%" }}
                    animate={hoveredCard === 1 ? { height: "100%" } : { height: "0%" }}
                    transition={{ duration: 0.3, delay: hoveredCard === 1 ? 0.1 : 0, ease: "linear" }}
                  />
                </div>

                {/* Workflow Node 2 */}
                <motion.div 
                  className="bg-background relative flex items-center gap-3 rounded-xl border border-border p-3 shadow-sm z-10"
                  initial={{ opacity: 0.5, scale: 0.98 }}
                  animate={hoveredCard === 1 ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.98 }}
                  transition={{ duration: 0.4, delay: hoveredCard === 1 ? 0.4 : 0 }}
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 shadow-sm dark:bg-purple-500/20 dark:text-purple-400">
                    <User className="size-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-foreground text-xs font-bold">
                      Action
                    </span>
                    <span className="text-muted-foreground text-xs font-medium">
                      Assign to team member
                    </span>
                  </div>
                </motion.div>

                {/* Connector */}
                <div className="relative mx-auto h-6 w-px z-0">
                  <div className="absolute inset-0 w-full bg-border" />
                  <motion.div 
                    className="absolute top-0 w-full bg-purple-500"
                    initial={{ height: "0%" }}
                    animate={hoveredCard === 1 ? { height: "100%" } : { height: "0%" }}
                    transition={{ duration: 0.3, delay: hoveredCard === 1 ? 0.7 : 0, ease: "linear" }}
                  />
                </div>

                {/* Workflow Node 3 */}
                <motion.div 
                  className="bg-background relative flex items-center gap-3 rounded-xl border border-border p-3 shadow-sm z-10"
                  initial={{ opacity: 0.5, scale: 0.98 }}
                  animate={hoveredCard === 1 ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.98 }}
                  transition={{ duration: 0.4, delay: hoveredCard === 1 ? 1.0 : 0 }}
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 shadow-sm dark:bg-emerald-500/20 dark:text-emerald-400">
                    <MessageSquare className="size-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-foreground text-xs font-bold">
                      Action
                    </span>
                    <span className="text-muted-foreground text-xs font-medium">
                      Notify in Slack
                    </span>
                  </div>
                </motion.div>

                {/* Sliding Bonus Panel */}
                <motion.div
                  className="overflow-hidden rounded-lg bg-emerald-500/5 ring-1 ring-emerald-500/20"
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={hoveredCard === 1 ? { height: 36, opacity: 1, marginTop: 8 } : { height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.4, delay: hoveredCard === 1 ? 1.3 : 0, ease: "easeInOut" }}
                >
                  <div className="flex items-center justify-between w-full h-full px-3">
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={hoveredCard === 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, delay: hoveredCard === 1 ? 1.6 : 0 }}
                    >
                      <svg className="size-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                        Workflow Active
                      </span>
                    </motion.div>
                    
                    <motion.div
                      className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[9px] font-bold text-emerald-700 dark:text-emerald-400"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={hoveredCard === 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", delay: hoveredCard === 1 ? 1.8 : 0 }}
                    >
                      0ms LATENCY
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div className="relative z-10 flex flex-col gap-2">
              <h3 className="text-foreground flex items-center gap-2 text-2xl font-semibold">
                Automated workflows{' '}
                <GitMerge className="size-6 text-indigo-500" />
              </h3>
              <p className="text-muted-foreground max-w-lg text-base text-balance">
                Build powerful automations and connect your tools without
                writing a single line of code.
              </p>
            </div>
          </div>

          {/* Top Right Card */}
          <div
            className={cn(
              bentoCardClass,
              'min-h-[320px] flex-col justify-between p-0 md:col-span-1 md:p-0',
            )}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative z-10 flex flex-col gap-2">
              <h3 className="text-foreground flex items-center gap-2 text-2xl font-semibold">
                Enterprise security
              </h3>
              <p className="text-muted-foreground mt-1 text-sm font-medium">
                Bank-grade encryption and SOC2 Type II compliance to keep your
                data secure.
              </p>
            </div>

            <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden">
              <svg width="0" height="0" className="absolute">
                <defs>
                  <linearGradient
                    id="shield-grad"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      className="text-primary/70"
                      stopColor="currentColor"
                    />
                    <stop
                      offset="100%"
                      className="text-primary"
                      stopColor="currentColor"
                    />
                  </linearGradient>
                </defs>
              </svg>

              {/* Background Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_60%_at_center,white_30%,transparent_100%)] bg-size-[24px_24px] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]" />

              {/* Background Cross Lines */}
              <div className="bg-primary/20 absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 mask-[linear-gradient(to_right,transparent,white_50%,transparent)]" />
              <div className="bg-primary/20 absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 mask-[linear-gradient(to_bottom,transparent,white_50%,transparent)]" />

              {/* Animated Beams on Hover */}
              <div className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 overflow-hidden mask-[linear-gradient(to_right,transparent,white_50%,transparent)]">
                {/* Left to Right */}
                <motion.div
                  className="absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-primary to-transparent"
                  initial={{ left: "-50%" }}
                  animate={hoveredCard === 2 ? { left: "100%" } : { left: "-50%" }}
                  transition={{ duration: 2, ease: "linear", repeat: hoveredCard === 2 ? Infinity : 0 }}
                />
                {/* Right to Left */}
                <motion.div
                  className="absolute inset-y-0 w-1/2 bg-linear-to-l from-transparent via-primary to-transparent"
                  initial={{ right: "-50%" }}
                  animate={hoveredCard === 2 ? { right: "100%" } : { right: "-50%" }}
                  transition={{ duration: 2.5, ease: "linear", repeat: hoveredCard === 2 ? Infinity : 0, delay: 0.5 }}
                />
              </div>

              <div className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 overflow-hidden mask-[linear-gradient(to_bottom,transparent,white_50%,transparent)]">
                {/* Top to Bottom */}
                <motion.div
                  className="absolute inset-x-0 h-1/2 bg-linear-to-b from-transparent via-primary to-transparent"
                  initial={{ top: "-50%" }}
                  animate={hoveredCard === 2 ? { top: "100%" } : { top: "-50%" }}
                  transition={{ duration: 2.2, ease: "linear", repeat: hoveredCard === 2 ? Infinity : 0, delay: 0.2 }}
                />
                {/* Bottom to Top */}
                <motion.div
                  className="absolute inset-x-0 h-1/2 bg-linear-to-t from-transparent via-primary to-transparent"
                  initial={{ bottom: "-50%" }}
                  animate={hoveredCard === 2 ? { bottom: "100%" } : { bottom: "-50%" }}
                  transition={{ duration: 1.8, ease: "linear", repeat: hoveredCard === 2 ? Infinity : 0, delay: 0.8 }}
                />
              </div>

              {/* The Shield and Lock */}
              <div className="relative z-10 flex scale-[0.8] items-center justify-center transition-transform duration-500 ease-out">
                {/* Hugeicons Shield */}
                <div className="text-neutral-200 drop-shadow-[0_12px_24px_hsl(var(--primary)/0.25)] dark:text-neutral-400">
                  <HugeiconsIcon
                    icon={Shield01Icon}
                    size={180}
                    fill="url(#shield-grad)"
                    stroke="currentColor"
                    strokeWidth={1}
                  />
                </div>

                {/* The Lock inside the shield */}
                <div className="text-primary-foreground absolute top-[47%] -translate-y-1/2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
                  <HugeiconsIcon
                    icon={LockKeyIcon}
                    size={52}
                    strokeWidth={2.5}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card */}
          <div
            className={cn(
              bentoCardClass,
              'min-h-[280px] flex-col items-stretch gap-8 p-0! md:col-span-3 md:flex-row',
            )}
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative z-10 flex flex-1 flex-col items-start justify-center gap-3 p-6 md:p-8">
              <h3 className="text-foreground flex items-center gap-2 text-2xl font-semibold">
                Real-time collaboration{' '}
                <Users className="size-6 fill-blue-500/20 text-blue-500" />
              </h3>
              <p className="text-muted-foreground max-w-lg text-base text-balance">
                Work together with your team in real-time. See cursors, leave
                comments, and ship faster.
              </p>
              <button className="bg-foreground text-background mt-4 rounded-lg px-6 py-2.5 text-sm font-semibold shadow-[inset_0_0_0_2px_rgba(255,255,255,1),0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] transition-transform hover:opacity-90 active:scale-[0.96]">
                Invite team
              </button>
            </div>

            <div className="relative flex min-h-[260px] w-full flex-1 items-end justify-end overflow-visible rounded-br-3xl pt-4 md:pt-8">
              {/* Animated Group Wrapper */}
              <div className="relative flex w-[110%] flex-col transition-transform duration-500 ease-out">
                {/* Avatar Stack */}
                <div className="relative z-20 mb-4 flex -space-x-3">
                  {avatars.map((avatar, idx) => (
                    <img
                      key={idx}
                      src={avatar.src}
                      alt={avatar.name}
                      className="border-background size-10 rounded-full border-2 object-cover shadow-sm transition-transform duration-300 hover:scale-110"
                    />
                  ))}
                  <div className="border-background bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-full border-2 text-xs font-semibold shadow-sm">
                    10+
                  </div>
                </div>

                {/* Mockup UI */}
                <div className="bg-background border-border relative flex min-h-[220px] w-full flex-col gap-4 overflow-hidden rounded-tl-2xl border-t border-l p-4 pt-8 shadow-sm">
                  {/* Mock Document Content */}
                  <motion.div 
                    className="bg-muted mb-2 h-5 rounded-md" 
                    initial={{ width: "75%" }}
                    animate={hoveredCard === 3 ? { width: "80%" } : { width: "75%" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  <motion.div 
                    className="bg-muted/50 h-3 rounded-md" 
                    initial={{ width: "100%" }}
                    animate={hoveredCard === 3 ? { width: "95%" } : { width: "100%" }}
                    transition={{ duration: 0.7, delay: 0.075, ease: "easeOut" }}
                  />
                  <motion.div 
                    className="bg-muted/50 h-3 rounded-md" 
                    initial={{ width: "83.333333%" }}
                    animate={hoveredCard === 3 ? { width: "85%" } : { width: "83.333333%" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                  />

                  {/* Cursor 1 */}
                  <motion.div 
                    className="absolute top-14 left-[20%] z-20 flex flex-col items-start drop-shadow-md"
                    initial={{ x: 0, y: 0 }}
                    animate={hoveredCard === 3 ? { x: 32, y: 12 } : { x: 0, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <MousePointer2 className="size-4 -rotate-12 fill-rose-500 text-rose-500" />
                    <div className="mt-1 ml-2 rounded-md rounded-tl-none bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      Sarah
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-muted/50 h-3 rounded-md" 
                    initial={{ width: "91.666667%" }}
                    animate={hoveredCard === 3 ? { width: "90%" } : { width: "91.666667%" }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                  />

                  {/* Cursor 2 */}
                  <motion.div 
                    className="absolute right-[25%] bottom-10 z-20 flex flex-col items-start drop-shadow-md"
                    initial={{ x: 0, y: 0 }}
                    animate={hoveredCard === 3 ? { x: -24, y: -16 } : { x: 0, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <MousePointer2 className="size-4 -rotate-12 fill-blue-500 text-blue-500" />
                    <div className="mt-1 ml-2 rounded-md rounded-tl-none bg-blue-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      Alex
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
