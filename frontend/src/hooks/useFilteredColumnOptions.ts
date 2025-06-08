import { useMemo } from "react";
import { useFilters } from "../components/FilterContext";
import type { DataRow } from "../types/data.types";

export const useFilteredColumnOptions = (
  rawData: DataRow[]
): Record<string, Set<number>> => {
  const { filters } = useFilters();

  return useMemo(() => {
    if (rawData.length === 0) return {};

    const filteredData = rawData.filter((row) =>
      Object.entries(filters).every(([col, selectedValues]) => {
        if (selectedValues.length === 0) return true;
        const val = row[col]?.toString();
        return selectedValues.includes(val);
      })
    );

    const options: Record<string, Set<number>> = {};
    const columns = Object.keys(rawData[0]);

    // Initialize option sets
    columns.forEach((col) => {
      options[col] = new Set<number>();
    });

    // Use filtered data to fill options
    filteredData.forEach((row) => {
      columns.forEach((col) => {
        const val = Number(row[col]);
        if (!isNaN(val)) {
          options[col].add(val);
        }
      });
    });

    return options;
  }, [rawData, filters]);
};
