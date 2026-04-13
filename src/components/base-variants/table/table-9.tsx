"use client";

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
  { id: "TXN001", status: "Success", amount: "₹2,500", method: "UPI" },
  { id: "TXN002", status: "Pending", amount: "₹1,200", method: "Card" },
  { id: "TXN003", status: "Failed", amount: "₹3,800", method: "Net Banking" },
  { id: "TXN004", status: "Success", amount: "₹900", method: "Wallet" },
  { id: "TXN005", status: "Success", amount: "₹4,200", method: "UPI" },
  { id: "TXN006", status: "Pending", amount: "₹700", method: "Debit Card" },
  { id: "TXN007", status: "Failed", amount: "₹1,500", method: "Bank Transfer" },
  { id: "TXN008", status: "Success", amount: "₹2,100", method: "UPI" },
  { id: "TXN009", status: "Pending", amount: "₹950", method: "Google Pay" },
  { id: "TXN010", status: "Failed", amount: "₹1,800", method: "Apple Pay" },
];

const Table9 = () => {
  return (
    <div className="w-full">
      <div className="overflow-y-auto [&>div]:max-h-70 [&>div]:rounded-sm [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="from-muted/90 via-muted/70 to-muted/30 sticky top-0 z-20 bg-gradient-to-b backdrop-blur-sm rounded-t-sm">
              <TableHead className="w-25">Transaction</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell className="font-medium">{txn.id}</TableCell>
                <TableCell>{txn.status}</TableCell>
                <TableCell>{txn.method}</TableCell>
                <TableCell className="text-right">{txn.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">₹19,650</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <p className="text-muted-foreground mt-4 text-center text-sm">
        Sticky header with  blur
      </p>
    </div>
  );
};

export default Table9;
