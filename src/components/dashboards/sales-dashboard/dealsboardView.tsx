import DealCard from "./components/deal-card";
import { Button } from "./components/ui/button";
import type { DealStage } from "./types";
import { Download, Plus } from "lucide-react";
import { deals, DEAL_STAGES } from "./data";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./components/ui/dialog";
import { Input } from "./components/ui/input";

export const DealsBoardView = () => {
  const getDealsInStage = (stage: DealStage) =>
    deals.filter((d) => d.stage === stage);

  const calculateStageTotal = (stage: DealStage) => {
    const stageDeals = getDealsInStage(stage);
    return stageDeals.reduce((sum, d) => sum + d.value, 0);
  };
  return (
    <div className="flex flex-col border border-neutral-200 dark:border-neutral-800 w-full h-full">
      <div className="flex justify-end px-3 py-3">
        <div className="flex flex-wrap justify-end gap-2 w-full">
          <Dialog>
            <DialogTrigger render={
              <button className="rounded-full border-y border-neutral-200 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 text-xs flex items-center gap-2 px-3 py-2 transition-all duration-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-none text-nowrap" />
            }>
              <Download className="size-3.5" />
              <span className="hidden sm:inline">Export</span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Deals</DialogTitle>
                <DialogDescription>
                  Download the current deals board data.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" className="rounded-full" />}>Cancel</DialogClose>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">Download CSV</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger render={
              <Button
                size="sm"
                className="bg-linear-to-r from-indigo-700 to-indigo-800 text-white rounded-full text-xs font-semibold inset-shadow-sm border-[1.5px] border-indigo-600 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer hover:shadow-md hover:brightness-110 group text-nowrap"
              />
            }>
              <Plus className="size-3.5 group-hover:rotate-90 transition-transform duration-300" />
              <span>New Deal</span>
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
                  <Input id="deal-value" type="number" placeholder="Deal Value ($)" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" className="rounded-full" />}>Cancel</DialogClose>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">Save Deal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex-1 overflow-hidden border-t border-neutral-200 dark:border-neutral-800">
        <div className="h-full overflow-x-auto p-5 pb-10 custom-scrollbar">
          <div className="flex gap-5 h-full w-max min-w-full">
            {DEAL_STAGES.map((stage) => {
              const stageDeals = getDealsInStage(stage);
              const totalValue = calculateStageTotal(stage);

              return (
                <div key={stage} className="w-[280px] sm:w-[300px] shrink-0 flex flex-col">
                  <div className="flex justify-between items-center mb-4 px-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[10px] sm:text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
                        {stage}
                      </h3>
                      <span className="text-[9px] bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 size-4 flex justify-center items-center rounded font-bold border border-neutral-200 dark:border-neutral-700">
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
                      <div className="h-32 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl flex items-center justify-center text-neutral-500 dark:text-neutral-600 text-[11px] bg-neutral-50 dark:bg-neutral-900/20">
                        No deals in this stage
                      </div>
                    )}

                    <Dialog>
                      <DialogTrigger render={
                        <button className="w-full py-2 border border-neutral-200 dark:border-neutral-700 border-dashed rounded-lg text-neutral-500 dark:text-neutral-500 text-[11px] font-bold transition-all duration-300 hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400 hover:-translate-y-0.5 active:scale-95 cursor-pointer" />
                      }>
                        + Add Deal
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Deal to {stage}</DialogTitle>
                          <DialogDescription>
                            Quickly add a new deal directly into the {stage} stage.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Input id="quick-company-name" placeholder="Company Name" />
                          </div>
                          <div className="grid gap-2">
                            <Input id="quick-deal-value" type="number" placeholder="Estimated Value" />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose render={<Button variant="outline" className="rounded-full" />}>Cancel</DialogClose>
                          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">Quick Add</Button>
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
