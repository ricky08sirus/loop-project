import express from "express";
import cors from "cors";
import dataRoute from "./routes/dataRoute";


const app = express();
const PORT = parseInt(process.env.PORT || '4000', 10);
app.use(cors());
app.use("/api", dataRoute);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
});