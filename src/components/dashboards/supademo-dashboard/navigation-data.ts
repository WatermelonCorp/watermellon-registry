import type { ComponentType, SVGProps } from "react";
import { ChartNoAxesCombined, Palette, Plug, Settings } from "lucide-react";
import {
  GroupGenericIcon,
  HomeIcon,
  NavTitleIcon,
  ShowcasesIcon,
  SupademosIcon,
  VideosIcon,
} from "./assets/icons";

export type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type NavigationItem = {
  name: string;
  href: string;
  icon: SvgIcon;
  badge?: string;
};

export const companies = [
  { name: "My Company", role: "Admin" },
  { name: "Acme Corporation", role: "Member" },
  { name: "Tiktok Inc", role: "Admin" },
] as const;

export const workspaceNavigation: NavigationItem[] = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Supademos", href: "/supademos", icon: SupademosIcon },
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
  "/supademos": { title: "Supademos", icon: SupademosIcon },
  "/showcases": { title: "Showcases", icon: ShowcasesIcon },
  "/videos": { title: "Videos", icon: VideosIcon },
  "/demo-hub": { title: "Demo Hub", icon: GroupGenericIcon },
  "/analytics": { title: "Analytics", icon: ChartNoAxesCombined },
  "/theme": { title: "Theme", icon: Palette },
  "/integration": { title: "Integration", icon: Plug },
  "/settings": { title: "Settings", icon: Settings },
} as const;
