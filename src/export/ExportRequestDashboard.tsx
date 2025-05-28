import { useEffect, useState } from "react";
import type { ExportDtoResponse } from "../types";
import { getAllExportRequests } from "../api/exportApi";
import "./ExportRequestDashboard.css";

export default function ExportRequestDashboard() {
    const [exportRequests, setExportRequests] = useState<ExportDtoResponse[]>([]);

    useEffect(() => {
        const fetchExportRequests = async () => {
            try {
                const requests = await getAllExportRequests();
                setExportRequests(requests);
            } catch (error) {
                console.error("Error fetching export requests:", error);
            }
        };
        fetchExportRequests();
    }, []);

    useEffect(() => {
        console.log("Export Requests:", exportRequests);
    }, [exportRequests]);


    function createDateString(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString() + " | " + date.toLocaleTimeString();
    }

    return (
        <div id="dashboard-container">
            <h1>Export Request Activity</h1>
            <table id="dashboard-table">
                <thead id="dashboard-header">
                    <tr>
                        <th>Employee ID</th>
                        <th>Export Format</th>
                        <th>Export Creation</th>
                        <th>Selected Entities</th>
                        <th>Applied Filters</th>
                        <th>File Name</th>
                        <th>Status</th>
                        <th>File Size (KB)</th>
                    </tr>
                </thead>
                <tbody id="dashboard-body">
                    {exportRequests.map((request) => (
                        <tr key={request.id}>
                            <td>{request.employeeId}</td>
                            <td>{request.exportFormat}</td>
                            <td>{createDateString(request.exportCreation)}</td>
                            <td>{request.selectedEntities}</td>
                            <td>{JSON.stringify(request.appliedFilters)}</td>
                            <td>{request.fileName}</td>
                            <td>{request.status}</td>
                            <td>{request.fileSize ?? "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}