import { FaCalendarAlt } from "react-icons/fa";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";

const members = [
  {
    src: "https://github.com/emilkowalski.png",
    fallback: "EK",
    name: "Emil Kowalski",
  },
  {
    image: "https://github.com/raphaelsalaja.png",
    fallback: "RS",
    name: "Raphael Salaja",
  },
  {
    src: "https://github.com/raunofreiberg.png",
    fallback: "RF",
    name: "Rauno Freiberg",
  },
];

const Tooltip14 = () => {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Button variant="link">View Build Status</Button>
      </HoverCardTrigger>

      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium">ui System Upgrade</p>
              <p className="text-muted-foreground text-xs">
                Improving consistency across components
              </p>
            </div>
            <span className="text-sm font-semibold">68%</span>
          </div>

          <Progress value={68} />

          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <FaCalendarAlt className="size-4" />
              <span>Started Feb 2025</span>
            </div>
            <span>ETA: 2 weeks</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {members.map((member, i) => (
                <Avatar key={i} className="ring-background size-8 ring-2">
                  <AvatarImage src={member.src} alt={member.name} />
                  <AvatarFallback className="text-xs">
                    {member.fallback}
                  </AvatarFallback>
                </Avatar>
              ))}
              <Avatar className="ring-background size-8 ring-2">
                <AvatarFallback className="text-xs">+3</AvatarFallback>
              </Avatar>
            </div>

            <span className="text-muted-foreground text-xs">
              Active contributors
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Tooltip14;
