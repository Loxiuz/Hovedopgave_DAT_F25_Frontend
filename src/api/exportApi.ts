import { API_URL } from "../constants/settings";
import type { ExportRequestDTO } from "../types";

const exportUrl = `${API_URL}/export`;

async function createExportRequest(
  ExportRequestDTO: ExportRequestDTO
): Promise<boolean> {
  const response = await fetch(exportUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ExportRequestDTO),
  });

  if (!response.ok) {
    throw new Error("Failed to download the file.");
  } else {
    downloadFile(response);
    return true;
  }
}

async function downloadFile(response: Response) {
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

export { createExportRequest };
