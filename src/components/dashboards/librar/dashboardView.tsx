import { DashboardContent } from "./components/dashboard/dashboard-content";
import { DashboardShell } from "./components/layout/dashboard-shell";

export default function DashboardView() {
  return (
    <DashboardShell>
      <DashboardContent />
    </DashboardShell>
  );
}
