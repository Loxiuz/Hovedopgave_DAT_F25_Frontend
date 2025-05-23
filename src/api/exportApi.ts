import { API_URL } from "../settings";
import type { ExportRequest } from "../types";

const exportUrl = `${API_URL}/export`;

export async function createExportRequest(exportRequest: ExportRequest): Promise<void> {
    const response = await fetch(exportUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(exportRequest),
    });

    if (!response.ok) {
        throw new Error("Failed to download the file.");
    }
    downloadFile(response);
}

async function downloadFile(response: Response){
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv";
    document.body.appendChild(a);
    a.click(); 
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
}