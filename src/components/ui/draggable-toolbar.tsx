import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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

    if (!isVisible) return null;

    return (
        <div
            ref={containerRef}
            className="relative h-screen w-full bg-[#050505] overflow-hidden select-none"
        >
            {/* Background Guide */}
            <div className="absolute inset-0 flex flex-col items-center pt-32 opacity-90 pointer-events-none">
                <div className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-bold text-center leading-relaxed">
                    TRY<br />DRAG/DROP<br />THE BUTTON
                </div>
                <div className="h-32 w-[1px] bg-gradient-to-b from-zinc-700 to-transparent mt-6" />
            </div>

            <motion.div
                drag
                dragConstraints={containerRef}
                dragElastic={0.1}
                dragMomentum={false}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ x, y, zIndex: 50 }}
                className="absolute top-0 left-0 cursor-grab active:cursor-grabbing pointer-events-auto"
            >
                <div className="relative flex items-center group">
                    <div className={`w-12 h-12 bg-[#0F0F0F] border rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 ${isOverTarget ? 'border-transparent scale-90' : 'border-white/70'}`}>
                        <Menu size={26} className="text-white" />
                        {!isOverTarget && (
                            <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-black" />
                        )}
                    </div>

                    <AnimatePresence>
                        {isHovered && !isDragging && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.95,
                                    x: isOnRightSide ? 20 : -20
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    x: isOnRightSide ? -160 : 60
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.95,
                                    x: isOnRightSide ? 20 : -20
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                className="absolute left-0 pointer-events-auto"
                            >
                                <div className="relative flex items-center px-4 py-2.5 bg-[#0a0a0a] border border-zinc-800/80 rounded-xl shadow-2xl w-40">
                                    <span className="text-[13px] font-medium shrink-0 text-white/90 tracking-tight mr-3">
                                        {label}
                                    </span>

                                    <div className="flex items-center justify-center w-7 h-7 bg-zinc-900/50 border border-zinc-800 rounded-md shadow-inner p-2">
                                        <span className="text-white/90 text-sm">⌘</span>
                                    </div>

                                    {isOnRightSide ? (
                                        <div className="absolute -right-[6px] top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-[#0a0a0a] border-r border-t border-zinc-800/80" />
                                    ) : (
                                        <div className="absolute -left-[6px] top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-[#0a0a0a] border-l border-b border-zinc-800/80" />
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

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
                            className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isOverTarget ? 'border-blue-500 bg-blue-500/10 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-dashed border-white/70 bg-black/20'}`}
                        >
                            {!isOverTarget && <X size={20} className="text-zinc-500" />}
                        </div>
                        <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${isOverTarget ? 'text-blue-400' : 'text-zinc-500'}`}>
                            {isOverTarget ? 'Release to close' : 'Leave here to close'}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};