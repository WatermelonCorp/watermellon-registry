"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function BentoGrid10() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto grid max-w-7xl auto-rows-[auto] grid-cols-1 gap-4 bg-white p-4 font-sans sm:grid-cols-2 md:p-8 lg:grid-cols-4"
    >
      <BentoItem className="col-span-1 row-span-2 flex items-center justify-center bg-[#E9623B] p-5">
        <LogoIcon
          className="ml-2 h-24 w-24 text-[#171C27] md:h-[110px] md:w-[110px]"
          strokeWidth={2.5}
        />
      </BentoItem>

      <BentoItem className="col-span-1 row-span-2 flex md:h-[170px] items-center justify-center bg-[#F08E8E] md:row-span-1">
        <div className="rounded-full bg-[#D9D9D9] px-4 py-2 text-sm font-bold text-[#4A4A4A] md:px-8 md:py-4 md:text-lg">
          Got a task in mind?
        </div>
      </BentoItem>

      <BentoItem className="col-span-1 row-span-3 bg-[#171C27] p-4 sm:col-span-2 md:p-6">
        <div className="flex h-full flex-col gap-4 sm:flex-row">
          <WorkerCard name="Alex" rating="4.7" job="Handyman" />
          <WorkerCard name="Sam" rating="4.2" job="Cook" />
          <WorkerCard name="Kate" rating="4.7" job="Mechanic" />
        </div>
      </BentoItem>

      <BentoItem className="col-span-1 row-span-2 flex items-center justify-center bg-[#E5AF1F] p-5">
        <CalendarIcon className="h-24 w-24 md:h-[143px] md:w-[143px]" />
      </BentoItem>

      <BentoItem className="col-span-1 row-span-2 md:h-[170px] bg-[#F08E8E] md:row-span-1" />

      <BentoItem className="row-span-3 flex flex-col justify-center bg-[#3D410E] p-6 md:p-8">
        <div className="mb-4 flex items-start justify-center text-6xl font-black text-zinc-100/90">
          <span className="mt-12 text-4xl">$</span>
          <span className="text-8xl">165</span>
        </div>
        <div className="mb-6 flex flex-col gap-6">
          <div className="rounded-full border-2 border-[#E2E8F0] px-4 py-2 text-center text-lg font-bold text-[#E2E8F0] md:px-6 md:py-3 md:text-xl">
            Mechanic
          </div>
          <p className="text-center text-lg leading-tight text-[#E2E8F0] opacity-80">
            No surprises. See an estimated cost before the final price through
            the app.
          </p>
        </div>
      </BentoItem>

      <BentoItem className="row-span-3 flex flex-col justify-around gap-1 bg-[#1149AD] p-4 md:p-6">
        <TaskTag label="Mover" count="13" />
        <TaskTag label="Gardener" count="13" />
        <TaskTag label="Chef" count="13" />
        <TaskTag label="Handyman" count="13" />
      </BentoItem>

      <BentoItem className="col-span-1 row-span-3 flex flex-col items-center justify-center bg-[#E5AF1F] p-6 text-center sm:col-span-2 md:p-12">
        <span className="mb-2 text-xs font-bold text-[#171C27]">
          Brand idea
        </span>
        <h2 className="text-7xl leading-[0.9] font-black tracking-tighter text-[#171C27]">
          Right
          <br />
          Skills for
          <br />
          You
        </h2>
        <span className="mt-6 text-xs font-bold text-[#171C27]">
          Welcome to Helper
        </span>
      </BentoItem>
    </motion.div>
  );
}

function BentoItem({
  children,
  className,
}: {
  children?: React.ReactNode;
  className: string;
}) {
  return (
    <motion.div
      variants={item}
      className={`overflow-hidden rounded-xl ${className}`}
    >
      <Card
        className={`h-full overflow-hidden rounded-xl border-none bg-transparent shadow-none ring-0`}
      >
        <CardContent className="flex h-full flex-col justify-center gap-3 p-0">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function WorkerCard({
  name,
  rating,
  job,
}: {
  name: string;
  rating: string;
  job: string;
}) {
  return (
    <div className="flex min-h-[150px] flex-1 flex-col justify-end rounded-xl bg-[#D9D9D9] p-3 sm:min-h-0 md:p-4">
      <div className="mb-3 md:mb-5">
        <h4 className="text-3xl leading-none font-black text-[#171C27] md:text-6xl">
          {name}
        </h4>
        <p className="ml-1 text-[10px] font-bold text-[#171C27] md:ml-4 md:text-xs">
          {rating} / {job}
        </p>
      </div>
      <button className="w-full rounded-full bg-[#E5AF1F] py-2 text-[10px] font-black text-[#171C27] uppercase md:text-xs">
        Contact Now
      </button>
    </div>
  );
}

function TaskTag({ label, count }: { label: string; count: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#171C27]/70 p-2">
      <span className="ml-2 text-xl font-bold text-white md:ml-8">{label}</span>
      <span className="rounded-md bg-[#E5AF1F] p-3 text-xl font-bold text-[#171C27] md:p-2">
        {count}
      </span>
    </div>
  );
}

function LogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M47.9985 29.3817C43.9025 2.62967 62.9318 -1.17833 72.9585 0.261672L62.7188 15.4612L68.7988 26.8212H81.7588C84.6388 22.6612 90.6548 14.0852 91.6788 13.0612C101.599 27.4613 87.5188 45.3812 76.3188 45.8612C67.3588 46.2453 63.9455 49.5412 63.3588 51.1413C51.1455 68.8479 27.5188 105.061 23.8388 107.301C18.5588 110.181 9.59846 112.741 3.03846 103.141C-3.52154 93.5412 2.87846 87.6212 20.4785 68.4212C47.0385 38.0212 47.9985 36.1012 47.9985 29.3817Z"
        fill="#162A37"
      />
      <path
        d="M11.8387 89.2219L6.71875 94.9819L8.95875 102.182L16.3187 103.782L21.9187 97.7019L19.1987 90.6619L11.8387 89.2219Z"
        fill="#ED5D3B"
        stroke="black"
        strokeWidth={0.32}
      />
      <path
        d="M44 2.34064H52C41.76 12.5806 43.36 22.6606 43.36 24.4206C21.472 32.3566 19.3067 52.5806 20.96 61.7006L11.84 72.1006L10.56 68.1006L0 65.3806V46.8206L10.56 44.1006L14.56 33.5406L8.8 24.5806L22.24 11.6206L31.2 17.3806L42.4 12.7406L44 2.34064Z"
        fill="#162A37"
      />
      <path
        d="M97.2626 45.0701L95.0575 37.38C88.0367 50.0458 77.9062 51.2862 76.2143 51.7714C74.6189 74.9989 55.7752 82.6549 46.5528 83.5794L39.0695 95.2127L43.2673 95.3406L48.7927 104.742L66.6337 99.6259L66.3376 88.7253L75.386 81.9695L85.5866 85.0367L94.3399 68.5451L86.3334 61.5198L87.7065 49.4747L97.2626 45.0701Z"
        fill="#162A37"
      />
    </svg>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 143 143"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0"
        // maskType="luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="143"
        height="143"
      >
        <path d="M0 0H142.5V142.5H0V0Z" fill="white" />
      </mask>

      <g mask="url(#mask0)">
        <path
          d="M138.75 123.75C138.75 127.728 137.17 131.544 134.357 134.357C131.544 137.17 127.728 138.75 123.75 138.75H18.75C14.7718 138.75 10.9564 137.17 8.1434 134.357C5.33036 131.544 3.75 127.728 3.75 123.75V37.5C3.75 33.5218 5.33036 29.7064 8.1434 26.8934C10.9564 24.0804 14.7718 22.5 18.75 22.5H123.75C127.728 22.5 131.544 24.0804 134.357 26.8934C137.17 29.7064 138.75 33.5218 138.75 37.5V123.75Z"
          fill="#E1E8ED"
        />
        <path
          d="M131.25 3.75H118.961C119.606 4.85625 120 6.1275 120 7.5C120 9.48912 119.21 11.3968 117.803 12.8033C116.397 14.2098 114.489 15 112.5 15C110.511 15 108.603 14.2098 107.197 12.8033C105.79 11.3968 105 9.48912 105 7.5C105 6.1275 105.394 4.85625 106.039 3.75H36.4613C37.1062 4.85625 37.5 6.1275 37.5 7.5C37.5 9.48912 36.7098 11.3968 35.3033 12.8033C33.8968 14.2098 31.9891 15 30 15C28.0109 15 26.1032 14.2098 24.6967 12.8033C23.2902 11.3968 22.5 9.48912 22.5 7.5C22.5 6.1275 22.8938 4.85625 23.5388 3.75H11.25C9.26088 3.75 7.35322 4.54018 5.94669 5.9467C4.54017 7.35322 3.75 9.26088 3.75 11.25V52.5H138.75V11.25C138.75 9.26088 137.96 7.35322 136.553 5.9467C135.147 4.54018 133.239 3.75 131.25 3.75Z"
          fill="#DD2E44"
        />
        <path
          d="M48.7448 74.9972H42.3886C38.3161 74.9972 36.6211 72.2559 36.6211 69.3722C36.6211 66.4022 38.7436 63.7472 42.3886 63.7472H54.4261C58.0711 63.7472 60.1073 66.3759 60.1073 69.7659V118.01C60.1073 122.247 58.0148 124.617 54.3698 124.617C50.7248 124.617 48.7448 122.247 48.7448 118.01V74.9972Z"
          fill="#66757F"
        />
        <path
          d="M24.337 37.4991C24.337 43.7953 20.3283 45.4453 16.9158 45.4453C14.332 45.4453 10.0195 44.4328 10.0195 41.1703C10.0195 40.1616 10.882 38.8866 12.1195 38.8866C13.6195 38.8866 14.932 40.2741 16.6158 40.2741C18.7158 40.2741 18.7158 38.3241 18.7158 37.1241V21.0103C18.7158 19.1353 19.9158 18.0853 21.5245 18.0853C23.1408 18.0853 24.337 19.1353 24.337 21.0103V37.4991Z"
          fill="#F5F8FA"
        />
        <path
          d="M27.2695 21.0066C27.2695 19.1316 28.4695 18.0816 30.082 18.0816C31.6945 18.0816 32.8945 19.1316 32.8945 21.0066V34.0866C32.8945 37.5366 35.1033 40.2703 38.6658 40.2703C42.0745 40.2703 44.3995 37.3866 44.3995 34.0866V21.0066C44.3995 19.1316 45.5958 18.0816 47.2083 18.0816C48.8208 18.0816 50.0208 19.1316 50.0208 21.0066V34.3866C50.0208 40.6828 44.8458 45.4453 38.6658 45.4453C32.407 45.4453 27.2695 40.7578 27.2695 34.3866V21.0066Z"
          fill="#F5F8FA"
        />
        <path
          d="M53.1797 21.0138C53.1797 19.1388 54.3797 18.0888 55.9922 18.0888C57.6009 18.0888 58.8009 19.1388 58.8009 21.0138V39.8275H65.4722C67.3847 39.8275 68.2097 41.2525 68.1722 42.5275C68.1325 43.2099 67.8281 43.8499 67.3239 44.3114C66.8197 44.7729 66.1554 45.0195 65.4722 44.9988H56.1047C54.2672 44.9988 53.1797 43.8025 53.1797 41.9275V21.0138Z"
          fill="#F5F8FA"
        />
        <path
          d="M123.75 41.25C123.75 42.2446 124.145 43.1984 124.848 43.9017C125.552 44.6049 126.505 45 127.5 45C128.495 45 129.448 44.6049 130.152 43.9017C130.855 43.1984 131.25 42.2446 131.25 41.25C131.25 40.2554 130.855 39.3016 130.152 38.5983C129.448 37.8951 128.495 37.5 127.5 37.5C126.505 37.5 125.552 37.8951 124.848 38.5983C124.145 39.3016 123.75 40.2554 123.75 41.25Z"
          fill="#F4ABBA"
        />
        <path
          d="M123.75 30C123.75 30.9946 124.145 31.9484 124.848 32.6517C125.552 33.3549 126.505 33.75 127.5 33.75C128.495 33.75 129.448 33.3549 130.152 32.6517C130.855 31.9484 131.25 30.9946 131.25 30C131.25 29.0054 130.855 28.0516 130.152 27.3483C129.448 26.6451 128.495 26.25 127.5 26.25C126.505 26.25 125.552 26.6451 124.848 27.3483C124.145 28.0516 123.75 29.0054 123.75 30Z"
          fill="#F4ABBA"
        />
        <path
          d="M112.5 41.25C112.5 42.2446 112.895 43.1984 113.598 43.9017C114.302 44.6049 115.255 45 116.25 45C117.245 45 118.198 44.6049 118.902 43.9017C119.605 43.1984 120 42.2446 120 41.25C120 40.2554 119.605 39.3016 118.902 38.5983C118.198 37.8951 117.245 37.5 116.25 37.5C115.255 37.5 114.302 37.8951 113.598 38.5983C112.895 39.3016 112.5 40.2554 112.5 41.25Z"
          fill="#F4ABBA"
        />
        <path
          d="M112.5 30C112.5 30.9946 112.895 31.9484 113.598 32.6517C114.302 33.3549 115.255 33.75 116.25 33.75C117.245 33.75 118.198 33.3549 118.902 32.6517C119.605 31.9484 120 30.9946 120 30C120 29.0054 119.605 28.0516 118.902 27.3483C118.198 26.6451 117.245 26.25 116.25 26.25C115.255 26.25 114.302 26.6451 113.598 27.3483C112.895 28.0516 112.5 29.0054 112.5 30Z"
          fill="#F4ABBA"
        />
        <path
          d="M101.25 41.25C101.25 42.2446 101.645 43.1984 102.348 43.9017C103.052 44.6049 104.005 45 105 45C105.995 45 106.948 44.6049 107.652 43.9017C108.355 43.1984 108.75 42.2446 108.75 41.25C108.75 40.2554 108.355 39.3016 107.652 38.5983C106.948 37.8951 105.995 37.5 105 37.5C104.005 37.5 103.052 37.8951 102.348 38.5983C101.645 39.3016 101.25 40.2554 101.25 41.25Z"
          fill="#F4ABBA"
        />
        <path
          d="M101.25 30C101.25 30.9946 101.645 31.9484 102.348 32.6517C103.052 33.3549 104.005 33.75 105 33.75C105.995 33.75 106.948 33.3549 107.652 32.6517C108.355 31.9484 108.75 30.9946 108.75 30C108.75 29.0054 108.355 28.0516 107.652 27.3483C106.948 26.6451 105.995 26.25 105 26.25C104.005 26.25 103.052 26.6451 102.348 27.3483C101.645 28.0516 101.25 29.0054 101.25 30Z"
          fill="#F4ABBA"
        />
        <path
          d="M90 30C90 30.9946 90.3951 31.9484 91.0983 32.6517C91.8016 33.3549 92.7554 33.75 93.75 33.75C94.7446 33.75 95.6984 33.3549 96.4017 32.6517C97.1049 31.9484 97.5 30.9946 97.5 30C97.5 29.0054 97.1049 28.0516 96.4017 27.3483C95.6984 26.6451 94.7446 26.25 93.75 26.25C92.7554 26.25 91.8016 26.6451 91.0983 27.3483C90.3951 28.0516 90 29.0054 90 30Z"
          fill="#F4ABBA"
        />
        <path
          d="M90 41.25C90 42.2446 90.3951 43.1984 91.0983 43.9017C91.8016 44.6049 92.7554 45 93.75 45C94.7446 45 95.6984 44.6049 96.4017 43.9017C97.1049 43.1984 97.5 42.2446 97.5 41.25C97.5 40.2554 97.1049 39.3016 96.4017 38.5983C95.6984 37.8951 94.7446 37.5 93.75 37.5C92.7554 37.5 91.8016 37.8951 91.0983 38.5983C90.3951 39.3016 90 40.2554 90 41.25Z"
          fill="#F4ABBA"
        />
        <path
          d="M84.6675 84.3867C86.6963 83.9667 88.8975 83.5392 91.0088 83.5392C101.243 83.5392 108.514 91.658 108.514 101.554C108.514 115.68 100.736 124.98 86.1075 124.98C80.1 124.98 67.5 121.092 67.5 113.652C67.5156 112.132 68.1262 110.678 69.2008 109.603C70.2754 108.527 71.7286 107.916 73.2487 107.899C76.6313 107.899 80.6925 113.31 86.3588 113.31C92.2763 113.31 95.325 107.562 95.325 102.233C95.325 97.1555 92.4487 93.6867 87.2063 93.6867C82.2975 93.6867 81.54 96.4842 77.2275 96.4842C73.9275 96.4842 72.2362 93.9455 72.2362 92.5055C72.2362 91.4067 72.4013 90.5592 72.4913 89.6292L74.6025 71.7867C75.5325 65.1905 77.1413 63.7505 81.1988 63.7505H101.584C105.473 63.7505 107.756 66.0342 107.756 69.0792C107.756 74.918 103.358 75.0005 101.835 75.0005H85.935L84.6675 84.3867Z"
          fill="#66757F"
        />
      </g>
    </svg>
  );
}
