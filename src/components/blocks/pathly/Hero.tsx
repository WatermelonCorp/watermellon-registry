import { useState } from 'react';
import {images_asset_base_url} from "@/static-assets/Static-Assets"

function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div
        className="min-h-screen w-full bg-center bg-cover"
        style={{ backgroundImage: `url(${images_asset_base_url}/hero%20image.svg)` }}
      >
        {/* navbar */}
        <nav className='flex justify-between items-center w-full px-2 lg:px-6'>
          {/* Mobile Menu Button */}
          <img src={`${images_asset_base_url}/logo.svg`} alt="Logo" className="mb-8 md:hidden absolute top-6 -left-6 h-8" />
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6 absolute top-6 right-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div id='nav-links' className='hidden lg:block w-full'>
            <ul className='text-white flex justify-center items-center gap-8 xl:gap-[218px] py-6 px-6 rounded-sm'>
              <li><a href="#" className='text-white text-lg hover:text-gray-200 transition-colors'>JOURNEY</a></li>
              <li><a href="#" className='text-white text-lg hover:text-gray-200 transition-colors'>STORIES</a></li>
              <li><a href="#" className=""><img src={`${images_asset_base_url}/logo.svg`} alt="" /></a></li>
              <li><a href="#" className='text-white text-lg hover:text-gray-200 transition-colors'>ABOUT</a></li>
              <li><a href="#" className='text-white text-lg hover:text-gray-200 transition-colors'>CONTACT</a></li>
            </ul>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden fixed inset-0 bg-black bg-opacity-95 z-50 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <button 
                className="absolute top-6 right-6 text-white p-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img src={`${images_asset_base_url}/logo.svg`} alt="Logo" className="mb-8" />
              <a href="#" className='text-white text-2xl hover:text-gray-200 transition-colors py-2' onClick={() => setIsMobileMenuOpen(false)}>JOURNEY</a>
              <a href="#" className='text-white text-2xl hover:text-gray-200 transition-colors py-2' onClick={() => setIsMobileMenuOpen(false)}>STORIES</a>
              <a href="#" className='text-white text-2xl hover:text-gray-200 transition-colors py-2' onClick={() => setIsMobileMenuOpen(false)}>ABOUT</a>
              <a href="#" className='text-white text-2xl hover:text-gray-200 transition-colors py-2' onClick={() => setIsMobileMenuOpen(false)}>CONTACT</a>
            </div>
          </div>
        </nav>

        {/* Hero Text */}
        <div id='hero-heading' className='px-4 lg:pl-2 mt-36 lg:mt-[103px] flex flex-col justify-center items-center'>
          <h1 className='text-[52px] md:text-6xl lg:text-[76px] mb-4 lg:mb-[20px] font-light text-white leading-tight lg:leading-[90px] text-center'>
            Build your vision,
            <br className="" />
            <span id='heading' className='italic'>find your way</span>
          </h1>
          <p className='text-sm md:text-lg lg:text-xl font-normal text-center text-white max-w-md lg:max-w-2xl mt-4'>
            Design, build, and launch without limits — everything <br />
            you need is at your fingertips.
          </p>

          <button
            id="cta"
            className="relative rounded-lg flex cursor-pointer items-center px-6 py-3 lg:px-7 lg:py-3 mt-8 lg:mt-[60px] font-medium bg-[#DFE1E7] overflow-hidden 
             transition-all duration-300 ease-in-out hover:bg-[#cfd2da] hover:scale-[102%]"
          >
            <span className="text-black leading-[150%] font-medium text-sm lg:text-base">Get Started Today</span>
          </button>

          {/* Tags aligned with navlinks */}
          <div id="tags" className='w-full flex justify-between items-center text-[#A1A7A4] px-4 lg:px-16 xl:px-32 2xl:px-96 mt-20 md:mt-24 lg:mt-44'>
            <h2 className='text-xs lg:text-base text-left'>[ Some path aren't meant to be rushed ]</h2>
            <h2 className='text-xs lg:text-base text-right'>[ Rhythms of 2025 ]</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero