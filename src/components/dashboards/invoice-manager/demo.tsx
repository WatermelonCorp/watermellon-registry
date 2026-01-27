import { DashboardLayout } from "./dashboard-layout";
import { InvoiceManagerView } from "./dashboard-view";

export default function InvoiceManagerDashboardDemo() {
  return (
    <div className="w-full h-screen bg-background relative">
      <DashboardLayout>
        <InvoiceManagerView />
      </DashboardLayout>
    </div>
  );
}
