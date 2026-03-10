import { CompanyFilters } from './components/company-filters';
import { CompaniesTable } from './components/companies-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

export const CompanyView = () => {
  return (
    <div className="h-full w-full overflow-hidden">
      <Tabs defaultValue="companies" className="flex h-full flex-col gap-0">
        <div className="w-full shrink-0 border-b border-neutral-200 dark:border-neutral-800">
          <TabsList className="flex gap-4 bg-transparent p-0 px-3">
            <TabsTrigger
              value="companies"
              className="cursor-pointer rounded-none border-x-0! border-t-0! border-b-2! border-transparent bg-transparent! shadow-none! focus-visible:ring-0! focus-visible:ring-offset-0! data-[state=active]:border-b-neutral-900! dark:data-[state=active]:border-b-white!"
            >
              Companies
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="deals"
              className="cursor-pointer rounded-none border-x-0! border-t-0! border-b-2! border-transparent bg-transparent! shadow-none! focus-visible:ring-0! focus-visible:ring-offset-0! data-[state=active]:border-b-neutral-900! dark:data-[state=active]:border-b-white!"
            >
              Deals
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="forecast"
              className="cursor-pointer rounded-none border-x-0! border-t-0! border-b-2! border-transparent bg-transparent! shadow-none! focus-visible:ring-0! focus-visible:ring-offset-0! data-[state=active]:border-b-neutral-900! dark:data-[state=active]:border-b-white!"
            >
              Forecast
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="companies"
          className="min-h-0 flex-1 overflow-y-auto border-0"
        >
          <CompanyFilters />
          <CompaniesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};
