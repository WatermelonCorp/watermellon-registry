import { DashboardContent } from "./components/dashboard/dashboard-content";
import { DashboardShell } from "./components/layout/dashboard-shell";

export default function DashboardView() {
  return (
    <div className="min-h-screen w-full">
      <DashboardShell>
        <DashboardContent />
      </DashboardShell>
    </div>
  );
}
