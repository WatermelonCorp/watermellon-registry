import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  HiCube,
  HiTag,
  HiCalendar,
  HiShieldCheck,
  HiUser,
  HiCurrencyRupee,
  HiChip,
} from "react-icons/hi";

const Table11 = () => {
  return (
    <div className="w-full max-w-lg">
      <div className="overflow-hidden rounded-xl border shadow-sm">
        <Table>
          <TableBody>
            <TableRow className="*:border-border [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted py-2 font-medium">
                <div className="flex items-center gap-2">
                  <HiCube className="text-muted-foreground h-4 w-4" />
                  Product
                </div>
              </TableCell>
              <TableCell className="py-2">MacBook Air M3 (2025)</TableCell>
            </TableRow>

            <TableRow className="*:border-border [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted py-2 font-medium">
                <div className="flex items-center gap-2">
                  <HiChip className="text-muted-foreground h-4 w-4" />
                  Model Number
                </div>
              </TableCell>
              <TableCell className="py-2">MBA-M3-13-512</TableCell>
            </TableRow>

            <TableRow className="*:border-border [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted py-2 font-medium">
                <div className="flex items-center gap-2">
                  <HiTag className="text-muted-foreground h-4 w-4" />
                  Category
                </div>
              </TableCell>
              <TableCell className="py-2">Laptop</TableCell>
            </TableRow>

            <TableRow className="*:border-border [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted py-2 font-medium">
                <div className="flex items-center gap-2">
                  <HiCalendar className="text-muted-foreground h-4 w-4" />
                  Purchase Date
                </div>
              </TableCell>
              <TableCell className="py-2">12 Feb 2025</TableCell>
            </TableRow>

            <TableRow className="*:border-border [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted py-2 font-medium">
                <div className="flex items-center gap-2">
                  <HiShieldCheck className="text-muted-foreground h-4 w-4" />
                  Warranty
                </div>
              </TableCell>
              <TableCell className="py-2">Until Feb 2027</TableCell>
            </TableRow>

            <TableRow className="*:border-border [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted py-2 font-medium">
                <div className="flex items-center gap-2">
                  <HiUser className="text-muted-foreground h-4 w-4" />
                  Assigned To
                </div>
              </TableCell>
              <TableCell className="py-2">Vansh Patel</TableCell>
            </TableRow>

            <TableRow className="*:border-border [&>:not(:last-child)]:border-r">
              <TableCell className="bg-muted py-2 font-medium">
                <div className="flex items-center gap-2">
                  <HiCurrencyRupee className="text-muted-foreground h-4 w-4" />
                  Value
                </div>
              </TableCell>
              <TableCell className="py-2 font-semibold">₹1,14,900</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <p className="text-muted-foreground mt-4 text-center text-sm">
        Product details
      </p>
    </div>
  );
};

export default Table11;
