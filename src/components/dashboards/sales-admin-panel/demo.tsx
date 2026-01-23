import { SalesAdminPanel, CompanyFilters, CompaniesTable } from "./index";

export default function SalesAdminPanelDemo() {
  return (
    <div className="w-full h-screen">
      <SalesAdminPanel>
        <CompanyFilters />
        <CompaniesTable />
      </SalesAdminPanel>
    </div>
  );
}
