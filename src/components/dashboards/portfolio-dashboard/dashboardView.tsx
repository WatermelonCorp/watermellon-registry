
import { DashboardTopbar } from './components/portfolio/topbar';
import { DashboardContent } from './components/portfolio/dashboard-content';

export default function DashboardView() {
  return (
    <main>
      <DashboardTopbar />
      <DashboardContent />
    </main>
  );
}