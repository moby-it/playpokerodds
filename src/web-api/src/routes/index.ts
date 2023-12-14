import { Application } from 'express';
import { AuthRouter } from './auth';
import { HealthRouter } from './health';
import { PokerRouter } from './poker';
import { UserRouter } from './user';
export { RoundAnswerResponse } from './poker';
export { AuthRouter, HealthRouter, PokerRouter, UserRouter };
export function registerAppRoutes(app: Application) {
  app.use('/api/auth', AuthRouter);
  app.use('/api/poker', PokerRouter);
  app.use('/api/health', HealthRouter);
  app.use('/api/user', UserRouter);
}
