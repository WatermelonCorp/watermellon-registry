import { MdSecurity } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Tooltip15 = () => {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Button variant="link">Security Notice</Button>
      </HoverCardTrigger>

      <HoverCardContent className="w-72">
        <div className="flex flex-col items-center text-center">
          <span className="bg-primary/10 mb-2.5 flex size-12 items-center justify-center rounded-full">
            <MdSecurity className="text-primary size-6" />
          </span>

          <div className="mb-1 text-lg font-medium">
            Secure environment detected
          </div>

          <p className="text-muted-foreground text-sm">
            Your connection is encrypted and your data is protected. Continue
            safely without any concerns.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Tooltip15;
