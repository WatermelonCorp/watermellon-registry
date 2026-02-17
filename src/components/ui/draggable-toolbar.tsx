import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'motion/react';
import { X, Clock, Calendar, Settings, Bell, ExternalLink, BookOpen, AlignRight } from 'lucide-react';

interface DraggableToolbarProps {
    label?: string;
    onClose?: () => void;
}

export const DraggableToolbar: React.FC<DraggableToolbarProps> = ({
    label = "Skipper Toolbar",
    onClose
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isOverTarget, setIsOverTarget] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { icon: <Clock size={16} />, label: "Recent Activity" },
        { icon: <Calendar size={16} />, label: "Calendar" },
        { icon: <Settings size={16} />, label: "Settings" },
        { icon: <Bell size={16} />, label: "Notifications" },
        { icon: <ExternalLink size={16} />, label: "Visit Github" },
        { icon: <BookOpen size={16} />, label: "Read Bookmarks" },
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const closeZoneRef = useRef<HTMLDivElement>(null);

    // Initial positions
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Side detection logic for tooltip direction
    const [isOnRightSide, setIsOnRightSide] = useState(true);

    useEffect(() => {
        if (containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            x.set(width - 64);
            y.set(height / 2);
        }
    }, []);

    // Monitoring X for side switching
    useEffect(() => {
        const unsub = x.onChange((latest) => {
            if (containerRef.current) {
                setIsOnRightSide(latest > containerRef.current.offsetWidth / 2);
            }
        });
        return () => unsub();
    }, [x]);

    useEffect(() => {
        const unsubscribe = y.onChange(() => {
            if (isDragging && closeZoneRef.current && containerRef.current) {
                const rect = closeZoneRef.current.getBoundingClientRect();
                const containerRect = containerRef.current.getBoundingClientRect();

                const currentViewportX = containerRect.left + x.get();
                const currentViewportY = containerRect.top + y.get();

                const buffer = 35;
                const collision =
                    currentViewportX >= rect.left - buffer &&
                    currentViewportX <= rect.right + buffer &&
                    currentViewportY >= rect.top - buffer &&
                    currentViewportY <= rect.bottom + buffer;

                setIsOverTarget(collision);
            }
        });
        return () => unsubscribe();
    }, [isDragging, x, y]);

    const handleDragEnd = (_event: any, _info: any) => {
        setIsDragging(false);
        if (isOverTarget) {
            setIsVisible(false);
            if (onClose) onClose();
            return;
        }

        if (containerRef.current) {
            const { width } = containerRef.current.getBoundingClientRect();
            const currentX = x.get();
            if (currentX > width / 2) {
                x.set(width - 64);
            } else {
                x.set(24);
            }
        }
        setIsOverTarget(false);
    };

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isDragging) {
            setIsMenuOpen(!isMenuOpen);
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative h-[450px] sm:h-[550px] w-full select-none"
        >
            {/* Background Guide */}
            <div className="absolute inset-0 flex flex-col items-center pt-20 sm:pt-32 opacity-90 pointer-events-none">
                <div className="text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-bold text-center leading-relaxed">
                    TRY<br />DRAG/DROP<br />THE BUTTON
                </div>
                <div className="h-32 w-[1px] bg-gradient-to-b from-zinc-400 dark:from-zinc-700 to-transparent mt-6" />
            </div>

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        drag
                        dragConstraints={containerRef}
                        dragElastic={0.1}
                        dragMomentum={false}
                        onDragStart={() => {
                            setIsDragging(true);
                            setIsMenuOpen(false);
                        }}
                        onDragEnd={handleDragEnd}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                        style={{ x, y, zIndex: 50 }}
                        className="absolute top-0 left-0 cursor-grab active:cursor-grabbing pointer-events-auto"
                    >
                        <div className="relative flex items-center group">
                            {/* Toolbar Button */}
                            <button
                                onClick={toggleMenu}
                                className={`w-12 h-12 bg-white dark:bg-[#0F0F0F] active:scale-95 border rounded-full flex items-center justify-center shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)] dark:shadow-2xl transition-all duration-200 outline-none ${isOverTarget ? 'border-transparent scale-90' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'}`}
                            >
                                <div className="relative">
                                    <AlignRight size={22} className="text-zinc-900 dark:text-white transform rotate-180" />
                                    <div className="absolute top-0 -right-0.5 w-2 h-2 bg-blue-500 rounded-full border border-white dark:border-[#0F0F0F]" />
                                </div>
                            </button>

                            {/* Tooltip */}
                            <AnimatePresence>
                                {isHovered && !isDragging && !isMenuOpen && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.9,
                                            x: isOnRightSide ? 10 : -10
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            x: isOnRightSide ? -180 : 60
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.9,
                                            x: isOnRightSide ? 10 : -10
                                        }}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        className="absolute pointer-events-none"
                                    >
                                        <div className="flex items-center gap-4 px-3 py-2 bg-white/95 dark:bg-zinc-950/90 border border-zinc-200 dark:border-zinc-800/50 rounded-xl shadow-[0_20px_40px_-4px_rgba(0,0,0,0.1)] dark:shadow-2xl backdrop-blur-md">
                                            <span className="text-[14px] font-medium text-zinc-900 dark:text-white tracking-tight whitespace-nowrap pl-1">
                                                {label}
                                            </span>
                                            <div className="flex items-center justify-center w-7 h-7 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-sm">
                                                <span className="text-zinc-500 dark:text-zinc-400 text-sm">⌘</span>
                                            </div>

                                            <div className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 bg-white/90 dark:bg-zinc-950/90 border-r border-t border-zinc-200/50 dark:border-zinc-800/50 ${isOnRightSide ? '-right-[5px]' : '-left-[5px] border-l border-b border-r-0 border-t-0'}`} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Action Menu */}
                            <AnimatePresence>
                                {isMenuOpen && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.8,
                                            x: isOnRightSide ? 20 : -20,
                                            y: -150
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            x: isOnRightSide ? -240 : 60,
                                            y: -150
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.8,
                                            x: isOnRightSide ? 20 : -20,
                                            y: -150
                                        }}
                                        className="absolute z-50 pointer-events-auto"
                                    >
                                        <div className="w-56 bg-white dark:bg-zinc-950/95 border border-zinc-200 dark:border-zinc-800/50 rounded-[28px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] dark:shadow-3xl backdrop-blur-xl p-2.5">
                                            <div className="flex flex-col gap-0.5">
                                                {menuItems.map((item, idx) => (
                                                    <button
                                                        key={idx}
                                                        className="flex items-center gap-3 w-full px-4 py-3 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 rounded-2xl transition-all group/menu-item"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        <span className="text-zinc-400 dark:text-zinc-500 group-hover/menu-item:text-zinc-900 dark:group-hover/menu-item:text-white transition-colors">
                                                            {item.icon}
                                                        </span>
                                                        <span className="text-[14px] font-medium tracking-tight">
                                                            {item.label}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Target Drop Zone */}
            <AnimatePresence>
                {isDragging && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
                    >
                        <div
                            ref={closeZoneRef}
                            className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isOverTarget ? 'border-blue-500 bg-blue-500/10 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-dashed border-zinc-300 dark:border-white/70 bg-zinc-100/20 dark:bg-black/20'}`}
                        >
                            {!isOverTarget && <X size={20} className="text-zinc-400 dark:text-zinc-500" />}
                        </div>
                        <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${isOverTarget ? 'text-blue-500 dark:text-blue-400' : 'text-zinc-400 dark:text-zinc-500'}`}>
                            {isOverTarget ? 'Release to close' : 'Leave here to close'}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};