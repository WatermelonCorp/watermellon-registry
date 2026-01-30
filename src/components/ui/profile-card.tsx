import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronUp, Globe, MousePointer2, Flame, MapPin,
    Tag, Users, DollarSign, Flag, Link as LinkIcon, Sun, Moon
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
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const springConfig = { type: "spring", stiffness: 300, damping: 30 } as const;

    return (
        <div
            className="transition-all duration-500"
            style={{
                filter: theme === 'dark' ? 'invert(0.9) hue-rotate(180deg)' : 'none',
                backgroundColor: theme === 'dark' ? '#000' : 'transparent'
            }}
        >
            <div className="min-h-screen bg-[#F5F5F7]/40 flex flex-col items-center justify-center p-10 space-y-12 relative">
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

                {/* Theme Toggle  */}
                <button
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="absolute top-10 right-10 p-2 rounded-full border border-gray-300 bg-white shadow-sm z-50"
                    style={{ filter: theme === 'dark' ? 'invert(1) hue-rotate(180deg)' : 'none' }}
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>



                <motion.div
                    layout
                    transition={springConfig}
                    className="w-full max-w-[380px] bg-[#F5F5F7] border border-[#E5E5E5] rounded-[16px] shadow-lg overflow-hidden"
                >
                    {/* Header Section */}
                    <div
                        className={`p-3.5 flex items-center justify-between cursor-pointer transition-colors bg-[#F5F5F7]`}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#D8775A] rounded-[10px] flex items-center justify-center text-[#EFE3DE] shadow-inner">
                                <RiClaudeFill size={26} />
                            </div>
                            <span className="font-semibold text-[#1A1A1A] text-[15px]">{name}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
                                <path d="M2 18C15 15 25 5 45 8C65 11 70 2 78 2" stroke="#32BE3E" strokeWidth="2" strokeLinecap="round" />
                            </svg>

                            <motion.div
                                animate={{ rotate: isExpanded ? 0 : 180 }}
                                className="w-8 h-8 rounded-lg border border-[#A9A9AB]/40 flex items-center justify-center text-[#A9A9AB] hover:text-[#7f7f81] bg-[#F5F5F7] duration-200 transition-colors"
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
                                className="border-t-[1.4px] border-[#E9E8EF] shadow-3xl rounded-t-3xl bg-white "
                            >
                                <div className="p-5 space-y-4">
                                    <DataRow icon={<Globe size={16} />} label="Website">
                                        <div className="flex items-center gap-1.5 border-[#e3e2e8] px-2 py-1 rounded-full text-[12px] text-[#666] font-medium border-[1.5px]">
                                            <LinkIcon size={12} /> {website}
                                        </div>
                                    </DataRow>

                                    <DataRow icon={<MousePointer2 size={16} />} label="Monthly visits">
                                        <span className="font-semibold text-[#464646] text-[14px]">{visits}</span>
                                    </DataRow>

                                    <DataRow icon={<Flame size={16} />} label="Heat Score">
                                        <div className="flex items-center gap-1 bg-[#EBF9EC] text-[#107F3E] px-2 py-0.5 rounded-full text-[12px] font-bold border border-[#D1F0DB]">
                                            {heatScore} <RxArrowTopRight size={14} strokeWidth={0.5} />
                                        </div>
                                    </DataRow>

                                    <DataRow icon={<MapPin size={16} />} label="Location">
                                        <span className="font-semibold text-[#464646] text-[14px]">{location}</span>
                                    </DataRow>

                                    <DataRow icon={<Tag size={16} />} label="Categories">
                                        <div className="flex gap-2">
                                            {categories.map(cat => (
                                                <span key={cat} className="px-2.5 py-0.5 bg-[#F6EFFF] text-[#7C3AED] rounded-full text-[11px] font-bold border border-[#E1D8F5]">
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                    </DataRow>

                                    <DataRow icon={<Users size={16} />} label="Employees">
                                        <span className="font-semibold text-[#464646] text-[14px]">{employees}</span>
                                    </DataRow>

                                    <DataRow icon={<DollarSign size={16} />} label="Estimated ARR">
                                        <span className="px-2 py-0.5 bg-[#E8F9EE] text-[#107F3E] rounded-full text-[12px] font-bold border border-[#D1F0DB]">
                                            {arr}
                                        </span>
                                    </DataRow>

                                    <DataRow icon={<Flag size={16} />} label="Founders">
                                        <div className="flex items-center gap-2">
                                            {founders.map((f, i) => (
                                                <div key={i} className="flex items-center gap-2 bg-[#F7F7F8] border border-[#E5E5E5] pl-1 pr-3 py-1 rounded-full">
                                                    <img src={f.avatar} className="w-5 h-5 rounded-full object-cover" alt="" />
                                                    <span className="text-[12px] font-medium text-[#1A1A1A]">{f.name}</span>
                                                </div>
                                            ))}
                                            <div className="w-8 h-6 bg-[#F1F1F2] border border-[#E5E5E5] rounded-full flex items-center justify-center text-[11px] font-bold text-[#666]">
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
        </div>
    );
};

const DataRow = ({ icon, label, children }: { icon: any, label: string, children: React.ReactNode }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[#A1A1A1]">
            {icon}
            <span className="text-[13px] font-medium text-[#71717A]">{label}</span>
        </div>
        <div className="flex justify-start w-[175px]">{children}</div>
    </div>
);