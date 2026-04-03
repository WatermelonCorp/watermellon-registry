'use client';

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type FC,
  type ChangeEvent,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';

/* --- Types --- */
export interface Currency {
  code: string;
  countryCode: string;
  flag: string;
  rate: number;
  name: string;
}

interface SwapCurrencyCardProps {
  currencies: Currency[];
  defaultFromCode?: string;
  defaultToCode?: string;
  defaultAmount?: string;
}

/* --- Flag Component --- */
interface FlagIconProps {
  countryCode: string;
  emoji: string;
}

const FlagIcon: FC<FlagIconProps> = ({ countryCode, emoji }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setImgError(false));
  }, [countryCode]);

  if (!countryCode) return <span className="text-lg sm:text-xl">{emoji}</span>;

  const src =
    countryCode === 'eu'
      ? 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg'
      : `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;

  return (
    <div className="flex h-4 w-5 shrink-0 items-center justify-center overflow-hidden rounded-xs border border-gray-200 bg-transparent sm:h-5 sm:w-6 dark:border-zinc-700">
      {!imgError ? (
        <img
          src={src}
          alt={countryCode}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-xs leading-none sm:text-sm">
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
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-[#E5E5E9] bg-[#fefefe] px-2.5 py-1.5 transition-all active:scale-95 sm:gap-2 sm:px-3 sm:py-2 dark:border-zinc-700 dark:bg-zinc-800"
      >
        <FlagIcon countryCode={selected.countryCode} emoji={selected.flag} />
        <span className="text-xs font-semibold text-gray-700 sm:text-sm dark:text-zinc-200">
          {selected.code}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform sm:h-5 sm:w-5 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, scale: 0.96, filter: 'blur(4px)' }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-50 mt-2 w-40 rounded-xl border-[1.6px] border-[#E5E5E9] bg-white py-1 shadow-lg sm:w-48 sm:rounded-2xl dark:border-zinc-700 dark:bg-zinc-800"
          >
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  onSelect(currency);
                  setIsOpen(false);
                }}
                className="flex w-full items-center justify-between px-3 py-2 transition-colors hover:bg-gray-50 sm:px-4 sm:py-2.5 dark:hover:bg-zinc-700/50"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <FlagIcon
                    countryCode={currency.countryCode}
                    emoji={currency.flag}
                  />
                  <span className="text-xs font-medium text-gray-700 sm:text-sm dark:text-zinc-200">
                    {currency.code}
                  </span>
                </div>

                {currency.code === selected.code && (
                  <Check className="h-3.5 w-3.5 text-gray-400 sm:h-4 sm:w-4 dark:text-zinc-500" />
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
  const chars = String(value || '0').split('');

  return (
    <div className="flex items-center text-xl font-medium text-[#2F2F33] sm:text-2xl dark:text-zinc-100">
      {chars.map((char, i) => {
        // Delay calculated from right-to-left (ones = 0 delay, tens = slightly longer, etc.)
        const delay = (chars.length - 1 - i) * 0.03;
        return <DigitColumn key={i} digit={char} delay={delay} />;
      })}
    </div>
  );
};

interface DigitColumnProps {
  digit: string;
  delay?: number;
}

const DigitColumn: FC<DigitColumnProps> = ({ digit, delay = 0 }) => {
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
      <span className="inline-block w-[0.54em] text-center font-bold text-[#010103] dark:text-white">
        {digit}
      </span>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: digitHeight, width: '0.6em' }}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={digit}
          initial={{ opacity: 0, y: -10, scale: 0.65, filter: 'blur(2px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 0, scale: 1, filter: 'blur(2px)' }}
          transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.4,
            delay: delay,
          }}
          className="absolute font-bold text-[#010103] dark:text-white"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

/* --- MAIN COMPONENT --- */
export const SwapCurrencyCard: FC<SwapCurrencyCardProps> = ({
  currencies,
  defaultFromCode = currencies[0].code,
  defaultToCode = currencies[1].code,
  defaultAmount = '10',
}) => {
  const fromDefault =
    currencies.find((c) => c.code === defaultFromCode) || currencies[0];
  const toDefault =
    currencies.find((c) => c.code === defaultToCode) || currencies[1];

  const [fromCurrency, setFromCurrency] = useState(fromDefault);
  const [toCurrency, setToCurrency] = useState(toDefault);
  const [fromAmount, setFromAmount] = useState(defaultAmount);
  const [toAmount, setToAmount] = useState('');

  const convert = useCallback(
    (amount: string, from: Currency, to: Currency): string => {
      const val = parseFloat(amount);
      if (isNaN(val)) return '';
      const usd = val / from.rate;
      return (usd * to.rate).toFixed(2);
    },
    [],
  );

  useEffect(() => {
    requestAnimationFrame(() =>
      setToAmount(convert(fromAmount, fromCurrency, toCurrency)),
    );
  }, [convert, fromAmount, fromCurrency, toCurrency]);

  const handleFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setFromAmount(val);
      setToAmount(convert(val, fromCurrency, toCurrency));
    }
  };

  const handleToChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setToAmount(val);
      setFromAmount(convert(val, toCurrency, fromCurrency));
    }
  };

  const rate = (toCurrency.rate / fromCurrency.rate).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="flex w-xs flex-col gap-5 rounded-[32px] border-[1.6px] border-[#E5E5E9] bg-[#FEFEFE] p-6 shadow-[0_32px_47px_-16px_rgba(0,0,0,0.1)] sm:w-sm sm:gap-6 sm:rounded-[40px] sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[0_32px_60px_-16px_rgba(0,0,0,0.5)]"
    >
      <h2 className="text-lg font-semibold text-[#898990] sm:text-[20px] dark:text-zinc-500">
        Swap Currency
      </h2>

      <div className="flex flex-col gap-1.5 sm:gap-2">
        {/* Input */}
        <div className="flex items-center justify-between rounded-t-4xl rounded-b-2xl bg-[#F6F5FA] p-3.5 sm:rounded-t-[24px] sm:rounded-b-3xl sm:p-4 dark:bg-zinc-800/50">
          <div className="relative mr-2 flex-1">
            <AnimatedNumber value={fromAmount} />
            <input
              title="from"
              value={fromAmount}
              onChange={handleFromChange}
              className="absolute inset-0 w-full bg-transparent text-xl font-semibold tracking-[0.08em] text-transparent caret-[#2F2F33] outline-none sm:text-[24px] dark:caret-zinc-100"
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
        <div className="flex items-center justify-between rounded-t-2xl rounded-b-4xl bg-[#F6F5FA] p-3.5 sm:rounded-t-3xl sm:rounded-b-[24px] sm:p-4 dark:bg-zinc-800/50">
          <div className="relative mr-2 flex-1">
            <AnimatedNumber value={toAmount} />
            <input
              title="to"
              value={toAmount}
              onChange={handleToChange}
              className="absolute inset-0 w-full bg-transparent text-xl font-semibold tracking-[0.08em] text-transparent caret-[#2F2F33] outline-none sm:text-[24px] dark:caret-zinc-100"
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

      <button className="w-full rounded-2xl bg-[#262629] py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-black active:scale-[0.98] sm:rounded-[22px] sm:py-4 sm:text-[18px] dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white">
        Proceed
      </button>

      <div className="text-center text-sm font-medium text-[#9F9EA1] sm:text-base dark:text-zinc-500">
        1 {fromCurrency.code} ≈ {rate} {toCurrency.code}
      </div>
    </motion.div>
  );
};
