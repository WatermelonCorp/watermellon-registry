import type { ComponentType } from "react";
import {
  appIntroduction,
  dashboardFrameOne,
  dashboardFrameThree,
  dashboardFrameTwo,
  inspireFour,
  inspireOne,
  inspireThree,
  inspireTwo,
  teamDemo,
  tipFour,
  tipOne,
  tipThree,
  tipTwo,
} from "./assets/images";
import {
  DashboardFolderPlusIcon,
  DashboardImagesIcon,
  DashboardVideoIcon,
  FigGraduationIcon,
  FigLightbulbIcon,
  FigPlayIcon,
  FigSparkleIcon,
} from "./assets/icons";

export type Supademo = {
  id: string;
  title: string;
  author: string;
  initials: string;
  avatar: string;
  image: string;
};

export const dashboardActions: Array<{
  title: string;
  description: string;
  image: string;
  icon: ComponentType<{ className?: string }>;
}> = [
  {
    title: "Create a Supademo",
    description: "Record an example Supademo in under 2 minutes",
    image: dashboardFrameOne,
    icon: DashboardFolderPlusIcon,
  },
  {
    title: "Interactive Tutorial",
    description: "Get a high-level platform overview in a few clicks",
    image: dashboardFrameTwo,
    icon: DashboardVideoIcon,
  },
  {
    title: "Explore Gallery",
    description: "Get inspired with examples and use cases",
    image: dashboardFrameThree,
    icon: DashboardImagesIcon,
  },
];

export const dashboardTips = [
  {
    title: "Use case tips from the CEO",
    description: "Our high-level recommendation",
    image: tipOne,
  },
  {
    title: "Personalized outbound",
    description: "Use variables to send personalized demos at scale",
    image: tipTwo,
  },
  {
    title: "Tradeshow and expo demos",
    description: "Include in email sequences or follow-ups",
    image: tipThree,
  },
  {
    title: "Modular onboarding emails",
    description: "Include in email sequences or follow-ups",
    image: tipFour,
  },
] as const;

export const dashboardResources = [
  { label: "Learning Academy", icon: FigGraduationIcon },
  { label: "Knowledge Base", icon: FigLightbulbIcon },
  { label: "How we use Supademo", icon: FigPlayIcon },
  { label: "Product Updates", icon: FigSparkleIcon },
] as const;

export const inspiredDemos = [
  { title: "Turo Mobile App", image: inspireOne },
  { title: "Stripe Demo", image: inspireTwo },
  { title: "Slack Demo", image: inspireThree },
  { title: "Semrush Demo", image: inspireFour },
] as const;

export const supademos: Supademo[] = [
  {
    id: "monitor-demo-performance",
    title: "Manage Product De...",
    author: "Abiola Ahmed",
    initials: "AA",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=96&h=96",
    image: teamDemo,
  },
  {
    id: "introduction-to-app",
    title: "Introduction to app in...",
    author: "Vansh P.",
    initials: "VP",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=96&h=96",
    image: appIntroduction,
  },
  {
    id: "monitor-detail-performance",
    title: "Monitor detail per...",
    author: "Ava C",
    initials: "AC",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=96&h=96",
    image: teamDemo,
  },
  {
    id: "use-case-tips",
    title: "Use case tips from t...",
    author: "Vansh P.",
    initials: "VP",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=96&h=96",
    image: appIntroduction,
  },
];

export const supademoAuthors = [
  ...new Set(supademos.map((supademo) => supademo.author)),
];

export const sortLabels = {
  recent: "Recent",
  ascending: "Title A-Z",
  descending: "Title Z-A",
} as const;

export type SortMode = keyof typeof sortLabels;
export type ViewMode = "grid" | "list";
