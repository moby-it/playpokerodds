import { collectDefaultMetrics, register } from 'prom-client';

export function registerMetricsServer(app) {
  const port = process.env.PORT || 9091;
  collectDefaultMetrics();

  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.send(await register.metrics());
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
