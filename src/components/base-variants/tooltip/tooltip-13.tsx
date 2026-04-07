import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const tasks = [
  {
    image: "https://github.com/emilkowalski.png",
    fallback: "EK",
    name: "Emil Kowalski",
    designation: "Frontend Engineer",
    percentage: 92,
  },
  {
    image: "https://github.com/jakubkr.png",
    fallback: "JK",
    name: "Jakub Kr",
    designation: "Full Stack Developer",
    percentage: 68,
  },
  {
    image: "https://github.com/raunofreiberg.png",
    fallback: "RF",
    name: "Rauno Freiberg",
    designation: "ui Engineer",
    percentage: 81,
  },
  {
    image: "https://github.com/raphaelsalaja.png",
    fallback: "RS",
    name: "Raphael Salaja",
    designation: "Product Designer",
    percentage: 47,
  },
];

const Tooltip13 = () => {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Button variant="link">Team Activity</Button>
      </HoverCardTrigger>

      <HoverCardContent className="w-72">
        <div className="space-y-4">
          <p className="text-lg font-semibold">Current workload distribution</p>

          <ul className="space-y-2.5">
            {tasks.map((task) => (
              <li key={task.name} className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={task.image} alt={task.name} />
                  <AvatarFallback>{task.fallback}</AvatarFallback>
                </Avatar>

                <div className="flex flex-1 flex-col">
                  <div className="text-sm font-medium">{task.name}</div>
                  <p className="text-muted-foreground text-xs">
                    {task.designation}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Handling multiple active tasks
                  </p>
                </div>

                <span className="text-sm font-medium">{task.percentage}%</span>
              </li>
            ))}
          </ul>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Tooltip13;
