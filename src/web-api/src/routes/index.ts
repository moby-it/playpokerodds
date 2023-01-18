import { Application } from 'express';
import { AuthRouter } from './auth';
import { HealthRouter } from './health';
import { PokerRouter } from './poker';
export { RoundAnswerResponse } from './poker';
export { AuthRouter, PokerRouter };
export function registerAppRoutes(app: Application) {
  app.use('/auth', AuthRouter);
  app.use('/poker', PokerRouter);
  app.use('/health', HealthRouter);
}
