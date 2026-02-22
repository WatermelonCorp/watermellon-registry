import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
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

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setStatus("sending");

    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setSelectedUser(null);
        onShareComplete?.(user);
      }, 1200);
    }, 1800);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 bg-white transition-colors duration-500 dark:bg-[#0D0D0E]">
      <div className="relative flex items-center justify-center">
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {status === "idle" && (
              <motion.button
                layoutId="sheet-container"
                onClick={() => setStatus("open")}
                className="flex h-14 w-14 items-center justify-center rounded-[17px] bg-[#29292B] text-white shadow-xs dark:bg-[#F0EFF6] dark:text-[#29292B]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={springTransition}
              >
                <FiShare size={28} strokeWidth={2} />
              </motion.button>
            )}

            {status === "open" && (
              <motion.div
                layoutId="sheet-container"
                className="relative w-[340px] rounded-[38px] bg-[#F0EFF6] p-3 py-5 shadow-xl transition-colors duration-300 dark:bg-[#1C1C1E]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, y: 0 }}
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
                        "group relative z-10 flex cursor-pointer items-center gap-5 p-2",
                        hoveredId === user.id && "gap-10 px-0"
                      )}
                    >
                      {hoveredId === user.id && (
                        <motion.div
                          layoutId="hover-bg"
                          className="absolute inset-y-0 -right-6 -left-6 -z-10 rounded-[14px] border-[1px] border-[#EAEAEA] bg-[#fefefe] shadow-md dark:border-white/5 dark:bg-[#2C2C2E]"
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
                        className="text-[18px] font-medium tracking-tight text-[#28282D] transition-colors dark:text-white/90"
                      >
                        {user.name}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {(status === "sending" || status === "success") && (
              <motion.div
                layoutId="sheet-container"
                className="flex h-14 w-14 items-center justify-center rounded-[17px] bg-[#29292B] text-[#fefefe] shadow-sm dark:bg-[#F0EFF6] dark:text-[#29292B]"
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="relative flex h-full w-full items-center justify-center p-2">
                  <svg className="pointer-events-none absolute inset-0 h-full w-full scale-[1.1] -rotate-90">
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="3"
                      fill="transparent"
                      className="dark:stroke-[rgba(0,0,0,0.05)]"
                    />
                    <motion.circle
                      cx="28"
                      cy="28"
                      r="22"
                      stroke="#D9D9D9"
                      className="dark:stroke-[#29292B]"
                      strokeWidth="3"
                      fill="transparent"
                      strokeDasharray="138"
                      initial={{ strokeDashoffset: 138 }}
                      animate={{
                        strokeDashoffset: status === "success" ? 0 : 40,
                      }}
                      transition={{ duration: 1.8, ease: "easeInOut" }}
                    />
                  </svg>

                  <div className="relative flex h-9 w-9 items-center justify-center">
                    <AnimatePresence mode="popLayout">
                      {status === "sending" ? (
                        <motion.img
                          key="sending-avatar"
                          layoutId="avatar-morph"
                          src={selectedUser?.avatar}
                          className="h-full w-full rounded-full object-cover"
                          exit={{ opacity: 0, scale: 0.5, filter: "blur(5px)" }}
                        />
                      ) : (
                        <motion.div
                          key="success-check"
                          initial={{ scale: 0, opacity: 0, rotate: -45 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          className="flex h-full w-full items-center justify-center text-[#D9D9D9] dark:text-[#29292B]"
                        >
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </div>
  );
};
