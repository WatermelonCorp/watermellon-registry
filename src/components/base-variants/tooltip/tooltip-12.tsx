import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Tooltip12 = () => {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Button variant="link">User Overview</Button>
      </HoverCardTrigger>

      <HoverCardContent className="w-fit">
        <div className="flex items-center gap-2">
          <Avatar className="size-10">
            <AvatarImage
              src="https://github.com/vanshpatel.png"
              alt="Vansh Patel"
            />
            <AvatarFallback className="text-xs">AC</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-0.5">
            <div className="text-sm font-medium">Vansh Patel</div>
            <div className="text-muted-foreground text-xs">
              Product Designer
            </div>
            <div className="text-xs">Active now • 124 tasks completed</div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Tooltip12;
