import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Sun, Moon } from 'lucide-react';

const transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 1
} as const;

export interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: string;
  icon: React.ReactNode;
  date: string;
  time: string;
  transactionId: string;
  paymentMethod: string;
  cardNumber: string;
  cardType: 'VISA' | 'MASTERCARD';
}

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const selectedTransaction = transactions.find((t) => t.id === selectedId);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 antialiased transition-colors duration-500 ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#F0ECE6]'}`}>
      
      {/* Theme Toggle */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className={`mb-6 p-3 rounded-full transition-all active:scale-90 border ${isDark ? 'bg-[#1C1C1C] border-white/10 text-yellow-400' : 'bg-white border-black/5 text-gray-400 shadow-sm'}`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="relative w-full max-w-[400px]">
        
        {/* Main List View */}
        <motion.div
          layout
          animate={{ 
            opacity: selectedId ? 0 : 1,
            scale: selectedId ? 0.9 : 1,
            filter: selectedId ? "blur(8px)" : "blur(0px)" 
          }}
          transition={transition}
          className={`rounded-[40px] p-6 shadow-sm overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#1C1C1C]' : 'bg-[#FEFEFE]'}`}
          style={{ borderRadius: 40, pointerEvents: selectedId ? 'none' : 'auto' }}
        >
          <motion.h2 layout="position" className={`font-medium text-[19px] mb-5 px-2 transition-colors ${isDark ? 'text-gray-400' : 'text-[#8F8D8B]'}`}>
            Transactions
          </motion.h2>

          <div className="space-y-1">
            {transactions.map((item) => (
              <motion.div
                key={item.id}
                layoutId={`container-${item.id}`} 
                onClick={() => setSelectedId(item.id)}
                className={`flex items-center justify-between p-3 -mx-2 cursor-pointer transition-colors ${isDark ? 'hover:bg-white/5 ' : 'hover:bg-gray-50'}`}
                transition={transition}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    layoutId={`icon-box-${item.id}`}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-[#2F2F2F] text-white' : 'bg-[#282825] text-[#F5F3EF]'}`}
                    transition={transition}
                  >
                    {item.icon}
                  </motion.div>
                  <div className="flex flex-col">
                    <motion.span 
                      layoutId={`name-${item.id}`} 
                      className={`font-bold text-[17px] origin-left transition-colors ${isDark ? 'text-gray-100' : 'text-[#2F2F2F]'}`}
                      transition={transition}
                    >
                      {item.name}
                    </motion.span>
                    <motion.span 
                      layoutId={`category-${item.id}`} 
                      className={`text-[15px] origin-left transition-colors ${isDark ? 'text-gray-500' : 'text-[#A4A4A4]'}`}
                      transition={transition}
                    >
                      {item.category}
                    </motion.span>
                  </div>
                </div>
                <motion.span 
                  layoutId={`amount-${item.id}`} 
                  className={`font-medium text-[17px] transition-colors ${isDark ? 'text-gray-400' : 'text-[#8E8F8A]'}`}
                  transition={transition}
                >
                  {item.amount}
                </motion.span>
              </motion.div>
            ))}
          </div>

          <motion.button
            layout="position"
            className={`w-full mt-6 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold text-[17px] transition-all duration-300 ${
              isDark ? 'bg-white/5 text-gray-200 hover:bg-white/10' : 'bg-[#F5F1EB] text-[#1C1C1E] hover:bg-gray-200'
            }`}
          >
            All Transactions <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        {/* Expanded Detail View */}
        <AnimatePresence>
          {selectedId && selectedTransaction && (
            <div className="absolute inset-0 z-50">
              <motion.div
                layoutId={`container-${selectedId}`}
                className={`w-full rounded-[40px] p-8 shadow-md overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#1C1C1C]' : 'bg-[#FEFEFE]'}`}
                style={{ borderRadius: 40 }}
                transition={transition}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col gap-4">
                    <motion.div 
                      layoutId={`icon-box-${selectedId}`}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isDark ? 'bg-[#2F2F2F] text-white' : 'bg-[#282825] text-white'}`}
                      transition={transition}
                    >
                      <motion.div initial={false} animate={{ scale: 1.2 }}>
                        {selectedTransaction.icon}
                      </motion.div>
                    </motion.div>
                    <div>
                      <motion.h3 
                        layoutId={`name-${selectedId}`} 
                        className={`font-bold text-[22px] origin-left transition-colors ${isDark ? 'text-white' : 'text-[#282825]'}`}
                        transition={transition}
                      >
                        {selectedTransaction.name}
                      </motion.h3>
                      <motion.p 
                        layoutId={`category-${selectedId}`} 
                        className={`text-[17px] origin-left transition-colors ${isDark ? 'text-gray-500' : 'text-[#949494]'}`}
                        transition={transition}
                      >
                        {selectedTransaction.category}
                      </motion.p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-6">
                    <button title='close'
                      onClick={() => setSelectedId(null)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                        isDark ? 'bg-white/10 text-gray-400 hover:text-white' : 'bg-[#D1CEC3] text-[#FEFEFE] hover:text-[#b5b2a9]'
                      }`}
                    >
                      <X size={20} strokeWidth={3} />
                    </button>
                    <motion.span 
                      layoutId={`amount-${selectedId}`} 
                      className={`font-bold text-[22px] transition-colors ${isDark ? 'text-white' : 'text-[#1C1C1E]'}`}
                      transition={transition}
                    >
                      {selectedTransaction.amount}
                    </motion.span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.15 }}
                  className={`space-y-4 pt-3.5 border-t-2 border-dashed transition-colors ${isDark ? 'border-white/10' : 'border-[#E9E8ED]'}`}
                >
                  <div className="flex justify-between text-[16px]">
                    <span className={isDark ? 'text-gray-500' : 'text-[#949494]'}>#{selectedTransaction.transactionId}</span>
                  </div>
                  <div className="flex flex-col text-[17px]">
                    <span className={`font-medium transition-colors ${isDark ? 'text-gray-400' : 'text-[#949494]'}`}>{selectedTransaction.date}</span>
                    <span className={isDark ? 'text-gray-500' : 'text-[#949494]'}>{selectedTransaction.time}</span>
                  </div>
                  <div className={`pt-4 border-t-2 border-dashed transition-colors ${isDark ? 'border-white/10' : 'border-[#E9E8ED]'}`}>
                    <p className={`text-[16px] mb-0.5 transition-colors ${isDark ? 'text-gray-500' : 'text-[#949494]'}`}>Paid Via {selectedTransaction.paymentMethod}</p>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium text-[17px] transition-colors ${isDark ? 'text-gray-300' : 'text-[#9B9999]'}`}>XXXX {selectedTransaction.cardNumber}</span>
                      <span className={`font-bold font-sans italic text-[16px] transition-colors ${isDark ? 'text-gray-400' : 'text-[#595957]/80'}`}>{selectedTransaction.cardType}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};