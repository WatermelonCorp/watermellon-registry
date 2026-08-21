import DashboardLayout from "./dashboard-layout";
import { DashboardContent } from "./components/demostack/dashboard-content";
import { DemostacksContent } from "./components/demostack/demostacks-content";
import {
  DashboardNavigationProvider,
  useDashboardNavigation,
} from "./components/demostack/navigation";
import { ThemeProvider } from "./components/demostack/theme-provider";

function DashboardRoute() {
  const { pathname } = useDashboardNavigation();

  return (
    <DashboardLayout>
      {pathname === "/demostacks" ? (
        <DemostacksContent />
      ) : (
        <DashboardContent />
      )}
    </DashboardLayout>
  );
}

export default function DemostackDashboardDemo() {
  return (
    <ThemeProvider>
      <DashboardNavigationProvider>
        <DashboardRoute />
      </DashboardNavigationProvider>
    </ThemeProvider>
  );
}
