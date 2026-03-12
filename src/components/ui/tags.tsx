"use client";

import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig } from "motion/react";
import { X } from "lucide-react";

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

export function Tags({ tags = DEFAULT_TAGS }: TagsProps) {
  const [selecteds, setSelecteds] = useState<Tag[]>([]);

  const selectedsContainerRef = useRef<HTMLDivElement>(null);

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
    <MotionConfig transition={{ type: "spring", stiffness: 300, damping: 40 }}>
      <div className="relative flex w-[340px] flex-col p-6 sm:w-sm">
        <motion.h2
          layout
          className="text-xl font-semibold text-black dark:text-white"
        >
          TAGS
        </motion.h2>
        <motion.div
          ref={selectedsContainerRef}
          layout
          className="mt-2 mb-3 flex min-h-14 w-full flex-wrap gap-1.5 rounded-2xl border-[1.6px] border-[#E5E5E5] bg-[#fefefe] p-1.5 dark:border-neutral-800 dark:bg-neutral-900"
        >
          {selecteds.map((tag) => (
            <motion.div
              key={tag.id}
              layoutId={`tag-${tag.id}`}
              className="flex w-fit items-center gap-1 border-[1.6px] border-[#E5E5E5] bg-white py-1 pr-1 pl-3 dark:border-neutral-700 dark:bg-neutral-800"
              style={{ borderRadius: 10, zIndex: 20 }}
            >
              <motion.span
                layoutId={`tag-${tag.id}-label`}
                className="truncate font-medium text-gray-700 dark:text-neutral-200"
              >
                {tag.label}
              </motion.span>

              <button
                title="close"
                onClick={() => removeSelectedTag(tag.id)}
                className="rounded-full p-1"
              >
                <X className="size-5 text-gray-400 dark:text-neutral-400" />
              </button>
            </motion.div>
          ))}
        </motion.div>
        {tags.length > selecteds.length && (
          <motion.div
            layout
            className="w-full rounded-2xl border-[1.6px] border-[#E5E5E5] bg-white p-2 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <motion.div className="flex flex-wrap gap-2">
              {tags
                .filter(
                  (tag) => !selecteds.some((selected) => selected.id === tag.id)
                )
                .map((tag) => (
                  <motion.button
                    key={tag.id}
                    layoutId={`tag-${tag.id}`}
                    onClick={() => addSelectedTag(tag)}
                    className="flex shrink-0 items-center gap-1 rounded-full bg-[#F4F4FB] px-4 py-2.5 dark:bg-neutral-700"
                    style={{ borderRadius: 10, zIndex: 10 }}
                  >
                    <motion.span
                      layoutId={`tag-${tag.id}-label`}
                      className="font-medium text-gray-700 dark:text-neutral-200"
                    >
                      {tag.label}
                    </motion.span>
                  </motion.button>
                ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </MotionConfig>
  );
}
