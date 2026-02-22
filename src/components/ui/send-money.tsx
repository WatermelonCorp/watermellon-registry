import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  CreditCard,
  Wallet,
  X,
} from 'lucide-react';
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

/* ---------------- Icons ---------------- */

const VisaIcon = () => (
  <span className="text-[#1A1F36] dark:text-white font-semibold italic text-sm">VISA</span>
);

const MasterCardIcon = () => (
  <div className="flex -space-x-2">
    <div className="w-4 h-4 rounded-full bg-[#EB001B]" />
    <div className="w-4 h-4 rounded-full bg-[#F79E1B]" />
  </div>
);

/* ---------------- UI Blocks ---------------- */

const Header = ({
  title,
  icon: Icon,
  onClose,
}: {
  title: string;
  icon: any;
  onClose: () => void;
}) => (
  <div className="flex items-center justify-between mb-5">
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#F6F5F2] border-2 border-[#ECEAE6] text-[#B6B2AA] dark:bg-[#2C2C2E] dark:border-transparent dark:text-[#A1A1AA]">
        <Icon size={22} strokeWidth={1.4} />
      </div>
      <h2 className="text-[17px] font-medium text-[#7C7A75] dark:text-[#E5E5E7]">
        {title}
      </h2>
    </div>

    <button title='close'
      onClick={onClose}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-colors bg-[#F2F1EE] text-[#8F8C85] dark:bg-[#2C2C2E] dark:text-[#A1A1AA]"
    >
      <X size={20} strokeWidth={3} />
    </button>
  </div>
);

const InputField = ({
  label,
  value,
  onChange,
}: any) => (
  <div className="mb-4">
    <label className="block text-base mb-1 ml-1 text-[#838383] dark:text-[#A1A1AA]">
      {label}
    </label>
    <input title={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full h-12
        px-4
        rounded-xl
        border-2
        transition
        focus:outline-none
        bg-white border-[#E1DFDD] focus:border-[#292929]
        dark:bg-[#1C1C1E] dark:border-[#2C2C2E] dark:text-white dark:focus:border-[#48484A]
      "
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
      <button
        onClick={() => onProceed({ type: 'bank', ...formData })}
        className="mt-5 h-11 w-26.25 rounded-2xl font-medium bg-[#1C1C1E] text-white dark:bg-[#E5E5E7] dark:text-black"
      >
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
        <span className="text-sm text-[#8E8E8E] dark:text-[#A1A1AA]">Available Cards</span>
        <button className="flex items-center border-[1.8px] text-sm p-1 px-3 gap-3 rounded-full border-[#E6E4DF] text-[#636363] dark:border-[#2C2C2E] dark:text-[#A1A1AA]">
          <MdOutlineAddCard size={20} /> Add Card
        </button>
      </div>
      <div className="space-y-3 mb-6">
        {cards.map((card: Card) => (
          <label key={card.id} onClick={() => setSelected(card.id)} 
            className={`flex items-center justify-between h-14 px-4 rounded-xl cursor-pointer border transition-colors ${
              selected === card.id 
                ? 'bg-[#F6F5F2] border-[#E6E4DF] dark:bg-[#2C2C2E] dark:border-[#48484A]' 
                : 'bg-[#F6F5F2] border-[#ECEAE6] dark:bg-transparent dark:border-[#2C2C2E]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selected === card.id ? 'border-[#1C1C1E] dark:border-white' : 'border-[#CFCBC2]'
                }`}
              >
                {selected === card.id && <div className="w-2.5 h-2.5 rounded-full bg-[#1C1C1E] dark:bg-white" />}
              </div>
              <span className="font-medium text-[#1C1C1E] dark:text-white">•••• {card.last4}</span>
            </div>
            {card.brand === 'visa' ? <VisaIcon /> : <MasterCardIcon />}
          </label>
        ))}
      </div>
      <button onClick={() => onProceed({ type: 'card', cardId: selected })} className="h-10.5 w-26.25 rounded-[14px] font-medium bg-[#282825] text-white dark:bg-[#E5E5E7] dark:text-black">
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
      <div className="border rounded-2xl p-4 mb-5 bg-[#F6F5F2] border-[#E6E4DF] dark:bg-[#2C2C2E] dark:border-[#48484A]">
        <p className="text-sm mb-1 text-[#8C8A84] dark:text-[#A1A1AA]">Total Balance</p>
        <h3 className="text-2xl font-semibold text-[#1C1C1E] dark:text-white">$12,450.00</h3>
      </div>
      <InputField label="Amount to Send" value={amount} onChange={setAmount} />
      <button onClick={() => onProceed({ type: 'wallet', amount })} className="h-10.5 w-26.25 rounded-[14px] font-medium bg-[#282825] text-white dark:bg-[#E5E5E7] dark:text-black">
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
  onProceed = () => {},
}) => {
  const [view, setView] = useState<PaymentType>(null);

  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center transition-colors duration-500 bg-transparent p-4">
      
      <motion.div
        layout
        className="
          w-full max-w-95
          rounded-[28px]
          border-2
          shadow-[0_20px_50px_rgba(0,0,0,0.08)]
          p-6
          transition-colors duration-300
          bg-white border-[#ECEAE6]
          dark:bg-[#1C1C1E] dark:border-[#2C2C2E]
        "
      >
        <AnimatePresence mode="wait">
          {!view ? (
            <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h1 className="text-lg mb-6 text-[#8C8A84] dark:text-[#A1A1AA]">
                Send Money
              </h1>

              <div className="space-y-2">
                {[
                  { id: 'bank', title: 'Bank Transfer', sub: 'Transfer money to bank account', icon: Building2 },
                  { id: 'card', title: 'Debit/Credit Card', sub: 'Send money from your card', icon: CreditCard },
                  { id: 'wallet', title: 'Wallet', sub: 'Transfer money from your wallet', icon: Wallet },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setView(opt.id as PaymentType)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl transition-colors hover:bg-[#F6F5F2] dark:hover:bg-[#2C2C2E]"
                  >
                    <div className="w-12 h-12 rounded-xl border flex items-center justify-center transition-colors bg-[#F6F5F2] border-[#ECEAE6] text-[#B6B2AA] dark:bg-[#2C2C2E] dark:border-transparent dark:text-[#A1A1AA]">
                      <opt.icon size={24} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium transition-colors text-[#1C1C1E] dark:text-white">{opt.title}</p>
                      <p className="text-sm transition-colors text-[#8C8A84] dark:text-[#A1A1AA]">{opt.sub}</p>
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