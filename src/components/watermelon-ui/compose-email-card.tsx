"use client";

import { useState, useRef, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Minus, Maximize2, Mail, ChevronDown,
    Smile, Paperclip, Link2, Sparkles,
    MoreHorizontal, Bold, Italic,
    Calendar,
} from 'lucide-react';
import { LuSend } from 'react-icons/lu';

// --- Types ---
export interface Attachment {
    id: string;
    name: string;
    type: string;
    size: string;
    icon: 'PDF' | 'IMAGE' | 'DOC';
}

export interface Recipient {
    id: string;
    name: string;
    avatar: string;
    email: string;
}

export interface EmailData {
    from: Recipient;
    to: Recipient[];
    subject: string;
    body: string;
    attachments: Attachment[];
}

interface ComposeEmailCardProps {
    data: EmailData;
    onSend?: (data: EmailData) => void;
    onClose?: () => void;
}

export const ComposeEmailCard: FC<ComposeEmailCardProps> = ({ data, onSend, onClose }) => {
    const [showToolbar, setShowToolbar] = useState(false);
    const [toolbarPos, setToolbarPos] = useState({ x: 0, y: 0 });
    const [safeToolbarX, setSafeToolbarX] = useState(0);
    const bodyRef = useRef<HTMLDivElement>(null);
    const toolbarRef = useRef<HTMLDivElement>(null);

    const springConfig = { type: "spring", stiffness: 450, damping: 32, mass: 1 } as const;

    const handleSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0 && bodyRef.current) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const parentRect = bodyRef.current.getBoundingClientRect();

            setToolbarPos({
                x: rect.left + rect.width / 2 - parentRect.left,
                y: rect.top - parentRect.top - 60
            });
            setShowToolbar(true);
        } else {
            setShowToolbar(false);
        }
    };

    useEffect(() => {
        if (showToolbar && toolbarRef.current && bodyRef.current) {
            const rawX = toolbarPos.x;
            const toolbarWidth = toolbarRef.current.offsetWidth;
            const containerWidth = bodyRef.current.offsetWidth;
            const padding = 12;
            const minX = padding;
            const maxX = containerWidth - toolbarWidth - padding;
            setSafeToolbarX(Math.min(Math.max(rawX - toolbarWidth / 2, minX), maxX));
        }
    }, [showToolbar, toolbarPos.x]);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-2 sm:p-6 lg:p-10 relative overflow-hidden bg-transparent transition-colors duration-500 lg:mt-2">

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ...springConfig, damping: 38 }}
                className="w-full lg:max-w-145 max-h-[95vh] sm:max-h-[92vh] bg-[#F5F5F7] dark:bg-zinc-900 rounded-4xl sm:rounded-3xl shadow-lg border border-gray-200/60 dark:border-zinc-800 flex flex-col text-[#374151] dark:text-zinc-300 antialiased overflow-hidden z-10"
            >
                {/* Header */}
                <div className="flex-none flex items-center justify-between pl-4 sm:pl-5 pr-3 sm:pr-4 py-3 sm:py-4 bg-[#F5F5F7] dark:bg-zinc-900">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#6B5FF5] rounded-lg sm:rounded-xl flex items-center justify-center text-white">
                            <Mail size={18} className="sm:w-5.5" strokeWidth={1.5} />
                        </div>
                        <span className="font-semibold text-[14px] sm:text-[15px] tracking-tight text-[#29292B] dark:text-zinc-100">Compose email</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                        <button title='minimize' className="p-1.5 sm:p-2 rounded-lg text-gray-400 hover:text-black/70 dark:hover:text-white/70 transition-colors"><Minus size={16} /></button>
                        <button title='Maximize' className="hidden sm:block p-2 rounded-lg text-gray-400 hover:text-black/70 dark:hover:text-white/70 transition-colors"><Maximize2 size={15} /></button>
                        <button title='close' onClick={onClose} className="p-1.5 sm:p-2 hover:text-black/70 dark:hover:text-white/70 rounded-lg text-gray-400 transition-colors"><X size={18} /></button>
                    </div>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-zinc-950 border border-[#E5E5E5] dark:border-zinc-800 rounded-[18px] sm:rounded-4xl">
                    <div className="px-4 sm:px-8 pt-4 sm:pt-6 pb-2 space-y-2">
                        {/* From Section */}
                        <div className="flex items-center text-[13px]">
                            <span className="w-12 sm:w-14 text-gray-400">From</span>
                            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-gray-200 dark:border-zinc-800 hover:border-gray-300 transition-all cursor-pointer shadow-sm overflow-hidden max-w-50 sm:max-w-none">
                                <img src={data.from.avatar} alt="" className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover shrink-0" />
                                <span className="text-gray-700 dark:text-zinc-200 font-medium truncate">{data.from.name}</span>
                                <ChevronDown size={14} className="text-gray-400 shrink-0" />
                            </div>
                        </div>

                        {/* To Section */}
                        <div className="flex items-start text-[13px] border-b border-gray-100 dark:border-zinc-800 py-2">
                            <span className="w-12 sm:w-14 text-gray-400 mt-2">To</span>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 flex-1">
                                {data.to.map((recipient) => (
                                    <div key={recipient.id} className="flex items-center gap-1.5 sm:gap-2 bg-white dark:bg-zinc-900 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-gray-200 dark:border-zinc-800 shadow-sm">
                                        <img src={recipient.avatar} alt="" className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover" />
                                        <span className="text-gray-700 dark:text-zinc-200 font-medium">{recipient.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2 sm:gap-3 ml-2 sm:ml-4 font-medium text-gray-400 text-[10px] sm:text-[11px] mt-2.5">
                                <button className="hover:text-[#6366F1] transition-colors">CC</button>
                                <button className="hover:text-[#6366F1] transition-colors">BCC</button>
                            </div>
                        </div>

                        {/* Subject Section */}
                        <div className="flex items-center gap-2 sm:gap-4 py-2 border-b border-gray-100 dark:border-zinc-800">
                            <span className="text-gray-400 text-[13px] w-12 sm:w-14">Subject</span>
                            <input title='subject' type="text" defaultValue={data.subject} className="flex-1 font-medium text-gray-800 dark:text-zinc-100 text-[14px] sm:text-[15px] outline-none bg-transparent" />
                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className="relative px-4 sm:px-8 py-2 min-h-37.5 sm:min-h-50">
                        <AnimatePresence>
                            {showToolbar && (
                                <motion.div
                                    ref={toolbarRef}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        left: safeToolbarX,
                                    }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={springConfig}
                                    className="absolute flex items-center gap-1 bg-white dark:bg-zinc-900 shadow-xl border border-gray-200 dark:border-zinc-800 rounded-xl p-1 z-60 scale-90 sm:scale-100 origin-bottom"
                                    style={{ top: toolbarPos.y }}
                                >
                                    <button className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-gray-50 dark:bg-zinc-800 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors whitespace-nowrap">
                                        <Sparkles size={14} className="text-[#6366F1]" />
                                        <span className="text-[12px] sm:text-[13px] font-semibold text-gray-700 dark:text-zinc-200">Ask AI</span>
                                    </button>
                                    <div className="w-px h-4 bg-gray-200 dark:bg-zinc-700 mx-1" />
                                    <button title='bold' className="p-1.5 sm:p-2 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg text-gray-500"><Bold size={14} /></button>
                                    <button title='italic' className="p-1.5 sm:p-2 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg text-gray-500"><Italic size={14} /></button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div
                            ref={bodyRef}
                            contentEditable
                            onMouseUp={handleSelection}
                            onKeyUp={handleSelection}
                            className="outline-none text-[14px] sm:text-[15px] leading-relaxed text-gray-700 dark:text-zinc-300 whitespace-pre-wrap min-h-37.5"
                            dangerouslySetInnerHTML={{ __html: data.body }}
                        />

                        {/* Attachments Section */}
                        <div className="mt-6 sm:mt-8 pb-4">
                            <h4 className="text-[11px] sm:text-[12px] font-medium text-[#A7A7A9] capitalize tracking-widest mb-3 sm:mb-4">Attachments</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {data.attachments.map((file) => (
                                    <motion.div key={file.id} whileHover={{ y: -2 }} className="group flex items-center gap-3 p-2 bg-white dark:bg-zinc-900 border-[1.5px] border-[#F1F2F8] dark:border-zinc-800 rounded-2xl sm:rounded-[14px] hover:border-[#6366F1]/30 transition-all cursor-pointer">
                                        <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gray-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-[#F5F3FF] dark:group-hover:bg-[#6366F1]/10 group-hover:text-[#6366F1] transition-colors font-bold text-[9px] sm:text-[10px]">
                                            {file.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] sm:text-[14px] font-bold text-gray-800 dark:text-zinc-200 truncate">{file.name}</p>
                                            <p className="text-[10px] sm:text-[11px] text-gray-400 font-normal uppercase">{file.type} · {file.size}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex-none px-4 sm:px-6 py-3 sm:py-4 border-gray-100 dark:border-zinc-800 bg-[#F5F5F7] dark:bg-zinc-900 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                    {/* Icon Toolbar */}
                    <div className="flex items-center gap-0.5 sm:gap-1 text-gray-400 overflow-x-auto no-scrollbar">
                        <button title='more' className="p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-lg transition-all"><MoreHorizontal size={18} /></button>
                        <button title='smile' className="p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-lg transition-all"><Smile size={18} /></button>
                        <button title='file' className="p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-lg transition-all"><Paperclip size={18} /></button>
                        <button title='link' className="p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-lg transition-all"><Link2 size={18} /></button>
                        <button title='ai' className="p-2 hover:bg-[#F5F3FF] dark:hover:bg-[#6366F1]/10 hover:text-[#6366F1] rounded-lg transition-all"><Sparkles size={18} /></button>
                        <div className="hidden sm:block w-px h-5 bg-gray-200 dark:bg-zinc-800 mx-2" />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-200 dark:border-zinc-800">
                        <span className="text-[11px] text-[#C6C5CA] font-medium truncate max-w-25 sm:max-w-none">Draft saved</span>
                        <div className="flex items-center gap-2">
                            <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 border border-gray-200 dark:border-zinc-700 rounded-full text-[13px] sm:text-[14px] font-normal text-[#535355] dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all">
                                <Calendar size={16} strokeWidth={2.5} />
                                <span className="hidden xs:inline">Schedule</span>
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onSend?.(data)}
                                className="flex items-center gap-2 px-5 sm:px-6 py-1.5 sm:py-2 bg-[#0F0F0F] dark:bg-white text-white dark:text-black rounded-full text-[13px] sm:text-[14px] font-medium shadow-md hover:opacity-90 transition-all"
                            >
                                <LuSend size={15} /> Send
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #3f3f46; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                @media (max-width: 400px) {
                    .xs\\:inline { display: inline; }
                }
            `}</style>
        </div>
    );
};

export default ComposeEmailCard;