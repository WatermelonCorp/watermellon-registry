import DealCard from "./components/deal-card";
import { Button } from "./components/ui/button";
import type { DealStage } from "./types";
import { Download, Plus } from "lucide-react";
import { deals, DEAL_STAGES } from "./data";

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
          <button className="rounded-full border-y border-neutral-200 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 text-xs flex items-center gap-2 px-3 py-2 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700">
            <Download className="size-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <Button
            size="sm"
            className="bg-linear-to-r from-indigo-700 to-indigo-800 text-white rounded-full text-xs font-semibold inset-shadow-sm border-[1.5px] border-indigo-600 transition-opacity hover:opacity-90"
          >
            <Plus className="size-3.5" />
            <span>New Deal</span>
          </Button>
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

                    <button className="w-full py-2 border border-neutral-200 dark:border-neutral-700 border-dashed rounded-lg text-neutral-500 dark:text-neutral-500 text-[11px] font-bold transition-all hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400">
                      + Add Deal
                    </button>
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
