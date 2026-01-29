import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { FiShare, FiSun, FiMoon } from 'react-icons/fi';

interface User {
    id: string;
    name: string;
    avatar: string;
}

interface ShareSheetProps {
    users: User[];
    onShareComplete?: (user: User) => void;
}

const shapeTransition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 0.8
} as const;

export const ShareSheet = ({ users, onShareComplete }: ShareSheetProps) => {
    const [status, setStatus] = useState<'idle' | 'open' | 'sending' | 'success'>('idle');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [isDark, setIsDark] = useState(false);

    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
        setStatus('sending');

        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                setSelectedUser(null);
                onShareComplete?.(user);
            }, 1200);
        }, 1800);
    };

    return (
        <div className={`min-h-screen w-full flex flex-col items-center justify-center gap-8 transition-colors duration-500 ${isDark ? 'bg-[#0D0D0E]' : 'bg-white'}`}>
            
            {/* Theme Toggle */}
            <button 
                onClick={() => setIsDark(!isDark)}
                className={`p-3 rounded-full transition-all active:scale-95 border ${
                    isDark ? 'bg-[#1C1C1E] border-white/10 text-yellow-400' : 'bg-white border-black/5 text-gray-400 shadow-sm'
                }`}
            >
                {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <div className="relative flex items-center justify-center">
                <LayoutGroup>
                    <AnimatePresence mode="popLayout">
                        {status === 'idle' && (
                            <motion.button
                                layoutId="sheet-container"
                                onClick={() => setStatus('open')}
                                className={`w-14 h-14 flex items-center justify-center rounded-[17px] shadow-xs ${
                                    isDark ? 'bg-[#F0EFF6] text-[#29292B]' : 'bg-[#29292B] text-white'
                                }`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <FiShare size={28} strokeWidth={2} />
                            </motion.button>
                        )}

                        {status === 'open' && (
                            <motion.div
                                layoutId="sheet-container"
                                className={`w-[340px] rounded-[38px] p-3 py-5 shadow-xl relative transition-colors duration-300 ${
                                    isDark ? 'bg-[#1C1C1E]' : 'bg-[#F0EFF6]'
                                }`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={shapeTransition}
                            >
                                <div className="flex flex-col gap-1.5 relative">
                                    {users.map((user) => (
                                        <motion.div
                                            key={user.id}
                                            onHoverStart={() => setHoveredId(user.id)}
                                            onHoverEnd={() => setHoveredId(null)}
                                            onClick={() => handleSelectUser(user)}
                                            className="group relative flex items-center gap-5 p-2 z-10 cursor-pointer"
                                        >
                                            {hoveredId === user.id && (
                                                <motion.div
                                                    layoutId="hover-bg"
                                                    className={`absolute -left-6 -right-6 inset-y-0 border-[1px] rounded-[14px] shadow-md -z-10 ${
                                                        isDark ? 'bg-[#2C2C2E] border-white/5' : 'bg-[#fefefe] border-[#EAEAEA]'
                                                    }`}
                                                    transition={shapeTransition}
                                                />
                                            )}

                                            <motion.div
                                                className="relative w-11 h-11 overflow-hidden"
                                                animate={{
                                                    borderRadius: hoveredId === user.id ? "12px" : "28px"
                                                }}
                                                transition={shapeTransition}
                                                style={{ willChange: "border-radius" }}
                                            >
                                                <motion.img
                                                    layoutId={selectedUser?.id === user.id ? "avatar-morph" : `img-${user.id}`}
                                                    src={user.avatar}
                                                    className="w-full h-full object-cover"
                                                />
                                            </motion.div>

                                            <span className={`font-medium text-[18px] tracking-tight transition-colors ${
                                                isDark ? 'text-white/90' : 'text-[#28282D]'
                                            }`}>
                                                {user.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {(status === 'sending' || status === 'success') && (
                            <motion.div
                                layoutId="sheet-container"
                                className={`w-14 h-14 rounded-[17px] shadow-sm flex items-center justify-center transition-colors ${
                                    isDark ? 'bg-[#F0EFF6] text-[#29292B]' : 'bg-[#29292B] text-[#fefefe]'
                                }`}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <div className="relative w-full h-full p-2 flex items-center justify-center">
                                    {/* Progress Ring */}
                                    <svg className="absolute inset-0 w-full h-full -rotate-90 scale-[1.1] pointer-events-none">
                                        <circle
                                            cx="28" cy="28" r="22"
                                            stroke={isDark ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)"}
                                            strokeWidth="3" fill="transparent"
                                        />
                                        <motion.circle
                                            cx="28" cy="28" r="22"
                                            stroke={isDark ? "#29292B" : "#D9D9D9"}
                                            strokeWidth="3" fill="transparent" strokeDasharray="138"
                                            initial={{ strokeDashoffset: 138 }}
                                            animate={{ strokeDashoffset: status === 'success' ? 0 : 40 }}
                                            transition={{ duration: 1.8, ease: "easeInOut" }}
                                        />
                                    </svg>

                                    <div className="relative w-9 h-9 flex items-center justify-center">
                                        <AnimatePresence mode="popLayout">
                                            {status === 'sending' ? (
                                                <motion.img
                                                    key="sending-avatar"
                                                    layoutId="avatar-morph"
                                                    src={selectedUser?.avatar}
                                                    className="w-full h-full rounded-full object-cover"
                                                    exit={{ opacity: 0, scale: 0.5, filter: "blur(5px)" }}
                                                />
                                            ) : (
                                                <motion.div
                                                    key="success-check"
                                                    initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                                    className={`w-full h-full flex items-center justify-center ${
                                                        isDark ? 'text-[#29292B]' : 'text-[#D9D9D9]'
                                                    }`}
                                                >
                                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
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