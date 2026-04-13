import { useId } from "react";

import { HiFolder, HiPencil, HiTrash } from "react-icons/hi";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const projects = [
  {
    id: "1",
    name: "Dashboard Redesign",
    owner: "Aarav Sharma",
    status: "Completed",
    tasks: 24,
    budget: "₹45,000",
  },
  {
    id: "2",
    name: "Mobile App ui",
    owner: "Priya Verma",
    status: "In Progress",
    tasks: 12,
    budget: "₹28,000",
  },
  {
    id: "3",
    name: "Landing Page Revamp",
    owner: "Rohan Gupta",
    status: "On Hold",
    tasks: 8,
    budget: "₹12,000",
  },
  {
    id: "4",
    name: "Analytics Integration",
    owner: "Sneha Kapoor",
    status: "In Progress",
    tasks: 16,
    budget: "₹32,000",
  },
  {
    id: "5",
    name: "API Optimization",
    owner: "Kunal Mehta",
    status: "Completed",
    tasks: 20,
    budget: "₹50,000",
  },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-600/10 text-green-600 border-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:border-green-400/20";
    case "In Progress":
      return "bg-blue-600/10 text-blue-600 border-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:border-blue-400/20";
    case "On Hold":
      return "bg-yellow-600/10 text-yellow-600 border-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-400 dark:border-yellow-400/20";
    default:
      return "";
  }
};

const Table14 = () => {
  const id = useId();

  return (
    <div className="w-full">
      <div className="[&>div]:rounded-sm [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>
                <Checkbox id={id} aria-label="select-all" />
              </TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tasks</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead className="w-0">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((item) => (
              <TableRow
                key={item.id}
                className="has-data-[state=checked]:bg-primary/10 has-data-[state=checked]:hover:bg-primary/15"
              >
                <TableCell>
                  <Checkbox
                    id={`table-checkbox-${item.id}`}
                    aria-label={`project-checkbox-${item.id}`}
                  />
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <HiFolder className="text-muted-foreground h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </TableCell>

                <TableCell>{item.owner}</TableCell>

                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-xs font-medium ${getStatusClass(
                      item.status
                    )}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {item.status}
                  </span>
                </TableCell>

                <TableCell>{item.tasks}</TableCell>

                <TableCell className="font-medium">{item.budget}</TableCell>

                <TableCell className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <HiPencil className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-destructive rounded-full transition-colors duration-200"
                  >
                    <HiTrash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="text-muted-foreground mt-4 text-center text-sm">
        Project management table
      </p>
    </div>
  );
};

export default Table14;
