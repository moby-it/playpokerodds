import express from 'express';
import { Histogram, collectDefaultMetrics, register } from 'prom-client';

export function registerMetricsServer() {
  const port = process.env.PORT || 9090;

  const app = express();
  collectDefaultMetrics();
  app.get('/metrics', (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(register.metrics());
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
