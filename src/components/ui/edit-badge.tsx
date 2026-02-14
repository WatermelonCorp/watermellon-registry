import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    X,
    Loader2,
} from 'lucide-react';
import { BiSolidPencil } from 'react-icons/bi';
import { FaCircleCheck } from 'react-icons/fa6';
import { BsDashCircleFill } from 'react-icons/bs';
import { MdTimelapse } from 'react-icons/md';
import { LuTimer } from 'react-icons/lu';
import { HiPencil } from 'react-icons/hi2';

/*  TYPES  */

export type BadgeIconType = 'loader' | 'clock' | 'timer' | 'check' | 'minus';

export interface BadgeConfig {
    text: string;
    icon: BadgeIconType;
    color: string;
}

/*  DEFAULT DATA  */

const DEFAULT_BADGE: BadgeConfig = {
    text: 'Completed',
    icon: 'check',
    color: 'green',
};

const COLORS = [
    { id: 'blue', bg: 'bg-[#016FFE]', badgeBg: 'bg-[#E7F1FD] dark:bg-[#016FFE]/10', text: 'text-[#016FFE] dark:text-[#3890FF]' },
    { id: 'yellow', bg: 'bg-[#2EBE52]', badgeBg: 'bg-[#E0FAE7] dark:bg-[#2EBE52]/10', text: 'text-[#2EBE52] dark:text-[#4ADE80]' },
    { id: 'orange', bg: 'bg-[#FFC405]', badgeBg: 'bg-[#FBF1DE] dark:bg-[#FFC405]/10', text: 'text-[#FFC405] dark:text-[#FFD700]' },
    { id: 'green', bg: 'bg-emerald-500', badgeBg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
    { id: 'red', bg: 'bg-[#FE322B]', badgeBg: 'bg-[#FCECEC] dark:bg-[#FE322B]/10', text: 'text-[#FE322B] dark:text-[#FF5C57]' },
];

const ICONS: Record<BadgeIconType, React.ElementType> = {
    loader: Loader2,
    clock: MdTimelapse,
    timer: LuTimer,
    check: FaCircleCheck,
    minus: BsDashCircleFill,
};

/*  ANIMATION CONFIG  */

const springTransition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 1
} as const;

const bounceTransition = {
    type: "spring",
    stiffness: 300,
    damping: 20
} as const;

/*  PROPS  */

type EditBadgeProps = {
    initialBadge?: BadgeConfig;
    onChange?: (badge: BadgeConfig) => void;
};

/*  COMPONENT  */

export function EditBadge({
    initialBadge = DEFAULT_BADGE,
    onChange,
}: EditBadgeProps) {

    const [badge, setBadge] = useState<BadgeConfig>(initialBadge);
    const [tempBadge, setTempBadge] = useState<BadgeConfig>(initialBadge);
    const [isEditing, setIsEditing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentColor = COLORS.find(c => c.id === badge.color) || COLORS[0];
    const IconComponent = ICONS[badge.icon];

    const handleOpen = () => {
        setTempBadge(badge);
        setIsEditing(true);
    };

    const handleUpdate = () => {
        setBadge(tempBadge);
        onChange?.(tempBadge);
        setIsEditing(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsEditing(false);
            }
        };
        if (isEditing) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isEditing]);

    return (
        <div className="flex items-center justify-center relative h-[400px] " ref={containerRef}>
            <motion.div
                className="flex items-center gap-3"
                animate={{ opacity: isEditing ? 0 : 1, scale: isEditing ? 0.95 : 1 }}
                transition={springTransition}
            >
                <motion.div
                    layoutId="badge-container"
                    className={`flex items-center gap-2.5 px-3 py-2.5 sm:px-4 sm:py-3.5 rounded-full ${currentColor.badgeBg} ${currentColor.text} font-bold shadow-sm cursor-default select-none`}
                >
                    <motion.div layoutId="badge-icon">
                        <IconComponent className={`w-5 h-5 sm:w-[22px] sm:h-[22px] ${badge.icon === 'loader' ? 'animate-spin' : ''}`} />
                    </motion.div>
                    <motion.span layoutId="badge-text" className="text-base sm:text-[18px] capitalize tracking-tight">
                        {badge.text}
                    </motion.span>
                </motion.div>

                <motion.button
                    onClick={handleOpen}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-[42px] h-[42px] sm:w-[50px] sm:h-[50px] flex items-center justify-center bg-[#F6F5FA] dark:bg-zinc-800 rounded-full text-[#28272A] dark:text-zinc-100 border border-[#edecf0] dark:border-zinc-800 shadow-xs"
                >
                    <BiSolidPencil className="w-6 h-6 fill-current" />
                </motion.button>
            </motion.div>

            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={bounceTransition}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-xs sm:w-[350px] bg-[#fefefe] dark:bg-zinc-900 rounded-3xl p-5 sm:p-6 shadow-lg border-2 border-[#EBEBF0] dark:border-zinc-800"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-[#87868F] dark:text-zinc-400 font-bold text-lg">Edit Badge</h2>
                            <button title='close'
                                onClick={() => setIsEditing(false)}
                                className="w-7 h-7 flex items-center justify-center bg-[#B0B0B7] dark:bg-zinc-700 rounded-full text-[#fefefe] dark:text-zinc-300"
                            >
                                <X className="w-4 h-4" strokeWidth={4} />
                            </button>
                        </div>

                        <div className="mb-6">
                            <input
                                type="text"
                                autoFocus
                                value={tempBadge.text}
                                onChange={(e) => setTempBadge(prev => ({ ...prev, text: e.target.value }))}
                                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-base sm:text-lg font-bold border-2 border-[#EBEBF0] dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-xl capitalize text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
                                placeholder="Enter status..."
                            />
                        </div>

                        <div className="grid grid-cols-5 gap-2 mb-6">
                            {(Object.keys(ICONS) as BadgeIconType[]).map((iconKey) => {
                                const Icon = ICONS[iconKey];
                                const isSelected = tempBadge.icon === iconKey;
                                return (
                                    <motion.button
                                        key={iconKey}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setTempBadge(prev => ({ ...prev, icon: iconKey }))}
                                        className={`aspect-square flex items-center justify-center rounded-xl border-2 transition-all ${isSelected
                                            ? 'border-[#28272A] dark:border-zinc-100 bg-gray-100 dark:bg-zinc-800 text-[#28272A] dark:text-zinc-100'
                                            : 'border-[#EBEBF0] dark:border-zinc-800 text-[#AFAEB7] dark:text-zinc-600'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </motion.button>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-3 mb-8 justify-between rounded-xl border-2 border-[#EBEBF0] dark:border-zinc-800 p-2.5">
                            {COLORS.map((color) => {
                                const isSelected = tempBadge.color === color.id;
                                return (
                                    <motion.button
                                        key={color.id}
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setTempBadge(prev => ({ ...prev, color: color.id }))}
                                        className={`w-8 h-8 rounded-full ${color.bg} relative flex items-center justify-center shadow-sm`}
                                    >
                                        {isSelected && <HiPencil className="w-4 h-4 text-[#fefefe]" />}
                                    </motion.button>
                                );
                            })}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleUpdate}
                            className="w-full py-3.5 sm:py-4 bg-[#28272A] dark:bg-zinc-100 text-[#FBFBFD] dark:text-zinc-900 font-bold rounded-full text-base sm:text-lg shadow-lg"
                        >
                            Update Badge
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}