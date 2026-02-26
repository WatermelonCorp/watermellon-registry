"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, CreditCard, Wallet, X } from 'lucide-react';
import { MdOutlineAddCard } from 'react-icons/md';

export type PaymentType = 'bank' | 'card' | 'wallet' | null;

export interface Card {
  id: string;
  last4: string;
  brand: 'visa' | 'mastercard' | 'other';
}

interface SendMoneyProps {
  cards?: Card[];
  onProceed?: (data: any) => void;
}

/* ---------------- Brand Icons ---------------- */

const VisaIcon = () => (
  <span className="text-neutral-900 dark:text-white font-semibold italic text-sm">
    VISA
  </span>
);

const MasterCardIcon = () => (
  <div className="flex -space-x-2">
    <div className="w-4 h-4 rounded-full bg-red-600" />
    <div className="w-4 h-4 rounded-full bg-amber-400" />
  </div>
);

/* ---------------- Shared UI ---------------- */

const cardContainer =
  "rounded-2xl border transition-colors bg-neutral-100 border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700";

const primaryButton =
  "h-11 w-28 rounded-2xl font-medium bg-neutral-900 text-white dark:bg-white dark:text-black";

const Header = ({
  title,
  icon: Icon,
  onClose,
}: {
  title: string;
  icon: any;
  onClose: () => void;
}) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-neutral-100 border border-neutral-200 text-neutral-400 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
        <Icon size={22} strokeWidth={1.4} />
      </div>
      <h2 className="text-base font-medium text-neutral-600 dark:text-neutral-200">
        {title}
      </h2>
    </div>

    <button
      onClick={onClose}
      className="w-9 h-9 rounded-full flex items-center justify-center bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
    >
      <X size={20} strokeWidth={3} />
    </button>
  </div>
);

const InputField = ({ label, value, onChange }: any) => (
  <div className="mb-4">
    <label className="block text-sm mb-1 text-neutral-500 dark:text-neutral-400">
      {label}
    </label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-12 px-4 rounded-xl border transition focus:outline-none
                 bg-white border-neutral-300 focus:border-neutral-900
                 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:focus:border-neutral-500"
    />
  </div>
);

/* ---------------- Views ---------------- */

const BankTransferView = ({ onClose, onProceed }: any) => {
  const [formData, setFormData] = useState({ name: '', account: '', code: '' });

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <Header title="Bank Transfer" icon={Building2} onClose={onClose} />
      <InputField label="Full Name" value={formData.name} onChange={(v: string) => setFormData({ ...formData, name: v })} />
      <InputField label="Account Number" value={formData.account} onChange={(v: string) => setFormData({ ...formData, account: v })} />
      <InputField label="Bank Code" value={formData.code} onChange={(v: string) => setFormData({ ...formData, code: v })} />
      <button onClick={() => onProceed({ type: 'bank', ...formData })} className={`mt-5 ${primaryButton}`}>
        Proceed
      </button>
    </motion.div>
  );
};

const CardView = ({ cards, onClose, onProceed }: any) => {
  const [selected, setSelected] = useState(cards[0]?.id);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <Header title="Debit/Credit Card" icon={CreditCard} onClose={onClose} />

      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          Available Cards
        </span>
        <button className="flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-300 text-sm text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
          <MdOutlineAddCard size={18} />
          Add Card
        </button>
      </div>

      <div className="space-y-3 mb-6">
        {cards.map((card: Card) => (
          <label
            key={card.id}
            onClick={() => setSelected(card.id)}
            className={`flex items-center justify-between h-14 px-4 rounded-xl cursor-pointer border transition
              ${selected === card.id
                ? "bg-neutral-200 border-neutral-300 dark:bg-neutral-800 dark:border-neutral-600"
                : cardContainer}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${selected === card.id
                  ? "border-neutral-900 dark:border-white"
                  : "border-neutral-400"}`}
              >
                {selected === card.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 dark:bg-white" />
                )}
              </div>

              <span className="font-medium text-neutral-900 dark:text-white">
                •••• {card.last4}
              </span>
            </div>

            {card.brand === 'visa' ? <VisaIcon /> : <MasterCardIcon />}
          </label>
        ))}
      </div>

      <button onClick={() => onProceed({ type: 'card', cardId: selected })} className={primaryButton}>
        Proceed
      </button>
    </motion.div>
  );
};

const WalletView = ({ onClose, onProceed }: any) => {
  const [amount, setAmount] = useState('');

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <Header title="Wallet" icon={Wallet} onClose={onClose} />

      <div className="border rounded-2xl p-4 mb-5 bg-neutral-100 border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
          Total Balance
        </p>
        <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">
          $12,450.00
        </h3>
      </div>

      <InputField label="Amount to Send" value={amount} onChange={setAmount} />

      <button onClick={() => onProceed({ type: 'wallet', amount })} className={primaryButton}>
        Proceed
      </button>
    </motion.div>
  );
};

/* ---------------- Main ---------------- */

export const SendMoney: React.FC<SendMoneyProps> = ({
  cards = [
    { id: '1', last4: '6756', brand: 'visa' },
    { id: '2', last4: '4632', brand: 'mastercard' }
  ],
  onProceed = () => { },
}) => {
  const [view, setView] = useState<PaymentType>(null);

  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center bg-transparent p-4">

      <motion.div
        layout
        className="w-full max-w-96 rounded-3xl border shadow-lg p-6
                   bg-white border-neutral-200
                   dark:bg-neutral-900 dark:border-neutral-800"
      >
        <AnimatePresence mode="wait">
          {!view ? (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="text-base mb-6 text-neutral-500 dark:text-neutral-400">
                Send Money
              </h1>

              <div className="space-y-2">
                {[
                  { id: 'bank', title: 'Bank Transfer', sub: 'Transfer to bank account', icon: Building2 },
                  { id: 'card', title: 'Debit/Credit Card', sub: 'Send money from your card', icon: CreditCard },
                  { id: 'wallet', title: 'Wallet', sub: 'Transfer from your wallet', icon: Wallet },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setView(opt.id as PaymentType)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <div className="w-12 h-12 rounded-xl border flex items-center justify-center
                                    bg-neutral-100 border-neutral-200 text-neutral-400
                                    dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                      <opt.icon size={24} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-neutral-900 dark:text-white">
                        {opt.title}
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {opt.sub}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              {view === 'bank' && <BankTransferView onClose={() => setView(null)} onProceed={onProceed} />}
              {view === 'card' && <CardView cards={cards} onClose={() => setView(null)} onProceed={onProceed} />}
              {view === 'wallet' && <WalletView onClose={() => setView(null)} onProceed={onProceed} />}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};