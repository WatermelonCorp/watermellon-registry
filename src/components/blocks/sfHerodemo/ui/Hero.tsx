import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Leaf, Lightbulb, ChevronDown, Mic, Send } from "lucide-react";

const Hero: React.FC = () => {
  const [normalOpen, setNormalOpen] = useState(false);
  const [deepThinkOpen, setDeepThinkOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  } as const;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center relative z-50 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-gradient-to-br from-orange-600 to-indigo-600 bg-clip-text mt-16 sm:mt-24">
        <motion.h1
          variants={itemVariants}
          id="heading"
          className="text-4xl sm:text-4xl md:text-6xl font-bold inline-block text-transparent leading-snug"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          Build something Adorable
        </motion.h1>
        <motion.p
          id="subheading"
          variants={itemVariants}
          className="mt-3 sm:mt-4 px-2 sm:px-0 tracking-wide text-base sm:text-lg md:text-2xl text-[#A1A7A4]"
        >
          Create apps and websites by chatting with AI
        </motion.p>
      </div>

      <div className="relative pt-24 sm:py-24 lg:py-28 overflow-visible">
        {/* CSS-only background glows */}
        <div className="pointer-events-none absolute left-10 sm:left-1/3 lg:left-[30%] 2xl:left-[35%] top-1/3 lg:top-[41%] 2xl:top-[48%] -translate-x-1/2 -translate-y-1/2 w-60 sm:w-72 md:w-80 lg:w-[500px] 2xl:w-[600px] z-0 rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(236,72,153,0.35), transparent)" }} />
        <div className="pointer-events-none absolute right-10 sm:right-1/3 lg:right-[31%] 2xl:right-[35%] top-30 lg:top-[61%] translate-x-1/2 -translate-y-1/2 w-56 sm:w-72 md:w-80 lg:w-[500px] 2xl:w-[550px] z-0 rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.35), transparent)" }} />

        <motion.div
          variants={itemVariants}
          className="relative max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto border border-neutral-600 rounded-3xl p-4 sm:p-4 sm:py-2 z-10 bg-[#111216] backdrop-blur"
        >
          <div className="text-left text-lg px-2 sm:px-4">
            <input
              type="text"
              placeholder="Ask Anything..."
              className="w-full py-3 sm:py-4 border-none text-sm sm:text-lg outline-none bg-transparent text-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 sm:mt-9 space-y-4 sm:space-y-0 sm:space-x-3 p-2">
            <div className="flex flex-wrap items-center gap-2 relative">
              <button className="w-9 h-9 sm:w-12 sm:h-12 cursor-pointer flex items-center justify-center rounded-full bg-[#1a1b1e] border border-neutral-700 text-neutral-300 hover:bg-neutral-800">
                <Plus size={20} />
              </button>

              <div className="relative">
                <button
                  onClick={() => setNormalOpen(!normalOpen)}
                  className="flex items-center cursor-pointer space-x-2 px-4 py-2.5 rounded-full bg-[#1a1b1e] border border-neutral-700 text-neutral-300 text-sm sm:text-base hover:bg-neutral-800"
                >
                  <Leaf size={16} />
                  <span>Normal</span>
                  <ChevronDown size={18} className={`ml-1 transition-transform ${normalOpen ? "rotate-180" : ""}`} />
                </button>
                {normalOpen && (
                  <div className="absolute right-0 mt-2 w-fit text-left rounded-lg bg-[#1a1b1e] border border-neutral-700 shadow-lg">
                    <ul className="text-neutral-300 text-sm">
                      <li className="px-4 py-2 hover:bg-neutral-800 cursor-pointer">Fast</li>
                      <li className="px-4 py-2 hover:bg-neutral-800 cursor-pointer">Normal</li>
                      <li className="px-4 py-2 hover:bg-neutral-800 cursor-pointer">Creative</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setDeepThinkOpen(!deepThinkOpen)}
                  className="flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-full bg-[#1a1b1e] border border-neutral-700 text-neutral-300 text-sm sm:text-lg hover:bg-neutral-800"
                >
                  <Lightbulb size={16} />
                  <span>DeepThink</span>
                  <ChevronDown size={18} className={`ml-1 transition-transform ${deepThinkOpen ? "rotate-180" : ""}`} />
                </button>
                {deepThinkOpen && (
                  <div className="absolute right-0 mt-2 text-left w-fit rounded-lg bg-[#1a1b1e] border border-neutral-700 shadow-lg">
                    <ul className="text-neutral-300 text-sm">
                      <li className="px-4 py-2 hover:bg-neutral-800 cursor-pointer">DeepThink</li>
                      <li className="px-4 py-2 hover:bg-neutral-800 cursor-pointer">Critical</li>
                      <li className="px-4 py-2 hover:bg-neutral-800 cursor-pointer">Precise</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="flex items-center cursor-pointer space-x-2 px-3 py-2.5 rounded-full bg-[#1a1b1e] border border-neutral-700 text-neutral-300 text-sm sm:text-base hover:bg-neutral-800">
                <Mic size={18} />
                <span className="hidden sm:block">Voice</span>
              </button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 20px rgba(236, 72, 153, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-12 h-12 sm:w-14 cursor-pointer sm:h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white shadow-lg"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
