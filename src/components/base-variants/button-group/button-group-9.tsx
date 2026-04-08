import type { LucideIcon } from 'lucide-react';
import { ArchiveIcon, CopyPlusIcon, PencilRulerIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

type ActionButton = {
  icon: LucideIcon;
  label: string;
};

const actions: readonly ActionButton[] = [
  { icon: PencilRulerIcon, label: 'Customize' },
  { icon: CopyPlusIcon, label: 'Clone' },
  { icon: ArchiveIcon, label: 'Archive' },
] as const;

const ButtonGroup9 = () => {
  return (
    <div className="inline-flex w-fit -space-x-px rounded-full shadow-xs rtl:space-x-reverse">
      {actions.map((action, index) => {
        const Icon = action.icon;
        const isFirst = index === 0;
        const isLast = index === actions.length - 1;

        return (
          <Button
            key={action.label}
            variant="outline"
            className={[
              'border-border/70 bg-background text-foreground hover:[&_svg]:text-muted-foreground h-7 gap-1.5 rounded-none px-2.5 text-[0.8rem] shadow-none focus-visible:z-10 sm:h-8 sm:gap-2 sm:px-3 sm:text-sm',
              isFirst ? 'rounded-l-full' : '',
              isLast ? 'rounded-r-full' : '',
            ].join(' ')}
          >
            <Icon className="text-muted-foreground size-3.5 transition-colors sm:size-4" />
            {action.label}
          </Button>
        );
      })}
    </div>
  );
};

export default ButtonGroup9;
