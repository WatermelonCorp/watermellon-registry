"use client";

import { CircleDashed, EllipsisIcon, X } from "lucide-react";
import React from "react";
import { AnimatePresence, motion } from "motion/react";

export interface StatusPickerItem {
  id: number;
  emoji: string;
  name: string;
}

interface StatusPickerProps {
  items: StatusPickerItem[];
  value?: number;
  defaultValue?: number;
  onChange?: (id: number) => void;
}

export const StatusPicker: React.FC<StatusPickerProps> = ({
  items,
  value,
  defaultValue = 0,
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [hoveredIdx, setHoveredIdx] = React.useState(0);
  const [internalStatus, setInternalStatus] = React.useState(defaultValue);

  const isControlled = value !== undefined;
  const status = isControlled ? value : internalStatus;

  const setStatus = (id: number) => {
    if (!isControlled) setInternalStatus(id);
    onChange?.(id);
  };

  const activeItem = items.find((item) => item.id === status);

  return (
    <div className="theme-injected h-[500px] flex w-full items-center justify-center">
      <div className="flex items-center justify-center">
        <motion.div
          layout
          className="bg-muted relative flex cursor-pointer items-center justify-center gap-1 rounded-lg px-4 py-2"
          onClick={() => {
            setOpen(!open);
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 18,
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div className="relative flex min-w-14 cursor-pointer items-center justify-start gap-1 overflow-hidden">
              <div className="flex items-center justify-center gap-[4px]">
                <AnimatePresence mode="popLayout" initial={false}>
                  {status === 0 ? (
                    <motion.div
                      key="default"
                      className="relative"
                      initial={{ scale: 0.5, filter: "blur(4px)", opacity: 0 }}
                      animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                      exit={{ scale: 0.5, filter: "blur(4px)", opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CircleDashed className="text-muted-foreground size-4" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="border-muted-foreground size-2 rounded-lg border" />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`${status}-${activeItem?.emoji}`}
                      className="flex size-6 items-center justify-center"
                      initial={{ scale: 0.5, filter: "blur(2px)", opacity: 0 }}
                      animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                      exit={{ scale: 0.5, filter: "blur(2px)", opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>{activeItem?.emoji}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <span className="text-foreground flex items-center justify-center text-sm font-medium">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {(status !== 0
                      ? (activeItem?.name.split("") ?? [])
                      : "Status".split("")
                    ).map((item, index) => {
                      if (item === " ") {
                        return (
                          <motion.span
                            key={`${index}-${status}-space`}
                            className="inline-block w-[0.3em]"
                          >
                            &nbsp;
                          </motion.span>
                        );
                      }

                      return (
                        <motion.span
                          key={`${index}-${status}-${item}`}
                          initial={{
                            opacity: 0,
                            y: 5,
                            filter: "blur(2px)",
                            scale: 0.8,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: "blur(0px)",
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                              delay: index * 0.04,
                            },
                          }}
                          exit={{
                            y: -8,
                            opacity: 0,
                            scale: 0.8,
                            filter: "blur(2px)",
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                              delay: index * 0.03,
                            },
                          }}
                          className="inline-block tracking-normal"
                        >
                          {item}
                        </motion.span>
                      );
                    })}
                  </AnimatePresence>

                  <AnimatePresence mode="popLayout">
                    {status !== 0 && (
                      <motion.span
                        className="bg-muted text-muted-foreground mt-[2px] ml-1 flex items-center justify-center rounded-lg p-[4px] text-sm font-medium"
                        key={`${status}-space`}
                        initial={{
                          opacity: 0,
                          filter: "blur(2px)",
                          scale: 0.8,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          filter: "blur(0px)",
                          transition: {
                            duration: 0.2,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.8,
                          filter: "blur(4px)",
                          transition: {
                            duration: 0.1,
                          },
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setStatus(0);
                        }}
                      >
                        <X className="text-foreground size-2" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            {open && (
              <motion.div
                className="border-border bg-background absolute -translate-y-[100%] rounded-lg border p-1"
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  filter: "blur(2px)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  filter: "blur(4px)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                }}
              >
                <div className="flex items-center justify-center gap-1">
                  {items.map((item, index) => (
                    <motion.div
                      key={index}
                      onMouseEnter={() => {
                        setHoveredIdx(item.id);
                      }}
                      onMouseLeave={() => {
                        setHoveredIdx(0);
                      }}
                      className="group bg-muted relative flex cursor-pointer items-center justify-center gap-1 rounded-lg p-2"
                      whileHover={{ y: -2 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 18,
                      }}
                    >
                      <AnimatePresence mode="popLayout">
                        {hoveredIdx === item.id && (
                          <motion.div
                            className="border-border bg-muted absolute -top-[40px] left-2 -translate-y-2 rounded-lg border"
                            initial={{
                              opacity: 0,
                              scale: 0.5,
                              filter: "blur(4px)",
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              filter: "blur(0px)",
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.5,
                              filter: "blur(4px)",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 23,
                            }}
                          >
                            <div className="relative flex w-full flex-col items-center px-2 py-1">
                              <div className="text-foreground text-sm font-medium whitespace-nowrap">
                                {item.name}
                              </div>

                              <div className="absolute -bottom-[12px] left-4">
                                <div className="border-border bg-muted h-[6px] w-[13px] rounded-b-full border" />
                                <div className="border-border bg-muted size-1.5 -translate-x-[2px] translate-y-[1px] rounded-lg border" />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div
                        className="flex size-6 items-center justify-center transition-all duration-200 ease-in-out group-hover:scale-110"
                        onClick={() => {
                          setStatus(item.id);
                        }}
                      >
                        <div>{item.emoji}</div>
                      </div>
                    </motion.div>
                  ))}

                  <div className="bg-muted flex items-center justify-center gap-1 rounded-lg p-2">
                    <EllipsisIcon className="text-muted-foreground size-6" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
