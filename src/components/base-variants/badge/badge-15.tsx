
import { Badge } from "@/components/ui/badge";

const Badge15 = () => {
  return (
    <Badge className="border-none bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 ">
      <span
        className="size-2 rounded-full bg-green-600 dark:bg-green-400"
        aria-hidden="true"
      />
      Done
    </Badge>
  );
};

export default Badge15;
