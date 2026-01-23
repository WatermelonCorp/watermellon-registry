import { DashboardLayout } from "./dashboardLayout";
import { InvoiceManagerView } from "./dashboardView";

export default function InvoiceManagerDashboardDemo() {
  return (
    <div className="w-full h-screen bg-background">
      <DashboardLayout>
        <InvoiceManagerView />
      </DashboardLayout>
    </div>
  );
}
