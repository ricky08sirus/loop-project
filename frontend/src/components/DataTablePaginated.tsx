import * as React from "react"; 
import { useState, useMemo } from "react";
import type { DataRow } from "../types/data.types";

type Props = {
  data: DataRow[];
  rowsPerPage: number;
};

const DataTablePaginated: React.FC<Props> = ({ data, rowsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  const columnNames = data.length > 0 ? Object.keys(data[0]) : [];

  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, data.length);

  return (
    <div className="mt-6">
      {/* Scrollable container for rows */}
      <div className="overflow-y-auto" style={{ maxHeight: "600px" }}>
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {columnNames.map((col) => (
                <th key={col} className="border px-4 py-2 text-left">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {columnNames.map((col) => (
                  <td key={col} className="border px-4 py-2">
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls aligned bottom right */}
      <div className="flex justify-end items-center mt-2 pr-2">
        <div className="text-sm text-gray-700 mr-4">
          {startRow}-{endRow} / {data.length}
        </div>
        <div className="flex items-center space-x-3 text-xl font-semibold">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-2 py-1 ${currentPage === 1 ? "text-gray-400" : "text-blue-600 hover:text-blue-800"}`}
          >
            &#60;
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-2 py-1 ${currentPage === totalPages ? "text-gray-400" : "text-blue-600 hover:text-blue-800"}`}
          >
            &#62;
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTablePaginated;
