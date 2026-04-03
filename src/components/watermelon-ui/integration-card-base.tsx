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
      'relative flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] transition active:scale-95',
      active
        ? 'bg-primary/10 border-primary text-primary'
        : 'bg-muted/60 border-border text-muted-foreground hover:text-foreground hover:bg-muted',
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
      className="theme-injected bg-card text-foreground border-border hover:bg-accent/40 flex gap-4 border-b px-5 py-4 transition-colors last:rounded-b-lg last:border-b"
    >
      {/* Icon */}
      <div className="bg-muted/50 border-border flex h-10 w-10 shrink-0 items-center justify-center rounded-md border">
        {item.icon}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="truncate">
            <h3 className="text-foreground truncate text-[14px] font-medium">
              {item.name}
            </h3>
            <p className="text-muted-foreground mt-1 truncate text-[10px] tracking-wider uppercase">
              {item.entities}
            </p>
          </div>

          {item.available && (
            <span className="bg-primary/10 text-primary border-primary/30 shrink-0 rounded-md border px-2 py-0.5 text-[9px] font-bold">
              AVAILABLE
            </span>
          )}
        </div>

        <p className="text-muted-foreground mt-2 max-w-full text-[12px] leading-relaxed">
          {item.description}
        </p>

        <div className="mt-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="bg-muted/60 border-border text-muted-foreground rounded-md border px-2 py-0.5 text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="text-muted-foreground text-[10px] whitespace-nowrap">
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
    <div className="theme-injected text-foreground flex w-full flex-col items-center px-4 py-8">
      <div className="bg-card text-card-foreground border-border w-full max-w-145 overflow-hidden rounded-2xl border shadow-2xl transition-all duration-300">
        {/* Header */}
        <header className="bg-card text-foreground border-border flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-foreground text-[14px] font-semibold tracking-tight">
            {title}
          </h2>
          <button
            title="close"
            className="text-muted-foreground hover:text-foreground hover:bg-muted flex h-8 w-8 items-center justify-center rounded-full transition-all active:scale-90"
          >
            <IoClose size={18} />
          </button>
        </header>

        {/* Filters & Search */}
        <div className="bg-muted/30 border-border relative flex flex-col items-stretch gap-3 border-b px-5 py-4 md:flex-row md:items-center">
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
              className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3 -translate-y-1/2 transition-colors"
            />
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search for an app..."
              className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:ring-primary/20 focus:border-primary w-full rounded-full border py-1.5 pr-4 pl-9 text-[12px] transition-all focus:ring-2 focus:outline-none"
            />
          </div>

          {/* Global Popover (Anchored to filter area but absolute to container) */}
          <AnimatePresence>
            {activePopover && (
              <motion.div
                ref={popoverRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 4 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="bg-card border-border absolute top-full right-5 left-5 z-50 w-auto overflow-hidden rounded-xl border p-1.5 shadow-2xl md:right-auto md:left-5 md:min-w-48"
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
                      className="hover:bg-muted flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[12px] font-medium transition-colors"
                    >
                      {opt}
                      {selectedType === opt && (
                        <Check size={12} className="text-primary" />
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
                      className="hover:bg-muted flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[12px] font-medium transition-colors"
                    >
                      {opt}
                      {selectedUseCase === opt && (
                        <Check size={12} className="text-primary" />
                      )}
                    </button>
                  ))}
                {activePopover === 'more' && (
                  <div className="space-y-1 p-2">
                    <p className="text-muted-foreground px-2 pb-2 text-[10px] font-bold tracking-wider uppercase">
                      Advanced
                    </p>
                    <button className="hover:bg-muted flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[12px] transition-colors">
                      Sort by Name
                    </button>
                    <button className="hover:bg-muted flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[12px] transition-colors">
                      Sort by Recent
                    </button>
                    <button className="hover:bg-muted text-destructive flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[12px] font-semibold transition-colors">
                      Reset Filters
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* List */}
        <div className="bg-card text-card-foreground no-scrollbar max-h-[500px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {paginatedItems.map((item) => (
              <IntegrationCard key={item.id} item={item} />
            ))}
            {paginatedItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3 py-20 text-center"
              >
                <div className="bg-muted mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                  <Search size={20} className="text-muted-foreground" />
                </div>
                <p className="text-foreground text-sm font-medium">
                  No integrations found
                </p>
                <p className="text-muted-foreground text-xs">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedType('All types');
                    setSelectedUseCase('All use cases');
                  }}
                  className="text-primary text-xs font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="bg-muted/20 border-border text-muted-foreground flex flex-col items-center justify-between gap-4 border-t px-6 py-4 text-[11px] sm:flex-row">
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
              className="hover:bg-muted rounded-lg p-1.5 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1 px-2">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // Simple pagination logic for brevity
                if (
                  totalPages > 5 &&
                  pageNum > 2 &&
                  pageNum < totalPages - 1 &&
                  Math.abs(pageNum - currentPage) > 1
                ) {
                  if (pageNum === 3 || pageNum === totalPages - 2)
                    return (
                      <span key={pageNum} className="px-1">
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
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'hover:bg-muted text-muted-foreground',
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
              className="hover:bg-muted rounded-lg p-1.5 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};