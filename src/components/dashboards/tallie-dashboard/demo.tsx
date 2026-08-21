import type { ReactNode } from "react";
import DashboardLayout from "./dashboard-layout";
import { DashboardPage } from "./components/tallie/dashboard-page";
import {
  DashboardNavigationProvider,
  useDashboardNavigation,
} from "./components/tallie/navigation";
import { ThemeProvider } from "./components/tallie/theme-provider";

const blankRoutes = new Set([
  "/activity",
  "/exception",
  "/transactions",
  "/controls",
  "/audit-runs",
  "/reports",
  "/integrations",
  "/team",
  "/settings",
]);

function DashboardRoute() {
  const { pathname } = useDashboardNavigation();

  const content: ReactNode = blankRoutes.has(pathname) ? null : (
    <DashboardPage />
  );

  return <DashboardLayout>{content}</DashboardLayout>;
}

export default function TallieDashboardDemo() {
  return (
    <ThemeProvider>
      <DashboardNavigationProvider>
        <DashboardRoute />
      </DashboardNavigationProvider>
    </ThemeProvider>
  );
}
