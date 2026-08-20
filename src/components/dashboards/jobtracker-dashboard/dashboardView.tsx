import { CustomersContent } from "./components/dashboard/customers-content";
import { JobDetailsContent } from "./components/dashboard/job-details/job-details-content";
import { JobsContent } from "./components/dashboard/jobs-content";
import { DashboardShell } from "./components/layout/dashboard-shell";
import {
  DashboardNavigationProvider,
  useDashboardNavigation,
} from "./components/navigation";

function DashboardRoute() {
  const { pathname } = useDashboardNavigation();

  let content = <CustomersContent />;

  if (pathname.startsWith("/jobs/")) {
    content = <JobDetailsContent />;
  } else if (pathname === "/jobs") {
    content = <JobsContent />;
  }

  return <DashboardShell>{content}</DashboardShell>;
}

export default function DashboardView() {
  return (
    <DashboardNavigationProvider>
      <DashboardRoute />
    </DashboardNavigationProvider>
  );
}
