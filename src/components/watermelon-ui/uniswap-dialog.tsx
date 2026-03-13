import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Check, ChevronDown } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
  { name: "Afghanistan", code: "AF" },
  { name: "Åland Islands", code: "AX" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "Andorra", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Belarus", code: "BY" },
  { name: "Cyprus", code: "CY" },
  { name: "India", code: "IN" },
  { name: "Mauritius", code: "MU" },
  { name: "Russia", code: "RU" },
  { name: "United States", code: "US" },
];

/* flag */
const Flag = ({ code }: { code: string }) => (
  <img
    src={`https://flagcdn.com/w160/${code.toLowerCase()}.png`}
    alt={code}
    className="h-8 w-8 rounded-full object-cover shrink-0"
    loading="lazy"
  />
);

/* component */
export function UniSwapDialog({
  value,
  onChange,
  countries = DefaultCountries,
  title = "Select your region",
}: UniSwapDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCountries = useMemo(() => {
    return countries.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [countries, search]);

  return (
    <>
      {/* Trigger */}
      <motion.button
        layoutId="dialog-container"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-full bg-[#3A3A3A] px-3 py-1.5 transition-colors"
      >
        <motion.div
          layoutId={`flag-${value.code}`}
          className="h-8 w-8 overflow-hidden rounded-full shrink-0"
        >
          <Flag code={value.code} />
        </motion.div>
        <ChevronDown size={20} className="text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-60 bg-black/20 backdrop-blur-[2px]"
            />

            {/* Dialog */}
            <motion.div
              layoutId="dialog-container"
              initial={{ opacity: 0, scale: 0.9, y: 10, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, y: 10, x: "-50%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="
                fixed
                top-[10%] sm:top-[12%]
                left-1/2 -translate-x-1/2
                w-[92vw] sm:w-105
                max-h-[80vh]
                rounded-4xl
                border border-[#282828]
                bg-[#181818]
                shadow-2xl
                z-70
                overflow-hidden
                flex flex-col
              "
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 pb-2">
                <h2 className="px-1 text-[16px] font-medium text-white">
                  {title}
                </h2>
                <button
                  title="close"
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-white/80 transition-colors hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search */}
              <div className="px-5 pb-4">
                <div className="relative flex items-center">
                  <Search size={18} className="absolute left-4 text-[#8d8c8d]" />
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by country or region"
                    className="w-full rounded-xl border border-[#8d8c8d]/30 bg-[#282828] py-3 pl-11 pr-4 text-white placeholder-[#8d8c8d] outline-none transition-colors focus:border-[#444]"
                  />
                </div>
              </div>

              {/* List */}
              <div className="custom-scrollbar overflow-y-auto pb-4 flex-1">
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      onChange(country);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={cn(
                      "group flex w-full items-center justify-between px-5 py-3.5 transition-all",
                      value.code === country.code
                        ? "bg-[#3A3A3A]/50"
                        : "hover:bg-[#3A3A3A]/30"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        layoutId={
                          value.code === country.code
                            ? `flag-${country.code}`
                            : undefined
                        }
                        className="h-8 w-8 overflow-hidden rounded-full shrink-0"
                      >
                        <Flag code={country.code} />
                      </motion.div>
                      <span
                        className={cn(
                          "text-[16px] font-medium transition-colors",
                          value.code === country.code
                            ? "text-white"
                            : "text-white/80 group-hover:text-white"
                        )}
                      >
                        {country.name}
                      </span>
                    </div>

                    {value.code === country.code && (
                      <Check size={18} className="text-white" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #282828;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </>
  );
}