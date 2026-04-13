import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaUser, FaBell, FaLock, FaSignOutAlt, FaCog } from 'react-icons/fa';

const DropdownMenu1 = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Panel</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="sm:w-64 w-60  space-y-1 " align='center' >
        <div className="px-2 ">
          <p className="text-sm font-medium">Dashboard</p>
          <p className="text-muted-foreground text-xs">
            Manage your preferences
          </p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center gap-2 rounded-md">
          <FaUser className="text-sm" />
          <span>Account</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 rounded-md">
          <FaBell className="text-sm" />
          <span>Notifications</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 rounded-md">
          <FaLock className="text-sm" />
          <span>Privacy</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 rounded-md">
          <FaCog className="text-sm" />
          <span>Preferences</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive flex items-center gap-2 rounded-md" variant='destructive'>
          <FaSignOutAlt className="text-sm" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenu1;
