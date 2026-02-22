"use client";

import { DashboardLayout } from "./dashboardLayout";
import { InvoiceManagerView } from "./invoiceManagerView";

export default function InvoiceManagerDashboardDemo() {
    return (
        <DashboardLayout>
            <InvoiceManagerView />
        </DashboardLayout>
    );
}
