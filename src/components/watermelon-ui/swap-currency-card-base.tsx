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
    <div className="border-border flex h-4 w-5 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-transparent sm:h-5 sm:w-6">
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
        className="border-border bg-background flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 transition-all active:scale-95 sm:gap-2 sm:px-3 sm:py-2"
      >
        <FlagIcon countryCode={selected.countryCode} emoji={selected.flag} />
        <span className="text-foreground text-xs font-semibold sm:text-sm">
          {selected.code}
        </span>
        <ChevronDown
          className={`text-muted-foreground h-4 w-4 transition-transform sm:h-5 sm:w-5 ${
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
            className="border-border bg-card absolute right-0 z-50 mt-2 w-40 rounded-lg border-[1.6px] py-1 shadow-lg sm:w-48"
          >
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  onSelect(currency);
                  setIsOpen(false);
                }}
                className="hover:bg-muted flex w-full items-center justify-between px-3 py-2 transition-colors sm:px-4 sm:py-2.5"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <FlagIcon
                    countryCode={currency.countryCode}
                    emoji={currency.flag}
                  />
                  <span className="text-foreground text-xs font-medium sm:text-sm">
                    {currency.code}
                  </span>
                </div>

                {currency.code === selected.code && (
                  <Check className="text-muted-foreground h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
    <div className="text-foreground flex items-center text-xl font-medium sm:text-2xl">
      {chars.map((char, i) => {
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
      <span className="text-foreground inline-block w-[0.54em] text-center font-bold">
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
          className="text-foreground absolute font-bold"
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
      className="border-border theme-injected bg-card flex w-xs flex-col gap-5 rounded-lg border-[1.6px] p-6 shadow-lg sm:w-sm sm:gap-6 sm:p-8"
    >
      <h2 className="text-muted-foreground text-lg font-semibold sm:text-[20px]">
        Swap Currency
      </h2>

      <div className="flex flex-col gap-1.5 sm:gap-2">
        <div className="bg-muted flex items-center justify-between rounded-lg p-3.5 sm:p-4">
          <div className="relative mr-2 flex-1">
            <AnimatedNumber value={fromAmount} />
            <input
              title="from"
              value={fromAmount}
              onChange={handleFromChange}
              className="caret-foreground absolute inset-0 w-full bg-transparent text-xl font-semibold tracking-[0.08em] text-transparent outline-none sm:text-[24px]"
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

        <div className="bg-muted flex items-center justify-between rounded-lg p-3.5 sm:p-4">
          <div className="relative mr-2 flex-1">
            <AnimatedNumber value={toAmount} />
            <input
              title="to"
              value={toAmount}
              onChange={handleToChange}
              className="caret-foreground absolute inset-0 w-full bg-transparent text-xl font-semibold tracking-[0.08em] text-transparent outline-none sm:text-[24px]"
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

      <button className="bg-primary text-primary-foreground w-full rounded-lg py-3.5 text-base font-semibold shadow-lg transition hover:opacity-90 active:scale-[0.98] sm:py-4 sm:text-[18px]">
        Proceed
      </button>

      <div className="text-muted-foreground text-center text-sm font-medium sm:text-base">
        1 {fromCurrency.code} ≈ {rate} {toCurrency.code}
      </div>
    </motion.div>
  );
};
