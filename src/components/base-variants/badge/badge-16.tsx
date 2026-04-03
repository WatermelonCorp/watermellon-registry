
import { Badge } from "@/components/ui/badge";

const Badge16 = () => {
  return (
    <Badge variant="outline" className="py-3.5 pl-0.5 pr-2 rounded-md ">
      <img
        src="https://github.com/shadcn.png"
        alt="Shadcn"
        className="size-6 rounded-sm"
      />
      Shadcn
    </Badge>
  );
};

export default Badge16;
