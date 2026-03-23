"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    ChevronUp, Globe, MousePointer2, Flame, MapPin,
    Tag, Users, DollarSign, Flag, Link as LinkIcon
} from 'lucide-react';
import { RiClaudeFill } from 'react-icons/ri';
import { RxArrowTopRight } from "react-icons/rx";

interface ProfileCardProps {
    logo?: string;
    name: string;
    website: string;
    visits: string;
    heatScore: number;
    location: string;
    categories: string[];
    employees: string;
    arr: string;
    founders: { name: string; avatar: string }[];
    extraFounders?: number;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
    name, website, visits, heatScore, location,
    categories, employees, arr, founders, extraFounders = 5
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const springConfig = { type: "spring", stiffness: 300, damping: 30 } as const;

    return (
        <div className="theme-injected font-sans transition-all duration-500 min-h-full bg-transparent flex flex-col items-center justify-center p-4 sm:p-10 space-y-12 relative">

            <motion.div
                layout
                transition={springConfig}
                className="w-full max-w-100 bg-card border border-border rounded-xl shadow-lg overflow-hidden transition-colors duration-500"
            >
                {/* Header Section */}
                <div
                    className="p-4 flex items-center justify-between cursor-pointer transition-colors bg-card"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-inner shrink-0">
                            <RiClaudeFill size={26} />
                        </div>
                        <span className="font-semibold text-foreground text-sm transition-colors truncate">
                            {name}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        {/* Responsive SVG Graph Fixed */}
                        <div className="w-15 sm:w-20">
                            <svg viewBox="0 0 80 20" fill="none" className="w-full h-auto text-primary">
                                <path d="M2 18C15 15 25 5 45 8C65 11 70 2 78 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>

                        <motion.div
                            animate={{ rotate: isExpanded ? 0 : 180 }}
                            className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground bg-background duration-200 transition-colors shrink-0"
                        >
                            <ChevronUp size={22} />
                        </motion.div>
                    </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={springConfig}
                            className="border-t border-border shadow-xl rounded-t-xl bg-popover transition-colors duration-500"
                        >
                            <div className="p-6 space-y-4">
                                <DataRow icon={<Globe size={16} />} label="Website">
                                    <div className="flex items-center gap-2 border border-input bg-background px-3 py-1 rounded-full text-xs text-muted-foreground font-medium truncate">
                                        <LinkIcon size={12} className="shrink-0" /> <span className="truncate">{website}</span>
                                    </div>
                                </DataRow>

                                <DataRow icon={<MousePointer2 size={16} />} label="Monthly visits">
                                    <span className="font-semibold text-foreground text-sm">{visits}</span>
                                </DataRow>

                                <DataRow icon={<Flame size={16} />} label="Heat Score">
                                    <div className="flex items-center gap-1 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold border border-border">
                                        {heatScore} <RxArrowTopRight size={14} strokeWidth={0.5} />
                                    </div>
                                </DataRow>

                                <DataRow icon={<MapPin size={16} />} label="Location">
                                    <span className="font-semibold text-foreground text-sm text-right truncate ml-2">{location}</span>
                                </DataRow>

                                <DataRow icon={<Tag size={16} />} label="Categories">
                                    <div className="flex flex-wrap justify-end gap-2">
                                        {categories.map(cat => (
                                            <span key={cat} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-bold border border-border whitespace-nowrap">
                                                {cat}
                                            </span>
                                        ))}
                                    </div>
                                </DataRow>

                                <DataRow icon={<Users size={16} />} label="Employees">
                                    <span className="font-semibold text-foreground text-sm">{employees}</span>
                                </DataRow>

                                <DataRow icon={<DollarSign size={16} />} label="Estimated ARR">
                                    <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-bold border border-border">
                                        {arr}
                                    </span>
                                </DataRow>

                                <DataRow icon={<Flag size={16} />} label="Founders">
                                    <div className="flex flex-wrap items-center justify-end gap-2">
                                        {founders.map((f, i) => (
                                            <div key={i} className="flex items-center gap-2 bg-muted border border-border pl-1 pr-3 py-1 rounded-full shrink-0">
                                                <img src={f.avatar} className="w-5 h-5 rounded-full object-cover" alt="" />
                                                <span className="text-xs font-medium text-foreground">{f.name}</span>
                                            </div>
                                        ))}
                                        <div className="w-8 h-6 bg-muted border border-border rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                                            +{extraFounders}
                                        </div>
                                    </div>
                                </DataRow>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

const DataRow = ({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between gap-4 py-0.5">
        <div className="flex items-center gap-3 text-muted-foreground shrink-0">
            {icon}
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        </div>
        <div className="flex justify-end flex-1 min-w-0">{children}</div>
    </div>
);