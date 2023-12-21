import { calculateOdds, validateRound } from '@moby-it/poker-core';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import { registerMetricsServer } from './metrics.mjs';
import { Histogram } from 'prom-client';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 7071;

// Config
let iterations = Number(process.env['ITERATIONS']);

console.log('Iterations: ', iterations);
if (!iterations || iterations <= 0) {
  console.error('iterations invalid value. Will use default value: 30_000');
  iterations = 30_000;
}
const apiKey = process.env['APIKEY'] || '';

// Prometheus http Histogram
const httpRequestDurationMicroseconds = new Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500, 1000, 2000, 5000], // buckets for response time from 0.1ms to 5s
});

// Runs before each requests
app.use((req, res, next) => {
  res.locals.startEpoch = Date.now();
  next();
});
app.use(bodyParser.json());

app.post('/api/calcOdds', validateClient, (req: Request, res: Response) => {
  const body = req.body.round;
  if (!validateRound(body)) {
    res.status(400).send('invalid body payload');
    return;
  }
  console.time('Time spent calculating');
  const odds = calculateOdds(body, iterations);
  console.timeEnd('Time spent calculating');
  res.status(200).send({ odds });
});

app.get('/liveness', (req: Request, res: Response) => {
  res.send('liveness check passed');
});
app.use((req, res, next) => {
  const responseTimeInMs = Date.now() - res.locals.startEpoch;

  httpRequestDurationMicroseconds
    .labels(req.method, req.path, res.statusCode.toString())
    .observe(responseTimeInMs);

  next();
});
const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
registerMetricsServer(app);
process.on('SIGTERM', () => {
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
