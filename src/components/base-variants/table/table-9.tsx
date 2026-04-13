'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const transactions = [
  { id: 'TXN001', status: 'Success', amount: '₹2,500', method: 'UPI' },
  { id: 'TXN002', status: 'Pending', amount: '₹1,200', method: 'Card' },
  { id: 'TXN003', status: 'Failed', amount: '₹3,800', method: 'Net Banking' },
  { id: 'TXN004', status: 'Success', amount: '₹900', method: 'Wallet' },
  { id: 'TXN005', status: 'Success', amount: '₹4,200', method: 'UPI' },
  { id: 'TXN006', status: 'Pending', amount: '₹700', method: 'Debit Card' },
  { id: 'TXN007', status: 'Failed', amount: '₹1,500', method: 'Bank Transfer' },
  { id: 'TXN008', status: 'Success', amount: '₹2,100', method: 'UPI' },
  { id: 'TXN009', status: 'Pending', amount: '₹950', method: 'Google Pay' },
  { id: 'TXN010', status: 'Failed', amount: '₹1,800', method: 'Apple Pay' },
];

const Table9 = () => {
  return (
    <div className="w-full">
      <div className="rounded-lg border shadow-sm overflow-hidden bg-background isolate">
        <div className="[&>div]:max-h-80 [&>div]:overflow-auto [&>div]:[clip-path:inset(0_round_0.5rem)]">
          <Table className="border-separate border-spacing-0">
            <TableHeader>
              <TableRow className="from-muted/95 via-muted/90 to-muted/80 sticky top-0 z-20 bg-gradient-to-b backdrop-blur-md">
                <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground border-b border-border/50">
                  Transaction
                </TableHead>
                <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground border-b border-border/50">
                  Status
                </TableHead>
                <TableHead className="h-12 px-4 text-left align-middle font-medium text-muted-foreground border-b border-border/50">
                  Method
                </TableHead>
                <TableHead className="h-12 px-4 text-right align-middle font-medium text-muted-foreground border-b border-border/50">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="h-12 px-4 align-middle font-medium">{txn.id}</TableCell>
                  <TableCell className="h-12 px-4 align-middle">{txn.status}</TableCell>
                  <TableCell className="h-12 px-4 align-middle">{txn.method}</TableCell>
                  <TableCell className="h-12 px-4 text-right align-middle font-mono">{txn.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow className="bg-muted/20 hover:bg-muted/20 border-t border-border/50">
                <TableCell colSpan={3} className="h-12 px-4 align-middle font-medium">Total</TableCell>
                <TableCell className="h-12 px-4 text-right align-middle font-bold text-primary">₹19,650</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>

      <p className="text-muted-foreground mt-4 text-center text-sm font-medium">
        Sticky header with precision-clipped corners and glassmorphism
      </p>
    </div>
  );
};

export default Table9;
