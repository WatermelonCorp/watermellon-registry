"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  {
    id: "TXN001",
    type: "Credit",
    amount: "₹2,500.00",
    method: "UPI",
  },
  {
    id: "TXN002",
    type: "Debit",
    amount: "₹1,200.00",
    method: "Credit Card",
  },
  {
    id: "TXN003",
    type: "Credit",
    amount: "₹3,800.00",
    method: "Net Banking",
  },
  {
    id: "TXN004",
    type: "Debit",
    amount: "₹900.00",
    method: "Wallet",
  },
  {
    id: "TXN005",
    type: "Credit",
    amount: "₹4,200.00",
    method: "UPI",
  },
  {
    id: "TXN006",
    type: "Debit",
    amount: "₹700.00",
    method: "Debit Card",
  },
  {
    id: "TXN007",
    type: "Credit",
    amount: "₹1,500.00",
    method: "Bank Transfer",
  },
];

const Table7 = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-xl border shadow-xs">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-30">Transaction ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((txn) => {
              const isSelected = selectedId === txn.id;

              return (
                <TableRow
                  key={txn.id}
                  onClick={() => setSelectedId(isSelected ? null : txn.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-primary/30 hover:bg-primary/25"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <TableCell className="font-medium">{txn.id}</TableCell>
                  <TableCell>{txn.type}</TableCell>
                  <TableCell>{txn.method}</TableCell>
                  <TableCell className="text-right">{txn.amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Net Balance</TableCell>
              <TableCell className="text-right">₹9,200.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <p className="text-muted-foreground mt-4 text-center text-sm">
        Click a row to highlight it
      </p>
    </div>
  );
};

export default Table7;
