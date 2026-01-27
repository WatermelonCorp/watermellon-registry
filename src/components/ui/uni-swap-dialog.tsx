import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Check, ChevronDown } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/*  utils  */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*  types  */
export type Country = {
  name: string;
  code: string;
};

type UniSwapDialogProps = {
  value: Country;
  onChange: (country: Country) => void;
  countries?: Country[];
  title?: string;
};

/*  default countries  */
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

/*  flag  */
const Flag = ({ code }: { code: string }) => (
  <img
    src={`https://flagcdn.com/w160/${code.toLowerCase()}.png`}
    alt={code}
    className="h-8 w-8 rounded-full object-cover"
    loading="lazy"
  />
);

/*  component  */
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
          className="h-8 w-8 overflow-hidden rounded-full"
        >
          <Flag code={value.code} />
        </motion.div>
        <ChevronDown size={24} className="text-white" />
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
              className="fixed inset-0 z-40 bg-[#0F0F0F] backdrop-blur-[2px]"
            />

            {/* Dialog */}
            <motion.div
              layoutId="dialog-container"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="
                fixed
                top-[8%] sm:top-[10%] md:top-[12%]
                left-[10%] sm:left-[40%] -translate-x-1/2
                w-[90%] max-w-[420px]
                rounded-[20px]
                border border-[#282828]
                bg-[#181818]
                shadow-2xl
                z-50
                overflow-hidden
              "
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 pb-2">
                <h2 className="px-2 text-[16px] font-medium text-white">
                  {title}
                </h2>
                <button
                  title="close"
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/80 transition-colors hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search */}
              <div className="px-4 pb-4">
                <div className="relative flex items-center">
                  <Search size={18} className="absolute left-4 text-[#8d8c8d]" />
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by country or region"
                    className="w-full rounded-lg border border-[#8d8c8d]/70 bg-[#282828] py-3 pl-11 pr-4 text-white placeholder-[#8d8c8d] outline-none transition-colors focus:border-[#282828]"
                  />
                </div>
              </div>

              {/* List */}
              <div className="custom-scrollbar max-h-[500px] overflow-y-auto pb-2">
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      onChange(country);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={cn(
                      "group flex w-full items-center justify-between px-4 py-3 transition-all",
                      value.code === country.code
                        ? "bg-[#3A3A3A]/50"
                        : "hover:bg-[#3A3A3A]"
                    )}
                  >
                    <div className="flex items-center gap-6">
                      <motion.div
                        layoutId={
                          value.code === country.code
                            ? `flag-${country.code}`
                            : undefined
                        }
                        className="h-8 w-8 overflow-hidden rounded-full"
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