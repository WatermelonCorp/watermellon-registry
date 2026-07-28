import { useState } from "react";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants, Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { AddIcon, SearchIcon } from "../../assets/icons";
import { customers } from "../../data";

export function CustomersContent() {
  return (
    <section className="@container min-w-0 px-4 pt-4 pb-4 sm:px-6 sm:pt-7 sm:pb-6 lg:px-10 lg:pb-10">
      <div className="flex flex-col gap-4 sm:gap-6 @4xl:flex-row @4xl:items-center @4xl:justify-between">
        <div className="flex items-center justify-between gap-3 @4xl:shrink-0">
          <h1 className="text-xl font-semibold tracking-tight sm:text-3xl">
            Customers
          </h1>
          <Button className="h-10 rounded-lg px-3 sm:hidden">
            Add
            <AddIcon className="size-4" />
          </Button>
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row @4xl:w-auto">
          <div className="relative min-w-0 flex-1 sm:mr-auto sm:max-w-80 lg:max-w-96 @4xl:mr-0 @4xl:w-96 @4xl:flex-none">
            <SearchIcon className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-11 rounded-xl border-0 bg-muted pl-10 shadow-none md:text-base"
              placeholder="Search by name, email, or phone…"
              aria-label="Search customers"
            />
          </div>
          <Button
            size="lg"
            className="hidden h-11 rounded-xl px-4 text-base sm:inline-flex"
          >
            Add Customer
            <AddIcon className="size-5" />
          </Button>
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
        <CustomerTable />
      </div>
    </section>
  );
}
const headerClassName =
  "h-12 px-4 text-sm font-normal text-muted-foreground first:rounded-l-xl last:rounded-r-xl";
const cellClassName = "px-4 py-0";

function CustomerActions({
  name,
  onDelete,
}: {
  name: string;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-lg" }),
          "rounded-full text-muted-foreground",
        )}
        aria-label={`Actions for ${name}`}
      >
        <EllipsisVertical className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem>
          <Pencil />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={onDelete}>
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CustomerTable() {
  const [customerRows, setCustomerRows] = useState(customers);

  return (
    <Table
      className="min-w-[46rem] table-fixed text-sm sm:text-base"
    >
      <colgroup>
        <col className="w-[27%]" />
        <col className="w-[35%]" />
        <col className="w-[28%]" />
        <col className="w-[10%]" />
      </colgroup>
      <TableHeader className="[&_tr]:border-0">
        <TableRow className="bg-muted hover:bg-muted!">
          <TableHead className={headerClassName}>Name</TableHead>
          <TableHead className={headerClassName}>Email</TableHead>
          <TableHead className={headerClassName}>Phone</TableHead>
          <TableHead className={`${headerClassName} text-center`}>
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customerRows.map((customer) => (
          <TableRow
            key={customer.email}
            className="h-16 hover:bg-transparent! has-aria-expanded:bg-transparent!"
          >
            <TableCell className={cellClassName}>
              <div className="flex min-w-0 items-center gap-3">
                <Avatar className="size-8">
                  <AvatarImage src={customer.avatar} alt="" />
                  <AvatarFallback>{customer.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="truncate font-medium">{customer.name}</span>
              </div>
            </TableCell>
            <TableCell className={cellClassName}>
              <a
                className="block truncate text-muted-foreground hover:text-foreground"
                href={`mailto:${customer.email}`}
              >
                {customer.email}
              </a>
            </TableCell>
            <TableCell
              className={`${cellClassName} text-muted-foreground tabular-nums`}
            >
              <a
                className="hover:text-foreground"
                href={`tel:${customer.phone.replace(/\s/g, "")}`}
              >
                {customer.phone}
              </a>
            </TableCell>
            <TableCell className={`${cellClassName} text-center`}>
              <CustomerActions
                name={customer.name}
                onDelete={() =>
                  setCustomerRows((current) =>
                    current.filter(({ email }) => email !== customer.email),
                  )
                }
              />
            </TableCell>
          </TableRow>
        ))}
        {customerRows.length === 0 && (
          <TableRow className="hover:bg-transparent!">
            <TableCell
              colSpan={4}
              className="h-32 px-4 text-center text-muted-foreground"
            >
              No customers found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
