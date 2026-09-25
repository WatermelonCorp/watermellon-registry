'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useState } from 'react';
import Map from './map';

interface Bento2Props {
  className?: string;
}

const bentoCardClass = cn(
  'group relative flex flex-col justify-between overflow-hidden rounded-xl bg-muted p-4 lg:p-6 duration-300 antialiased',
  'shadow-[inset_0_0_2px_2px_rgba(255,255,255,1),inset_0_0_0_1px_rgba(0,0,0,0.2),0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)]',
  'dark:shadow-[inset_0_0_2px_2px_rgba(255,255,255,0.04),inset_0_0_0_1px_rgba(255,255,255,0.08),0px_0px_0px_1px_rgba(255,255,255,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.5),0px_2px_4px_0px_rgba(0,0,0,0.4)]',
);

export default function Bento2({ className }: Bento2Props) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  return (
    <section
      className={cn(
        'bg-background flex h-full w-full items-center justify-center px-4 py-12 font-sans antialiased',
        className,
      )}
    >
      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
        {/* Card 1: Top Left (Large) */}
        <div
          className={cn(
            bentoCardClass,
            'min-h-[320px] flex-col justify-end md:col-span-2',
          )}
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Visual Container */}
          <div className="relative z-10 flex w-full flex-1 items-start justify-center overflow-visible">
            <motion.div className="flex w-full flex-col">
              {/* Dashboard Header */}
              <div className="mb-8 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                    Live Traffic
                  </span>
                  <span className="text-2xl font-bold tabular-nums">
                    12,450{' '}
                    <span className="text-muted-foreground text-sm font-medium">
                      req/s
                    </span>
                  </span>
                </div>

               
              </div>

              {/* Bar Chart */}
              <div className="flex h-30 items-end gap-1.5 overflow-hidden">
                {[40, 70, 45, 90, 65, 85, 35, 60, 50, 80, 55, 75].map(
                  (height, i) => (
                    <motion.div
                      key={i}
                      className="bg-primary dark:bg-primary/60 w-full rounded-t-sm"
                      initial={{ height: `${height}%` }}
                      animate={
                        hoveredCard === 1
                          ? {
                              height: [
                                `${height}%`,
                                `${Math.max(15, height - 30)}%`,
                                `${height}%`,
                              ],
                            }
                          : { height: `${height}%` }
                      }
                      transition={{
                        duration: 2,
                        repeat: hoveredCard === 1 ? Infinity : 0,
                        delay: i * 0.05,
                        ease: 'easeInOut',
                      }}
                    />
                  ),
                )}
              </div>
            </motion.div>
          </div>

          {/* Text Content (Bottom Left) */}
          <div className="relative z-10 flex flex-col gap-2 pt-4">
            <h3 className="text-foreground text-xl font-semibold">
              Real-time Metrics
            </h3>
            <p className="text-muted-foreground max-w-sm text-sm">
              Monitor your entire infrastructure with zero-latency dashboards
              and perfectly accurate data pipelines.
            </p>
          </div>
        </div>

        {/* Card 2: Top Right (Small) */}
        <div
          className={cn(
            bentoCardClass,
            'min-h-[320px] flex-col justify-start md:col-span-1',
          )}
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Text Content (Top Left) */}
          <div className="relative z-10 flex flex-col gap-2 pb-4">
            <h3 className="text-foreground text-xl font-semibold">
              99.99% Uptime
            </h3>
            <p className="text-muted-foreground max-w-[200px] text-sm">
              Enterprise-grade reliability out of the box.
            </p>
          </div>

          {/* Visual Container */}
          <div className="relative z-10 flex w-full flex-1 items-end justify-center overflow-visible pt-6 pb-2">
            <motion.div className="relative z-10 flex w-full flex-col gap-3 overflow-hidden">
              <div className="border-border/50 flex items-center justify-between border-b pb-2">
                <span className="text-muted-foreground text-[9px] font-bold tracking-widest uppercase">
                  Global Network
                </span>
                <div className="flex items-center gap-1.5">
                  <motion.div
                    className="bg-primary size-1.5 rounded-full shadow-[0_0_8px_var(--primary)]"
                    animate={
                      hoveredCard === 2
                        ? { opacity: [1, 0.3, 1] }
                        : { opacity: 1 }
                    }
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-primary text-[9px] font-bold tracking-wider uppercase">
                    100% Healthy
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { name: 'Edge CDN', delay: 0.2 },
                  { name: 'Compute', delay: 0.5 },
                  { name: 'Database', delay: 0.8 },
                ].map((service) => (
                  <div key={service.name} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground text-[10px] font-semibold">
                        {service.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <motion.span
                          className="text-primary font-mono text-[9px] drop-shadow-[0_0_4px_var(--primary)]"
                          initial={{ opacity: 0, x: -5 }}
                          animate={
                            hoveredCard === 2
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -5 }
                          }
                          transition={{
                            type: 'spring',
                            delay: hoveredCard === 2 ? service.delay + 0.4 : 0,
                          }}
                        >
                          99.99%
                        </motion.span>
                        <div className="bg-muted relative h-1 w-12 overflow-hidden rounded-full">
                          <motion.div
                            className="bg-primary absolute top-0 bottom-0 left-0 shadow-[0_0_8px_var(--primary)]"
                            initial={{ width: '0%' }}
                            animate={
                              hoveredCard === 2
                                ? { width: '100%' }
                                : { width: '0%' }
                            }
                            transition={{
                              duration: 0.6,
                              delay: hoveredCard === 2 ? service.delay : 0,
                              ease: 'easeOut',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(14)].map((_, j) => (
                        <motion.div
                          key={j}
                          className="bg-primary h-2 flex-1 rounded-[1px]"
                          initial={{ opacity: 0.2 }}
                          animate={
                            hoveredCard === 2
                              ? {
                                  opacity: [0.2, 0.9, 0.2],
                                }
                              : {
                                  opacity: 0.2,
                                }
                          }
                          transition={{
                            duration: 0.4,
                            delay:
                              hoveredCard === 2 ? service.delay + j * 0.03 : 0,
                            ease: 'easeOut',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Card 3: Bottom Left (Small) */}
        <div
          className={cn(
            bentoCardClass,
            'min-h-[320px] flex-col justify-end md:col-span-1',
          )}
          onMouseEnter={() => setHoveredCard(3)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Visual Container */}
          <div className="relative z-10 flex w-full flex-1 items-start justify-center overflow-visible pt-8">
            <div className="relative flex w-full flex-col items-center">
              
              {/* Alert Bell */}
              <motion.div 
                className="relative z-30 flex size-12 items-center justify-center rounded-2xl border border-border/50 bg-background/50 shadow-sm backdrop-blur-md"
                animate={hoveredCard === 3 ? { y: -10 } : { y: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-foreground"
                  animate={hoveredCard === 3 ? { rotate: [0, -15, 15, -15, 15, 0] } : { rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </motion.svg>
                
                {/* Ping Dot */}
                <motion.div 
                  className="absolute right-3 top-3 size-2 rounded-full bg-primary"
                  initial={{ scale: 0 }}
                  animate={hoveredCard === 3 ? { scale: 1 } : { scale: 0 }}
                  transition={{ type: "spring", delay: 0.3 }}
                />
                <motion.div 
                  className="absolute right-3 top-3 size-2 rounded-full bg-primary"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={hoveredCard === 3 ? { scale: 2.5, opacity: 0 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 1, delay: 0.3, repeat: hoveredCard === 3 ? Infinity : 0 }}
                />
              </motion.div>

              {/* Toast Stack Container */}
              <div className="absolute top-6 flex w-full flex-col items-center justify-center pt-8">
                {/* Primary Alert Toast */}
                <motion.div
                  className="relative z-20 flex w-[220px] items-center gap-3 rounded-xl border border-border/40 bg-background/80 p-3 shadow-lg backdrop-blur-md"
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={hoveredCard === 3 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.2 }}
                >
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <div className="size-1.5 rounded-full bg-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-foreground">Traffic Spike Detected</span>
                    <span className="text-[10px] text-muted-foreground">Auto-scaled to 5 nodes</span>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>

          {/* Text Content (Bottom Left) */}
          <div className="relative z-10 flex flex-col gap-2 pt-4">
            <h3 className="text-foreground text-xl font-semibold">
              Smart Alerts
            </h3>
            <p className="text-muted-foreground max-w-[200px] text-sm">
              Get notified immediately before critical incidents happen.
            </p>
          </div>
        </div>

        {/* Card 4: Bottom Right (Large) */}
        <div
          className={cn(
            bentoCardClass,
            'min-h-[320px] flex-col items-end justify-start text-right md:col-span-2',
          )}
          onMouseEnter={() => setHoveredCard(4)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Text Content (Top Right) */}
          <div className="relative z-10 flex flex-col items-end gap-2 pb-4">
            <h3 className="text-foreground text-xl font-semibold">
              Global Edge Network
            </h3>
            <p className="text-muted-foreground max-w-sm text-sm">
              Deploy your applications globally across 35+ regions with
              automated intelligent routing and load balancing.
            </p>
          </div>

          {/* Visual Container */}
          <div className="relative z-10 flex w-full flex-1 items-end justify-center overflow-hidden min-h-[200px]">
            {/* World Map */}
            <div 
              className="absolute inset-0 opacity-80 flex items-center justify-center pointer-events-none"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)'
              }}
            >
              <div className="w-[140%] min-w-[800px] mt-16">
                <Map />
              </div>
            </div>
            
            <motion.div
              className="absolute inset-0 z-0"
              animate={hoveredCard === 4 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[80px] rounded-[100%] bg-primary/15 blur-3xl"></div>
            </motion.div>

            {/* Pins */}
            <div className="absolute inset-0 w-full h-full">
               {[
                 { src: 'https://assets.watermelon.sh/wm_ben.png', name: 'Mark', top: '10%', left: '15%', delay: 0 },
                 { src: 'https://assets.watermelon.sh/wm_olivia.png', name: 'Olivia', top: '35%', left: '35%', delay: 0.4 },
                 { src: 'https://assets.watermelon.sh/wm_josh.png', name: 'Josh', top: '5%', left: '60%', delay: 0.2 },
                 { src: 'https://assets.watermelon.sh/wm_emma.png', name: 'Emma', top: '25%', left: '85%', delay: 0.6 },
               ].map((avatar, idx) => (
                 <motion.div
                   key={idx}
                   className="absolute flex flex-col items-center"
                   style={{ top: avatar.top, left: avatar.left }}
                   initial={{ y: 0 }}
                   animate={hoveredCard === 4 ? { y: [0, -6, 0] } : { y: 0 }}
                   transition={{ 
                     y: hoveredCard === 4 
                       ? { duration: 3, repeat: Infinity, ease: "easeInOut", delay: avatar.delay } 
                       : { duration: 0.5, ease: "easeOut" }
                   }}
                 >
                   <div className="relative z-10 flex size-9 items-center justify-center rounded-full border border-border/80 bg-background shadow-sm overflow-hidden">
                     <img src={avatar.src} alt={avatar.name} className="size-[34px] rounded-full object-cover" />
                     {/* Status Dot */}
                     <motion.div 
                       className="absolute bottom-0 right-0 size-2.5 rounded-full border-[1.5px] border-background bg-primary"
                       animate={hoveredCard === 4 ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                       transition={
                         hoveredCard === 4 
                           ? { duration: 2, repeat: Infinity, delay: avatar.delay } 
                           : { duration: 0.3 }
                       }
                     />
                   </div>
                   {/* Pin Tail */}
                   <svg width="8" height="10" viewBox="0 0 8 10" fill="none" className="-mt-px text-border/80 z-0">
                     <path d="M1 0L4 9L7 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                   </svg>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
