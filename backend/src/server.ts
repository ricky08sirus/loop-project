import express from "express";
import cors from "cors";
import dataRoute from "./routes/dataRoute";


const app = express();
const PORT = 4000;
app.use(cors());
app.use("/api", dataRoute);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

