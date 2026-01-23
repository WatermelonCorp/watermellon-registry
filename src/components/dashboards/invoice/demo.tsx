import { DashboardLayout } from "./dashboardLayout";
import { InvoiceView } from "./dashboardView";

export default function InvoiceDashboardDemo() {
  return (
    <div className="w-full h-screen bg-background">
      <DashboardLayout>
        <InvoiceView />
      </DashboardLayout>
    </div>
  );
}
