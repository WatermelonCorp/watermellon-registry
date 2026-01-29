import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Pencil, X, Check, Sun, Moon } from 'lucide-react';
import { GoStack } from 'react-icons/go';
import { BsArrowUpRightSquare } from 'react-icons/bs';
import { FaRegCreditCard } from 'react-icons/fa6';

export interface TableItem {
    id: string;
    expense: string;
    method: string;
    amount: string;
}

interface InlineTableControlProps {
    data: TableItem[];
   onUpdate?: (item: TableItem) => void;
}

const getIcon = (field: string) => {
    if (field === 'expense') return <FaRegCreditCard size={18} className="text-[#AEADBB]" />;
    if (field === 'method') return <GoStack size={18} className="text-[#AEADBB]" />;
    if (field === 'amount') return <BsArrowUpRightSquare size={18} className="text-[#AEADBB]" />;
    return null;
};

export const InlineTableControl: React.FC<InlineTableControlProps> = ({ data, onUpdate }) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<TableItem | null>(null);
    const [isDark, setIsDark] = useState(false);

    const handleDone = () => {
    if (editValues) {
        onUpdate?.(editValues); 
        setEditingId(null);
    }
};

    return (
        <div className={`min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-500 p-10 ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#FDFDFD]'}`}>
            
            {/* Theme Toggle */}
            <button 
                onClick={() => setIsDark(!isDark)}
                className={`mb-8 p-3 rounded-full border transition-all active:scale-90 ${isDark ? 'bg-[#1C1C1E] border-white/10 text-yellow-400' : 'bg-white border-black/5 text-gray-400 shadow-sm'}`}
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="w-full max-w-lg antialiased select-none">
                {/* Table Header */}
                <div className={`grid grid-cols-[1.2fr_1fr_0.8fr_40px] px-6 py-4 font-semibold text-[16px] capitalize tracking-wider transition-all duration-300 ${editingId ? 'opacity-20 blur-[1px]' : 'opacity-100 blur-0'} ${isDark ? 'text-gray-500' : 'text-[#B0AFB8]'}`}>
                    <div className="flex items-center gap-2"><FaRegCreditCard size={22} className='mr-2' /> Expense</div>
                    <div className="flex items-center gap-2"><GoStack size={22} className='mr-2' /> Method</div>
                    <div className="flex items-center gap-2"><BsArrowUpRightSquare size={22} className='mr-2' /> Amount</div>
                    <div></div>
                </div>

                <LayoutGroup>
                    <div className="flex flex-col">
                        {data.map((item) => (
                            <div key={item.id} className="relative">
                                {!editingId && <div className={`h-[0.5px] mx-6 transition-colors ${isDark ? 'bg-white/5' : 'bg-[#E6E6E8]'}`} />}
                                <AnimatePresence mode="popLayout">
                                    {editingId === item.id ? (
                                        <motion.div
                                            layoutId={`container-${item.id}`}
                                            className={`border-t-[1.4px] border-b-[1.4px] p-8 py-4 my-4 z-20 relative transition-colors ${isDark ? 'bg-[#141414] border-white/10' : 'bg-white border-[#E6E6EA]'}`}
                                            transition={{ type: 'spring', stiffness: 350, damping: 30, mass: 1 }}
                                        >
                                            <div className="space-y-5">
                                                {['expense', 'method', 'amount'].map((field) => (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        key={field}
                                                        className="grid grid-cols-[120px_1fr] items-center"
                                                    >
                                                        <label className="text-[#AFAEB3] font-semibold text-[16px] flex items-center gap-3 capitalize">
                                                            {getIcon(field)}
                                                            {field}
                                                        </label>
                                                        <input title='edit'
                                                            type="text"
                                                            autoFocus={field === 'expense'}
                                                            value={(editValues as any)?.[field]}
                                                            onChange={(e) => setEditValues(prev => prev ? ({ ...prev, [field]: e.target.value }) : null)}
                                                            className={`border-[1.6px] rounded-lg px-4 py-2 outline-none font-semibold text-[15px] transition-all ${isDark ? 'bg-[#1C1C1E] border-[#E1E1E1] text-white focus:border-white/30' : 'bg-[#FEFEFE] border-[#B1B1B1] text-[#28282A]'}`}
                                                        />
                                                    </motion.div>
                                                ))}
                                            </div>

                                            <div className="flex justify-end gap-3 mt-8">
                                                <button
                                                    onClick={() => setEditingId(null)}
                                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-bold text-[15px] transition-colors ${isDark ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-[#F4F4F9] text-[#29292E]'}`}
                                                >
                                                    <X size={20} strokeWidth={3} /> Cancel
                                                </button>
                                                <button
                                                    onClick={handleDone}
                                                    className={`flex items-center gap-2 px-5 py-2 rounded-md font-bold text-[15px] transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-[#262629] text-[#FEFEFE]'}`}
                                                >
                                                    <Check size={20} strokeWidth={3} /> Done
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            layoutId={`container-${item.id}`}
                                            className={`grid grid-cols-[1.2fr_1fr_0.8fr_40px] px-6 py-5 items-center group cursor-default transition-all duration-300 ${editingId ? 'opacity-20 grayscale blur-[1px]' : 'opacity-100 grayscale-0 blur-0'}`}
                                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                        >
                                            <motion.div layout="position" className={`font-bold text-[16px] ${isDark ? 'text-gray-100' : 'text-[#29292E]'}`}>{item.expense}</motion.div>
                                            <motion.div layout="position" className={`font-semibold text-[16px] ${isDark ? 'text-gray-400' : 'text-[#565558]'}`}>{item.method}</motion.div>
                                            <motion.div layout="position" className={`font-semibold text-[16px] ${isDark ? 'text-gray-300' : 'text-[#67666B]'}`}>
                                                <span className='text-[#B2B1BC] mr-1'>$</span>{item.amount}
                                            </motion.div>
                                            <button title='edit'
                                                onClick={() => {
                                                    setEditValues({ ...item });
                                                    setEditingId(item.id);
                                                }}
                                                className={`transition-all flex justify-end ${isDark ? 'text-gray-600 hover:text-white' : 'text-[#B2B1BA] hover:text-[#1C1C1E]'} hover:scale-110`}
                                            >
                                                <Pencil size={18} strokeWidth={2.5} />
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </LayoutGroup>
            </div>
        </div>
    );
};