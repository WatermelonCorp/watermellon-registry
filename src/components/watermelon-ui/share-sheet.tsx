"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiShare } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface ShareSheetProps {
  users: User[];
  onShareComplete?: (user: User) => void;
}

const springTransition = {
  type: "spring",
  stiffness: 240,
  damping: 20,
  mass: 1,
} as const;

export const ShareSheet = ({ users, onShareComplete }: ShareSheetProps) => {
  const [status, setStatus] = useState<"idle" | "open" | "sending" | "success">(
    "idle"
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setStatus("sending");

    setTimeout(() => {
      setStatus("success");

      setTimeout(() => {
        setStatus("idle");
        setSelectedUser(null);
        onShareComplete?.(user);
      }, 800);
    }, 1800);
  };

  return (
    <div className="relative flex items-center justify-center">
      <motion.button
        onClick={() => status === "idle" && setStatus("open")}
        className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[17px] bg-neutral-900 text-neutral-50 shadow-sm dark:bg-neutral-100 dark:text-neutral-900"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={springTransition}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {status === "idle" && (
            <motion.div
              key="share-icon"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
            >
              <FiShare size={26} strokeWidth={2} />
            </motion.div>
          )}

          {(status === "sending" || status === "success") && (
            <motion.div
              key="sending-container"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-[17px] bg-neutral-900 text-neutral-50 shadow-sm dark:bg-neutral-100 dark:text-neutral-900"
            >
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-2">
                <svg className="pointer-events-none absolute inset-0 h-full w-full -rotate-90">
                  <circle
                    cx="28"
                    cy="28"
                    r="22"
                    stroke="currentColor"
                    strokeOpacity="0.15"
                    strokeWidth="3"
                    fill="transparent"
                  />

                  <motion.circle
                    cx="28"
                    cy="28"
                    r="22"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                  />
                </svg>

                <motion.img
                  key="sending-avatar"
                  layoutId="avatar-morph"
                  src={selectedUser?.avatar}
                  className="absolute inset-0 m-auto size-10 rounded-full object-cover"
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.3 }}
                />

                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.div
                      key="success-check"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                      className="flex h-9 w-9 items-center justify-center"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      <AnimatePresence mode="popLayout" initial={false}>
        {status === "open" && (
          <motion.div
            className="absolute w-[340px] rounded-[38px] bg-neutral-100 p-3 py-5 shadow-md transition-colors duration-300 dark:bg-neutral-900"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={springTransition}
          >
            <div className="relative flex flex-col">
              {users.map((user) => (
                <motion.div
                  layout
                  key={user.id}
                  onHoverStart={() => setHoveredId(user.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={() => handleSelectUser(user)}
                  className={cn(
                    "group relative z-10 flex cursor-pointer items-center gap-3 p-2",
                    hoveredId === user.id && "px-0"
                  )}
                  animate={{
                    x: hoveredId === user.id ? -10 : 0,
                  }}
                >
                  {hoveredId === user.id && (
                    <motion.div
                      layoutId="hover-bg"
                      className="absolute inset-y-0 -right-6 -left-6 -z-10 rounded-[14px] border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-800"
                      transition={springTransition}
                    />
                  )}

                  <motion.div
                    layout
                    className="relative h-11 w-11 overflow-hidden"
                    animate={{
                      borderRadius: hoveredId === user.id ? "12px" : "28px",
                    }}
                    transition={springTransition}
                  >
                    <motion.img
                      layout
                      layoutId={
                        selectedUser?.id === user.id
                          ? "avatar-morph"
                          : `img-${user.id}`
                      }
                      src={user.avatar}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>

                  <motion.span
                    layout
                    className="text-[17px] font-medium tracking-tight text-neutral-800 dark:text-neutral-200"
                  >
                    {user.name}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
