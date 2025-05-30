import type { ValidExportFilterFields } from "../types";

export const VALID_EXPORT_FILTER_FIELDS: ValidExportFilterFields[] = [
  {
    entity: "flight",
    validFilterFields: ["flightNumber", "departureTime", "arrivalTime"],
  },
  { entity: "passenger", validFilterFields: ["id", "nationality" ] },
  {entity: "crew_member", validFilterFields: ["id", "name", "email"] },
  { entity: "crew_member_assignment", validFilterFields: ["crewMemberid", "role", "flightNumber"] },
  {
    entity: "booking",
    validFilterFields: [ "passengerId", "flightNumber", "bookingNumber", "seatNumber", "status" ],
  },
];
