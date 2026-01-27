import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  X,
  ArrowRight,
  Fingerprint,
  Github,
  Chrome,
  Wallet,
  Check
} from 'lucide-react';
import { BsWallet2 } from 'react-icons/bs';
import { FaApple, FaDiscord } from 'react-icons/fa6';


const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MetamaskLogo = () => (
  <svg width="24" height="24" viewBox="0 0 32 32">
    <path d="M28.4,5.4l-11-4c-0.9-0.3-1.8-0.3-2.7,0l-11,4c-1,0.4-1.7,1.3-1.7,2.4v9c0,1,0.6,2,1.5,2.5l11,6.4c0.4,0.2,0.9,0.3,1.3,0.3s0.9-0.1,1.3-0.3l11-6.4c0.9-0.5,1.5-1.5,1.5-2.5v-9C30.1,6.7,29.4,5.7,28.4,5.4z" fill="#E2761B" />
    <path d="M16.1,28.4L16,28.4l-11.1-6.4c-0.2-0.1-0.3-0.3-0.3-0.5V13l11.4,15.4V28.4z" fill="#E4761B" />
    <path d="M27.4,21.5L16.3,28l-0.3,0.1V13l11.7,8.5V21.5z" fill="#8D4D32" />
  </svg>
);

const CoinbaseLogo = () => (
  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
  </div>
);

const PhantomLogo = () => (
  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
    <div className="w-3 h-3 bg-white rounded-bl-full rounded-tr-full transform rotate-45"></div>
  </div>
);

const TrustLogo = () => (
  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <path d="M12 2L4 5v6c0 5.5 3.5 10.5 8 12 4.5-1.5 8-6.5 8-12V5l-8-3z" />
    </svg>
  </div>
);

enum View {
  SIGN_IN = 'SIGN_IN',
  CONFIRM_EMAIL = 'CONFIRM_EMAIL',
  PASSKEY = 'PASSKEY',
  CONNECT_WALLET = 'CONNECT_WALLET',
}

enum AuthType {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  PASSKEY = 'PASSKEY',
}

export const FamilyWallet: React.FC = () => {
  const [view, setView] = useState<View>(View.SIGN_IN);
  const [authType, setAuthType] = useState<AuthType>(AuthType.EMAIL);
  const [email, setEmail] = useState('yo@gxuri.in');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [hasWallet, setHasWallet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (view === View.CONFIRM_EMAIL) {
      otpRefs.current[0]?.focus();
    }
  }, [view]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handlePasskeyContinue = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView(View.SIGN_IN);
    }, 2000);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
    setView(View.SIGN_IN);
  };

  const renderSignIn = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col gap-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Sign In</h2>
        <button onClick={closePanel} title='close' aria-label="Close" className="p-2 rounded-full bg-zinc-800 transition-colors">
          <X className="w-5 h-5 text-zinc-400" />
        </button>
      </div>

      <div className="flex justify-between items-center px-3">
        {([Chrome, FaDiscord, Github, FaApple, XIcon] as React.ElementType[]).map((Icon, i) => (
          <button title='logos'
            key={i}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#161616] hover:border-zinc-700 hover:bg-zinc-800 transition-all text-white"
          >
            <Icon className="w-6 h-6" />
          </button>
        ))}
      </div>

      <div className="flex bg-[#161616] p-1 rounded-xl">
        {Object.values(AuthType).map((type) => (
          <button
            key={type}
            onClick={() => setAuthType(type)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${authType === type
              ? 'bg-[#212121] text-white shadow-sm'
              : 'text-zinc-500 hover:text-zinc-300'
              }`}
          >
            {type.charAt(0) + type.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {authType === AuthType.EMAIL && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@address.com"
                className="w-full bg-[#161616]  rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button title='forward'
                onClick={() => setView(View.CONFIRM_EMAIL)}
                className="absolute right-2 top-1.5 w-10 h-10 flex items-center justify-center rounded-lg bg-[#4EAFFF] hover:bg-[#4eafffe3] transition-colors text-white"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {authType === AuthType.PHONE && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative"
            >
              <input
                type="tel"
                placeholder="+1 234 567 8900"
                className="w-full bg-[#161616] rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-[#4EAFFF] transition-colors"
              />
              <button title='forward'
                className="absolute right-2 top-1.5 w-10 h-10 flex items-center justify-center rounded-lg bg-[#4EAFFF] hover:bg-[#4eafffe3] text-white"
                disabled
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {authType === AuthType.PASSKEY && (
            <motion.div
              key="passkey"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={() => setView(View.PASSKEY)}
              className="flex items-center justify-between w-full bg-[#161616] rounded-xl py-3 px-4 text-white hover:border-zinc-700 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <Fingerprint className="w-5 h-5 text-zinc-400" />
                <span className="text-zinc-300">Login with passkey</span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#4EAFFF] hover:bg-[#4eafffde] transition-colors text-white">
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-zinc-800"></div>
        <span className="text-[10px] font-bold text-zinc-600 tracking-widest uppercase">OR</span>
        <div className="flex-1 h-px bg-zinc-800"></div>
      </div>

      <button
        onClick={() => setView(View.CONNECT_WALLET)}
        className="w-full text-white border border-[#4EAFFF]/90  py-3.5 rounded-full flex items-center justify-center gap-3 bg-[#4EAFFF] hover:bg-[#4eafffec] font-medium transition-all"
      >
        <BsWallet2 className="w-5 h-5" />
        Connect Wallet
      </button>
    </motion.div>
  );

  const renderConfirmEmail = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col gap-6"
    >
      <div className="flex justify-between items-center">
        <button title='back'
          onClick={() => setView(View.SIGN_IN)}
          className="p-2 rounded-full bg-zinc-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-zinc-400" />
        </button>
        <h2 className="text-xl font-semibold text-white">Confirm Email</h2>
        <button onClick={closePanel} title='close' className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
          <X className="w-5 h-5 text-zinc-400" />
        </button>
      </div>

      <div className="text-center flex flex-col gap-1">
        <p className="text-zinc-500 text-sm">Enter the verification code sent to</p>
        <p className="text-white font-medium">{email}</p>
      </div>

      <div className="flex justify-between gap-2">
        {otp.map((digit, i) => (
          <input title='enter value'
            key={i}
            ref={(el) => { otpRefs.current[i] = el; }}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-12 h-14 bg-[#161616] border border-[#212121] rounded-xl text-center text-xl font-bold text-white focus:outline-none focus:border-green-500 transition-all"
          />
        ))}
      </div>

      <button
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setView(View.SIGN_IN);
          }, 1500);
        }}
        className="w-full bg-green-500 hover:bg-green-600 py-3.5 rounded-2xl text-white font-bold text-lg transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]"
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
          />
        ) : 'Verify Code'}
      </button>
    </motion.div>
  );

  const renderPasskey = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col gap-8 items-center py-4"
    >
      <div className="w-full flex justify-between items-center mb-2">
        <button onClick={() => setView(View.SIGN_IN)} className="p-2 rounded-full bg-zinc-800">
          <ChevronLeft className="w-5 h-5 text-zinc-400" />
        </button>
        <h2 className="text-xl font-semibold text-white">Passkey</h2>
        <button onClick={closePanel} title='close' className="p-2 rounded-full hover:bg-zinc-800">
          <X className="w-5 h-5 text-zinc-400" />
        </button>
      </div>

      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <rect
              x="2" y="2" width="96" height="96" rx="28"
              fill="none"
              stroke="#18181b"
              strokeWidth="1"
            />
            <motion.rect
              x="2" y="2" width="96" height="96" rx="28"
              fill="none"
              stroke="url(#passkey-gradient)"
              strokeWidth="2"
              strokeDasharray="60 300"
              animate={{ strokeDashoffset: [0, -360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <defs>
              <linearGradient id="passkey-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <motion.div
          className="relative w-24 h-24 rounded-[26px] bg-[#161616] flex items-center justify-center shadow-inner"
        >
          <Fingerprint className="w-12 h-12 text-[#777777] " />
        </motion.div>
        <div className="absolute -inset-8 rounded-full bg-[#161616] blur-3xl -z-10 animate-pulse"></div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-white tracking-tight">Waiting for passkey</h3>
        <p className="text-zinc-500 text-sm max-w-[210px] mx-auto leading-relaxed">
          Please follow prompts to verify your identity.
        </p>
      </div>

      <button
        onClick={handlePasskeyContinue}
        className="w-full bg-[#4290d0] hover:bg-[#4290d0e4] py-3.5 rounded-2xl text-white font-bold text-lg transition-all"
      >
        {loading ? 'Verifying...' : 'Continue'}
      </button>
    </motion.div>
  );

  const renderWalletList = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col gap-6"
    >
      <div className="flex justify-between items-center">
        <button onClick={() => setView(View.SIGN_IN)} className="p-2 rounded-full bg-zinc-800">
          <ChevronLeft className="w-5 h-5 text-zinc-400" />
        </button>
        <h2 className="text-xl font-semibold text-white">Connect Wallet</h2>
        <button onClick={closePanel} title='close' className="p-2 rounded-full hover:bg-zinc-800">
          <X className="w-5 h-5 text-zinc-400" />
        </button>
      </div>

      <div className="space-y-1 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
        {[
          { name: 'Metamask', logo: MetamaskLogo },
          { name: 'Coinbase', logo: CoinbaseLogo },
          { name: 'Phantom', logo: PhantomLogo },
          { name: 'Trust Wallet', logo: TrustLogo },
          { name: 'Other Wallets', logo: () => <div className="w-8 h-8 rounded-full p-0.5 bg-zinc-800 flex items-center justify-center"><Wallet className="w-5 h-5 text-zinc-400" /></div>, badge: '350+' },
        ].map((wallet, i) => (
          <button
            key={i}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-transparent hover:bg-zinc-900 transition-colors group"
          >
            <span className="text-zinc-300 font-medium group-hover:text-white transition-colors flex items-center gap-2">
              {wallet.name}
              {wallet.badge && <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 font-bold">{wallet.badge}</span>}
            </span>
            <wallet.logo />
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 mt-2">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={hasWallet}
            onChange={(e) => setHasWallet(e.target.checked)}
            className="hidden"
          />
          <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${hasWallet ? 'bg-zinc-200 border-zinc-200' : 'bg-transparent border-zinc-700'
            }`}>
            {hasWallet && <Check className="w-3.5 h-3.5 text-black stroke-[3px]" />}
          </div>
          <span className="text-zinc-500 text-sm font-medium">I Don't Have a Wallet</span>
        </label>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#121212]">

      <AnimatePresence mode="popLayout">
        {!isPanelOpen && (
          <motion.button
            key="signin-button"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={() => setIsPanelOpen(true)}
            className="px-10 py-4 bg-white border-[#121212] border text-black font-bold rounded-full hover:bg-zinc-200 active:scale-95 transition-all shadow-xl "
          >
            Sign In
          </motion.button>
        )}

        {isPanelOpen && (
          <motion.div
            key="auth-panel"
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-[400px] bg-[#111111] border border-[#201f1f] rounded-[32px] overflow-hidden p-6 shadow-xl relative z-50"
          >
            <AnimatePresence mode="wait">
              {view === View.SIGN_IN && <div key="signin">{renderSignIn()}</div>}
              {view === View.CONFIRM_EMAIL && <div key="otp">{renderConfirmEmail()}</div>}
              {view === View.PASSKEY && <div key="passkey">{renderPasskey()}</div>}
              {view === View.CONNECT_WALLET && <div key="wallets">{renderWalletList()}</div>}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};