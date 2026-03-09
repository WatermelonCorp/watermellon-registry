"use client";

import { useState } from "react";
import { DashboardLayout } from "./dashboardLayout";
import { InvoiceView } from "./invoicePageView";

export default function InvoiceGeneratorDashboardDemo() {
    const [currentView, setCurrentView] = useState("Invoice");
    const [isPreviewHidden, setIsPreviewHidden] = useState(false);

    const renderContent = () => {
        switch (currentView) {
            case "Invoice":
                return <InvoiceView isPreviewHidden={isPreviewHidden} />;
            default:
                return <InvoiceView isPreviewHidden={isPreviewHidden} />;
        }
    };

    return (
        <DashboardLayout
            onNavigate={setCurrentView}
            currentView={currentView}
            onTogglePreview={() => setIsPreviewHidden(!isPreviewHidden)}
            isPreviewHidden={isPreviewHidden}
        >
            {renderContent()}
        </DashboardLayout>
    );
}
