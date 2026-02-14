"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <div className="transition-all duration-500 min-h-full bg-transparent flex flex-col items-center justify-center p-4 sm:p-10 space-y-12 relative">
            
            <motion.div
                layout
                transition={springConfig}
                className="w-full max-w-100 bg-[#F5F5F7] dark:bg-[#161616] border border-[#E5E5E5] dark:border-white/10 rounded-xl shadow-lg overflow-hidden transition-colors duration-500"
            >
                {/* Header Section */}
                <div
                    className="p-3.5 flex items-center justify-between cursor-pointer transition-colors bg-[#F5F5F7] dark:bg-[#161616]"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-[#D8775A] rounded-[10px] flex items-center justify-center text-[#EFE3DE] shadow-inner shrink-0">
                            <RiClaudeFill size={26} />
                        </div>
                        <span className="font-semibold text-[#1A1A1A] dark:text-[#ededed] text-[15px] transition-colors truncate">
                            {name}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        {/* Responsive SVG Graph Fixed */}
                        <div className="w-15 sm:w-20">
                            <svg viewBox="0 0 80 20" fill="none" className="w-full h-auto">
                                <path d="M2 18C15 15 25 5 45 8C65 11 70 2 78 2" stroke="#32BE3E" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>

                        <motion.div
                            animate={{ rotate: isExpanded ? 0 : 180 }}
                            className="w-8 h-8 rounded-lg border border-[#A9A9AB]/40 flex items-center justify-center text-[#A9A9AB] hover:text-[#7f7f81] bg-[#F5F5F7] dark:bg-[#1c1c1c] duration-200 transition-colors shrink-0"
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
                            className="border-t-[1.4px] border-[#E9E8EF] dark:border-white/5 shadow-3xl rounded-t-3xl bg-white dark:bg-[#1c1c1c] transition-colors duration-500"
                        >
                            <div className="p-5 space-y-4">
                                <DataRow icon={<Globe size={16} />} label="Website">
                                    <div className="flex items-center gap-1.5 border-[#e3e2e8] dark:border-white/10 px-2 py-1 rounded-full text-[11px] sm:text-[12px] text-[#666] dark:text-gray-400 font-medium border-[1.5px] truncate">
                                        <LinkIcon size={12} className="shrink-0" /> <span className="truncate">{website}</span>
                                    </div>
                                </DataRow>

                                <DataRow icon={<MousePointer2 size={16} />} label="Monthly visits">
                                    <span className="font-semibold text-[#464646] dark:text-[#d4d4d4] text-[14px]">{visits}</span>
                                </DataRow>

                                <DataRow icon={<Flame size={16} />} label="Heat Score">
                                    <div className="flex items-center gap-1 bg-[#EBF9EC] dark:bg-green-500/10 text-[#107F3E] dark:text-green-400 px-2 py-0.5 rounded-full text-[12px] font-bold border border-[#D1F0DB] dark:border-green-500/20">
                                        {heatScore} <RxArrowTopRight size={14} strokeWidth={0.5} />
                                    </div>
                                </DataRow>

                                <DataRow icon={<MapPin size={16} />} label="Location">
                                    <span className="font-semibold text-[#464646] dark:text-[#d4d4d4] text-[14px] text-right truncate ml-2">{location}</span>
                                </DataRow>

                                <DataRow icon={<Tag size={16} />} label="Categories">
                                    <div className="flex flex-wrap justify-end gap-2">
                                        {categories.map(cat => (
                                            <span key={cat} className="px-2.5 py-0.5 bg-[#F6EFFF] dark:bg-purple-500/10 text-[#7C3AED] dark:text-purple-400 rounded-full text-[11px] font-bold border border-[#E1D8F5] dark:border-purple-500/20 whitespace-nowrap">
                                                {cat}
                                            </span>
                                        ))}
                                    </div>
                                </DataRow>

                                <DataRow icon={<Users size={16} />} label="Employees">
                                    <span className="font-semibold text-[#464646] dark:text-[#d4d4d4] text-[14px]">{employees}</span>
                                </DataRow>

                                <DataRow icon={<DollarSign size={16} />} label="Estimated ARR">
                                    <span className="px-2 py-0.5 bg-[#E8F9EE] dark:bg-green-500/10 text-[#107F3E] dark:text-green-400 rounded-full text-[12px] font-bold border border-[#D1F0DB] dark:border-green-500/20">
                                        {arr}
                                    </span>
                                </DataRow>

                                <DataRow icon={<Flag size={16} />} label="Founders">
                                    <div className="flex flex-wrap items-center justify-end gap-2">
                                        {founders.map((f, i) => (
                                            <div key={i} className="flex items-center gap-2 bg-[#F7F7F8] dark:bg-white/5 border border-[#E5E5E5] dark:border-white/10 pl-1 pr-3 py-1 rounded-full shrink-0">
                                                <img src={f.avatar} className="w-5 h-5 rounded-full object-cover" alt="" />
                                                <span className="text-[12px] font-medium text-[#1A1A1A] dark:text-[#d4d4d4]">{f.name}</span>
                                            </div>
                                        ))}
                                        <div className="w-8 h-6 bg-[#F1F1F2] dark:bg-[#2a2a2a] border border-[#E5E5E5] dark:border-white/10 rounded-full flex items-center justify-center text-[11px] font-bold text-[#666] dark:text-gray-400 shrink-0">
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

const DataRow = ({ icon, label, children }: { icon: any, label: string, children: React.ReactNode }) => (
    <div className="flex items-center justify-between gap-4 py-0.5">
        <div className="flex items-center gap-3 text-[#A1A1A1] shrink-0">
            {icon}
            <span className="text-[13px] font-medium text-[#71717A] dark:text-gray-400 whitespace-nowrap">{label}</span>
        </div>
        <div className="flex justify-end flex-1 min-w-0">{children}</div>
    </div>
);