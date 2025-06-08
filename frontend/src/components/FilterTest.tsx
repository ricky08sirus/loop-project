import * as React from "react";
import { useFilters } from "./FilterContext";

const FilterTest = () => {
  const { filters, setFilters } = useFilters();

  const updateModulo5 = () => {
    setFilters((prev) => ({
      ...prev,
      modulo_5: ["1", "4"],
    }));
  };

  return (
    <div>
      <button onClick={updateModulo5} className="px-4 py-2 bg-green-600 text-white rounded">
        Set modulo_5 = [1,4]
      </button>

      <pre className="mt-4 bg-gray-100 p-4 rounded">
        {JSON.stringify(filters, null, 2)}
      </pre>
    </div>
  );
};

export default FilterTest;
