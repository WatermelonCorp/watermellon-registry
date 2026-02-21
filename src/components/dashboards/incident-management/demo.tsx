import { useState } from 'react'
import { DashboardLayout } from './dashboardLayout'
import { ActiveStreamViews } from './activeStreamViews'

export default function IncidentManagementDashboardDemo() {
    const [currentView, setCurrentView] = useState("Activity Stream");

    const renderContent = () => {
        switch (currentView) {
            case "Activity Stream":
                return <ActiveStreamViews />;
            default:
                return <ActiveStreamViews />;
        }
    };

    return (
        <DashboardLayout onNavigate={setCurrentView} currentView={currentView}>
            {renderContent()}
        </DashboardLayout>
    )
}
