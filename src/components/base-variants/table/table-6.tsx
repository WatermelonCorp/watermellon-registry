import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  {
    id: "USR001",
    name: "Aarav Sharma",
    status: "Active",
    role: "Admin",
    usage: "₹1,200",
  },
  {
    id: "USR002",
    name: "Priya Verma",
    status: "Pending",
    role: "Editor",
    usage: "₹800",
  },
  {
    id: "USR003",
    name: "Rohan Gupta",
    status: "Inactive",
    role: "Viewer",
    usage: "₹350",
  },
  {
    id: "USR004",
    name: "Sneha Kapoor",
    status: "Active",
    role: "Admin",
    usage: "₹2,100",
  },
  {
    id: "USR005",
    name: "Kunal Mehta",
    status: "Active",
    role: "Editor",
    usage: "₹950",
  },
];

const Table6 = () => {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-xl border shadow-xs">
        <Table>
          <TableHeader className="bg-muted/50 shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,1),inset_0px_-1px_4px_0px_rgba(0,0,0,0.05)] dark:shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.05),inset_0px_-1px_2px_0px_rgba(0,0,0,0.02)]">
            <TableRow>
              <TableHead className="w-25">User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Usage</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right">{user.usage}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,1),inset_0px_-1px_4px_0px_rgba(0,0,0,0.05)] dark:shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.1),inset_0px_-1px_2px_0px_rgba(0,0,0,0.02)]">
            <TableRow>
              <TableCell colSpan={4}>Total Usage</TableCell>
              <TableCell className="text-right">₹5,400</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <p className="text-muted-foreground mt-4 text-center text-sm">
        Rounded corner table
      </p>
    </div>
  );
};

export default Table6;
