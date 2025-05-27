interface LayoutProps {
  children: React.ReactNode;
}

interface ExportRequestDTO {
  employeeId: number;
  exportFormat: string;
  selectedEntities: string;
  appliedFilters: AppliedFilters;
  fileName: string;
}

/* Filter structure for export request body */
interface FilterField {
  field: string;
  value: string;
}

type EntityFilter = {
  [entity: string]: FilterField;
};

type AppliedFilters = EntityFilter[];
/* --------------------------------------- */

interface ValidExportFilterFields {
  entity: string;
  validFilterFields: string[];
}

export type {
  LayoutProps,
  ExportRequestDTO,
  ValidExportFilterFields,
  AppliedFilters,
};
