"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { motion, type Transition, type Variants } from "framer-motion";
import { useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 3.99512V10.9622C0 11.6082 0.256652 12.2278 0.713496 12.6847C1.17034 13.1415 1.78995 13.3982 2.43603 13.3982H14.6162C15.2622 13.3982 15.8818 13.1415 16.3387 12.6847C16.7955 12.2278 17.0522 11.6082 17.0522 10.9622V3.99512L9.80257 8.45548C9.41869 8.69166 8.97681 8.8167 8.52609 8.8167C8.07538 8.8167 7.6335 8.69166 7.24962 8.45548L0 3.99512Z"
        fill="#916CE7"
      />
      <path
        d="M17.0522 2.56432V2.43603C17.0522 1.78995 16.7955 1.17034 16.3387 0.713496C15.8818 0.256652 15.2622 0 14.6162 0H2.43603C1.78995 0 1.17034 0.256652 0.713496 0.713496C0.256652 1.17034 0 1.78995 0 2.43603V2.56432L7.88786 7.41851C8.0798 7.5366 8.30074 7.59912 8.52609 7.59912C8.75145 7.59912 8.97239 7.5366 9.16433 7.41851L17.0522 2.56432Z"
        fill="#916CE7"
      />
    </svg>
  );
}

function CrownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.782 10.4809L22.5188 13.2777C22.0847 17.8853 21.8684 20.1894 20.5096 21.5785C19.1522 22.9683 17.1161 22.9683 13.0453 22.9683H9.92189C5.85107 22.9683 3.81567 22.9683 2.45758 21.5785C1.0995 20.1894 0.882451 17.8853 0.449049 13.2777L0.185838 10.4802C-0.020872 8.28425 -0.124227 7.18662 0.251296 6.73186C0.345984 6.61357 0.463309 6.51535 0.596408 6.44295C0.729507 6.37054 0.875708 6.3254 1.02646 6.31017C1.57286 6.26194 2.25845 7.0433 3.63101 8.60466C4.34071 9.41289 4.69557 9.81735 5.09107 9.87937C5.31018 9.91382 5.53412 9.87868 5.73601 9.77601C6.10119 9.59273 6.3458 9.09387 6.83295 8.09477L9.40167 2.83055C10.3222 0.943976 10.7832 0 11.4839 0C12.1847 0 12.6449 0.943976 13.5655 2.83055L16.1349 8.09477C16.6221 9.09387 16.8653 9.59273 17.2305 9.77601C17.4337 9.87868 17.6577 9.91382 17.8761 9.87937C18.2723 9.81735 18.6271 9.41289 19.3368 8.60466C20.708 7.0433 21.3943 6.26194 21.9414 6.31017C22.2363 6.33636 22.5133 6.48656 22.7159 6.73255C23.0921 7.18593 22.9887 8.28425 22.782 10.4809ZM7.17746 18.3745C7.17746 17.899 7.56332 17.5132 8.03876 17.5132H14.9291C15.1575 17.5132 15.3766 17.6039 15.5381 17.7654C15.6996 17.927 15.7904 18.146 15.7904 18.3745C15.7904 18.6029 15.6996 18.822 15.5381 18.9835C15.3766 19.145 15.1575 19.2358 14.9291 19.2358H8.03876C7.56332 19.2358 7.17746 18.8499 7.17746 18.3745Z"
        fill="#916CE7"
      />
    </svg>
  );
}
function CalendarAddIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.89059 0.638007C4.89059 0.468797 4.82337 0.306517 4.70372 0.186868C4.58407 0.0672184 4.42179 0 4.25258 0C4.08337 0 3.92109 0.0672184 3.80144 0.186868C3.68179 0.306517 3.61458 0.468797 3.61458 0.638007V1.98207C2.3896 2.0799 1.58656 2.31979 0.996195 2.91101C0.404975 3.50138 0.165085 4.30527 0.0664062 5.52939H16.9455C16.8468 4.30442 16.607 3.50138 16.0157 2.91101C15.4254 2.31979 14.6215 2.0799 13.3974 1.98122V0.638007C13.3974 0.468797 13.3301 0.306517 13.2105 0.186868C13.0908 0.0672184 12.9286 0 12.7593 0C12.5901 0 12.4279 0.0672184 12.3082 0.186868C12.1886 0.306517 12.1213 0.468797 12.1213 0.638007V1.92508C11.5556 1.91402 10.921 1.91402 10.2073 1.91402H6.80461C6.09089 1.91402 5.45629 1.91402 4.89059 1.92508V0.638007Z"
        fill="#916CE7"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.0135 8.7192V10.4205C17.0135 13.6284 17.0135 15.2328 16.0165 16.229C15.0204 17.226 13.416 17.226 10.2081 17.226H6.80541C3.59751 17.226 1.99313 17.226 0.996992 16.229C-1.01409e-07 15.2328 0 13.6284 0 10.4205V8.7192C0 8.00548 9.50705e-09 7.37088 0.0110588 6.80518H17.0025C17.0135 7.37088 17.0135 8.00548 17.0135 8.7192ZM11.9095 9.78254C12.0787 9.78254 12.241 9.84976 12.3606 9.96941C12.4803 10.0891 12.5475 10.2513 12.5475 10.4205V11.4839H13.6108C13.78 11.4839 13.9423 11.5511 14.062 11.6708C14.1816 11.7904 14.2488 11.9527 14.2488 12.1219C14.2488 12.2911 14.1816 12.4534 14.062 12.573C13.9423 12.6927 13.78 12.7599 13.6108 12.7599H12.5475V13.8233C12.5475 13.9925 12.4803 14.1547 12.3606 14.2744C12.241 14.394 12.0787 14.4613 11.9095 14.4613C11.7403 14.4613 11.578 14.394 11.4583 14.2744C11.3387 14.1547 11.2715 13.9925 11.2715 13.8233V12.7599H10.2081C10.0389 12.7599 9.87663 12.6927 9.75698 12.573C9.63733 12.4534 9.57011 12.2911 9.57011 12.1219C9.57011 11.9527 9.63733 11.7904 9.75698 11.6708C9.87663 11.5511 10.0389 11.4839 10.2081 11.4839H11.2715V10.4205C11.2715 10.2513 11.3387 10.0891 11.4583 9.96941C11.578 9.84976 11.7403 9.78254 11.9095 9.78254Z"
        fill="#916CE7"
      />
    </svg>
  );
}

function ShieldSmileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.3552 7.89639V3.53243C14.3552 1.72272 14.3552 0.817388 13.7905 0.322614C13.2268 -0.172161 12.3646 -0.0238239 10.641 0.274763L9.79979 0.419272C8.49155 0.645126 7.83792 0.758054 7.17758 0.758054C6.51724 0.758054 5.8636 0.645126 4.55537 0.419272L3.71416 0.273806C1.99058 -0.0228669 1.12832 -0.17216 0.563679 0.321657C0 0.818345 0 1.72368 0 3.53338V7.89735C0 12.4336 3.38016 14.6357 5.50185 15.5707C6.07702 15.8243 6.36508 15.9506 7.17758 15.9506C7.99104 15.9506 8.27814 15.8243 8.8533 15.5707C10.974 14.6357 14.3552 12.4326 14.3552 7.89639ZM3.32657 5.69431C3.42514 5.48951 3.79359 5.21007 4.38598 5.21007C4.97933 5.21007 5.34777 5.48951 5.44635 5.69431C5.59373 6.00056 5.95356 6.12497 6.24832 5.97185C6.39197 5.89464 6.50012 5.76479 6.55009 5.60955C6.60005 5.45431 6.58793 5.28575 6.51628 5.13925C6.15071 4.3813 5.26643 3.97169 4.38598 3.97169C3.50553 3.97169 2.62221 4.3813 2.25663 5.13925C2.18498 5.28575 2.17287 5.45431 2.22283 5.60955C2.27279 5.76479 2.38095 5.89464 2.52459 5.97185C2.81935 6.12497 3.17823 6.00056 3.32657 5.69431ZM9.96822 5.21007C9.37583 5.21007 9.00738 5.48951 8.90881 5.69431C8.8756 5.76627 8.82819 5.83077 8.76944 5.88396C8.71069 5.93714 8.64181 5.97792 8.56692 6.00384C8.49202 6.02975 8.41267 6.04028 8.33361 6.03478C8.25455 6.02928 8.17742 6.00788 8.10684 5.97185C7.96319 5.89464 7.85503 5.76479 7.80507 5.60955C7.75511 5.45431 7.76722 5.28575 7.83887 5.13925C8.20445 4.3813 9.08873 3.97169 9.96918 3.97169C10.8496 3.97169 11.7329 4.3813 12.0985 5.13925C12.2469 5.44549 12.1272 5.81873 11.8306 5.97185C11.76 6.00788 11.6828 6.02928 11.6038 6.03478C11.5247 6.04028 11.4454 6.02975 11.3705 6.00384C11.2956 5.97792 11.2267 5.93714 11.168 5.88396C11.1092 5.83077 11.0618 5.76627 11.0286 5.69431C10.93 5.48951 10.5606 5.21007 9.96822 5.21007ZM3.97829 10.0018C3.86248 9.886 3.79538 9.73026 3.79075 9.56654C3.78612 9.40282 3.84432 9.24354 3.95341 9.12137C4.00784 9.06369 4.07321 9.01743 4.14571 8.98529C4.2182 8.95314 4.29638 8.93576 4.37567 8.93416C4.45496 8.93256 4.53377 8.94676 4.60751 8.97595C4.68125 9.00513 4.74843 9.04871 4.80515 9.10414C4.8195 9.11658 4.85779 9.14625 4.88554 9.16635C4.96593 9.22377 5.09991 9.30799 5.29035 9.39507C5.66837 9.56734 6.28469 9.75587 7.17758 9.75587C8.07047 9.75587 8.68678 9.56734 9.06576 9.39412C9.25525 9.30799 9.38923 9.22377 9.46962 9.16635C9.5017 9.14393 9.53268 9.11998 9.56245 9.09457V9.09361C9.61872 9.03908 9.68541 8.99644 9.75851 8.96822C9.83162 8.94001 9.90967 8.9268 9.98799 8.92939C10.0663 8.93198 10.1433 8.95032 10.2144 8.9833C10.2855 9.01628 10.3492 9.06324 10.4017 9.12137C10.5116 9.24209 10.5709 9.40049 10.5671 9.5637C10.5634 9.72691 10.497 9.88243 10.3816 9.99799L10.3788 9.9999L10.3769 10.0018L10.3711 10.0076L10.3549 10.0229L10.307 10.064C10.2687 10.0975 10.2142 10.1406 10.1462 10.1884C9.95746 10.3208 9.75654 10.4348 9.54618 10.5291C9.01791 10.7703 8.2389 10.9952 7.17758 10.9952C6.11625 10.9952 5.33725 10.7703 4.80898 10.5291C4.59865 10.4351 4.39773 10.3214 4.20893 10.1894C4.12869 10.1322 4.05199 10.0702 3.97925 10.0037L3.97829 10.0018Z"
        fill="#916CE7"
      />
    </svg>
  );
}
const BentoCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <Card
    className={`relative overflow-hidden border-[#262626] bg-neutral-900 p-0 text-white ${className}`}
  >
    {children}
  </Card>
);

const reviews = [
  {
    name: "Sai Abhishek Mishra",
    date: "11, Apr 2024",
    location: "Mumbai, India",
    review:
      "Sanjay is a remarkable Product Designer, renowned for his exceptional UI skills and creating Awwwards-worthy websites. I highly recommend Sanjay for any Product Designer role that requires a talented and dedicated professional with a focus on UI skills.",
  },
  {
    name: "Courtney Henry",
    date: "11, Feb 2024",
    location: "Iceland",
    review:
      "Courtney is a remarkable Product Designer, renowned for his exceptional UI skills and creating Awwwards-worthy websites. I highly recommend Sanjay for any Product Designer role that requires a talented and dedicated professional with a focus on UI skills",
  },
];

const containerVariants: Variants = {
  initial: { y: 0 },
  hover: { y: -150 },
};

const cardVariants: Variants = {
  active: { x: 0, opacity: 1 },
  inactive: { x: 20, opacity: 0.8 },
};

function ReviewsCard() {
  const duplicated = [...reviews, ...reviews, ...reviews];
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);

  return (
    <BentoCard className="col-span-1 flex flex-col md:col-span-2">
      <CardHeader className="w-full gap-0 p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-neutral-400">
          <ShieldSmileIcon className="h-4 w-4 text-purple-500" />
          <span className="text-md font-medium text-neutral-500">
            Testimonials
          </span>
        </div>

        <h3 className="text-xl font-semibold text-neutral-200">
          Reviews Showcase
        </h3>
      </CardHeader>
      <CardContent>
        <div
          className="relative h-[360px] w-full overflow-hidden px-4 pb-4 md:px-20"
          onMouseEnter={() => {
            setHovered(true);
            setActive((p) => (p + 1) % duplicated.length);
          }}
          onMouseLeave={() => {
            setHovered(false);
            setActive((p) => (p - 1 + duplicated.length) % duplicated.length);
          }}
        >
          <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-16 bg-gradient-to-b from-neutral-900 to-transparent" />

          <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-50 bg-gradient-to-t from-neutral-900 to-transparent" />

          <motion.div
            variants={containerVariants}
            animate={hovered ? "hover" : "initial"}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            className="space-y-4"
          >
            {duplicated.map((review, i) => {
              const state = i === active ? "active" : "inactive";

              return (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  animate={state}
                  transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left leading-tight"
                >
                  <div className="flex items-start justify-between">
                    <div className="text-md font-medium text-neutral-200">
                      {review.name}
                    </div>

                    <div className="text-sm text-neutral-500">
                      {review.date}
                    </div>
                  </div>

                  <div className="text-sm text-neutral-500">
                    {review.location}
                  </div>

                  <div className="mt-1 h-[1px] w-full bg-neutral-800" />

                  <p className="mt-2 text-[12px] leading-relaxed text-neutral-400">
                    {review.review}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </CardContent>
    </BentoCard>
  );
}

function SchedulerCard() {
  const size = 180;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = 0.75;
  const offset = circumference * (1 - progress);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0,
      },
    },
  };

  const textItem: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.9,
      filter: "blur(4px)",
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <BentoCard className="relative col-span-1 flex min-h-[400px]  flex-col justify-between overflow-hidden p-0">
      <CardHeader className="relative z-10 p-4">
        <h3 className="text-lg font-semibold">
          <span className="text-white">Tasks Scheduler.</span>{" "}
          <span className="text-neutral-400">
            Get your methods invoked at a certain time or intervals.
          </span>
        </h3>
      </CardHeader>
      <CardContent className="p-0.5">
        <p className="px-0.5 pb-4 text-justify text-lg leading-relaxed text-neutral-700 opacity-10 sm:text-3xl">
          The filler text we know today has been altered over the years. In fact
          "Lorem" isn’t actually a word. It is suggested that the text starts
          somewhere in classical Latin literature where there was a passage that
          contained the word “Do-lorem”.contained the word “Do-lorem”.word word
        </p>

        <div className="absolute inset-0 top-36 flex items-center justify-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative flex items-center justify-center rounded-full bg-neutral-800"
          >
            <svg width={size} height={size} className="-rotate-90">
              <circle
                stroke="#27272a"
                fill="transparent"
                strokeWidth={stroke}
                r={radius}
                cx={size / 2}
                cy={size / 2}
              />

              <motion.circle
                stroke="#8b5cf6"
                fill="transparent"
                strokeWidth={stroke}
                strokeLinecap="round"
                r={radius}
                cx={size / 2}
                cy={size / 2}
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>

            <div className="absolute flex flex-col items-center">
              <motion.span
                variants={textItem}
                className="text-4xl font-light text-white"
              >
                09:16
              </motion.span>

              <motion.div
                variants={textItem}
                className="mt-1 flex items-center gap-1 text-xs text-neutral-400"
              >
                <Bell className="h-3 w-3" />
                11:51
              </motion.div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </BentoCard>
  );
}
const transition: Transition = {
  duration: 0.7,
  ease: [0.65, 0, 0.35, 1],
};

const user1: Variants = {
  initial: {
    x: 0,
    y: 0,
  },
  hover: {
    x: 60,
    y: -40,
    transition,
  },
};

const user2: Variants = {
  initial: {
    x: 0,
    y: 0,
  },
  hover: {
    x: -80,
    y: 50,
    transition,
  },
};

function CardTable() {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="col-span-1 h-full"
    >
      <BentoCard className="relative h-full max-h-[350px] p-4">
        <CardHeader className="p-0 text-lg leading-tight">
          <h3 className="mb-6">
            <span className="font-semibold">Multi-users.</span>{" "}
            <span className="text-neutral-400">
              Each end-user has his own state enabling multi-user support.
            </span>
          </h3>
        </CardHeader>

        <CardContent className="text-md flex items-center overflow-hidden rounded-lg border border-neutral-800 bg-neutral-800 p-0">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900 text-neutral-300">
                <th className="p-2 text-left font-normal">City</th>
                <th className="p-2 text-left font-normal">Status</th>
              </tr>
            </thead>

            <tbody className="text-neutral-400">
              <tr>
                <td className="p-2">New York</td>
                <td className="p-2">Cancelled</td>
              </tr>
              <tr>
                <td className="p-2">Singapore</td>
                <td className="p-2">Idle</td>
              </tr>
              <tr>
                <td className="p-2">India</td>
                <td className="p-2">Active</td>
              </tr>
              <tr>
                <td className="p-2">San Rafael</td>
                <td className="p-2">Progress</td>
              </tr>
            </tbody>
          </table>
        </CardContent>

        <motion.div
          variants={user2}
          transition={transition}
          className="absolute top-1/2 right-2 rounded-full border border-purple-800/80 bg-purple-600 px-2 py-0.5 text-sm text-white"
        >
          User 2
        </motion.div>

        <motion.div
          variants={user1}
          transition={transition}
          className="absolute bottom-1/4 left-1 rounded-full border border-orange-800/80 bg-orange-600 px-2 py-0.5 text-sm text-white"
        >
          User 1
        </motion.div>
      </BentoCard>
    </motion.div>
  );
}

const data = [
  { day: "MON", sales: 10 },
  { day: "TUE", sales: 18 },
  { day: "WED", sales: 35 },
  { day: "THU", sales: 22 },
  { day: "FRI", sales: 30 },
];

function DatasetCard() {
  return (
    <BentoCard className="col-span-1 md:h-[350px] h-[450px]  md:col-span-2">
      <CardHeader className="p-4 text-lg leading-tight">
        <h3 className="mb-8 text-lg leading-tight">
          <span className="font-semibold text-neutral-200">
            Explore datasets with TalkToTaipy.
          </span>{" "}
          <span className="text-base text-neutral-400">
            Leverage the LLM-based application to explore datasets using natural
            languages.
          </span>
        </h3>
      </CardHeader>

      <CardContent className="relative flex flex-col items-center gap-6  pl-4 md:flex-row">
        <div className="w-full rounded-lg border border-neutral-700 bg-neutral-800 p-3 shadow-xl md:w-48">
          <p className="mb-2 text-sm text-neutral-500">
            Enter your prompt here
          </p>
          <div className="rounded border border-neutral-700 bg-[#121212] p-2 text-xs text-neutral-300">
            plot sales by product in chart
          </div>
        </div>
        <div className="w-full rounded-xl border border-neutral-800 bg-[#1a1a1a] p-4 shadow-2xl md:w-64">
          <p className="mb-2 text-sm tracking-wider text-neutral-300 uppercase">
            Sales by Product
          </p>

          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="day" hide />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "#18181b",
                    border: "1px solid #3f3f46",
                    fontSize: "10px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 flex justify-between text-[8px] text-neutral-500">
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
          </div>
        </div>
      </CardContent>
    </BentoCard>
  );
}

const BentoGrid11 = () => {
  return (
    <div className="min-h-screen bg-black p-4 font-sans md:p-8">
      <div className="mx-auto grid max-w-6xl auto-rows-auto grid-cols-1 gap-4 md:grid-cols-2 lg:auto-rows-[400px] lg:grid-cols-4">
        <ReviewsCard />

        <SchedulerCard />

        <BentoCard className="col-span-1 flex min-h-[400px] flex-col items-center p-4 text-center">
          <CardHeader className="w-full gap-3 p-0">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-neutral-800">
              <CrownIcon className="size-8 text-purple-500" />
            </div>

            <div>
              <h3 className="text-2xl font-medium">Let's Work Together</h3>
              <p className="mt-1 text-sm text-neutral-500">
                Let's Make Magic Happen Together!
              </p>
            </div>
          </CardHeader>
          <CardContent className="mt-2 w-full space-y-3 p-0">
            <Button className="h-12 w-full cursor-pointer gap-1 border-neutral-700 bg-neutral-800 text-lg text-neutral-300 hover:bg-neutral-700">
              <MailIcon className="mr-2 size-6 text-purple-500" /> Email Me
            </Button>
            <Button className="h-12 w-full cursor-pointer gap-1 border-neutral-700 bg-neutral-800 text-lg text-neutral-300 hover:bg-neutral-700">
              <CalendarAddIcon className="mr-2 size-6 text-purple-500" />{" "}
              Schedule a Call
            </Button>
          </CardContent>
        </BentoCard>

        <CardTable />

        <BentoCard className="col-span-1 flex h-[350px] flex-col">
          <CardHeader className="p-4 text-lg leading-tight">
            <h3 className="mb-12 text-lg leading-tight">
              <span className="font-semibold">Long jobs.</span>{" "}
              <span className="text-neutral-400">
                Run heavy tasks in the background without slowing down
                experience.
              </span>
            </h3>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-4  ">
            <Button className="cursor-pointer rounded-full border border-purple-600 bg-purple-600/20 px-10 py-6 text-xl text-white hover:bg-purple-600/40">
              Run the task
            </Button>
          </CardContent>
        </BentoCard>

        <DatasetCard />
      </div>
    </div>
  );
};

export default BentoGrid11;
