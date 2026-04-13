import { useId } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const accounts = [
  {
    id: "1",
    name: "Aarav Sharma",
    email: "aarav@fintech.com",
    location: "Delhi, India",
    status: "Active",
    balance: "₹1,20,000",
  },
  {
    id: "2",
    name: "Priya Verma",
    email: "priya@fintech.com",
    location: "Bangalore, India",
    status: "Active",
    balance: "₹8,500",
  },
  {
    id: "3",
    name: "Rohan Gupta",
    email: "rohan@fintech.com",
    location: "Singapore",
    status: "Inactive",
    balance: "₹0",
  },
  {
    id: "4",
    name: "Sneha Kapoor",
    email: "sneha@fintech.com",
    location: "Mumbai, India",
    status: "Active",
    balance: "₹52,300",
  },
  {
    id: "5",
    name: "Kunal Mehta",
    email: "kunal@fintech.com",
    location: "Dubai, UAE",
    status: "Overdue",
    balance: "-₹12,000",
  },
];

const Table13 = () => {
  const id = useId();

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-600/10 text-green-600 border-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:border-green-400/20";
      case "Inactive":
        return "bg-yellow-600/10 text-yellow-600 border-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-400 dark:border-yellow-400/20";
      case "Overdue":
        return "bg-red-600/10 text-red-600 border-red-600/20 dark:bg-red-400/10 dark:text-red-400 dark:border-red-400/20";
      default:
        return "";
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,1),inset_0px_-1px_4px_0px_rgba(0,0,0,0.05)] dark:shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.1),inset_0px_-1px_2px_0px_rgba(0,0,0,0.02)]">
              <TableHead>
                <Checkbox id={id} aria-label="select-all" />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {accounts.map((item) => (
              <TableRow
                key={item.id}
                className="has-data-[state=checked]:bg-primary/10 has-data-[state=checked]:hover:bg-primary/15"
              >
                <TableCell>
                  <Checkbox
                    id={`table-checkbox-${item.id}`}
                    aria-label={`user-checkbox-${item.id}`}
                  />
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {item.email}
                    </span>
                  </div>
                </TableCell>

                <TableCell>{item.location}</TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      getStatusClass(item.status),
                      "rounded-full shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,1),inset_0px_-1px_2px_0px_rgba(0,0,0,0.05)] dark:shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.25),inset_0px_-1px_2px_0px_rgba(0,0,0,0.7)]"
                    )}
                  >
                    {item.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right font-medium">
                  {item.balance}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow className="bg-muted/50 shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,1),inset_0px_-1px_4px_0px_rgba(0,0,0,0.05)] dark:shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.1),inset_0px_-1px_2px_0px_rgba(0,0,0,0.02)]">
              <TableCell colSpan={4}>Total Balance</TableCell>
              <TableCell className="text-right font-semibold">
                ₹1,68,800
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <p className="text-muted-foreground mt-4 text-center text-sm">
        Accounts table with selection
      </p>
    </div>
  );
};

export default Table13;

//  className={cn(
//                   getStatusClass(project.status),
//                   'rounded-sm shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,1),inset_0px_-1px_2px_0px_rgba(0,0,0,0.05)] dark:shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.25),inset_0px_-1px_2px_0px_rgba(0,0,0,0.7)]',
//                 )}
