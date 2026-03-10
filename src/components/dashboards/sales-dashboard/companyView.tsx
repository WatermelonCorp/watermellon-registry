import { CompanyFilters } from "./components/company-filters";
import { CompaniesTable } from "./components/companies-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

export const CompanyView = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      <Tabs defaultValue="companies" className="gap-0 h-full flex flex-col">
        <div className="border-b border-neutral-200 dark:border-neutral-800 w-full shrink-0">
          <TabsList className="bg-transparent p-0 px-3 flex gap-4">
            <TabsTrigger
              value="companies"
              className="rounded-none shadow-none! bg-transparent! border-x-0! border-t-0! border-b-2! border-transparent data-[state=active]:border-b-neutral-900! dark:data-[state=active]:border-b-white! focus-visible:ring-0! focus-visible:ring-offset-0! hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Companies
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="deals"
              className="rounded-none shadow-none! bg-transparent! border-x-0! border-t-0! border-b-2! border-transparent data-[state=active]:border-b-neutral-900! dark:data-[state=active]:border-b-white! focus-visible:ring-0! focus-visible:ring-offset-0! hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Deals
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="forecast"
              className="rounded-none shadow-none! bg-transparent! border-x-0! border-t-0! border-b-2! border-transparent data-[state=active]:border-b-neutral-900! dark:data-[state=active]:border-b-white! focus-visible:ring-0! focus-visible:ring-offset-0! hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Forecast
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="companies" className="border-0 flex-1 overflow-y-auto min-h-0">
          <CompanyFilters />
          <CompaniesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};
