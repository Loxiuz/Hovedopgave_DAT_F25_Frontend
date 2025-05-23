interface LayoutProps {
    children: React.ReactNode;
}

interface ExportRequest {
    employeeId: number;
    exportFormat: string;
    selectedEntities: string;
    appliedFilters: string;
    fileName: string;
}

export type { LayoutProps, ExportRequest };