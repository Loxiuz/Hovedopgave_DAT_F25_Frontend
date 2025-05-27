import type { ValidExportFilterFields } from "../types";

export const VALID_EXPORT_FILTER_FIELDS: ValidExportFilterFields[] = [
  {
    entity: "flight",
    validFilterFields: ["flightNumber", "departureTime", "arrivalTime"],
  },
  { entity: "passenger", validFilterFields: ["id"] },
  { entity: "crew_member", validFilterFields: ["id"] },
  {
    entity: "booking",
    validFilterFields: ["flightNumber", "status", "passengerId"],
  },
];
