"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { GithubIcon } from 'lucide-react';

const Bento6 = () => {
  return (
    <div
      className="flex min-h-screen items-center justify-center overflow-x-hidden bg-[#08080A] p-6 font-sans text-white selection:bg-blue-500/30 md:p-10 lg:p-12"
      style={{ fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif' }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <Card className="group flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-white/5 bg-[#0F1117] p-0 text-white shadow-2xl ring-0 transition-all duration-300 hover:border-white/10 md:col-span-12 lg:col-span-7 md:lg:rounded-tl-[40px]">
            <CardContent className="relative flex w-full flex-1 flex-col items-center justify-center p-0 md:max-h-[320px]">
              <Card1 />
            </CardContent>

            <CardFooter className="relative z-10 flex w-full flex-col border-none bg-transparent bg-gradient-to-t from-[#0F1117] via-[#0F1117] to-transparent p-6 pt-12 pb-8 text-center sm:p-6 sm:pt-0">
              <h3 className="mb-2 text-2xl font-bold">
                Gorgeous out of the box
              </h3>
              <p className="mx-auto max-w-sm text-sm text-zinc-500">
                Everything you need to start building fast.
              </p>
            </CardFooter>
          </Card>

          {/* Card 2: Developer forward */}
          <Card className="group flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-white/5 bg-[#0F1117] p-0 text-white shadow-2xl ring-0 transition-all duration-300 hover:border-white/10 md:col-span-12 lg:col-span-5 md:lg:rounded-tr-[40px]">
            <CardContent className="relative flex min-h-[300px] w-full flex-1 flex-col items-center justify-center p-0 md:min-h-[320px]">
              <Card2 />
            </CardContent>

            <CardFooter className="relative z-10 flex w-full flex-col border-none bg-gradient-to-t from-[#0F1117] via-[#0F1117] to-transparent p-6 pb-8 text-center">
              <h3 className="mb-2 text-2xl font-bold">Developer forward</h3>
              <p className="mx-auto max-w-sm text-sm text-zinc-500">
                Built for developers with clean and flexible tools.
              </p>
            </CardFooter>
          </Card>

          {/* Card 3: Build for performance */}
          <Card className="group flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-white/5 bg-[#0F1117] p-0 text-white shadow-xl ring-0 transition-all duration-300 hover:border-white/10 md:col-span-6 lg:col-span-4 md:lg:rounded-bl-[40px]">
            <CardContent className="flex min-h-[240px] w-full flex-1 flex-col items-center justify-center py-6 md:min-h-[280px]">
              <Card3 />
            </CardContent>
            <CardFooter className="mt-auto flex w-full flex-col border-none bg-transparent p-6 pb-8 text-center">
              <h3 className="mb-2 text-xl font-bold">Build for performance</h3>
              <p className="mx-auto max-w-[200px] text-sm text-zinc-500">
                Fast, efficient, and optimized for scale and reliability.
              </p>
            </CardFooter>
          </Card>

          {/* Card 4: Conversion as a priority */}
          <Card className="group flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-white/5 bg-[#0F1117] p-0 text-white shadow-xl ring-0 transition-all duration-300 hover:border-white/10 md:col-span-6 lg:col-span-4">
            <CardContent className="relative flex min-h-[240px] w-full flex-1 flex-col items-center justify-center p-0 md:min-h-[280px]">
              <Card4 />
            </CardContent>
            <CardFooter className="mt-auto flex w-full flex-col border-none bg-transparent p-6 pb-8 text-center">
              <h3 className="mb-2 text-xl font-bold">
                Conversion as a priority
              </h3>
              <p className="mx-auto max-w-[200px] text-sm text-zinc-500">
                Designed to turn visitors into loyal customers.
              </p>
            </CardFooter>
          </Card>

          {/* Card 5: Effortless funding */}
          <Card className="group flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-white/5 bg-[#0F1117] p-0 text-white shadow-xl ring-0 transition-all duration-300 hover:border-white/10 md:col-span-12 lg:col-span-4 md:lg:rounded-br-[40px]">
            <CardContent className="relative flex min-h-[240px] w-full flex-1 flex-col items-center justify-center p-8 py-6 md:min-h-[280px]">
              <Card5 />
            </CardContent>
            <CardFooter className="flex w-full flex-col border-none bg-transparent p-6 pb-8 text-center">
              <h3 className="mb-2 text-xl font-bold">Effortless funding</h3>
              <p className="mx-auto max-w-[260px] text-sm text-zinc-500">
                Simple payments and subscription management for your business.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Background Subtle Effects */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute right-[10%] bottom-[20%] h-[350px] w-[350px] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>
    </div>
  );
};

export default Bento6;

const Card1 = () => {
  const [activeTab, setActiveTab] = useState<'doc' | 'api'>('doc');

  return (
    <div
      className="h-full w-[92%] translate-y-6 transform overflow-hidden rounded-tl-xl rounded-tr-xl border-x border-t border-[#A09B9B]/20 bg-[#0E1419] mask-b-from-90% md:w-[85%]"
      onMouseEnter={() => setActiveTab('api')}
      onMouseLeave={() => setActiveTab('doc')}
    >
      <div className="flex h-10 w-full items-center justify-start gap-2 border-b border-[#A09B9B]/20 pl-4">
        <span className="size-2 rounded-full bg-[#A09B9B]/20" />
        <span className="size-2 rounded-full bg-[#A09B9B]/20" />
        <span className="size-2 rounded-full bg-[#A09B9B]/20" />
      </div>

      <div className="flex h-12 w-full items-center justify-between gap-2 border-b border-[#A09B9B]/20 px-4 md:px-6">
        <div className="flex shrink-0 items-center justify-center gap-2">
          <Icon className="size-6 text-[#155EEF] md:size-8" />
          <p className="text-base font-semibold text-[#1145AA] md:text-xl">
            Starter Kit
          </p>
        </div>

        <input
          type="text"
          placeholder="Search"
          className="w-24 rounded-lg border border-[#A09B9B]/20 bg-transparent px-3 py-1 text-[10px] transition-all outline-none focus:border-[#155EEF]/50 sm:w-40 md:w-56"
        />
      </div>

      <div className="flex items-center gap-2 px-4 py-2 md:gap-5 md:px-6">
        <button
          onClick={() => setActiveTab('doc')}
          className={`border-b-2 py-1 text-xs font-semibold transition-all duration-300 md:text-sm ${
            activeTab === 'doc'
              ? 'border-[#1145AA] text-white'
              : 'border-transparent text-[#838883] hover:text-white/80'
          }`}
        >
          Documentation
        </button>
        <button
          // onClick removed for API Reference
          className={`border-b-2 py-1 text-xs font-semibold transition-all duration-300 md:text-sm ${
            activeTab === 'api'
              ? 'border-[#1145AA] text-white'
              : 'border-transparent text-[#838883] hover:text-white/80'
          }`}
        >
          API Reference
        </button>
      </div>

      <div className="flex h-[150px] w-full flex-col px-4 pt-2 pb-4 md:h-[180px] md:px-6">
        <AnimatePresence mode="wait">
          {activeTab === 'doc' ? (
            <motion.div
              key="doc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex flex-col items-start justify-center gap-6 sm:flex-row sm:gap-4"
            >
              <div className="flex w-full flex-col items-start gap-3 text-[#838883] sm:w-1/2">
                <div className="flex items-center gap-2">
                  <div className="rounded-md border-2 border-[#1145AA] p-0.5">
                    <Folder className="size-4 md:size-5" />
                  </div>
                  <p className="text-xs font-semibold md:text-sm">
                    Getting Started
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-md border-2 border-[#1145AA] p-0.5">
                    <API className="size-4 text-[#1145AA] md:size-5" />
                  </div>
                  <p className="text-xs font-semibold md:text-sm">
                    API Reference
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-md border-2 border-[#1145AA] p-0.5">
                    <Profile className="size-4 text-[#1145AA] md:size-5" />
                  </div>
                  <p className="text-xs font-semibold md:text-sm">
                    User Guides
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col items-start gap-2 sm:w-1/2 md:gap-3">
                <div className="flex flex-col gap-1 md:gap-2">
                  <h3 className="text-[9px] font-bold tracking-wider text-[#1145AA]/80 uppercase md:text-[10px]">
                    Get Started
                  </h3>
                  <div className="flex flex-col">
                    <h1 className="text-sm font-semibold text-white md:text-base">
                      Introduction
                    </h1>
                    <p className="text-[10px] leading-tight text-[#838883] md:text-xs">
                      Gain control of your spending with intuitive tracking.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="api"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex flex-col items-start justify-center gap-6 sm:flex-row sm:gap-4"
            >
              <div className="flex w-full flex-col items-start gap-3 text-[#838883] sm:w-1/2">
                <div className="flex items-center gap-2">
                  <div className="rounded border border-blue-500/20 bg-blue-500/10 px-1 py-0.5 font-mono text-[9px] text-blue-400 md:text-[10px]">
                    GET
                  </div>
                  <p className="font-mono text-[10px] md:text-xs">
                    /v1/user/profile
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded border border-blue-500/20 bg-green-500/10 px-1 py-0.5 font-mono text-[9px] text-green-400 md:text-[10px]">
                    POST
                  </div>
                  <p className="font-mono text-[10px] md:text-xs">
                    /v1/user/auth
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded border border-blue-500/20 bg-purple-500/10 px-1 py-0.5 font-mono text-[9px] text-purple-400 md:text-[10px]">
                    PUT
                  </div>
                  <p className="font-mono text-[10px] md:text-xs">
                    /v1/user/update
                  </p>
                </div>
              </div>

              <div className="flex w-full shrink-0 flex-col items-start gap-1 rounded-lg border border-white/5 bg-[#08080A]/80 p-2 font-mono text-[9px] shadow-inner sm:w-1/2 md:p-3 md:text-[10px]">
                <div className="mb-0.5 flex w-full items-center justify-between border-b border-white/5 pb-0.5">
                  <span className="text-zinc-500">Response</span>
                  <span className="text-blue-500">200 OK</span>
                </div>
                <div className="leading-tight text-zinc-400">
                  {'{'}
                  <div className="pl-3">
                    <span className="text-blue-400">"status"</span>:{' '}
                    <span className="text-amber-400">"success"</span>,
                  </div>
                  <div className="pl-3">
                    <span className="text-blue-400">"data"</span>: {'{'}
                    <div className="pl-3">
                      <span className="text-blue-400">"id"</span>:{' '}
                      <span className="text-amber-400">"usr_928"</span>,
                    </div>
                    <div className="hidden pl-3 sm:block">
                      <span className="text-blue-400">"email"</span>:{' '}
                      <span className="text-amber-400">"malay@patel.com"</span>,
                    </div>
                    <div className="hidden pl-3 md:block">
                      <span className="text-blue-400">"role"</span>:{' '}
                      <span className="text-amber-400">"premium"</span>
                    </div>
                    <div className="pl-0">{'}'}</div>
                  </div>
                  {'}'}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Icon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="33"
      height="40"
      viewBox="0 0 33 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5 36.6668C25.6127 36.6668 33 29.2049 33 20.0002C33 10.7954 25.6127 3.3335 16.5 3.3335C7.38728 3.3335 0 10.7954 0 20.0002C0 29.2049 7.38728 36.6668 16.5 36.6668ZM21.6474 11.0975C21.898 10.1986 21.0343 9.66691 20.2455 10.2346L9.23431 18.1582C8.37887 18.7737 8.51342 20.0002 9.43643 20.0002H12.336V19.9775H17.9871L13.3825 21.6186L11.3526 28.9028C11.102 29.8018 11.9656 30.3334 12.7545 29.7657L23.7657 21.8422C24.6211 21.2267 24.4865 20.0002 23.5636 20.0002H19.1665L21.6474 11.0975Z"
        fill="currentColor"
      />
    </svg>
  );
};

const Folder = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5 7.5H12.75L11.25 6H4.5C3.67157 6 3 6.67157 3 7.5V16.5C3 17.3284 3.67157 18 4.5 18H19.5C20.3284 18 21 17.3284 21 16.5V9C21 8.17157 20.3284 7.5 19.5 7.5ZM19.5 16.5H4.5V7.5H10.5L12 9H19.5V16.5Z"
        fill="#155EEF"
      />
    </svg>
  );
};

const API = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`icon icon-tabler icons-tabler-filled icon-tabler-sitemap ${className}`}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M2 16.667a2.667 2.667 0 0 1 2.667 -2.667h2.666a2.667 2.667 0 0 1 2.667 2.667v2.666a2.667 2.667 0 0 1 -2.667 2.667h-2.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
      <path d="M14 16.667a2.667 2.667 0 0 1 2.667 -2.667h2.666a2.667 2.667 0 0 1 2.667 2.667v2.666a2.667 2.667 0 0 1 -2.667 2.667h-2.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
      <path d="M8 4.667a2.667 2.667 0 0 1 2.667 -2.667h2.666a2.667 2.667 0 0 1 2.667 2.667v2.666a2.667 2.667 0 0 1 -2.667 2.667h-2.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
      <path d="M12 8a1 1 0 0 0 -1 1v2h-3c-1.645 0 -3 1.355 -3 3v1a1 1 0 0 0 1 1a1 1 0 0 0 1 -1v-1c0 -.564 .436 -1 1 -1h8c.564 0 1 .436 1 1v1a1 1 0 0 0 1 1a1 1 0 0 0 1 -1v-1c0 -1.645 -1.355 -3 -3 -3h-3v-2a1 1 0 0 0 -1 -1z" />
    </svg>
  );
};

const Profile = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`icon icon-tabler icons-tabler-filled icon-tabler-user ${className}`}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
      <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
    </svg>
  );
};

const Card2 = () => {
  const lines = [
  "## Setting up",
  "",
  "Description...",
  "",
  "<CardGroup cols={12} />",
  "<Card />"
];

const typingSpeed = 40; // ms per char
const lineDelay = 600;  // delay before next line
const restartDelay = 1500;

const [displayedLines, setDisplayedLines] = useState([""]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= lines.length) {
      // restart loop
      const timeout = setTimeout(() => {
        setDisplayedLines([""]);
        setCurrentLine(0);
        setCurrentChar(0);
      }, restartDelay);
      return () => clearTimeout(timeout);
    }

    if (currentChar < lines[currentLine].length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLine] =
            (updated[currentLine] || "") +
            lines[currentLine][currentChar];
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, ""]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, lineDelay);

      return () => clearTimeout(timeout);
    }
  }, [currentChar, currentLine]);

  return (
    <div className="flex h-60 sm:h-70 w-80 md:w-110 flex-col rounded-t-xl border-x border-t border-[#A09B9B]/20 bg-[#0E1419] mask-b-from-90%">
      
      {/* Header */}
      <div className="flex w-full items-center justify-between px-8 border-b border-[#A09B9B]/20 py-1">
        <div className="flex items-center gap-2 py-2">
          <GithubIcon className="size-5 text-zinc-200" />
          <span className="font-mono text-xs text-zinc-500">
            quickstart.jsx
          </span>
        </div>
        <span className="text-zinc-500">Quick Start</span>
      </div>

      {/* Terminal */}
      <div className="w-full flex flex-col gap-1 sm:gap-2 p-6 font-mono text-sm">
        {displayedLines.map((line, index) => (
          <div key={index} className="flex gap-6">
            <span className="text-blue-200">{index + 1}</span>
            <p className="text-blue-200">
              {line}
              {/* Cursor */}
              {index === displayedLines.length - 1 && (
                <motion.span
                  className="inline-block w-2 h-4 bg-blue-200 ml-1"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                />
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Card3 = () => {
  return (
    <Icon className="size-40 text-[#98A5BE] transition-all duration-300 ease-out hover:size-45 hover:text-[#155EEF]" />
  );
};

const Card5 = () => {
  const items = [
    { title: 'Developer forward', desc: 'with intuitive tracking and tools.' },
    { title: 'Designer creative', desc: 'enhanced user experience design.' },
    { title: 'Product strategic', desc: 'seamless and rapid integration.' },
  ];

  return (
    <div className="relative w-full max-w-[280px] px-4">
      {/* Background Vertical Line */}
      <div className="absolute top-4 bottom-4 left-[24px] w-px bg-white/5" />

      {/* Moving Spark on the line */}
      <motion.div
        className="absolute left-[24px] z-0 h-16 w-px bg-linear-to-b from-transparent via-blue-500 to-transparent"
        animate={{
          top: ['-5%', '85%'],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="space-y-4">
        {items.map((item, i) => (
          <TimelineItem key={i} index={i} title={item.title} desc={item.desc} />
        ))}
      </div>
    </div>
  );
};

const TimelineItem = ({
  index,
  title,
  desc,
}: {
  index: number;
  title: string;
  desc: string;
}) => {
  const syncDelay = index * 2;
  const syncDuration = 2.5;

  return (
    <div className="group relative flex items-center gap-6">
      {/* Node (Dot) */}
      <div className="relative shrink-0">
        <motion.div
          className="relative z-10 size-4 rounded-full bg-blue-600"
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              '0 0 10px rgba(37, 99, 235, 0.4)',
              '0 0 30px rgba(37, 99, 235, 0.8)',
              '0 0 10px rgba(37, 99, 235, 0.4)',
            ],
          }}
          transition={{
            duration: syncDuration,
            repeat: Infinity,
            delay: syncDelay,
            ease: 'easeInOut',
          }}
        />

        {/* Subtle Outer Ring Pulse */}
        <motion.div
          className="absolute inset-0 size-4 rounded-full border border-blue-500/50"
          animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
          transition={{
            duration: syncDuration,
            repeat: Infinity,
            delay: syncDelay,
            ease: 'easeOut',
          }}
        />
      </div>

      {/* Content Card */}
      <div className="group relative flex flex-1 flex-col overflow-hidden rounded-xl border border-white/5 bg-[#0F1117]/50 p-3 backdrop-blur-xs">
        <div className="pointer-events-none absolute inset-0 bg-blue-500/2" />
        <span className="z-10 mb-1 text-sm font-bold text-zinc-100">
          {title}
        </span>
        <span className="z-10 text-[11px] leading-relaxed font-medium text-zinc-500">
          {desc}
        </span>
      </div>
    </div>
  );
};

const GoogleCloudIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 100 100"
      className={className}
    >
      <g clipPath="url(#a)">
        <path
          fill="#ea4335"
          d="M63.453 32.161h3.052l8.693-8.693.428-3.689C59.45 5.502 34.757 7.041 20.48 23.216a39 39 0 0 0-8.416 15.623 4.73 4.73 0 0 1 3.051-.185l17.383-2.867s.884-1.463 1.341-1.37c7.734-8.493 20.749-9.482 29.677-2.256z"
        />
        <path
          fill="#4285f4"
          d="M87.58 38.839a39.16 39.16 0 0 0-11.803-19.03L63.579 32.005a21.68 21.68 0 0 1 7.96 17.203v2.167c5.998 0 10.856 4.862 10.856 10.856 0 5.998-4.862 10.856-10.856 10.856H49.822l-2.167 2.197v13.023l2.167 2.167h21.717a28.25 28.25 0 0 0 27.19-19.86c3.689-11.891-.838-24.802-11.149-31.776"
        />
        <path
          fill="#34a853"
          d="M28.076 90.354h21.716V72.97H28.076c-1.547 0-3.077-.331-4.485-.977l-3.052.944-8.752 8.693-.763 3.052a28.1 28.1 0 0 0 17.052 5.67"
        />
        <path
          fill="#fbbc05"
          d="M28.076 33.96A28.24 28.24 0 0 0 1.48 53.185a28.245 28.245 0 0 0 9.548 31.4L23.624 71.99c-5.466-2.469-7.893-8.899-5.424-14.365 2.469-5.465 8.899-7.892 14.365-5.424a10.9 10.9 0 0 1 5.424 5.424L50.585 45.03a28.23 28.23 0 0 0-22.51-11.07"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 10h100v80.475H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

const ClineIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 100 100"
      className={className}
    >
      <path
        fill="#fff"
        d="M70.894 16.632c11.461 0 20.752 9.33 20.752 20.842v6.947l6.041 12.068a4.21 4.21 0 0 1-.007 3.785L91.646 72.21v6.948c0 11.511-9.29 20.842-20.752 20.842H29.39c-11.46 0-20.752-9.331-20.752-20.842V72.21L2.472 60.311a4.21 4.21 0 0 1-.008-3.86l6.174-12.03v-6.947c0-11.511 9.291-20.842 20.752-20.842zM34.353 40a9.474 9.474 0 0 0-9.474 9.474v16.842a9.474 9.474 0 1 0 18.947 0V49.474A9.474 9.474 0 0 0 34.353 40m30.526 0a9.474 9.474 0 0 0-9.474 9.474v16.842a9.474 9.474 0 1 0 18.948 0V49.474A9.474 9.474 0 0 0 64.879 40"
      />
      <path
        fill="#fff"
        d="M50.142 23.158c6.395 0 11.579-5.184 11.579-11.58C61.721 5.185 56.537 0 50.142 0S38.563 5.184 38.563 11.579s5.184 11.579 11.58 11.579"
      />
    </svg>
  );
};

const CloudfareIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 100 100"
      className={className}
    >
      <g clipPath="url(#a)">
        <path
          fill="#fff"
          d="m79.046 46.295-2.075-.83c-9.75 21.939-48.539 8.601-50.873 15.128-.39 4.408 21.182.838 36.604 1.585 4.702.228 7.06 3.778 5.064 9.564l3.933.012C76.236 57.61 90.716 64.83 91.32 60.16c-.994-3.069-16.64 0-12.275-13.865"
        />
        <path
          fill="#f4811f"
          d="M68.88 69.323c.622-2.074.415-4.149-.623-5.394-1.037-1.245-2.49-2.074-4.357-2.282l-36.1-.415c-.207 0-.414-.207-.622-.207q-.31-.312 0-.623c.208-.415.415-.622.83-.622l36.307-.415c4.357-.207 8.922-3.735 10.581-7.884l2.075-5.394c0-.208.207-.415 0-.623C74.69 34.885 65.145 27 53.941 27c-10.373 0-19.294 6.639-22.406 15.975-2.075-1.452-4.564-2.282-7.469-2.074-4.979.414-8.92 4.563-9.543 9.543-.208 1.245 0 2.49.207 3.734C6.64 54.386 0 61.025 0 69.323c0 .83 0 1.453.207 2.283 0 .415.415.622.623.622h66.597c.415 0 .83-.207.83-.622z"
        />
        <path
          fill="#faad3f"
          d="M80.29 46.087h-1.037c-.207 0-.415.207-.622.415l-1.453 4.98c-.622 2.074-.414 4.149.623 5.393 1.037 1.245 2.49 2.075 4.357 2.283l7.676.415c.207 0 .415.207.623.207q.31.311 0 .622c-.208.416-.415.623-.83.623l-7.884.415c-4.357.207-8.921 3.734-10.58 7.883l-.416 1.868c-.207.207 0 .622.415.622h27.386q.622 0 .622-.622c.415-1.66.83-3.527.83-5.395 0-10.788-8.921-19.709-19.71-19.709"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h100v100H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

const FeatherlessIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 100 100"
      className={className}
    >
      <path
        fill="#ffe184"
        d="M94.683 12.867c-4.987-2.967-11.725-4.533-19.5-4.533-11.891 0-25 3.654-36.775 10.012l-.083-.03-.017.088c-3.562 1.934-7.016 4.088-10.258 6.492C8.946 39.066 3.596 55.883 8.113 64.876 3.167 73.091.125 81.595 0 91.665c9.5-17.637 15.2-31.928 46.15-55.99-8.842 1.845-24.125 10.603-34.408 23.895-.971-7.775 5.333-20.33 19.375-30.746a82 82 0 0 1 5.516-3.72c-1.475 4.462-1 3.354-4.062 9.612 4.525-4.171 7.5-6.75 11.97-13.896a79.2 79.2 0 0 1 17.817-6.104c-.991 3.196-2.875 8.612-5.425 12.896 0 0 6.471-1.35 11.821-1.042-2.92 3.137-5.554 6.537-8.22 10.013-3.65 4.758-7.426 9.674-12.263 14.254-.584.554-1.138 1.054-1.7 1.57-7.433-.695-12.338 2.013-16.938 6.792 3.625-1.646 8.5-3 11.55-2.183-5.625 4.47-14.487 10.362-21.766 9.875-1.384 2.05-1.471 2.112-2.988 4.583 11.813 2.867 26.646-8.825 35.375-17.096 5.121-4.85 9.021-9.929 12.792-14.833C72.354 29.434 79.058 20.7 93.929 17.379L100 16.025z"
      />
    </svg>
  );
};

const LumaIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 100 100"
      className={className}
    >
      <g clipPath="url(#a)">
        <path fill="#fff" d="M8.333 24.996 51.633 0v100l-43.3-25z" />
        <path fill="url(#b)" d="m51.633 100-43.3-25 43.3-25 43.305 25z" />
        <path fill="url(#c)" d="m51.633 100-43.3-25 43.3-25 43.305 25z" />
        <path
          fill="url(#d)"
          d="M8.333 24.996 51.633 0v100l-43.3-25z"
          style={{ mixBlendMode: 'screen' }}
        />
        <path
          fill="url(#e)"
          d="m51.633 100-43.3-25 43.3-25 43.305 25z"
          style={{ mixBlendMode: 'overlay' }}
        />
        <path
          fill="url(#f)"
          d="M8.333 24.996 51.633 0v100l-43.3-25z"
          style={{ mixBlendMode: 'overlay' }}
        />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1="8.333"
          x2="94.938"
          y1="75"
          y2="75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00a" />
          <stop offset="1" stopColor="#a78dff" />
        </linearGradient>
        <linearGradient
          id="c"
          x1="8.333"
          x2="94.938"
          y1="75"
          y2="75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00a" />
          <stop offset="1" stopColor="#a78dff" />
        </linearGradient>
        <linearGradient
          id="d"
          x1="57.283"
          x2="19.467"
          y1="94.341"
          y2="15.604"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#004eff" />
          <stop offset="1" stopColor="#0ff" />
        </linearGradient>
        <linearGradient
          id="e"
          x1="8.333"
          x2="94.938"
          y1="75"
          y2="75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00a" />
          <stop offset="1" stopColor="#a78dff" />
        </linearGradient>
        <linearGradient
          id="f"
          x1="57.283"
          x2="19.467"
          y1="94.341"
          y2="15.604"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#004eff" />
          <stop offset="1" stopColor="#0ff" />
        </linearGradient>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h100v100H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

const MoleculerIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 100 100"
      className={className}
    >
      <path
        fill="#3cafce"
        d="M62.476 7.825a9.75 9.75 0 0 0-9.75 9.75 9.75 9.75 0 0 0 5.178 8.584l-5.38 10.211a13.3 13.3 0 0 0-4.074-.646c-7.319 0-13.25 5.932-13.25 13.25.01.946.124 1.889.337 2.81l-10.71 3.92a11.22 11.22 0 0 0-9.5-5.253c-6.202 0-11.225 5.024-11.225 11.224 0 6.199 5.023 11.225 11.224 11.225 6.198 0 11.224-5.026 11.224-11.225a11.3 11.3 0 0 0-.262-2.401l10.266-4.508a13.25 13.25 0 0 0 11.896 7.459 13.25 13.25 0 0 0 8.034-2.756l8.64 8.224a16.3 16.3 0 0 0-2.85 9.157c0 8.99 7.287 16.274 16.274 16.274 8.991 0 16.275-7.284 16.275-16.275 0-8.988-7.284-16.275-16.275-16.275a16.3 16.3 0 0 0-10.257 3.677L59.1 56.802a13.25 13.25 0 0 0 2.601-7.828 13.26 13.26 0 0 0-5.753-10.919l4.56-10.955c.646.14 1.306.216 1.968.226 5.383 0 9.75-4.365 9.75-9.75s-4.366-9.751-9.75-9.751"
      />
    </svg>
  );
};

const Card4 = () => {
  const icons = [
    { component: GoogleCloudIcon, color: '#4285F4' },
    { component: ClineIcon, color: '#FFFFFF' },
    { component: LumaIcon, color: '#FFFFFF' },
    { component: MoleculerIcon, color: '#3cafce' },
    { component: CloudfareIcon, color: '#F4811F' },
    { component: FeatherlessIcon, color: '#ffe184' },
  ];

  return (
    <div className="relative flex h-[260px] w-full items-center justify-center overflow-hidden select-none">
      {/* Background Orbit Paths */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="size-[180px] rounded-full border border-white/5" />
        <div className="absolute size-[110px] rounded-full border border-white/3" />

        {/* Decorative Glow */}
        <div className="absolute size-40 rounded-full bg-blue-600/10 blur-[60px]" />
      </div>

      {/* Main Center Icon with Pulsing Effect */}
      <motion.div
        className="relative z-10"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon className="size-16 text-[#155EEF] drop-shadow-[0_0_15px_rgba(21,94,239,0.4)] md:size-20" />
      </motion.div>

      {/* Orbiting Icons */}
      <div className="absolute inset-0 flex items-center justify-center">
        {icons.map((item, i) => (
          <OrbitingElement
            key={i}
            index={i}
            total={icons.length}
            IconComponent={item.component}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
};

const OrbitingElement = ({
  index,
  total,
  IconComponent,
  color,
}: {
  index: number;
  total: number;
  IconComponent: React.ComponentType<{ className?: string }>;
  color: string;
}) => {
  // Use a smaller radius on mobile to prevent overflow
  const [radius, setRadius] = useState(105);

  useEffect(() => {
    const updateRadius = () => {
      setRadius(window.innerWidth < 640 ? 70 : 90);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const initialAngle = (index / total) * 360;
  const duration = 20;

  return (
    <motion.div
      className="absolute flex items-center justify-center"
      animate={{
        rotate: [initialAngle, initialAngle + 360],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        width: 0,
        height: 0,
      }}
    >
      <motion.div
        className="absolute z-20 flex cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[#1a1f2e] p-3 shadow-lg"
        animate={{
          rotate: [-initialAngle, -(initialAngle + 360)],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          x: radius,
        }}
        whileHover={{
          scale: 1.25,
          borderColor: `${color}60`,
          backgroundColor: `${color}20`,
          boxShadow: `0 0 20px ${color}30`,
          zIndex: 50,
        }}
      >
        <IconComponent className="size-8" />
      </motion.div>
    </motion.div>
  );
};
