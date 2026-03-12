"use client";

import { useState } from "react";
import { DashboardLayout } from "./dashboardLayout";
import DashboardPageView from "./DashboardPageView";

export default function ErpDashboardDemo() {
    const [currentView, setCurrentView] = useState("Dashboard");

    const renderContent = () => {
        switch (currentView) {
            case "Dashboard":
                return <DashboardPageView />;
            default:
                return <DashboardPageView />;
        }
    };

    return (
        <DashboardLayout onNavigate={setCurrentView} currentView={currentView}>
            {renderContent()}
        </DashboardLayout>
    );
}
