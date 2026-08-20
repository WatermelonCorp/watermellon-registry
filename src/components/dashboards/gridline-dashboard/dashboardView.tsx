import { DashboardContent } from "./components/dashboard/dashboard-content";
import { FlexibilityDashboard } from "./components/dashboard/flexibility-dashboard";
import { ModellingDashboard } from "./components/dashboard/modelling-dashboard";
import { DashboardShell } from "./components/layout/dashboard-shell";
import {
  DashboardNavigationProvider,
  useDashboardNavigation,
} from "./components/navigation";

function DashboardRoute() {
  const { pathname } = useDashboardNavigation();

  return (
    <DashboardShell>
      {pathname === "/modelling" ? (
        <ModellingDashboard />
      ) : pathname === "/flexibility" ? (
        <FlexibilityDashboard />
      ) : (
        <DashboardContent />
      )}
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
