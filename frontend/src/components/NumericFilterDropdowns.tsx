import * as React from "react";
import { useFilters } from "../components/FilterContext";

type Props = {
  columnOptions: Record<string, Set<number>>;
};

const NumericFilterDropdowns: React.FC<Props> = ({ columnOptions }) => {
  const { filters, setFilters } = useFilters();

  const handleChange = (col: string, value: string) => {
    const numericVal = Number(value);
    if (isNaN(numericVal)) return;

    setFilters((prev) => {
      const current = prev[col] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      return { ...prev, [col]: updated };
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-white rounded shadow">
      {Object.entries(columnOptions).map(([col, values]) => (
        <div key={col} className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700 capitalize">
            {col}
          </label>
          <select
            onChange={(e) => handleChange(col, e.target.value)}
            defaultValue=""
            className="px-3 py-2 border rounded bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select --</option>
            {Array.from(values).map((val) => (
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

export default NumericFilterDropdowns;