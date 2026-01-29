import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import {
  MoreHorizontal,
  Check,
  ChevronDown,
  Sun,
  Moon
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const isDark = theme === 'dark';


  const colors = {
    bg: isDark ? 'bg-[#0A0A0B]' : 'bg-[#FEFEFE]',
    cardBg: isDark ? 'bg-[#121214]' : 'bg-white',
    cardBorder: isDark ? 'border-[#1E1E21]' : 'border-[#F4F4F4]',
    titleText: isDark ? 'text-[#F4F4F4]' : 'text-[#28272A]',
    secondaryText: isDark ? 'text-[#8E8E93]' : 'text-[#707075]',
    iconContainer: isDark ? 'bg-[#1C1C1E] border-[#2C2C2E]' : 'bg-white border-[#EFEFEF]',
    progressTrack: isDark ? 'bg-[#2C2C2E]' : 'bg-[#E7E4F0]',
    subtaskLine: isDark ? 'bg-[#2C2C2E]' : 'bg-[#D6D5DC]',
    subtaskCheck: isDark ? 'bg-transparent border-[#48484A]' : 'bg-white border-[#CCCBD2]',
    collapsedHeader: isDark ? 'bg-[#1C1C1E]' : 'bg-[#F0EFF6]',
    expandedProgressBg: isDark ? 'bg-[#1C1C1E]/50 border-[#2C2C2E]' : 'bg-gray-50/50 border-[#E9E8EB]'
  };

  const springTransition = {
    type: "spring",
    stiffness: 300,
    damping: 28,
    mass: 1
  } as const;

  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen ${colors.bg} flex flex-col items-center justify-center p-10 transition-colors duration-300`}>
      
      {/* --- Theme Toggle --- */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className={`mb-8 p-3 rounded-2xl border ${isDark ? 'bg-[#121214] border-[#1E1E21] text-yellow-400' : 'bg-white border-[#F4F4F4] text-slate-800'} shadow-sm transition-colors`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>

      <LayoutGroup>
        <motion.div
          layout
          initial={false}
          onClick={() => setIsOpen(!isOpen)}
          transition={springTransition}
          className={`${colors.cardBg} border-2 ${colors.cardBorder} shadow-xl cursor-pointer overflow-hidden select-none relative transition-colors`}
          style={{
            borderRadius: isOpen ? 26 : 20,
            width: 440,
            padding: isOpen ? 22 : 12,
          }}
        >
          {/* --- Header Section --- */}
          <div className="flex items-center justify-between relative z-10">
            <motion.div
              layout="position"
              transition={springTransition}
              className={`flex items-center gap-3 ${isOpen ? 'bg-transparent' : colors.collapsedHeader} px-3 pl-1 rounded-lg transition-colors`}
            >
              <motion.div
                layout
                transition={springTransition}
                className={`flex items-center justify-center border-[1.7px] my-0.5 rounded-xl transition-colors ${colors.iconContainer}`}
                style={{ width: isOpen ? 48 : 36, height: isOpen ? 48 : 36 }}
              >
                <HugeiconsIcon icon={Settings03Icon} size={isOpen ? 24 : 18} color={isDark ? "#8E8E93" : "#949497"} strokeWidth={1.5} />
              </motion.div>
              <motion.h2
                layout
                transition={springTransition}
                className={`font-semibold font-sans origin-left transition-colors ${colors.titleText} ${isOpen ? 'text-3xl' : 'text-base'}`}
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
                  <div className={`w-32 h-2 ${colors.progressTrack} rounded-full overflow-hidden relative transition-colors`}>
                    <motion.div
                      layout
                      className="h-full bg-[#1EBF46] rounded-full relative overflow-hidden"
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
                  <span className={`text-base font-medium transition-colors ${colors.secondaryText}`}>{data.progress}%</span>
                </motion.div>
              ) : (
                <motion.button
                  key="more-btn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className={`${colors.cardBg} border-2 ${colors.cardBorder} p-1.5 px-1.5 rounded-md ${isDark ? 'text-white' : 'text-black'} transition-colors`}
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
                <div className="flex items-center gap-4 text-sm font-medium">
                  <div className={`flex items-center gap-1.5 ${isDark ? 'text-[#8E8E93]' : 'text-[#757578]'}`}>
                    <HugeiconsIcon icon={Flag01Icon} size={22} color="#ADACB8" fill='#ADACB8' strokeWidth={1.5} />
                    {data.priority}
                  </div>
                  <div className={`flex items-center gap-1.5 ${isDark ? 'text-[#8E8E93]' : 'text-[#757578]'}`}>
                    <BiSolidHourglassBottom color='#ADACB8' size={22} />
                    {data.status}
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {data.assignees.map((u, i) => (
                    <motion.img
                      layout
                      key={i}
                      src={u.avatar}
                      className={`w-8 h-8 rounded-full border-2 shadow-lg ${isDark ? 'border-[#2C2C2E]' : 'border-gray-200'}`}
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
                <div className={`flex items-center gap-2 px-2.5 py-1.5 border-[1.5px] rounded-full mb-7 w-fit transition-colors ${colors.expandedProgressBg}`}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center">
                    <IoIosCheckmarkCircleOutline size={24} className={isDark ? "text-[#48484A]" : "text-[#C9C9CA]"} />
                  </div>
                  <span className={`text-sm font-semibold ${isDark ? 'text-[#636366]' : 'text-[#9A999E]'}`}>
                    <span className={isDark ? 'text-[#636366]' : 'text-[#9A999E]'}>{data.completedCount}</span> of {data.totalCount}
                  </span>
                  <div className={`w-28 h-2 ${colors.progressTrack} rounded-full mx-1 transition-colors`}>
                    <motion.div
                      className="h-full bg-[#1EBF46] rounded-full relative overflow-hidden"
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
                  <span className={`text-sm font-semibold ${isDark ? 'text-[#D1D1D6]' : 'text-[#6F6E71]'}`}>{data.progress}%</span>
                </div>

                {/* Subtasks */}
                <div className="relative ml-6 mb-8 flex flex-col gap-5">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    className={`absolute left-0 top-0 bottom-4 w-[1.7px] origin-top transition-colors ${colors.subtaskLine}`}
                  />
                  {data.subtasks.map((task, idx) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (idx * 0.03) }}
                      className="relative flex items-center pl-8"
                    >
                      <div className={`absolute left-0 top-[-10px] w-5 h-[30px] border-l-[1.7px] border-b-[1.7px] rounded-bl-xl transition-colors ${isDark ? 'border-[#2C2C2E]' : 'border-[#D6D5DC]'}`} />
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border-[1.7px] transition-colors ${task.completed ? (isDark ? 'bg-[#D1D1D6] border-[#D1D1D6]' : 'bg-[#525157] border-[#525157]') : colors.subtaskCheck}`}>
                        {task.completed && <Check size={12} className={isDark ? "text-black" : "text-white"} strokeWidth={3} />}
                      </div>
                      <span className={`ml-3 text-base font-medium transition-colors ${task.completed ? (isDark ? 'text-[#636366]' : 'text-[#78777C]') : (isDark ? 'text-[#AEAEB2]' : 'text-[#8A8A8D]')}`}>
                        {task.title}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Priority & Status */}
                <div className="space-y-4 mb-6">
                  {[
                    { label: 'Priority', val: data.priority, icon: <HugeiconsIcon icon={Flag01Icon} size={22} color="#ADACB8" fill='#ADACB8' strokeWidth={1.5} />, bg: isDark ? 'bg-[#451A1C]' : 'bg-[#FDD4D5]', text: isDark ? 'text-[#FF453A]' : 'text-[#d63644]' },
                    { label: 'Status', val: data.status, icon: <BiSolidHourglassBottom color='#ADACB8' size={22} />, bg: isDark ? 'bg-[#3D2E12]' : 'bg-[#FDEAC5]', text: isDark ? 'text-[#FFD60A]' : 'text-[#715A30]' }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + (i * 0.05) }}
                      className="flex gap-8 items-center font-medium px-1"
                    >
                      <div className={`flex items-center gap-3 min-w-[100px] transition-colors ${isDark ? 'text-[#D1D1D6]' : 'text-[#565658]'}`}>{item.icon}{item.label}</div>
                      <div className={`${item.bg} ${item.text} px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2 opacity-85 transition-colors`}>
                        {item.val}
                        <span className={`${isDark ? 'bg-[#1C1C1E]' : 'bg-[#FEF9EE]'} flex justify-center items-center rounded-sm p-px border-0.5 transition-colors`}>
                          <ChevronDown size={16} color={isDark ? '#FFD60A' : '#58401A'} strokeWidth={2} />
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
                      className={`flex items-center gap-2 pr-4 pl-1.5 py-1 rounded-full border-[1.58px] shadow-sm transition-colors ${isDark ? 'border-[#2C2C2E] bg-[#1C1C1E]' : 'border-[#E4E4EA]'} `}
                    >
                      <img title='avatar' src={user.avatar} className="w-7 h-7 rounded-full object-cover" />
                      <span className={`text-sm font-semibold transition-colors ${isDark ? 'text-[#D1D1D6]' : 'text-[#68686A]'}`}>{user.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  );
};