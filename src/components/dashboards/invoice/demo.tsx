import { DashboardLayout } from "./dashboard-layout";
import { InvoiceView } from "./dashboard-view";

export default function InvoiceDashboardDemo() {
  return (
    <div className="w-full h-screen bg-background relative">
      <DashboardLayout>
        <InvoiceView />
      </DashboardLayout>
    </div>
  );
}
