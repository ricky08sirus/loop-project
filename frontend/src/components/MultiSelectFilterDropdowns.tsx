import * as React from "react"; 
import { useState } from "react";
import { useFilters } from "../components/FilterContext";

type Props = {
  columnOptions: Record<string, Set<number>>;
};

const MultiSelectFilterDropdowns: React.FC<Props> = ({ columnOptions }) => {
  const { filters, setFilters } = useFilters();
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleValueClick = (col: string, value: string) => {
    setFilters((prev) => {
      const current = prev[col] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return {
        ...prev,
        [col]: updated,
      };
    });
  };

  const closeOverlay = () => {
    setActiveColumn(null);
    setSearchTerm("");
  };

  const filteredValues = activeColumn
    ? Array.from(columnOptions[activeColumn]).filter((val) =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 bg-white rounded shadow">
        {Object.entries(columnOptions).map(([col]) => (
          <div
            key={col}
            className="border rounded shadow-sm cursor-pointer"
            onClick={() => setActiveColumn(col)}
          >
            <div className="w-full text-left px-4 py-2 font-semibold capitalize bg-gray-100 hover:bg-gray-200 border-b">
              {col}
            </div>
          </div>
        ))}
      </div>

      {/* Overlay Window */}
      {activeColumn && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div
            className="bg-white max-w-md w-full max-h-[80vh] rounded shadow-lg p-4 overflow-y-auto relative pointer-events-auto"
            style={{ backdropFilter: "blur(6px)" }}
          >
            <button
              onClick={closeOverlay}
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
              aria-label="Close filter modal"
            >
              &times;
            </button>

            {/* Header with custom background color #C5C6D0 and dark text */}
            <h2
              className="text-lg font-semibold mb-3 capitalize px-3 py-2 rounded"
              style={{ backgroundColor: "#C5C6D0", color: "#2D2D2D" }}
            >
              {activeColumn}
            </h2>

            {/* Search bar with light grey background */}
            <input
              type="text"
              placeholder="Search values..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 w-full px-3 py-2 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
              {filteredValues.length === 0 && (
                <div className="text-gray-500 text-sm italic">No matching values.</div>
              )}

              {filteredValues.map((val) => {
                const strVal = val.toString();
                const isSelected = filters[activeColumn]?.includes(strVal);

                return (
                  <label
                    key={strVal}
                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
                    style={{
                      backgroundColor: isSelected ? "#5DBB63" : undefined,
                      color: isSelected ? "white" : "black",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleValueClick(activeColumn, strVal)}
                      className="accent-green-600"
                    />
                    {strVal}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectFilterDropdowns;
