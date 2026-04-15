"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import NumberFlow from "@number-flow/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const GLOBE_PHRASES = ["Find House", "Performance Market", "Handle Traffic"];

const Bento2 = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#090909] p-3 sm:p-4 md:p-6 font-['Inter',sans-serif] overflow-x-hidden">

      <div className="w-full max-w-350 flex flex-col lg:flex-row items-start justify-start gap-4 sm:gap-6 p-3 sm:p-6 md:p-8 lg:p-10">
        <div className="flex flex-col gap-6 w-full max-w-none lg:max-w-189.75 lg:flex-1">
          {/* Bento-1 */}
          <Card className="w-full min-h-90 sm:min-h-105 lg:h-112.75 bg-[#202020] rounded-4xl p-5 sm:p-8 flex flex-col justify-between overflow-hidden">
            <CardHeader className="w-full px-0 pt-0">
              <CardTitle className="text-2xl sm:text-3xl font-semibold bg-clip-text text-transparent bg-linear-to-r from-[#FFFFFF] to-[#5B5959] mb-3 sm:mb-4 leading-tight">
                A World of Properties Awaits
              </CardTitle>
              <CardDescription className="text-base sm:text-lg lg:text-xl font-thin text-white/50 leading-6 sm:leading-7">
                Utilize our dynamic platform to showcase your property in
                stunning detail or dive into a curated marketplace. Every
                listing is an opportunity waiting to be explored.
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full h-full min-h-45 sm:min-h-55 flex items-center justify-center relative overflow-visible px-0">
              <Transforming />
            </CardContent>
          </Card>

          {/* Bento-2 */}
          <Card className="w-full min-h-73 bg-[#202020] rounded-4xl flex flex-col sm:flex-row items-center justify-between p-5 sm:p-8 gap-5 sm:gap-6 overflow-hidden">
            <CardContent className="w-full h-full flex items-center justify-center sm:justify-start scale-95 sm:scale-100 origin-center pl-6 px-0">
              <Globe />
            </CardContent>
            <CardHeader className="w-full px-0">
              <CardTitle className="text-2xl sm:text-3xl font-semibold bg-clip-text text-transparent bg-linear-to-r from-[#FFFFFF] to-[#5B5959] mb-3 sm:mb-4 leading-tight text-center sm:text-left">
                Marketplace Synergy
              </CardTitle>
              <CardDescription className="text-base sm:text-lg lg:text-xl font-thin text-white/50 tracking-tight leading-6 sm:leading-7 text-center sm:text-left">
                Experience a frictionless journey from property management to
                monetization.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-none lg:max-w-142.25">
          {/* Bento-3 */}
          <Card className="w-full min-h-73 bg-[#202020] rounded-4xl flex flex-col sm:flex-row items-center justify-between px-5 sm:px-8 py-5 sm:py-0 gap-5 sm:gap-6 overflow-hidden">
            <CardContent className="h-full flex items-center justify-center mt-6 md:mt-0 relative scale-90 sm:scale-100 origin-center px-0">
              <Graph />
            </CardContent>
            <CardHeader className="w-full px-0">
              <CardTitle className="text-2xl sm:text-3xl font-semibold bg-clip-text text-transparent bg-linear-to-r from-[#FFFFFF] to-[#5B5959] mb-3 sm:mb-4 leading-tight text-center sm:text-left">
                Advanced Analytics
              </CardTitle>
              <CardDescription className="text-base sm:text-lg lg:text-xl font-thin text-white/50 leading-6 sm:leading-7 text-center sm:text-left">
                Stop reacting and start strategizing. Our predictive analytics
                help you identify growth
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Bento-4 */}
          <Card className="w-full min-h-90 sm:min-h-105 lg:h-112.75 bg-[#202020] rounded-4xl p-5 sm:p-8 flex flex-col justify-between overflow-hidden">
            <CardContent className="flex items-center justify-center relative min-h-45 sm:min-h-55 overflow-visible scale-90 sm:scale-100 origin-center px-0">
              <Tools />
            </CardContent>
            <CardHeader className="w-full px-0">
              <CardTitle className="text-2xl sm:text-3xl font-semibold bg-clip-text text-transparent bg-linear-to-r from-[#FFFFFF] to-[#5B5959] mb-3 sm:mb-4 leading-tight">
                Integrated Management Tools
              </CardTitle>
              <CardDescription className="text-base sm:text-lg lg:text-xl font-thin text-white/50 leading-6 sm:leading-7">
                Our comprehensive toolkit simplifies the complexities of
                property ownership, automating routine tasks so you can focus on
                growth
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Bento2;

const Transforming = () => {
  return (
    <svg
      width="733"
      height="339"
      viewBox="0 0 733 339"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 -translate-x-1/2 -top-20 md:-top-16 w-[145%] sm:w-[135%] md:w-[120%] lg:w-183.25"
    >
      <g opacity="0.44" filter="url(#filter0_f_4_1972)">
        <circle cx="368.441" cy="188" r="88" fill="#FD3D84" />
      </g>
      <g opacity="0.38" filter="url(#filter1_di_4_1972)">
        <path
          d="M21.4399 261.133V128.731C21.4399 117.772 32.2084 110.057 42.5853 113.581L137.785 145.913C144.275 148.117 148.64 154.209 148.64 161.063V229.998C148.64 236.918 144.191 243.054 137.613 245.206L42.4134 276.34C32.0698 279.723 21.4399 272.016 21.4399 261.133Z"
          fill="#2E2E2E"
        />
      </g>
      <g opacity="0.82" filter="url(#filter2_d_4_1972)">
        <path
          d="M61.4399 274.479V115.597C61.4399 102.446 74.3621 93.188 86.8144 97.417L201.054 136.216C208.842 138.86 214.08 146.171 214.08 154.396V237.118C214.08 245.422 208.741 252.785 200.848 255.367L86.6081 292.728C74.1957 296.788 61.4399 287.539 61.4399 274.479Z"
          fill="#2E2E2E"
        />
      </g>
      <g opacity="0.92">
        <g opacity="0.27" filter="url(#filter3_f_4_1972)">
          <circle cx="148.442" cy="201" r="44" fill="#FD3D84" />
        </g>
        <g filter="url(#filter4_di_4_1972)">
          <path
            d="M127.841 281.152V109.03C127.841 94.7833 141.84 84.7534 155.33 89.3349L279.089 131.367C287.526 134.232 293.201 142.152 293.201 151.062V240.677C293.201 249.674 287.417 257.651 278.866 260.447L155.106 300.922C141.659 305.32 127.841 295.3 127.841 281.152Z"
            fill="#2E2E2E"
          />
        </g>
        <path
          opacity="0.47"
          d="M194.661 136.643L157.1 173.986C156.346 174.735 155.922 175.754 155.922 176.818V239.177C155.922 241.613 158.083 243.481 160.492 243.129L245.065 230.776C247.027 230.489 248.482 228.807 248.482 226.824V180.92C248.482 179.891 248.086 178.904 247.376 178.159C234.319 164.468 214.739 142.991 208.759 136.643C202.607 130.112 196.797 133.921 194.661 136.643Z"
          fill="#D9D9D9"
        />
        <path
          d="M207.143 136.643L169.581 173.986C168.827 174.735 168.403 175.754 168.403 176.818V239.177C168.403 241.613 170.564 243.481 172.974 243.129L257.547 230.776C259.509 230.489 260.963 228.807 260.963 226.824V180.92C260.963 179.891 260.568 178.904 259.857 178.159C246.8 164.468 227.221 142.991 221.24 136.643C215.089 130.112 209.279 133.921 207.143 136.643Z"
          fill="#919191"
        />
      </g>
      <g opacity="0.38" filter="url(#filter5_di_4_1972)">
        <path
          d="M711.2 261.133V128.731C711.2 117.772 700.432 110.057 690.055 113.581L594.855 145.913C588.365 148.117 584 154.209 584 161.063V229.998C584 236.918 588.449 243.054 595.027 245.206L690.227 276.34C700.57 279.723 711.2 272.016 711.2 261.133Z"
          fill="#2E2E2E"
        />
      </g>
      <g opacity="0.82" filter="url(#filter6_d_4_1972)">
        <path
          d="M671.2 274.479V115.597C671.2 102.446 658.278 93.188 645.826 97.417L531.586 136.216C523.798 138.86 518.56 146.171 518.56 154.396V237.118C518.56 245.422 523.899 252.785 531.792 255.367L646.032 292.728C658.444 296.788 671.2 287.539 671.2 274.479Z"
          fill="#2E2E2E"
        />
      </g>
      <g opacity="0.92">
        <g opacity="0.27" filter="url(#filter7_f_4_1972)">
          <circle cx="584.441" cy="194" r="44" fill="#FD3D84" />
        </g>
        <g filter="url(#filter8_di_4_1972)">
          <path
            d="M604.8 281.152V109.03C604.8 94.7833 590.801 84.7534 577.311 89.3349L453.551 131.367C445.114 134.232 439.44 142.152 439.44 151.062V240.677C439.44 249.674 445.224 257.651 453.774 260.447L577.534 300.922C590.981 305.32 604.8 295.3 604.8 281.152Z"
            fill="#2E2E2E"
          />
        </g>
        <path
          opacity="0.47"
          d="M537.979 136.643L575.541 173.986C576.295 174.735 576.719 175.754 576.719 176.818V239.177C576.719 241.613 574.557 243.481 572.148 243.129L487.575 230.776C485.613 230.489 484.159 228.807 484.159 226.824V180.92C484.159 179.891 484.554 178.904 485.264 178.159C498.321 164.468 517.901 142.991 523.881 136.643C530.033 130.112 535.843 133.921 537.979 136.643Z"
          fill="#0F0F0F"
        />
        <path
          d="M525.498 136.643L563.059 173.986C563.813 174.735 564.237 175.754 564.237 176.818V239.177C564.237 241.613 562.076 243.481 559.666 243.129L475.094 230.776C473.132 230.489 471.677 228.807 471.677 226.824V180.92C471.677 179.891 472.073 178.904 472.783 178.159C485.84 164.468 505.42 142.991 511.4 136.643C517.552 130.112 523.362 133.921 525.498 136.643Z"
          fill="#0F0F0F"
        />
      </g>
      <path
        d="M294.441 193.5H437.941"
        stroke="#FD3D84"
        strokeWidth="1.2"
        opacity="0.8"
      />
      <circle cx="294.441" cy="193.5" r="2.7" fill="#FD3D84" />
      <circle cx="437.941" cy="193.5" r="2.7" fill="#FD3D84" />

      <motion.g
        animate={{ x: [-56, 56], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 3.4,
          ease: "linear",
          repeat: Infinity,
          times: [0, 0.16, 0.95, 1],
        }}
      >
        <circle cx="365.441" cy="193.5" r="16" fill="#FD3D84" />
        <circle cx="365.441" cy="193.5" r="11" fill="#171717" />
      </motion.g>
      <defs>
        <filter
          id="filter0_f_4_1972"
          x="180.441"
          y="0"
          width="376"
          height="376"
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
            stdDeviation="50"
            result="effect1_foregroundBlur_4_1972"
          />
        </filter>
        <filter
          id="filter1_di_4_1972"
          x="-5.91278e-05"
          y="94.4783"
          width="170.08"
          height="207.306"
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
          <feOffset dy="3.2" />
          <feGaussianBlur stdDeviation="10.72" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0557691 0 0 0 0 0.0557691 0 0 0 0 0.0557691 0 0 0 0.52 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4_1972"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4_1972"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3.2" />
          <feGaussianBlur stdDeviation="10.32" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.37 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_4_1972"
          />
        </filter>
        <filter
          id="filter2_d_4_1972"
          x="35.7119"
          y="74.4938"
          width="204.096"
          height="248.768"
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
          <feOffset dy="3.84" />
          <feGaussianBlur stdDeviation="12.864" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0557691 0 0 0 0 0.0557691 0 0 0 0 0.0557691 0 0 0 0.52 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4_1972"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4_1972"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_f_4_1972"
          x="54.4417"
          y="107"
          width="188"
          height="188"
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
            stdDeviation="25"
            result="effect1_foregroundBlur_4_1972"
          />
        </filter>
        <filter
          id="filter4_di_4_1972"
          x="99.9686"
          y="64.5019"
          width="221.104"
          height="269.498"
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
          <feOffset dy="4.16" />
          <feGaussianBlur stdDeviation="13.936" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0557691 0 0 0 0 0.0557691 0 0 0 0 0.0557691 0 0 0 0.52 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4_1972"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4_1972"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4.16" />
          <feGaussianBlur stdDeviation="13.416" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.37 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_4_1972"
          />
        </filter>
        <filter
          id="filter5_di_4_1972"
          x="562.56"
          y="94.4783"
          width="170.08"
          height="207.306"
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
          <feOffset dy="3.2" />
          <feGaussianBlur stdDeviation="10.72" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0557691 0 0 0 0 0.0557691 0 0 0 0 0.0557691 0 0 0 0.52 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4_1972"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4_1972"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3.2" />
          <feGaussianBlur stdDeviation="10.32" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.37 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_4_1972"
          />
        </filter>
        <filter
          id="filter6_d_4_1972"
          x="492.832"
          y="74.4938"
          width="204.096"
          height="248.768"
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
          <feOffset dy="3.84" />
          <feGaussianBlur stdDeviation="12.864" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0557691 0 0 0 0 0.0557691 0 0 0 0 0.0557691 0 0 0 0.52 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4_1972"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4_1972"
            result="shape"
          />
        </filter>
        <filter
          id="filter7_f_4_1972"
          x="490.441"
          y="99.9995"
          width="188"
          height="188"
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
            stdDeviation="25"
            result="effect1_foregroundBlur_4_1972"
          />
        </filter>
        <filter
          id="filter8_di_4_1972"
          x="411.568"
          y="64.5019"
          width="221.104"
          height="269.498"
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
          <feOffset dy="4.16" />
          <feGaussianBlur stdDeviation="13.936" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0557691 0 0 0 0 0.0557691 0 0 0 0 0.0557691 0 0 0 0.52 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4_1972"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4_1972"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4.16" />
          <feGaussianBlur stdDeviation="13.416" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.37 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_4_1972"
          />
        </filter>
      </defs>
    </svg>
  );
};

const BARS = [
  { height: 70,  value: 0.9 },
  { height: 107, value: 1.4 },
  { height: 160, value: 2.0 },
  { height: 125, value: 1.6 },
  { height: 145, value: 1.8 },
];

const BAR_W = 28;
const BAR_GAP = 12;
const TOTAL_W = BARS.length * BAR_W + (BARS.length - 1) * BAR_GAP;
const MAX_H = Math.max(...BARS.map((b) => b.height));
const TICKER_W = 60;

const Graph = () => {
  const [activeBar, setActiveBar] = React.useState(2);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setActiveBar((prev) => (prev + 1) % BARS.length);
    }, 1500);
    return () => clearTimeout(timer);
  }, [activeBar]);

  const barLeft = (i: number) => i * (BAR_W + BAR_GAP);
  const barCenter = (i: number) => barLeft(i) + BAR_W / 2;
  const tickerLeft = barCenter(activeBar) - TICKER_W / 2;
  const tickerBottom = BARS[activeBar].height + 10;

  return (
    <div
      className="relative"
      style={{ width: TOTAL_W, height: MAX_H, overflow: "visible" }}
    >
      {/* Bars */}
      {BARS.map((bar, i) => (
        <div
          key={i}
          className="absolute bottom-0 rounded-full overflow-hidden"
          style={{ left: barLeft(i), width: BAR_W, height: bar.height }}
        >
          {/* Gray base */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(to right, #4C4C4C, #252525)",
              opacity: 1,
            }}
          />
          {/* Pink overlay */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "linear-gradient(to bottom, #F2689C, #FA0B65)" }}
            animate={{ opacity: activeBar === i ? 1 : 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          />
        </div>
      ))}

      {/* Static centered glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: (TOTAL_W - (BAR_W + 20)) / 2,
          top: -10,
          width: BAR_W + 20,
          height: 80,
          background: "#FD3D84",
          filter: "blur(50px)",
        }}
      />

      {/* Ticker */}
      <motion.div
        className="absolute flex flex-col items-center pointer-events-none"
        style={{ width: TICKER_W }}
        animate={{ left: tickerLeft, bottom: tickerBottom }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Badge */}
        <div
          className="flex items-center justify-center rounded-xl font-bold text-white"
          style={{ width: TICKER_W, height: 32, background: "#FD3D84", fontSize: 14 }}
        >
          <NumberFlow
            value={BARS[activeBar].value}
            format={{ maximumFractionDigits: 1 }}
            suffix="k"
            style={{ color: "white", fontWeight: 700, fontSize: 14 }}
          />
        </div>
        {/* Downward triangle pointer */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderTop: "8px solid #FD3D84",
          }}
        />
      </motion.div>
    </div>
  );
};

const Globe = () => {
  const basePillWidth = 119;
  const [activePhrase, setActivePhrase] = React.useState(0);

  const [phraseWidths, setPhraseWidths] = React.useState(() =>
    GLOBE_PHRASES.map(() => basePillWidth)
  );

  React.useEffect(() => {
    if (typeof document === "undefined") return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.font = "700 15px Inter, sans-serif";
    const measuredWidths = GLOBE_PHRASES.map((phrase) =>
      Math.max(90, Math.ceil(ctx.measureText(phrase).width) + 34)
    );

    setPhraseWidths(measuredWidths);
  }, []);

  const currentPillWidth = phraseWidths[activePhrase] ?? basePillWidth;
  const currentPillX = (basePillWidth - currentPillWidth) / 2;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActivePhrase((prev) => (prev + 1) % GLOBE_PHRASES.length);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      width="258"
      height="226"
      viewBox="0 0 258 226"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-40 sm:w-50 md:w-64.5 h-auto"
      style={{ overflow: "visible" }}
    >
      <motion.g
        filter="url(#filter0_f_667_17)"
        animate={{ scale: [0.98, 1.04, 0.98], opacity: [0.4, 0.55, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "133px 109px" }}
      >
        <g filter="url(#filter1_d_667_17)">
          <circle cx="133" cy="108.9" r="93.5" fill="#1F1F1F" />
        </g>
        <path
          d="M132.002 108.902C185.202 85.7016 154.169 39.2349 132.002 18.9016C101.001 5.90158 23.0025 53.9016 42.0025 127.902C57.2025 187.102 107.669 202.235 132.002 202.902C109.835 181.235 78.802 132.102 132.002 108.902Z"
          fill="#292929"
        />
      </motion.g>
      <motion.g
        filter="url(#filter2_i_667_17)"
        animate={{ y: [0, -3, 0], rotate: [0, 1.2, 0, -1.2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "133px 109px" }}
      >
        <g filter="url(#filter3_d_667_17)">
          <circle
            cx="133"
            cy="100.9"
            r="85"
            fill="#1F1F1F"
            fillOpacity="0.1"
            shapeRendering="crispEdges"
          />
        </g>
        <path
          d="M132.002 108.902C185.202 85.7016 154.169 39.2349 132.002 18.9016C101.001 5.90158 23.0025 53.9016 42.0025 127.902C57.2025 187.102 107.669 202.235 132.002 202.902C109.835 181.235 78.802 132.102 132.002 108.902Z"
          fill="#292929"
          fillOpacity="0.1"
        />
      </motion.g>
      <motion.g
        filter="url(#filter4_ii_667_17)"
        animate={{ y: [0, -2, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "59.5px 57px" }}
      >
        <motion.rect
          y="36.9004"
          height="41"
          rx="20.5"
          fill="#FD3D84"
          animate={{ x: currentPillX, width: currentPillWidth }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        />
        <motion.foreignObject
          x="0"
          y="36.9004"
          height="41"
          animate={{ x: currentPillX, width: currentPillWidth }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "0.01em",
              fontFamily: "Inter, sans-serif",
              pointerEvents: "none",
              userSelect: "none",
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={GLOBE_PHRASES[activePhrase]}
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ margin: 0, lineHeight: 1, whiteSpace: "nowrap" }}
              >
                {GLOBE_PHRASES[activePhrase]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.foreignObject>
      </motion.g>
      <motion.g
        filter="url(#filter5_i_667_17)"
        animate={{ y: [0, -6, 0], x: [0, -2, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="245" cy="162.9" r="13" fill="#F44386" />
      </motion.g>
      <motion.g
        filter="url(#filter6_i_667_17)"
        animate={{ y: [0, 4, 0], x: [0, 1.5, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <circle cx="10.5" cy="142.4" r="7.5" fill="#F44386" />
      </motion.g>
      <motion.g
        filter="url(#filter7_i_667_17)"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        <circle cx="104.5" cy="102.4" r="4.5" fill="#F44386" />
      </motion.g>
      <motion.g
        filter="url(#filter8_i_667_17)"
        animate={{ y: [0, -5, 0], x: [0, 1, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        <circle cx="197.5" cy="32.4004" r="4.5" fill="#F44386" />
      </motion.g>
      <defs>
        <filter
          id="filter0_f_667_17"
          x="32.8586"
          y="9.70039"
          width="199.341"
          height="199.401"
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
            stdDeviation="3.1"
            result="effect1_foregroundBlur_667_17"
          />
        </filter>
        <filter
          id="filter1_d_667_17"
          x="36"
          y="15.9004"
          width="194"
          height="194"
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
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_667_17"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_667_17"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_i_667_17"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          filterUnits="objectBoundingBox"
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
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="11.05" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.736538 0 0 0 0 0.701836 0 0 0 0 0.701836 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_667_17"
          />
        </filter>
        <filter
          id="filter3_d_667_17"
          x="20.1"
          y="0.000391006"
          width="225.8"
          height="225.8"
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
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="9.95" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_667_17"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_667_17"
            result="shape"
          />
        </filter>
        <filter
          id="filter4_ii_667_17"
          x="-40"
          y="28.9004"
          width="199"
          height="66.9"
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
          <feOffset dy="10" />
          <feGaussianBlur stdDeviation="4.95" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_667_17"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-4" />
          <feGaussianBlur stdDeviation="4.35" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.62 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_667_17"
            result="effect2_innerShadow_667_17"
          />
        </filter>
        <filter
          id="filter5_i_667_17"
          x="232"
          y="149.9"
          width="28"
          height="28"
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
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.48 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_667_17"
          />
        </filter>
        <filter
          id="filter6_i_667_17"
          x="3"
          y="134.9"
          width="16.6"
          height="16.6"
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
          <feOffset dx="1.6" dy="1.6" />
          <feGaussianBlur stdDeviation="1.6" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.48 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_667_17"
          />
        </filter>
        <filter
          id="filter7_i_667_17"
          x="100"
          y="97.9004"
          width="10.6"
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
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1.6" dy="1.6" />
          <feGaussianBlur stdDeviation="1.6" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.48 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_667_17"
          />
        </filter>
        <filter
          id="filter8_i_667_17"
          x="193"
          y="27.9004"
          width="10.6"
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
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1.6" dy="1.6" />
          <feGaussianBlur stdDeviation="1.6" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.48 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_667_17"
          />
        </filter>
      </defs>
    </svg>
  );
};

const Tools = () => {
  const profileX = [0, -15, 20, -8, 0];
  const profileY = [0, -15, 18, 11, 0];
  const searchX = [0, 16, -15, 18, 0];
  const searchY = [0, 20, -15, 25, 0];

  return (
    <svg
      width="430"
      height="360"
      viewBox="0 0 430 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-1/2 -translate-x-1/2 -top-16 sm:-top-8 md:-top-12 w-[105%] sm:w-full md:w-[95%] max-w-107.5 overflow-visible"
      style={{ overflow: "visible" }}
    >
      <g opacity="0.44" filter="url(#filter0_f_4_2045)">
        <circle cx="208" cy="160" r="100" fill="#FD3D84" />
      </g>
      <g filter="url(#filter1_di_4_2045)">
        <circle cx="208" cy="156" r="104" fill="#252424" />
      </g>
      <rect x="147" y="95" width="121" height="121" rx="20" fill="#6B1938" />
      <g filter="url(#filter2_i_4_2045)">
        <rect x="147" y="95" width="121" height="106" rx="20" fill="#F44386" />
      </g>
      <g filter="url(#filter3_d_4_2045)">
        <path
          d="M203.992 116.551L174.085 142.847C173.395 143.453 173 144.328 173 145.246V179.605C173 181.37 174.43 182.8 176.195 182.8H240.205C241.97 182.8 243.4 181.37 243.4 179.605V145.199C243.4 144.308 243.027 143.458 242.375 142.851C232.152 133.337 220.031 121.021 215.27 116.551C210.348 111.931 205.701 114.626 203.992 116.551Z"
          fill="url(#paint0_linear_4_2045)"
        />
      </g>
      <motion.g
        filter="url(#filter4_i_4_2045)"
        animate={{ x: profileX, y: profileY }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="35.5" cy="190.5" r="35.5" fill="#232323" />
        <circle
          cx="36.0352"
          cy="180.5"
          r="8.5"
          fill="url(#paint1_linear_4_2045)"
        />
        <path
          d="M37.035 195.5C23.5352 194.5 21.7016 205.667 22.035 210H49.0345C49.5345 205.167 47.5345 195.5 37.035 195.5Z"
          fill="url(#paint2_linear_4_2045)"
        />
      </motion.g>
      <motion.g
        filter="url(#filter5_i_4_2045)"
        animate={{ x: searchX, y: searchY }}
        transition={{
          duration: 8.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
      >
        <circle cx="394.5" cy="113.5" r="35.5" fill="#232323" />
        <path
          d="M388.959 96.7344C395.918 96.7344 401.558 102.375 401.559 109.334C401.559 110.338 401.44 111.315 401.218 112.252C401.265 112.273 401.312 112.295 401.358 112.32L417.889 121.483C418.758 121.965 419.072 123.06 418.59 123.93L416.845 127.078C416.363 127.948 415.267 128.262 414.397 127.78L397.867 118.617C397.785 118.572 397.71 118.519 397.638 118.463C395.378 120.612 392.324 121.935 388.959 121.935C382 121.935 376.359 116.293 376.359 109.334C376.36 102.375 382 96.7344 388.959 96.7344ZM388.959 99.4521C383.502 99.4522 379.077 103.877 379.077 109.334C379.077 114.792 383.501 119.216 388.959 119.216C394.417 119.216 398.841 114.792 398.841 109.334C398.841 103.877 394.416 99.4521 388.959 99.4521Z"
          fill="url(#paint3_linear_4_2045)"
        />
      </motion.g>
      <defs>
        <filter
          id="filter0_f_4_2045"
          x="8"
          y="-40"
          width="400"
          height="400"
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
            stdDeviation="50"
            result="effect1_foregroundBlur_4_2045"
          />
        </filter>
        <filter
          id="filter1_di_4_2045"
          x="83.3"
          y="35.3"
          width="249.4"
          height="249.4"
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
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="10.35" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4_2045"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4_2045"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="11.4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.12 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_4_2045"
          />
        </filter>
        <filter
          id="filter2_i_4_2045"
          x="147"
          y="91"
          width="121"
          height="110"
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
          <feOffset dy="-4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.825 0 0 0 0 0.825 0 0 0 0 0.825 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_4_2045"
          />
        </filter>
        <filter
          id="filter3_d_4_2045"
          x="154.8"
          y="99.8"
          width="106.8"
          height="105.2"
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
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="9.1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4_2045"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4_2045"
            result="shape"
          />
        </filter>
        <filter
          id="filter4_i_4_2045"
          x="0"
          y="155"
          width="71"
          height="71"
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
          <feGaussianBlur stdDeviation="11.15" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.775 0 0 0 0 0.775 0 0 0 0 0.775 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_4_2045"
          />
        </filter>
        <filter
          id="filter5_i_4_2045"
          x="359"
          y="78"
          width="71"
          height="71"
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
          <feGaussianBlur stdDeviation="11.15" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.775 0 0 0 0 0.775 0 0 0 0 0.775 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_4_2045"
          />
        </filter>
        <linearGradient
          id="paint0_linear_4_2045"
          x1="208.2"
          y1="114"
          x2="208.2"
          y2="182.8"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F2F2F2" />
          <stop offset="1" stopColor="#FE84B2" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4_2045"
          x1="36.0352"
          y1="172"
          x2="36.0352"
          y2="189"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EB4181" />
          <stop offset="1" stopColor="#360316" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_4_2045"
          x1="35.5522"
          y1="195.438"
          x2="35.5522"
          y2="210"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EB4181" />
          <stop offset="1" stopColor="#360316" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_4_2045"
          x1="388.959"
          y1="99.4345"
          x2="391.66"
          y2="134.536"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EB4181" />
          <stop offset="1" stopColor="#360316" />
        </linearGradient>
      </defs>
    </svg>
  );
};
