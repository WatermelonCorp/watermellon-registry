"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { X, Sun, Moon } from "lucide-react";

export type Tag = {
  id: string;
  label: string;
};

type TagsProps = {
  tags?: Tag[];
};

const DEFAULT_TAGS: Tag[] = [
  { id: "javascript", label: "Javascript" },
  { id: "express", label: "Express" },
  { id: "vue", label: "Vue" },
  { id: "jest", label: "Jest" },
  { id: "next", label: "Next" },
  { id: "typescript", label: "Typescript" },
  { id: "redis", label: "Redis" },
  { id: "git", label: "Git" },
  { id: "node", label: "Node" },
];

export  function Tags({ tags = DEFAULT_TAGS }: TagsProps) {
  const [selecteds, setSelecteds] = useState<Tag[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const selectedsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (selectedsContainerRef.current) {
      selectedsContainerRef.current.scrollTo({
        left: selectedsContainerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [selecteds]);

  const removeSelectedTag = (id: string) => {
    setSelecteds((prev) => prev.filter((tag) => tag.id !== id));
  };

  const addSelectedTag = (tag: Tag) => {
    setSelecteds((prev) => [...prev, tag]);
  };

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-50 dark:bg-zinc-950 transition-colors duration-500">
      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="mb-10 p-3 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm hover:scale-110 transition-all"
      >
        {theme === "light" ? (
          <Moon size={20} className="text-gray-600" />
        ) : (
          <Sun size={20} className="text-yellow-400" />
        )}
      </button>

      <div className="p-6 max-w-lg w-full flex flex-col">
        <motion.h2
          layout
          className="text-xl font-semibold text-black dark:text-white"
        >
          TAGS
        </motion.h2>

        {/* Selected Tags */}
        <motion.div
          ref={selectedsContainerRef}
          layout
          className="w-full flex items-center gap-1.5 rounded-2xl bg-[#fefefe] dark:bg-zinc-900 border-[1.6px] border-[#E5E5E5] dark:border-zinc-800 h-14 mt-2 mb-3 overflow-x-auto p-1.5 no-scrollbar"
        >
          {selecteds.map((tag) => (
            <motion.div
              key={tag.id}
              layoutId={`tag-${tag.id}`}
              className="flex items-center gap-1 pl-3 pr-1 py-1 shadow-lg bg-white dark:bg-zinc-800 border-[1.6px] border-[#E5E5E5] dark:border-zinc-700 h-full shrink-0"
              style={{ borderRadius: 10 }}
            >
              <motion.span
                layoutId={`tag-${tag.id}-label`}
                className="font-medium text-gray-700 dark:text-zinc-200"
              >
                {tag.label}
              </motion.span>

              <button
                title="close"
                onClick={() => removeSelectedTag(tag.id)}
                className="p-1 rounded-full"
              >
                <X className="size-5 text-gray-400 dark:text-zinc-400" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Available Tags */}
        {tags.length > selecteds.length && (
          <motion.div
            layout
            className="bg-white dark:bg-zinc-900 shadow-xl p-2 rounded-2xl border-[1.6px] border-[#E5E5E5] dark:border-zinc-800 w-full"
          >
            <motion.div className="flex flex-wrap gap-2">
              {tags
                .filter(
                  (tag) =>
                    !selecteds.some((selected) => selected.id === tag.id)
                )
                .map((tag) => (
                  <motion.button
                    key={tag.id}
                    layoutId={`tag-${tag.id}`}
                    onClick={() => addSelectedTag(tag)}
                    className="flex items-center gap-1 px-4 py-2.5 bg-[#F4F4FB] dark:bg-zinc-800 rounded-full shrink-0"
                    style={{ borderRadius: 8 }}
                  >
                    <motion.span
                      layoutId={`tag-${tag.id}-label`}
                      className="font-medium text-gray-700 dark:text-zinc-200"
                    >
                      {tag.label}
                    </motion.span>
                  </motion.button>
                ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
