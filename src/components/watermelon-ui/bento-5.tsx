"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardDescription ,CardFooter, CardTitle } from '@/components/ui/card';

const Bento5 = () => {
  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-[#000A12] relative`}
    >

      <div className="w-full h-full p-4 lg:p-10 mx-auto flex flex-col lg:flex-row flex-wrap items-center justify-center gap-8 overflow-y-auto">
        {/* Box-1 */}
        <div className="p-px rounded-2xl bg-linear-to-t from-[3B3B3B]/45 to-[#A1A0A0]/45 w-full max-w-[400px]">
          <Card className="w-full h-[400px] rounded-2xl bg-[#16191D] flex flex-col justify-between relative overflow-hidden p-0 gap-0 border-0 ring-0 shadow-none">
            <div className="absolute -top-30 left-0  sm:scale-100 origin-top-left">
              <One className="size-145" />
            </div>
            <CardFooter className="w-full mt-auto p-8 relative z-20 items-start flex-col px-8 bg-transparent border-none">
              <CardTitle className="text-xl font-bold text-white">
                Begin Your Cyber Journey
              </CardTitle>
              <CardDescription className="text-[14px] font-medium text-white/30 mt-4">
                Step into the essential field of digital defense. We provide the
                foundational knowledge and hands-on skills to start your career
                with confidence.
              </CardDescription>
            </CardFooter>
          </Card>
        </div>

        {/* Box-2 */}
        <div className="p-px rounded-2xl bg-linear-to-t from-[3B3B3B]/45 to-[#A1A0A0]/45 w-full max-w-[400px]">
          <Card className="w-full h-[400px] rounded-2xl bg-[#16191D] flex flex-col justify-between relative overflow-hidden p-0 gap-0 border-0 ring-0 shadow-none">
            <CardContent className="absolute top-0 left-0 w-full h-[250px] z-10 sm:scale-100 origin-top p-0">
              <Two className="w-full h-full" />
            </CardContent>
            <div className="w-90 h-10 rounded-full bg-[#1779BF]/50 blur-2xl absolute left-1/2 -translate-x-1/2 top-40" />
            <div className="w-90 h-10 rounded-full bg-[#1779BF] blur-2xl absolute left-1/2 -translate-x-1/2 top-40" />
            <img 
              src="https://assets.watermelon.sh/Globe.svg"
              alt="Support Agent"
              className="size-80 opacity-90 absolute left-1/2 top-40 -translate-x-1/2 -translate-y-1/2 z-20"
            />
            <CardFooter className="w-full mt-auto p-8 relative z-20 items-start flex-col px-8 bg-transparent border-none">
              <CardTitle className="text-xl font-bold text-white">
                Connect with Global Experts
              </CardTitle>
              <CardDescription className="text-[14px] font-medium text-white/30 mt-4">
                You're not alone. Join a worldwide network of cybersecurity
                professionals to exchange ideas, discuss emerging threats.
              </CardDescription>
            </CardFooter>
          </Card>
        </div>

        {/* Box-3 */}
        <div className="p-px rounded-2xl bg-linear-to-t from-[3B3B3B]/45 to-[#A1A0A0]/45 w-full max-w-[400px]">
          <Card className="w-full h-[400px] rounded-2xl bg-[#16191D] flex flex-col justify-between relative overflow-hidden p-0 gap-0 border-0 ring-0 shadow-none">
            <CardContent className="absolute -top-20 left-1/2 -translate-x-1/2 scale-85 sm:scale-100 origin-top p-0">
              <div className="w-full h-20 sm:h-16 bg-[#16191D] mx-auto translate-y-72 sm:translate-y-70 mask-t-from-50%" />
              <LoopingText />
              <Three className="size-80" />
            </CardContent>

            <CardFooter className="w-full mt-auto px-8 pb-8 relative z-30 bg-[#16191D] items-start flex-col border-none">
              <CardTitle className="text-xl font-bold text-white">
                Begin Your Cyber Journey
              </CardTitle>
              <CardDescription className="text-[14px] font-medium text-white/30 mt-4">
                Step into the essential field of digital defense. We provide the
                foundational knowledge and hands-on skills to start your In a
                world of evolving threats, your skills are your weapon.{" "}
              </CardDescription>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Bento5;

const LOOPING_TEXTS = ["Advanced", "Fastest", "Performance"];

const LoopingText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % LOOPING_TEXTS.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-4 py-2 rounded-full bg-[#1D2024] shadow-[inset_0px_2px_4px_rgba(131,131,131,0.29)] text-white text-sm font-medium w-28 mx-auto translate-y-45 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={LOOPING_TEXTS[index]}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(4px)" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="whitespace-nowrap"
        >
          {LOOPING_TEXTS[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const One = ({ className }: { className?: string }) => {
  return (
    <svg
      width="755"
      height="672"
      viewBox="0 0 755 672"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g opacity="0.36">
        <g clipPath="url(#clip0_702_404)"></g>
        <rect
          x="91"
          y="1"
          width="313"
          height="313"
          rx="19"
          stroke="#A1A0A0"
          strokeOpacity="0.31"
          strokeWidth="2"
        />
      </g>
      <g opacity="0.36">
        <rect
          x="366"
          y="358"
          width="388"
          height="313"
          rx="19"
          stroke="#A1A0A0"
          strokeOpacity="0.31"
          strokeWidth="2"
        />
      </g>
      <line y1="352" x2="513" y2="352" stroke="#2D2F33" strokeWidth="2" />
      <line
        x1="108"
        y1="314"
        x2="621"
        y2="314"
        stroke="#2D2F33"
        strokeWidth="2"
      />
      <motion.g
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 500, opacity: [0, 1, 1, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      >
        <line
          x1="23"
          y1="352"
          x2="64"
          y2="352"
          stroke="url(#paint0_linear_702_404)"
          strokeWidth="2"
        />
        <line
          x1="23"
          y1="352"
          x2="64"
          y2="352"
          stroke="url(#paint1_linear_702_404)"
          strokeWidth="2"
        />
        <line
          x1="23"
          y1="352"
          x2="64"
          y2="352"
          stroke="url(#paint2_linear_702_404)"
          strokeWidth="2"
        />
        <line
          x1="23"
          y1="352"
          x2="64"
          y2="352"
          stroke="url(#paint3_linear_702_404)"
          strokeWidth="2"
        />
        <g filter="url(#filter0_f_702_404)">
          <line
            x1="23"
            y1="352"
            x2="64"
            y2="352"
            stroke="url(#paint4_linear_702_404)"
            strokeWidth="2"
          />
        </g>
        <g filter="url(#filter1_f_702_404)">
          <line
            x1="23"
            y1="352"
            x2="64"
            y2="352"
            stroke="url(#paint5_linear_702_404)"
            strokeWidth="2"
          />
        </g>
      </motion.g>
      <motion.g
        initial={{ x: -350, opacity: 0 }}
        animate={{ x: 200, opacity: [0, 1, 1, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear", delay: 1 }}
      >
        <line
          x1="414"
          y1="314"
          x2="455"
          y2="314"
          stroke="url(#paint6_linear_702_404)"
          strokeWidth="2"
        />
        <line
          x1="414"
          y1="314"
          x2="455"
          y2="314"
          stroke="url(#paint7_linear_702_404)"
          strokeWidth="2"
        />
        <line
          x1="414"
          y1="314"
          x2="455"
          y2="314"
          stroke="url(#paint8_linear_702_404)"
          strokeWidth="2"
        />
        <line
          x1="414"
          y1="314"
          x2="455"
          y2="314"
          stroke="url(#paint9_linear_702_404)"
          strokeWidth="2"
        />
        <g filter="url(#filter2_f_702_404)">
          <line
            x1="414"
            y1="314"
            x2="455"
            y2="314"
            stroke="url(#paint10_linear_702_404)"
            strokeWidth="2"
          />
        </g>
        <g filter="url(#filter3_f_702_404)">
          <line
            x1="414"
            y1="314"
            x2="455"
            y2="314"
            stroke="url(#paint11_linear_702_404)"
            strokeWidth="2"
          />
        </g>
      </motion.g>
      <g opacity="0.66" filter="url(#filter4_iif_702_404)">
        <path
          d="M337 332C337 381.153 297.153 421 248 421C198.847 421 159 381.153 159 332C159 282.847 198.847 243 248 243C297.153 243 337 282.847 337 332Z"
          fill="url(#paint12_linear_702_404)"
          fillOpacity="0.1"
        />
        <path
          d="M248 244C296.601 244 336 283.399 336 332C336 380.601 296.601 420 248 420C199.399 420 160 380.601 160 332C160 283.399 199.399 244 248 244Z"
          stroke="url(#paint13_linear_702_404)"
          strokeWidth="2"
        />
      </g>
      <g filter="url(#filter5_ii_702_404)">
        <path
          d="M328 332C328 376.735 291.735 413 247 413C202.265 413 166 376.735 166 332C166 287.265 202.265 251 247 251C291.735 251 328 287.265 328 332Z"
          fill="url(#paint14_linear_702_404)"
          fillOpacity="0.1"
        />
      </g>
      <path
        d="M247 252C291.183 252 327 287.817 327 332C327 376.183 291.183 412 247 412C202.817 412 167 376.183 167 332C167 287.817 202.817 252 247 252Z"
        stroke="url(#paint15_linear_702_404)"
        strokeWidth="2"
      />
      <g opacity="0.78">
        <g filter="url(#filter6_i_702_404)">
          <path
            d="M310 332C310 366.242 282.242 394 248 394C213.758 394 186 366.242 186 332C186 297.758 213.758 270 248 270C282.242 270 310 297.758 310 332Z"
            fill="#25292E"
          />
        </g>
        <path
          d="M248 270.5C281.966 270.5 309.5 298.034 309.5 332C309.5 365.966 281.966 393.5 248 393.5C214.034 393.5 186.5 365.966 186.5 332C186.5 298.034 214.034 270.5 248 270.5Z"
          stroke="#717070"
          strokeOpacity="0.18"
        />
      </g>
      <path
        opacity="0.78"
        d="M299 332C299 360.719 275.719 384 247 384C218.281 384 195 360.719 195 332C195 303.281 218.281 280 247 280C275.719 280 299 303.281 299 332Z"
        fill="#148AE1"
      />
      <g opacity="0.67" filter="url(#filter7_f_702_404)">
        <path
          d="M248 332C248 351.882 231.882 368 212 368C192.118 368 176 351.882 176 332C176 312.118 192.118 296 212 296C231.882 296 248 312.118 248 332Z"
          fill="#148AE1"
        />
      </g>
      <g opacity="0.51" filter="url(#filter8_f_702_404)">
        <path
          d="M320 332C320 351.882 303.882 368 284 368C264.118 368 248 351.882 248 332C248 312.118 264.118 296 284 296C303.882 296 320 312.118 320 332Z"
          fill="#148AE1"
        />
      </g>
      <g opacity="0.81" filter="url(#filter9_d_702_404)">
        <path
          d="M247 304L222 319C222 343.4 238.667 355.833 247 359C268.6 349.8 272.667 328.5 272 319L247 304Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_702_404"
          x="18.7"
          y="346.7"
          width="49.6"
          height="10.6"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.15"
            result="effect1_foregroundBlur_702_404"
          />
        </filter>
        <filter
          id="filter1_f_702_404"
          x="18.7"
          y="346.7"
          width="49.6"
          height="10.6"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.15"
            result="effect1_foregroundBlur_702_404"
          />
        </filter>
        <filter
          id="filter2_f_702_404"
          x="409.7"
          y="308.7"
          width="49.6"
          height="10.6"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.15"
            result="effect1_foregroundBlur_702_404"
          />
        </filter>
        <filter
          id="filter3_f_702_404"
          x="409.7"
          y="308.7"
          width="49.6"
          height="10.6"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.15"
            result="effect1_foregroundBlur_702_404"
          />
        </filter>
        <filter
          id="filter4_iif_702_404"
          x="140.9"
          y="224.9"
          width="214.2"
          height="214.2"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="12" dy="1" />
          <feGaussianBlur stdDeviation="8.65" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0784314 0 0 0 0 0.541176 0 0 0 0 0.882353 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_702_404"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-18" />
          <feGaussianBlur stdDeviation="7.7" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0784314 0 0 0 0 0.541176 0 0 0 0 0.882353 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_702_404"
            result="effect2_innerShadow_702_404"
          />
          <feGaussianBlur
            stdDeviation="9.05"
            result="effect3_foregroundBlur_702_404"
          />
        </filter>
        <filter
          id="filter5_ii_702_404"
          x="150.6"
          y="251"
          width="189.4"
          height="163"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="12" dy="1" />
          <feGaussianBlur stdDeviation="8.65" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0784314 0 0 0 0 0.541176 0 0 0 0 0.882353 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_702_404"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-18" />
          <feGaussianBlur stdDeviation="7.7" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0784314 0 0 0 0 0.541176 0 0 0 0 0.882353 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_702_404"
            result="effect2_innerShadow_702_404"
          />
        </filter>
        <filter
          id="filter6_i_702_404"
          x="186"
          y="270"
          width="124"
          height="124"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="7.1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.865185 0 0 0 0 0.911791 0 0 0 0 0.946154 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_702_404"
          />
        </filter>
        <filter
          id="filter7_f_702_404"
          x="146"
          y="266"
          width="132"
          height="132"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="15"
            result="effect1_foregroundBlur_702_404"
          />
        </filter>
        <filter
          id="filter8_f_702_404"
          x="218"
          y="266"
          width="132"
          height="132"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="15"
            result="effect1_foregroundBlur_702_404"
          />
        </filter>
        <filter
          id="filter9_d_702_404"
          x="199.6"
          y="281.6"
          width="94.8664"
          height="99.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="11.2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.992308 0 0 0 0 0.992308 0 0 0 0 0.992308 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_702_404"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_702_404"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_702_404"
          x1="23"
          y1="353.5"
          x2="64"
          y2="353.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#148AE1" stopOpacity="0" />
          <stop offset="0.5" stopColor="#148AE1" />
          <stop offset="1" stopColor="#0B4B7B" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_702_404"
          x1="23"
          y1="353.5"
          x2="64"
          y2="353.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#148AE1" stopOpacity="0" />
          <stop offset="0.5" stopColor="#148AE1" />
          <stop offset="1" stopColor="#0B4B7B" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_702_404"
          x1="23"
          y1="353.5"
          x2="64"
          y2="353.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#148AE1" stopOpacity="0" />
          <stop offset="0.5" stopColor="#1367A6" />
          <stop offset="1" stopColor="#0B4B7B" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_702_404"
          x1="23"
          y1="353.5"
          x2="64"
          y2="353.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#148AE1" stopOpacity="0" />
          <stop offset="0.5" stopColor="#148AE1" />
          <stop offset="1" stopColor="#0B4B7B" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_702_404"
          x1="23"
          y1="353.5"
          x2="64"
          y2="353.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#148AE1" stopOpacity="0" />
          <stop offset="0.5" stopColor="#4296D3" />
          <stop offset="1" stopColor="#0B4B7B" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_702_404"
          x1="23"
          y1="353.5"
          x2="64"
          y2="353.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#148AE1" stopOpacity="0" />
          <stop offset="0.5" stopColor="#4296D3" />
          <stop offset="1" stopColor="#0B4B7B" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_702_404"
          x1="414"
          y1="315.5"
          x2="455"
          y2="315.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#148AE1" stopOpacity="0" />
          <stop offset="0.5" stopColor="#148AE1" />
          <stop offset="1" stopColor="#0B4B7B" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_702_404"
          x1="414"
          y1="315.5"
          x2="455"
          y2="315.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#148AE1" stopOpacity="0" />
          <stop offset="0.5" stopColor="#148AE1" />
          <stop offset="1" stopColor="#0B4B7B" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_702_404"
          x1="414"
          y1="315.5"
          x2="455"
          y2="315.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#148AE1" stopOpacity="0" />
          <stop offset="0.5" stopColor="#1367A6" />
          <stop offset="1" stopColor="#0B4B7B" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_702_404"
          x1="414"
          y1="315.5"
          x2="455"
          y2="315.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#148AE1" stopOpacity="0" />
          <stop offset="0.5" stopColor="#148AE1" />
          <stop offset="1" stopColor="#0B4B7B" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_702_404"
          x1="414"
          y1="315.5"
          x2="455"
          y2="315.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#148AE1" stopOpacity="0" />
          <stop offset="0.5" stopColor="#4296D3" />
          <stop offset="1" stopColor="#0B4B7B" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_702_404"
          x1="414"
          y1="315.5"
          x2="455"
          y2="315.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#148AE1" stopOpacity="0" />
          <stop offset="0.5" stopColor="#4296D3" />
          <stop offset="1" stopColor="#0B4B7B" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint12_linear_702_404"
          x1="248"
          y1="243"
          x2="248"
          y2="421"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#148AE1" />
          <stop offset="1" stopColor="#0B4B7B" />
        </linearGradient>
        <linearGradient
          id="paint13_linear_702_404"
          x1="337"
          y1="332"
          x2="159"
          y2="332"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#148AE1" />
          <stop offset="0.5" stopColor="#333333" stopOpacity="0" />
          <stop offset="1" stopColor="#148AE1" />
        </linearGradient>
        <linearGradient
          id="paint14_linear_702_404"
          x1="247"
          y1="251"
          x2="247"
          y2="413"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#148AE1" />
          <stop offset="1" stopColor="#0B4B7B" />
        </linearGradient>
        <linearGradient
          id="paint15_linear_702_404"
          x1="328"
          y1="332"
          x2="166"
          y2="332"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#148AE1" />
          <stop offset="0.5" stopColor="#333333" stopOpacity="0" />
          <stop offset="1" stopColor="#148AE1" />
        </linearGradient>
        <clipPath id="clip0_702_404">
          <rect x="90" width="315" height="315" rx="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const Two = ({ className }: { className?: string }) => {
  const path1 = "M-34 0.891113C14.3787 25.5114 264.026 138.484 514 0.891113";
  const path2 = "M-35 200.891C13.3787 176.271 263.026 63.2987 513 200.891";
  const path3 = "M-118 17.8911C-54.7898 42.5114 271.392 155.484 598 17.8911";

  return (
    <svg
      width="484"
      height="202"
      viewBox="0 0 484 202"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
        </radialGradient>
        <filter id="tagShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.5" />
        </filter>
      </defs>

      <path d={path1} stroke="#2D2F33" strokeWidth="2" />
      <path d={path2} stroke="#2D2F33" strokeWidth="2" />
      <path d={path3} stroke="#2D2F33" strokeWidth="2" />
      <path
        d="M-118 183.891C-54.7898 159.271 271.392 46.2987 598 183.891"
        stroke="#2D2F33"
        strokeWidth="2"
      />
      <line
        y1="99.8911"
        x2="513"
        y2="99.8911"
        stroke="#2D2F33"
        strokeWidth="2"
      />

      <FloatingDot name="Leon" pathType="path3" duration={7} delay={0} />
      <FloatingDot name="Emma" pathType="path1" duration={5} delay={4} />
      <FloatingDot name="John" pathType="path2" duration={8} delay={1} />
    </svg>
  );
};

const FloatingDot = ({
  name,
  pathType,
  duration,
  delay,
}: {
  name: string;
  pathType: "path1" | "path2" | "path3";
  duration: number;
  delay: number;
}) => {
  // Cubic Bezier interpolation: P(t) = (1-t)^3*P0 + 3(1-t)^2*t*P1 + 3(1-t)*t^2*P2 + t^3*P3
  type BezierPoint = { x: number; y: number };

  const getBezierPoints = (
    p0: BezierPoint,
    p1: BezierPoint,
    p2: BezierPoint,
    p3: BezierPoint,
  ) => {
    const pointsX = [];
    const pointsY = [];
    for (let t = 0; t <= 1; t += 0.1) {
      const x =
        Math.pow(1 - t, 3) * p0.x +
        3 * Math.pow(1 - t, 2) * t * p1.x +
        3 * (1 - t) * Math.pow(t, 2) * p2.x +
        Math.pow(t, 3) * p3.x;
      const y =
        Math.pow(1 - t, 3) * p0.y +
        3 * Math.pow(1 - t, 2) * t * p1.y +
        3 * (1 - t) * Math.pow(t, 2) * p2.y +
        Math.pow(t, 3) * p3.y;
      pointsX.push(x);
      pointsY.push(y);
    }
    return { x: pointsX, y: pointsY };
  };

  const pathData = {
    path1: getBezierPoints(
      { x: -34, y: 0.89 },
      { x: 14.37, y: 25.51 },
      { x: 264.02, y: 138.48 },
      { x: 514, y: 0.89 },
    ),
    path2: getBezierPoints(
      { x: -35, y: 200.89 },
      { x: 13.37, y: 176.27 },
      { x: 263.02, y: 63.29 },
      { x: 513, y: 200.89 },
    ),
    path3: getBezierPoints(
      { x: -118, y: 17.89 },
      { x: -54.78, y: 42.51 },
      { x: 271.39, y: 155.48 },
      { x: 598, y: 17.89 },
    ),
  };

  const { x, y } = pathData[pathType];

  return (
    <motion.g
      initial={{ x: x[0], y: y[0], opacity: 0 }}
      animate={{
        x,
        y,
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    >
      <circle r="12" fill="url(#dotGlow)" />
      <circle r="3" fill="#E0F2FE" />
      <circle
        r="3"
        fill="#38BDF8"
        opacity="0.5"
        style={{ filter: "blur(1px)" }}
      />

      <g transform="translate(0, -22)" filter="url(#tagShadow)">
        <rect
          x="-24"
          y="-9"
          width="50"
          height="20"
          rx="3"
          fill="#0F172A"
          fillOpacity="0.9"
          stroke="#334155"
          strokeWidth="0.5"
        />
        <text
          x="0"
          y="4"
          fill="white"
          fontSize="12"
          textAnchor="middle"
          fontWeight="600"
          style={{ pointerEvents: "none", letterSpacing: "0.02em" }}
        >
          {name}
        </text>
      </g>
    </motion.g>
  );
};

const Three = ({ className }: { className?: string }) => {
  return (
    <svg
      width="388"
      height="357"
      viewBox="0 0 388 357"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line
        x1="5.7002"
        y1="213.3"
        x2="40.6818"
        y2="213.3"
        stroke="#148AE1"
        strokeWidth="2"
      />
      <g filter="url(#filter0_f_702_493)">
        <line
          x1="5.7002"
          y1="213.3"
          x2="40.6818"
          y2="213.3"
          stroke="#148AE1"
          strokeWidth="2"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(0.964347 0.107607 -0.101357 1.02381 5.83789 193.419)"
        stroke="#BABABA"
      />
      <g filter="url(#filter1_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(0.964347 0.107607 -0.101357 1.02381 5.83789 193.419)"
          stroke="#BABABA"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(0.94847 0.214034 -0.201603 1.00695 8.03711 172.634)"
        stroke="#BABABA"
      />
      <g filter="url(#filter2_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(0.94847 0.214034 -0.201603 1.00695 8.03711 172.634)"
          stroke="#BABABA"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(0.922201 0.318116 -0.299641 0.979062 12.2705 152.212)"
        stroke="#BABABA"
      />
      <g filter="url(#filter3_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(0.922201 0.318116 -0.299641 0.979062 12.2705 152.212)"
          stroke="#BABABA"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(0.885828 0.418714 -0.394396 0.940446 18.4932 132.368)"
        stroke="#BABABA"
      />
      <g filter="url(#filter4_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(0.885828 0.418714 -0.394396 0.940446 18.4932 132.368)"
          stroke="#BABABA"
        />
      </g>
      <line
        y1="-1"
        x2="36.0761"
        y2="-1"
        transform="matrix(0.83975 0.514723 -0.48483 0.891527 26.6299 113.321)"
        stroke="#148AE1"
        strokeWidth="2"
      />
      <g filter="url(#filter5_f_702_493)">
        <line
          y1="-1"
          x2="36.0761"
          y2="-1"
          transform="matrix(0.83975 0.514723 -0.48483 0.891527 26.6299 113.321)"
          stroke="#148AE1"
          strokeWidth="2"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(0.784471 0.605094 -0.569952 0.83284 36.5996 95.2861)"
        stroke="#BABABA"
      />
      <g filter="url(#filter6_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(0.784471 0.605094 -0.569952 0.83284 36.5996 95.2861)"
          stroke="#BABABA"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(0.720598 0.688834 -0.648829 0.765028 48.291 78.4541)"
        stroke="#BABABA"
      />
      <g filter="url(#filter7_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(0.720598 0.688834 -0.648829 0.765028 48.291 78.4541)"
          stroke="#BABABA"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(0.648829 0.765028 -0.720598 0.688835 61.5781 63.0166)"
        stroke="#BABABA"
      />
      <g filter="url(#filter8_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(0.648829 0.765028 -0.720598 0.688835 61.5781 63.0166)"
          stroke="#BABABA"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(0.569952 0.83284 -0.784471 0.605094 76.3086 49.1299)"
        stroke="#BABABA"
      />
      <g filter="url(#filter9_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(0.569952 0.83284 -0.784471 0.605094 76.3086 49.1299)"
          stroke="#BABABA"
        />
      </g>
      <line
        y1="-1"
        x2="36.0761"
        y2="-1"
        transform="matrix(0.48483 0.891527 -0.83975 0.514724 92.3271 36.958)"
        stroke="#148AE1"
        strokeWidth="2"
      />
      <g filter="url(#filter10_f_702_493)">
        <line
          y1="-1"
          x2="36.0761"
          y2="-1"
          transform="matrix(0.48483 0.891527 -0.83975 0.514724 92.3271 36.958)"
          stroke="#148AE1"
          strokeWidth="2"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(0.394396 0.940447 -0.885828 0.418714 109.457 26.6299)"
        stroke="#BABABA"
      />
      <g filter="url(#filter11_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(0.394396 0.940447 -0.885828 0.418714 109.457 26.6299)"
          stroke="#BABABA"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(0.299642 0.979063 -0.922202 0.318117 127.512 18.2627)"
        stroke="#BABABA"
      />
      <g filter="url(#filter12_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(0.299642 0.979063 -0.922202 0.318117 127.512 18.2627)"
          stroke="#BABABA"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(0.201604 1.00695 -0.948471 0.214034 146.287 11.9385)"
        stroke="#BABABA"
      />
      <g filter="url(#filter13_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(0.201604 1.00695 -0.948471 0.214034 146.287 11.9385)"
          stroke="#BABABA"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(0.101357 1.02381 -0.964348 0.107607 165.588 7.73926)"
        stroke="#BABABA"
      />
      <g filter="url(#filter14_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(0.101357 1.02381 -0.964348 0.107607 165.588 7.73926)"
          stroke="#BABABA"
        />
      </g>
      <line
        x1="186.159"
        y1="5.7002"
        x2="186.159"
        y2="42.8387"
        stroke="#148AE1"
        strokeWidth="2"
      />
      <g filter="url(#filter15_f_702_493)">
        <line
          x1="186.159"
          y1="5.7002"
          x2="186.159"
          y2="42.8387"
          stroke="#148AE1"
          strokeWidth="2"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(-0.101357 1.02381 -0.964348 -0.107606 204.886 5.84863)"
        stroke="#BABABA"
      />
      <g filter="url(#filter16_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(-0.101357 1.02381 -0.964348 -0.107606 204.886 5.84863)"
          stroke="#BABABA"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(-0.201604 1.00695 -0.948471 -0.214034 224.462 8.18457)"
        stroke="#BABABA"
      />
      <g filter="url(#filter17_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(-0.201604 1.00695 -0.948471 -0.214034 224.462 8.18457)"
          stroke="#BABABA"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(-0.299641 0.979063 -0.922202 -0.318117 243.703 12.6768)"
        stroke="#BABABA"
      />
      <g filter="url(#filter18_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(-0.299641 0.979063 -0.922202 -0.318117 243.703 12.6768)"
          stroke="#BABABA"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(-0.394396 0.940448 -0.885829 -0.418714 262.394 19.2783)"
        stroke="#BABABA"
      />
      <g filter="url(#filter19_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(-0.394396 0.940448 -0.885829 -0.418714 262.394 19.2783)"
          stroke="#BABABA"
        />
      </g>
      <line
        y1="-1"
        x2="36.0761"
        y2="-1"
        transform="matrix(-0.48483 0.891528 -0.839751 -0.514724 280.33 27.9229)"
        stroke="#148AE1"
        strokeWidth="2"
      />
      <g filter="url(#filter20_f_702_493)">
        <line
          y1="-1"
          x2="36.0761"
          y2="-1"
          transform="matrix(-0.48483 0.891528 -0.839751 -0.514724 280.33 27.9229)"
          stroke="#148AE1"
          strokeWidth="2"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(-0.569952 0.832841 -0.784472 -0.605094 297.322 38.5088)"
        stroke="#BABABA"
      />
      <g filter="url(#filter21_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(-0.569952 0.832841 -0.784472 -0.605094 297.322 38.5088)"
          stroke="#BABABA"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(-0.648829 0.765029 -0.720598 -0.688835 313.174 50.9229)"
        stroke="#3A3C3E"
      />
      <g filter="url(#filter22_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(-0.648829 0.765029 -0.720598 -0.688835 313.174 50.9229)"
          stroke="#3A3C3E"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(-0.720598 0.688835 -0.64883 -0.765029 327.717 65.0244)"
        stroke="#3A3C3E"
      />
      <g filter="url(#filter23_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(-0.720598 0.688835 -0.64883 -0.765029 327.717 65.0244)"
          stroke="#3A3C3E"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(-0.784472 0.605095 -0.569952 -0.832841 340.795 80.665)"
        stroke="#3A3C3E"
      />
      <g filter="url(#filter24_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(-0.784472 0.605095 -0.569952 -0.832841 340.795 80.665)"
          stroke="#3A3C3E"
        />
      </g>
      <line
        y1="-1"
        x2="36.0761"
        y2="-1"
        transform="matrix(-0.839751 0.514724 -0.484831 -0.891528 352.26 97.6729)"
        stroke="#3A3C3E"
        strokeWidth="2"
      />
      <g filter="url(#filter25_f_702_493)">
        <line
          y1="-1"
          x2="36.0761"
          y2="-1"
          transform="matrix(-0.839751 0.514724 -0.484831 -0.891528 352.26 97.6729)"
          stroke="#3A3C3E"
          strokeWidth="2"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(-0.885829 0.418715 -0.394397 -0.940448 361.987 115.86)"
        stroke="#3A3C3E"
      />
      <g filter="url(#filter26_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(-0.885829 0.418715 -0.394397 -0.940448 361.987 115.86)"
          stroke="#3A3C3E"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(-0.922202 0.318117 -0.299642 -0.979063 369.868 135.024)"
        stroke="#3A3C3E"
      />
      <g filter="url(#filter27_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(-0.922202 0.318117 -0.299642 -0.979063 369.868 135.024)"
          stroke="#3A3C3E"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(-0.948472 0.214035 -0.201604 -1.00695 375.822 154.958)"
        stroke="#3A3C3E"
      />
      <g filter="url(#filter28_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(-0.948472 0.214035 -0.201604 -1.00695 375.822 154.958)"
          stroke="#3A3C3E"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(-0.964349 0.107607 -0.101357 -1.02381 379.782 175.446)"
        stroke="#3A3C3E"
      />
      <g filter="url(#filter29_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(-0.964349 0.107607 -0.101357 -1.02381 379.782 175.446)"
          stroke="#3A3C3E"
        />
      </g>
      <line
        x1="381.7"
        y1="197.292"
        x2="346.719"
        y2="197.292"
        stroke="#3A3C3E"
        strokeWidth="2"
      />
      <g filter="url(#filter30_f_702_493)">
        <line
          x1="381.7"
          y1="197.292"
          x2="346.719"
          y2="197.292"
          stroke="#3A3C3E"
          strokeWidth="2"
        />
      </g>
      <line
        y1="-0.5"
        x2="36.0761"
        y2="-0.5"
        transform="matrix(-0.964349 -0.107606 0.101357 -1.02381 381.562 217.173)"
        stroke="#3A3C3E"
      />
      <g filter="url(#filter31_f_702_493)">
        <line
          y1="-0.5"
          x2="36.0761"
          y2="-0.5"
          transform="matrix(-0.964349 -0.107606 0.101357 -1.02381 381.562 217.173)"
          stroke="#3A3C3E"
        />
      </g>
      <g filter="url(#filter32_di_702_493)">
        <circle cx="194.2" cy="202.2" r="133.5" fill="#191C1E" />
      </g>
      <g filter="url(#filter33_df_702_493)">
        <circle cx="194.2" cy="202.2" r="90.5" fill="#191C1E" />
      </g>
      <g opacity="0.52" filter="url(#filter34_f_702_493)">
        <circle cx="250.2" cy="105.2" r="11.5" fill="black" />
      </g>
      <g filter="url(#filter35_f_702_493)">
        <circle cx="250.2" cy="105.2" r="7.5" fill="#1489E1" />
      </g>
      <defs>
        <filter
          id="filter0_f_702_493"
          x="0.000195503"
          y="206.57"
          width="46.3814"
          height="13.4591"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter1_f_702_493"
          x="0.137891"
          y="186.695"
          width="46.2916"
          height="16.3058"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter2_f_702_493"
          x="2.33711"
          y="165.927"
          width="45.8189"
          height="20.1285"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter3_f_702_493"
          x="6.57051"
          y="145.533"
          width="44.9693"
          height="23.8556"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter4_f_702_493"
          x="12.7932"
          y="125.728"
          width="43.7516"
          height="27.4459"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter5_f_702_493"
          x="20.9299"
          y="105.838"
          width="42.6646"
          height="31.7525"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter6_f_702_493"
          x="30.8996"
          y="88.7531"
          width="40.2711"
          height="34.0626"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter7_f_702_493"
          x="42.591"
          y="71.989"
          width="38.0455"
          height="37.0157"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter8_f_702_493"
          x="55.8781"
          y="56.6276"
          width="35.5279"
          height="39.6881"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter9_f_702_493"
          x="70.6086"
          y="42.8249"
          width="32.7457"
          height="42.0509"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter10_f_702_493"
          x="86.6271"
          y="30.2287"
          width="30.5699"
          height="44.5924"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter11_f_702_493"
          x="103.757"
          y="20.5109"
          width="26.5143"
          height="45.7467"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter12_f_702_493"
          x="121.812"
          y="12.2443"
          width="23.1324"
          height="47.0392"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter13_f_702_493"
          x="140.587"
          y="6.02461"
          width="19.6217"
          height="47.941"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter14_f_702_493"
          x="159.888"
          y="1.93184"
          width="16.0211"
          height="48.4425"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter15_f_702_493"
          x="179.489"
          y="0.000195503"
          width="13.3395"
          height="48.5387"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter16_f_702_493"
          x="195.529"
          y="0.148633"
          width="16.0201"
          height="48.4425"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter17_f_702_493"
          x="211.488"
          y="2.48457"
          width="19.6217"
          height="47.941"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter18_f_702_493"
          x="227.194"
          y="6.97676"
          width="23.1314"
          height="47.0392"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter19_f_702_493"
          x="242.465"
          y="13.5783"
          width="26.5143"
          height="45.7462"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter20_f_702_493"
          x="257.139"
          y="22.2229"
          width="30.5709"
          height="44.5924"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter21_f_702_493"
          x="271.061"
          y="32.8088"
          width="32.7457"
          height="42.0509"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter22_f_702_493"
          x="284.067"
          y="45.2229"
          width="35.5279"
          height="39.6881"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter23_f_702_493"
          x="296.021"
          y="59.3244"
          width="38.0445"
          height="37.0157"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter24_f_702_493"
          x="306.794"
          y="74.965"
          width="40.2711"
          height="34.0621"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter25_f_702_493"
          x="316.265"
          y="91.9729"
          width="42.6646"
          height="31.7525"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter26_f_702_493"
          x="324.33"
          y="110.16"
          width="43.7516"
          height="27.4459"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter27_f_702_493"
          x="330.899"
          y="129.324"
          width="44.9693"
          height="23.8556"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter28_f_702_493"
          x="335.905"
          y="149.258"
          width="45.818"
          height="20.1285"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter29_f_702_493"
          x="339.292"
          y="169.746"
          width="46.2916"
          height="16.3058"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter30_f_702_493"
          x="341.019"
          y="190.563"
          width="46.3814"
          height="13.4591"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter31_f_702_493"
          x="340.971"
          y="207.591"
          width="46.2916"
          height="16.3058"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2.85"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter32_di_702_493"
          x="39.7002"
          y="47.7002"
          width="309"
          height="309"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="10.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0784314 0 0 0 0 0.541176 0 0 0 0 0.882353 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_702_493"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_702_493"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="16.05" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.976923 0 0 0 0 0.976923 0 0 0 0 0.976923 0 0 0 0.18 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_702_493"
          />
        </filter>
        <filter
          id="filter33_df_702_493"
          x="82.1002"
          y="90.1002"
          width="224.2"
          height="224.2"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="10.8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.18 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_702_493"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_702_493"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="1.4"
            result="effect2_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter34_f_702_493"
          x="231.2"
          y="86.2002"
          width="38"
          height="38"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="3.75"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
        <filter
          id="filter35_f_702_493"
          x="241.7"
          y="96.7002"
          width="17"
          height="17"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.5"
            result="effect1_foregroundBlur_702_493"
          />
        </filter>
      </defs>
    </svg>
  );
};
