import type { ReactNode } from "react";
import DashboardLayout from "./dashboard-layout";
import { ClassificationContent } from "./components/astrix/classification-content";
import { DashboardContent } from "./components/astrix/dashboard-content";
import {
  DashboardNavigationProvider,
  useDashboardNavigation,
} from "./components/astrix/navigation";
import { ReportsContent } from "./components/astrix/reports-content";
import { ThemeProvider } from "./components/astrix/theme-provider";

function DashboardRoute() {
  const { pathname } = useDashboardNavigation();

  let content: ReactNode = <DashboardContent />;

  if (pathname === "/classification") {
    content = <ClassificationContent />;
  } else if (pathname === "/reports") {
    content = <ReportsContent />;
  } else if (
    pathname === "/integration" ||
    pathname === "/compliance" ||
    pathname === "/settings"
  ) {
    content = null;
  }

  return <DashboardLayout>{content}</DashboardLayout>;
}

export default function AstrixDashboardDemo() {
  return (
    <ThemeProvider>
      <DashboardNavigationProvider>
        <DashboardRoute />
      </DashboardNavigationProvider>
    </ThemeProvider>
  );
}
