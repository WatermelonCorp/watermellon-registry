"use client";

import { useState, useRef, useEffect, type FC, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

/* --- Types --- */
export interface Currency {
  code: string;
  countryCode: string;
  flag: string;
  rate: number;
  name: string;
}

interface SwapCurrencyCardProps {
  currencies?: Currency[];
  defaultFromCode?: string;
  defaultToCode?: string;
  defaultAmount?: string;
}

/* --- Default Currencies --- */
const DEFAULT_CURRENCIES: Currency[] = [
  { code: "USD", countryCode: "us", flag: "🇺🇸", rate: 1, name: "US Dollar" },
  { code: "EUR", countryCode: "eu", flag: "🇪🇺", rate: 0.92, name: "Euro" },
  { code: "INR", countryCode: "in", flag: "🇮🇳", rate: 83.12, name: "Indian Rupee" },
  { code: "GBP", countryCode: "gb", flag: "🇬🇧", rate: 0.79, name: "British Pound" },
  { code: "JPY", countryCode: "jp", flag: "🇯🇵", rate: 150.2, name: "Japanese Yen" },
];

/* --- Flag Component --- */
interface FlagIconProps {
  countryCode: string;
  emoji: string;
}

const FlagIcon: FC<FlagIconProps> = ({ countryCode, emoji }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [countryCode]);

  if (!countryCode) return <span className="text-lg sm:text-xl">{emoji}</span>;

  const src =
    countryCode === "eu"
      ? "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
      : `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;

  return (
    <div className="w-5 h-4 sm:w-6 sm:h-5 flex items-center justify-center rounded-xs overflow-hidden bg-transparent shrink-0 border border-gray-200 dark:border-zinc-700">
      {!imgError ? (
        <img
          src={src}
          alt={countryCode}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-xs sm:text-sm leading-none flex items-center justify-center h-full w-full">
          {emoji}
        </span>
      )}
    </div>
  );
};

/* --- Dropdown --- */
interface DropdownProps {
  selected: Currency;
  onSelect: (currency: Currency) => void;
  currencies: Currency[];
}

const Dropdown: FC<DropdownProps> = ({ selected, onSelect, currencies }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border border-[#E5E5E9] dark:border-zinc-700 transition-all active:scale-95 bg-[#fefefe] dark:bg-zinc-800"
      >
        <FlagIcon countryCode={selected.countryCode} emoji={selected.flag} />
        <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-zinc-200">
          {selected.code}
        </span>
        <ChevronDown
          className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 sm:w-48 bg-white dark:bg-zinc-800 rounded-xl sm:rounded-2xl shadow-lg border-[1.6px] border-[#E5E5E9] dark:border-zinc-700 z-50 py-1"
          >
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  onSelect(currency);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5 hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <FlagIcon
                    countryCode={currency.countryCode}
                    emoji={currency.flag}
                  />
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-zinc-200">
                    {currency.code}
                  </span>
                </div>

                {currency.code === selected.code && (
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-zinc-500" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* --- Animated Number --- */
interface AnimatedNumberProps {
  value: string;
}

const AnimatedNumber: FC<AnimatedNumberProps> = ({ value }) => {
  const chars = String(value || "0").split("");

  return (
    <div className="flex items-center text-xl sm:text-2xl font-semibold text-[#2F2F33] dark:text-zinc-100">
      {chars.map((char, i) => (
        <DigitColumn key={i} digit={char} />
      ))}
    </div>
  );
};

interface DigitColumnProps {
  digit: string;
}

const DigitColumn: FC<DigitColumnProps> = ({ digit }) => {
  // Adjusted heights for mobile/desktop
  const [digitHeight, setDigitHeight] = useState(28);
  
  useEffect(() => {
    const updateHeight = () => {
      setDigitHeight(window.innerWidth < 640 ? 24 : 28);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const num = Number(digit);

  if (Number.isNaN(num)) {
    return (
      <span className="inline-block w-[0.54em] text-center text-[#010103] dark:text-white font-bold">
        {digit}
      </span>
    );
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: digitHeight, width: "0.6em" }}
    >
      <motion.div
        initial={false}
        animate={{ y: -num * digitHeight }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="absolute top-0 left-0 flex flex-col"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{ height: digitHeight }}
            className="flex items-center justify-center font-bold text-[#010103] dark:text-white"
          >
            {i}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* --- MAIN COMPONENT --- */
export const SwapCurrencyCard: FC<SwapCurrencyCardProps> = ({
  currencies = DEFAULT_CURRENCIES,
  defaultFromCode = currencies[0].code,
  defaultToCode = currencies[1].code,
  defaultAmount = "10",
}) => {
  const fromDefault =
    currencies.find((c) => c.code === defaultFromCode) || currencies[0];
  const toDefault =
    currencies.find((c) => c.code === defaultToCode) || currencies[1];

  const [fromCurrency, setFromCurrency] = useState(fromDefault);
  const [toCurrency, setToCurrency] = useState(toDefault);
  const [fromAmount, setFromAmount] = useState(defaultAmount);
  const [toAmount, setToAmount] = useState("");

  useEffect(() => {
    setToAmount(convert(fromAmount, fromCurrency, toCurrency));
  }, [fromAmount, fromCurrency, toCurrency]);

  const convert = (amount: string, from: Currency, to: Currency): string => {
    const val = parseFloat(amount);
    if (isNaN(val)) return "";
    const usd = val / from.rate;
    return (usd * to.rate).toFixed(2);
  };

  const handleFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      setFromAmount(val);
      setToAmount(convert(val, fromCurrency, toCurrency));
    }
  };

  const handleToChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      setToAmount(val);
      setFromAmount(convert(val, toCurrency, fromCurrency));
    }
  };

  const rate = (toCurrency.rate / fromCurrency.rate).toFixed(2);

  return (
    <div className="relative flex w-full items-center justify-center bg-transparent transition-colors duration-500 px-4 py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-full max-w-sm border-[1.6px] border-[#E5E5E9] dark:border-zinc-800 bg-[#FEFEFE] dark:bg-zinc-900 rounded-4xl sm:rounded-[40px] p-6 sm:p-8 shadow-[0_32px_47px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_60px_-16px_rgba(0,0,0,0.5)] flex flex-col gap-5 sm:gap-6"
      >
        <h2 className="text-[#898990] dark:text-zinc-500 font-semibold text-lg sm:text-[20px]">
          Swap Currency
        </h2>

        <div className="flex flex-col gap-1.5 sm:gap-2">
          {/* Input */}
          <div className="flex items-center justify-between p-3.5 sm:p-4 bg-[#F6F5FA] dark:bg-zinc-800/50 rounded-t-4xl sm:rounded-t-3xl rounded-b-2xl sm:rounded-b-3xl">
            <div className="relative flex-1 mr-2">
              <AnimatedNumber value={fromAmount} />
              <input
                title="from"
                value={fromAmount}
                onChange={handleFromChange}
                className="absolute inset-0 bg-transparent outline-none text-transparent caret-[#2F2F33] dark:caret-zinc-100 text-xl sm:text-[24px] font-semibold w-full"
              />
            </div>

            <Dropdown
              selected={fromCurrency}
              currencies={currencies}
              onSelect={(c) => {
                setFromCurrency(c);
                setToAmount(convert(fromAmount, c, toCurrency));
              }}
            />
          </div>

          {/* Input Block 2 */}
          <div className="flex items-center justify-between p-3.5 sm:p-4 bg-[#F6F5FA] dark:bg-zinc-800/50 rounded-b-4xl sm:rounded-b-3xl rounded-t-2xl sm:rounded-t-3xl">
            <div className="relative flex-1 mr-2">
              <AnimatedNumber value={toAmount} />
              <input
                title="to"
                value={toAmount}
                onChange={handleToChange}
                className="absolute inset-0 bg-transparent outline-none text-transparent caret-[#2F2F33] dark:caret-zinc-100 text-xl sm:text-[24px] font-semibold w-full"
              />
            </div>

            <Dropdown
              selected={toCurrency}
              currencies={currencies}
              onSelect={(c) => {
                setToCurrency(c);
                setToAmount(convert(fromAmount, fromCurrency, c));
              }}
            />
          </div>
        </div>

        <button className="w-full bg-[#262629] dark:bg-zinc-100 text-white dark:text-zinc-950 font-semibold py-3.5 sm:py-4 rounded-2xl sm:rounded-[22px] text-base sm:text-[18px] hover:bg-black dark:hover:bg-white transition active:scale-[0.98] shadow-lg">
          Proceed
        </button>

        <div className="text-center text-sm sm:text-base text-[#9F9EA1] dark:text-zinc-500 font-medium">
          1 {fromCurrency.code} ≈ {rate} {toCurrency.code}
        </div>
      </motion.div>
    </div>
  );
};