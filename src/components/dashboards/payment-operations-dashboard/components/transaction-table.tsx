import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  IconActivity,
  IconClock,
  IconCreditCard,
  IconCurrencyRupee,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const transactions = [
  {
    customer: "Pratik Singh",
    amount: "₹24,999",
    status: "Success",
    method: "Card",
    time: "3 mins ago",
  },
  {
    customer: "Sarah Johnson",
    amount: "₹38,500",
    status: "Refunded",
    method: "Transfer",
    time: "1 hour ago",
  },
  {
    customer: "Mark Lee",
    amount: "₹19,999",
    status: "Failed",
    method: "Payment",
    time: "2 hours ago",
  },
  {
    customer: "Emily Davis",
    amount: "₹29,999",
    status: "Refunded",
    method: "Card",
    time: "5 mins ago",
  },
  {
    customer: "Michael Brown",
    amount: "₹41,999",
    status: "Success",
    method: "Transfer",
    time: "30 mins ago",
  },
];

export const rows = [
  { name: "CUSTOMER", icon: <IconUser size={14} stroke={2.5} /> },
  { name: "AMOUNT", icon: <IconCurrencyRupee size={14} stroke={2.5} /> },
  { name: "STATUS", icon: <IconActivity size={14} stroke={2.5} /> },
  { name: "METHOD", icon: <IconCreditCard size={14} stroke={2.5} /> },
  { name: "TIME", icon: <IconClock size={14} stroke={2.5} /> },
  { name: "ACTION", icon: <IconSettings size={14} stroke={2.5} /> },
];

export function TransactionsTable() {
  return (
    <Card className="border-none rounded-none bg-zinc-100 dark:bg-zinc-800 w-full p-0.5 gap-0 pb-1 group/card">
      <CardHeader className="p-2">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="size-4 text-muted-foreground group-hover/card:text-primary transition-colors duration-300" />
          <CardTitle className="text-sm font-medium text-foreground">
            Recent Transactions
          </CardTitle>
        </div>
      </CardHeader>
      <Table className="bg-white dark:bg-zinc-900 gap-0 table-auto">
        <TableHeader className="bg-slate-50/50 dark:bg-neutral-900/20 dark:hover:bg-neutral-800">
          <TableRow>
            {rows.map((row, i) => (
              <TableHead key={i} className="w-[200px] text-xs font-semibold ">
                <div className="flex items-center gap-0.5">
                  <div>{row.icon}</div>
                  {row.name}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {transactions.map((tx, i) => (
            <TableRow
              key={i}
              className="hover:bg-slate-50/50 dark:hover:bg-neutral-800 transition-colors cursor-pointer group"
            >
              <TableCell className="font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                {tx.customer}
              </TableCell>
              <TableCell className="tabular-nums font-medium text-muted-foreground">
                {tx.amount}
              </TableCell>
              <TableCell className="">
                <div
                  className={`
                  font-normal px-2 py-0.5 rounded-none w-fit 
                  ${tx.status === "Success"
                      ? "bg-green-500/20 text-green-600"
                      : tx.status === "Refunded"
                        ? "bg-orange-500/20 text-orange-600"
                        : "bg-red-500/20 text-red-600"
                    }
                `}
                >
                  {tx.status}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {tx.method}
              </TableCell>
              <TableCell className="text-muted-foreground">{tx.time}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-muted-foreground dark:text-muted-foreground text-sm font-medium underline underline-offset-3 hover:text-foreground transition-colors">
                      {tx.status === "Failed" ? "Retry" : "View"}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md rounded-none shadow-2xl p-0 overflow-hidden border-zinc-200 dark:border-zinc-800">
                    <div className="p-6 pb-0">
                      <DialogHeader>
                        <DialogTitle className="text-xl tracking-tight">Transaction Details</DialogTitle>
                        <DialogDescription className="font-mono text-xs mt-1">
                          ID: TX-{10098 + i}
                        </DialogDescription>
                      </DialogHeader>
                    </div>

                    <div className="px-6 py-5">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 space-y-1">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</p>
                          <p className="text-base font-medium text-foreground">{tx.customer}</p>
                        </div>
                        <div className="flex-1 space-y-1 text-right">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</p>
                          <p className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">{tx.amount}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-y-6 gap-x-4 py-4 border-y border-zinc-200 dark:border-zinc-800">
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</p>
                          <div
                            className={`font-medium px-2 py-0.5 rounded-none w-fit text-xs inline-flex items-center 
                            ${tx.status === "Success"
                                ? "bg-green-500/20 text-green-700 dark:text-green-500"
                                : tx.status === "Refunded"
                                  ? "bg-orange-500/20 text-orange-700 dark:text-orange-500"
                                  : "bg-red-500/20 text-red-700 dark:text-red-500"
                              }`}
                          >
                            {tx.status}
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Method</p>
                          <p className="text-sm font-medium text-foreground">{tx.method}</p>
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Time</p>
                          <p className="text-sm font-medium text-foreground">{tx.time}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 sm:justify-end">
                      <Button variant="outline" className="rounded-none h-9 text-xs font-medium w-full sm:w-auto hover:bg-zinc-100 dark:hover:bg-zinc-800">Download Receipt</Button>
                      <Button className="rounded-none h-9 text-xs font-medium w-full sm:w-auto bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors">
                        {tx.status === "Failed" ? "Retry Payment" : tx.status === "Refunded" ? "View Refund" : "Refund Payment"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
