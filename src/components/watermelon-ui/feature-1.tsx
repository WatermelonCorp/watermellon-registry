"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  HiLightBulb,
  HiShieldCheck,
  HiSupport,
  HiDatabase,
  HiSwitchHorizontal,
} from "react-icons/hi";

export default function Features1() {
  return (
    <div className="theme-injected flex w-full flex-col items-center justify-center px-6 py-16">
      <h1 className="mb-12 max-w-3xl text-center text-3xl leading-[0.98] font-semibold md:text-5xl">
        Send and receive money anytime, anywhere
      </h1>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="bg-muted/50 rounded-3xl ring-0 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <CardContent className="p-6">
            <div className="bg-muted dark:bg-muted/10 mb-2 size-fit rounded-lg p-px">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 shadow-[inset_0_-2px_0.5px_0px_rgba(0,0,0,0),inset_0px_2px_0_2px_rgba(255,255,255,1),0_0px_6px_0_rgba(0,0,0,0.07),0_2px_4px_0_rgba(0,0,0,0.05)] dark:bg-black/20 dark:shadow-[inset_0_-1px_0px_0px_rgba(0,0,0,0.1),inset_0px_1px_0px_0px_rgba(255,255,255,0.05),0_0px_2px_0_rgba(0,0,0,0.2),0_1px_4px_0_rgba(0,0,0,0.05)]">
                <HiLightBulb className="h-5 w-5 text-orange-500" />
              </div>
            </div>
            <h3 className="text-lg font-medium">Smart issue detection</h3>
            <p className="text-muted-foreground mb-3 text-sm">
              Identify and resolve payment issues instantly with intelligent
              monitoring.
            </p>
            <div className="bg-muted dark:bg-muted/10 inline-flex rounded-lg p-0.5">
              <div className="text-muted-foreground inline-flex items-center rounded-md bg-white/80 px-2 py-1 text-[10px] font-medium shadow-[inset_0_-2px_0.5px_0px_rgba(0,0,0,0),inset_0px_2px_0_2px_rgba(255,255,255,1),0_0px_2px_0_rgba(0,0,0,0.08),0_1px_4px_0_rgba(0,0,0,0.05)] dark:bg-black/20 dark:shadow-[inset_0_-1px_0px_0px_rgba(0,0,0,0.1),inset_0px_1px_0px_0px_rgba(255,255,255,0.04),0_0px_2px_0_rgba(0,0,0,0.08),0_1px_4px_0_rgba(0,0,0,0.05)]">
                Real-time alerts
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 rounded-3xl ring-0 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <CardContent className="p-6">
            <div className="bg-muted dark:bg-muted/10 mb-2 size-fit rounded-lg p-px">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 shadow-[inset_0_-2px_0.5px_0px_rgba(0,0,0,0),inset_0px_2px_0_2px_rgba(255,255,255,1),0_0px_6px_0_rgba(0,0,0,0.07),0_2px_4px_0_rgba(0,0,0,0.05)] dark:bg-black/20 dark:shadow-[inset_0_-1px_0px_0px_rgba(0,0,0,0.1),inset_0px_1px_0px_0px_rgba(255,255,255,0.05),0_0px_2px_0_rgba(0,0,0,0.2),0_1px_4px_0_rgba(0,0,0,0.05)]">
                <HiDatabase className="h-5 w-5 text-purple-500" />
              </div>
            </div>
            <h3 className="mb-1 text-lg font-medium">Fast transactions</h3>
            <p className="text-muted-foreground mb-3 text-sm">
              Experience smooth and quick transfers with minimal delays.
            </p>
            <div className="bg-muted dark:bg-muted/10 inline-flex rounded-lg p-0.5">
              <div className="text-muted-foreground inline-flex items-center rounded-md bg-white/80 px-2 py-1 text-[10px] font-medium shadow-[inset_0_-2px_0.5px_0px_rgba(0,0,0,0),inset_0px_2px_0_2px_rgba(255,255,255,1),0_0px_2px_0_rgba(0,0,0,0.08),0_1px_4px_0_rgba(0,0,0,0.05)] dark:bg-black/20 dark:shadow-[inset_0_-1px_0px_0px_rgba(0,0,0,0.1),inset_0px_1px_0px_0px_rgba(255,255,255,0.04),0_0px_2px_0_rgba(0,0,0,0.08),0_1px_4px_0_rgba(0,0,0,0.05)]">
                Avg speed &lt; 1.5s
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 row-span-2 flex flex-col justify-between rounded-3xl ring-0 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.7)]">
          <CardContent className="p-6">
            <div className="bg-muted dark:bg-muted/10 mb-3 size-fit rounded-lg p-px">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 shadow-[inset_0_-2px_0.5px_0px_rgba(0,0,0,0),inset_0px_2px_0_2px_rgba(255,255,255,1),0_0px_6px_0_rgba(0,0,0,0.07),0_2px_4px_0_rgba(0,0,0,0.05)] dark:bg-black/20 dark:shadow-[inset_0_-1px_0px_0px_rgba(0,0,0,0.1),inset_0px_1px_0px_0px_rgba(255,255,255,0.05),0_0px_2px_0_rgba(0,0,0,0.2),0_1px_4px_0_rgba(0,0,0,0.05)]">
                <HiShieldCheck className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-medium">
              Secure & reliable payments
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Built with strong encryption and continuous monitoring to keep
              every transaction safe and smooth.
            </p>

            <div className="space-y-3">
              <div className="bg-muted dark:bg-muted/10 flex items-center justify-between rounded-md px-3 py-2 text-xs">
                <span className="text-muted-foreground">Encryption</span>
                <span className="font-medium">AES-256</span>
              </div>
              <div className="bg-muted dark:bg-muted/10 flex items-center justify-between rounded-md px-3 py-2 text-xs">
                <span className="text-muted-foreground">Fraud detection</span>
                <span className="font-medium">Active</span>
              </div>
              <div className="bg-muted dark:bg-muted/10 flex items-center justify-between rounded-md px-3 py-2 text-xs">
                <span className="text-muted-foreground">Uptime</span>
                <span className="font-medium">99.99%</span>
              </div>
            </div>
          </CardContent>

          <div className="px-6 pb-6">
            <div className="bg-muted dark:bg-muted/10 inline-flex rounded-lg p-0.5">
              <div className="text-muted-foreground inline-flex items-center rounded-md bg-white/80 px-2 py-1 text-[10px] font-medium shadow-[inset_0_-2px_0.5px_0px_rgba(0,0,0,0),inset_0px_2px_0_2px_rgba(255,255,255,1),0_0px_2px_0_rgba(0,0,0,0.08),0_1px_4px_0_rgba(0,0,0,0.05)] dark:bg-black/20 dark:shadow-[inset_0_-1px_0px_0px_rgba(0,0,0,0.1),inset_0px_1px_0px_0px_rgba(255,255,255,0.04),0_0px_2px_0_rgba(0,0,0,0.08),0_1px_4px_0_rgba(0,0,0,0.05)]">
                Monitored continuously
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-muted/50 rounded-3xl ring-0 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <CardContent className="p-6">
            <div className="bg-muted dark:bg-muted/10 mb-2 size-fit rounded-lg p-px">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 shadow-[inset_0_-2px_0.5px_0px_rgba(0,0,0,0),inset_0px_2px_0_2px_rgba(255,255,255,1),0_0px_6px_0_rgba(0,0,0,0.07),0_2px_4px_0_rgba(0,0,0,0.05)] dark:bg-black/20 dark:shadow-[inset_0_-1px_0px_0px_rgba(0,0,0,0.1),inset_0px_1px_0px_0px_rgba(255,255,255,0.05),0_0px_2px_0_rgba(0,0,0,0.2),0_1px_4px_0_rgba(0,0,0,0.05)]">
                <HiSwitchHorizontal className="h-5 w-5 text-pink-500" />
              </div>
            </div>
            <h3 className="mb-1 text-lg font-medium">Effortless transfers</h3>
            <p className="text-muted-foreground mb-3 text-sm">
              Move money between accounts instantly with a seamless experience.
            </p>
            <div className="bg-muted dark:bg-muted/10 inline-flex rounded-lg p-0.5">
              <div className="text-muted-foreground inline-flex items-center rounded-md bg-white/80 px-2 py-1 text-[10px] font-medium shadow-[inset_0_-2px_0.5px_0px_rgba(0,0,0,0),inset_0px_2px_0_2px_rgba(255,255,255,1),0_0px_2px_0_rgba(0,0,0,0.08),0_1px_4px_0_rgba(0,0,0,0.05)] dark:bg-black/20 dark:shadow-[inset_0_-1px_0px_0px_rgba(0,0,0,0.1),inset_0px_1px_0px_0px_rgba(255,255,255,0.04),0_0px_2px_0_rgba(0,0,0,0.08),0_1px_4px_0_rgba(0,0,0,0.05)]">
                No hidden delays
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 rounded-3xl ring-0 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <CardContent className="p-6">
            <div className="bg-muted dark:bg-muted/10 mb-2 size-fit rounded-lg p-px">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 shadow-[inset_0_-2px_0.5px_0px_rgba(0,0,0,0),inset_0px_2px_0_2px_rgba(255,255,255,1),0_0px_6px_0_rgba(0,0,0,0.07),0_2px_4px_0_rgba(0,0,0,0.05)] dark:bg-black/20 dark:shadow-[inset_0_-1px_0px_0px_rgba(0,0,0,0.1),inset_0px_1px_0px_0px_rgba(255,255,255,0.05),0_0px_2px_0_rgba(0,0,0,0.2),0_1px_4px_0_rgba(0,0,0,0.05)]">
                <HiSupport className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <h3 className="mb-1 text-lg font-medium">Always-on support</h3>
            <p className="text-muted-foreground mb-3 text-sm">
              Get assistance anytime with responsive and reliable customer help.
            </p>
            <div className="bg-muted dark:bg-muted/10 inline-flex rounded-lg p-0.5">
              <div className="text-muted-foreground inline-flex items-center rounded-md bg-white/80 px-2 py-1 text-[10px] font-medium shadow-[inset_0_-2px_0.5px_0px_rgba(0,0,0,0),inset_0px_2px_0_2px_rgba(255,255,255,1),0_0px_2px_0_rgba(0,0,0,0.08),0_1px_4px_0_rgba(0,0,0,0.05)] dark:bg-black/20 dark:shadow-[inset_0_-1px_0px_0px_rgba(0,0,0,0.1),inset_0px_1px_0px_0px_rgba(255,255,255,0.04),0_0px_2px_0_rgba(0,0,0,0.08),0_1px_4px_0_rgba(0,0,0,0.05)]">
                24/7 availability
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
