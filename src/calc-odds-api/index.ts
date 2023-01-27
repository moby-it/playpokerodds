import { calculateOdds, validateRound } from "@moby-it/ppo-core";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 7071;
app.use(bodyParser.json());

app.post("/api/calcOdds", (req: Request, res: Response) => {
  const body = req.body.round;
  if (!validateRound(body)) {
    res.status(400).send("invalid body payload");
    return;
  }
  console.time("calcOdds");
  const odds = calculateOdds(body);
  console.log("Time spent calculating");
  console.timeEnd("calcOdds");
  res.status(200).send({ odds });
});
app.get("/readiness", (req: Request, res: Response) => {
  res.send("Readiness check passed");
});
app.get("/liveness", (req: Request, res: Response) => {
  res.send("liveness check passed");
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
