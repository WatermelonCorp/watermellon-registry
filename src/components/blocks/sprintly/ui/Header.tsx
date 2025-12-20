import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HamburgerIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mobileMenuVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-full  justify-between md:justify-center items-center py-4 absolute top-0 left-0 z-20 border-b border-white"
      >
        <div className="flex gap-10 items-center  justify-between   w-full px-6 lg:max-w-4xl">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold tracking-wider">Focora.</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="font-regular">
              Features
            </a>
            <a href="#" className="font-regular">
              Integrations
            </a>
            <a href="#" className="font-regular">
              Pricing
            </a>
            <a href="#" className="font-regular">
              Blog
            </a>
            <a href="#" className="font-regular">
              Company
            </a>
            <a href="#" className="font-regular">
              Changelog
            </a>
          </nav>
          <button className="cursor-pointer hidden lg:block shadow-neutral-900/50 bg-neutral-900 text-white shadow-lg  rounded-lg px-6 py-2 font-semibold">
            Login
          </button>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-0 right-0 z-10 h-full w-full  flex flex-col items-start space-y-8 pt-24 p-8 border-l bg-gradient-to-b from-white/80 to-pink-300/50 via-blue-300/50"
            style={{
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
            }}
          >
            <a
              href="#"
              className="text-2xl font-regular"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#"
              className="text-2xl font-regular"
              onClick={() => setIsMenuOpen(false)}
            >
              Integrations
            </a>
            <a
              href="#"
              className="text-2xl font-regular"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-2xl font-regular"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </a>
            <a
              href="#"
              className="text-2xl font-regular"
              onClick={() => setIsMenuOpen(false)}
            >
              Company
            </a>
            <a
              href="#"
              className="text-2xl font-regular"
              onClick={() => setIsMenuOpen(false)}
            >
              Changelog
            </a>
            <button
              className="cursor-pointer  shadow-neutral-900/50 bg-neutral-900 text-white shadow-lg  rounded-lg px-6 py-2 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
