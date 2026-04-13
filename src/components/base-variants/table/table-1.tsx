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
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaShoppingCart,
} from "react-icons/fa";

const orders = [
  {
    id: "ORD-1001",
    customer: "Aarav Sharma",
    status: "Delivered",
    amount: "₹1,200",
    icon: <FaCheckCircle className="text-green-500" />,
  },
  {
    id: "ORD-1002",
    customer: "Priya Verma",
    status: "Processing",
    amount: "₹850",
    icon: <FaClock className="text-yellow-500" />,
  },
  {
    id: "ORD-1003",
    customer: "Rohan Mehta",
    status: "Cancelled",
    amount: "₹640",
    icon: <FaTimesCircle className="text-red-500" />,
  },
  {
    id: "ORD-1004",
    customer: "Sneha Kapoor",
    status: "Delivered",
    amount: "₹2,300",
    icon: <FaCheckCircle className="text-green-500" />,
  },
  {
    id: "ORD-1005",
    customer: "Karan Malhotra",
    status: "Processing",
    amount: "₹1,120",
    icon: <FaClock className="text-yellow-500" />,
  },
  {
    id: "ORD-1006",
    customer: "Neha Gupta",
    status: "Delivered",
    amount: "₹980",
    icon: <FaCheckCircle className="text-green-500" />,
  },
];

const Table1 = () => {
  return (
    <div className="w-full">
      <div className="overflow-hidden">
        <Table className="overflow-x-scroll">
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="flex items-center gap-2 font-medium">
                  <FaShoppingCart className="text-primary" />
                  {order.id}
                </TableCell>

                <TableCell>{order.customer}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    {order.icon}
                    <span>{order.status}</span>
                  </div>
                </TableCell>

                <TableCell className="text-right font-medium">
                  {order.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Revenue</TableCell>
              <TableCell className="text-right font-semibold">₹7,090</TableCell>
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

export default Table1;
