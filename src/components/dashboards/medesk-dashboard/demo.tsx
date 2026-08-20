import type { ReactNode } from "react";
import DashboardLayout from "./dashboard-layout";
import { DashboardPage } from "./components/medesk/dashboard-content";
import {
  DashboardNavigationProvider,
  useDashboardNavigation,
} from "./components/medesk/navigation";
import { ThemeProvider } from "./components/medesk/theme-provider";

const blankRoutes = new Set([
  "/appointment",
  "/staff",
  "/departments",
  "/resources",
  "/analytics",
  "/reports",
  "/trends",
  "/ai-assistant",
  "/smart-queries",
  "/settings",
  "/integrations",
  "/permissions",
]);

function DashboardRoute() {
  const { pathname } = useDashboardNavigation();

  const content: ReactNode = blankRoutes.has(pathname) ? null : (
    <DashboardPage />
  );

  return <DashboardLayout>{content}</DashboardLayout>;
}

export default function MedeskDashboardDemo() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="medesk-theme">
      <DashboardNavigationProvider>
        <DashboardRoute />
      </DashboardNavigationProvider>
    </ThemeProvider>
  );
}
