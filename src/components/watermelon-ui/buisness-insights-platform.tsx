"use client";
import React, { useState } from "react";
import { motion, useAnimation, type Variants } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoIosSearch } from "react-icons/io";
import { TbBellRingingFilled } from "react-icons/tb";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

import type { SVGProps } from "react";

const GlowEllipse = (props?: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 896 457"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g style={{ mixBlendMode: "plus-lighter" }} filter="url(#filter0_f)">
        <g filter="url(#filter1_f)" style={{ mixBlendMode: "plus-lighter" }}>
          <ellipse
            cx="283.385"
            cy="-80.5"
            rx="495.838"
            ry="336.633"
            transform="rotate(29.575 283.385 -80.5)"
            fill="#4135B1"
            fillOpacity="0.4"
          />
          <path
            d="M434.727 -347.182C549.28 -282.172 633.914 -192.406 678.894 -101.204C723.96 -9.82492 728.044 79.79 688.529 149.42C649.013 219.051 569.984 261.498 468.424 269.667C367.06 277.819 246.595 251.191 132.042 186.182C17.4892 121.173 -67.1448 31.4067 -112.124 -59.7961C-157.191 -151.175 -161.275 -240.79 -121.759 -310.42C-82.2439 -380.05 -3.21418 -422.498 98.3453 -430.666C199.709 -438.819 320.174 -412.191 434.727 -347.182Z"
            stroke="#9B3FAE"
            strokeWidth="60"
          />
        </g>
      </g>

      <defs>
        <filter
          id="filter0_f"
          x="-328.875"
          y="-612.094"
          width="1224.52"
          height="1063.19"
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
          <feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur" />
        </filter>

        <filter
          id="filter1_f"
          x="-298.875"
          y="-582.094"
          width="1164.52"
          height="1003.19"
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
          <feGaussianBlur stdDeviation="60" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
};

const data = [190, 130, 145, 190, 145, 120, 170];

function ChartsCard() {
  const [hovered, setHovered] = useState(false);

  const containerVariants: Variants = {
    initial: { transition: { staggerChildren: 0.08, staggerDirection: -1 } },
    hover: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const barVariants: Variants = {
    initial: { scaleY: 0.75 },
    hover: {
      scaleY: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onTapStart={() => setHovered(true)}
      onTap={() => setTimeout(() => setHovered(false), 1000)}
      initial="initial"
      animate={hovered ? "hover" : "initial"}
      className="col-span-1 row-span-1 md:col-span-4 md:row-span-2"
    >
      <Card className="flex h-full flex-col gap-0 overflow-hidden rounded-3xl border border-white/15 bg-transparent p-0 text-white shadow-none ring-0">
        <CardHeader className="flex flex-col gap-4 p-6 md:p-8">
          <CardDescription className="m-0">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-black">
                <PatternIcon className="size-10" />
              </div>
              <span className="text-md text-neutral-400">
                Monthly Growth Report
              </span>
            </div>
          </CardDescription>

          <CardTitle className="text-xl leading-tight font-semibold text-neutral-300 md:text-2xl">
            Access powerful data to help grow your business
          </CardTitle>
        </CardHeader>

        <CardContent className="relative ml-6 w-full flex-1 overflow-hidden rounded-tl-2xl border-t border-l border-white/10 [mask-image:linear-gradient(to_right,black_80%,transparent_100%)] p-6">
          <motion.div className="absolute top-0 left-0 h-48 w-48 -translate-x-1/2 rounded-full bg-white opacity-5 blur-2xl md:size-120" />

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-normal text-neutral-400">
                Monthly Income
              </span>
              <div className="text-2xl font-normal md:text-3xl">$ 68,700</div>
            </div>

            <span className="rounded-full border border-white/20 px-2 py-1 text-[10px] whitespace-nowrap text-neutral-400 md:text-xs">
              Last 28 days
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            className="mt-8 flex items-end justify-between gap-2 md:mt-16 md:gap-4"
          >
            {data.map((height, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  variants={barVariants}
                  className={`w-full origin-bottom rounded-sm ${
                    i === 2 || i === 6 || i === 3
                      ? "bg-[#60438E]"
                      : "bg-[#ACB1DA]"
                  }`}
                  style={{ height: `${height}px` }}
                />
              </div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function NewsletterCard({ itemVariants }: { itemVariants: Variants }) {
  const controls = useAnimation();
  const handles = useAnimation();

  const startSelection = async () => {
    await controls.start({
      opacity: 1,
      width: "100%",
      height: "100%",
      transition: { duration: 0.35, ease: "easeOut" },
    });

    handles.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.15 },
    });
  };

  const resetSelection = () => {
    handles.start({ opacity: 0, scale: 0 });

    controls.start({
      opacity: 0,
      width: 0,
      height: 0,
      transition: { duration: 0.2 },
    });
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={startSelection}
      onMouseLeave={resetSelection}
      onTapStart={startSelection}
      onTap={() => setTimeout(resetSelection, 1500)}
      className="col-span-1 row-span-1 md:col-span-4 md:row-span-2"
    >
      <Card className="flex h-full flex-col gap-0 overflow-hidden rounded-3xl border border-white/15 bg-neutral-900/20 p-0 text-white shadow-none ring-0">
        <CardHeader className="flex flex-col p-6">
          <CardDescription className="m-0">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-black">
                <PatternIcon4 className="size-10" />
              </div>
              <span className="text-md text-neutral-400">
                Customize Newsletter
              </span>
            </div>
          </CardDescription>

          <CardTitle className="mb-4 max-w-md text-xl font-semibold md:mb-8 md:text-2xl">
            We made it simple to create weekly newsletters
          </CardTitle>
        </CardHeader>

        <CardContent className="min-h-[350px] flex-1 translate-x-10 rounded-t-xl border border-white/5 bg-[#16121e] p-0">
          <div className="flex gap-1 p-2">
            <div className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
            <div className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
            <div className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
          </div>

          <div className="h-[1px] w-full bg-neutral-600/10" />

          <div className="h-full px-6 py-4">
            <div className="space-y-3 opacity-60">
              <div className="border-b border-white/5 pb-2 text-[10px]">
                To: All Contact
              </div>

              <div className="border-b border-white/5 pb-2 text-[10px]">
                Subject: Exciting updates are on the way!!
              </div>
            </div>

            <div className="mt-6 flex h-full flex-col gap-4 rounded-3xl border border-white/10 p-4 md:mt-10">
              <div className="relative inline-block self-start">
                <span className="text-md px-3 py-2 text-purple-500">
                  Monthly updates
                </span>

                <motion.div
                  initial={{ width: 0, height: 0 }}
                  animate={controls}
                  className="pointer-events-none absolute inset-0 origin-top-left border border-purple-600 p-2"
                />

                {[
                  "-top-[3px] -left-[3px]",
                  "-top-[3px] -right-[3px]",
                  "-bottom-[3px] -left-[3px]",
                  "-bottom-[3px] -right-[3px]",
                ].map((pos, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={handles}
                    className={`absolute ${pos} h-1.5 w-1.5 bg-purple-600`}
                  />
                ))}
              </div>
              <div className="flex h-full items-center justify-start">
                <div className="mt-2 flex max-w-[320px] items-center gap-4 rounded-lg bg-[#241d30] p-2 md:mt-16">
                  <span className="text-[9px] text-neutral-400">
                    Font: Plus Jakarta Sans
                  </span>
                  <div className="size-6 rounded bg-purple-600" />
                  <div className="py-2 w-24 rounded bg-black/20 md:w-32  gap-2 text-neutral-400 flex items-center justify-center">
                    <IoIosSearch className="size-6" />
                    <TbBellRingingFilled className="size-6" />
                    <IoChatbubbleEllipsesSharp className="size-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function IntegrationCard({ itemVariants }: { itemVariants: Variants }) {
  const icons = [Notion, Slack, Figma, Paper];
  const controls = useAnimation();

  const iconVariants: Variants = {
    hidden: {
      opacity: 1,
      filter: "grayscale(100%) blur(1px) ",
    },
    visible: (i: number) => ({
      opacity: 1,
      filter: "grayscale(0%) blur(0px) ",
      transition: {
        delay: i * 0.2,
        duration: 0.45,
        ease: "easeOut",
      },
    }),
  };

  const handleHover = async () => controls.start("visible");
  const handleHoverEnd = async () => controls.start("hidden");

  return (
    <motion.div
      variants={itemVariants}
      onHoverStart={handleHover}
      onHoverEnd={handleHoverEnd}
      onTapStart={handleHover}
      onTap={() => setTimeout(handleHoverEnd, 1500)}
      className="col-span-1 row-span-1 md:col-span-4"
    >
      <Card className="h-full gap-0 overflow-hidden rounded-3xl border border-white/15 bg-neutral-900/20 p-0 text-white shadow-none ring-0">
        <CardHeader className="p-6">
          <CardDescription className="m-0">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-black">
                <PatternIcon2 className="size-10" />
              </div>
              <span className="text-md text-neutral-200">
                Awesome Integration
              </span>
            </div>
          </CardDescription>

          <CardTitle className="mb-6 text-xl font-semibold md:text-2xl">
            Work with your favorite tools
          </CardTitle>
        </CardHeader>

        <CardContent className="grid max-h-[120px] scale-120 grid-cols-4 gap-2 p-0 sm:grid-cols-6">
          <div className="hidden aspect-square rounded-xl bg-white/10 sm:block" />

          {icons.map((Icon, i) => (
            <motion.div
              key={i}
              className="flex aspect-square items-center justify-center rounded-xl border border-white/5 bg-white/20"
            >
              <motion.div
                custom={i}
                variants={iconVariants}
                initial="hidden"
                animate={controls}
              >
                <Icon className="size-8 text-white md:size-10" />
              </motion.div>
            </motion.div>
          ))}

          <div className="aspect-square rounded-xl bg-white/10" />

          {Array(6)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-white/10" />
            ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

const BentoGrid17 = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0f0c14] text-white md:p-8">
      <motion.div
        className="relative mx-auto grid max-w-6xl grid-cols-1 gap-6 p-4 font-sans sm:p-10 md:auto-rows-[minmax(200px,_auto)] md:grid-cols-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-50">
          <GlowEllipse />
        </div>

        <ChartsCard />

        <motion.div
          variants={itemVariants}
          className="col-span-1 row-span-1 md:col-span-4"
        >
          <Card className="flex h-full min-h-[220px] flex-col justify-between gap-0 rounded-3xl border border-white/15 bg-transparent p-0 text-white shadow-none ring-0">
            <CardHeader className="p-6">
              <CardDescription className="m-0">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-black">
                    <PatternIcon3 className="size-10" />
                  </div>
                  <span className="text-md text-neutral-400">
                    Community Support
                  </span>
                </div>
              </CardDescription>
              <CardTitle className="text-xl font-semibold md:text-2xl">
                24/7 fast team support
              </CardTitle>
            </CardHeader>

            <CardFooter className="relative flex items-end justify-end gap-1 border-none bg-transparent p-6 pt-0">
              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-neutral-200 flex items-center justify-center">
                <img
                  src="https://assets.watermelon.sh/avatar-17.png"
                  alt="watermelon-logo"
                  className="size-8"
                />
              </div>
              <div className="md:text-md rounded-t-2xl rounded-br-2xl border border-white/5 bg-neutral-800/20 px-4 py-2 text-sm">
                Hey! there i am here to help. 👋
              </div>
            </CardFooter>
          </Card>
        </motion.div>

        <NewsletterCard itemVariants={itemVariants} />
        <IntegrationCard itemVariants={itemVariants} />
      </motion.div>
    </div>
  );
};
type IconProps = {
  className?: string;
};

const PatternIcon = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="45" height="45" rx="8" fill="black" />
      <rect x="9" y="9" width="28" height="28" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image0" transform="scale(0.02)" />
        </pattern>
        <image
          id="image0"
          width="50"
          height="50"
          preserveAspectRatio="none"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADgUlEQVR4nO2ab2hOURzHz/ZsYq3F8k7xDpFNyKI2KbEkkj/FmwlvFIU3S01IEQot/wrRQkakFGFJ8y9/ly3Nn0XtjbCm5M9YfHTa7+Z0ep77nPs8d3d39XzrefPcc37nfO4553fO7/yuUjnllFNkAhLAVGANsAc4DVwEGoFDwA5gLTBexbTz1cBZ4Avu+gCcAariALAaeJOkkz1AK3AduABcBpqBl/LM1gtgFZAfNUQF0GJ1ph2ok2cJn7rDgFnANuCtZeM+MDEKgHxgC9BrNN4EzM7C3nzgtmHvN7Au/N7/b3QIcN5osBNYFKL9lcBHsf04LLvJIPR893QVKO2HdkqBzUB52La94TdH4nDkizIMyZrwdFQNRtHngXqN6RTpSAAzgWVpfguAQj8jBYaL7eyPNZEGYgbu2u5nSG92nkLzTq4Cxsju76Ljfru2t2M3qRiJPs/2zBVEn508ZbTZRQTxNR3IOSnQruILsRG4lRJEplW3FKhTMYVQff/7guh4wlPFQHTcBcIFRAdFWj+1C1YxhXAB0ZGdVquKMYQLiA5Pta6pGENoyWlDq17ZAi7Jw0YVYwgtoAzYD4xWcQIBhgNPDIjabIwNyNSSkXjuMhKuBveKobaA9YqByUBJCBCbUpQbAUxwNeq53x5X9wtsAH5IvV8Sw+SFDFEIvAP+OEWQwLQgG6I+QpNcB9PBuEJo6TOfUW6KSifriLI1AMRdYLoV26eECQKhJd4J6VvK66bAh8YkEMXy/1AL5oANkwFEnnEH1uAEIRXnGY2UuUIYz1PCBIXQAhYa5auVq2R63QA6gJFBIHxg6vUtYgYQecBTKf8qlHsDVwgfGIJAaAFLjDo1KmoIC+aUUfebTi041h0FfJZ6LVmPhvZemUAkuUyo0seQANP7jnEfnN7lpjFYAvzNBiKDNhPWKNaGZXgXcCIiiALD/SPJIKdTQmxE35q4aUEksjFYo72Kz658TGKG5WG9LUkrdBsQJ7Na3JZ3KktR5pNR5h4wJ5NG5aZ/qc6HGPa+A+uzekGSDvPUnOpyWG5aHlr7wnt5CZVAkU8bRcBcYF+S1NsDYGzGANJAeRAXKzvuCuC11RnPXbaJ+9QR5xXJD3bIMd+WfimLw9q1dZj5SBp19k4CVCmRZRfu6pI6A5ue9oEaJ6nmncARSU/rjwYagN3ywcCkQZn1yiknNXj1D9NJpB6QK5wiAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
};

const PatternIcon2 = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="45" height="45" rx="8" fill="black" />
      <rect x="8.5" y="9" width="28" height="28" fill="url(#pattern1)" />
      <defs>
        <pattern
          id="pattern1"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image1" transform="scale(0.02)" />
        </pattern>
        <image
          id="image1"
          width="50"
          height="50"
          preserveAspectRatio="none"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAByUlEQVR4nO2ZPUsDMRyHswlqq6IovkJFxw4K6tDRryHoN3B0E8HFVXRxUXASBxcHXRz9HLrVoVrf34o+EvofpBKaXq65O8kDhdIm+efXHHlyPaUCgUDABWAa2Afu5KXfT6usAEwAe0CNv3wBx8CUSivAGLANvNOcT+AQKKi0AAwAW8ArrfMhqzecZIB+YAN4wJ0XWc0hnwFywBpwT/w8yer2tTNAlwTQO1C7eZRAPXEG6ARWgRv8U5HLN+caYgkokzxlPZeoIRZIH/P/Jchc1FVZAW6Tnj31OSxHCvErTLfH3cq0e/U6hfDoj0aeffgkTqOnwvADDmes5M5cQIfh8xFg1/LU28i79B1ppaar2bWULoFFQ7vxCMf4ScNYJeDCh9l1kZKhTwE4MNxY1eS7QpMA3s1+brJtK7e6egwZK3GznwIzEWrMSl8vZq9YFvkGToCixbhFaav72FCJw+x5YB2oWhbVfzAc6V/bsAJH0saGqtTOO4VomEQfsCnHBluugDO5/q9b6PcotTJr9udg9pjMvuNgdt03mN2KYHYVzN6MYHYVzF4nmF35IrNmNwEMSqA3hwCjKi0Qo9lTQeYfhv67x9OBQEClkh9/wdGsjKfDJwAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};

const PatternIcon3 = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="45" height="45" rx="8" fill="black" />
      <rect x="9" y="9" width="28" height="28" fill="url(#pattern2)" />
      <defs>
        <pattern
          id="pattern2"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image2" transform="scale(0.02)" />
        </pattern>
        <image
          id="image2"
          width="50"
          height="50"
          preserveAspectRatio="none"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEuUlEQVR4nO2Za4hVVRTHT2kqKJWPgmaI6UNQI+VoUUFFRVSUfQjpQUmY04PKJqovWR9KC4oeM4FFZAhZUmEGNowG9qSPFUUQTRZBIEWWpaWOaZn3Fyv/R1dn9h7Pvfvcuh/uHw6Oe63z33udvV573yxro4022igL4GZgLTAMbAP+0LNNY28ADwEXABOzVgXwG+XxK7AcmJO1GoCzgGuAHmAacISeqcAs4CpgAPjMGVQD3jT5f7nQM4D3gd3ARuDcBK6TgSeAHTJor4ycVO2qR098h/zdw3y/I5F3qgwwQ9BunVjdyg9OdLgmyt3gKeBYYL3G1lU0T4922bDFdr8K3pz8MOBFkdtuzHeyDu2IYUFF800BBsW5ozJj9PVz0gsD8gVVuZjjHOc+3pZkNwN6RbYnZITTG5LeUNKEo40ZdDHTeAIAvhdR7yH0OlQT8K5XkZttFO9ACtGISKbUsXs/WyJoeNLRvLOVzfY2XGfc1zipZFJ4S/qrC7KjgOeBnxRLa0LxZO4DvA18AtwaiNP1jRoyWI+7AF3ATqXoE9z4Khlwmy0Q2GpFNfD+w8B3wF/AUjc+TcnGeGc3YsidMuSVkvq2K5v1zgE3AN4D7nb/f1KLHefGupXe5+nfpQXufvE+14ghx2vC34HpJfRtEShJjI/oWN/1MfBp4QN8kGe9iCEzxW27OaERY/LUuvgQehOAb6S7KKJjC14JbAdOdeMLlVi6YoYYgM/Ff15WL4CL9fIvFrRj6N0jveExdsOC9k/gUjc2Q5nuXjcWMyQP+iV1G+J83PBIRD7dtSqXRXQekxHzCuNz9d52ceQ8u4GXC7p2PDCsTWndayLvDsgXuRoyKZKNDK8CV7vnaOC4wpg9hteBswNNpeGLhgwRyQqRfOizjWSTga8lXx541+pHCD2RuQwh15qRf7AUQ44ENonovoD8NO1YNNhTAUwU/55UoovkYhaM5wTk10m+z/5OmiwAVf5/4idLhTtgWeHrDMgflNwCe27yhA6KJ8MPWSostQLviPCjSHA/LfmulDN9Ebq8SAv2QLr9VqQvWaGLFD50PVSJMcD14lxTBZ//Onmb3x85GK12O5PsZhwsiKOSTSrxJe5W5YGIMStdzEQTgHqwWb5rLgL4SlznZ1UDuFKNpaEvIDc3e0byfcXUrJjrswCWjmW914qHM+AUyX8s1rEqjel1aXdhRGeJdNAhy1Lp5e7wlnfNO/Oix79vbJZp/NmmGBFoGmuhnZHOta5oWhOaw7qCK7R7XTol5hhSa7JLH2pmUw1xxtRiMSOdOc7X7Wxxl8VHQccMukWNJDKg8WYxwc3ymBkopmbXm91uR9gSB7sNB/YG3rWi2FQDAgkgz2arUu6k2L87N7rrpq3FrripUGoecR1AZyJfp7trHq5upeUm73EdwOZQo1kn3zHiGqlulfW1M+bbyN3ujx2FS3AtE8+G6ldabgHjFfg152rddXLc4O6hT2/easufZ/LDmdWTR8e60ChcgFiLg7+B/F+hk+YKtztWGBfH7s3Yb3xe7R/PWg3AmfotErdDdjkxX78tTgZukisZXgjVpJaB0vQ6V0RD6G9pIwJVvE8X51/qmnZTVT/ptdFGlo6/AQUBkIF0jlKtAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
};

const PatternIcon4 = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="45" height="45" rx="8" fill="black" />
      <rect x="9" y="9" width="28" height="28" fill="url(#pattern3)" />
      <defs>
        <pattern
          id="pattern3"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image3" transform="scale(0.02)" />
        </pattern>
        <image
          id="image3"
          width="50"
          height="50"
          preserveAspectRatio="none"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACD0lEQVR4nO2aTS/EQBiAJyE4SLgRIvgN4uSEvbA+E/9AcBEkjvgR9i9IVlwQBweRECSWuPn4Eb5uEhK7j4y+TcZa1V1tt5V5kjm0m3dnnr7vtJNOlUoQwCBwAzwB60CdShrAEPDKV/aBBpUUgDHgTQa/CYwCL3K8l4jM8F2iRs4PGDIZlUQJF8mM5kl5AdQDc8AucAlcRdzePCRqgKz8fuMl0Q3cUX02f5HQsoNemXAl7oFVIA2kImgZQyLrQ2LMKxtzhkSbqs6cyP5JQgL0nNCshD340CQ0QE4CxlVSJTRyh9KkVcgAw8YTewuoLSGxYUj4v7hRichDzc2EXj81BZKJKogcFt1qT4DGQCSiEgFagXegAEwCj9LnGdBcVE4TlXYShci89HEuxz3As1Fm3zIhK+D2uImcSh9Lxrkpo8yKJfrk/EFsRIAOKak80AssSkkVfionWVloLuMksiz/n5fm8i43gP4SMbEUOTIGn5cy03OmxSMmliILwLFkpsNnTDp2IpWAFXGwIkGDFXGwIkGDFXGwIkGDFXGwIkGDFXGwIkGDFfknIrkoX2L7ARiXMeXKCdqRoFUVE4A1GdN2OUGzxkaP/zd7IQG0Aw8ypulyAvXW260EPsjVGIlo6y1ltBHp25W4LntPHeiSzyXiwjXQWUFCP2XqgBmZMxdV2J6+0HNCl1Mivm6wWCwqdD4AIhpKEe3DGpkAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};

const Notion = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 268">
    <path
      fill="#FFF"
      d="M16.092 11.538 164.09.608c18.179-1.56 22.85-.508 34.28 7.801l47.243 33.282C253.406 47.414 256 48.975 256 55.207v182.527c0 11.439-4.155 18.205-18.696 19.24L65.44 267.378c-10.913.517-16.11-1.043-21.825-8.327L8.826 213.814C2.586 205.487 0 199.254 0 191.97V29.726c0-9.352 4.155-17.153 16.092-18.188Z"
    />
    <path d="M164.09.608 16.092 11.538C4.155 12.573 0 20.374 0 29.726v162.245c0 7.284 2.585 13.516 8.826 21.843l34.789 45.237c5.715 7.284 10.912 8.844 21.825 8.327l171.864-10.404c14.532-1.035 18.696-7.801 18.696-19.24V55.207c0-5.911-2.336-7.614-9.21-12.66l-1.185-.856L198.37 8.409C186.94.1 182.27-.952 164.09.608ZM69.327 52.22c-14.033.945-17.216 1.159-25.186-5.323L23.876 30.778c-2.06-2.086-1.026-4.69 4.163-5.207l142.274-10.395c11.947-1.043 18.17 3.12 22.842 6.758l24.401 17.68c1.043.525 3.638 3.637.517 3.637L71.146 52.095l-1.819.125Zm-16.36 183.954V81.222c0-6.767 2.077-9.887 8.3-10.413L230.02 60.93c5.724-.517 8.31 3.12 8.31 9.879v153.917c0 6.767-1.044 12.49-10.387 13.008l-161.487 9.361c-9.343.517-13.489-2.594-13.489-10.921ZM212.377 89.53c1.034 4.681 0 9.362-4.681 9.897l-7.783 1.542v114.404c-6.758 3.637-12.981 5.715-18.18 5.715-8.308 0-10.386-2.604-16.609-10.396l-50.898-80.079v77.476l16.1 3.646s0 9.362-12.989 9.362l-35.814 2.077c-1.043-2.086 0-7.284 3.63-8.318l9.351-2.595V109.823l-12.98-1.052c-1.044-4.68 1.55-11.439 8.826-11.965l38.426-2.585 52.958 81.113v-71.76l-13.498-1.552c-1.043-5.733 3.111-9.896 8.3-10.404l35.84-2.087Z" />
  </svg>
);

const Figma = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 54 80" fill="none">
    <g clipPath="url(#figma__clip0_912_3)">
      <path
        d="M13.3333 80.0002C20.6933 80.0002 26.6667 74.0268 26.6667 66.6668V53.3335H13.3333C5.97333 53.3335 0 59.3068 0 66.6668C0 74.0268 5.97333 80.0002 13.3333 80.0002Z"
        fill="#0ACF83"
      />
      <path
        d="M0 39.9998C0 32.6398 5.97333 26.6665 13.3333 26.6665H26.6667V53.3332H13.3333C5.97333 53.3332 0 47.3598 0 39.9998Z"
        fill="#A259FF"
      />
      <path
        d="M0 13.3333C0 5.97333 5.97333 0 13.3333 0H26.6667V26.6667H13.3333C5.97333 26.6667 0 20.6933 0 13.3333Z"
        fill="#F24E1E"
      />
      <path
        d="M26.6667 0H40.0001C47.3601 0 53.3334 5.97333 53.3334 13.3333C53.3334 20.6933 47.3601 26.6667 40.0001 26.6667H26.6667V0Z"
        fill="#FF7262"
      />
      <path
        d="M53.3334 39.9998C53.3334 47.3598 47.3601 53.3332 40.0001 53.3332C32.6401 53.3332 26.6667 47.3598 26.6667 39.9998C26.6667 32.6398 32.6401 26.6665 40.0001 26.6665C47.3601 26.6665 53.3334 32.6398 53.3334 39.9998Z"
        fill="#1ABCFE"
      />
    </g>
    <defs>
      <clipPath id="figma__clip0_912_3">
        <rect width="53.3333" height="80" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const Slack = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 2447.6 2452.5">
    <g clipRule="evenodd" fillRule="evenodd">
      <path
        d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z"
        fill="#36c5f0"
      />
      <path
        d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z"
        fill="#2eb67d"
      />
      <path
        d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z"
        fill="#ecb22e"
      />
      <path
        d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0"
        fill="#e01e5a"
      />
    </g>
  </svg>
);

const Paper = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 39 39" fill="none">
    <path d="M39 24H24V6H6V24H24V39H0V6H6V0H39V24Z" fill="#81ADEC" />
  </svg>
);

export default BentoGrid17;
