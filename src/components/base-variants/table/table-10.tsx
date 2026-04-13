import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
  { id: "ORD001", status: "Delivered", amount: "₹2,500", method: "UPI" },
  { id: "ORD002", status: "Processing", amount: "₹1,200", method: "Card" },
  {
    id: "ORD003",
    status: "Cancelled",
    amount: "₹3,800",
    method: "Net Banking",
  },
  { id: "ORD004", status: "Delivered", amount: "₹900", method: "Wallet" },
  { id: "ORD005", status: "Delivered", amount: "₹4,200", method: "UPI" },
  { id: "ORD006", status: "Processing", amount: "₹700", method: "Debit Card" },
  {
    id: "ORD007",
    status: "Cancelled",
    amount: "₹1,500",
    method: "Bank Transfer",
  },
  { id: "ORD008", status: "Delivered", amount: "₹2,100", method: "UPI" },
  { id: "ORD009", status: "Processing", amount: "₹950", method: "Google Pay" },
  { id: "ORD010", status: "Cancelled", amount: "₹1,800", method: "Apple Pay" },
];

const Table10 = () => {
  return (
    <div className="w-full">
      <div className="grid [&>div]:max-h-70 [&>div]:overflow-y-auto [&>div]:rounded-sm [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted sticky top-0 z-20 shadow-[inset_0px_0px_4px_0_rgba(0,0,0,0.05)]">
              <TableHead className="w-25">Order ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.method}</TableCell>
                <TableCell className="text-right">{order.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow className="bg-muted hover:bg-muted sticky bottom-0 z-20 shadow-[inset_0px_0px_4px_0_rgba(0,0,0,0.05)]">
              <TableCell colSpan={3}>Total Revenue</TableCell>
              <TableCell className="text-right">₹19,650</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <p className="text-muted-foreground mt-4 text-center text-sm">
        Sticky header & footer table
      </p>
    </div>
  );
};

export default Table10;
