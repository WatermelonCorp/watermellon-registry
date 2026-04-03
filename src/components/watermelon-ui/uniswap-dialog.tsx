import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Check, ChevronDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/* utils */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* types */
export type Country = {
  name: string;
  code: string;
};

export type UniSwapDialogProps = {
  value: Country;
  onChange: (country: Country) => void;
  countries?: Country[];
  title?: string;
};

/* default countries */
export const DefaultCountries: Country[] = [
  { name: 'Afghanistan', code: 'AF' },
  { name: 'Åland Islands', code: 'AX' },
  { name: 'Albania', code: 'AL' },
  { name: 'Algeria', code: 'DZ' },
  { name: 'American Samoa', code: 'AS' },
  { name: 'Andorra', code: 'AD' },
  { name: 'Angola', code: 'AO' },
  { name: 'Australia', code: 'AU' },
  { name: 'Austria', code: 'AT' },
  { name: 'Belarus', code: 'BY' },
  { name: 'Cyprus', code: 'CY' },
  { name: 'India', code: 'IN' },
  { name: 'Mauritius', code: 'MU' },
  { name: 'Russia', code: 'RU' },
  { name: 'United States', code: 'US' },
];

/* flag */
const Flag = ({ code }: { code: string }) => (
  <img
    src={`https://flagcdn.com/w160/${code.toLowerCase()}.png`}
    alt={code}
    className="h-6 w-6 shrink-0 rounded-full object-cover"
    loading="lazy"
  />
);

/* component */
export function UniSwapDialog({
  value,
  onChange,
  countries = DefaultCountries,
  title = 'Select your region',
}: UniSwapDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredCountries = useMemo(() => {
    return countries.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [countries, search]);

  return (
    <div className="relative w-max">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-full bg-gray-100 px-2 py-1.5 transition-colors hover:bg-gray-200 dark:bg-[#3A3A3A] dark:hover:bg-[#444]"
      >
        <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full border border-gray-200 dark:border-transparent">
          <Flag code={value.code} />
        </div>
        <ChevronDown size={16} className="text-gray-700 dark:text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-998 bg-black/20 backdrop-blur-[2px]"
            />

            {/* Dialog Container */}
            <div className="fixed inset-0 z-999 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.96,
                  filter: 'blur(4px)',
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  filter: 'blur(4px)',
                }}
                transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                className="pointer-events-auto flex h-fit max-h-[520px] w-full max-w-[400px] flex-col overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-2xl sm:h-[520px] dark:border-[#282828] dark:bg-[#181818] dark:shadow-black/50"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 pb-2">
                  <h2 className="px-1 text-sm font-medium text-gray-900 dark:text-white">
                    {title}
                  </h2>
                  <button
                    title="close"
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-gray-500 transition-colors hover:text-gray-900 dark:text-white/80 dark:hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Search */}
                <div className="px-4 pb-3">
                  <div className="relative flex items-center">
                    <Search
                      size={16}
                      className="absolute left-3.5 text-gray-400 dark:text-[#8d8c8d]"
                    />
                    <input
                      autoFocus
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search by country or region"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-400 transition-colors outline-none focus:border-gray-300 dark:border-[#8d8c8d]/30 dark:bg-[#282828] dark:text-white dark:placeholder-[#8d8c8d] dark:focus:border-[#444]"
                    />
                  </div>
                </div>

                {/* List */}
                <div className="custom-scrollbar flex-1 overflow-y-auto pb-4">
                  {filteredCountries.length === 0 ? (
                    <div className="flex h-[150px] items-center justify-center text-sm text-gray-500 dark:text-[#8d8c8d]">
                      No countries found
                    </div>
                  ) : (
                    filteredCountries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          onChange(country);
                          setIsOpen(false);
                          setSearch('');
                        }}
                        className={cn(
                          'group flex w-full items-center justify-between px-4 py-2.5 transition-all',
                          value.code === country.code
                            ? 'bg-gray-100 dark:bg-[#3A3A3A]/50'
                            : 'hover:bg-gray-50 dark:hover:bg-[#3A3A3A]/30',
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full border border-gray-200 dark:border-transparent">
                            <Flag code={country.code} />
                          </div>
                          <span
                            className={cn(
                              'text-sm font-medium transition-colors',
                              value.code === country.code
                                ? 'text-gray-900 dark:text-white'
                                : 'text-gray-500 group-hover:text-gray-900 dark:text-white/80 dark:group-hover:text-white',
                            )}
                          >
                            {country.name}
                          </span>
                        </div>

                        {value.code === country.code && (
                          <Check
                            size={16}
                            className="text-gray-900 dark:text-white"
                          />
                        )}
                      </button>
                    ))
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #282828;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}