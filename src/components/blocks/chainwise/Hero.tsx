
import {images_asset_base_url} from "@/static-assets/Static-Assets"
import { motion } from "framer-motion";
import { useState } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div
        className="min-h-screen w-full overflow-hidden  bg-no-repeat bg-cover bg-center"

        style={{ backgroundImage: `url(${images_asset_base_url}/chainwisebg.svg)` }}

      >
        <div className="px-8 sm:px-8 lg:pl-16">
          {/* navbar */}
          <nav className='h-20 flex justify-between items-center'>
            <div id='logo' className='flex items-center gap-1.5'>
              <img src={`${images_asset_base_url}/chainwiseLogo.svg`} alt="logo" className="w-12 h-12 sm:w-16 sm:h-16" />
              <span id='logo-text' className='text-white text-xl sm:text-2xl font-semibold'>CryptoNestX</span>
            </div>

            {/* Desktop Navigation */}
            <div id='nav-links' className='hidden lg:block'>
              <ul className='bg-[#1513132f] text-white flex gap-8 xl:gap-[50px] p-3 px-6 xl:px-7 rounded-sm'>
                <li><a href="#" className='text-white text-sm xl:text-md hover:text-gray-200 transition-colors'>Features</a></li>
                <li><a href="#" className='text-white text-sm xl:text-md hover:text-gray-200 transition-colors'>Portfolio</a></li>
                <li><a href="#" className='text-white text-sm xl:text-md hover:text-gray-200 transition-colors'>Pricing</a></li>
                <li><a href="#" className='text-white text-sm xl:text-md hover:text-gray-200 transition-colors'>Resources</a></li>
                <li><a href="#" className='text-white text-sm xl:text-md hover:text-gray-200 transition-colors'>Blog</a></li>
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden cursor-pointer text-white p-2 z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop CTA */}
            <div id='nav-cta' className='hidden lg:block pr-4 xl:pr-10'>
              <button className='text-white hover:bg-white hover:text-[#182D0B] hover:cursor-pointer   text-sm xl:text-md border-white border px-4 xl:px-7 py-2 xl:py-3 rounded-md hover:bg-opacity-10 transition-colors'>
                Get Started
              </button>
            </div>
          </nav>

          {/* Mobile Navigation Menu Overlay */}
          {isMenuOpen && (
            <div className="lg:hidden fixed inset-0 bg-[#151313cc] backdrop-blur-sm z-40">
              <div className="flex flex-col items-center justify-center h-full">
                <ul className='text-white flex flex-col gap-6 text-center'>
                  <li>
                    <a href="#" className='block py-4 text-lg font-normal hover:text-gray-200 transition-colors' onClick={() => setIsMenuOpen(false)}>Features</a>
                  </li>
                  <li>
                    <a href="#" className='block py-4 text-lg font-normal hover:text-gray-200 transition-colors' onClick={() => setIsMenuOpen(false)}>Portfolio</a>
                  </li>
                  <li>
                    <a href="#" className='block py-4 text-lg font-normal hover:text-gray-200 transition-colors' onClick={() => setIsMenuOpen(false)}>Pricing</a>
                  </li>
                  <li>
                    <a href="#" className='block py-4 text-lg font-normal hover:text-gray-200 transition-colors' onClick={() => setIsMenuOpen(false)}>Resources</a>
                  </li>
                  <li>
                    <a href="#" className='block py-4 text-lg font-normal hover:text-gray-200 transition-colors' onClick={() => setIsMenuOpen(false)}>Blog</a>
                  </li>
                  <li className="mt-8">
                    <button className='text-white hover:text-black text-lg border-white border w-full py-2 px-8 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors' onClick={() => setIsMenuOpen(false)}>
                      Get Started
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Hero Section */}
          <main className='flex flex-col lg:flex-row items-center justify-between w-full mt-8 sm:mt-16'>

            {/* Left Column: Text Content */}
            <div id='hero-heading' className='w-full lg:w-1/2'>
              <span id='tag' className='text-white opacity-80 text-base sm:text-lg'>
                <span className='text-[#4B8F21]'>[</span> 150+ Organization <span className='text-[#4B8F21]'>]</span>
              </span>
              <h1 className='text-3xl sm:text-4xl lg:text-5xl my-4 sm:my-[14px] font-bold text-white leading-tight sm:leading-normal lg:leading-16'>
                Secure Your Crypto Future, <br className="hidden sm:block" />
                Without the Uncertainty.
              </h1>
              <p className='text-base sm:text-lg font-light text-white max-w-2xl'>
                Build smarter portfolios, reduce risks, and track performance in <br className="hidden sm:block" />
                real time — all in one place.
              </p>

              <motion.button
                className="relative rounded-lg flex cursor-pointer items-center text-white px-6 sm:px-7 py-3 mt-6 sm:mt-[30px] font-medium bg-[#182D0B] overflow-hidden border border-transparent shadow-sm shadow-[#4b8f214a]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{ border: '1px solid transparent', borderRadius: '6px' }}
                  animate={{
                    borderImage: [
                      'linear-gradient(0deg, #4B8F21, transparent, transparent, transparent) 1',
                      'linear-gradient(180deg, transparent, #4B8F21, transparent, transparent) 1',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative z-10 flex items-center text-sm sm:text-base">
                  Start Investing
                  <span className="ml-2 sm:ml-3">
                    <img src={`${images_asset_base_url}/Vector.svg`} alt="" className="w-4 h-4 sm:w-auto sm:h-auto" />
                  </span>
                </div>
              </motion.button>
            </div>

            {/* Right Column: Floating Coins */}
            <div className='w-full lg:w-1/2 h-96 lg:h-[500px] relative mt-16 lg:mt-0'>
            {/* light */}
             <motion.img
                src={`${images_asset_base_url}/top light.svg`}
                alt="Light effect overlay"
                className="absolute -top-20 lg:-top-50 left-1/2 transform -translate-x-1/2 w-full h-full object-contain z-30 mix-blend-screen pointer-events-none scale-100 lg:scale-130"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
              {/* Coin 1: ETH */}
              <motion.img
                src={`${images_asset_base_url}/eth coin.svg`}
                alt="Ethereum Coin"
                className='absolute z-20 w-40 md:w-56 top-10 lg:top-0 left-[40%] transform -translate-x-1/2 scale-100 lg:scale-130 '
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Coin 2: Tether */}
              <motion.img
                src={`${images_asset_base_url}/bit coin.svg`}
                alt="Tether Coin"
                className='absolute z-10 w-40 md:w-56 top-30 lg:top-[25%] right-[40%] transform translate-x-1/2 scale-100 lg:scale-130'
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />

              {/* Coin 3: Hash */}
              <motion.img
                src={`${images_asset_base_url}/sol coin.svg`}
                alt="Hash Coin"
                className='absolute z-5 w-40 md:w-56 top-60 lg:top-[60%] left-[50%] transform -translate-x-1/2 scale-100 lg:scale-130'
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>
          </main>

          {/* Numbers Section */}
          <div id='numbers' className='w-full flex flex-wrap justify-start gap-6 sm:gap-8 lg:gap-14 items-start mt-16 sm:mt-16 lg:mt-0 pb-8'>
            <div className='flex flex-col gap-2 sm:gap-4 text-white text-start min-w-[120px] sm:min-w-0'>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-medium'>250k+</h2>
              <p className='text-sm sm:text-lg font-light'>Active Investors</p>
            </div>
            <div className='flex flex-col gap-2 sm:gap-4 text-white text-start min-w-[120px] sm:min-w-0'>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-medium'>85M+</h2>
              <p className='text-sm sm:text-lg font-light'>Assets Managed</p>
            </div>
            <div className='flex flex-col gap-2 sm:gap-4 text-white text-start min-w-[120px] sm:min-w-0'>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-medium'>97%</h2>
              <p className='text-sm sm:text-lg font-light'>Client Satisfaction</p>
            </div>
            <div className='flex flex-col gap-2 sm:gap-4 text-white text-start min-w-[120px] sm:min-w-0'>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-medium'>12+</h2>
              <p className='text-sm sm:text-lg font-light'>Years of Experience</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App