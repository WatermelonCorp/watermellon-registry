"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Employee } from "./employees";

interface EmployeeTableProps {
  employees: Employee[];
  selectedId?: string;
}

const statusStyles: Record<Employee["status"], string> = {
  Active: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10",
  "On Leave": "bg-amber-500/10 text-amber-500 hover:bg-amber-500/10",
  Absent: "bg-rose-500/10 text-rose-500 hover:bg-rose-500/10",
};

export function EmployeeTable({ employees }: EmployeeTableProps) {
  return (
      <Table>
        <TableHeader className=" relative">
          <div className="absolute inset-0 h-10 w-full border rounded-md bg-neutral-300/10 border-neutral-300/20"></div>
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="w-[80px] text-muted-foreground font-medium border-r pl-3">#ID</TableHead>
            <TableHead className="text-muted-foreground font-medium border-r ">Name</TableHead>
            <TableHead className="text-muted-foreground font-medium border-r">Email</TableHead>
            <TableHead className="text-muted-foreground font-medium border-r">Department</TableHead>
            <TableHead className="text-muted-foreground font-medium border-r">Position</TableHead>
            <TableHead className="text-muted-foreground font-medium border-r">Join Date</TableHead>
            <TableHead className="text-right text-muted-foreground font-medium pr-3">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {employees.map((employee) => (
            <TableRow
              key={employee.id}
              className={cn(
                "hover:bg-muted/60 cursor-pointer transition-colors border-none text-neutral-600 hover:text-neutral-400",
              )}
            >
              <TableCell className="font-medium  pl-2 py-2">
                {employee.id}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3 py-1">
                  <Avatar className="size-6">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}`} alt={employee.name} />
                    <AvatarFallback className="bg-muted text-xs">
                      {employee.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-neutral-400">{employee.name}</span>
                </div>
              </TableCell>
              <TableCell className="">{employee.email}</TableCell>
              <TableCell className="">{employee.department}</TableCell>
              <TableCell className="">{employee.position}</TableCell>
              <TableCell className="">{employee.joinDate}</TableCell>
              <TableCell className="text-right">
                <Badge
                  variant="secondary"
                  className={cn(
                    "font-medium border-0",
                    statusStyles[employee.status]
                  )}
                >
                  {employee.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}
