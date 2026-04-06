import { IoMailOpenOutline } from "react-icons/io5";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Button33 = () => {
  return (
    <Button variant="outline">
      <IoMailOpenOutline />
      Inbox
      <Badge variant="destructive" className="px-1.5 py-px">
        99+
      </Badge>
    </Button>
  );
};

export default Button33;
