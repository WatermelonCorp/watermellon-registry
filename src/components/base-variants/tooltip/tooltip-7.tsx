import { MdWarning } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Tooltip7 = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="sm">
          Warning
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-destructive [&_svg]:bg-destructive [&_svg]:fill-destructive text-white">
        <div className="flex max-w-64 items-start gap-2">
          <MdWarning className="mt-0.5 size-4 shrink-0 fill-white!" />
          <p className="text-sm">
            Please double-check your inputs before proceeding. Small mistakes
            can affect the final outcome.
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default Tooltip7;
