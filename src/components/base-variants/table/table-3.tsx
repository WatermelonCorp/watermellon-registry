import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const products = [
  {
    id: "PRD-001",
    name: "MacBook Pro",
    category: "Laptop",
    status: "In Stock",
    price: "₹1,89,000",
  },
  {
    id: "PRD-002",
    name: "iPhone 15",
    category: "Mobile",
    status: "Limited",
    price: "₹79,900",
  },
  {
    id: "PRD-003",
    name: "Sony WH-1000XM5",
    category: "Audio",
    status: "Out of Stock",
    price: "₹29,990",
  },
  {
    id: "PRD-004",
    name: "Dell XPS 13",
    category: "Laptop",
    status: "In Stock",
    price: "₹1,25,000",
  },
  {
    id: "PRD-005",
    name: "Samsung Galaxy S24",
    category: "Mobile",
    status: "In Stock",
    price: "₹74,999",
  },
];

const Table3 = () => {
  return (
    <div className="w-full">
      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-40">Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="odd:bg-muted/50 odd:hover:bg-muted/50 hover:bg-transparent"
              >
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell className="text-right font-medium">
                  {product.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="bg-transparent">
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={3}>Total Value</TableCell>
              <TableCell className="text-right font-semibold">
                ₹4,98,889
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <p className="text-muted-foreground mt-4 text-center text-sm">
        Product inventory table
      </p>
    </div>
  );
};

export default Table3;
