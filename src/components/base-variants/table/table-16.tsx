import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const candidates = [
  {
    id: "1",
    name: "Aarav Sharma",
    role: "Frontend Developer",
    stage: "Interview",
    applied: "12 Apr 2026",
    rating: "4.5",
  },
  {
    id: "2",
    name: "Priya Verma",
    role: "Product Designer",
    stage: "Screening",
    applied: "10 Apr 2026",
    rating: "4.2",
  },
  {
    id: "3",
    name: "Rohan Gupta",
    role: "Backend Engineer",
    stage: "Rejected",
    applied: "8 Apr 2026",
    rating: "3.8",
  },
  {
    id: "4",
    name: "Sneha Kapoor",
    role: "ui Designer",
    stage: "Offer",
    applied: "5 Apr 2026",
    rating: "4.9",
  },
  {
    id: "5",
    name: "Kunal Mehta",
    role: "DevOps Engineer",
    stage: "Interview",
    applied: "3 Apr 2026",
    rating: "4.3",
  },
  {
    id: "6",
    name: "Anjali Singh",
    role: "Data Analyst",
    stage: "Screening",
    applied: "1 Apr 2026",
    rating: "4.1",
  },
  {
    id: "7",
    name: "Vikas Patel",
    role: "QA Engineer",
    stage: "Rejected",
    applied: "28 Mar 2026",
    rating: "3.5",
  },
];

const getStageClass = (stage: string) => {
  switch (stage) {
    case "Interview":
      return "bg-blue-600/10 text-blue-600 border-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:border-blue-400/20";
    case "Screening":
      return "bg-yellow-600/10 text-yellow-600 border-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-400 dark:border-yellow-400/20";
    case "Offer":
      return "bg-green-600/10 text-green-600 border-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:border-green-400/20";
    case "Rejected":
      return "bg-red-600/10 text-red-600 border-red-600/20 dark:bg-red-400/10 dark:text-red-400 dark:border-red-400/20";
    default:
      return "";
  }
};

const Table16 = () => {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead className="text-right">Rating</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {candidates.map((c) => (
              <TableRow key={c.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{c.name}</TableCell>

                <TableCell className="text-muted-foreground">
                  {c.role}
                </TableCell>

                <TableCell>
                  <Badge
                    className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium ${getStageClass(
                      c.stage
                    )}`}
                  >
                    {c.stage}
                  </Badge>
                </TableCell>

                <TableCell>{c.applied}</TableCell>

                <TableCell className="text-right font-semibold">
                  ⭐ {c.rating}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total Candidates</TableCell>
              <TableCell className="text-right">7</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <Pagination className="mt-4">
        <PaginationContent className="[&_[data-active=true]]:bg-primary/90 [&_[data-active=true]]:text-primary-foreground [&_[data-active=true]]:bg-primary/90 dark:hover:[&_[data-active=true]]:bg-primary/90">
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <p className="text-muted-foreground mt-4 text-center text-sm">
        Candidate pipeline table
      </p>
    </div>
  );
};

export default Table16;
