import { IoMailOpenOutline } from "react-icons/io5";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Button36 = () => {
  return (
    <Button variant="outline" size="icon" className="relative">
      <IoMailOpenOutline className="size-5" />
      <span className="sr-only">Messages</span>
      <Badge className="absolute -top-2.5 -right-2.5 h-5 min-w-5 px-1 tabular-nums">
        3
      </Badge>
    </Button>
  );
};

export default Button36;
