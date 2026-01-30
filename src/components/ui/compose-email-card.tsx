import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Minus, Maximize2, Mail, ChevronDown,
    Smile, Paperclip, Link2, Sparkles,
    MoreHorizontal, Bold, Italic, Underline,
    Calendar, Command,
    Moon, Sun
} from 'lucide-react';
import { LuSend } from 'react-icons/lu';

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

export const ComposeEmailCard: React.FC<ComposeEmailCardProps> = ({ data, onSend, onClose }) => {
    const [showToolbar, setShowToolbar] = useState(false);
    const [toolbarPos, setToolbarPos] = useState({ x: 0, y: 0 });
    const bodyRef = useRef<HTMLDivElement>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
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

    const getSafeToolbarX = (rawX: number) => {
        if (!toolbarRef.current || !bodyRef.current) return rawX;

        const toolbarWidth = toolbarRef.current.offsetWidth;
        const containerWidth = bodyRef.current.offsetWidth;

        const padding = 12;

        const minX = padding;
        const maxX = containerWidth - toolbarWidth - padding;

        return Math.min(Math.max(rawX - toolbarWidth / 2, minX), maxX);
    };


    return (
        <div
            className="transition-all duration-500 min-h-screen w-full flex flex-col items-center justify-center p-10 relative overflow-hidden"
            style={{
                filter: theme === 'dark' ? 'invert(0.9) hue-rotate(180deg)' : 'none',
                backgroundColor: theme === 'dark' ? '#000' : 'transparent'
            }}
        >
            {/* Background Pattern */}
            <div className="fixed inset-0 pointer-events-none z-[-1] bg-[#FBFBFC] overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
              -45deg,
              #E5E7EB 0px,
              #E5E7EB 1px,
              transparent 1px,
              transparent 10px
            )`
                    }}
                />

                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(to right, #D1D5DB 1px, transparent 1px)`,
                        backgroundSize: '240px 100%',
                        maskImage: 'linear-gradient(to bottom, black 5px, transparent 5px)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 5px, transparent 5px)',
                        maskSize: '100% 10px',
                        WebkitMaskSize: '100% 10px'
                    }}
                />

                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, #D1D5DB 1px, transparent 1px)`,
                        backgroundSize: '100% 180px',
                        maskImage: 'linear-gradient(to right, black 5px, transparent 5px)',
                        WebkitMaskImage: 'linear-gradient(to right, black 5px, transparent 5px)',
                        maskSize: '10px 100%',
                        WebkitMaskSize: '10px 100%'
                    }}
                />
            </div>

            {/* Theme Toggle */}
            <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="absolute top-10 right-10 p-2 rounded-full border border-gray-300 bg-white shadow-sm z-50"
                style={{ filter: theme === 'dark' ? 'invert(1) hue-rotate(180deg)' : 'none' }}
            >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ...springConfig, damping: 38 }}
                className="w-full max-w-[580px] max-h-[92vh] bg-[#F5F5F7] rounded-[24px] shadow-lg border border-gray-200/60 flex flex-col text-[#374151] antialiased overflow-hidden z-10"
            >
                {/* Header */}
                <div className="flex-none flex items-center justify-between pl-5 pr-4 py-4 bg-[#F5F5F7]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#6B5FF5] rounded-[8px] flex items-center justify-center text-white">
                            <Mail size={22} strokeWidth={1.5} />
                        </div>
                        <span className="font-semibold text-[15px] tracking-tight text-[#29292B]">Compose email</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                        <button title='minimize' className="p-2 rounded-lg text-gray-400 hover:text-black/70 duration-200   transition-colors"><Minus size={18} /></button>
                        <button title='Maximize' className="p-2 rounded-lg text-gray-400 hover:text-black/70 duration-200  transition-colors"><Maximize2 size={15} /></button>
                        <button title='close' onClick={onClose} className="p-2 hover:text-black/70 rounded-lg text-gray-400 transition-colors duration-200"><X size={18} /></button>
                    </div>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-white border border-[#E5E5E5] rounded-[20px] ">
                    {/* Metadata Section */}
                    <div className="px-8 pt-6 pb-2 space-y-2">
                        <div className="flex items-center text-[13px]">
                            <span className="w-14 text-gray-400">From</span>
                            <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-full border border-gray-200 hover:border-gray-300 transition-all cursor-pointer shadow-sm">
                                <img src={data.from.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                                <span className="text-gray-700 font-medium">{data.from.name}</span>
                                <ChevronDown size={14} className="text-gray-400" />
                            </div>
                        </div>

                        <div className="flex items-start text-[13px] border-b border-gray-100  py-2">
                            <span className="w-14 text-gray-400 mt-2">To</span>
                            <div className="flex flex-wrap gap-2 flex-1">
                                {data.to.map((recipient) => (
                                    <div key={recipient.id} className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-full border border-gray-200 shadow-sm">
                                        <img src={recipient.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                                        <span className="text-gray-700 font-medium">{recipient.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-3 ml-4 font-medium text-gray-400 text-[11px] mt-2.5">
                                <button className="hover:text-[#6366F1] transition-colors">CC</button>
                                <button className="hover:text-[#6366F1] transition-colors">BCC</button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 py-2 border-b border-gray-100">
                            <span className="text-gray-400 text-[13px] w-14">Subject</span>
                            <input title='subject' type="text" defaultValue={data.subject} className="flex-1 font-medium text-gray-800 text-[15px] outline-none bg-transparent" />
                        </div>
                    </div>

                    {/* Composition Area */}
                    <div className="relative px-8 py-2 min-h-[200px]">
                        <AnimatePresence>
                            {showToolbar && (
                                <motion.div
                                    ref={toolbarRef}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        left: getSafeToolbarX(toolbarPos.x),
                                    }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={springConfig}
                                    className="absolute flex items-center gap-1 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-gray-200 rounded-xl p-1.5 z-[60]"
                                    style={{ top: toolbarPos.y }}
                                >
                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <Sparkles size={14} className="text-[#6366F1]" />
                                        <span className="text-[13px] font-semibold text-gray-700">Ask for changes</span>
                                        <div className="flex items-center gap-0.5 ml-1 text-gray-400">
                                            <Command size={10} /> <span className="text-[10px] font-bold">K</span>
                                        </div>
                                    </button>
                                    <div className="w-[1px] h-4 bg-gray-200 mx-1" />
                                    <button className="flex items-center gap-1 px-2 py-1.5 hover:bg-gray-50 rounded-lg text-[13px] font-medium text-gray-600">Text <ChevronDown size={14} /></button>
                                    <div className="flex items-center px-1 text-gray-500">
                                        <button title='bold' className="p-2 hover:bg-gray-50 rounded-lg"><Bold size={16} /></button>
                                        <button title='italic' className="p-2 hover:bg-gray-50 rounded-lg"><Italic size={16} /></button>
                                        <button title='underline' className="p-2 hover:bg-gray-50 rounded-lg"><Underline size={16} /></button>
                                        <button title='link' className="p-2 hover:bg-gray-50 rounded-lg"><Link2 size={16} /></button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div
                            ref={bodyRef}
                            contentEditable
                            onMouseUp={handleSelection}
                            onKeyUp={handleSelection}
                            className="outline-none text-[15px] leading-relaxed text-gray-700 whitespace-pre-wrap min-h-[170px]"
                            dangerouslySetInnerHTML={{ __html: data.body }}
                        />

                        {/* Attachments Section */}
                        <div className="mt-8">
                            <h4 className="text-[12px] font-medium text-[#A7A7A9] capitalize tracking-widest mb-4">Attachments</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {data.attachments.map((file) => (
                                    <motion.div key={file.id} whileHover={{ y: -2 }} className="group flex items-center gap-3.5 p-2 bg-white border-[1.7px] border-[#F1F2F8] rounded-[14px] hover:border-[#6366F1]/30 hover:shadow-sm transition-all cursor-pointer">
                                        <div className="w-11 h-11 bg-gray-100 rounded-[8px] flex items-center justify-center text-gray-400 group-hover:bg-[#F5F3FF] group-hover:text-[#6366F1] transition-colors font-bold text-[10px]">
                                            {file.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[14px] font-bold text-gray-800 truncate">{file.name}</p>
                                            <p className="text-[11px] text-gray-400 font-normal uppercase">{file.type} · {file.size}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex-none px-6 py-4 border-gray-100 bg-[#F5F5F7] flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-400">
                        <button title='more' className="p-2 hover:bg-white hover:text-gray-600 rounded-xl transition-all"><MoreHorizontal size={20} /></button>
                        <button title='smile' className="p-2 hover:bg-white hover:text-gray-600 rounded-xl transition-all"><Smile size={20} /></button>
                        <button title='file' className="p-2 hover:bg-white hover:text-gray-600 rounded-xl transition-all"><Paperclip size={20} /></button>
                        <button title='link' className="p-2 hover:bg-white hover:text-gray-600 rounded-xl transition-all"><Link2 size={20} /></button>
                        <button title='ai' className="p-2 hover:bg-[#F5F3FF] hover:text-[#6366F1] rounded-xl transition-all"><Sparkles size={20} /></button>
                        <div className="w-[1px] h-5 bg-gray-200 mx-2" />
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="hidden sm:inline text-[12px] text-[#C6C5CA] font-medium">Draft saved, 1m ago</span>
                        <div className="flex items-center gap-2.5">
                            <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-full text-[14px] font-normal text-[#535355] bg-transparent hover:bg-gray-50 shadow-sm transition-all">
                                <Calendar size={17} strokeWidth={2.5} /> Schedule
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onSend?.(data)}
                                className="flex items-center gap-2 px-4 py-2 bg-[#0F0F0F] text-white rounded-full text-[14px] font-medium shadow-md hover:bg-[#222222] transition-all"
                            >
                                <LuSend size={16} className="" /> Send
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>

            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 20px; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #E5E7EB transparent; }
      `}</style>
        </div>
    );
};