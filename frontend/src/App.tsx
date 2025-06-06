// import { useState,useEffect,  useMemo  } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { useLoadData } from "./hooks/useLoadData";
// import DataTable from "./components/DataTable";
// import FilterPanel from "./components/FilterPanel";
// import { useFilters } from "./components/FilterContext";
// import DropdownDebug from "./components/DropdownDebug";
// import ColumnFilterDropdowns from "./components/ColumnFilterDropdown";
// import NumericFilterDropdowns from "./components/NumericFilterDropdowns";
// import DataTablePaginated from "./components/DataTablePaginated";
// import MultiSelectFilterDropdowns from "./components/MultiSelectFilterDropdowns";





// function App() {
//   // const { rawData, loading } = useLoadData();
//   const { rawData, loading, error } = useLoadData();
//   const { initializeFilters } = useFilters();
//   useEffect(() => {
//     if (rawData.length > 0) {
//       const cols = Object.keys(rawData[0]);
//       initializeFilters(cols);
//     }
//   }, [rawData]);


//     const numericColumnOptions = useMemo(() => {
//     const options: Record<string, Set<number>> = {};
//     if (rawData.length === 0) return options;

//     const columns = Object.keys(rawData[0]);
//     columns.forEach((col) => {
//       options[col] = new Set<number>();
//     });

//     rawData.forEach((row) => {
//       columns.forEach((col) => {
//         const val = Number(row[col]);
//         if (!isNaN(val)) {
//           options[col].add(val);
//         }
//       });
//     });

//     return options;
//   }, [rawData]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;


//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">📊 Raw Dataset</h1>
//       {/* {loading && <div>Loading...</div>}
//       {error && <div className="text-red-500">{error}</div>}
//       {!loading && !error && <DataTable data={rawData} />} */}
//       {/* <FilterPanel rawData={rawData} /> */}
//       {/* <DataTable data={rawData} /> */}
//       {/* <ColumnFilterDropdowns rawData={rawData} /> */}
//       {/* <NumericFilterDropdowns columnOptions={numericColumnOptions} /> */}
//       <MultiSelectFilterDropdowns columnOptions={numericColumnOptions} />

//       <DataTablePaginated data={rawData} rowsPerPage={100} />

//       {/* <DataTable data={rawData} /> */}
//       {/* <DropdownDebug rawData={rawData} /> */}
//     </div>
//   );
// }

// export default App





import { useEffect, useMemo } from "react";
import { useLoadData } from "./hooks/useLoadData";
import DataTablePaginated from "./components/DataTablePaginated";
import MultiSelectFilterDropdowns from "./components/MultiSelectFilterDropdowns";
import { useFilters } from "./components/FilterContext";
import FilterTest from "./components/FilterTest"; 

function App() {
  const { rawData, loading, error } = useLoadData();
  const { initializeFilters } = useFilters();

  useEffect(() => {
    if (rawData.length > 0) {
      const cols = Object.keys(rawData[0]);
      initializeFilters(cols);
    }
  }, [rawData]);

  const numericColumnOptions = useMemo(() => {
    const options: Record<string, Set<number>> = {};
    if (rawData.length === 0) return options;

    const columns = Object.keys(rawData[0]);
    columns.forEach((col) => {
      options[col] = new Set<number>();
    });

    rawData.forEach((row) => {
      columns.forEach((col) => {
        const val = Number(row[col]);
        if (!isNaN(val)) {
          options[col].add(val);
        }
      });
    });

    return options;
  }, [rawData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📊 Raw Dataset</h1>
      <MultiSelectFilterDropdowns columnOptions={numericColumnOptions} />
       <FilterTest />

      <DataTablePaginated data={rawData} rowsPerPage={100} />
    </div>
  );
}

export default App;
