import bodyParser from 'body-parser';
import { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { registerPassportMiddleware } from './passport';

export function registerMiddleware(app: Application) {
  app.use(cors());
  app.use(bodyParser.json());
  // app.use(morgan('dev'));
  registerPassportMiddleware();
}
export { registerErrorHandlers } from './errorHandler';
