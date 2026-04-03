


import { Badge } from "@/components/ui/badge";
import { MdError } from "react-icons/md";

const Badge17 = () => {
  return (
    <Badge
      variant="outline"
      className="rounded-sm border-sky-600 text-sky-600 dark:border-sky-400 dark:text-sky-400 [a&]:hover:bg-sky-600/10 bg-sky-600/10 dark:bg-sky-400/10"
    >
      <MdError className="size-3" />
      Pending
    </Badge>
  );
};

export default Badge17;
