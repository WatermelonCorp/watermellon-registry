import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { Plus, X, Wallet, Check } from 'lucide-react';
import { MdOutlineAddCard } from 'react-icons/md';

export interface PaymentCard {
  id: string;
  last4: string;
  brand: 'VISA' | 'MASTERCARD';
  isDefault?: boolean;
  hasToggle?: boolean;
}

export interface CashDisclosureProps {
  initialBalance: number;
  cards: PaymentCard[];
  presets: number[];
  onConfirm: (amount: number) => Promise<void>;
}

export const AddCashDisclosure: React.FC<CashDisclosureProps> = ({
  initialBalance,
  cards,
  presets,
  onConfirm,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string>(cards[0]?.id || '');
  const [selectedAmount, setSelectedAmount] = useState<number>(presets[1]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [displayBalance, setDisplayBalance] = useState(initialBalance);

  useEffect(() => {
    if (!isProcessing && !isDone) {
      setTimeout(() => setDisplayBalance(initialBalance), 0);
    }
  }, [initialBalance, isProcessing, isDone]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setIsProcessing(false);
    setIsDone(false);
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    await onConfirm(selectedAmount);
    setIsDone(true);
    setTimeout(() => handleClose(), 1500);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
  };

  return (
    <div
      className="theme-injected flex min-h-full w-full flex-col items-center justify-center bg-transparent text-foreground font-sans p-2 transition-colors duration-500 sm:p-4"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <MotionConfig transition={{ type: 'spring', bounce: 0, duration: 0.6 }}>
        <AnimatePresence mode="popLayout" initial={false}>
          {!isOpen ? (
            <motion.div
              key="collapsed"
              layoutId="add-cash-disclosure"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.3 },
              }}
              className="flex w-xs sm:w-sm items-center justify-between gap-4 sm:gap-8 border border-border bg-card text-card-foreground p-3 overflow-hidden"
              style={{
                borderRadius: 24,
              }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  layoutId="wallet-icon"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted shadow-sm transition-colors sm:h-14 sm:w-14"
                >
                  <Wallet
                    className="h-5 w-5 text-muted-foreground sm:h-8 sm:w-8"
                    fill="currentColor"
                    strokeWidth={1.5}
                  />
                </motion.div>
                <div className="flex flex-col">
                  <motion.span
                    layoutId="wallet-name"
                    className="text-xs font-normal tracking-wider text-muted-foreground capitalize"
                  >
                    Wallet
                  </motion.span>
                  <motion.span
                    layoutId="wallet-balance"
                    className="text-base font-semibold text-foreground sm:text-xl"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {formatCurrency(displayBalance)}
                  </motion.span>
                </div>
              </div>
              <motion.button
                layoutId="add-cash-button"
                onClick={handleOpen}
                className="flex items-center gap-1 rounded-full bg-foreground px-3 py-2 text-xs font-semibold text-background transition-colors hover:opacity-90 sm:px-4 sm:text-sm"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" strokeWidth={3} />
                Add Cash
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              layoutId="add-cash-disclosure"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.3 },
              }}
              className="flex w-xs sm:w-sm flex-col border border-border bg-card py-3 overflow-hidden"
              style={{
                borderRadius: 24,
              }}
            >
              <motion.div layout>
                <div className="flex items-center justify-between gap-2 px-4">
                  <div className="flex items-center gap-2">
                    <motion.div
                      layoutId="wallet-icon"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted shadow-sm sm:h-12 sm:w-12"
                    >
                      <Wallet
                        className="h-5 w-5 text-muted-foreground sm:h-7 sm:w-7"
                        fill="currentColor"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                    <div className="flex flex-col">
                      <motion.span
                        layoutId="wallet-name"
                        className="text-xs font-medium text-muted-foreground"
                      >
                        Wallet
                      </motion.span>
                      <motion.span
                        layoutId="wallet-balance"
                        className="text-sm font-semibold text-foreground sm:text-base"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {formatCurrency(displayBalance)}
                      </motion.span>
                    </div>
                  </div>
                  <button
                    title="close"
                    onClick={handleClose}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:text-foreground sm:h-8 sm:w-8"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={3} />
                  </button>
                </div>

                <div className="mt-4 h-px w-full bg-border" />

                <div className="mt-5 flex flex-col gap-2 px-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                      Payment Mode
                    </span>
                    <button className="flex items-center gap-1 rounded-xl border border-border bg-muted/60 px-2.5 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-accent/60">
                      <MdOutlineAddCard className="h-3 w-3 sm:h-4 sm:w-4" />
                      Add Card
                    </button>
                  </div>

                  <div className="space-y-2">
                    {cards.map((card) => {
                      const isSelected = selectedCard === card.id;
                      return (
                        <div
                          key={card.id}
                          onClick={() => setSelectedCard(card.id)}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-all sm:p-4 ${isSelected
                              ? 'border-foreground ring-1 ring-foreground bg-accent/30'
                              : 'border-border bg-muted/50 hover:border-ring/40'
                            }`}
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div
                              className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors sm:h-5 sm:w-5 ${isSelected
                                  ? 'border-foreground'
                                  : 'border-border'
                                }`}
                            >
                              {isSelected && (
                                <div className="h-2 w-2 rounded-full bg-foreground sm:h-2.5 sm:w-2.5" />
                              )}
                            </div>
                            <span className="text-xs font-medium text-foreground sm:text-sm">
                              <span className="mr-1 tracking-tighter text-muted-foreground">
                                ••••
                              </span>
                              {card.last4}
                            </span>
                          </div>
                          <span className="text-xs font-extrabold text-foreground italic">
                            {card.brand}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="my-4 flex flex-col gap-2 px-4">
                  <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                    Amount
                  </span>
                  <div className="flex gap-2">
                    {presets.map((amount) => {
                      const isSelected = selectedAmount === amount;
                      return (
                        <button
                          key={amount}
                          onClick={() => setSelectedAmount(amount)}
                          className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition-all sm:text-sm ${isSelected
                              ? 'border-foreground bg-card text-foreground ring-1 ring-foreground'
                              : 'border-border bg-muted/50 text-foreground hover:border-ring/40'
                            }`}
                        >
                          ${amount}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-1 px-4">
                  <motion.button
                    layoutId="add-cash-button"
                    onClick={handleConfirm}
                    disabled={isProcessing || isDone}
                    className="relative flex h-10 w-full items-center justify-start overflow-hidden rounded-full bg-foreground px-6 font-semibold text-background transition-colors sm:w-fit sm:min-w-35"
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      {isDone ? (
                        <motion.div
                          key="done"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="mx-auto flex items-center justify-center gap-2"
                        >
                          <div className="flex items-center justify-center rounded-full bg-background p-1">
                            <Check
                              className="size-3 text-foreground"
                              strokeWidth={4}
                            />
                          </div>
                          <span className="text-sm">Done</span>
                        </motion.div>
                      ) : isProcessing ? (
                        <motion.div
                          key="processing"
                          className="absolute inset-0 flex items-center bg-muted"
                        >
                          <motion.div
                            className="h-full bg-background"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.5, ease: 'easeInOut' }}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" strokeWidth={3} />
                          <span className="text-sm">Add Cash</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
};

