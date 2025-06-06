import React, { useMemo } from "react";
import type { DataRow } from "../types/data.types";

type Props = {
  rawData: DataRow[];
};

const FilterPanel: React.FC<Props> = ({ rawData }) => {
  const columnNames = useMemo(() => {
    if (rawData.length === 0) return [];
    return Object.keys(rawData[0]);
  }, [rawData]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">🔎 Filters</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {columnNames.map((col) => (
          <div
            key={col}
            className="bg-gray-50 border border-gray-300 rounded-md p-3 shadow-sm"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {col}
            </label>
            {/* Placeholder for dropdown */}
            <select className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700">
              <option disabled selected>
                Select...
              </option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
