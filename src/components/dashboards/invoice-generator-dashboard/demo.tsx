"use client";

import { useState } from "react";
import { DashboardLayout } from "./dashboardLayout";
import { InvoiceView } from "./invoicePageView";

export default function InvoiceGeneratorDashboardDemo() {
    const [currentView, setCurrentView] = useState("Invoice");

    const renderContent = () => {
        switch (currentView) {
            case "Invoice":
                return <InvoiceView />;
            default:
                return <InvoiceView />;
        }
    };

    return (
        <DashboardLayout onNavigate={setCurrentView} currentView={currentView}>
            {renderContent()}
        </DashboardLayout>
    );
}
