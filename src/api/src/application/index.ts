import { Application } from 'express';
import { registerMiddleware } from './middleware';
import { registerErrorHandlers } from './middleware/errorHandler';
import { registerAppRoutes } from './routes';

export function BootstrapApplicationModule(app: Application) {
  registerMiddleware(app);
  registerAppRoutes(app);
  registerErrorHandlers(app);
}
