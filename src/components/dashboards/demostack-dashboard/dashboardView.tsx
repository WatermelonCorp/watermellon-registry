'use client';

import { DashboardContent } from './components/dashboard/dashboard-content';
import { DemostacksContent } from './components/dashboard/demostacks-content';
import { DashboardShell } from './components/layout/dashboard-shell';
import {
  DashboardNavigationProvider,
  useDashboardNavigation,
} from './components/navigation';

function DashboardRoute() {
  const { pathname } = useDashboardNavigation();

  return (
    <DashboardShell>
      {pathname === '/demostacks' ? <DemostacksContent /> : <DashboardContent />}
    </DashboardShell>
  );
}

export default function DashboardView() {
  return (
    <DashboardNavigationProvider>
      <DashboardRoute />
    </DashboardNavigationProvider>
  );
}
