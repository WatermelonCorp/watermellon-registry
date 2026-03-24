import DealCard from './components/deal-card';
import { Button } from '@/components/ui/button';
import type { DealStage } from './types';
import { Download, Plus } from 'lucide-react';
import { deals, DEAL_STAGES } from './data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export const DealsBoardView = () => {
  const getDealsInStage = (stage: DealStage) =>
    deals.filter((d) => d.stage === stage);

  const calculateStageTotal = (stage: DealStage) => {
    const stageDeals = getDealsInStage(stage);
    return stageDeals.reduce((sum, d) => sum + d.value, 0);
  };

  return (
    <div className="flex h-full w-full flex-col border border-neutral-200 dark:border-neutral-800">
      <div className="flex justify-end px-3 py-3">
        <div className="flex w-full flex-wrap justify-end gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex cursor-pointer items-center gap-2 rounded-full border-y border-neutral-200 bg-neutral-100 px-3 py-2 text-xs text-nowrap text-neutral-600 shadow-none transition-colors hover:bg-neutral-200/50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700/50">
                <Download className="size-3.5" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Deals</DialogTitle>
                <DialogDescription>
                  Download the current deals board data.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="rounded-full">
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
                  Download CSV
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="cursor-pointer rounded-full border-[1.5px] border-indigo-600 bg-linear-to-r from-indigo-700 to-indigo-800 text-xs font-semibold text-nowrap text-white inset-shadow-sm"
              >
                <Plus className="size-3.5" />
                <span>New Deal</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Deal</DialogTitle>
                <DialogDescription>
                  Add a new deal to your pipeline.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Input id="company-name" placeholder="Company Name" />
                </div>
                <div className="grid gap-2">
                  <Input
                    id="deal-value"
                    type="number"
                    placeholder="Deal Value ($)"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="rounded-full">
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
                  Save Deal
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex-1 overflow-hidden border-t border-neutral-200 dark:border-neutral-800">
        <div className="custom-scrollbar h-full overflow-x-auto p-5 pb-10">
          <div className="flex h-full w-max min-w-full gap-5">
            {DEAL_STAGES.map((stage) => {
              const stageDeals = getDealsInStage(stage);
              const totalValue = calculateStageTotal(stage);

              return (
                <div
                  key={stage}
                  className="flex w-[280px] shrink-0 flex-col sm:w-[300px]"
                >
                  <div className="mb-4 flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[10px] font-bold tracking-wider text-neutral-600 uppercase sm:text-xs dark:text-neutral-300">
                        {stage}
                      </h3>
                      <span className="flex size-4 items-center justify-center rounded border border-neutral-200 bg-neutral-100 text-[9px] font-bold text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
                        {stageDeals.length}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-neutral-500 dark:text-neutral-500">
                      ${(totalValue / 1000).toFixed(0)}k
                    </span>
                  </div>

                  <div className="flex-1 space-y-3 rounded-xl">
                    {stageDeals.map((deal) => (
                      <DealCard key={deal.id} deal={deal} />
                    ))}

                    {stageDeals.length === 0 && (
                      <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50 text-[11px] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/20 dark:text-neutral-600">
                        No deals in this stage
                      </div>
                    )}

                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="w-full cursor-pointer rounded-lg border border-dashed border-neutral-200 py-2 text-[11px] font-bold text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-600 dark:border-neutral-700 dark:text-neutral-500 dark:hover:border-neutral-500 dark:hover:text-neutral-400">
                          + Add Deal
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Deal to {stage}</DialogTitle>
                          <DialogDescription>
                            Quickly add a new deal directly into the {stage}{' '}
                            stage.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Input
                              id="quick-company-name"
                              placeholder="Company Name"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Input
                              id="quick-deal-value"
                              type="number"
                              placeholder="Estimated Value"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              variant="outline"
                              className="rounded-full"
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
                            Quick Add
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
