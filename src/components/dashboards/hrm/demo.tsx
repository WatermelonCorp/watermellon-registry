import { DashboardLayout } from "./dashboardLayout";
import { DashboardView } from "./dashboardView";

export default function HrmDashboardDemo() {
  return (
    <div className="w-full h-screen bg-background">
      <DashboardLayout>
        <DashboardView />
      </DashboardLayout>
    </div>
  );
}
