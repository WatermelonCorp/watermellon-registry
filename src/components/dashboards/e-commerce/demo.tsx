import ECommerceDashboard from "./dashboardLayout";
import { DashboardView } from "./dashboardView";

export default function ECommerceDashboardDemo() {
  return (
    <div className="w-full h-screen bg-background">
      <ECommerceDashboard>
        <DashboardView />
      </ECommerceDashboard>
    </div>
  );
}
