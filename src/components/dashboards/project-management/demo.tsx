import { DashboardLayout } from "./dashboardLayout";
import { SettingsView } from "./dashboardView";

export default function ProjectManagementDashboardDemo() {
  return (
    <div className="w-full h-screen bg-background">
      <DashboardLayout>
        <SettingsView />
      </DashboardLayout>
    </div>
  );
}
