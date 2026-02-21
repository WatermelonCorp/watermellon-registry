"use client";

import { DashboardLayout } from "./dashboardLayout";
import TasksPageView from "./tasksPageView";

export default function TaskManagementDashboardDemo() {
    return (
        <DashboardLayout>
            <TasksPageView />
        </DashboardLayout>
    );
}
