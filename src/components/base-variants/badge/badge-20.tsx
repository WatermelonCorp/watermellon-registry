

import { Badge } from "@/components/ui/badge";

const Badge20 = () => {
  return (
    <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-orange-400 via-rose-500 to-fuchsia-600 p-0.5">
      <Badge className="bg-background hover:bg-background text-foreground border-none">
        Outline Gradient
      </Badge>
    </div>
  );
};

export default Badge20;
