import { type Deal } from "../types";

interface DealCardProps {
  deal: Deal;
}

const Sparkline: React.FC<{ data: number[] }> = ({ data }) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-[1px] h-3">
      {data.map((v, i) => (
        <div
          key={i}
          className="w-1 bg-teal-500/80 rounded-t-[0.5px]"
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  );
};

const ProbabilityBar: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-[1px] w-12 h-2.5">
        {[...Array(10)].map((_, i) => {
          const isActive = (i + 1) * 10 <= value;
          let color = "bg-neutral-200 dark:bg-neutral-800";
          if (isActive) {
            if (value > 75) color = "bg-green-500";
            else if (value > 40) color = "bg-yellow-500";
            else color = "bg-red-500";
          }
          return <div key={i} className={`flex-1 rounded-[1px] ${color} transition-colors`} />;
        })}
      </div>
      <span className="text-[10px] text-neutral-500 dark:text-neutral-500 font-bold">{value}%</span>
    </div>
  );
};

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/90 rounded-xl p-4 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all group cursor-pointer shadow-sm">
      <div className="flex justify-between items-start mb-1.5">
        <h4 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
          {deal.company}
        </h4>
      </div>

      <div className="text-lg font-bold text-neutral-900 dark:text-white mb-3 tracking-tight ">
        ${deal.value.toLocaleString()}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold ${deal.segment === "Enterprise"
            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
            : deal.segment === "Mid-Market"
              ? "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800"
              : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800"
            }`}
        >
          {deal.segment}
        </span>
        {deal.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-[10px] font-bold border border-neutral-300 dark:border-neutral-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="space-y-2.5 pt-3 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={deal.owner.avatar}
              className="w-5 h-5 rounded-full"
              alt={deal.owner.name}
            />
            <span className="text-[11px] text-neutral-600 dark:text-neutral-500 font-medium">
              {deal.owner.name}
            </span>
          </div>
          <Sparkline data={deal.activityHistory} />
        </div>

        <div className="flex justify-between items-center">
          <ProbabilityBar value={deal.winProbability} />
          <div className="flex items-center gap-1 text-[10px] text-neutral-500 dark:text-neutral-600 font-bold">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                strokeWidth={2}
              />
            </svg>
            {deal.lastActivity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
