import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HamburgerIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const UserProfile = () => (
  <div className="flex items-center space-x-3">
    <div className="w-10 h-10 rounded-lg  flex bg-[#9A6F6F] items-center justify-center font-semibold">AC</div>
    <div>
      <p className="font-medium text-sm">Alex Costa</p>
      <p className="text-xs">alex20@mail.com</p>
    </div>
  </div>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuContainerVariants = {
    hidden: {
      y: "-100%",
      opacity: 0,
      transition: { type: "tween", duration: 0.3, ease: "easeIn" },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "tween", duration: 0.3, ease: "easeOut", staggerChildren: 0.1 },
    },
  } as const;

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  } as const;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center py-4 px-7 md:px-21 relative z-65"
      >
        <div className="flex items-center gap-18 justify-start">
          <div id="logo" className="text-[34px] font-semibold tracking-wider">Adorable</div>
          <nav className="hidden md:flex items-center gap-10">
            <a href="#" className="font-regular text-lg">Community</a>
            <a href="#" className="font-regular text-lg">Pricing</a>
            <a href="#" className="font-regular text-lg">Enterprise</a>
            <a href="#" className="font-regular text-lg">Learn</a>
          </nav>
        </div>

        <div className="hidden md:block">
          <UserProfile />
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-0 left-0 z-60 h-auto w-full flex flex-col items-center space-y-6 py-8 border-b border-neutral-800 bg-[#111216]"
            style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
          >
            <div className="pt-16">
              <motion.a variants={menuItemVariants} href="#" className="block text-center text-xl font-regular py-2" onClick={() => setIsMenuOpen(false)}>Community</motion.a>
              <motion.a variants={menuItemVariants} href="#" className="block text-center text-xl font-regular py-2" onClick={() => setIsMenuOpen(false)}>Pricing</motion.a>
              <motion.a variants={menuItemVariants} href="#" className="block text-center text-xl font-regular py-2" onClick={() => setIsMenuOpen(false)}>Enterprise</motion.a>
              <motion.a variants={menuItemVariants} href="#" className="block text-center text-xl font-regular py-2" onClick={() => setIsMenuOpen(false)}>Learn</motion.a>
              <motion.a variants={menuItemVariants} href="#" className="block text-center text-xl font-regular py-2" onClick={() => setIsMenuOpen(false)}>Launched</motion.a>
              <motion.div variants={menuItemVariants} className="border-t-[0.2px] border-gray-400/20 w-full pt-6 mt-4 flex justify-center">
                <UserProfile />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
