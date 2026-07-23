"use client";

import { DashboardContent } from "./components/dashboard/dashboard-content";
import { SupademosContent } from "./components/dashboard/supademos-content";
import { DashboardShell } from "./components/layout/dashboard-shell";
import {
  DashboardNavigationProvider,
  useDashboardNavigation,
} from "./components/navigation";

function DashboardRoute() {
  const { pathname } = useDashboardNavigation();

  return (
    <DashboardShell>
      {pathname === "/supademos" ? <SupademosContent /> : <DashboardContent />}
    </DashboardShell>
  );
}

export default function DashboardView() {
  return (
    <DashboardNavigationProvider>
      <DashboardRoute />
    </DashboardNavigationProvider>
  );
}
