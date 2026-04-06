
import { Badge } from "@/components/ui/badge";

const Badge12 = () => {
  return (
    <Badge className="border-none bg-sky-600/10 text-sky-600 focus-visible:ring-sky-600/20 focus-visible:outline-none dark:bg-sky-400/10 dark:text-sky-400 dark:focus-visible:ring-sky-400/40 [a&]:hover:bg-sky-600/5 dark:[a&]:hover:bg-sky-400/5">
      <span
        className="size-2  rounded-full bg-sky-600 dark:bg-sky-400"
        aria-hidden="true"
      />
      In Progress
    </Badge>
  );
};

export default Badge12;
