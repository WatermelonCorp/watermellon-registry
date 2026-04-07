import { MdLightbulb } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Tooltip8 = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="sm">
          Tip
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-80">
        <div className="flex items-center gap-1.5">
          <MdLightbulb className="size-4 text-yellow-400" />
          <p>Use keyboard shortcuts to speed up your workflow.</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default Tooltip8;
