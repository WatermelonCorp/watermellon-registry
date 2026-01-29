import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  CreditCard,
  Wallet,
  X,
  Sun,
  Moon,
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

const VisaIcon = ({ isDark }: { isDark: boolean }) => (
  <span className={`${isDark ? 'text-white' : 'text-[#1A1F36]'} font-semibold italic text-sm`}>VISA</span>
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
  isDark
}: {
  title: string;
  icon: any;
  onClose: () => void;
  isDark: boolean;
}) => (
  <div className={`flex items-center justify-between mb-5`}>
    <div className="flex items-center gap-3">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isDark ? 'bg-[#2C2C2E] border-transparent text-[#A1A1AA]' : 'bg-[#F6F5F2] border-2 border-[#ECEAE6] text-[#B6B2AA]'}`}>
        <Icon size={22} strokeWidth={1.4} />
      </div>
      <h2 className={`text-[17px] font-medium ${isDark ? 'text-[#E5E5E7]' : 'text-[#7C7A75]'}`}>
        {title}
      </h2>
    </div>

    <button title='close'
      onClick={onClose}
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-[#2C2C2E] text-[#A1A1AA]' : 'bg-[#F2F1EE] text-[#8F8C85]'}`}
    >
      <X size={20} strokeWidth={3} />
    </button>
  </div>
);

const InputField = ({
  label,
  value,
  onChange,
  isDark
}: any) => (
  <div className="mb-4">
    <label className={`block text-base mb-1 ml-1 ${isDark ? 'text-[#A1A1AA]' : 'text-[#838383]'}`}>
      {label}
    </label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`
        w-full h-[48px]
        px-4
        rounded-xl
        border-[2px]
        transition
        focus:outline-none
        ${isDark 
          ? 'bg-[#1C1C1E] border-[#2C2C2E] text-white focus:border-[#48484A]' 
          : 'bg-white border-[#E1DFDD] focus:border-[#292929]'}
      `}
    />
  </div>
);

/* ---------------- Views ---------------- */

const BankTransferView = ({ onClose, onProceed, isDark }: any) => {
  const [formData, setFormData] = useState({ name: '', account: '', code: '' });

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <Header title="Bank Transfer" icon={Building2} onClose={onClose} isDark={isDark} />
      <InputField label="Full Name" value={formData.name} onChange={(v: string) => setFormData({ ...formData, name: v })} isDark={isDark} />
      <InputField label="Account Number" value={formData.account} onChange={(v: string) => setFormData({ ...formData, account: v })} isDark={isDark} />
      <InputField label="Bank Code" value={formData.code} onChange={(v: string) => setFormData({ ...formData, code: v })} isDark={isDark} />
      <button
        onClick={() => onProceed({ type: 'bank', ...formData })}
        className={`mt-5 h-[44px] w-[105px] rounded-[12px] font-medium ${isDark ? 'bg-[#E5E5E7] text-black' : 'bg-[#1C1C1E] text-white'}`}
      >
        Proceed
      </button>
    </motion.div>
  );
};

const CardView = ({ cards, onClose, onProceed, isDark }: any) => {
  const [selected, setSelected] = useState(cards[0]?.id);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <Header title="Debit/Credit Card" icon={CreditCard} onClose={onClose} isDark={isDark} />
      <div className="flex justify-between items-center mb-4">
        <span className={`text-sm ${isDark ? 'text-[#A1A1AA]' : 'text-[#8E8E8E]'}`}>Available Cards</span>
        <button className={`flex items-center border-[1.8px] text-sm p-1 px-3 gap-3 rounded-full ${isDark ? 'border-[#2C2C2E] text-[#A1A1AA]' : 'border-[#E6E4DF] text-[#636363]'}`}>
          <MdOutlineAddCard size={20} /> Add Card
        </button>
      </div>
      <div className="space-y-3 mb-6">
        {cards.map((card: Card) => (
          <label key={card.id} onClick={() => setSelected(card.id)} className={`flex items-center justify-between h-[56px] px-4 rounded-xl cursor-pointer border transition-colors ${
              selected === card.id 
                ? (isDark ? 'bg-[#2C2C2E] border-[#48484A]' : 'bg-[#F6F5F2] border-[#E6E4DF]') 
                : (isDark ? 'bg-transparent border-[#2C2C2E]' : 'bg-[#F6F5F2] border-[#ECEAE6]')
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selected === card.id ? (isDark ? 'border-white' : 'border-[#1C1C1E]') : 'border-[#CFCBC2]'
                }`}
              >
                {selected === card.id && <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-white' : 'bg-[#1C1C1E]'}`} />}
              </div>
              <span className={`font-medium ${isDark ? 'text-white' : 'text-[#1C1C1E]'}`}>•••• {card.last4}</span>
            </div>
            {card.brand === 'visa' ? <VisaIcon isDark={isDark} /> : <MasterCardIcon />}
          </label>
        ))}
      </div>
      <button onClick={() => onProceed({ type: 'card', cardId: selected })} className={`h-[42px] w-[105px] rounded-[14px] font-medium ${isDark ? 'bg-[#E5E5E7] text-black' : 'bg-[#282825] text-white'}`}>
        Proceed
      </button>
    </motion.div>
  );
};

const WalletView = ({ onClose, onProceed, isDark }: any) => {
  const [amount, setAmount] = useState('');
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <Header title="Wallet" icon={Wallet} onClose={onClose} isDark={isDark} />
      <div className={`border rounded-2xl p-4 mb-5 ${isDark ? 'bg-[#2C2C2E] border-[#48484A]' : 'bg-[#F6F5F2] border-[#E6E4DF]'}`}>
        <p className={`text-sm mb-1 ${isDark ? 'text-[#A1A1AA]' : 'text-[#8C8A84]'}`}>Total Balance</p>
        <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-[#1C1C1E]'}`}>$12,450.00</h3>
      </div>
      <InputField label="Amount to Send" value={amount} onChange={setAmount} isDark={isDark} />
      <button onClick={() => onProceed({ type: 'wallet', amount })} className={`h-[42px] w-[105px] rounded-[14px] font-medium ${isDark ? 'bg-[#E5E5E7] text-black' : 'bg-[#282825] text-white'}`}>
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
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${isDark ? 'bg-[#0A0A0B]' : 'bg-[#F9F9F9]'}`}>
      
      {/* Theme Toggle */}
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
        className={`
          w-[380px]
          rounded-[28px]
          border-2
          shadow-[0_20px_50px_rgba(0,0,0,0.08)]
          p-6
          transition-colors duration-300
          ${isDark ? 'bg-[#1C1C1E] border-[#2C2C2E]' : 'bg-white border-[#ECEAE6]'}
        `}
      >
        <AnimatePresence mode="wait">
          {!view ? (
            <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h1 className={`text-lg mb-6 ${isDark ? 'text-[#A1A1AA]' : 'text-[#8C8A84]'}`}>
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
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-colors ${isDark ? 'hover:bg-[#2C2C2E]' : 'hover:bg-[#F6F5F2]'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${isDark ? 'bg-[#2C2C2E] border-transparent text-[#A1A1AA]' : 'bg-[#F6F5F2] border-[#ECEAE6] text-[#B6B2AA]'}`}>
                      <opt.icon size={24} />
                    </div>
                    <div className="text-left">
                      <p className={`font-medium transition-colors ${isDark ? 'text-white' : 'text-[#1C1C1E]'}`}>{opt.title}</p>
                      <p className={`text-sm transition-colors ${isDark ? 'text-[#A1A1AA]' : 'text-[#8C8A84]'}`}>{opt.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              {view === 'bank' && <BankTransferView onClose={() => setView(null)} onProceed={onProceed} isDark={isDark} />}
              {view === 'card' && <CardView cards={cards} onClose={() => setView(null)} onProceed={onProceed} isDark={isDark} />}
              {view === 'wallet' && <WalletView onClose={() => setView(null)} onProceed={onProceed} isDark={isDark} />}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};