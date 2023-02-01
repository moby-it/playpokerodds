import { Application } from 'express';
import { AuthRouter } from './auth';
import { HealthRouter } from './health';
import { PokerRouter } from './poker';
import { UserRouter } from './user';
export { RoundAnswerResponse } from './poker';
export { AuthRouter, PokerRouter, UserRouter };
export function registerAppRoutes(app: Application) {
  app.use('/auth', AuthRouter);
  app.use('/poker', PokerRouter);
  app.use('/health', HealthRouter);
  app.use('/user', UserRouter);
}
