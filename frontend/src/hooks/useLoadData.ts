import { useEffect, useState } from "react";
import type { DataRow } from "../types/data.types";
import axios from "axios";


export function useLoadData() {
  const [rawData, setRawData] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    axios.get("http://localhost:4000/api/data")
      .then((res) => {
        setRawData(res.data);
      })
      .catch(() => {
        setError("Failed to load data.");
      })
      .finally(() => setLoading(false));
  }, []);

  return { rawData, loading, error };
}

