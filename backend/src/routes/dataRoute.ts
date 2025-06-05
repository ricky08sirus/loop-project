import express from "express";
import fs from "fs";
import path from "path";
import { parse } from "papaparse";

const router = express.Router();

router.get("/data", (req, res) => {
  const filePath = path.join(__dirname, "../../data/dataset_small.csv");
  const file = fs.readFileSync(filePath, "utf8");

  parse(file, {
    header: true,
    dynamicTyping: true,
    complete: (results: { data: any[]; errors: any[]; meta: any }) => {
      res.json(results.data);
    },
    error: (err: any) => {
      res.status(500).json({ error: "Failed to parse CSV", details: err });
    }
  });
});

export default router;
