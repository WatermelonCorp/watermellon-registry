import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FaCheckCircle, FaClock, FaTimesCircle, FaUser } from "react-icons/fa";

const users = [
  {
    id: "USR-001",
    name: "Ritik Gupta",
    status: "Active",
    plan: "Pro",
    spend: "₹1,999",
    icon: <FaCheckCircle className="text-green-500" />,
  },
  {
    id: "USR-002",
    name: "Ananya Singh",
    status: "Pending",
    plan: "Basic",
    spend: "₹499",
    icon: <FaClock className="text-yellow-500" />,
  },
  {
    id: "USR-003",
    name: "Kunal Shah",
    status: "Blocked",
    plan: "Pro",
    spend: "₹2,499",
    icon: <FaTimesCircle className="text-red-500" />,
  },
  {
    id: "USR-004",
    name: "Meera Joshi",
    status: "Active",
    plan: "Enterprise",
    spend: "₹5,999",
    icon: <FaCheckCircle className="text-green-500" />,
  },
  {
    id: "USR-005",
    name: "Aditya Verma",
    status: "Active",
    plan: "Basic",
    spend: "₹799",
    icon: <FaCheckCircle className="text-green-500" />,
  },
];

const Table2 = () => {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-xl border shadow-xs">
        <Table>
          <TableHeader>
            <TableRow className="*:border-border bg-muted/50 [&>:not(:last-child)]:border-r">
              <TableHead className="w-32">User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead className="text-right">Spend</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="*:border-border [&>:not(:last-child)]:border-r"
              >
                <TableCell className="flex items-center gap-2 font-medium">
                  <FaUser className="text-primary" />
                  {user.name}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    {user.icon}
                    <span>{user.status}</span>
                  </div>
                </TableCell>

                <TableCell>{user.plan}</TableCell>

                <TableCell className="text-right font-medium">
                  {user.spend}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Revenue</TableCell>
              <TableCell className="text-right font-semibold">
                ₹11,795
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <p className="text-muted-foreground mt-4 text-center text-sm">
        User subscription table
      </p>
    </div>
  );
};

export default Table2;
