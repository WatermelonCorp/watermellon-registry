import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Wallet, Check, Sun, Moon } from 'lucide-react';
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
    const [isDark, setIsDark] = useState(false); 
    const [selectedCard, setSelectedCard] = useState<string>(cards[0]?.id || '');
    const [selectedAmount, setSelectedAmount] = useState<number>(presets[1]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [displayBalance, setDisplayBalance] = useState(initialBalance);

    useEffect(() => {
        if (!isProcessing && !isDone) {
            setDisplayBalance(initialBalance);
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
        setTimeout(() => {
            handleClose();
        }, 1500);
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(val);
    };

    return (
        <div className={`min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-500 p-4 ${isDark ? 'bg-[#0A0A0A]' : 'bg-white'}`}>
            
            {/* Theme Toggle Button */}
            <button 
                onClick={() => setIsDark(!isDark)}
                className={`mb-8 p-3 rounded-full transition-all active:scale-95 border ${
                    isDark ? 'bg-[#1C1C1E] border-white/10 text-yellow-400' : 'bg-white border-black/5 text-gray-400 shadow-sm'
                }`}
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <motion.div
                layout
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                className={`relative overflow-hidden transition-colors duration-300 border-2 shadow-sm ${
                    isDark ? 'bg-[#1C1C1E] border-white/5' : 'bg-white border-[#ECECEC]'
                } ${isOpen ? 'w-[400px] rounded-[32px] p-0 py-3' : 'w-[400px] rounded-2xl p-3'}`}
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
                            <div className="flex items-center gap-3">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center border-[1.5px] shadow-sm transition-colors ${
                                    isDark ? 'bg-gradient-to-b from-[#2A2A2D] to-[#1C1C1E] border-white/10' : 'bg-gradient-to-b from-[#F4F4F4] to-[#E2E3EA]/50 border-[#ECECEC]'
                                }`}>
                                    <Wallet className={`w-9 h-9 ${isDark ? 'text-[#4A4A4D]' : 'text-[#D1D0D7]'}`} fill={isDark ? '#2A2A2D' : 'white'} strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-base font-normal text-gray-400 capitalize tracking-wider">Wallet</span>
                                    <span className={`text-[22px] font-semibold font-sans transition-colors ${isDark ? 'text-white' : 'text-[#010103]'}`}>
                                        {formatCurrency(displayBalance)}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={handleOpen}
                                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-base font-semibold transition-colors ${
                                    isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-[#262629] text-[#fefefe] hover:bg-[#3d3d42]'
                                }`}
                            >
                                <Plus className="w-4 h-4" strokeWidth={3} />
                                Add Cash
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="expanded"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col "
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6">
                                <div className="flex items-center gap-3">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center border-[1.5px] shadow-sm transition-colors ${
                                        isDark ? 'bg-[#2A2A2D] border-white/10' : 'bg-gradient-to-b from-[#F4F4F4] to-[#E2E3EA]/50 border-[#ECECEC]'
                                    }`}>
                                        <Wallet className={`w-9 h-9 ${isDark ? 'text-[#4A4A4D]' : 'text-[#D1D0D7]'}`} fill={isDark ? '#2A2A2D' : 'white'} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium text-[#9C9BA2]">Wallet</span>
                                        <span className={`text-lg font-semibold transition-colors ${isDark ? 'text-white' : 'text-[#010101]'}`}>
                                            {formatCurrency(displayBalance)}
                                        </span>
                                    </div>
                                </div>
                                <button title='close'
                                    onClick={handleClose}
                                    className={`w-8 h-8 mb-6 rounded-full flex items-center justify-center transition-colors ${
                                        isDark ? 'bg-white/10 text-gray-400 hover:text-white' : 'bg-[#F0EFF8] text-[#ACABB7] hover:text-[#a09fab]'
                                    }`}
                                >
                                    <X className="w-5 h-5 " strokeWidth={3} />
                                </button>
                            </div>
                            <span className={`h-[1.5px] w-full mt-2 transition-colors ${isDark ? 'bg-white/5' : 'bg-[#ECECEC]'}`}></span>

                            {/* Payment Mode */}
                            <div className="flex flex-col gap-3 px-6 mt-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-base font-medium text-[#848488]">Payment Mode</span>
                                    <button className={`flex items-center gap-1.5 px-3 py-1 rounded-2xl text-sm font-semibold border-[1.5px] transition-colors ${
                                        isDark ? 'bg-white/5 text-white border-white/10 hover:bg-white/10' : 'bg-gray-50 text-[#000000] border-[#E8E8EE] hover:bg-gray-100'
                                    }`}>
                                        <MdOutlineAddCard className="w-5 h-5" />
                                        Add Card
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {cards.map((card) => (
                                        <div
                                            key={card.id}
                                            onClick={() => setSelectedCard(card.id)}
                                            className={`flex items-center justify-between p-4 rounded-xl border-[1.5px] transition-all cursor-pointer ${
                                                selectedCard === card.id 
                                                    ? (isDark ? 'border-white ring-1 ring-white bg-white/5' : 'border-[#010103] ring-1 ring-[#010103]') 
                                                    : (isDark ? 'border-white/5 bg-white/[0.02] hover:border-white/20' : 'border-[#ECECEC] bg-[#F6F5FA] hover:border-gray-200')
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                                    selectedCard === card.id ? (isDark ? 'border-white' : 'border-[#010103]') : (isDark ? 'border-white/10' : 'border-[#ECECEC]')
                                                }`}>
                                                    {selectedCard === card.id && (
                                                        <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-white' : 'bg-[#010103]'}`} />
                                                    )}
                                                </div>
                                                <span className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                                                    <span className={`mr-2 ${isDark ? 'text-gray-500' : 'text-[#000000]'}`}>••••</span>
                                                    {card.last4}
                                                </span>
                                            </div>
                                            <span className={`text-[12px] font-extrabold italic transition-colors ${isDark ? 'text-gray-400' : 'text-[#000000]'}`}>
                                                {card.brand}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cash presets */}
                            <div className="flex flex-col gap-3 px-6 my-4">
                                <span className="text-base font-medium text-[#808083]">Cash</span>
                                <div className="flex gap-2">
                                    {presets.map((amount) => (
                                        <button
                                            key={amount}
                                            onClick={() => setSelectedAmount(amount)}
                                            className={`flex-1 py-2.5 rounded-lg border-[1.5px] text-sm font-semibold transition-all ${
                                                selectedAmount === amount
                                                    ? (isDark ? 'border-white bg-white text-black' : 'border-[#000000] bg-[#fefefe] ring-1 ring-[#000000] text-[#000000]')
                                                    : (isDark ? 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20' : 'border-[#ECECEC] bg-[#F6F5FA] text-[#000000] hover:border-[#dedbdb]')
                                            }`}
                                        >
                                            ${amount}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={handleConfirm}
                                disabled={isProcessing || isDone}
                                className={`relative w-[140px] py-3 my-2 ml-6 rounded-full font-semibold transition-all flex items-center justify-center overflow-hidden ${
                                    isDone 
                                        ? (isDark ? 'bg-white text-black' : 'bg-[#262629] text-white')
                                        : isProcessing 
                                            ? 'bg-gray-500 text-white cursor-default' 
                                            : (isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-[#262629] text-white hover:bg-[#36363a]')
                                }`}
                            >
                                <AnimatePresence mode="wait">
                                    {isDone ? (
                                        <motion.div
                                            key="done"
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="flex items-center gap-2 "
                                        >
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
                                                <Check className={`w-4 h-4 ${isDark ? 'text-white' : 'text-[#262629]'}`} strokeWidth={4} />
                                            </div>
                                            <span>Done</span>
                                        </motion.div>
                                    ) : isProcessing ? (
                                        <motion.div
                                            key="processing"
                                            className={`absolute inset-0 flex items-center transition-colors ${isDark ? 'bg-gray-800' : 'bg-[#AFAEB8]'}`}
                                        >
                                            <motion.div
                                                className={`h-full transition-colors ${isDark ? 'bg-white' : 'bg-[#FEFEFE]'}`}
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
                                            <span className='text-[14px]'>Add Cash</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};