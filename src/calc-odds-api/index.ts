import { calculateOdds, validateRound } from '@moby-it/ppo-core';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 7071;
app.use(cors());
app.use(bodyParser.json());

app.post('/api/calcOdds', (req: Request, res: Response) => {
  const body = req.body.round;
  if (!validateRound(body)) {
    res.status(400).send('invalid body payload');
    return;
  }
  const odds = calculateOdds(body);
  res.status(200).send({ odds });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
