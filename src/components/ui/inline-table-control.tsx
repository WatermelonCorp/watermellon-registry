"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Pencil, X, Check } from 'lucide-react';
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
    className?: string;
}

const getIcon = (field: string) => {
    const iconClass = "text-neutral-400 dark:text-neutral-500";
    if (field === 'expense') return <FaRegCreditCard size={18} className={iconClass} />;
    if (field === 'method') return <GoStack size={18} className={iconClass} />;
    if (field === 'amount') return <BsArrowUpRightSquare size={18} className={iconClass} />;
    return null;
};

export const InlineTableControl: React.FC<InlineTableControlProps> = ({ data, onUpdate, className = "" }) => {

    const [items, setItems] = useState<TableItem[]>(data);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<TableItem | null>(null);

    useEffect(() => {
        setItems(data);
    }, [data]);

    const handleDone = () => {
        if (editValues) {
            const updatedItems = items.map((item) =>
                item.id === editValues.id ? editValues : item
            );
            setItems(updatedItems);
            onUpdate?.(editValues);
            setEditingId(null);
            setEditValues(null);
        }
    };

    return (
        <div className={`w-full flex flex-col items-center justify-center p-4 sm:p-10 antialiased select-none ${className}`}>
            <div className="w-full max-w-lg">

                <div className={`hidden sm:grid grid-cols-[1.2fr_1fr_0.8fr_40px] px-6 py-4 font-semibold text-sm capitalize tracking-wider transition-all duration-300 
                    ${editingId ? 'opacity-20 blur-[1px]' : 'opacity-100'} text-neutral-400 dark:text-neutral-500`}>
                    <div className="flex items-center gap-2"><FaRegCreditCard size={18} /> Expense</div>
                    <div className="flex items-center gap-2"><GoStack size={18} /> Method</div>
                    <div className="flex items-center gap-2"><BsArrowUpRightSquare size={18} /> Amount</div>
                    <div></div>
                </div>

                <LayoutGroup>
                    <div className="flex flex-col gap-2 sm:gap-0">
                        {items.map((item) => (
                            <div key={item.id} className="relative">
                                {!editingId && <div className="hidden sm:block h-px mx-6 bg-neutral-100 dark:bg-neutral-800" />}

                                <AnimatePresence mode="popLayout">
                                    {editingId === item.id ? (
                                        <motion.div
                                            layoutId={`container-${item.id}`}
                                            className="border-[1.4px] rounded-2xl border-l-0 border-r-0 sm:rounded-none p-4 sm:p-8 sm:py-6 my-2 sm:my-4 z-20 relative shadow-xl sm:shadow-none bg-white border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800"
                                        >
                                            <div className="space-y-4 sm:space-y-5">
                                                {(['expense', 'method', 'amount'] as const).map((field) => (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        key={field}
                                                        className="flex flex-col sm:grid sm:grid-cols-[120px_1fr] gap-1.5 sm:gap-0 sm:items-center"
                                                    >
                                                        <label className="text-neutral-400 dark:text-neutral-500 font-bold text-[11px] sm:text-sm flex items-center gap-2 uppercase sm:capitalize tracking-wider">
                                                            {getIcon(field)} {field}
                                                        </label>
                                                        <input
                                                            title='edit text'
                                                            type="text"
                                                            value={editValues ? editValues[field] : ''}
                                                            onChange={(e) => setEditValues(prev => prev ? ({ ...prev, [field]: e.target.value }) : null)}
                                                            className="w-full border-[1.6px] rounded-xl px-4 py-2.5 sm:py-2 outline-none font-bold text-base sm:text-sm transition-all bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:focus:border-neutral-400"
                                                        />
                                                    </motion.div>
                                                ))}
                                            </div>

                                            <div className="flex flex-row justify-end gap-2 mt-6 sm:mt-8">
                                                <button
                                                    onClick={() => { setEditingId(null); setEditValues(null); }}
                                                    className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-5 py-3 sm:py-2 rounded-xl font-bold text-sm bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                                                >
                                                    <X size={18} /> <span>Cancel</span>
                                                </button>
                                                <button
                                                    onClick={handleDone}
                                                    className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-5 py-3 sm:py-2 rounded-xl font-bold text-sm bg-neutral-900 text-white dark:bg-white dark:text-black"
                                                >
                                                    <Check size={18} /> <span>Done</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            layoutId={`container-${item.id}`}
                                            className={`grid grid-cols-[1fr_auto_40px] sm:grid-cols-[1.2fr_1fr_0.8fr_40px] px-4 sm:px-6 py-4 sm:py-5 items-center group cursor-default transition-all duration-300 rounded-2xl sm:rounded-none 
                                                ${editingId
                                                    ? 'opacity-20 grayscale blur-[1px]'
                                                    : 'opacity-100 bg-neutral-50/50 sm:bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-100 sm:border-none dark:border-neutral-800'}`}
                                        >
                                            <div className="flex flex-col">
                                                <motion.div layout="position" className="font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
                                                    {item.expense}
                                                </motion.div>
                                                <motion.div layout="position" className="sm:hidden text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                                    {item.method}
                                                </motion.div>
                                            </div>

                                            <motion.div layout="position" className="hidden sm:block font-semibold text-sm text-neutral-500 dark:text-neutral-400">
                                                {item.method}
                                            </motion.div>

                                            <motion.div layout="position" className="font-bold text-sm sm:text-base text-neutral-700 dark:text-neutral-300 text-right sm:text-left">
                                                <span className='text-neutral-400 dark:text-neutral-600 mr-0.5'>$</span>
                                                {item.amount}
                                            </motion.div>

                                            <button
                                                title='edit'
                                                onClick={() => { setEditValues({ ...item }); setEditingId(item.id); }}
                                                className="flex justify-end text-neutral-400 hover:text-black dark:hover:text-white transition-transform active:scale-125"
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