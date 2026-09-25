import { GoTriangleUp } from "react-icons/go";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortfolioChart } from "./charts";
import { portfolioDataRanges } from "../../data";

const ranges = ["1D", "7D", "1M", "All"];

export function PortfolioPanel() {
  return (
    <Card className="rounded-2xl ring-0 shadow-primary bg-card dark:bg-muted p-2 xl:col-span-3 gap-2">
      <Tabs defaultValue="All" className="w-full flex flex-col h-full">
        <CardHeader className="flex flex-row items-center justify-between p-0">
          <CardTitle className="text-lg font-medium px-2 truncate line-clamp-1">
            Portfolio Performance
          </CardTitle>
          <TabsList className="bg-transparent gap-2">
            {ranges.map((range) => (
              <TabsTrigger
                key={range}
                value={range}
                className="h-7 px-3 text-sm rounded-md data-[state=active]:bg-muted/40 dark:data-[state=active]:bg-black data-[state=active]:text-primary data-[state=inactive]:text-muted-foreground data-[state=active]:shadow-none border-0"
              >
                {range}
              </TabsTrigger>
            ))}
          </TabsList>
        </CardHeader>
        <CardContent className="p-2 mt-2 bg-muted/20 dark:bg-card rounded-xl flex-1 shadow-primary overflow-hidden">
          <div className="px-4 flex-1">
            <div className="text-3xl font-medium tracking-wide">$84,520</div>
            <div className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-400">
              <GoTriangleUp className="size-4 fill-current" />
              <span>6.8% this month</span>
            </div>
          </div>
          <div className="h-80 pt-5 relative">
            {ranges.map((range) => (
              <TabsContent
                key={range}
                value={range}
                className="absolute inset-0 mt-0 pt-5 data-[state=inactive]:hidden"
              >
                <PortfolioChart
                  data={
                    portfolioDataRanges[
                      range as keyof typeof portfolioDataRanges
                    ]
                  }
                />
              </TabsContent>
            ))}
          </div>
        </CardContent>
      </Tabs>
    </Card>
  );
}
