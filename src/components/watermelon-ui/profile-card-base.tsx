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
        className="bg-card border-border theme-injected w-xs overflow-hidden rounded-xl border shadow-lg transition-colors duration-500 md:w-sm"
      >
        {/* Header Section */}
        <div
          className="bg-card flex cursor-pointer items-center justify-between p-4 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="bg-primary text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-lg shadow-inner">
              <RiClaudeFill size={26} />
            </div>
            <span className="text-foreground truncate text-sm font-semibold transition-colors">
              {name}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {/* Responsive SVG Graph Fixed */}
            <div className="w-15 sm:w-20">
              <svg
                viewBox="0 0 80 20"
                fill="none"
                className="text-primary h-auto w-full"
              >
                <path
                  d="M2 18C15 15 25 5 45 8C65 11 70 2 78 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <motion.div
              animate={{ rotate: isExpanded ? 0 : 180 }}
              className="border-border text-muted-foreground hover:text-foreground bg-background flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors duration-200"
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
              className="border-border bg-popover rounded-t-xl border-t shadow-xl transition-colors duration-500"
            >
              <div className="space-y-4 p-6">
                <DataRow icon={<Globe size={16} />} label="Website">
                  <div className="border-input bg-background text-muted-foreground flex items-center gap-2 truncate rounded-full border px-3 py-1 text-xs font-medium">
                    <LinkIcon size={12} className="shrink-0" />{' '}
                    <span className="truncate">{website}</span>
                  </div>
                </DataRow>

                <DataRow
                  icon={<MousePointer2 size={16} />}
                  label="Monthly visits"
                >
                  <span className="text-foreground text-sm font-semibold">
                    {visits}
                  </span>
                </DataRow>

                <DataRow icon={<Flame size={16} />} label="Heat Score">
                  <div className="bg-accent text-accent-foreground border-border flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-bold">
                    {heatScore} <RxArrowTopRight size={14} strokeWidth={0.5} />
                  </div>
                </DataRow>

                <DataRow icon={<MapPin size={16} />} label="Location">
                  <span className="text-foreground ml-2 truncate text-right text-sm font-semibold">
                    {location}
                  </span>
                </DataRow>

                <DataRow icon={<Tag size={16} />} label="Categories">
                  <div className="flex flex-wrap justify-end gap-2">
                    {categories.map((cat) => (
                      <span
                        key={cat}
                        className="bg-secondary text-secondary-foreground border-border rounded-full border px-3 py-1 text-xs font-bold whitespace-nowrap"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </DataRow>

                <DataRow icon={<Users size={16} />} label="Employees">
                  <span className="text-foreground text-sm font-semibold">
                    {employees}
                  </span>
                </DataRow>

                <DataRow icon={<DollarSign size={16} />} label="Estimated ARR">
                  <span className="bg-secondary text-secondary-foreground border-border rounded-full border px-2 py-1 text-xs font-bold">
                    {arr}
                  </span>
                </DataRow>

                <DataRow icon={<Flag size={16} />} label="Founders">
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    {founders.map((f, i) => (
                      <div
                        key={i}
                        className="bg-muted border-border flex shrink-0 items-center gap-2 rounded-full border py-1 pr-3 pl-1"
                      >
                        <img
                          src={f.avatar}
                          className="h-5 w-5 rounded-full object-cover"
                          alt=""
                        />
                        <span className="text-foreground text-xs font-medium">
                          {f.name}
                        </span>
                      </div>
                    ))}
                    <div className="bg-muted border-border text-muted-foreground flex h-6 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold">
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
    <div className="text-muted-foreground flex shrink-0 items-center gap-3">
      {icon}
      <span className="text-muted-foreground text-sm font-medium whitespace-nowrap">
        {label}
      </span>
    </div>
    <div className="flex min-w-0 flex-1 justify-end">{children}</div>
  </div>
);