import * as React from "react";
import { createContext, useContext, useState, type ReactNode } from "react";

type Filters = Record<string, string[]>;

type FilterContextType = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  initializeFilters: (columns: string[]) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Filters>({});

  const initializeFilters = (columns: string[]) => {
    const initState: Filters = {};
    columns.forEach((col) => {
      initState[col] = [];
    });
    setFilters(initState);
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters, initializeFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};

