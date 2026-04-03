import type { LucideIcon } from 'lucide-react';
import {
  FolderKanbanIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

type ActionButton = {
  icon: LucideIcon;
  label: string;
};

const actions: readonly ActionButton[] = [
  { icon: SlidersHorizontalIcon, label: 'Controls' },
  { icon: FolderKanbanIcon, label: 'Projects' },
  { icon: SparklesIcon, label: 'Insights' },
] as const;

const ButtonGroup12 = () => {
  return (
    <div className="bg-muted/20 inline-flex w-fit rounded-md p-1 ring-1 ring-border/70 dark:bg-muted/40 dark:ring-border/60 rtl:space-x-reverse">
      {actions.map((action, index) => {
        const Icon = action.icon;
        const isFirst = index === 0;
        const isLast = index === actions.length - 1;

        return (
          <Button
            key={action.label}
            variant="ghost"
            className={[
              'h-7 gap-1.5 rounded-none px-2.5 text-[0.8rem] text-muted-foreground hover:bg-transparent! hover:text-foreground focus-visible:z-10 dark:text-muted-foreground dark:hover:bg-transparent! dark:hover:text-foreground sm:h-8 sm:gap-2 sm:px-3 sm:text-sm',
              isFirst ? 'rounded-l-md' : '',
              isLast ? 'rounded-r-md' : '',
            ].join(' ')}
          >
            <Icon className="size-3.5 sm:size-4" />
            {action.label}
          </Button>
        );
      })}
    </div>
  );
};

export default ButtonGroup12;
