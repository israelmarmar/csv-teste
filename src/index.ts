import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getDataFromCsv } from "./utils/readCSV";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  const data = await getDataFromCsv();
  res.json(data);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});