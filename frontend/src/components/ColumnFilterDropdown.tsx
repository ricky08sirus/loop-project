// import React,  {useMemo } from "react";
import * as React from "react";
import { useMemo } from "react";
import type { DataRow } from "../types/data.types";
import { useFilters } from "../components/FilterContext";

type Props = {
  rawData: DataRow[];
};

const ColumnFilterDropdowns: React.FC<Props> = ({ rawData }) => {
  const { filters, setFilters } = useFilters();

  // Compute unique values for each column
  const uniqueOptionsPerColumn = useMemo(() => {
    if (rawData.length === 0) return {};

    const options: { [key: string]: string[] } = {};
    const columnNames = Object.keys(rawData[0]);

    columnNames.forEach((col) => {
      const values = rawData.map((row) => String(row[col]));
      options[col] = Array.from(new Set(values)); // deduplicated list
    });

    return options;
  }, [rawData]);

  const handleChange = (column: string, selectedValue: string) => {
    setFilters((prev) => {
      const current = prev[column] || [];
      const updated = current.includes(selectedValue)
        ? current.filter((v) => v !== selectedValue)
        : [...current, selectedValue];

      return {
        ...prev,
        [column]: updated,
      };
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 border rounded-md">
      {Object.entries(uniqueOptionsPerColumn).map(([col, options]) => (
        <div key={col} className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700 capitalize">
            {col}
          </label>
          <select
            className="px-3 py-2 border rounded-md bg-white text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => handleChange(col, e.target.value)}
            defaultValue=""
          >
            <option value="">-- Select --</option>
            {options.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default ColumnFilterDropdowns;

