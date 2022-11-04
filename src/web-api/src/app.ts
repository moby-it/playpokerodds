import { config } from 'dotenv';
import express, { Application } from 'express';
import { registerMiddleware } from './middleware';
import { registerErrorHandlers } from './middleware/errorHandler';
import { registerAppRoutes as registerRoutes } from './routes';
config();
const app: Application = express();
registerMiddleware(app);
registerRoutes(app);
const PORT = process.env.PORT || 3000;
registerErrorHandlers(app);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
