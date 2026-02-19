import { useState } from 'react'
import { DashboardLayout } from './dashboardLayout'
import { TimelineView } from './timelineView'

export default function BusinessManagementDashboardDemo() {
    const [currentView, setCurrentView] = useState("Timeline");

    const renderContent = () => {
        switch (currentView) {
            case "Timeline":
                return <TimelineView />;
            default:
                return <TimelineView />;
        }
    };

    return (
        <DashboardLayout onNavigate={setCurrentView} currentView={currentView}>
            {renderContent()}
        </DashboardLayout>
    )
}
