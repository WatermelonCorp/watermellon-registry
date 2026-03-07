"use client";
import { FailedPayments } from "./components/failed-payment";
import { DashboardHeader } from "./components/header";
import { PaymentsSummary } from "./components/payment-summary";
import { RevenueChart } from "./components/revenue-charts";
import { TransactionsTable } from "./components/transaction-table";
import { SidebarTrigger, useSidebar } from "./components/ui/sidebar";

export default function DashboardView() {
  const { isMobile } = useSidebar();

  return (
    <div className="flex flex-col min-h-screen w-full px-4 md:px-12 pt-16 pb-4 2xl:px-40 font-sans  gap-8 overflow-y-scroll overflow-x-hidden">
      {isMobile && <SidebarTrigger className="absolute inset-0" />}
      <DashboardHeader />
      <RevenueChart />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PaymentsSummary />
        <FailedPayments />
      </div>
      <TransactionsTable />
    </div>
  );
}