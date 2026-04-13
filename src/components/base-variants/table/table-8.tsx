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
    id: "PRD001",
    name: "Wireless Mouse",
    category: "Electronics",
    price: "₹799",
    stock: 120,
  },
  {
    id: "PRD002",
    name: "Bluetooth Headphones",
    category: "Electronics",
    price: "₹1,999",
    stock: 75,
  },
  {
    id: "PRD003",
    name: "Office Chair",
    category: "Furniture",
    price: "₹5,500",
    stock: 30,
  },
  {
    id: "PRD004",
    name: "Notebook Pack",
    category: "Stationery",
    price: "₹250",
    stock: 200,
  },
  {
    id: "PRD005",
    name: "Desk Lamp",
    category: "Furniture",
    price: "₹1,200",
    stock: 60,
  },
];

const Table8 = () => {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-xl border shadow-xs">
        <Table className="">
          <TableHeader>
            <TableRow className="[&_th]:even:bg-muted/70 hover:bg-transparent">
              <TableHead className="w-25">Product ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="[&_td]:even:bg-muted/70 hover:bg-transparent"
              >
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">{product.price}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="bg-transparent">
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={4}>Total Products</TableCell>
              <TableCell className="text-right">485</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <p className="text-muted-foreground mt-4 text-center text-sm">
        Striped columns table
      </p>
    </div>
  );
};

export default Table8;
