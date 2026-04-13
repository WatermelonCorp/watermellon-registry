import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const developers = [
  {
    id: "1",
    name: "Guillermo Rauch",
    username: "@rauchg",
    src: "https://github.com/rauchg.png",
    fallback: "GR",
    country: "USA",
    contributions: 1240,
    status: "online",
  },
  {
    id: "2",
    name: "Evan You",
    username: "@yyx990803",
    src: "https://github.com/yyx990803.png",
    fallback: "EY",
    country: "Singapore",
    contributions: 980,
    status: "online",
  },
  {
    id: "3",
    name: "Dan Abramov",
    username: "@gaearon",
    src: "https://github.com/gaearon.png",
    fallback: "DA",
    country: "UK",
    contributions: 870,
    status: "away",
  },
  {
    id: "4",
    name: "Addy Osmani",
    username: "@addyosmani",
    src: "https://github.com/addyosmani.png",
    fallback: "AO",
    country: "USA",
    contributions: 650,
    status: "offline",
  },
];

const getStatusDot = (status: string) => {
  switch (status) {
    case "online":
      return "bg-green-500";
    case "away":
      return "bg-yellow-500";
    case "offline":
      return "bg-muted-foreground";
    default:
      return "";
  }
};

const Table15 = () => {
  return (
    <div className="w-full">
      <div className="[&>div]:rounded-sm [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/50 bg-muted/50">
              <TableHead>#</TableHead>
              <TableHead>Developer</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">Commits</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {developers.map((dev, i) => (
              <TableRow key={dev.id} className="hover:bg-muted/50">
                <TableCell className="text-muted-foreground font-medium">
                  {i + 1}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={dev.src} alt={dev.name} />
                        <AvatarFallback className="text-xs">
                          {dev.fallback}
                        </AvatarFallback>
                      </Avatar>

                      <span
                        className={`border-background absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border ${getStatusDot(
                          dev.status
                        )}`}
                      />
                    </div>

                    <div>
                      <div className="leading-none font-medium">{dev.name}</div>
                      <div className="text-muted-foreground text-xs">
                        {dev.username}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {dev.country}
                </TableCell>

                <TableCell className="text-right">
                  <div className="font-semibold">
                    {dev.contributions.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    contributions
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="text-muted-foreground mt-4 text-center text-sm">
        Developer leaderboard
      </p>
    </div>
  );
};

export default Table15;
