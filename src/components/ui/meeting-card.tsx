"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronUp, Calendar, Clock, Bell, Video, Users,
    Link as LinkIcon, MoreHorizontal
} from 'lucide-react';

interface Participant {
    name: string;
    avatar: string;
}

interface MeetingCardProps {
    title: string;
    date: string;
    time: string;
    duration: string;
    meetingLink: string;
    notification: string;
    recording?: boolean;
    aiNotes?: boolean;
    participants: Participant[];
    description: string;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({
    title, date, time, duration, meetingLink, notification,
    participants, description
}) => {
    const [expanded, setExpanded] = useState(true);
    const [theme] = useState<'light' | 'dark'>('light');
    const [isRecording, setIsRecording] = useState(true);
    const [isAiEnabled, setIsAiEnabled] = useState(true);

    const spring = { type: 'spring', stiffness: 300, damping: 30 } as const;

    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <div className="w-full mt-12 flex flex-col items-center justify-center p-2 sm:p-6 relative bg-transparent"> 
                <div className="w-full max-w-full lg:w-100 lg:max-w-100 ">
                    <motion.div
                        layout="position" 
                        transition={spring}
                        className="w-full bg-[#F5F5F7] dark:bg-[#161616] border border-[#E5E5E5] dark:border-white/10 rounded-xl shadow-lg overflow-hidden"
                    >
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer select-none gap-2"
                            onClick={() => setExpanded(!expanded)}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 bg-[#BB89FA] rounded-[10px] flex items-center justify-center shrink-0">
                                    <Calendar size={18} className="text-white" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-[14px] text-[#1A1A1A] dark:text-[#EDEDED] truncate">{title}</p>
                                    <p className="text-[11px] text-[#6B7280] dark:text-gray-500">Today, {time}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                                <div className="flex -space-x-2 overflow-hidden">
                                    {participants.slice(0, 3).map((p, i) => (
                                        <img key={i} src={p.avatar} className="w-6 h-6 rounded-full border-2 border-white dark:border-[#161616] object-cover" alt={p.name} />
                                    ))}
                                </div>
                                <motion.div
                                    animate={{ rotate: expanded ? 0 : 180 }}
                                    className="w-8 h-8 rounded-lg border border-[#E5E5E5] dark:border-white/10 flex items-center justify-center text-[#9CA3AF]"
                                >
                                    <ChevronUp size={18} />
                                </motion.div>
                            </div>
                        </div>

                        <AnimatePresence initial={false} mode="sync">
                            {expanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={spring}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 space-y-4 text-[13px] text-[#555D6B] dark:text-gray-400 border-t-[1.4px] border-[#E9E8EF] dark:border-white/5 bg-white dark:bg-[#1C1C1C] rounded-t-[24px]">
                                        <Row icon={<Calendar size={15} />} label="Date">
                                            <Tag>{date}</Tag>
                                        </Row>

                                        <Row icon={<Clock size={15} />} label="Time">
                                            <div className="flex items-center gap-1 flex-wrap justify-end">
                                                <Tag>{time}</Tag>
                                                <span className='text-[11px] dark:text-gray-500'>to</span>
                                                <Tag>{duration}</Tag>
                                            </div>
                                        </Row>

                                        <Row icon={<Video size={15} />} label="Link">
                                            <Tag className="max-w-30 xs:max-w-[180px] sm:max-w-none">
                                                <LinkIcon size={12} className="shrink-0" /> 
                                                <span className="truncate">{meetingLink}</span>
                                            </Tag>
                                        </Row>

                                        <Row icon={<Bell size={15} />} label="Notification">
                                            <Tag>{notification}</Tag>
                                        </Row>

                                        <Row icon={<Video size={15} />} label="Recording">
                                            <Toggle active={isRecording} onChange={setIsRecording} />
                                        </Row>

                                        <Row icon={<Users size={15} />} label="AI notetaking">
                                            <Toggle active={isAiEnabled} onChange={setIsAiEnabled} />
                                        </Row>

                                        {/* Participants */}
                                        <div className="pt-3 border-t border-[#EFEFEF] dark:border-white/5 space-y-2">
                                            <p className="text-[12px] font-medium text-[#6B7280] dark:text-gray-500">Participants</p>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {participants.map((p, i) => (
                                                    <div key={i} className="flex items-center gap-2 px-2 py-1 bg-[#F5F5F7] dark:bg-white/5 border border-[#E5E5E5] dark:border-white/10 rounded-full">
                                                        <img src={p.avatar} className="w-5 h-5 rounded-full" alt="" />
                                                        <span className="text-[12px] font-medium text-[#1A1A1A] dark:text-gray-300">{p.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="pt-3 border-t border-[#EFEFEF] dark:border-white/5">
                                            <p className="text-[12px] font-medium text-[#6B7280] dark:text-gray-500 mb-1">Description</p>
                                            <p className="text-[12px] text-[#4B5563] dark:text-gray-400 leading-relaxed">{description}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Footer */}
                                    <div className="p-3 flex flex-wrap items-center justify-between gap-3 bg-[#F5F5F7] dark:bg-[#161616] border-t dark:border-white/5">
                                        <p className="text-[13px] text-[#6B7280] dark:text-gray-500 font-medium">Going?</p>
                                        <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
                                            {['Yes', 'No', 'Maybe'].map((opt) => (
                                                <button
                                                    key={opt}
                                                    className="px-2.5 sm:px-3 py-1 rounded-full border border-[#E5E5E5] dark:border-white/10 text-[11px] sm:text-[12px] font-medium text-[#374151] dark:text-gray-300 bg-white dark:bg-white/5 active:bg-gray-200 dark:active:bg-white/10 transition-colors"
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                            <MoreHorizontal size={16} className="text-[#9CA3AF] ml-1 cursor-pointer hidden xs:block" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const Row = ({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode; }) => (
    <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[#6B7280] dark:text-gray-500 shrink-0">
            {icon}
            <span className="text-[12px] font-medium whitespace-nowrap">{label}</span>
        </div>
        <div className="flex-1 flex justify-end min-w-0">{children}</div>
    </div>
);

const Tag = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-full border border-[#E5E5E5] dark:border-white/10 text-[12px] text-[#374151] dark:text-gray-300 bg-[#FAFAFA] dark:bg-white/5 whitespace-nowrap overflow-hidden ${className}`}>
        {children}
    </div>
);

const Toggle = ({ active, onChange }: { active: boolean; onChange: (v: boolean) => void; }) => {
    return (
        <div
            onClick={() => onChange(!active)}
            className={`w-9 h-5 rounded-full px-1 flex items-center cursor-pointer transition-colors duration-200 ${
                active ? "bg-[#EAF7EA] dark:bg-green-500/20" : "bg-[#F3F4F6] dark:bg-white/10"
            }`}
        >
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                animate={{ x: active ? 16 : 0 }}
                className={`w-3.5 h-3.5 rounded-full shadow-sm ${
                    active ? "bg-[#22C55E]" : "bg-[#9CA3AF]"
                }`}
            />
        </div>
    );
};