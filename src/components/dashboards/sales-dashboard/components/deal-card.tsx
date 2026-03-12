import { type Deal } from '../types';

interface DealCardProps {
  deal: Deal;
}

const Sparkline: React.FC<{ data: number[] }> = ({ data }) => {
  const max = Math.max(...data);
  return (
    <div className="flex h-3 items-end gap-[1px]">
      {data.map((v, i) => (
        <div
          key={i}
          className="w-1 rounded-t-[0.5px] bg-teal-500/80"
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  );
};

const ProbabilityBar: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex h-2.5 w-12 gap-[1px]">
        {[...Array(10)].map((_, i) => {
          const isActive = (i + 1) * 10 <= value;
          let color = 'bg-neutral-200 dark:bg-neutral-800';
          if (isActive) {
            if (value > 75) color = 'bg-green-500';
            else if (value > 40) color = 'bg-yellow-500';
            else color = 'bg-red-500';
          }
          return <div key={i} className={`flex-1 rounded-[1px] ${color}`} />;
        })}
      </div>
      <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-500">
        {value}%
      </span>
    </div>
  );
};

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  return (
    <div className="group cursor-pointer rounded-xl border border-neutral-200 bg-neutral-50 p-4 transition-colors hover:border-neutral-300 dark:border-neutral-700/90 dark:bg-neutral-800/50 dark:hover:border-neutral-600">
      <div className="mb-1.5 flex items-start justify-between">
        <h4 className="truncate text-sm font-semibold text-neutral-600 transition-colors group-hover:text-indigo-600 dark:text-neutral-400 dark:group-hover:text-indigo-400">
          {deal.company}
        </h4>
      </div>

      <div className="mb-3 text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
        ${deal.value.toLocaleString()}
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        <span
          className={`rounded px-2 py-0.5 text-[10px] font-bold ${
            deal.segment === 'Enterprise'
              ? 'border border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
              : deal.segment === 'Mid-Market'
                ? 'border border-teal-200 bg-teal-100 text-teal-700 dark:border-teal-800 dark:bg-teal-900/30 dark:text-teal-400'
                : 'border border-yellow-200 bg-yellow-100 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
          }`}
        >
          {deal.segment}
        </span>
        {deal.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-neutral-300 bg-neutral-200 px-2 py-0.5 text-[10px] font-bold text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="space-y-2.5 border-t border-neutral-200 pt-3 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={deal.owner.avatar}
              className="h-5 w-5 rounded-full"
              alt={deal.owner.name}
            />
            <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-500">
              {deal.owner.name}
            </span>
          </div>
          <Sparkline data={deal.activityHistory} />
        </div>

        <div className="flex items-center justify-between">
          <ProbabilityBar value={deal.winProbability} />
          <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-500 dark:text-neutral-600">
            <svg
              className="h-3 w-3"
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
