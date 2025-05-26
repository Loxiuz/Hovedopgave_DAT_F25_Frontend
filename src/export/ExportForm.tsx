import { useEffect, useState } from "react";
import type { ExportRequestDTO } from "../types";
import { createExportRequest } from "../api/exportApi";

export default function ExportForm() {
    const validEntities = [
        { entity: "Flights", validFilterFields: ["flightNumber", "departureTime", "arrivalTime"] },
        { entity: "passengers", validFilterFields: ["id"] },
        { entity: "crew_member", validFilterFields: ["id"] },
        { entity: "booking", validFilterFields: ["flightNumber", "status", "passengerId"] },
    ]
    const [formData, setFormData] = useState<ExportRequestDTO>({
        employeeId: 1,
        exportFormat: "csv",
        selectedEntities: "",
        appliedFilters: "",
        fileName: "export.csv",
    });
    // const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
    // const [appliedFilters, setAppliedFilters] = useState<[]>([]);
    // const [exportFormat, setExportFormat] = useState<string>("csv");
    // const [fileName, setFileName] = useState<string>("export.csv");

    useEffect(() => {
        console.log("Selected entities:", formData.selectedEntities);
    }, [formData]);

    function handleFormChange(event: React.ChangeEvent<HTMLFormElement>) {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleFormSubit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const body = formData;
        createExportRequest(body)
    }

    function renderEntityCheckboxes() {
        return validEntities.map((entity) => (
            <div key={entity.entity}>
                <label>
                    <input
                        type="checkbox"
                        name="selectedEntities"
                        value={entity.entity}
                        checked={formData.selectedEntities.includes(entity.entity)}
                        onChange={(e) => {
                            const isChecked = e.target.checked;
                            setFormData((prev) => ({
                                ...prev,
                                selectedEntities: isChecked
                                    ? prev.selectedEntities + entity.entity + ","
                                    : prev.selectedEntities.replace(entity.entity + ",", ""),
                            }));
                        }}
                    />
                    {entity.entity}
                </label>
            </div>
        ));
    }

    return (
        <>
            <h3>Export Entities</h3>
            <form onChange={handleFormChange} onSubmit={handleFormSubit}>
                {renderEntityCheckboxes()}
            </form>
        </>
    )
}