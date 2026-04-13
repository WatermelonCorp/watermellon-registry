import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "PRJ-001",
    name: "AI Dashboard",
    team: "Frontend",
    status: "Completed",
    budget: "₹1,20,000",
  },
  {
    id: "PRJ-002",
    name: "Payment Gateway",
    team: "Backend",
    status: "In Progress",
    budget: "₹95,000",
  },
  {
    id: "PRJ-003",
    name: "Mobile App Revamp",
    team: "Mobile",
    status: "On Hold",
    budget: "₹70,000",
  },
  {
    id: "PRJ-004",
    name: "Marketing Website",
    team: "Design",
    status: "Completed",
    budget: "₹50,000",
  },
  {
    id: "PRJ-005",
    name: "Admin Panel",
    team: "Full Stack",
    status: "In Progress",
    budget: "₹1,40,000",
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

const Table4 = () => {
  return (
    <div className="w-full">
      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-40">Project</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Budget</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.id}
                className="odd:bg-muted/50 odd:hover:bg-muted/50 odd:shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,1),0px_1px_2px_0px_rgba(0,0,0,0.1)] hover:bg-transparent odd:dark:shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.1),0px_1px_2px_0px_rgba(0,0,0,0.7)]"
              >
                <TableCell className="font-medium">{project.name}</TableCell>

                <TableCell>{project.team}</TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      getStatusClass(project.status),
                      "rounded-sm shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,1),inset_0px_-1px_2px_0px_rgba(0,0,0,0.05)] dark:shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.25),inset_0px_-1px_2px_0px_rgba(0,0,0,0.7)]"
                    )}
                  >
                    {project.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right font-medium">
                  {project.budget}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="bg-transparent">
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={3}>Total Budget</TableCell>
              <TableCell className="text-right font-semibold">
                ₹4,75,000
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <p className="text-muted-foreground mt-4 text-center text-sm">
        Project tracking table
      </p>
    </div>
  );
};

export default Table4;
