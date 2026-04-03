'use client';

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
  onProceed?: (data: unknown) => void;
}

/* ---------------- Brand Icons ---------------- */

const VisaIcon = () => (
  <span className="text-foreground text-sm font-semibold italic">VISA</span>
);

const MasterCardIcon = () => (
  <div className="flex -space-x-2">
    <div className="bg-destructive h-4 w-4 rounded-lg" />
    <div className="bg-primary h-4 w-4 rounded-lg" />
  </div>
);

/* ---------------- Shared UI ---------------- */

const cardContainer =
  'rounded-2xl border transition-colors bg-muted border-border';

const primaryButton =
  'h-11 w-full rounded-2xl font-medium bg-primary text-primary-foreground';

const Header = ({
  title,
  icon: Icon,
  onClose,
  id,
}: {
  title: string;
  icon: React.ElementType;
  onClose: () => void;
  id: string;
}) => (
  <div className="mb-6 flex items-center justify-between gap-3">
    <div className="flex min-w-0 items-center gap-3">
      <motion.div
        layoutId={`icon-${id}`}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.7 }}
        className="border-border bg-muted text-muted-foreground flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border"
      >
        <Icon size={22} strokeWidth={1.4} />
      </motion.div>
      <motion.h2
        layoutId={`title-${id}`}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.7 }}
        className="truncate text-base font-medium"
      >
        {title}
      </motion.h2>
    </div>

    <button
      onClick={onClose}
      className="bg-muted text-muted-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
    >
      <X size={20} strokeWidth={3} />
    </button>
  </div>
);

const InputField = ({ label, value, onChange }: { label: string; value: string; onChange: (val: string) => void }) => (
  <div className="mb-4">
    <label className="text-muted-foreground mb-1 block text-sm">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border-border bg-background focus:border-primary text-foreground h-12 w-full rounded-lg border px-4 transition focus:outline-none"
    />
  </div>
);

/* ---------------- Views ---------------- */

const BankTransferView = ({ onClose, onProceed }: { onClose: () => void; onProceed: (data: unknown) => void }) => {
  const [formData, setFormData] = useState({ name: '', account: '', code: '' });

  return (
    <motion.div layout>
      <Header
        title="Bank Transfer"
        icon={Building2}
        onClose={onClose}
        id="bank"
      />
      <motion.div
        initial={{ opacity: 0, filter: 'blur(4px)', y: 20 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        exit={{ opacity: 0, filter: 'blur(4px)', y: -20 }}
        transition={{ type: 'spring', bounce: 0.4, duration: 0.7 }}
      >
        <InputField
          label="Full Name"
          value={formData.name}
          onChange={(v: string) => setFormData({ ...formData, name: v })}
        />
        <InputField
          label="Account Number"
          value={formData.account}
          onChange={(v: string) => setFormData({ ...formData, account: v })}
        />
        <InputField
          label="Bank Code"
          value={formData.code}
          onChange={(v: string) => setFormData({ ...formData, code: v })}
        />
        <button
          onClick={() => onProceed({ type: 'bank', ...formData })}
          className={`mt-5 ${primaryButton}`}
        >
          Proceed
        </button>
      </motion.div>
    </motion.div>
  );
};

const CardView = ({ cards, onClose, onProceed }: { cards: Card[]; onClose: () => void; onProceed: (data: unknown) => void }) => {
  const [selected, setSelected] = useState(cards[0]?.id);

  return (
    <motion.div>
      <Header
        title="Debit/Credit Card"
        icon={CreditCard}
        onClose={onClose}
        id="card"
      />

      <motion.div
        initial={{ opacity: 0, filter: 'blur(4px)', y: 20 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        exit={{ opacity: 0, filter: 'blur(4px)', y: -20 }}
        transition={{ type: 'spring', bounce: 0.4, duration: 0.7 }}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <span className="text-muted-foreground text-sm">Available Cards</span>
          <button className="border-border text-muted-foreground flex items-center gap-2 rounded-lg border px-3 py-1 text-sm">
            <MdOutlineAddCard size={18} />
            Add Card
          </button>
        </div>

        <div className="mb-6 space-y-3">
          {cards.map((card: Card) => (
            <label
              key={card.id}
              onClick={() => setSelected(card.id)}
              className={`flex h-14 cursor-pointer items-center justify-between rounded-lg border px-4 transition ${
                selected === card.id
                  ? 'border-primary bg-accent'
                  : cardContainer
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-lg border-2 ${
                    selected === card.id
                      ? 'border-primary'
                      : 'border-muted-foreground'
                  }`}
                >
                  {selected === card.id && (
                    <div className="bg-primary h-2.5 w-2.5 rounded-lg" />
                  )}
                </div>

                <span className="text-foreground font-medium">
                  •••• {card.last4}
                </span>
              </div>

              {card.brand === 'visa' ? <VisaIcon /> : <MasterCardIcon />}
            </label>
          ))}
        </div>

        <button
          onClick={() => onProceed({ type: 'card', cardId: selected })}
          className={primaryButton}
        >
          Proceed
        </button>
      </motion.div>
    </motion.div>
  );
};

const WalletView = ({ onClose, onProceed }: { onClose: () => void; onProceed: (data: unknown) => void }) => {
  const [amount, setAmount] = useState('');

  return (
    <motion.div>
      <Header title="Wallet" icon={Wallet} onClose={onClose} id="wallet" />

      <motion.div
        initial={{ opacity: 0, filter: 'blur(4px)', y: 20 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        exit={{ opacity: 0, filter: 'blur(4px)', y: -20 }}
        transition={{ type: 'spring', bounce: 0.4, duration: 0.7 }}
      >
        <div className="border-border bg-muted mb-5 rounded-2xl border p-4">
          <p className="text-muted-foreground mb-1 text-sm">Total Balance</p>
          <h3 className="text-foreground text-2xl font-semibold">$12,450.00</h3>
        </div>

        <InputField
          label="Amount to Send"
          value={amount}
          onChange={setAmount}
        />

        <button
          onClick={() => onProceed({ type: 'wallet', amount })}
          className={primaryButton}
        >
          Proceed
        </button>
      </motion.div>
    </motion.div>
  );
};

/* ---------------- Main ---------------- */

export const SendMoney: React.FC<SendMoneyProps> = ({
  cards = [
    { id: '1', last4: '6756', brand: 'visa' },
    { id: '2', last4: '4632', brand: 'mastercard' },
  ],
  onProceed = () => {},
}) => {
  const [view, setView] = useState<PaymentType>(null);

  return (
    <div className="theme-injected flex min-h-[60vh] w-full items-center justify-center bg-transparent p-4">
      <motion.div
        layout
        className="border-border bg-background w-full max-w-[400px] rounded-lg border p-5 shadow-lg transition-all sm:p-6"
      >
        <AnimatePresence mode="wait">
          {!view ? (
            <motion.div>
              <motion.h1
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ type: 'spring', bounce: 0.3, duration: 0.7 }}
                className="text-muted-foreground mb-6 text-base"
              >
                Send Money
              </motion.h1>

              <div className="space-y-2">
                {[
                  {
                    id: 'bank',
                    title: 'Bank Transfer',
                    sub: 'Transfer to bank account',
                    icon: Building2,
                  },
                  {
                    id: 'card',
                    title: 'Debit/Credit Card',
                    sub: 'Send money from your card',
                    icon: CreditCard,
                  },
                  {
                    id: 'wallet',
                    title: 'Wallet',
                    sub: 'Transfer from your wallet',
                    icon: Wallet,
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setView(opt.id as PaymentType)}
                    className="hover:bg-accent/5 flex w-full items-center gap-3 rounded-lg p-3 transition sm:gap-4 sm:p-4"
                  >
                    <motion.div
                      layoutId={`icon-${opt.id}`}
                      className="border-border bg-muted text-muted-foreground flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border sm:h-12 sm:w-12"
                    >
                      <opt.icon size={22} className="sm:size-6" />
                    </motion.div>
                    <div className="text-left">
                      <motion.p
                        layoutId={`title-${opt.id}`}
                        className="text-foreground font-medium"
                      >
                        {opt.title}
                      </motion.p>
                      <p className="text-muted-foreground text-sm">{opt.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              {view === 'bank' && (
                <BankTransferView
                  onClose={() => setView(null)}
                  onProceed={onProceed}
                />
              )}
              {view === 'card' && (
                <CardView
                  cards={cards}
                  onClose={() => setView(null)}
                  onProceed={onProceed}
                />
              )}
              {view === 'wallet' && (
                <WalletView
                  onClose={() => setView(null)}
                  onProceed={onProceed}
                />
              )}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
