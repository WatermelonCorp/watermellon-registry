import { Badge } from "@/components/ui/badge";
import { GoCheckCircleFill } from "react-icons/go";

const Badge18 = () => {
  return (
    <Badge
      variant="outline"
      className="rounded-sm border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 bg-green-600/10 dark:bg-green-400/10"
    >
      <GoCheckCircleFill className="size-3" />
      Done
    </Badge>
  );
};

export default Badge18;
