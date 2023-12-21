import { config } from 'dotenv';
import express, { Application } from 'express';
import { registerMetricsServer } from './metrics';
import { registerMiddleware } from './middleware';
import { registerErrorHandlers } from './middleware/errorHandler';
import { registerAppRoutes as registerRoutes } from './routes';

config();
const app: Application = express();

// Runs before each requests
app.use((req, res, next) => {
  res.locals.startEpoch = Date.now();
  next();
});

registerMiddleware(app);
registerRoutes(app);
const PORT = 3000;
registerMetricsServer(app);
registerErrorHandlers(app);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
