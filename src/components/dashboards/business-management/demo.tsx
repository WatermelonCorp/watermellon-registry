import { DashboardLayout } from "./dashboardLayout";
import { TimelineView } from "./timelineView";

export default function BusinessManagementDemo() {
  return (
    <div className="w-full h-screen bg-background">
        <DashboardLayout>
            <TimelineView />
        </DashboardLayout>
    </div>
  );
}
