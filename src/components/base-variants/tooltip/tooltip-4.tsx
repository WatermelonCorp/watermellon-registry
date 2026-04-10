import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Tooltip4 = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="sm">
          Badge
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-xs">$99/month per user</span>
          <Badge
            variant="secondary"
            className="rounded-full px-2 py-0.5 text-xs"
          >
            Popular
          </Badge>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default Tooltip4;
