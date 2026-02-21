import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { Plus, X, Wallet, Check } from "lucide-react";
import { MdOutlineAddCard } from "react-icons/md";

export interface PaymentCard {
  id: string;
  last4: string;
  brand: "VISA" | "MASTERCARD";
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
  const [selectedCard, setSelectedCard] = useState<string>(cards[0]?.id || "");
  const [selectedAmount, setSelectedAmount] = useState<number>(presets[1]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [displayBalance, setDisplayBalance] = useState(initialBalance);

  useEffect(() => {
    if (!isProcessing && !isDone) setDisplayBalance(initialBalance);
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
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);
  };

  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center bg-transparent p-2 transition-colors duration-500 sm:p-4">
      <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.6 }}>
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
              style={{
                borderRadius: 24,
              }}
              className="flex w-100 max-w-100 items-center justify-between gap-10 border border-[#ECECEC] bg-white p-3 dark:border-white/5 dark:bg-[#1C1C1E] overflow-hidden"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  layoutId="wallet-icon"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border-[1.5px] border-[#ECECEC] bg-linear-to-b from-[#F4F4F4] to-[#E2E3EA]/50 shadow-sm transition-colors sm:h-14 sm:w-14 dark:border-white/10 dark:from-[#2A2A2D] dark:to-[#1C1C1E]"
                >
                  <Wallet
                    className="h-5 w-5 text-[#D1D0D7] sm:h-8 sm:w-8 dark:text-[#4A4A4D]"
                    fill="currentColor"
                    strokeWidth={1.5}
                  />
                </motion.div>
                <div className="flex flex-col">
                  <motion.span
                    layoutId="wallet-name"
                    className="text-[10px] font-normal tracking-wider text-gray-400 capitalize sm:text-xs"
                  >
                    Wallet
                  </motion.span>
                  <motion.span
                    layoutId="wallet-balance"
                    className="font-sans text-base font-semibold text-[#010103] sm:text-xl dark:text-white"
                  >
                    {formatCurrency(displayBalance)}
                  </motion.span>
                </div>
              </div>
              <motion.button
                layoutId="add-cash-button"
                onClick={handleOpen}
                className="flex items-center gap-1 rounded-full bg-[#262629] px-3 py-2 text-xs font-semibold text-[#fefefe] transition-colors hover:bg-[#3d3d42] sm:px-4 sm:text-sm dark:bg-white dark:text-black dark:hover:bg-gray-200"
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
              className="flex w-100 max-w-100 flex-col border border-[#ECECEC] bg-white py-3 dark:border-white/5 dark:bg-[#1C1C1E] overflow-hidden"
              style={{
                borderRadius: 24,
              }}
            >
              <motion.div layout>
                <div className="flex items-center justify-between gap-2 px-4">
                  <div className="flex items-center gap-2">
                    <motion.div
                      layoutId="wallet-icon"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border-[1.5px] border-[#ECECEC] bg-linear-to-b from-[#F4F4F4] to-[#E2E3EA]/50 shadow-sm sm:h-12 sm:w-12 dark:border-white/10 dark:from-[#2A2A2D] dark:to-[#1C1C1E]"
                    >
                      <Wallet
                        className="h-5 w-5 text-[#D1D0D7] sm:h-7 sm:w-7 dark:text-[#4A4A4D]"
                        fill="currentColor"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                    <div className="flex flex-col">
                      <motion.span
                        layoutId="wallet-name"
                        className="text-[9px] font-medium text-[#9C9BA2] sm:text-[10px]"
                      >
                        Wallet
                      </motion.span>
                      <motion.span
                        layoutId="wallet-balance"
                        className="text-sm font-semibold text-[#010101] sm:text-base dark:text-white"
                      >
                        {formatCurrency(displayBalance)}
                      </motion.span>
                    </div>
                  </div>
                  <button
                    title="close"
                    onClick={handleClose}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F0EFF8] text-[#ACABB7] transition-colors hover:text-[#a09fab] sm:h-8 sm:w-8 dark:bg-white/10 dark:text-gray-400 dark:hover:text-white"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={3} />
                  </button>
                </div>

                <div className="mt-4 h-px w-full bg-[#ECECEC] dark:bg-white/5" />

                <div className="mt-5 flex flex-col gap-2 px-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#848488] sm:text-sm">
                      Payment Mode
                    </span>
                    <button className="flex items-center gap-1 rounded-2xl border-[1.5px] border-[#E8E8EE] bg-gray-50 px-2.5 py-1 text-[10px] font-semibold text-[#000000] transition-colors hover:bg-gray-100 sm:text-xs dark:border-white/10 dark:bg-white/5 dark:text-white">
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
                          className={`flex cursor-pointer items-center justify-between rounded-xl border-[1.5px] p-3 transition-all sm:p-4 ${
                            isSelected
                              ? "border-[#010103] ring-1 ring-[#010103] dark:border-white dark:bg-white/5 dark:ring-white"
                              : "border-[#ECECEC] bg-[#F6F5FA] hover:border-gray-300 dark:border-white/5 dark:bg-white/2 dark:hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div
                              className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors sm:h-5 sm:w-5 ${
                                isSelected
                                  ? "border-[#010103] dark:border-white"
                                  : "border-[#ECECEC] dark:border-white/10"
                              }`}
                            >
                              {isSelected && (
                                <div className="h-2 w-2 rounded-full bg-[#010103] sm:h-2.5 sm:w-2.5 dark:bg-white" />
                              )}
                            </div>
                            <span className="text-xs font-medium text-gray-900 sm:text-sm dark:text-gray-200">
                              <span className="mr-1 tracking-tighter text-[#000000] dark:text-gray-500">
                                ••••
                              </span>
                              {card.last4}
                            </span>
                          </div>
                          <span className="text-[9px] font-extrabold text-[#000000] italic sm:text-[10px] dark:text-gray-400">
                            {card.brand}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="my-4 flex flex-col gap-2 px-4">
                  <span className="text-xs font-medium text-[#808083] sm:text-sm">
                    Amount
                  </span>
                  <div className="flex gap-2">
                    {presets.map((amount) => {
                      const isSelected = selectedAmount === amount;
                      return (
                        <button
                          key={amount}
                          onClick={() => setSelectedAmount(amount)}
                          className={`flex-1 rounded-lg border-[1.5px] py-2 text-[11px] font-semibold transition-all sm:text-sm ${
                            isSelected
                              ? "border-[#000000] bg-[#fefefe] text-[#000000] ring-1 ring-[#000000] dark:border-white dark:bg-white dark:text-black"
                              : "border-[#ECECEC] bg-[#F6F5FA] text-[#000000] hover:border-[#dedbdb] dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:border-white/20"
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
                    className={`relative flex h-10 w-full items-center justify-start overflow-hidden rounded-full bg-neutral-900 px-6 font-semibold text-neutral-100 transition-colors sm:w-fit sm:min-w-35 dark:bg-white dark:text-black`}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      {isDone ? (
                        <motion.div
                          key="done"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="mx-auto flex items-center justify-center gap-2"
                        >
                          <div className="flex items-center justify-center rounded-full bg-white p-1 dark:bg-black">
                            <Check
                              className="size-3 text-[#262629] dark:text-white"
                              strokeWidth={4}
                            />
                          </div>
                          <span className="text-sm">Done</span>
                        </motion.div>
                      ) : isProcessing ? (
                        <motion.div
                          key="processing"
                          className="absolute inset-0 flex items-center bg-[#AFAEB8] dark:bg-neutral-800"
                        >
                          <motion.div
                            className="h-full bg-[#FEFEFE] dark:bg-white"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
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
