"use client";
import React from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Bento7 = () => {
  const [status, setStatus] = React.useState<"loading" | "complete">("loading");

  React.useEffect(() => {
    const cycle = setInterval(() => {
      setStatus((prev) => (prev === "loading" ? "complete" : "loading"));
    }, 3000);
    return () => clearInterval(cycle);
  }, []);

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-[#1B1B1B] relative p-8`}
    >
    

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {/* card 1 */}
        <Card className="w-full max-w-[340px] h-120 rounded-3xl bg-linear-to-br from-[#304043] via-[#454C4D] to-[#273334] flex flex-col relative overflow-hidden p-0 gap-0 ring-0 shadow-none text-white">
          <CardContent className="w-full h-full flex flex-col items-center justify-center relative p-0">
            <div className="w-40 h-25 flex relative bg-linear-to-br from-[#273439] to-[#2C3D42] rounded-[30px] shadow-[inset_3px_2px_4px_1px_rgba(255,255,255,0.25),0px_22px_28px_-4px_rgba(0,0,0,0.3)] border-3 border-[#1B2526]">
              <Wires className="absolute top-1/2 -translate-y-1/2 -right-25" />
              <Wires className="absolute top-1/2 -translate-y-1/2 -left-22 -scale-x-100" />

              <div className="p-px rounded-full bg-linear-to-br from-[#69797F] to-[#27353A] w-fit my-auto ml-6">
                <div className="size-10 rounded-full bg-linear-to-br from-[#535E61] to-[#313E40] flex items-center justify-center">
                  <CheckIcon className="size-8" status={status} />
                </div>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 -right-6 p-1 flex items-center justify-center h-fit bg-linear-to-br from-[#273439] to-[#2C3D42] border border-[#58696F] rounded-2xl  shadow-[0px_22px_28px_-4px_rgba(0,0,0,0.3),inset_-1px_0px_12.6px_1px_rgba(0,0,0,0.3)]">
                <div className="relative w-full h-full flex items-center justify-center">
                  <motion.div
                    animate={{ x: status === "loading" ? -43 : 0 }}
                    transition={{ type: "spring", bounce: 0.3, duration: 1 }}
                    className="absolute px-[22px] py-7 top-1/2 -translate-y-1/2 right-0 bg-[#273439] shadow-[0px_22px_28px_-4px_rgba(0,0,0,0.3),inset_-1px_0px_12.6px_1px_rgba(0,0,0,0.3)] rounded-xl border border-[#A7B5BA]"
                  />
                  <div className="text-white text-xl px-4 py-4 relative z-40">
                    A
                  </div>
                  <div className="text-white text-xl px-4 py-4 relative z-40">
                    B
                  </div>
                </div>
              </div>
            </div>
            <div className="w-15 h-8 bg-linear-to-b from-[#131617] to-[#283133]"></div>
          </CardContent>

          <CardHeader className="mt-auto w-full p-8">
            <CardTitle className="text-white text-lg font-medium">AI Driven Assist</CardTitle>
            <CardDescription className="text-md text-white font-thin">
              Enhance your design projects with AI tools for creativity and
              efficiency.{" "}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Card 2 */}
        <Card className="w-full max-w-[340px] h-120 rounded-3xl bg-linear-to-br from-[#304043] via-[#454C4D] to-[#273334] flex flex-col relative p-0 gap-0 ring-0 shadow-none text-white">
          <CardContent className="w-full h-full flex items-center justify-center absolute left-1/2 -translate-x-1/2 -top-16 p-0">
            <Cognito />
          </CardContent>
          <CardHeader className="mt-auto w-full p-8">
            <CardTitle className="text-white text-lg font-medium">Cognito Core</CardTitle>
            <CardDescription className="text-md text-white font-thin">
              The intelligent hub that unifies, monitors, and autonomously
              tunes.{" "}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Card 3 */}
        <Card className="w-full max-w-[340px] h-120 rounded-3xl bg-linear-to-br from-[#304043] via-[#454C4D] to-[#273334] flex flex-col md:col-span-2 lg:col-span-1 p-0 gap-0 ring-0 shadow-none text-white">
          <CardContent className="w-full h-full flex items-center justify-center relative p-0">
            <Star />

            <div className="absolute flex flex-col items-center gap-8">
              <div className="px-8 py-2 border border-[#69797F] bg-linear-to-br from-[#535E61] to-[#313E40] shadow-[0px_18px_14px_-3px_rgba(0,0,0,0.4)] rounded-full">
                <StarIcon className="size-4" />
              </div>
              <div className="w-40 h-35 flex items-center justify-between p-4 bg-linear-to-br from-[#273439] to-[#2C3D42] rounded-[36px] shadow-[inset_3px_2px_4px_1px_rgba(255,255,255,0.25),0px_22px_28px_-4px_rgba(0,0,0,0.3)] border-3 border-[#1B2526] ">
                <div className="w-15 h-18 rounded-xl bg-linear-to-br from-[#535E61] to-[#313E40] border border-[#69797F] shadow-[0px_18px_14px_-3px_rgba(0,0,0,0.4)]"></div>

                <div className="flex flex-col gap-1 items-center">
                  <div className="w-8 h-1 bg-[#80949A] rounded-full"></div>
                  <div className="w-12 h-1 bg-[#535E61] rounded-full"></div>
                  <div className="w-12 h-1 bg-[#535E61] rounded-full"></div>
                  <div className="w-12 h-1 bg-[#535E61] rounded-full"></div>
                </div>
              </div>

              <div className="px-8 py-2 border border-[#69797F] flex flex-col items-center gap-0.5 bg-linear-to-br from-[#535E61] to-[#313E40] shadow-[0px_18px_14px_-3px_rgba(0,0,0,0.4)] rounded-full">
                <div className="w-8 h-1 bg-[#80949A] rounded-full"></div>
                <div className="w-12 h-1 bg-[#535E61] rounded-full"></div>
              </div>
            </div>
          </CardContent>
          <CardHeader className="mt-auto w-full p-8">
            <CardTitle className="text-white text-lg font-medium">
              System Synergy Engine
            </CardTitle>
            <CardDescription className="text-md text-white font-thin">
              A proactive AI unit that maximizes efficiency and resource
            distribution.{" "}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Bento7;

const CheckIcon = ({
  className,
  status,
}: {
  className?: string;
  status: "loading" | "complete";
}) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {status === "loading" ? (
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <motion.path
            d="M20 6 A 14 14 0 1 1 19.99 6"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0.2 }}
            animate={{ pathLength: [0.1, 0.4, 0.1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M20 6 A 14 14 0 1 1 19.99 6"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ rotate: 120 }}
            initial={{ pathLength: 0.1 }}
            animate={{ pathLength: [0.05, 0.2, 0.05] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
        </motion.g>
      ) : (
        <motion.path
          d="M10 20L16.6667 26.6667L30 13.3333"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}
    </svg>
  );
};

const Wires = ({ className }: { className?: string }) => {
  return (
    <svg
      width="97"
      height="85"
      viewBox="0 0 97 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M27.483 25.066H11.5V63.8962H29.1048C37.2896 63.8962 45.0087 67.7037 49.9902 74.1981C54.9717 80.6925 62.6907 84.5 70.8756 84.5H89.5V0.5H72.4974C63.3943 0.5 54.9153 5.12727 49.9902 12.783C45.0651 20.4388 36.5861 25.066 27.483 25.066Z"
        fill="url(#paint0_linear_733_10)"
        stroke="url(#paint1_linear_733_10)"
      />
      <path
        d="M5.88318 39.5H57.0234L71.3923 24.5H92.8077M96.5 62H83.9462L69.9154 45.5H0.948601M95.0231 64.5H54.4077L40.3769 49.5L0.500003 50"
        stroke="#4B5A5D"
        strokeLinecap="round"
      />
      {[
        "M5.88318 39.5H57.0234L71.3923 24.5H92.8077",
        "M96.5 62H83.9462L69.9154 45.5H0.948601",
        "M95.0231 64.5H54.4077L40.3769 49.5L0.500003 50",
      ].map((d, i) => (
        <React.Fragment key={i}>
          <motion.path
            d={d}
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ filter: "url(#pill-glow)" }}
            initial={{ pathLength: 0.1, pathOffset: 0 }}
            animate={{ pathOffset: 1 }}
            transition={{
              duration: 2.5 + i * 0.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.8,
            }}
          />
          <motion.path
            d={d}
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ filter: "url(#pill-glow)" }}
            initial={{ pathLength: 0.1, pathOffset: 0 }}
            animate={{ pathOffset: 1 }}
            transition={{
              duration: 2.5 + i * 0.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.8 + 1.5,
            }}
          />
        </React.Fragment>
      ))}
      <defs>
        <linearGradient
          id="paint0_linear_733_10"
          x1="-4.87037"
          y1="47.2547"
          x2="76.0172"
          y2="46.9237"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B8B8B8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#313F42" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_733_10"
          x1="11.3418"
          y1="45.9426"
          x2="74.6261"
          y2="47.5446"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7E9295" />
          <stop offset="1" stopColor="#313F41" stopOpacity="0" />
        </linearGradient>
        <filter id="pill-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

const Star = ({ className }: { className?: string }) => {
  return (
    <svg
      width="290"
      height="290"
      viewBox="0 0 290 290"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M133.668 8.33545C137.534 -2.11196 152.31 -2.11197 156.176 8.33545L188.112 94.6413C189.328 97.926 191.917 100.516 195.202 101.731L281.508 133.667C291.955 137.533 291.955 152.31 281.508 156.176L195.202 188.112C191.917 189.327 189.328 191.917 188.112 195.201L156.176 281.507C152.31 291.955 137.534 291.955 133.668 281.507L101.732 195.201C100.516 191.917 97.9264 189.327 94.6418 188.112L8.33594 156.176C-2.11148 152.31 -2.11148 137.533 8.33594 133.667L94.6418 101.731C97.9264 100.516 100.516 97.926 101.732 94.6413L133.668 8.33545Z"
        fill="url(#paint0_linear_733_69)"
        fillOpacity="0.25"
        stroke="url(#paint1_linear_733_69)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_733_69"
          x1="382.021"
          y1="163.827"
          x2="35.657"
          y2="162.3"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B8B8B8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#313F42" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_733_69"
          x1="301.613"
          y1="158.61"
          x2="46.0508"
          y2="163.455"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7E9295" />
          <stop offset="1" stopColor="#313F41" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const StarIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 0L7.62054 4.37946L12 6L7.62054 7.62054L6 12L4.37946 7.62054L0 6L4.37946 4.37946L6 0Z"
        fill="#A1ACB1"
      />
      <path
        d="M7.15137 4.55273L7.23145 4.76855L7.44727 4.84863L10.5586 6L7.44727 7.15137L7.23145 7.23145L7.15137 7.44727L6 10.5586L4.84863 7.44727L4.76855 7.23145L4.55273 7.15137L1.44043 6L4.55273 4.84863L4.76855 4.76855L4.84863 4.55273L6 1.44043L7.15137 4.55273Z"
        stroke="#BFB9B9"
        strokeOpacity="0.15"
      />
    </svg>
  );
};

const Cognito = ({ className }: { className?: string }) => {
  return (
    <svg
      width="342"
      height="367"
      viewBox="0 0 342 367"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M173.017 117L173.017 60.0005L188.017 43.9851L188.017 20.1159M150.517 16.0005L150.517 29.9928L167.017 45.6313L167.017 122.5M148.017 17.6466L148.017 62.9159L163.017 78.5543L162.517 123"
        stroke="#4B5A5D"
        strokeLinecap="round"
      />
      {[
        "M173.017 117L173.017 60.0005L188.017 43.9851L188.017 20.1159",
        "M150.517 16.0005L150.517 29.9928L167.017 45.6313L167.017 122.5",
        "M148.017 17.6466L148.017 62.9159L163.017 78.5543L162.517 123",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ filter: "url(#pill-glow-cognito)" }}
          initial={{ pathLength: 0.15, pathOffset: 0 }}
          animate={{ pathOffset: 1 }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.4,
          }}
        />
      ))}
      <path
        d="M163.019 265L163.019 322L148.019 338.016L148.019 361.885M185.519 366L185.519 352.008L169.019 336.37L169.019 259.5M188.019 364.354L188.019 319.085L173.019 303.447L173.519 259"
        stroke="#4B5A5D"
        strokeLinecap="round"
      />
      {[
        "M163.019 265L163.019 322L148.019 338.016L148.019 361.885",
        "M185.519 366L185.519 352.008L169.019 336.37L169.019 259.5",
        "M188.019 364.354L188.019 319.085L173.019 303.447L173.519 259",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ filter: "url(#pill-glow-cognito)" }}
          initial={{ pathLength: 0.15, pathOffset: 0 }}
          animate={{ pathOffset: 1 }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.4,
          }}
        />
      ))}
      <path
        d="M219.058 62.4092C227.632 62.4092 235.555 66.9836 239.843 74.4092L288.395 158.505C292.682 165.931 292.682 175.08 288.395 182.505L239.842 266.601C235.555 274.027 227.632 278.601 219.058 278.601L121.952 278.601C113.378 278.601 105.455 274.027 101.168 266.601L52.6148 182.505C48.3277 175.08 48.3277 165.931 52.6148 158.505L101.168 74.4092C105.455 66.9836 113.378 62.4092 121.952 62.4092L219.058 62.4092Z"
        fill="url(#paint0_linear_733_41)"
        fillOpacity="0.25"
        stroke="url(#paint1_linear_733_41)"
      />
      <path
        d="M78.9419 182.832C74.6547 175.406 74.6547 166.258 78.9419 158.832L114.335 97.5285C118.623 90.1029 126.546 85.5285 135.12 85.5285L205.907 85.5285C214.482 85.5285 222.405 90.1029 226.692 97.5285L262.085 158.832C266.373 166.258 266.373 175.406 262.085 182.832L226.692 244.136C222.405 251.561 214.482 256.136 205.907 256.136L135.12 256.136C126.546 256.136 118.623 251.561 114.335 244.136L78.9419 182.832Z"
        fill="url(#paint2_linear_733_41)"
        fillOpacity="0.25"
        stroke="url(#paint3_linear_733_41)"
      />
      <g filter="url(#filter0_di_733_41)">
        <path
          d="M108.942 178.832C104.655 171.406 104.655 162.258 108.942 154.832L128.335 121.241C132.623 113.816 140.546 109.241 149.12 109.241L187.907 109.241C196.482 109.241 204.405 113.816 208.692 121.241L228.085 154.832C232.373 162.258 232.373 171.406 228.085 178.832L208.692 212.423C204.405 219.848 196.482 224.423 187.907 224.423L149.12 224.423C140.546 224.423 132.623 219.848 128.335 212.423L108.942 178.832Z"
          fill="url(#paint4_linear_733_41)"
        />
        <path
          d="M108.942 178.832C104.655 171.406 104.655 162.258 108.942 154.832L128.335 121.241C132.623 113.816 140.546 109.241 149.12 109.241L187.907 109.241C196.482 109.241 204.405 113.816 208.692 121.241L228.085 154.832C232.373 162.258 232.373 171.406 228.085 178.832L208.692 212.423C204.405 219.848 196.482 224.423 187.907 224.423L149.12 224.423C140.546 224.423 132.623 219.848 128.335 212.423L108.942 178.832Z"
          stroke="#1B2526"
          strokeWidth="3"
        />
      </g>
      <g filter="url(#filter1_d_733_41)">
        <g filter="url(#filter2_di_733_41)">
          <path
            d="M147.605 172.47C145.64 169.067 145.64 164.874 147.605 161.47L153.401 151.431C155.366 148.028 158.997 145.931 162.927 145.931L174.519 145.931C178.449 145.931 182.081 148.028 184.046 151.431L189.842 161.47C191.807 164.874 191.807 169.067 189.842 172.47L184.046 182.509C182.081 185.913 178.449 188.009 174.519 188.009L162.927 188.009C158.997 188.009 155.366 185.913 153.401 182.509L147.605 172.47Z"
            fill="url(#paint5_linear_733_41)"
          />
          <path
            d="M147.172 172.72C145.118 169.162 145.118 164.778 147.172 161.22L152.968 151.181C155.022 147.623 158.819 145.431 162.928 145.431L174.52 145.431C178.628 145.431 182.424 147.623 184.479 151.181L190.274 161.22C192.329 164.778 192.329 169.162 190.274 172.72L184.479 182.759C182.424 186.317 178.628 188.509 174.52 188.509L162.928 188.509C158.819 188.509 155.022 186.317 152.968 182.759L147.172 172.72Z"
            stroke="url(#paint6_linear_733_41)"
          />
        </g>
        <g filter="url(#filter3_d_733_41)">
          <rect
            x="155.945"
            y="172.998"
            width="24.7144"
            height="2.64797"
            rx="1.32398"
            fill="#80949A"
          />
        </g>
        <g filter="url(#filter4_d_733_41)">
          <rect
            x="155.945"
            y="168.584"
            width="24.7144"
            height="2.64797"
            rx="1.32398"
            fill="#80949A"
          />
        </g>
        <g filter="url(#filter5_d_733_41)">
          <rect
            x="155.945"
            y="164.171"
            width="24.7144"
            height="2.64797"
            rx="1.32398"
            fill="#80949A"
          />
        </g>
        <g filter="url(#filter6_d_733_41)">
          <rect
            x="160.358"
            y="159.757"
            width="15.8878"
            height="2.64797"
            rx="1.32398"
            fill="#80949A"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_di_733_41"
          x="80.2266"
          y="105.741"
          width="176.574"
          height="166.182"
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
          <feMorphology
            radius="4"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_733_41"
          />
          <feOffset dy="22" />
          <feGaussianBlur stdDeviation="14" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_733_41"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_733_41"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="erode"
            in="SourceAlpha"
            result="effect2_innerShadow_733_41"
          />
          <feOffset dx="3" dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_733_41"
          />
        </filter>
        <filter
          id="filter1_d_733_41"
          x="134.132"
          y="144.932"
          width="69.1846"
          height="73.0776"
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
          <feMorphology
            radius="3"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_733_41"
          />
          <feOffset dy="18" />
          <feGaussianBlur stdDeviation="7" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_733_41"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_733_41"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_di_733_41"
          x="121.132"
          y="142.932"
          width="95.1846"
          height="92.0776"
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
          <feMorphology
            radius="4"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_733_41"
          />
          <feOffset dy="22" />
          <feGaussianBlur stdDeviation="14" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_733_41"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_733_41"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="erode"
            in="SourceAlpha"
            result="effect2_innerShadow_733_41"
          />
          <feOffset dx="3" dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_733_41"
          />
        </filter>
        <filter
          id="filter3_d_733_41"
          x="144.945"
          y="172.998"
          width="46.7148"
          height="31.6479"
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
          <feMorphology
            radius="3"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_733_41"
          />
          <feOffset dy="18" />
          <feGaussianBlur stdDeviation="7" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_733_41"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_733_41"
            result="shape"
          />
        </filter>
        <filter
          id="filter4_d_733_41"
          x="144.945"
          y="168.584"
          width="46.7148"
          height="31.6479"
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
          <feMorphology
            radius="3"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_733_41"
          />
          <feOffset dy="18" />
          <feGaussianBlur stdDeviation="7" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_733_41"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_733_41"
            result="shape"
          />
        </filter>
        <filter
          id="filter5_d_733_41"
          x="144.945"
          y="164.171"
          width="46.7148"
          height="31.6479"
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
          <feMorphology
            radius="3"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_733_41"
          />
          <feOffset dy="18" />
          <feGaussianBlur stdDeviation="7" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_733_41"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_733_41"
            result="shape"
          />
        </filter>
        <filter
          id="filter6_d_733_41"
          x="149.358"
          y="159.757"
          width="37.8877"
          height="31.6479"
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
          <feMorphology
            radius="3"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_733_41"
          />
          <feOffset dy="18" />
          <feGaussianBlur stdDeviation="7" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_733_41"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_733_41"
            result="shape"
          />
        </filter>
        <filter
          id="pill-glow-cognito"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient
          id="paint0_linear_733_41"
          x1="316.909"
          y1="271.348"
          x2="93.2853"
          y2="140.921"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B8B8B8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#313F42" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_733_41"
          x1="266.813"
          y1="237.922"
          x2="99.5815"
          y2="145.553"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7E9295" />
          <stop offset="1" stopColor="#313F41" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_733_41"
          x1="181.665"
          y1="30.9864"
          x2="180.764"
          y2="235.279"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B8B8B8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#313F42" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_733_41"
          x1="178.587"
          y1="78.4123"
          x2="181.445"
          y2="229.148"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7E9295" />
          <stop offset="1" stopColor="#313F41" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_733_41"
          x1="153.204"
          y1="210.839"
          x2="174.738"
          y2="130.426"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#273439" />
          <stop offset="1" stopColor="#2C3D42" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_733_41"
          x1="151.515"
          y1="181.648"
          x2="193.017"
          y2="148.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#535E61" />
          <stop offset="1" stopColor="#313E40" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_733_41"
          x1="156.07"
          y1="186.709"
          x2="188.462"
          y2="154.824"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#69797F" />
          <stop offset="1" stopColor="#27353A" />
        </linearGradient>
      </defs>
    </svg>
  );
};