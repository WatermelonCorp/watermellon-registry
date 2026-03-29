import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';
import { IoClose } from 'react-icons/io5';
import { cn } from '@/lib/utils';

/* ---------- Types ---------- */
export interface IntegrationItem {
  id: string;
  name: string;
  entities: string;
  description: string;
  tags: string[];
  triggers: number;
  actions: number;
  available: boolean;
  icon: React.ReactNode;
}

interface IntegrationsCardProps {
  items: IntegrationItem[];
  title: string;
}

/* ---------- Sub-components ---------- */
const FilterButton: React.FC<{
  label: string;
  active?: boolean;
  onClick: () => void;
  selected?: string;
}> = ({ label, active, onClick, selected }) => (
  <button
    onClick={onClick}
    className={cn(
      'relative flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] transition active:scale-95',
      active
        ? 'border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-[#3a3a3a] dark:bg-[#1a1a1a] dark:text-white'
        : 'border-zinc-200 bg-zinc-100/50 text-zinc-500 hover:text-zinc-900 dark:border-[#2a2a2a] dark:bg-[#141414] dark:text-[#a3a3a3] dark:hover:text-white',
    )}
  >
    {selected || label}
    <ChevronDown
      size={12}
      className={cn(
        'transition-transform duration-300',
        active ? 'rotate-180' : '',
      )}
    />
  </button>
);

const IntegrationCard: React.FC<{ item: IntegrationItem }> = ({ item }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-4 border-b border-zinc-100 px-5 py-4 transition-colors last:rounded-b-[14px] last:border-b-[1.6px] hover:bg-zinc-50 dark:border-[#1f1f1f] dark:hover:bg-[#141414]"
    >
      {/* Icon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-[#2a2a2a] dark:bg-[#0f0f0f]">
        {item.icon}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="truncate">
            <h3 className="truncate text-[14px] font-medium text-zinc-900 dark:text-[#EEEEEE]">
              {item.name}
            </h3>
            <p className="mt-0.5 truncate text-[10px] tracking-wider text-zinc-400 uppercase dark:text-[#6b6b6b]">
              {item.entities}
            </p>
          </div>

          {item.available && (
            <span className="shrink-0 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 pt-1 text-[9px] font-bold text-green-600 dark:border-[#1AA420]/70 dark:bg-[#142E17] dark:text-[#1bb022]">
              AVAILABLE
            </span>
          )}
        </div>

        <p className="mt-2 max-w-full text-[12px] leading-relaxed text-zinc-500 dark:text-[#8a8a8a]">
          {item.description}
        </p>

        <div className="mt-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-500 dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:text-[#9a9a9a]"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="text-[10px] whitespace-nowrap text-zinc-400 dark:text-[#6b6b6b]">
            {item.triggers} TRIGGERS / {item.actions} ACTIONS
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------- Main ---------- */
export const IntegrationsCard: React.FC<IntegrationsCardProps> = ({
  items,
  title,
}) => {
  const [activePopover, setActivePopover] = useState<
    'type' | 'useCase' | 'more' | null
  >(null);
  const [selectedType, setSelectedType] = useState('All types');
  const [selectedUseCase, setSelectedUseCase] = useState('All use cases');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter Logic
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      selectedType === 'All types' || item.tags.includes(selectedType);
    const matchesUseCase =
      selectedUseCase === 'All use cases' ||
      item.entities.includes(selectedUseCase.toUpperCase());
    return matchesSearch && matchesType && matchesUseCase;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const typeOptions = ['All types', 'Marketplace', 'Internal', 'Third-party'];
  const useCaseOptions = [
    'All use cases',
    'Productivity',
    'Marketing',
    'Development',
    'Sales',
  ];

  return (
    <div className="text-foreground flex w-full flex-col items-center bg-transparent px-4 py-8">
      <div className="w-full max-w-145 overflow-hidden rounded-[22px] border border-zinc-200 bg-white shadow-2xl transition-all duration-300 dark:border-[#1f1f1f] dark:bg-[#101010]">
        {/* Header */}
        <header className="flex items-center justify-between px-5 py-4">
          <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
            {title}
          </h2>
          <button
            title="close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-all hover:bg-zinc-100 hover:text-zinc-900 active:scale-90 dark:text-[#6b6b6b] dark:hover:bg-white/5 dark:hover:text-white"
          >
            <IoClose size={18} />
          </button>
        </header>

        {/* Filters & Search */}
        <div className="relative flex flex-col items-stretch gap-3 rounded-t-[14px] border-t border-b border-zinc-100 bg-zinc-50 px-5 py-4 md:flex-row md:items-center dark:border-[#1f1f1f] dark:bg-[#171717]">
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <FilterButton
              label="All types"
              selected={selectedType !== 'All types' ? selectedType : undefined}
              active={activePopover === 'type'}
              onClick={() =>
                setActivePopover(activePopover === 'type' ? null : 'type')
              }
            />
            <FilterButton
              label="All use cases"
              selected={
                selectedUseCase !== 'All use cases'
                  ? selectedUseCase
                  : undefined
              }
              active={activePopover === 'useCase'}
              onClick={() =>
                setActivePopover(activePopover === 'useCase' ? null : 'useCase')
              }
            />
            <FilterButton
              label="More"
              active={activePopover === 'more'}
              onClick={() =>
                setActivePopover(activePopover === 'more' ? null : 'more')
              }
            />
          </div>

          <div className="hidden flex-1 md:block" />

          <div className="group relative w-full md:w-56">
            <Search
              size={14}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-zinc-900 dark:text-[#6b6b6b] dark:group-focus-within:text-white"
            />
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search for an app..."
              className="w-full rounded-lg border border-zinc-200 bg-white py-1.5 pr-4 pl-9 text-[12px] text-zinc-900 placeholder-zinc-400 transition-all focus:border-zinc-400 focus:outline-none dark:border-[#2a2a2a] dark:bg-[#121212] dark:text-white dark:placeholder-[#6b6b6b] dark:focus:border-[#3a3a3a]"
            />
          </div>

          {/* Global Popover */}
          <AnimatePresence>
            {activePopover && (
              <motion.div
                ref={popoverRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 4 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-5 left-5 z-50 w-auto overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 shadow-2xl md:right-auto md:left-5 md:min-w-48 dark:border-white/10 dark:bg-[#171717]"
              >
                {activePopover === 'type' &&
                  typeOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedType(opt);
                        setActivePopover(null);
                        setCurrentPage(1);
                      }}
                      className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[12px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-[#EEEEEE] dark:hover:bg-white/5"
                    >
                      {opt}
                      {selectedType === opt && (
                        <Check
                          size={12}
                          className="text-zinc-900 dark:text-white"
                        />
                      )}
                    </button>
                  ))}
                {activePopover === 'useCase' &&
                  useCaseOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedUseCase(opt);
                        setActivePopover(null);
                        setCurrentPage(1);
                      }}
                      className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[12px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-[#EEEEEE] dark:hover:bg-white/5"
                    >
                      {opt}
                      {selectedUseCase === opt && (
                        <Check
                          size={12}
                          className="text-zinc-900 dark:text-white"
                        />
                      )}
                    </button>
                  ))}
                {activePopover === 'more' && (
                  <div className="space-y-1 p-2">
                    <p className="px-2 pb-2 text-[9px] font-bold tracking-wider text-zinc-400 uppercase dark:text-[#555]">
                      Advanced
                    </p>
                    <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[11px] text-zinc-600 transition-colors hover:bg-zinc-50 dark:text-[#888] dark:hover:bg-white/5">
                      Sort by Name
                    </button>
                    <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[11px] text-zinc-600 transition-colors hover:bg-zinc-50 dark:text-[#888] dark:hover:bg-white/5">
                      Sort by Recent
                    </button>
                    <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[11px] font-medium text-red-500 transition-colors hover:bg-zinc-50 dark:hover:bg-white/5">
                      Reset Filters
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* List */}
        <div className="no-scrollbar max-h-130 overflow-y-auto bg-white dark:bg-[#171717]">
          <AnimatePresence mode="popLayout">
            {paginatedItems.map((item) => (
              <IntegrationCard key={item.id} item={item} />
            ))}
            {paginatedItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3 py-24 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-100 bg-zinc-50 dark:border-white/10 dark:bg-white/5">
                  <Search
                    size={20}
                    className="text-zinc-400 dark:text-[#555]"
                  />
                </div>
                <p className="text-[14px] font-medium tracking-tight text-zinc-900 dark:text-white">
                  No integrations found
                </p>
                <p className="text-[12px] text-zinc-400 dark:text-[#6b6b6b]">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedType('All types');
                    setSelectedUseCase('All use cases');
                  }}
                  className="text-[12px] font-bold text-zinc-900 hover:underline dark:text-white"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-4 border-t border-zinc-100 bg-zinc-50/30 px-6 py-4 text-[11px] text-zinc-400 sm:flex-row dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#6b6b6b]">
          <span className="font-medium">
            {filteredItems.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}{' '}
            – {Math.min(currentPage * itemsPerPage, filteredItems.length)} of{' '}
            {filteredItems.length} apps
          </span>

          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="rounded-lg p-1.5 transition-all hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-white/5"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1.5 px-2">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                if (
                  totalPages > 5 &&
                  pageNum > 2 &&
                  pageNum < totalPages - 1 &&
                  Math.abs(pageNum - currentPage) > 1
                ) {
                  if (pageNum === 3 || pageNum === totalPages - 2)
                    return (
                      <span key={pageNum} className="px-1 opacity-50">
                        …
                      </span>
                    );
                  return null;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-bold transition-all',
                      currentPage === pageNum
                        ? 'border border-orange-200 bg-orange-50 text-orange-600 shadow-sm dark:border-[#3a1f14] dark:bg-[#2a160e] dark:text-[#f97316]'
                        : 'text-zinc-500 hover:bg-zinc-100 dark:text-[#6b6b6b] dark:hover:bg-white/5',
                    )}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="rounded-lg p-1.5 transition-all hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-white/5"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};