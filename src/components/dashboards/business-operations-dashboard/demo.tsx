"use client";

import { DashboardLayout } from "./dashboardLayout";
import InvoicesPageView from "./invoicesPageView";

export default function BusinessOperationsDashboardDemo() {
    return (
        <DashboardLayout>
            <InvoicesPageView />
        </DashboardLayout>
    );
}
