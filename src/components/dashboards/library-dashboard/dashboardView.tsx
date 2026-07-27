import { DashboardContent } from './components/dashboard/dashboard-content';
import { DashboardShell } from './components/layout/dashboard-shell';

export default function DashboardView() {
  return (
    <div className="library-dashboard w-full min-h-screen">
      <DashboardShell>
        <DashboardContent />
      </DashboardShell>
    </div>
  );
}
