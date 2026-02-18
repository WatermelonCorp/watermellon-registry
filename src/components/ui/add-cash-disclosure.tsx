import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(val);
    };

    return (
        <div className="min-h-full w-full flex flex-col items-center justify-center p-2 sm:p-4 transition-colors duration-500 bg-transparent">
            
            <motion.div
                layout
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                className={`relative w-full max-w-100 overflow-hidden transition-colors duration-300 border-2 shadow-sm bg-white border-[#ECECEC] dark:bg-[#1C1C1E] dark:border-white/5 ${
                    isOpen ? 'rounded-[28px] sm:rounded-[32px] py-3' : 'rounded-2xl p-2 sm:p-3'
                }`}
            >
                <AnimatePresence mode="popLayout">
                    {!isOpen ? (
                        <motion.div
                            key="collapsed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center border-[1.5px] shadow-sm transition-colors bg-linear-to-b from-[#F4F4F4] to-[#E2E3EA]/50 border-[#ECECEC] dark:from-[#2A2A2D] dark:to-[#1C1C1E] dark:border-white/10">
                                    <Wallet className="w-5 h-5 sm:w-8 sm:h-8 text-[#D1D0D7] dark:text-[#4A4A4D]" fill="currentColor" strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] sm:text-xs font-normal text-gray-400 capitalize tracking-wider">Wallet</span>
                                    <span className="text-base sm:text-xl font-semibold font-sans text-[#010103] dark:text-white">
                                        {formatCurrency(displayBalance)}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={handleOpen}
                                className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors bg-[#262629] text-[#fefefe] hover:bg-[#3d3d42] dark:bg-white dark:text-black dark:hover:bg-gray-200"
                            >
                                <Plus className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={3} />
                                Add Cash
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="expanded"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 sm:px-6">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border-[1.5px] shadow-sm bg-linear-to-b from-[#F4F4F4] to-[#E2E3EA]/50 border-[#ECECEC] dark:from-[#2A2A2D] dark:to-[#1C1C1E] dark:border-white/10">
                                        <Wallet className="w-5 h-5 sm:w-7 sm:h-7 text-[#D1D0D7] dark:text-[#4A4A4D]" fill="currentColor" strokeWidth={1.5} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] sm:text-[10px] font-medium text-[#9C9BA2]">Wallet</span>
                                        <span className="text-sm sm:text-base font-semibold text-[#010101] dark:text-white">
                                            {formatCurrency(displayBalance)}
                                        </span>
                                    </div>
                                </div>
                                <button title='close'
                                    onClick={handleClose}
                                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors bg-[#F0EFF8] text-[#ACABB7] hover:text-[#a09fab] dark:bg-white/10 dark:text-gray-400 dark:hover:text-white"
                                >
                                    <X className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
                                </button>
                            </div>
                            
                            <div className="h-px w-full mt-4 bg-[#ECECEC] dark:bg-white/5" />

                            {/* Payment Mode */}
                            <div className="flex flex-col gap-2 sm:gap-3 px-4 sm:px-6 mt-5 sm:mt-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs sm:text-sm font-medium text-[#848488]">Payment Mode</span>
                                    <button className="flex items-center gap-1 px-2.5 py-1 rounded-2xl text-[10px] sm:text-xs font-semibold border-[1.5px] transition-colors bg-gray-50 text-[#000000] border-[#E8E8EE] hover:bg-gray-100 dark:bg-white/5 dark:text-white dark:border-white/10">
                                        <MdOutlineAddCard className="w-3 h-3 sm:w-4 sm:h-4" />
                                        Add Card
                                    </button>
                                </div>

                                <div className="space-y-2 sm:space-y-3">
                                    {cards.map((card) => {
                                        const isSelected = selectedCard === card.id;
                                        return (
                                            <div
                                                key={card.id}
                                                onClick={() => setSelectedCard(card.id)}
                                                className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border-[1.5px] transition-all cursor-pointer ${
                                                    isSelected 
                                                    ? 'border-[#010103] ring-1 ring-[#010103] dark:border-white dark:ring-white dark:bg-white/5' 
                                                    : 'border-[#ECECEC] bg-[#F6F5FA] hover:border-gray-300 dark:border-white/5 dark:bg-white/2 dark:hover:border-white/20'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2 sm:gap-3">
                                                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                                        isSelected ? 'border-[#010103] dark:border-white' : 'border-[#ECECEC] dark:border-white/10'
                                                    }`}>
                                                        {isSelected && <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#010103] dark:bg-white" />}
                                                    </div>
                                                    <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-200">
                                                        <span className="mr-1 text-[#000000] dark:text-gray-500 tracking-tighter">••••</span>
                                                        {card.last4}
                                                    </span>
                                                </div>
                                                <span className="text-[9px] sm:text-[10px] font-extrabold italic text-[#000000] dark:text-gray-400">
                                                    {card.brand}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Cash presets */}
                            <div className="flex flex-col gap-2 sm:gap-3 px-4 sm:px-6 my-4">
                                <span className="text-xs sm:text-sm font-medium text-[#808083]">Amount</span>
                                <div className="flex gap-2">
                                    {presets.map((amount) => {
                                        const isSelected = selectedAmount === amount;
                                        return (
                                            <button
                                                key={amount}
                                                onClick={() => setSelectedAmount(amount)}
                                                className={`flex-1 py-2 rounded-lg border-[1.5px] text-[11px] sm:text-sm font-semibold transition-all ${
                                                    isSelected
                                                    ? 'border-[#000000] bg-[#fefefe] ring-1 ring-[#000000] text-[#000000] dark:border-white dark:bg-white dark:text-black'
                                                    : 'border-[#ECECEC] bg-[#F6F5FA] text-[#000000] hover:border-[#dedbdb] dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:border-white/20'
                                                }`}
                                            >
                                                ${amount}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="px-4 sm:px-6 py-2">
                                <button
                                    onClick={handleConfirm}
                                    disabled={isProcessing || isDone}
                                    className={`relative w-full sm:w-fit sm:min-w-35 px-6 py-3 rounded-full font-semibold transition-all flex items-center justify-center overflow-hidden ${
                                        isDone 
                                        ? 'bg-[#262629] text-white dark:bg-white dark:text-black'
                                        : isProcessing 
                                        ? 'bg-gray-400 text-white cursor-default' 
                                        : 'bg-[#262629] text-white hover:bg-[#36363a] dark:bg-white dark:text-black dark:hover:bg-gray-200'
                                    }`}
                                >
                                    <AnimatePresence mode="wait">
                                        {isDone ? (
                                            <motion.div
                                                key="done"
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="flex items-center gap-2"
                                            >
                                                <div className="w-4 h-4 rounded-full flex items-center justify-center bg-white dark:bg-black">
                                                    <Check className="w-3 h-3 text-[#262629] dark:text-white" strokeWidth={4} />
                                                </div>
                                                <span className="text-sm">Done</span>
                                            </motion.div>
                                        ) : isProcessing ? (
                                            <motion.div
                                                key="processing"
                                                className="absolute inset-0 flex items-center bg-[#AFAEB8] dark:bg-gray-800"
                                            >
                                                <motion.div
                                                    className="h-full bg-[#FEFEFE] dark:bg-white"
                                                    initial={{ width: '0%' }}
                                                    animate={{ width: '100%' }}
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
                                                <Plus className="w-4 h-4" strokeWidth={3} />
                                                <span className='text-sm'>Add Cash</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};