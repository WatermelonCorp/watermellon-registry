import DashboardLayout from './dashboard-layout';
import { DashboardContent } from './components/library/dashboard-content';
import { ThemeProvider } from './components/library/theme-provider';

export default function LibraryDashboardDemo() {
  return (
    <ThemeProvider>
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    </ThemeProvider>
  );
}
