import { FaBell } from "react-icons/fa";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Button23 = () => {
  return (
    <Button variant="outline" className="relative">
      <FaBell />
      Inbox
      <Badge
        variant="destructive"
        className="absolute -top-2.5 -right-2.5 h-5 min-w-5 px-1 tabular-nums bg-red-600 text-white dark:bg-red-400"
      >
        8
      </Badge>
    </Button>
  );
};

export default Button23;
