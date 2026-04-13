import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const employees = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Frontend Engineer",
    company: "Zeta Labs",
    email: "aarav@zeta.com",
    location: "India",
    lastAccess: "2 Apr 2026",
    salary: "₹18,00,000",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Product Manager",
    company: "Nova Systems",
    email: "priya@nova.com",
    location: "India",
    lastAccess: "30 Mar 2026",
    salary: "₹22,50,000",
  },
  {
    id: 3,
    name: "Rohan Gupta",
    role: "Backend Engineer",
    company: "ByteStack",
    email: "rohan@bytestack.com",
    location: "Singapore",
    lastAccess: "28 Mar 2026",
    salary: "₹25,00,000",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    role: "ui Designer",
    company: "PixelCraft",
    email: "sneha@pixel.com",
    location: "India",
    lastAccess: "25 Mar 2026",
    salary: "₹12,00,000",
  },
  {
    id: 5,
    name: "Kunal Mehta",
    role: "DevOps Engineer",
    company: "CloudNest",
    email: "kunal@cloudnest.com",
    location: "Germany",
    lastAccess: "20 Mar 2026",
    salary: "₹28,00,000",
  },
  {
    id: 6,
    name: "Anjali Singh",
    role: "Data Analyst",
    company: "Insight AI",
    email: "anjali@insight.ai",
    location: "India",
    lastAccess: "18 Mar 2026",
    salary: "₹14,50,000",
  },
  {
    id: 7,
    name: "Vikas Patel",
    role: "QA Engineer",
    company: "Testify Labs",
    email: "vikas@testify.com",
    location: "Canada",
    lastAccess: "15 Mar 2026",
    salary: "₹11,00,000",
  },
];

const Table12 = () => {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-2xl [&>div]:rounded-sm [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="bg-background sticky left-0">ID</TableHead>

              <TableHead className="bg-background sticky left-7.5">
                Name
              </TableHead>

              <TableHead>Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Salary</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id} className="hover:bg-muted/50">
                <TableCell className="bg-background sticky left-0 font-medium">
                  {emp.id}
                </TableCell>

                <TableCell className="bg-background sticky left-7.5">
                  <div className="flex flex-col">
                    <span className="font-medium">{emp.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {emp.role}
                    </span>
                  </div>
                </TableCell>

                <TableCell>{emp.role}</TableCell>
                <TableCell>{emp.company}</TableCell>
                <TableCell className="text-muted-foreground">
                  {emp.email}
                </TableCell>
                <TableCell>{emp.location}</TableCell>
                <TableCell>{emp.lastAccess}</TableCell>
                <TableCell className="text-right font-medium">
                  {emp.salary}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="text-muted-foreground mt-4 text-center text-sm">
        Sticky column table
      </p>
    </div>
  );
};

export default Table12;
