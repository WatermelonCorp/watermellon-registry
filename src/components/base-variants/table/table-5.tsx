import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HiCube,
  HiCheckCircle,
  HiCreditCard,
  HiCurrencyRupee,
} from "react-icons/hi";

const orders = [
  {
    orderId: "ORD001",
    status: "Delivered",
    amount: "₹120.00",
    method: "UPI",
  },
  {
    orderId: "ORD002",
    status: "Processing",
    amount: "₹80.00",
    method: "Credit Card",
  },
  {
    orderId: "ORD003",
    status: "Cancelled",
    amount: "₹200.00",
    method: "Cash on Delivery",
  },
  {
    orderId: "ORD004",
    status: "Delivered",
    amount: "₹350.00",
    method: "Net Banking",
  },
  {
    orderId: "ORD005",
    status: "Processing",
    amount: "₹150.00",
    method: "UPI",
  },
];

const Table5 = () => {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-xl border shadow-xs">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-25">
                <div className="flex items-center gap-1">
                  <HiCube className="h-4 w-4 shrink-0" />
                  Order ID
                </div>
              </TableHead>

              <TableHead>
                <div className="flex items-center gap-1">
                  <HiCheckCircle className="h-4 w-4 shrink-0" />
                  Status
                </div>
              </TableHead>

              <TableHead>
                <div className="flex items-center gap-1">
                  <HiCreditCard className="h-4 w-4 shrink-0" />
                  Payment Method
                </div>
              </TableHead>

              <TableHead className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <HiCurrencyRupee className="h-4 w-4 shrink-0" />
                  Amount
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell className="font-medium">{order.orderId}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.method}</TableCell>
                <TableCell className="text-right">{order.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">₹900.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <p className="text-muted-foreground mt-4 text-center text-sm">
        Recent orders table
      </p>
    </div>
  );
};

export default Table5;
