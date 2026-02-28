"use client";

import { DashboardLayout } from "./dashboardLayout";
import { KanbanBoardView } from "./kanbanBoardView";

export default function LeadDashboardDemo() {
    return (
        <DashboardLayout>
            <KanbanBoardView />
        </DashboardLayout>
    );
}
