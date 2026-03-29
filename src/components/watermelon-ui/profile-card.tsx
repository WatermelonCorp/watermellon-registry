'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronUp,
  Globe,
  MousePointer2,
  Flame,
  MapPin,
  Tag,
  Users,
  DollarSign,
  Flag,
  Link as LinkIcon,
} from 'lucide-react';
import { RiClaudeFill } from 'react-icons/ri';
import { RxArrowTopRight } from 'react-icons/rx';

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
  name,
  website,
  visits,
  heatScore,
  location,
  categories,
  employees,
  arr,
  founders,
  extraFounders = 5,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const springConfig = { type: 'spring', stiffness: 300, damping: 30 } as const;

  return (
    <div className="flex min-h-[500px] w-full items-center justify-center p-4">
      <motion.div
        layout
        transition={springConfig}
        className="w-xs overflow-hidden rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] shadow-lg transition-colors duration-500 md:w-sm dark:border-white/10 dark:bg-[#161616]"
      >
        {/* Header Section */}
        <div
          className="flex cursor-pointer items-center justify-between bg-[#F5F5F7] p-3.5 transition-colors dark:bg-[#161616]"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#D8775A] text-[#EFE3DE] shadow-inner">
              <RiClaudeFill size={26} />
            </div>
            <span className="truncate text-[15px] font-semibold text-[#1A1A1A] transition-colors dark:text-[#ededed]">
              {name}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {/* Responsive SVG Graph Fixed */}
            <div className="w-15 sm:w-20">
              <svg viewBox="0 0 80 20" fill="none" className="h-auto w-full">
                <path
                  d="M2 18C15 15 25 5 45 8C65 11 70 2 78 2"
                  stroke="#32BE3E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <motion.div
              animate={{ rotate: isExpanded ? 0 : 180 }}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#A9A9AB]/40 bg-[#F5F5F7] text-[#A9A9AB] transition-colors duration-200 hover:text-[#7f7f81] dark:bg-[#1c1c1c]"
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
              className="shadow-3xl rounded-t-3xl border-t-[1.4px] border-[#E9E8EF] bg-white transition-colors duration-500 dark:border-white/5 dark:bg-[#1c1c1c]"
            >
              <div className="space-y-4 p-5">
                <DataRow icon={<Globe size={16} />} label="Website">
                  <div className="flex items-center gap-1.5 truncate rounded-full border-[1.5px] border-[#e3e2e8] px-2 py-1 text-[11px] font-medium text-[#666] sm:text-[12px] dark:border-white/10 dark:text-gray-400">
                    <LinkIcon size={12} className="shrink-0" />{' '}
                    <span className="truncate">{website}</span>
                  </div>
                </DataRow>

                <DataRow
                  icon={<MousePointer2 size={16} />}
                  label="Monthly visits"
                >
                  <span className="text-[14px] font-semibold text-[#464646] dark:text-[#d4d4d4]">
                    {visits}
                  </span>
                </DataRow>

                <DataRow icon={<Flame size={16} />} label="Heat Score">
                  <div className="flex items-center gap-1 rounded-full border border-[#D1F0DB] bg-[#EBF9EC] px-2 py-0.5 text-[12px] font-bold text-[#107F3E] dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400">
                    {heatScore} <RxArrowTopRight size={14} strokeWidth={0.5} />
                  </div>
                </DataRow>

                <DataRow icon={<MapPin size={16} />} label="Location">
                  <span className="ml-2 truncate text-right text-[14px] font-semibold text-[#464646] dark:text-[#d4d4d4]">
                    {location}
                  </span>
                </DataRow>

                <DataRow icon={<Tag size={16} />} label="Categories">
                  <div className="flex flex-wrap justify-end gap-2">
                    {categories.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full border border-[#E1D8F5] bg-[#F6EFFF] px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap text-[#7C3AED] dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </DataRow>

                <DataRow icon={<Users size={16} />} label="Employees">
                  <span className="text-[14px] font-semibold text-[#464646] dark:text-[#d4d4d4]">
                    {employees}
                  </span>
                </DataRow>

                <DataRow icon={<DollarSign size={16} />} label="Estimated ARR">
                  <span className="rounded-full border border-[#D1F0DB] bg-[#E8F9EE] px-2 py-0.5 text-[12px] font-bold text-[#107F3E] dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400">
                    {arr}
                  </span>
                </DataRow>

                <DataRow icon={<Flag size={16} />} label="Founders">
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    {founders.map((f, i) => (
                      <div
                        key={i}
                        className="flex shrink-0 items-center gap-2 rounded-full border border-[#E5E5E5] bg-[#F7F7F8] py-1 pr-3 pl-1 dark:border-white/10 dark:bg-white/5"
                      >
                        <img
                          src={f.avatar}
                          className="h-5 w-5 rounded-full object-cover"
                          alt=""
                        />
                        <span className="text-[12px] font-medium text-[#1A1A1A] dark:text-[#d4d4d4]">
                          {f.name}
                        </span>
                      </div>
                    ))}
                    <div className="flex h-6 w-8 shrink-0 items-center justify-center rounded-full border border-[#E5E5E5] bg-[#F1F1F2] text-[11px] font-bold text-[#666] dark:border-white/10 dark:bg-[#2a2a2a] dark:text-gray-400">
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

const DataRow = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-between gap-4 py-0.5">
    <div className="flex shrink-0 items-center gap-3 text-[#A1A1A1]">
      {icon}
      <span className="text-[13px] font-medium whitespace-nowrap text-[#71717A] dark:text-gray-400">
        {label}
      </span>
    </div>
    <div className="flex min-w-0 flex-1 justify-end">{children}</div>
  </div>
);