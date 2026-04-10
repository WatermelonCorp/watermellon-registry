import { MdLaunch } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Tooltip11 = () => {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Button variant="link">Explore Feature</Button>
      </HoverCardTrigger>

      <HoverCardContent side="top">
        <div className="space-y-2">
          <img
            src="https://images.unsplash.com/photo-1522199710521-72d69614c702"
            alt="Feature preview"
            className="w-full rounded"
          />

          <div className="space-y-1">
            <p className="text-sm font-medium">Smart Workspace</p>

            <p className="text-muted-foreground text-xs">
              Organize your tasks, notes, and files in one unified place. Boost
              productivity with a clean and intuitive interface.{" "}
              <a
                href="#"
                className="hover:text-foreground flex w-fit items-center gap-1 underline"
              >
                Learn more
                <MdLaunch className="size-4" />
              </a>
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Tooltip11;
