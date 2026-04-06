import {
  AnimatePresence,
  motion,
  MotionConfig,
  type Transition,
} from 'motion/react';

import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import useMeasure from 'react-use-measure';

export interface Transaction {
  id: string;
  icon: React.ReactNode;
  name: string;
  category: string;
  amount: string;
  date: string;
  time: string;
  transactionId: string;
  paymentMethod: string;
  cardNumber: string;
  cardType: string;
}

const springConfig: Transition = {
  type: 'spring',
  bounce: 0,
  duration: 0.6,
};

const opacityConfig: Transition = {
  duration: 0.4,
  ease: [0.19, 1, 0.22, 1],
};

export function TransactionList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const [open, setOpen] = useState<string | null>(null);
  const isOpen = open === null;
  const [ref, bounds] = useMeasure();

  const selected = transactions.find((t) => t.id === open) ?? null;

  return (
    <MotionConfig transition={springConfig}>
      <motion.div
        className="flex items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm dark:border-white/10 dark:bg-zinc-900"
        animate={{ height: bounds.height > 0 ? bounds.height : 'auto' }}
      >
        <div className="p-3" ref={ref}>
          <AnimatePresence mode="popLayout">
            {isOpen ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={opacityConfig}
                className="flex w-64 flex-col gap-2"
              >
                <span className="font-medium text-zinc-500 dark:text-zinc-100">
                  Transaction
                </span>

                {transactions.map((item) => (
                  <TransactionItem
                    key={item.id}
                    data={item}
                    onClick={() => setOpen(item.id)}
                  />
                ))}

                <button className="flex items-center justify-center gap-1 rounded-sm py-1 text-zinc-700 dark:text-zinc-200">
                  <p className="text-sm">All transactions</p>
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            ) : (
              selected && (
                <motion.div exit={{ opacity: 0 }}>
                  <TransactionItemExpanded
                    data={selected}
                    onClose={() => setOpen(null)}
                  />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </MotionConfig>
  );
}

function TransactionItem({
  data,
  onClick,
}: {
  data: Transaction;
  onClick: () => void;
}) {
  return (
    <div className="flex w-64 cursor-pointer gap-2" onClick={onClick}>
      <motion.div
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-800"
        layoutId={`icon-${data.id}`}
      >
        <div className="flex items-center justify-center">{data.icon}</div>
      </motion.div>

      <div className="flex flex-1 flex-col justify-center text-xs">
        <motion.p
          className="font-semibold text-zinc-700 dark:text-zinc-100"
          layoutId={`name-${data.id}`}
        >
          {data.name}
        </motion.p>

        <motion.p
          className="text-zinc-500 dark:text-zinc-400"
          layoutId={`category-${data.id}`}
        >
          {data.category}
        </motion.p>
      </div>

      <motion.p
        className="flex items-center text-xs text-zinc-500 dark:text-zinc-400"
        layoutId={`amount-${data.id}`}
      >
        {data.amount}
      </motion.p>
    </div>
  );
}

function TransactionItemExpanded({
  data,
  onClose,
}: {
  data: Transaction;
  onClose: () => void;
}) {
  return (
    <div className="flex w-64 flex-col gap-2">
      <div className="flex justify-between">
        <motion.div
          className="flex size-10 items-center justify-center rounded-md bg-zinc-800"
          layoutId={`icon-${data.id}`}
        >
          {data.icon}
        </motion.div>

        <div
          className="flex cursor-pointer items-center justify-center self-start rounded-full bg-zinc-300 p-2 dark:bg-zinc-700"
          onClick={onClose}
        >
          <X className="size-4" />
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <motion.p
            className="font-semibold text-zinc-700 dark:text-zinc-100"
            layoutId={`name-${data.id}`}
          >
            {data.name}
          </motion.p>

          <motion.p
            className="text-sm text-zinc-500 dark:text-zinc-400"
            layoutId={`category-${data.id}`}
          >
            {data.category}
          </motion.p>
        </div>

        <motion.p layoutId={`amount-${data.id}`}>{data.amount}</motion.p>
      </div>

      <motion.div
        className="flex flex-col gap-2 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          ...opacityConfig,
          delay: 0.1,
        }}
      >
        <div className="border border-dashed border-zinc-200 dark:border-white/20" />

        <p className="text-zinc-500 dark:text-zinc-400">
          #{data.transactionId}
        </p>

        <p className="text-zinc-500 dark:text-zinc-400">{data.date}</p>

        <p className="text-zinc-500 dark:text-zinc-400">{data.time}</p>

        <div className="border border-dashed border-zinc-200 dark:border-white/20" />

        <p className="text-zinc-500">Paid Via {data.paymentMethod}</p>

        <p className="text-zinc-500 dark:text-zinc-400">
          XXXX {data.cardNumber}{' '}
          <span className="font-bold text-black uppercase italic dark:text-zinc-100">
            {data.cardType}
          </span>
        </p>
      </motion.div>
    </div>
  );
}
