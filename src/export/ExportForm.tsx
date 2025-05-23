import { useEffect, useState } from "react";
import type { ExportRequestDTO } from "../types";
import { createExportRequest } from "../api/exportApi";

export default function ExportForm() {
    const [formData, setFormData] = useState<ExportRequestDTO>({
        employeeId: 1,
        exportFormat: "csv",
        selectedEntities: "",
        appliedFilters: "",
        fileName: "export.csv",
    });

    function handleFormChange(event: React.ChangeEvent<HTMLFormElement>) {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    useEffect(() => {
        console.log("Selected entities:", formData.selectedEntities);
    }, [formData]);

    async function handleFormSubit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const body = formData;
        createExportRequest(body)
    }

    return (
        <>
            <h3>Export Entities</h3>
            <form onChange={handleFormChange} onSubmit={handleFormSubit}>
                <input type="text" name="selectedEntities" id="selectedEntities" />
                <input type="submit" value="Export" />
            </form>
        </>
    )
}