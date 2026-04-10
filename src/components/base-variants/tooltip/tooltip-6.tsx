import { MdInfo } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Tooltip6 = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="sm">
          Learn More
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-64 py-3 text-pretty">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MdInfo className="size-4" />
            <p className="text-sm font-medium">Helpful Information</p>
          </div>
          <p className="text-background/80">
            This section provides additional context to help you better
            understand the feature. Use it as a quick guide while navigating.
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default Tooltip6;
