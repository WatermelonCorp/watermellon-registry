import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Tooltip5 = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="sm">
          Avatar
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="flex items-center gap-2">
          <Avatar className="size-5">
            <AvatarImage
              src="https://github.com/vanshpatel.png"
              alt="Vansh Patel"
            />
            <AvatarFallback className="text-xs">VP</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium">Vansh Patel</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default Tooltip5;
