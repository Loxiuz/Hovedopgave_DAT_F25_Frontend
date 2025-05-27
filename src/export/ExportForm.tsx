import { useEffect, useState } from "react";
import type { AppliedFilters, ExportRequestDTO } from "../types";
import { createExportRequest } from "../api/exportApi";
import { VALID_EXPORT_FILTER_FIELDS } from "../constants/validFilterFieldsForEntities";
import "./ExportForm.css";

export default function ExportForm() {
  const [formData, setFormData] = useState<ExportRequestDTO>({
    employeeId: 0,
    exportFormat: "csv",
    selectedEntities: "",
    appliedFilters: [] as AppliedFilters,
    fileName: "export.csv",
  });
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [selectedEntitiesFilters, setSelectedEntitiesFilters] =
    useState<AppliedFilters>([]);

  useEffect(() => {
    console.log("Selected entities:", selectedEntities);
    console.log("Selected entities filters:", selectedEntitiesFilters);
    console.log("Export format:", formData.exportFormat);
    console.log("File name:", formData.fileName);
    console.log("Form data:", formData);
  }, [
    selectedEntities,
    formData.exportFormat,
    formData.fileName,
    formData,
    selectedEntitiesFilters,
  ]);

  useEffect(() => {
    if (formData.employeeId === 0) {
      // Simulate fetching employee ID from a session or context
      //todo: replace with actual logic to get employee ID
      setFormData((prev) => ({ ...prev, employeeId: 1 }));
    }
  }, [setFormData, formData]);

  async function handleFormSubit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = {
      ...formData,
      selectedEntities: selectedEntities.join(","),
      appliedFilters: selectedEntitiesFilters,
    };
    if (selectedEntities.length > 0) {
      console.log(body);
      createExportRequest(body);
    } else {
      alert("Select atleast 1 entity");
    }
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const entity = e.target.value;
    const isChecked = e.target.checked;
    setSelectedEntities((prev) =>
      prev.includes(entity)
        ? prev.filter((e) => e !== entity)
        : [...prev, entity]
    );
    setSelectedEntitiesFilters((prev) =>
      isChecked
        ? [...prev, { [entity]: { field: "", value: "" } }]
        : prev.filter((f) => !Object.keys(f)[0].includes(entity))
    );
  }

  function renderEntityCheckboxes() {
    return VALID_EXPORT_FILTER_FIELDS.map((filter) => (
      <div key={filter.entity}>
        <label>
          <input
            type="checkbox"
            name="selectedEntities"
            value={filter.entity}
            checked={selectedEntities.includes(filter.entity)}
            onChange={handleCheckboxChange}
          />
          {filter.entity}
        </label>
      </div>
    ));
  }

  function renderFilterFieldRow(entity: string, i: number) {
    const filters = VALID_EXPORT_FILTER_FIELDS.find(
      (f) => f.entity === entity
    ) || { validFilterFields: [] };

    return (
      <div key={`${entity}-filter-row-${i}`} className="filter-row">
        <select
          name={`${entity}-filters`}
          id={`${entity}-filters`}
          onChange={(e) => handleFilterSelectionChange(e, i, entity)}
          value={
            selectedEntitiesFilters[i] && selectedEntitiesFilters[i][entity]
              ? selectedEntitiesFilters[i][entity].field
              : ""
          }
        >
          <option value="">Select filter field</option>
          {filters.validFilterFields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
        <input
          type="text"
          id={`${entity}-filter-value`}
          placeholder="Filter value"
          onChange={(e) => handleFilterValueChange(e, i, entity)}
          value={
            selectedEntitiesFilters[i] && selectedEntitiesFilters[i][entity]
              ? selectedEntitiesFilters[i][entity].value
              : ""
          }
        />
        <button
          id="remove-filter-btn"
          onClick={(e) => {
            e.preventDefault();
            setSelectedEntitiesFilters((prev) =>
              prev.filter((f, index) => index !== i || !f[entity])
            );
          }}
        >
          X
        </button>
      </div>
    );
  }

  function handleFilterValueChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    entity: string
  ) {
    const value = e.target.value;

    setSelectedEntitiesFilters((prev) =>
      prev.map((f, i) =>
        i === index && f[entity] ? { [entity]: { ...f[entity], value } } : f
      )
    );
  }

  function handleFilterSelectionChange(
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
    entity: string
  ) {
    const field = e.target.value;
    console.log("Selected field:", field, "for entity:", entity);
    setSelectedEntitiesFilters((prev) =>
      prev.map((f, i) =>
        i === index && f[entity] ? { [entity]: { ...f[entity], field } } : f
      )
    );
  }

  return (
    <div id="export-form-container">
      <h3>
        Export Entities <span>(employee: {formData.employeeId})</span>
      </h3>
      <form onSubmit={handleFormSubit} id="export-form">
        <div id="entity-checkbox-container">
          <h4>Select Entities</h4>
          {renderEntityCheckboxes()}
        </div>
        {selectedEntities.length > 0 && (
          <div id="filters-section">
            <h4>Filters</h4>
            {selectedEntities.map((entity, i) => (
              <div
                key={entity}
                className="filter-row"
                id={`${entity}-filter-row-${i}`}
              >
                <h5>{entity}</h5>
                {selectedEntitiesFilters.length > 0 &&
                  selectedEntitiesFilters.map((filter, i) => {
                    const filterEntity = Object.keys(filter)[0];
                    if (filterEntity !== entity) return null;
                    return renderFilterFieldRow(entity, i);
                  })}
                <div id="add-filter-btn-container">
                  <button
                    id="add-filter-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedEntitiesFilters((prev) => [
                        ...prev,
                        { [entity]: { field: "", value: "" } },
                      ]);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div>
          <label>
            Export Format:
            <select
              name="exportFormat"
              value={formData.exportFormat}
              onChange={(e) =>
                setFormData({ ...formData, exportFormat: e.target.value })
              }
            >
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            File Name:
            <input
              type="text"
              name="fileName"
              value={formData.fileName}
              onChange={(e) =>
                setFormData({ ...formData, fileName: e.target.value })
              }
            />
          </label>
        </div>

        <div id="export-btn-container">
          <input type="submit" id="export-btn" value="Confirm Export" />
        </div>
      </form>
    </div>
  );
}
