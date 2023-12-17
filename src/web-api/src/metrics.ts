import express from 'express';
import { Histogram, collectDefaultMetrics, register } from 'prom-client';

export function registerMetricsServer() {
  const port = process.env.PORT || 9090;

  const app = express();
  collectDefaultMetrics();
  const httpRequestDurationMicroseconds = new Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500], // buckets for response time from 0.1ms to 500ms
  });
  // Runs before each requests
  app.use((req, res, next) => {
    res.locals.startEpoch = Date.now();
    next();
  });
  app.get('/metrics', (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(register.metrics());
  });

  // Error handler
  app.use((err, req, res, next) => {
    res.statusCode = 500;
    // Do not expose your error in production
    res.json({ error: err.message });
    next();
  });

  // Runs after each requests
  app.use((req, res, next) => {
    const responseTimeInMs = Date.now() - res.locals.startEpoch;

    httpRequestDurationMicroseconds
      .labels(req.method, req.route.path, res.statusCode.toString())
      .observe(responseTimeInMs);

    next();
  });

  const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    server.close((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      process.exit(0);
    });
  });
}