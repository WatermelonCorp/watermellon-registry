

import { BsBanFill } from "react-icons/bs";

import { Badge } from "@/components/ui/badge";

const Badge19 = () => {
  return (
    <Badge
      variant="outline"
      className="text-destructive bg-destructive/10 border-destructive rounded-sm"
    >
      <BsBanFill className="size-3" />
      Error
    </Badge>
  );
};

export default Badge19;
