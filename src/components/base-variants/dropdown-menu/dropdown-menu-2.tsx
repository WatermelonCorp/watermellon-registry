import {
  FaUserCircle,
  FaWallet,
  FaShieldAlt,
  FaMoon,
  FaSignOutAlt,
} from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const listItems = [
  {
    icon: FaUserCircle,
    label: 'View Profile',
    desc: 'See your public profile',
  },
  {
    icon: FaWallet,
    label: 'Wallet',
    desc: 'Manage balance & payments',
  },
  {
    icon: FaShieldAlt,
    label: 'Security',
    desc: 'Password & 2FA settings',
  },
  {
    icon: FaMoon,
    label: 'Appearance',
    desc: 'Theme & display',
  },
  {
    icon: FaSignOutAlt,
    label: 'Logout',
    desc: 'End your session',
    danger: true,
  },
];

const DropdownMenu2 = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="overflow-hidden rounded-sm shadow-sm p-0"
        >
          <img
            src="https://github.com/t3dotgg.png"
            alt="User Avatar"
            className="h-full w-full object-cover"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 p-0" align='center'>
        <div className="bg-muted relative p-2">
          <p className="text-sm font-semibold">Welcome back</p>
          <p className="text-muted-foreground text-xs">
            Manage your account & settings
          </p>
          <div className="bg-border absolute bottom-0 left-0 h-px w-full shadow-[inset_0px_-0.5px_0px_-2px_rgba(255,255,255,1),inset_0px_-0.0px_2px_0px_rgba(0,0,0,0.1)]" />
        </div>
        <div className='flex flex-col px-0.5 pb-1'>
          {listItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              variant={item.danger ? 'destructive' : 'default'}
              className={`mt-1 flex items-start gap-3 rounded-md p-2 ${
                item.danger ? 'text-destructive' : ''
              }`}
            >
              <item.icon className="mt-0.5 shrink-0 text-sm" />
              <div className="flex flex-col">
                <span className="text-sm">{item.label}</span>
                <span className="text-muted-foreground text-xs">
                  {item.desc}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenu2;
