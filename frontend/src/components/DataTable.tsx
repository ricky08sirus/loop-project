import type { DataRow } from "../types/data.types";


type Props = {
  data: DataRow[];
};

const DataTable = ({ data }: Props) => {
  if (data.length === 0) return <div>No data available.</div>;

  const headers = Object.keys(data[0]);

  return (
    <table className="border border-gray-300 w-full text-sm">
      <thead>
        <tr>
          {headers.map((col) => (
            <th key={col} className="border px-2 py-1">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(0, 10).map((row, idx) => (
          <tr key={idx}>
            {headers.map((col) => (
              <td key={col} className="border px-2 py-1">{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;