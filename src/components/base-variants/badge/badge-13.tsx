
import { Badge } from "@/components/ui/badge";

const Badge13= () => {
  return (
    <Badge className="bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive border-none focus-visible:outline-none">
      <span
        className="bg-destructive size-2 rounded-full"
        aria-hidden="true"
      />
      Cancelled
    </Badge>
  );
};

export default Badge13
