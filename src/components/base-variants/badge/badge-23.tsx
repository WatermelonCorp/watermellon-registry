import { FaShoppingCart } from "react-icons/fa";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Badge23 = () => {
  return (
    <div className="relative w-fit">
      <Avatar className="size-9 rounded-sm after:border-none">
        <AvatarFallback className="rounded-sm">
          <FaShoppingCart className="size-5" />
        </AvatarFallback>
      </Avatar>
      <Badge className="absolute -top-2.5 -right-2.5 h-5 min-w-5 px-1 tabular-nums">
        8
      </Badge>
    </div>
  );
};

export default Badge23;
