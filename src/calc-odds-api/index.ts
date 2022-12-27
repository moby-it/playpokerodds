import { calculateOdds, Round } from '@moby-it/ppo-core';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3333;

app.get('/', (req: Request, res: Response) => {
  const body = req.body;
  if (!inputIsValid(body)) {
    res.sendStatus(400).send('invalid body payload');
    return;
  }
  const odds = calculateOdds(body);
  res.sendStatus(200).send(odds);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
function inputIsValid(payload: unknown): payload is Round {
  return true;
}
