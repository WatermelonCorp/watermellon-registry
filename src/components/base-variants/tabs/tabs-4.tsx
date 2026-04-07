import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const stock = [
  {
    name: 'Inventory',
    value: 'inventory',
    count: 1,
    content: (
      <>
        Keep track of your{' '}
        <span className="text-foreground font-semibold">
          current stock levels
        </span>
        . Manage SKU counts, reorder alerts, and warehouse locations to keep
        your fulfillment center running at peak efficiency.
      </>
    ),
  },
  {
    name: 'Pending',
    value: 'pending',
    count: 4,
    content: (
      <>
        Monitor incoming{' '}
        <span className="text-foreground font-semibold">customer orders</span>.
        Review payment statuses, verify addresses, and prepare your pick-lists
        for next-day dispatch.
      </>
    ),
  },
  {
    name: 'Shipped',
    value: 'shipped',
    count: 6,
    content: (
      <>
        Access your{' '}
        <span className="text-foreground font-semibold">delivery history</span>.
        Track parcels, manage returns, and analyze shipping performance across
        all your carrier partners.
      </>
    ),
  },
];

const Tabs4 = () => {
  return (
    <Tabs defaultValue="inventory" className="w-full gap-4 px-1">
      <div className="bg-muted/50 rounded-full p-1 w-fit max-w-full">
        <div className="overflow-x-auto overflow-y-hidden scrollbar-hide sm:py-0">
          <TabsList className="bg-transparent shadow-none border-none flex w-max justify-start gap-1 p-0.5 ">
            {stock.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="h-full rounded-xl px-3 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-primary dark:data-[state=active]:text-primary data-[state=active]:shadow-sm dark:data-[state=active]:bg-muted/80"
              >
                {tab.name}
                <Badge className="bg-primary text-primary-foreground flex size-5 items-center justify-center rounded-md p-0 text-[10px] tabular-nums rounded-md ml-1">
                  {tab.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>

      {stock.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <p className="text-muted-foreground text-[13px] leading-relaxed">
            {tab.content}
          </p>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default Tabs4;
