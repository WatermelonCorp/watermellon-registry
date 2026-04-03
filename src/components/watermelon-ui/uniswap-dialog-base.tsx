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
    <div className="relative w-max theme-injected font-sans">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-3xl bg-muted px-2 py-1.5 transition-colors hover:bg-muted/80"
      >
        <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full border border-border">
          <Flag code={value.code} />
        </div>
        <ChevronDown size={16} className="text-foreground" />
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
              className="fixed inset-0 z-998 bg-background/30 backdrop-blur-sm"
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
                className="pointer-events-auto flex h-fit max-h-[520px] w-full max-w-[400px] flex-col overflow-hidden rounded-2xl border-2 border-border bg-card shadow-lg sm:h-[520px]"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 pb-2">
                  <h2 className="px-1 text-sm font-medium text-foreground">
                    {title}
                  </h2>
                  <button
                    title="close"
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Search */}
                <div className="px-4 pb-3">
                  <div className="relative flex items-center">
                    <Search
                      size={16}
                      className="absolute left-3.5 text-muted-foreground"
                    />
                    <input
                      autoFocus
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search by country or region"
                      className="w-full rounded-lg border-2 border-input bg-muted py-2.5 pr-4 pl-10 text-sm text-foreground placeholder-muted-foreground transition-colors outline-none focus:border-input"
                    />
                  </div>
                </div>

                {/* List */}
                <div className="custom-scrollbar flex-1 overflow-y-auto pb-4">
                  {filteredCountries.length === 0 ? (
                    <div className="flex h-38 items-center justify-center text-sm text-muted-foreground">
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
                            ? 'bg-muted'
                            : 'hover:bg-muted/50',
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full border-2 border-border">
                            <Flag code={country.code} />
                          </div>
                          <span
                            className={cn(
                              'text-sm font-medium transition-colors',
                              value.code === country.code
                                ? 'text-foreground'
                                : 'text-muted-foreground group-hover:text-foreground',
                            )}
                          >
                            {country.name}
                          </span>
                        </div>

                        {value.code === country.code && (
                          <Check
                            size={16}
                            className="text-foreground"
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
          background: hsl(var(--border));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
