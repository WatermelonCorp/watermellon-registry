"use client";

import { useState, useEffect, type SVGProps } from "react";
import useMeasure from "react-use-measure";
import { motion, AnimatePresence } from "framer-motion";

import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerClose,
} from "@/components/ui/drawer";

import {
  ChevronLeft,
  X,
  ArrowRight,
  Fingerprint,
  Github,
  Chrome,
  Twitter,
} from "lucide-react";

import { BsWallet2 } from "react-icons/bs";
import { FaApple, FaDiscord } from "react-icons/fa6";

/* ---------------- ENUMS ---------------- */

enum View {
  SIGN_IN = "SIGN_IN",
  PASSKEY = "PASSKEY",
  CONNECT_WALLET = "CONNECT_WALLET",
}

const TABS = [
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "passkey", label: "Passkey" },
];

const MetaMask = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlSpace="preserve"
    id="metamask__Layer_1"
    x="0"
    y="0"
    version="1.1"
    viewBox="0 0 318.6 318.6"
  >
    <path
      fill="#e2761b"
      stroke="#e2761b"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m274.1 35.5-99.5 73.9L193 65.8z"
    />
    <path d="m44.4 35.5 98.7 74.6-17.5-44.3zm193.9 171.3-26.5 40.6 56.7 15.6 16.3-55.3zm-204.4.9L50.1 263l56.7-15.6-26.5-40.6z" />
    <path d="m103.6 138.2-15.8 23.9 56.3 2.5-2-60.5zm111.3 0-39-34.8-1.3 61.2 56.2-2.5zM106.8 247.4l33.8-16.5-29.2-22.8zm71.1-16.5 33.9 16.5-4.7-39.3z" />
    <path
      fill="#d7c1b3"
      stroke="#d7c1b3"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m211.8 247.4-33.9-16.5 2.7 22.1-.3 9.3zm-105 0 31.5 14.9-.2-9.3 2.5-22.1z"
    />
    <path
      fill="#233447"
      stroke="#233447"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m138.8 193.5-28.2-8.3 19.9-9.1zm40.9 0 8.3-17.4 20 9.1z"
    />
    <path
      fill="#cd6116"
      stroke="#cd6116"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m106.8 247.4 4.8-40.6-31.3.9zM207 206.8l4.8 40.6 26.5-39.7zm23.8-44.7-56.2 2.5 5.2 28.9 8.3-17.4 20 9.1zm-120.2 23.1 20-9.1 8.2 17.4 5.3-28.9-56.3-2.5z"
    />
    <path
      fill="#e4751f"
      stroke="#e4751f"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m87.8 162.1 23.6 46-.8-22.9zm120.3 23.1-1 22.9 23.7-46zm-64-20.6-5.3 28.9 6.6 34.1 1.5-44.9zm30.5 0-2.7 18 1.2 45 6.7-34.1z"
    />
    <path d="m179.8 193.5-6.7 34.1 4.8 3.3 29.2-22.8 1-22.9zm-69.2-8.3.8 22.9 29.2 22.8 4.8-3.3-6.6-34.1z" />
    <path
      fill="#c0ad9e"
      stroke="#c0ad9e"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m180.3 262.3.3-9.3-2.5-2.2h-37.7l-2.3 2.2.2 9.3-31.5-14.9 11 9 22.3 15.5h38.3l22.4-15.5 11-9z"
    />
    <path
      fill="#161616"
      stroke="#161616"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m177.9 230.9-4.8-3.3h-27.7l-4.8 3.3-2.5 22.1 2.3-2.2h37.7l2.5 2.2z"
    />
    <path
      fill="#763d16"
      stroke="#763d16"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m278.3 114.2 8.5-40.8-12.7-37.9-96.2 71.4 37 31.3 52.3 15.3 11.6-13.5-5-3.6 8-7.3-6.2-4.8 8-6.1zM31.8 73.4l8.5 40.8-5.4 4 8 6.1-6.1 4.8 8 7.3-5 3.6 11.5 13.5 52.3-15.3 37-31.3-96.2-71.4z"
    />
    <path d="m267.2 153.5-52.3-15.3 15.9 23.9-23.7 46 31.2-.4h46.5zm-163.6-15.3-52.3 15.3-17.4 54.2h46.4l31.1.4-23.6-46zm71 26.4 3.3-57.7 15.2-41.1h-67.5l15 41.1 3.5 57.7 1.2 18.2.1 44.8h27.7l.2-44.8z" />
  </svg>
);

const Coinbase = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none">
    <g clipPath="url(#coinbase__clip0_2_2)">
      <path
        d="M0 11.0769C0 4.95931 4.95931 0 11.0769 0H36.9231C43.0407 0 48 4.95931 48 11.0769V36.9231C48 43.0407 43.0407 48 36.9231 48H11.0769C4.95931 48 0 43.0407 0 36.9231V11.0769Z"
        fill="#0052FF"
      />
      <path
        d="M23.9573 32.5C22.3527 32.4676 20.7898 31.9838 19.4487 31.1044C18.1076 30.2249 17.0427 28.9855 16.3767 27.5289C15.7108 26.0724 15.4707 24.4578 15.6842 22.8711C15.8977 21.2843 16.5561 19.79 17.5835 18.5602C18.611 17.3303 19.9658 16.4149 21.4919 15.9193C23.018 15.4237 24.6534 15.3681 26.2098 15.7589C27.7663 16.1497 29.1804 16.9709 30.2894 18.1281C31.3985 19.2853 32.1574 20.7315 32.4787 22.3H41C40.5628 17.9606 38.4703 13.9546 35.1552 11.1109C31.8402 8.26711 27.5563 6.803 23.1895 7.02133C18.8226 7.23967 14.707 9.12377 11.6937 12.284C8.68042 15.4442 7 19.6386 7 24C7 28.3613 8.68042 32.5558 11.6937 35.716C14.707 38.8762 18.8226 40.7603 23.1895 40.9787C27.5563 41.197 31.8402 39.7329 35.1552 36.8891C38.4703 34.0454 40.5628 30.0394 41 25.7H32.4787C32.4787 29.1 27.3658 32.5 23.9573 32.5Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="coinbase__clip0_2_2">
        <rect width="48" height="48" rx="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const Polygon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 36 36">
    <g fill="none">
      <circle fill="#8247E5" cx="18" cy="18" r="18" />
      <path
        d="M24.172 13.954c-.438-.25-1.002-.25-1.504 0l-3.509 2.068-2.38 1.316-3.447 2.068c-.439.25-1.003.25-1.504 0l-2.695-1.63a1.527 1.527 0 0 1-.752-1.315v-3.133c0-.502.25-1.003.752-1.316l2.695-1.567c.438-.25 1.002-.25 1.504 0l2.694 1.63c.439.25.752.751.752 1.315v2.068l2.381-1.378v-2.13c0-.502-.25-1.004-.752-1.317l-5.013-2.945c-.438-.25-1.002-.25-1.504 0l-5.138 3.008c-.501.25-.752.752-.752 1.253v5.89c0 .502.25 1.003.752 1.316l5.076 2.946c.438.25 1.002.25 1.504 0l3.446-2.006 2.381-1.378 3.447-2.006c.438-.25 1.002-.25 1.504 0l2.694 1.567c.439.25.752.752.752 1.316v3.133c0 .501-.25 1.003-.752 1.316l-2.632 1.567c-.438.25-1.002.25-1.504 0l-2.694-1.567a1.527 1.527 0 0 1-.752-1.316v-2.005L16.84 22.1v2.067c0 .502.25 1.003.752 1.316l5.075 2.946c.439.25 1.003.25 1.504 0l5.076-2.946c.439-.25.752-.752.752-1.316v-5.953c0-.5-.25-1.002-.752-1.316l-5.076-2.945z"
        fill="#FFF"
      />
    </g>
  </svg>
);

const TrustWallet = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 444 501" fill="none">
    <path
      d="M0.710022 72.41L222.16 0.109985V500.63C63.98 433.89 0.710022 305.98 0.710022 233.69V72.41Z"
      fill="#0500FF"
    />
    <path
      d="M443.62 72.41L222.17 0.109985V500.63C380.35 433.89 443.62 305.98 443.62 233.69V72.41Z"
      fill="url(#trust__paint0_linear_3_10)"
    />
    <defs>
      <linearGradient
        id="trust__paint0_linear_3_10"
        x1="385.26"
        y1="-34.78"
        x2="216.61"
        y2="493.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.02" stopColor="#0000FF" />
        <stop offset="0.08" stopColor="#0094FF" />
        <stop offset="0.16" stopColor="#48FF91" />
        <stop offset="0.42" stopColor="#0094FF" />
        <stop offset="0.68" stopColor="#0038FF" />
        <stop offset="0.9" stopColor="#0500FF" />
      </linearGradient>
    </defs>
  </svg>
);

export default function FamilyWallet() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>(View.SIGN_IN);
  const [authType, setAuthType] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");


  const [ref, bounds] = useMeasure();

  useEffect(() => {
    if (!open) setView(View.SIGN_IN);
  }, [open]);

  const SignInView = () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Sign In
        </h2>

        <DrawerClose asChild>
          <button className="rounded-full bg-white p-2 dark:bg-zinc-800">
            <X className="h-5 w-5 text-zinc-400" />
          </button>
        </DrawerClose>
      </div>

      {/* socials */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          {[Chrome, FaDiscord, Github, FaApple, Twitter].map((Icon, i) => (
            <button
              key={i}
              className="flex items-center justify-center rounded-2xl bg-white px-4 py-3 dark:bg-zinc-800"
            >
              <Icon className="h-6 w-6 text-black dark:text-white" />
            </button>
          ))}
        </div>

        <div className="flex rounded-xl bg-white p-1 dark:bg-zinc-800">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setAuthType(tab.id);
              }}
              className="relative flex-1 cursor-pointer rounded-lg py-2 text-sm font-medium"
            >
              {tab.id === authType && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 z-0 rounded-lg bg-zinc-100 dark:bg-zinc-700/50"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 35,
                  }}
                />
              )}

              <span
                className={`relative z-10 ${tab.id === authType
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 dark:text-zinc-400"
                  }`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
        <div>
          <AnimatePresence mode="popLayout">
            {authType === "email" && (
              <motion.div className="relative flex w-full rounded-xl bg-white p-1.5 text-zinc-900 dark:bg-zinc-800 dark:text-white">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@address.com"
                  className="text-md focus-visible:ring-none ml-2 flex-1 text-zinc-900 focus:border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none dark:text-white"
                />
                <motion.button className="flex items-center justify-center rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-700/50">
                  <ArrowRight className="size-6 text-black dark:text-white" />
                </motion.button>
              </motion.div>
            )}
            {authType === "phone" && (
              <motion.div className="relative flex w-full rounded-xl bg-white p-1.5 text-zinc-900 dark:bg-zinc-800 dark:text-white">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 234 567 8900"
                  className="text-md focus-visible:ring-none ml-2 flex-1 text-zinc-900 focus:border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none dark:text-white"
                />
                <motion.button className="flex items-center justify-center rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-700/50">
                  <ArrowRight className="size-6 text-black dark:text-white" />
                </motion.button>
              </motion.div>
            )}
            {authType === "passkey" && (
              <motion.div className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-white p-1.5 text-zinc-900 dark:bg-zinc-800 dark:text-white">
                <Fingerprint className="ml-1 size-6 text-zinc-900" />
                <input
                  placeholder="Login with Passkey"
                  readOnly
                  className="text-md focus-visible:ring-none ml-2 flex-1 text-zinc-900 focus:border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none dark:text-white"
                />
                <motion.button
                  className="flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.2,
                  }}
                  onClick={() => setView(View.PASSKEY)}
                >
                  <ArrowRight className="size-6 text-white" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-2 mb-2 flex w-full items-center justify-center">
        <p>OR</p>
      </div>

      <button
        onClick={() => setView(View.CONNECT_WALLET)}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-500 py-3 text-white"
      >
        <BsWallet2 />
        Connect Wallet
      </button>
    </div>
  );

  const PasskeyView = () => (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full items-center justify-between">
        <button
          onClick={() => setView(View.SIGN_IN)}
          className="rounded-full bg-white p-2 dark:bg-zinc-800"
        >
          <ChevronLeft className="size-6 text-zinc-400" />
        </button>

        <h2 className="text-xl font-medium text-zinc-900">Passkey</h2>

        <DrawerClose asChild>
          <button className="rounded-full bg-white p-2 dark:bg-zinc-800">
            <X className="size-6 text-zinc-400" />
          </button>
        </DrawerClose>
      </div>
      <div className="relative flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-800 p">
        <div className="pointer-events-none absolute inset-0">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <rect
              x="1"
              y="1"
              width="98"
              height="98"
              rx="16"
              ry="16"
              fill="none"
              stroke="none"
            />
            =
            <motion.rect
              x="1"
              y="1"
              width="98"
              height="98"
              rx="16"
              ry="16"
              fill="none"
              stroke="url(#passkey-gradient)"
              strokeWidth="2"
              strokeDasharray="80 240"
              animate={{ strokeDashoffset: [0, -320] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <defs>
              <linearGradient
                id="passkey-gradient"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="100"
                y2="100"
              >
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative flex items-center justify-center rounded-2xl p-4">
          <Fingerprint className="h-16 w-16 text-zinc-500" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl p-2">
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Waiting for passkey
        </h2>
        <p className="text-md text-center text-zinc-500 dark:text-zinc-400">
          Please follow prompts to verify your passkey
        </p>
      </div>

      <button
        onClick={() => setView(View.SIGN_IN)}
        className="w-full rounded-xl bg-blue-500 py-3 text-white cursor-pointer"
      >
        Continue
      </button>
    </div>
  );

  const WalletView = () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setView(View.SIGN_IN)}
          className="rounded-full bg-white dark:bg-zinc-800 p-2"
        >
          <ChevronLeft className="size-6 text-zinc-400" />
        </button>

        <h2 className="text-lg font-medium text-zinc-900">Connect Wallet</h2>

        <DrawerClose asChild>
          <button className="rounded-full bg-white dark:bg-zinc-800  p-2">
            <X className="size-6 text-zinc-400" />
          </button>
        </DrawerClose>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        {[
          { name: "Metamask", logo: MetaMask },
          { name: "Coinbase", logo: Coinbase },
          { name: "Polygon", logo: Polygon },
          { name: "Trust", logo: TrustWallet },
        ].map((wallet, i) => (
          <button
            key={i}
            className="flex w-full items-center justify-between rounded-xl bg-white dark:bg-zinc-800 p-4 cursor-pointer"
            onClick={() => setView(View.SIGN_IN)}
          >
            <span className="text-zinc-900 dark:text-zinc-100">
              {wallet.name}
            </span>
            <div className="">
              <wallet.logo className="size-6" />
            </div>
          </button>
        ))}
        <button className="flex w-full items-center justify-between rounded-xl bg-white dark:bg-zinc-800 p-4">
          <div className="flex items-center gap-2">
            <span className="text-zinc-900 dark:text-zinc-100">
              Other Wallets
            </span>
            <div className="rounded-full border border-zinc-200 bg-zinc-100 dark:bg-zinc-800/50  dark:border-zinc-700 px-3 text-lg">
              350+
            </div>
          </div>

          <BsWallet2 className="size-6" />
        </button>
      </div>

      <div
        className="mt-2 mb-2 flex items-center justify-center gap-2 cursor-pointer"
        onClick={() => setView(View.SIGN_IN)}
      >
        <BsWallet2 className="size-6" />
        <p> I don't have wallet</p>
      </div>
    </div>
  );

  const renderView = () => {
    switch (view) {
      case View.SIGN_IN:
        return <SignInView />;

      case View.PASSKEY:
        return <PasskeyView />;

      case View.CONNECT_WALLET:
        return <WalletView />;
    }
  };

  return (
    <div className="relative flex  items-center justify-center ">
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-zinc-100 px-8 py-4 font-bold dark:text-white dark:bg-zinc-800"
      >
        Open Wallet
      </button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerPortal>
          <DrawerOverlay className="fixed inset-0 bg-black/50" />

          <DrawerContent className="fixed bottom-10!  w-[360px] mx-auto overflow-hidden rounded-4xl! border border-zinc-100 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
            <motion.div
              animate={{ height: bounds.height }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            >
              <div ref={ref} className="px-6 py-4">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={view}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {renderView()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  );
}
