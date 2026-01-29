"use client";

import {
    useState,
    useRef,
    useEffect,
    type FC,
    type ChangeEvent,
    type KeyboardEvent,
    type MouseEvent,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Sun, Moon } from "lucide-react";
import { BiSolidPencil } from "react-icons/bi";

/* --- Types --- */
type ChipState = "default" | "active" | "editing";

interface EditableChipProps {
    defaultLabel?: string;
    defaultState?: ChipState;
    showThemeToggle?: boolean;
    onChange?: (value: string) => void;
}

export const EditableChip: FC<EditableChipProps> = ({
    defaultLabel = "Watchlist",
    defaultState = "default",
    showThemeToggle = true,
    onChange,
}) => {
    const [state, setState] = useState<ChipState>(defaultState);
    const [label, setLabel] = useState<string>(defaultLabel);
    const [isDark, setIsDark] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isDark) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
    }, [isDark]);

    useEffect(() => {
        if (state === "editing" && inputRef.current) {
            requestAnimationFrame(() => {
                inputRef.current?.focus();
                inputRef.current?.select();
            });
        }
    }, [state]);

    const handleEdit = (e: MouseEvent) => {
        e.stopPropagation();
        setState("editing");
    };

    const handleSave = (e: MouseEvent | KeyboardEvent) => {
        e.stopPropagation();
        const finalValue = label.trim() === "" ? "Untitled" : label;
        setLabel(finalValue);
        setState("active");
        onChange?.(finalValue);
    };

    const handleClick = () => {
        if (state === "default") setState("active");
        else if (state === "active") setState("default");
    };

    const getContainerStyles = (): string => {
        switch (state) {
            case "editing":
                return "bg-white dark:bg-zinc-900 border-black dark:border-zinc-100 border-2";
            case "active":
                return "border-[1.6px] border-[#E5E5E9] dark:border-zinc-700 bg-[#FEFEFE] dark:bg-zinc-800 shadow-sm";
            default:
                return "border-[1.6px] border-[#E5E5E9] dark:border-zinc-800 bg-[#FEFEFE] dark:bg-zinc-900/50 text-[#8B8B8B] dark:text-zinc-500";
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FEFEFE] dark:bg-zinc-950 p-4 font-sans transition-colors duration-500">
            
            {/* Theme Toggle */}
            {showThemeToggle && (
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="mb-12 p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all active:scale-90"
                >
                    {isDark ? (
                        <Sun className="text-yellow-400" size={20} />
                    ) : (
                        <Moon className="text-zinc-500" size={20} />
                    )}
                </button>
            )}

            <motion.div
                layout
                onClick={handleClick}
                className={`
                    relative flex items-center justify-center h-14 px-4 gap-[18px] rounded-full cursor-pointer 
                    transition-all duration-200 ease-in-out select-none pr-2 
                    ${getContainerStyles()}
                `}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                }}
            >
                {/* Content Area */}
                <div className="flex items-center overflow-hidden">
                    <AnimatePresence mode="popLayout">
                        {state === "editing" ? (
                            <motion.input
                                key="input"
                                ref={inputRef}
                                type="text"
                                value={label}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setLabel(e.target.value)
                                }
                                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                                    e.key === "Enter" && handleSave(e)
                                }
                                onClick={(e: MouseEvent) => e.stopPropagation()}
                                className="
                                    bg-transparent border-none outline-none
                                    text-lg font-medium text-[#262626] dark:text-zinc-100
                                    capitalize w-32 selection:bg-[#B6B6B6] dark:selection:bg-zinc-700
                                "
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                            />
                        ) : (
                            <motion.span
                                key="label"
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`
                                    rounded-full text-center text-lg font-medium whitespace-nowrap capitalize
                                    ${
                                        state === "active"
                                            ? "text-black dark:text-white"
                                            : "text-[#8B8B8B] dark:text-zinc-500"
                                    }
                                `}
                            >
                                {label}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Actions */}
                <motion.div layout className="flex items-center h-12">
                    {state === "editing" ? (
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                title="done"
                                onClick={handleSave}
                                className="p-1 bg-black dark:bg-zinc-100 text-white dark:text-zinc-950 rounded-full transition-colors"
                            >
                                <Check size={26} />
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            title="edit"
                            onClick={handleEdit}
                            className="rounded-full transition-colors p-2 bg-[#F0EFF6] dark:bg-zinc-800 text-[#696871] dark:text-zinc-400 hover:dark:bg-zinc-700"
                        >
                            <BiSolidPencil size={24} />
                        </button>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};


