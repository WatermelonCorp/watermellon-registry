import type { IconType } from "react-icons";
import {
  HiHome,
  HiSquares2X2,
  HiViewColumns,
  HiChatBubbleLeftRight,
  HiEnvelope,
  HiCalendarDays,
  HiShoppingCart,
  HiArrowRightOnRectangle,
  HiArrowLeftOnRectangle,
  HiHeart,
  HiBookOpen,
  HiChevronRight,
} from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type NavigationItem = {
  name: string;
  icon: IconType;
} & (
  | {
      type: "page";
      children?: never;
    }
  | {
      type: "category";
      children: NavigationItem[];
    }
);

const navigationMenu: NavigationItem[] = [
  {
    name: "Overview",
    icon: HiHome,
    type: "page",
  },
  {
    name: "Workspace",
    icon: HiViewColumns,
    type: "category",
    children: [
      {
        name: "Top Navigation",
        icon: HiViewColumns,
        type: "page",
      },
      {
        name: "Split Layout",
        icon: HiViewColumns,
        type: "page",
      },
      {
        name: "Focus Mode",
        icon: HiViewColumns,
        type: "page",
      },
    ],
  },
  {
    name: "Pages",
    icon: HiSquares2X2,
    type: "category",
    children: [
      {
        name: "Welcome",
        icon: HiSquares2X2,
        type: "page",
      },
      {
        name: "Subscriptions",
        icon: HiSquares2X2,
        type: "page",
      },
      {
        name: "Checkout Flow",
        icon: HiSquares2X2,
        type: "page",
      },
    ],
  },
  {
    name: "Conversations",
    icon: HiChatBubbleLeftRight,
    type: "page",
  },
  {
    name: "Inbox",
    icon: HiEnvelope,
    type: "page",
  },
  {
    name: "Planner",
    icon: HiCalendarDays,
    type: "page",
  },
  {
    name: "Commerce",
    icon: HiShoppingCart,
    type: "category",
    children: [
      {
        name: "Catalog",
        icon: HiShoppingCart,
        type: "page",
      },
      {
        name: "Collections",
        icon: HiShoppingCart,
        type: "page",
      },
      {
        name: "Orders",
        icon: HiShoppingCart,
        type: "page",
      },
      {
        name: "Regions",
        icon: HiShoppingCart,
        type: "page",
      },
    ],
  },
  {
    name: "Login",
    icon: HiArrowRightOnRectangle,
    type: "page",
  },
  {
    name: "Logout",
    icon: HiArrowLeftOnRectangle,
    type: "page",
  },
  {
    name: "Support",
    icon: HiHeart,
    type: "page",
  },
  {
    name: "Resources",
    icon: HiBookOpen,
    type: "page",
  },
];

const NavigationMenu = ({
  item,
  level,
}: {
  level: number;
  item: NavigationItem;
}) => {
  if (item.type === "page") {
    const Icon = item.icon;
    return (
      <div
        className="focus-visible:ring-ring/50 flex items-center gap-2 rounded-md p-1 outline-none focus-visible:ring-[3px]"
        style={{ paddingLeft: `${level === 0 ? 0.25 : 1.75}rem` }}
      >
        <Icon className="size-4 shrink-0" />
        <span className="text-sm">{item.name}</span>
      </div>
    );
  }

  const Icon = item.icon;

  return (
    <Collapsible
      className="flex flex-col gap-1.5"
      style={{ paddingLeft: `${level === 0 ? 0 : 1.5}rem` }}
    >
      <CollapsibleTrigger className="focus-visible:ring-ring/50 flex items-center gap-2 rounded-md p-1 outline-none focus-visible:ring-[3px]">
        <Icon className="size-4 shrink-0" />
        <span className="flex-1 text-start text-sm">{item.name}</span>
        <HiChevronRight className="size-4 shrink-0 transition-transform [[data-state=open]>&]:rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down flex flex-col gap-1.5 overflow-hidden transition-all duration-300">
        {item.children.map((child) => (
          <NavigationMenu key={child.name} item={child} level={level + 1} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

const Sheet4 = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Panel</Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-75">
        <SheetHeader>
          <SheetTitle>Workspace</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2.5 p-4 pt-0">
          {navigationMenu.map((item) => (
            <NavigationMenu key={item.name} item={item} level={0} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sheet4;
