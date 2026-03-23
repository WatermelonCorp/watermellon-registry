"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
        <div className={`theme-injected ${theme === 'dark' ? 'dark' : ''}`}>
            <div className="w-full mt-12 flex flex-col items-center justify-center p-2 sm:p-6 relative">
                <div className="w-full max-w-xl">
                    <motion.div
                        layout="size"
                        transition={spring}
                        className="w-full bg-card text-card-foreground border border-border rounded-xl shadow-lg overflow-hidden"
                    >
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer select-none gap-2"
                            onClick={() => setExpanded(!expanded)}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 bg-primary rounded-md flex items-center justify-center shrink-0">
                                    <Calendar size={18} className="text-primary-foreground" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-sm text-foreground truncate">{title}</p>
                                    <p className="text-xs text-muted-foreground">Today, {time}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                                <div className="flex -space-x-2 overflow-hidden">
                                    {participants.slice(0, 3).map((p, i) => (
                                        <img key={i} src={p.avatar} className="w-6 h-6 rounded-full border-2 border-background object-cover" alt={p.name} />
                                    ))}
                                </div>
                                <motion.div
                                    animate={{ rotate: expanded ? 0 : 180 }}
                                    className="w-8 h-8 rounded-md border border-border bg-background flex items-center justify-center text-muted-foreground"
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
                                    <div className="p-4 space-y-4 text-sm text-muted-foreground border-t border-border bg-background rounded-t-xl">
                                        <Row icon={<Calendar size={15} />} label="Date">
                                            <Tag>{date}</Tag>
                                        </Row>

                                        <Row icon={<Clock size={15} />} label="Time">
                                            <div className="flex items-center gap-1 flex-wrap justify-end">
                                                <Tag>{time}</Tag>
                                                <span className="text-xs text-muted-foreground">to</span>
                                                <Tag>{duration}</Tag>
                                            </div>
                                        </Row>

                                        <Row icon={<Video size={15} />} label="Link">
                                            <Tag className="max-w-32 xs:max-w-44 sm:max-w-56 md:max-w-64 lg:max-w-72">
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
                                        <div className="pt-3 border-t border-border space-y-2">
                                            <p className="text-xs font-medium text-muted-foreground">Participants</p>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {participants.map((p, i) => (
                                                    <div key={i} className="flex items-center gap-2 px-2 py-1 bg-muted/50 border border-border rounded-md">
                                                        <img src={p.avatar} className="w-5 h-5 rounded-full" alt="" />
                                                        <span className="text-xs font-medium text-foreground">{p.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="pt-3 border-t border-border">
                                            <p className="text-xs font-medium text-muted-foreground mb-1">Description</p>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="p-3 flex flex-wrap items-center justify-between gap-3 bg-muted/40 border-t border-border">
                                        <p className="text-sm text-muted-foreground font-medium">Going?</p>
                                        <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
                                            {['Yes', 'No', 'Maybe'].map((opt) => (
                                                <button
                                                    key={opt}
                                                    className="px-3 py-1 rounded-md border border-border text-xs sm:text-sm font-medium text-foreground bg-background active:bg-accent transition-colors"
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                            <MoreHorizontal size={16} className="text-muted-foreground ml-1 cursor-pointer hidden xs:block" />
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
        <div className="flex items-center gap-2 text-muted-foreground shrink-0">
            {icon}
            <span className="text-xs font-medium whitespace-nowrap">{label}</span>
        </div>
        <div className="flex-1 flex justify-end min-w-0">{children}</div>
    </div>
);

const Tag = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-md border border-border text-xs text-foreground bg-muted/40 whitespace-nowrap overflow-hidden ${className}`}>
        {children}
    </div>
);

const Toggle = ({ active, onChange }: { active: boolean; onChange: (v: boolean) => void; }) => {
    return (
        <div
            onClick={() => onChange(!active)}
            className={`w-10 h-6 rounded-full px-1 flex items-center cursor-pointer transition-colors duration-200 ${active ? "bg-primary/20" : "bg-muted"
                }`}
        >
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                animate={{ x: active ? 16 : 0 }}
                className={`w-4 h-4 rounded-full shadow-xs ${active ? "bg-primary" : "bg-muted-foreground"
                    }`}
            />
        </div>
    );
};