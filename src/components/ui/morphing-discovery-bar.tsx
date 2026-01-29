import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Search, X, Sun, Moon } from 'lucide-react';
import { FaFire } from 'react-icons/fa6';
import { MdFavorite } from 'react-icons/md';

export interface Category {
    id: string;
    label: string;
    icon: React.ReactNode;
    activeColor: string;
    activeTextColor: string;
}

const defaultItems: Category[] = [
    {
        id: 'popular',
        label: 'Popular',
        icon: <FaFire size={22} className="fill-current" />,
        activeColor: '#F9EBEF',
        activeTextColor: '#FF3B30'
    },
    {
        id: 'favorites',
        label: 'Favorites',
        icon: <MdFavorite size={22} className="fill-current" />,
        activeColor: '#F9EBEF',
        activeTextColor: '#FD2649'
    },
];

export const MorphingDiscoveryBar: React.FC<{ categories: Category[] }> = ({ categories = defaultItems }) => {
    const [isSearching, setIsSearching] = useState(false);
    const [activeTab, setActiveTab] = useState(categories[0].id);
    const [searchValue, setSearchValue] = useState("");
    const [isDark, setIsDark] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSearching) inputRef.current?.focus();
    }, [isSearching]);

    const transition = {
        type: "spring",
        stiffness: 520,
        damping: 32,
        mass: 1
    } as const;

    return (
        <div className={`min-h-screen h-full flex flex-col items-center justify-center transition-colors duration-500 ${isDark ? 'bg-[#121212]' : 'bg-[#F0F0F0]'}`}>

            {/* Theme Toggle */}
            <button
                onClick={() => setIsDark(!isDark)}
                className={`mb-8 p-3 rounded-full border transition-all ${isDark ? 'bg-[#1E1E1E] border-gray-800 text-yellow-400' : 'bg-white border-gray-200 text-gray-500 shadow-sm'}`}
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="flex items-center justify-center h-24 bg-transparent">
                <LayoutGroup>
                    <motion.div
                        layout
                        transition={transition}
                        className="flex items-center gap-3 p-2 rounded-[32px]  backdrop-blur-md"
                    >
                        {/* SEARCH COMPONENT */}
                        <motion.div
                            layout
                            transition={transition}
                            style={{ borderRadius: 28 }}
                            className={`relative flex items-center shadow-sm border overflow-hidden transition-colors ${isSearching ? 'w-80 h-[58px]' : 'w-[58px] h-[58px]'
                                } ${isDark ? 'bg-[#1E1E1E] border-gray-800' : 'bg-[#fefefe] border-gray-100'}`}
                        >
                            <div className="flex items-center w-full px-4 h-full">
                                <motion.div layout="position" transition={transition}>
                                    <Search
                                        size={22}
                                        strokeWidth={3}
                                        className={`shrink-0 transition-colors ${isDark ? 'text-gray-400' : 'text-[#212121]'}`}
                                    />
                                </motion.div>

                                <AnimatePresence mode="wait">
                                    {isSearching && (
                                        <motion.input
                                            key="search-input"
                                            ref={inputRef}
                                            initial={{ opacity: 0, x: -5 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -5 }}
                                            transition={{ duration: 0.15 }}
                                            placeholder="Search"
                                            className={`bg-transparent border-none outline-none w-full text-[17px] font-medium ml-2 transition-colors ${isDark ? 'text-white placeholder:text-gray-600' : 'text-[#212121] placeholder:text-[#BABABA]'
                                                }`}
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                        />
                                    )}
                                </AnimatePresence>

                                {!isSearching && (
                                    <motion.button
                                        layoutId="search-click-overlay"
                                        className="absolute inset-0 z-10 w-full h-full"
                                        onClick={() => setIsSearching(true)}
                                    />
                                )}
                            </div>
                        </motion.div>

                        {/* CATEGORIES*/}
                        <AnimatePresence mode="popLayout">
                            {!isSearching ? (
                                <motion.div
                                    key="categories-list"
                                    layout
                                    initial={{ opacity: 0, x: 10, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                                    whileTap={{ scale: 1.04 }}
                                    transition={transition}
                                    className={`flex items-center gap-1 rounded-full p-1.5 py-1 transition-colors border ${isDark ? 'bg-[#1E1E1E] border-gray-800' : 'bg-[#fefefe] border-gray-100'
                                        }`}
                                >
                                    {categories.map((cat) => {
                                        const isActive = activeTab === cat.id;
                                        // Specific adjustment for dark mode labels to keep them visible but muted
                                        const labelColor = isActive
                                            ? cat.activeTextColor
                                            : (isDark ? '#888888' : '#3F3F46');

                                        return (
                                            <motion.button
                                                key={cat.id}
                                                layout
                                                onClick={() => setActiveTab(cat.id)}
                                                className="relative px-7 py-3.5 rounded-full flex items-center gap-2 transition-colors group"
                                                style={{ color: labelColor }}
                                            >
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="pill-bg"
                                                        className="absolute inset-0 z-0 rounded-full shadow-sm"
                                                        style={{
                                                            backgroundColor: isDark ? '#2D2D2D' : cat.activeColor,
                                                            border: isDark ? '1px solid #444' : 'none'
                                                        }}
                                                        transition={transition}
                                                    />
                                                )}
                                                <span className="relative z-10">{cat.icon}</span>
                                                <span className="relative z-10 font-bold text-xl tracking-tight ">
                                                    {cat.label}
                                                </span>
                                            </motion.button>
                                        );
                                    })}
                                </motion.div>
                            ) : (
                                <motion.button
                                    key="close-action"
                                    layout
                                    initial={{ scale: 0.8, opacity: 0, rotate: -90 }}
                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                    exit={{ scale: 0.8, opacity: 0, rotate: -90 }}
                                    transition={transition}
                                    whileTap={{ scale: 1.04 }}
                                    onClick={() => {
                                        setIsSearching(false);
                                        setSearchValue("");
                                    }}
                                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm border shrink-0 transition-colors ${isDark ? 'bg-[#1E1E1E] border-gray-800 text-white' : 'bg-white border-gray-100 text-[#212121]'
                                        }`}
                                >
                                    <X size={24} strokeWidth={2.5} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </LayoutGroup>
            </div>
        </div>
    );
};