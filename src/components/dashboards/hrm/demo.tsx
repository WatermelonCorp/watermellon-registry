"use client";

import { useState } from "react";
import { DashboardLayout } from "./dashboardLayout";
import { DashboardView } from "./dashboardView";

export default function HrmDashboardDemo() {
    const [currentView, setCurrentView] = useState("Dashboard");

    const renderContent = () => {
        switch (currentView) {
            case "Dashboard":
                return <DashboardView />;
            default:
                return <DashboardView />;
        }
    };

    return (
        <DashboardLayout onNavigate={setCurrentView} currentView={currentView}>
            {renderContent()}
        </DashboardLayout>
    );
}
