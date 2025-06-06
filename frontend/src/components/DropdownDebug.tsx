import React, { useEffect, useState } from "react";
import type { DataRow } from "../types/data.types";

type Props = {
  rawData: DataRow[];
};

type DropdownOptions = Record<string, Set<number>>;

const DropdownDebug: React.FC<Props> = ({ rawData }) => {
  const [options, setOptions] = useState<DropdownOptions>({});

  useEffect(() => {
    if (rawData.length === 0) return;

    const initialOptions: DropdownOptions = {};

    const columnNames = Object.keys(rawData[0]);
    columnNames.forEach((col) => {
      initialOptions[col] = new Set<number>();
    });

    rawData.forEach((row) => {
      columnNames.forEach((col) => {
        const val = Number(row[col]);
        if (!isNaN(val)) {
          initialOptions[col].add(val);
        }
      });
    });

    setOptions(initialOptions);
  }, [rawData]);

  return (
    <div className="mt-6 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-2">🧪 Dropdown Options (Debug View)</h2>
      <ul className="list-disc ml-5 space-y-1">
        {Object.entries(options).map(([key, values]) => (
          <li key={key}>
            <strong>{key}:</strong> {Array.from(values).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownDebug;
