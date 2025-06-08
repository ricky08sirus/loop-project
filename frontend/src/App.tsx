
import { useEffect, useMemo } from "react";
import { useLoadData } from "./hooks/useLoadData";
import DataTablePaginated from "./components/DataTablePaginated";
import MultiSelectFilterDropdowns from "./components/MultiSelectFilterDropdowns";
import { useFilters } from "./components/FilterContext";
import { useFilteredColumnOptions } from "./hooks/useFilteredColumnOptions";



function App() {
  const { rawData, loading, error } = useLoadData();
  const { initializeFilters } = useFilters();
  const { filters } = useFilters();
  


  useEffect(() => {
    if (rawData.length > 0) {
      const cols = Object.keys(rawData[0]);
      initializeFilters(cols);
    }
  }, [rawData]);



 const filteredData = useMemo(() => {
  return rawData.filter((row) => {
    return Object.entries(filters).every(([col, selectedValues]) => {
      const values = selectedValues as string[];
      if (values.length === 0) return true;
      return values.includes((row[col] ?? "").toString());
    });
  });
}, [rawData, filters]);

  const columnOptions = useFilteredColumnOptions(rawData);



  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;


  return (
    <div className="p-4">
      
      
      <MultiSelectFilterDropdowns columnOptions={columnOptions} />
  
      
      <DataTablePaginated data={filteredData} rowsPerPage={100} />

    </div>
  );
}

export default App;
