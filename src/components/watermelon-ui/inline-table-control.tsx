'use client';

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
  const iconClass = 'text-neutral-400 dark:text-neutral-500';
  if (field === 'expense')
    return <FaRegCreditCard size={18} className={iconClass} />;
  if (field === 'method') return <GoStack size={18} className={iconClass} />;
  if (field === 'amount')
    return <BsArrowUpRightSquare size={18} className={iconClass} />;
  return null;
};

export const InlineTableControl: React.FC<InlineTableControlProps> = ({
  data,
  onUpdate,
  className = '',
}) => {
  const [items, setItems] = useState<TableItem[]>(data);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<TableItem | null>(null);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const handleDone = () => {
    if (editValues) {
      const updatedItems = items.map((item) =>
        item.id === editValues.id ? editValues : item,
      );
      setItems(updatedItems);
      onUpdate?.(editValues);
      setEditingId(null);
      setEditValues(null);
    }
  };

  const layoutTransition = {
    type: 'spring' as const,
    bounce: 0,
    duration: 0.7,
  };

  return (
    <div
      className={`flex w-full flex-col items-center justify-center p-4 antialiased select-none sm:p-10 ${className}`}
    >
      <div className="w-full max-w-lg">
        <motion.div
          layout
          transition={layoutTransition}
          className={`hidden grid-cols-[1.2fr_1fr_0.8fr_40px] px-6 py-4 text-sm font-semibold tracking-wider capitalize transition-all duration-300 sm:grid ${editingId ? 'opacity-20 blur-[1px]' : 'opacity-100'} text-neutral-400 dark:text-neutral-500`}
        >
          <motion.div layout className="flex items-center gap-2">
            <FaRegCreditCard size={18} /> Expense
          </motion.div>
          <motion.div layout className="flex items-center gap-2">
            <GoStack size={18} /> Method
          </motion.div>
          <motion.div layout className="flex items-center gap-2">
            <BsArrowUpRightSquare size={18} /> Amount
          </motion.div>
        </motion.div>

        <LayoutGroup>
          <div className="flex flex-col gap-2 sm:gap-0">
            {items.map((item) => (
              <div key={item.id} className="relative">
                {!editingId && (
                  <motion.div
                    layoutId={`divider-${item.id}`}
                    className="mx-6 hidden h-px bg-neutral-100 sm:block dark:bg-neutral-800"
                  />
                )}

                <AnimatePresence mode="popLayout">
                  {editingId === item.id ? (
                    <motion.div
                      layoutId={`container-${item.id}`}
                      transition={layoutTransition}
                      className="relative z-20 my-2 rounded-2xl border-[1.4px] border-r-0 border-l-0 border-neutral-200 bg-white p-4 shadow-xl sm:my-4 sm:rounded-none sm:p-8 sm:py-4 sm:shadow-none dark:border-neutral-800 dark:bg-neutral-900"
                    >
                      <motion.div className="space-y-4 sm:space-y-5">
                        {(['expense', 'method', 'amount'] as const).map(
                          (field) => (
                            <div
                              key={field}
                              className="flex flex-col gap-1 sm:grid sm:grid-cols-[120px_1fr] sm:items-center sm:gap-0"
                            >
                              <motion.label
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-neutral-400 uppercase sm:text-sm sm:capitalize dark:text-neutral-500"
                              >
                                {getIcon(field)} {field}
                              </motion.label>
                              <motion.div
                                layout="position"
                                transition={layoutTransition}
                                className="flex w-full items-center rounded-xl border-[1.6px] border-neutral-200 bg-neutral-50 px-4 py-2.5 focus-within:border-blue-500 sm:py-2 dark:border-neutral-700 dark:bg-neutral-800 dark:focus-within:border-neutral-400"
                              >
                                <motion.input
                                  layoutId={`${field}-${item.id}`}
                                  layout="position"
                                  title="edit text"
                                  type="text"
                                  value={editValues ? editValues[field] : ''}
                                  transition={layoutTransition}
                                  onChange={(e) =>
                                    setEditValues((prev) =>
                                      prev
                                        ? { ...prev, [field]: e.target.value }
                                        : null,
                                    )
                                  }
                                  className="relative z-999 w-full bg-transparent text-base font-bold text-neutral-900 outline-none sm:text-sm dark:text-white"
                                />
                              </motion.div>
                            </div>
                          ),
                        )}
                      </motion.div>

                      <div className="mt-6 flex flex-row justify-end gap-2 sm:mt-4">
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditValues(null);
                          }}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-neutral-100 px-5 py-3 text-sm font-bold text-neutral-600 sm:flex-none sm:py-2 dark:bg-neutral-800 dark:text-neutral-400"
                        >
                          <X size={18} /> <span>Cancel</span>
                        </button>
                        <button
                          onClick={handleDone}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-bold text-white sm:flex-none sm:py-2 dark:bg-white dark:text-black"
                        >
                          <Check size={18} /> <span>Done</span>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      layout="position"
                      layoutId={`container-${item.id}`}
                      transition={layoutTransition}
                      animate={{
                        opacity: editingId ? 0.35 : 1,
                        filter: editingId ? 'blur(1px)' : 'blur(0px)',
                      }}
                      className={`group grid cursor-default grid-cols-[1fr_auto_40px] items-center rounded-2xl px-4 py-4 transition-all duration-300 sm:grid-cols-[1.2fr_1fr_0.8fr_40px] sm:rounded-none sm:px-6 sm:py-5 ${
                        editingId
                          ? ''
                          : 'border border-neutral-100 bg-neutral-50/50 opacity-100 hover:bg-neutral-50 sm:border-none sm:bg-transparent dark:border-white/[0.03] dark:bg-zinc-900/40 dark:hover:bg-zinc-800/60'
                      }`}
                    >
                      <motion.div className="flex flex-col">
                        <motion.div
                          layoutId={`expense-${item.id}`}
                          layout="position"
                          className="flex text-sm font-bold text-neutral-900 sm:text-base"
                        >
                          <motion.span
                            layout="position"
                            transition={layoutTransition}
                            className="dark:text-zinc-100"
                          >
                            {item.expense}
                          </motion.span>
                        </motion.div>
                        <motion.div
                          layoutId={`method-mobile-${item.id}`}
                          layout="position"
                          className="flex text-xs font-medium text-neutral-500 sm:hidden"
                        >
                          <motion.span
                            layout="position"
                            transition={layoutTransition}
                            className="dark:text-zinc-500"
                          >
                            {item.method}
                          </motion.span>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        layoutId={`method-${item.id}`}
                        layout="position"
                        className="hidden text-sm font-semibold text-neutral-500 sm:flex"
                      >
                        <motion.span
                          layout="position"
                          transition={layoutTransition}
                          className="dark:text-zinc-500"
                        >
                          {item.method}
                        </motion.span>
                      </motion.div>

                      <motion.div
                        layoutId={`amount-${item.id}`}
                        layout="position"
                        className="flex justify-end text-sm font-bold text-neutral-700 sm:justify-start sm:text-base"
                      >
                        <motion.span
                          layout="position"
                          transition={layoutTransition}
                          className="flex items-center dark:text-zinc-300"
                        >
                          <span className="mr-0.5 text-neutral-400 dark:text-zinc-600">
                            $
                          </span>
                          {item.amount}
                        </motion.span>
                      </motion.div>

                      <button
                        title="edit"
                        onClick={() => {
                          setEditValues({ ...item });
                          setEditingId(item.id);
                        }}
                        className="flex justify-end text-neutral-400 transition-transform hover:text-black active:scale-125 dark:hover:text-white"
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
