import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import {
  MoreHorizontal,
  Check,
  ChevronDown
} from 'lucide-react';
import { Flag01Icon, Settings03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { BiSolidHourglassBottom } from 'react-icons/bi';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

// --- Types ---
export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Assignee {
  name: string;
  avatar: string;
  color: string;
}

export interface TaskData {
  title: string;
  progress: number;
  completedCount: number;
  totalCount: number;
  priority: string;
  status: string;
  subtasks: Subtask[];
  assignees: Assignee[];
}

interface Props {
  data: TaskData;
}

export const TaskWidget: React.FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const springTransition = {
    type: "spring",
    stiffness: 300,
    damping: 28,
    mass: 1
  } as const;

  return (
    <LayoutGroup>
      <motion.div
        layout
        initial={false}
        onClick={() => setIsOpen(!isOpen)}
        transition={springTransition}
        className={`bg-white dark:bg-neutral-950 border-2 border-neutral-100 dark:border-neutral-800 shadow-xl cursor-pointer overflow-hidden select-none relative transition-colors w-full sm:w-[440px] ${isOpen ? 'rounded-[24px] sm:rounded-[26px] p-5 sm:p-[22px]' : 'rounded-[20px] p-3 sm:p-[12px]'
          }`}
      >
        {/* --- Header Section --- */}
        <div className="flex items-center justify-between relative z-10 gap-2">
          <motion.div
            layout="position"
            transition={springTransition}
            className={`flex items-center gap-2 ${isOpen ? 'bg-transparent' : 'bg-neutral-50 dark:bg-neutral-900'} pr-2 pl-1.5 sm:pr-2 sm:pl-1.5 py-0.5 rounded-lg transition-colors`}
          >
            <motion.div
              layout
              transition={springTransition}
              className={`flex items-center justify-center border-[1.7px] my-0.5 rounded-lg transition-colors bg-white border-neutral-200 dark:bg-neutral-900 dark:border-neutral-700 ${isOpen ? 'w-10 h-10 sm:w-12 sm:h-12' : 'size-7 sm:size-8'}`}
            >
              <HugeiconsIcon
                icon={Settings03Icon}
                size={isOpen ? 20 : 15}
                className="text-neutral-400 dark:text-neutral-500 sm:hidden"
                strokeWidth={1.5}
              />
              <HugeiconsIcon
                icon={Settings03Icon}
                size={isOpen ? 24 : 17}
                className="text-neutral-400 dark:text-neutral-500 hidden sm:block"
                strokeWidth={1.5}
              />
            </motion.div>
            <motion.h2
              layout
              transition={springTransition}
              className={`font-semibold font-sans origin-left transition-colors text-neutral-800 dark:text-neutral-100 ${isOpen ? 'text-xl sm:text-3xl' : 'text-sm sm:text-base whitespace-nowrap'}`}
            >
              {data.title}
            </motion.h2>
          </motion.div>

          <AnimatePresence mode="popLayout" initial={false}>
            {!isOpen ? (
              <motion.div
                key="collapsed-progress"
                initial={{ opacity: 0, scale: 0.9, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 10 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-3"
              >
                <div className="w-16 sm:w-32 h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden relative transition-colors">
                  <motion.div
                    layout
                    className="h-full bg-green-500 rounded-full relative overflow-hidden"
                    style={{ width: `${data.progress}%` }}
                  >
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="absolute inset-0 w-full h-full"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
                    />
                  </motion.div>
                </div>
                <span className="text-xs sm:text-base font-medium transition-colors text-neutral-500 dark:text-neutral-400">{data.progress}%</span>
              </motion.div>
            ) : (
              <motion.button
                key="more-btn"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="bg-white dark:bg-neutral-950 border-2 border-neutral-100 dark:border-neutral-800 p-1.5 px-1.5 rounded-md text-black dark:text-white transition-colors"
              >
                <MoreHorizontal size={22} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* --- Collapsed Sub-Header --- */}
        <AnimatePresence mode="popLayout">
          {!isOpen && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-between mt-3 px-1"
            >
              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium">
                <div className="flex items-center gap-1 sm:gap-1.5 text-neutral-500 dark:text-neutral-400">
                  <HugeiconsIcon icon={Flag01Icon} size={18} className="sm:hidden" color="currentColor" fill='currentColor' strokeWidth={1.5} />
                  <HugeiconsIcon icon={Flag01Icon} size={22} className="hidden sm:block" color="currentColor" fill='currentColor' strokeWidth={1.5} />
                  {data.priority}
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 text-neutral-500 dark:text-neutral-400">
                  <BiSolidHourglassBottom className="text-neutral-400 w-4 h-4 sm:w-[22px] sm:h-[22px]" />
                  {data.status}
                </div>
              </div>
              <div className="flex -space-x-2">
                {data.assignees.map((u, i) => (
                  <motion.img
                    layout
                    key={i}
                    src={u.avatar}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 shadow-lg border-neutral-200 dark:border-neutral-700"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Expanded Content --- */}
        <AnimatePresence mode="popLayout">
          {isOpen && (
            <motion.div
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.1 } }}
              transition={{ ...springTransition, delay: 0.05 }}
              className="mt-6 origin-top"
            >
              {/* Progress Bar Container */}
              <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 sm:py-1.5 border-[1.5px] rounded-full mb-7 w-fit transition-colors bg-neutral-50/50 border-neutral-200 dark:bg-neutral-800/50 dark:border-neutral-700">
                <div className="w-5 h-5 rounded-full flex items-center justify-center">
                  <IoIosCheckmarkCircleOutline size={24} className="text-neutral-300 dark:text-neutral-600" />
                </div>
                <span className="text-sm font-semibold text-neutral-400 dark:text-neutral-500">
                  <span className="text-neutral-400 dark:text-neutral-500">{data.completedCount}</span> of {data.totalCount}
                </span>
                <div className="w-20 sm:w-28 h-2 bg-neutral-100 dark:bg-neutral-700 rounded-full mx-1 transition-colors">
                  <motion.div
                    className="h-full bg-green-500 rounded-full relative overflow-hidden"
                    style={{ width: `${data.progress}%` }}
                  >
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="absolute inset-0 w-full h-full"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
                    />
                  </motion.div>
                </div>
                <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-200">{data.progress}%</span>
              </div>

              {/* Subtasks */}
              <div className="relative ml-6 mb-8 flex flex-col gap-5">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  className="absolute left-0 top-0 bottom-4 w-[1.7px] origin-top transition-colors bg-neutral-300 dark:bg-neutral-700"
                />
                {data.subtasks.map((task, idx) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (idx * 0.03) }}
                    className="relative flex items-center pl-8"
                  >
                    <div className="absolute left-0 top-[-10px] w-4 sm:w-5 h-[30px] border-l-[1.7px] border-b-[1.7px] rounded-bl-xl transition-colors border-neutral-300 dark:border-neutral-700" />
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border-[1.7px] transition-colors ${task.completed ? 'bg-neutral-600 border-neutral-600 dark:bg-neutral-200 dark:border-neutral-200' : 'bg-white border-neutral-300 dark:bg-transparent dark:border-neutral-600'}`}>
                      {task.completed && <Check size={12} className="text-white dark:text-black" strokeWidth={3} />}
                    </div>
                    <span className={`ml-3 text-base font-medium transition-colors ${task.completed ? 'text-neutral-400 dark:text-neutral-500' : 'text-neutral-500 dark:text-neutral-300'}`}>
                      {task.title}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Priority & Status */}
              <div className="space-y-4 mb-6">
                {[
                  {
                    label: 'Priority',
                    val: data.priority,
                    icon: <HugeiconsIcon icon={Flag01Icon} size={22} className="text-neutral-400" strokeWidth={1.5} />,
                    badge: 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400',
                    chevronWrap: 'bg-red-50 dark:bg-neutral-900',
                    chevron: 'text-red-700 dark:text-red-400'
                  },
                  {
                    label: 'Status',
                    val: data.status,
                    icon: <BiSolidHourglassBottom className="text-neutral-400" size={22} />,
                    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
                    chevronWrap: 'bg-amber-50 dark:bg-neutral-900',
                    chevron: 'text-amber-700 dark:text-amber-300'
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + (i * 0.05) }}
                    className="flex gap-4 sm:gap-8 items-center font-medium px-1"
                  >
                    <div className="flex items-center gap-3 min-w-[80px] sm:min-w-[100px] transition-colors text-neutral-600 dark:text-neutral-200">
                      {item.icon}
                      {item.label}
                    </div>
                    <div className={`${item.badge} px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2 opacity-85 transition-colors`}>
                      {item.val}
                      <span className={`${item.chevronWrap} flex justify-center items-center rounded-sm p-px border-0.5 transition-colors`}>
                        <ChevronDown size={16} className={item.chevron} strokeWidth={2} />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Assignees */}
              <div className="flex flex-wrap gap-2">
                {data.assignees.map((user, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + (i * 0.03) }}
                    className="flex items-center gap-2 pr-4 pl-1.5 py-1 rounded-full border-[1.58px] shadow-sm transition-colors border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    <img title='avatar' src={user.avatar} className="w-7 h-7 rounded-full object-cover" />
                    <span className="text-sm font-semibold transition-colors text-neutral-500 dark:text-neutral-200">{user.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
};