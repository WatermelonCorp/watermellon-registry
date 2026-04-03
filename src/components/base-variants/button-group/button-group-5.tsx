import type { LucideIcon } from 'lucide-react';
import {
  BookOpenIcon,
  BriefcaseIcon,
  LayoutGridIcon,
  TerminalSquareIcon,
} from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SocialAction = {
  href: string;
  hoverClassName: string;
  icon: LucideIcon;
  iconClassName: string;
  label: string;
};

const actions: readonly SocialAction[] = [
  {
    href: '#',
    hoverClassName: 'hover:!bg-[#2563eb]/10',
    icon: TerminalSquareIcon,
    iconClassName: 'stroke-[#2563eb]',
    label: 'Code',
  },
  {
    href: '#',
    hoverClassName: 'hover:!bg-[#16a34a]/10',
    icon: BriefcaseIcon,
    iconClassName: 'stroke-[#16a34a]',
    label: 'Work',
  },
  {
    href: '#',
    hoverClassName: 'hover:!bg-[#dc2626]/10',
    icon: LayoutGridIcon,
    iconClassName: 'stroke-[#dc2626]',
    label: 'Library',
  },
  {
    href: '#',
    hoverClassName: 'hover:!bg-[#ca8a04]/10',
    icon: BookOpenIcon,
    iconClassName: 'stroke-[#ca8a04]',
    label: 'Docs',
  },
] as const;

const ButtonGroup5 = () => {
  return (
    <div className="inline-flex w-fit -space-x-px rounded-full shadow-xs rtl:space-x-reverse">
      {actions.map((action, index) => {
        const Icon = action.icon;
        const isFirst = index === 0;
        const isLast = index === actions.length - 1;

        return (
          <a
            key={action.label}
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'icon' }),
              'border-border/70 bg-background size-9 rounded-none p-2.5 shadow-none focus-visible:z-10',
              action.hoverClassName,
              isFirst ? 'rounded-l-full' : '',
              isLast ? 'rounded-r-full' : '',
            )}
          >
            <Icon className={action.iconClassName} />
            <span className="sr-only">{action.label}</span>
          </a>
        );
      })}
    </div>
  );
};

export default ButtonGroup5;
