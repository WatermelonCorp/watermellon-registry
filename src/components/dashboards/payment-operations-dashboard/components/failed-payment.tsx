import { BanknoteX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FailedPayments() {
  const data = [
    {
      amount: "₹6,450",
      date: "6th Jan, 00:21",
      email: "jakepaul@gmail.com",
      initials: "JP",
      status: "Failed",
    },
    {
      amount: "₹5,200",
      date: "6th Jan, 00:21",
      email: "dankoe@gmail.com",
      initials: "DK",
      status: "Failed",
    },
    {
      amount: "₹6,800",
      date: "6th Jan, 00:21",
      email: "johndoe@gmail.com",
      initials: "JD",
      status: "Failed",
    },
  ];

  return (
    <Card className="border-none shadow-sm bg-zinc-100 dark:bg-zinc-800 rounded-none p-0.5 gap-0 group/card">
      <CardHeader className="flex flex-row items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <div className="bg-muted p-1 rounded">
            <BanknoteX className="size-4 text-muted-foreground group-hover/card:text-foreground transition-colors" />
          </div>
          <CardTitle className="text-xs font-semibold text-md text-foreground">
            Failed Payments
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="bg-white dark:bg-zinc-900 p-2 rounded-none overflow-hidden ">
        <div className="">
          {data.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 hover:bg-muted dark:hover:bg-muted transition-colors duration-200 cursor-pointer group gap-4 rounded-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-md font-medium text-base leading-none">
                    {item.amount}
                  </span>
                  <span className="text-sm text-muted-foreground mt-1 font-medium truncate line-clamp-1">
                    {item.date} • {item.email}
                  </span>
                </div>
              </div>
              <Badge className="bg-red-500/20 text-red-600 hover:bg-red-500/30 transition-colors border-none px-1.5 py-0.5 flex gap-0.5 items-center font-medium cursor-pointer uppercase rounded-none">
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-white dark:bg-zinc-900 flex-1 px-3 pb-2 ">
        <div className=" flex justify-between items-center text-xs text-muted-foreground w-full">
          <button className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors">
            3 of 3
          </button>
          <span className="text-sm font-medium text-muted-foreground">
            Last updated 6h ago
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
