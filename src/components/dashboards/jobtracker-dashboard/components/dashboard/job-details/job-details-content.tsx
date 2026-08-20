import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { EstimatesContent } from "./estimates-content";
import { jobEstimates } from "../../../data";
import { useDashboardNavigation } from "../../navigation";

const jobTabs = ["Estimates", "Plans", "Records", "Files"] as const;

export function JobDetailsContent() {
  const { pathname } = useDashboardNavigation();
  const jobId = pathname.split("/")[2];

  if (!jobId) {
    return null;
  }

  const estimate = jobEstimates.find((item) => item.jobId === jobId);

  return (
    <section className="@container min-w-0 px-4 pt-4 pb-4 sm:px-6 sm:pt-7 sm:pb-6 lg:px-10 lg:pb-10">
      <Tabs defaultValue="estimates" className="gap-0">
        <TabsList
          variant="line"
          className="h-12 w-full justify-start gap-0 border-b p-0"
        >
          {jobTabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase()}
              className="h-full flex-none px-4 text-base font-normal after:bottom-[-1px]! data-active:text-primary data-active:after:bg-primary data-[state=active]:text-primary data-[state=active]:after:bg-primary"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="estimates" className="mt-6">
          <EstimatesContent key={jobId} sections={estimate?.sections ?? []} />
        </TabsContent>
        {jobTabs.slice(1).map((tab) => (
          <TabsContent key={tab} value={tab.toLowerCase()} className="mt-6">
            <div className="flex h-48 items-center justify-center rounded-xl border border-dashed text-muted-foreground">
              No {tab.toLowerCase()} added yet
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
