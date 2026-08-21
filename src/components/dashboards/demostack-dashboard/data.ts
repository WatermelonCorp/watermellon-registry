import type { ComponentType, SVGProps } from "react";
import { ChartNoAxesCombined, Palette, Plug, Settings } from "lucide-react";
import {
  DemostacksIcon,
  GroupGenericIcon,
  HomeIcon,
  NavTitleIcon,
  ShowcasesIcon,
  VideosIcon,
} from "./components/demostack/icons";

export type Demostack = {
  id: string;
  title: string;
  author: string;
  avatar: string;
  image: string;
};

export const demostacks: Demostack[] = [
  {
    id: "monitor-demo-performance",
    title: "Stockroom Inventory Onboarding",
    author: "Abiola Ahmed",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=96&h=96",
    image: "https://assets.watermelon.sh/components/stockroom-tour-3x2.png",
  },
  {
    id: "introduction-to-app",
    title: "Gridwise Platform Tour",
    author: "Vansh P.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=96&h=96",
    image: "https://assets.watermelon.sh/components/gridwise-tour-3x2.png",
  },
  {
    id: "monitor-detail-performance",
    title: "Resolve a Support Request",
    author: "Ava C",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=96&h=96",
    image:
      "https://assets.watermelon.sh/components/support-request-tour-3x2.png",
  },
  {
    id: "revenue-overview-tour",
    title: "Northpeak Revenue Overview",
    author: "Maya R.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=96&h=96",
    image:
      "https://assets.watermelon.sh/components/analytics-dashboard-3x2.png",
  },
];

export type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type NavigationItem = {
  name: string;
  href: string;
  icon: SvgIcon;
  badge?: string;
};

export const companies = [
  {
    name: "My Company",
    role: "Admin",
    members: [
      {
        name: "Maya",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
        initials: "M",
      },
    ],
  },
  {
    name: "Acme Corporation",
    role: "Member",
    members: [
      {
        name: "Abiola Ahmed",
        avatar:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=256&h=256",
        initials: "AA",
      },
      {
        name: "Ava C",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256&h=256",
        initials: "AC",
      },
    ],
  },
  {
    name: "Tiktok Inc",
    role: "Admin",
    members: [
      {
        name: "Vansh Patel",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256",
        initials: "VP",
      },
    ],
  },
] as const;

export const currentUser = {
  name: "Vansh Patel",
  email: "vanshpatel@gmail.com",
  avatar: "https://api.dicebear.com/10.x/notionists/svg",
  initials: "VP",
} as const;

export const notifications = [
  {
    id: "demostack-shared",
    title: "New Demostack shared",
    description: "Abiola Ahmed shared a Demostack with you.",
    time: "2 min ago",
  },
  {
    id: "showcase-published",
    title: "Showcase published",
    description: "Your latest showcase is now live.",
    time: "1 hour ago",
  },
  {
    id: "workspace-invitation",
    title: "Workspace invitation",
    description: "You were invited to join Acme Corporation.",
    time: "Yesterday",
  },
] as const;

export const workspaceNavigation: NavigationItem[] = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Demostacks", href: "/demostacks", icon: DemostacksIcon },
  { name: "Showcases", href: "/showcases", icon: ShowcasesIcon },
  { name: "Videos", href: "/videos", icon: VideosIcon, badge: "Beta" },
  { name: "Demo Hub", href: "/demo-hub", icon: GroupGenericIcon },
];

export const adminNavigation: NavigationItem[] = [
  { name: "Analytics", href: "/analytics", icon: ChartNoAxesCombined },
  { name: "Theme", href: "/theme", icon: Palette },
  { name: "Integration", href: "/integration", icon: Plug },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const pageDetails = {
  "/": { title: "Home", icon: NavTitleIcon },
  "/demostacks": { title: "Demostacks", icon: DemostacksIcon },
  "/showcases": { title: "Showcases", icon: ShowcasesIcon },
  "/videos": { title: "Videos", icon: VideosIcon },
  "/demo-hub": { title: "Demo Hub", icon: GroupGenericIcon },
  "/analytics": { title: "Analytics", icon: ChartNoAxesCombined },
  "/theme": { title: "Theme", icon: Palette },
  "/integration": { title: "Integration", icon: Plug },
  "/settings": { title: "Settings", icon: Settings },
} as const;
