export interface Invoice {
    id: number
    company: string
    clientName: string
    dealValue: string
    businessReport: string
    invoiceDate: string
    status: string
    category: string
}

export const invoiceData: Invoice[] = [
    { id: 1, company: "BrightPath", clientName: "Olivia Carter", dealValue: "$1300", businessReport: "Financial dashboard for investment tracking.", invoiceDate: "24/10/2025", status: "Rejected", category: "Finance" },
    { id: 2, company: "CoreVision", clientName: "Ethan Miller", dealValue: "$2500", businessReport: "Designed an AI workflow tool for customer support.", invoiceDate: "26/10/2025", status: "Accepted", category: "AI" },
    { id: 3, company: "VentureEdge", clientName: "Amelia Thompson", dealValue: "$3600", businessReport: "Created a sleek B2B portfolio website.", invoiceDate: "31/10/2025", status: "Under Review", category: "B2B" },
    { id: 4, company: "Skyline Group", clientName: "Liam Johnson", dealValue: "$800", businessReport: "Developed a SaaS analytics platform for performance.", invoiceDate: "03/11/2025", status: "Processing", category: "SaaS" },
    { id: 5, company: "NextLink", clientName: "Charlotte Davis", dealValue: "$4200", businessReport: "Automated internal operations with a central dashboard.", invoiceDate: "07/11/2025", status: "Accepted", category: "Automation" },
    { id: 6, company: "HelloOne", clientName: "Noah Anderson", dealValue: "$2300", businessReport: "Smart AI platform for marketing personalization.", invoiceDate: "10/11/2025", status: "Rejected", category: "Tech" },
    { id: 7, company: "NovaTech", clientName: "Isabella White", dealValue: "$10,800", businessReport: "SaaS client dashboard for enterprise reporting.", invoiceDate: "8/11/2025", status: "Under Review", category: "SaaS" },
    { id: 8, company: "AxisLogic", clientName: "James Wilson", dealValue: "$2300", businessReport: "B2B CRM to streamline client communication.", invoiceDate: "12/11/2025", status: "Accepted", category: "B2B" },
    { id: 9, company: "FusionWorks", clientName: "Mia Martinez", dealValue: "$7500", businessReport: "Automation tool for logistics management.", invoiceDate: "14/11/2025", status: "Under Review", category: "Automation" },
    { id: 10, company: "DataVerse", clientName: "Benjamin Moore", dealValue: "$15,000", businessReport: "Built a big data analytics dashboard.", invoiceDate: "15/11/2025", status: "Processing", category: "Tech" },
    { id: 11, company: "Optima Corp", clientName: "Harper Lewis", dealValue: "$4200", businessReport: "Lead management dashboard for sales teams.", invoiceDate: "18/11/2025", status: "Rejected", category: "B2B" },
    { id: 12, company: "StratusFlow", clientName: "Lucas Robinson", dealValue: "$2500", businessReport: "Engineered a finance forecasting platform.", invoiceDate: "19/11/2025", status: "Accepted", category: "Finance" },
    { id: 13, company: "BluePeak", clientName: "Ella Walker", dealValue: "$4200", businessReport: "Designed a SaaS UI focused on client retention.", invoiceDate: "20/11/2025", status: "Accepted", category: "SaaS" },
    { id: 14, company: "NeuraSys", clientName: "Henry Hall", dealValue: "$1300", businessReport: "Built an AI interface for business predictions.", invoiceDate: "22/11/2025", status: "Under Review", category: "AI" },
    { id: 15, company: "VortexPro", clientName: "Grace Allen", dealValue: "$15,000", businessReport: "Automation dashboard for team operations.", invoiceDate: "23/11/2025", status: "Rejected", category: "Automation" },
    { id: 16, company: "OmniReach", clientName: "Jack Turner", dealValue: "$4200", businessReport: "Developed a B2B outreach portal for marketing.", invoiceDate: "24/11/2025", status: "Processing", category: "B2B" },
    { id: 17, company: "DataFusion", clientName: "Scarlett King", dealValue: "$4,890", businessReport: "Built a corporate finance reporting tool.", invoiceDate: "26/11/2025", status: "Accepted", category: "Finance" },
    { id: 18, company: "Lumeon", clientName: "William Scott", dealValue: "$1300", businessReport: "Designed an AI-driven business insights app.", invoiceDate: "29/11/2025", status: "Rejected", category: "Tech" },
]
