import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Tooltip2 = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="lg">
          Neutral
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-neutral-200 text-neutral-950 dark:bg-neutral-50 [&_svg]:bg-neutral-200 [&_svg]:fill-neutral-200 dark:[&_svg]:bg-neutral-50 dark:[&_svg]:fill-neutral-50">
        <p>Consistent appearance across themes</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default Tooltip2;
