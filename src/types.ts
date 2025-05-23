interface LayoutProps {
    children: React.ReactNode;
}

interface ExportRequestDTO {
    employeeId: number;
    exportFormat: string;
    selectedEntities: string;
    appliedFilters: string;
    fileName: string;
}

export type { LayoutProps, ExportRequestDTO };