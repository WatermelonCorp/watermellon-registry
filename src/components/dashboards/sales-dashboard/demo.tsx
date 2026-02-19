import { useState } from 'react'
import DashboardLayout from './dashboardLayout'
import { DealsBoardView } from './dealsboardView'
import { CompanyView } from './companyView'

export default function SalesDashboardDemo() {
    const [currentView, setCurrentView] = useState("Companies");

    const renderContent = () => {
        switch (currentView) {
            case "Companies":
                return <CompanyView />;
            case "Deals Board":
                return <DealsBoardView />;
            default:
                return <CompanyView />;
        }
    };

    return (
        <DashboardLayout onNavigate={setCurrentView} currentView={currentView}>
            {renderContent()}
        </DashboardLayout>
    )
}
