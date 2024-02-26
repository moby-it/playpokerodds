import { calculateOdds, validateRound } from '@moby-it/poker-core';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import { interval, startCpuProfile } from './monitor.mjs';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 7071;
let iterations = Number(process.env['ITERATIONS']);
console.log('Iterations: ', iterations);
if (!iterations || iterations <= 0) {
  console.error('iterations invalid value. Will use default value: 30_000');
  iterations = 50_000;
}
const apiKey = process.env['APIKEY'] || '';
app.use(bodyParser.json());
startCpuProfile();
app.post('/api/calcOdds', validateClient, (req: Request, res: Response) => {
  const body = req.body.round;
  if (!validateRound(body)) {
    res.status(400).send('invalid body payload');
    return;
  }
  console.time('calcOdds');

  const odds = calculateOdds(body, iterations);
  console.log('Time spent calculating');
  console.timeEnd('calcOdds');
  res.status(200).send({ odds });
});

app.get('/liveness', (req: Request, res: Response) => {
  res.send('liveness check passed');
});
const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
process.on('SIGTERM', () => {
  if (interval) clearInterval(interval);
  console.debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.debug('HTTP server closed');
  });
});

function validateClient(req: Request, res: Response, next: NextFunction) {
  if (!apiKey) next();
  else if (apiKey === req.headers['x-api-key']) next();
  else res.sendStatus(403);
}