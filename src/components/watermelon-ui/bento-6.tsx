import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const Bento6 = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#08080A] text-white p-6 md:p-10 lg:p-12 font-sans selection:bg-blue-500/30 overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif' }}
    >

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <Card className="md:col-span-12 lg:col-span-7 bg-[#0F1117] border border-white/5 rounded-2xl md:lg:rounded-tl-[40px] overflow-hidden flex flex-col group transition-all duration-300 hover:border-white/10 shadow-2xl p-0 gap-0 ring-0 text-white h-full">
            <CardContent className="flex-1 p-0 flex flex-col items-center justify-center relative md:max-h-[320px] w-full">
              <Card1 />
            </CardContent>

            <CardFooter className="p-6 pb-8 text-center relative z-10 bg-gradient-to-t from-[#0F1117] via-[#0F1117] to-transparent flex flex-col w-full bg-transparent border-none">
              <h3 className="text-2xl font-bold mb-2">
                Gorgeous out of the box
              </h3>
              <p className="text-zinc-500 text-sm max-w-sm mx-auto">
                Everything you need to start building fast.
              </p>
            </CardFooter>
          </Card>

          {/* Card 2: Developer forward */}
          <Card className="md:col-span-12 lg:col-span-5 bg-[#0F1117] border border-white/5 rounded-2xl md:lg:rounded-tr-[40px] overflow-hidden flex flex-col group transition-all duration-300 hover:border-white/10 shadow-2xl p-0 gap-0 ring-0 text-white h-full">
            <CardContent className="flex-1 p-0 flex flex-col items-center justify-center relative min-h-[300px] md:min-h-[320px] w-full">
              <Card2 />
            </CardContent>

            <CardFooter className="p-6 pb-8 text-center relative z-10 bg-gradient-to-t from-[#0F1117] via-[#0F1117] to-transparent flex flex-col w-full border-none">
              <h3 className="text-2xl font-bold mb-2">Developer forward</h3>
              <p className="text-zinc-500 text-sm max-w-sm mx-auto">
                Built for developers with clean and flexible tools.
              </p>
            </CardFooter>
          </Card>

          {/* Card 3: Build for performance */}
          <Card className="md:col-span-6 lg:col-span-4 bg-[#0F1117] border border-white/5 rounded-2xl md:lg:rounded-bl-[40px] overflow-hidden flex flex-col group transition-all duration-300 hover:border-white/10 shadow-xl p-0 gap-0 ring-0 text-white h-full">
            <CardContent className="flex-1 flex flex-col items-center justify-center py-6 min-h-[240px] md:min-h-[280px] w-full">
              <Card3 />
            </CardContent>
            <CardFooter className="p-6 pb-8 text-center mt-auto flex flex-col w-full bg-transparent border-none">
              <h3 className="text-xl font-bold mb-2">Build for performance</h3>
              <p className="text-zinc-500 text-sm max-w-[200px] mx-auto">
                Fast, efficient, and optimized for scale and reliability.
              </p>
            </CardFooter>
          </Card>

          {/* Card 4: Conversion as a priority */}
          <Card className="md:col-span-6 lg:col-span-4 bg-[#0F1117] border border-white/5 rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:border-white/10 shadow-xl p-0 gap-0 ring-0 text-white h-full">
            <CardContent className="flex-1 p-0 flex flex-col items-center justify-center relative min-h-[240px] md:min-h-[280px] w-full">
              <Card4 />
            </CardContent>
            <CardFooter className="p-6 pb-8 text-center mt-auto flex flex-col w-full bg-transparent border-none">
              <h3 className="text-xl font-bold mb-2">
                Conversion as a priority
              </h3>
              <p className="text-zinc-500 text-sm max-w-[200px] mx-auto">
                Designed to turn visitors into loyal customers.
              </p>
            </CardFooter>
          </Card>

          {/* Card 5: Effortless funding */}
          <Card className="md:col-span-12 lg:col-span-4 bg-[#0F1117] border border-white/5 rounded-2xl md:lg:rounded-br-[40px] overflow-hidden flex flex-col group transition-all duration-300 hover:border-white/10 shadow-xl p-0 gap-0 ring-0 text-white h-full">
            <CardContent className="flex-1 p-8 py-6 flex flex-col items-center justify-center relative min-h-[240px] md:min-h-[280px] w-full">
              <Card5 />
            </CardContent>
            <CardFooter className="p-6 pb-8 text-center flex flex-col w-full bg-transparent border-none">
              <h3 className="text-xl font-bold mb-2">Effortless funding</h3>
              <p className="text-zinc-500 text-sm max-w-[260px] mx-auto">
                Simple payments and subscription management for your business.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Background Subtle Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
};

export default Bento6;

const Card1 = () => {
  const [activeTab, setActiveTab] = useState<"doc" | "api">("doc");

  return (
    <div className="w-[92%] md:w-[85%] h-full mask-b-from-90% bg-[#0E1419] border-x border-t border-[#A09B9B]/20 rounded-tl-xl rounded-tr-xl overflow-hidden transform translate-y-6">
      <div className="w-full h-10 border-b border-[#A09B9B]/20 flex items-center justify-start gap-2 pl-4">
        <span className="size-2 rounded-full bg-[#A09B9B]/20" />
        <span className="size-2 rounded-full bg-[#A09B9B]/20" />
        <span className="size-2 rounded-full bg-[#A09B9B]/20" />
      </div>

      <div className="w-full h-12 border-b border-[#A09B9B]/20 flex items-center justify-between gap-2 px-4 md:px-6">
        <div className="flex items-center gap-2 justify-center shrink-0">
          <Icon className="size-6 md:size-8 text-[#155EEF]" />
          <p className="text-base md:text-xl font-semibold text-[#1145AA]">
            Starter Kit
          </p>
        </div>

        <input
          type="text"
          placeholder="Search"
          className="outline-none border border-[#A09B9B]/20 bg-transparent rounded-lg py-1 px-3 text-[10px] w-24 sm:w-40 md:w-56 transition-all focus:border-[#155EEF]/50"
        />
      </div>

      <div className="flex items-center gap-2 md:gap-5 px-4 md:px-6 py-2">
        <button
          onClick={() => setActiveTab("doc")}
          className={`text-xs md:text-sm font-semibold py-1 border-b-2 transition-all duration-300 ${
            activeTab === "doc"
              ? "text-white border-[#1145AA]"
              : "text-[#838883] border-transparent hover:text-white/80"
          }`}
        >
          Documentation
        </button>
        <button
          onClick={() => setActiveTab("api")}
          className={`text-xs md:text-sm font-semibold py-1 border-b-2 transition-all duration-300 ${
            activeTab === "api"
              ? "text-white border-[#1145AA]"
              : "text-[#838883] border-transparent hover:text-white/80"
          }`}
        >
          API Reference
        </button>
      </div>

      <div className="w-full px-4 md:px-6 pt-2  h-[150px] md:h-[180px] pb-4 flex flex-col">
        <AnimatePresence mode="wait">
          {activeTab === "doc" ? (
            <motion.div
              key="doc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col sm:flex-row items-start justify-center gap-6 sm:gap-4"
            >
              <div className="w-full sm:w-1/2 flex flex-col items-start gap-3 text-[#838883]">
                <div className="flex gap-2 items-center">
                  <div className="p-0.5 rounded-md border-2 border-[#1145AA]">
                    <Folder className="size-4 md:size-5" />
                  </div>
                  <p className="text-xs md:text-sm font-semibold">
                    Getting Started
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="p-0.5 rounded-md border-2 border-[#1145AA]">
                    <API className="size-4 md:size-5 text-[#1145AA]" />
                  </div>
                  <p className="text-xs md:text-sm font-semibold">
                    API Reference
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="p-0.5 rounded-md border-2 border-[#1145AA]">
                    <Profile className="size-4 md:size-5 text-[#1145AA]" />
                  </div>
                  <p className="text-xs md:text-sm font-semibold">
                    User Guides
                  </p>
                </div>
              </div>

              <div className="w-full sm:w-1/2 flex flex-col items-start gap-2 md:gap-3">
                <div className="flex flex-col gap-1 md:gap-2">
                  <h3 className="text-[#1145AA]/80 font-bold text-[9px] md:text-[10px] uppercase tracking-wider">
                    Get Started
                  </h3>
                  <div className="flex flex-col">
                    <h1 className="text-white text-sm md:text-base font-semibold">
                      Introduction
                    </h1>
                    <p className="text-[10px] md:text-xs text-[#838883] leading-tight">
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
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col sm:flex-row items-start justify-center gap-6 sm:gap-4"
            >
              <div className="w-full sm:w-1/2 flex flex-col items-start gap-3 text-[#838883]">
                <div className="flex gap-2 items-center">
                  <div className="px-1 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[9px] md:text-[10px] font-mono border border-blue-500/20">
                    GET
                  </div>
                  <p className="text-[10px] md:text-xs font-mono">
                    /v1/user/profile
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="px-1 py-0.5 rounded bg-green-500/10 text-green-400 text-[9px] md:text-[10px] font-mono border border-blue-500/20">
                    POST
                  </div>
                  <p className="text-[10px] md:text-xs font-mono">
                    /v1/user/auth
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="px-1 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[9px] md:text-[10px] font-mono border border-blue-500/20">
                    PUT
                  </div>
                  <p className="text-[10px] md:text-xs font-mono">
                    /v1/user/update
                  </p>
                </div>
              </div>

              <div className="w-full sm:w-1/2 flex flex-col items-start gap-1 bg-[#08080A]/80 p-2 md:p-3 rounded-lg border border-white/5 font-mono text-[9px] md:text-[10px] shadow-inner shrink-0">
                <div className="w-full flex justify-between items-center mb-0.5 pb-0.5 border-b border-white/5">
                  <span className="text-zinc-500">Response</span>
                  <span className="text-blue-500">200 OK</span>
                </div>
                <div className="text-zinc-400 leading-tight">
                  {"{"}
                  <div className="pl-3">
                    <span className="text-blue-400">"status"</span>:{" "}
                    <span className="text-amber-400">"success"</span>,
                  </div>
                  <div className="pl-3">
                    <span className="text-blue-400">"data"</span>: {"{"}
                    <div className="pl-3">
                      <span className="text-blue-400">"id"</span>:{" "}
                      <span className="text-amber-400">"usr_928"</span>,
                    </div>
                    <div className="pl-3 hidden sm:block">
                      <span className="text-blue-400">"email"</span>:{" "}
                      <span className="text-amber-400">"malay@patel.com"</span>,
                    </div>
                    <div className="pl-3 hidden md:block">
                      <span className="text-blue-400">"role"</span>:{" "}
                      <span className="text-amber-400">"premium"</span>
                    </div>
                    <div className="pl-0">{"}"}</div>
                  </div>
                  {"}"}
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
  const [sessionKey, setSessionKey] = useState(0);

  const terminalTemplates = [
    [
      { text: "➜ ~ pkg install @motion/core", color: "text-zinc-100" },
      { text: "added 124 packages in 2.1s", color: "text-zinc-500" },
      { text: "➜ ~ npx ui-pro@latest init", color: "text-zinc-100" },
      {
        text: "✔ Configuration synced successfully",
        color: "text-emerald-400",
      },
      { text: "➜ ~ npm run dev:motion", color: "text-zinc-100" },
      { text: "▲ Ready - listening on port 3000", color: "text-sky-400" },
    ],
    [
      { text: "λ /motion-app: git branch", color: "text-violet-400" },
      { text: "* main", color: "text-zinc-100" },
      { text: "λ /motion-app: motion deploy --prod", color: "text-violet-400" },
      { text: "⠋ Uploading assets to edge...", color: "text-zinc-500" },
      { text: "✔ Deployment successful (2.4s)", color: "text-amber-400" },
      {
        text: "➜ https://motion.dev/prod-v42",
        color: "text-zinc-100 underline decoration-amber-500/50",
      },
    ],
  ];

  const currentLines = terminalTemplates[sessionKey % terminalTemplates.length];
  const isTemplateOne = sessionKey % 2 === 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionKey((prev) => prev + 1);
    }, 3000); // 6s loop for readability
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  } as const;

  const lineVariants = {
    initial: { opacity: 0, y: 4 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
      },
    },
  } as const;

  const cursorVariants = {
    animate: {
      opacity: [0, 1, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
  };

  return (
    <div className="w-[92%] md:w-[85%] h-[92%] bg-[#08080A] border border-white/10 rounded-xl overflow-hidden shadow-2xl transform translate-y-6 group">
      {/* Header */}
      <div className="h-10 border-b border-white/5 flex items-center px-3 md:px-4 justify-between bg-zinc-900/40 backdrop-blur-sm">
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="flex gap-1 md:gap-1.5 mr-1 md:mr-2">
            <div
              className={`size-2 md:size-2.5 rounded-full border transition-colors ${isTemplateOne ? "bg-red-500/20 border-red-500/30" : "bg-violet-500/20 border-violet-500/30"}`}
            />
            <div
              className={`size-2 md:size-2.5 rounded-full border transition-colors ${isTemplateOne ? "bg-amber-500/20 border-amber-500/30" : "bg-amber-500/20 border-amber-500/30"}`}
            />
            <div
              className={`size-2 md:size-2.5 rounded-full border transition-colors ${isTemplateOne ? "bg-emerald-500/20 border-emerald-500/30" : "bg-green-500/20 border-green-500/30"}`}
            />
          </div>
          <span className="text-[9px] md:text-[10px] text-zinc-600 font-mono tracking-tighter truncate max-w-[100px] md:max-w-none">
            {isTemplateOne ? "bash — setup" : "zsh — production"}
          </span>
        </div>
        <div className="text-[9px] md:text-[10px] text-zinc-700 font-mono italic">
          Card 2
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 font-mono text-[13px] leading-relaxed h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={sessionKey}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="space-y-1"
          >
            {currentLines.map((line, i) => (
              <motion.div
                key={i}
                variants={lineVariants}
                className="flex items-center flex-wrap"
              >
                <span className={line.color}>{line.text}</span>
                {i === currentLines.length - 1 && (
                  <motion.div
                    variants={cursorVariants}
                    className="ml-2 w-1.5 h-4 bg-blue-500/90 shadow-[0_0_8px_rgba(59,130,246,0.4)]"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const Card3 = () => {
  return (
    <Icon className="size-40 text-[#98A5BE] hover:size-45 transition-all ease-out duration-300 hover:text-[#155EEF]" />
  );
};

const Card5 = () => {
  const items = [
    { title: "Developer forward", desc: "with intuitive tracking and tools." },
    { title: "Designer creative", desc: "enhanced user experience design." },
    { title: "Product strategic", desc: "seamless and rapid integration." },
  ];

  return (
    <div className="w-full max-w-[280px] relative px-4">
      {/* Background Vertical Line */}
      <div className="absolute left-[24px] top-4 bottom-4 w-px bg-white/5" />

      {/* Moving Spark on the line */}
      <motion.div
        className="absolute left-[24px] w-px h-16 bg-linear-to-b from-transparent via-blue-500 to-transparent z-0"
        animate={{
          top: ["-5%", "85%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="space-y-4">
        {items.map((item, i) => (
          <TimelineItem
            key={i}
            index={i}
            title={item.title}
            desc={item.desc}
          />
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
    <div className="flex gap-6 items-center group relative">
      {/* Node (Dot) */}
      <div className="relative shrink-0">
        <motion.div
          className="size-4 rounded-full bg-blue-600 z-10 relative"
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              "0 0 10px rgba(37, 99, 235, 0.4)",
              "0 0 30px rgba(37, 99, 235, 0.8)",
              "0 0 10px rgba(37, 99, 235, 0.4)",
            ],
          }}
          transition={{
            duration: syncDuration,
            repeat: Infinity,
            delay: syncDelay,
            ease: "easeInOut",
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
            ease: "easeOut",
          }}
        />
      </div>

      {/* Content Card */}
      <div className="border border-white/5 rounded-xl p-3 flex-1 flex flex-col bg-[#0F1117]/50 backdrop-blur-xs relative overflow-hidden group">
        <div className="absolute inset-0 bg-blue-500/2 pointer-events-none" />
        <span className="text-sm font-bold text-zinc-100 mb-1 z-10">
          {title}
        </span>
        <span className="text-[11px] text-zinc-500 font-medium leading-relaxed z-10">
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
          style={{ mixBlendMode: "screen" }}
        />
        <path
          fill="url(#e)"
          d="m51.633 100-43.3-25 43.3-25 43.305 25z"
          style={{ mixBlendMode: "overlay" }}
        />
        <path
          fill="url(#f)"
          d="M8.333 24.996 51.633 0v100l-43.3-25z"
          style={{ mixBlendMode: "overlay" }}
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
    { component: GoogleCloudIcon, color: "#4285F4" },
    { component: ClineIcon, color: "#FFFFFF" },
    { component: LumaIcon, color: "#FFFFFF" },
    { component: MoleculerIcon, color: "#3cafce" },
    { component: CloudfareIcon, color: "#F4811F" },
    { component: FeatherlessIcon, color: "#ffe184" },
  ];

  return (
    <div className="relative w-full h-[260px] flex items-center justify-center select-none overflow-hidden">
      {/* Background Orbit Paths */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="size-[180px] rounded-full border border-white/5" />
        <div className="size-[110px] rounded-full border border-white/3 absolute" />

        {/* Decorative Glow */}
        <div className="absolute size-40 bg-blue-600/10 blur-[60px] rounded-full" />
      </div>

      {/* Main Center Icon with Pulsing Effect */}
      <motion.div
        className="relative z-10"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon className="size-16 md:size-20 text-[#155EEF] drop-shadow-[0_0_15px_rgba(21,94,239,0.4)]" />
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
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
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
        ease: "linear",
      }}
      style={{
        width: 0,
        height: 0,
      }}
    >
      <motion.div
        className="p-3 rounded-full bg-[#1a1f2e] border border-white/10 shadow-lg flex items-center justify-center cursor-pointer absolute z-20"
        animate={{
          rotate: [-initialAngle, -(initialAngle + 360)],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
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
