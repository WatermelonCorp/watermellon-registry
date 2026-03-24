"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Pencil, X, Check } from "lucide-react";
import { GoStack } from "react-icons/go";
import { BsArrowUpRightSquare } from "react-icons/bs";
import { FaRegCreditCard } from "react-icons/fa6";

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
  const iconClass = "text-muted-foreground";
  if (field === "expense")
    return <FaRegCreditCard size={18} className={iconClass} />;
  if (field === "method") return <GoStack size={18} className={iconClass} />;
  if (field === "amount")
    return <BsArrowUpRightSquare size={18} className={iconClass} />;
  return null;
};

export const InlineTableControl: React.FC<InlineTableControlProps> = ({
  data,
  onUpdate,
  className = "",
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
        item.id === editValues.id ? editValues : item
      );
      setItems(updatedItems);
      onUpdate?.(editValues);
      setEditingId(null);
      setEditValues(null);
    }
  };

  const layoutTransition = {
    type: "spring" as const,
    bounce: 0,
    duration: 0.7,
  };

  return (
    <div
      className={`theme-injected flex w-full flex-col items-center justify-center p-4 antialiased select-none sm:p-10 ${className}`}
    >
      <div className="w-full max-w-lg">
        <motion.div
          layout
          transition={layoutTransition}
          className={`hidden grid-cols-[1.2fr_1fr_0.8fr_40px] px-6 py-4 text-sm font-semibold tracking-wider capitalize transition-all duration-300 sm:grid ${editingId ? "opacity-20 blur-[1px]" : "opacity-100"} text-muted-foreground`}
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
                    className="bg-border mx-6 hidden h-px sm:block"
                  />
                )}

                <AnimatePresence mode="popLayout">
                  {editingId === item.id ? (
                    <motion.div
                      layoutId={`container-${item.id}`}
                      transition={layoutTransition}
                      className="border-border bg-card relative z-20 my-2 rounded-lg border p-4 shadow-xl sm:my-4 sm:rounded-none sm:p-8 sm:py-4 sm:shadow-none"
                    >
                      <motion.div className="space-y-4 sm:space-y-5">
                        {(["expense", "method", "amount"] as const).map(
                          (field) => (
                            <div
                              key={field}
                              className="flex flex-col gap-1 sm:grid sm:grid-cols-[120px_1fr] sm:items-center sm:gap-0"
                            >
                              <motion.label
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="text-muted-foreground flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase sm:text-sm sm:capitalize"
                              >
                                {getIcon(field)} {field}
                              </motion.label>
                              <motion.div
                                layout="position"
                                transition={layoutTransition}
                                className="border-border bg-muted focus-within:border-ring flex w-full items-center rounded-lg border px-4 py-2.5 sm:py-2"
                              >
                                <motion.input
                                  layoutId={`${field}-${item.id}`}
                                  layout="position"
                                  title="edit text"
                                  type="text"
                                  value={editValues ? editValues[field] : ""}
                                  transition={layoutTransition}
                                  onChange={(e) =>
                                    setEditValues((prev) =>
                                      prev
                                        ? { ...prev, [field]: e.target.value }
                                        : null
                                    )
                                  }
                                  className="text-foreground relative z-999 w-full bg-transparent text-base font-bold outline-none sm:text-sm"
                                />
                              </motion.div>
                            </div>
                          )
                        )}
                      </motion.div>

                      <div className="mt-6 flex flex-row justify-end gap-2 sm:mt-4">
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditValues(null);
                          }}
                          className="bg-muted text-muted-foreground flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold sm:flex-none sm:py-2"
                        >
                          <X size={18} /> <span>Cancel</span>
                        </button>
                        <button
                          onClick={handleDone}
                          className="bg-primary text-primary-foreground flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold sm:flex-none sm:py-2"
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
                        filter: editingId ? "blur(1px)" : "blur(0px)",
                      }}
                      className={`group grid cursor-default grid-cols-[1fr_auto_40px] items-center rounded-lg px-4 py-4 transition-all duration-300 sm:grid-cols-[1.2fr_1fr_0.8fr_40px] sm:rounded-none sm:px-6 sm:py-5 ${
                        editingId
                          ? ""
                          : "border-border bg-muted/50 hover:bg-muted border opacity-100 sm:border-none sm:bg-transparent"
                      }`}
                    >
                      <motion.div className="flex flex-col">
                        <motion.div
                          layoutId={`expense-${item.id}`}
                          layout="position"
                          className="text-foreground flex text-sm font-bold sm:text-base"
                        >
                          <motion.span
                            layout="position"
                            transition={layoutTransition}
                          >
                            {item.expense}
                          </motion.span>
                        </motion.div>
                        <motion.div
                          layoutId={`method-mobile-${item.id}`}
                          layout="position"
                          className="text-muted-foreground flex text-xs font-medium sm:hidden"
                        >
                          <motion.span
                            layout="position"
                            transition={layoutTransition}
                          >
                            {item.method}
                          </motion.span>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        layoutId={`method-${item.id}`}
                        layout="position"
                        className="text-muted-foreground hidden text-sm font-semibold sm:flex"
                      >
                        <motion.span
                          layout="position"
                          transition={layoutTransition}
                        >
                          {item.method}
                        </motion.span>
                      </motion.div>

                      <motion.div
                        layoutId={`amount-${item.id}`}
                        layout="position"
                        className="text-foreground flex justify-end text-sm font-bold sm:justify-start sm:text-base"
                      >
                        <motion.span
                          layout="position"
                          transition={layoutTransition}
                          className="flex items-center"
                        >
                          <span className="text-muted-foreground mr-0.5">
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
                        className="text-muted-foreground hover:text-foreground flex justify-end transition-transform active:scale-125"
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
